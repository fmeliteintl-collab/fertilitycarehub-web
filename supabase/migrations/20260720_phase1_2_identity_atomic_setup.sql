-- FertilityCareHub Phase 1.2
-- Canonical profile identity and atomic portal setup-token consumption.
--
-- Review this migration in the Supabase SQL Editor before applying it.
-- It intentionally preserves the existing profiles.id -> auth.users.id model.

begin;

-- Normalize existing non-null profile and token emails.
update public.profiles
set email = lower(btrim(email))
where email is not null
  and email is distinct from lower(btrim(email));

update public.portal_setup_tokens
set email = lower(btrim(email))
where email is distinct from lower(btrim(email));

-- Stop before adding the normalized unique index if duplicate profile emails
-- already exist. This prevents the migration from silently choosing one row.
do $$
begin
  if exists (
    select 1
    from public.profiles
    where email is not null
    group by lower(btrim(email))
    having count(*) > 1
  ) then
    raise exception
      'Cannot add normalized profile email uniqueness: duplicate normalized emails exist in public.profiles.';
  end if;
end
$$;

create unique index if not exists profiles_email_normalized_unique_idx
  on public.profiles (lower(btrim(email)))
  where email is not null;

-- Existing rows may contain NULL even though the intended default is false.
update public.portal_setup_tokens
set used = false
where used is null;

alter table public.portal_setup_tokens
  alter column used set default false,
  alter column used set not null;

-- Atomically validates and consumes one eligible setup token.
-- A token is consumed only when:
--   * it matches the presented token;
--   * it has not already been used;
--   * it has not expired; and
--   * its normalized email belongs to exactly one portal-enabled profile.
--
-- The returned profile_id is the canonical auth.users.id because profiles.id
-- is already the profile primary key and foreign key to auth.users.id.
create or replace function public.consume_portal_setup_token(p_token text)
returns table (
  email text,
  profile_id uuid
)
language sql
security definer
set search_path = public, pg_temp
as $$
  with eligible_profile as (
    select
      p.id,
      lower(btrim(p.email)) as normalized_email
    from public.profiles p
    where p.email is not null
      and p.portal_access = true
  ),
  consumed_token as (
    update public.portal_setup_tokens t
    set used = true
    from eligible_profile p
    where t.token = p_token
      and t.used = false
      and t.expires_at > now()
      and lower(btrim(t.email)) = p.normalized_email
    returning
      lower(btrim(t.email)) as normalized_email,
      p.id as resolved_profile_id
  )
  select
    consumed_token.normalized_email as email,
    consumed_token.resolved_profile_id as profile_id
  from consumed_token;
$$;

revoke all on function public.consume_portal_setup_token(text) from public;
revoke all on function public.consume_portal_setup_token(text) from anon;
revoke all on function public.consume_portal_setup_token(text) from authenticated;
grant execute on function public.consume_portal_setup_token(text) to service_role;

commit;
