-- FertilityCareHub Phase 1.3
-- Server-side resend throttling for portal setup links.
--
-- The table stores only a SHA-256 rate-limit key, not the submitted email.
-- The function atomically allows up to three requests per 15-minute window.

begin;

create table if not exists public.portal_setup_resend_limits (
  rate_key text primary key,
  window_started_at timestamp with time zone not null default now(),
  request_count integer not null default 0,
  last_requested_at timestamp with time zone not null default now(),
  constraint portal_setup_resend_limits_request_count_nonnegative
    check (request_count >= 0)
);

create index if not exists portal_setup_resend_limits_last_requested_at_idx
  on public.portal_setup_resend_limits (last_requested_at);

alter table public.portal_setup_resend_limits enable row level security;

revoke all on table public.portal_setup_resend_limits from public;
revoke all on table public.portal_setup_resend_limits from anon;
revoke all on table public.portal_setup_resend_limits from authenticated;
grant select, insert, update, delete
  on table public.portal_setup_resend_limits
  to service_role;

create or replace function public.claim_portal_setup_resend(
  p_rate_key text,
  p_window_seconds integer default 900,
  p_max_requests integer default 3
)
returns table (
  allowed boolean,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_now timestamp with time zone := clock_timestamp();
  v_row public.portal_setup_resend_limits%rowtype;
  v_window interval;
  v_elapsed_seconds integer;
begin
  if p_rate_key is null or length(btrim(p_rate_key)) = 0 then
    raise exception 'A rate-limit key is required.';
  end if;

  if p_window_seconds < 1 then
    raise exception 'The rate-limit window must be at least one second.';
  end if;

  if p_max_requests < 1 then
    raise exception 'The maximum request count must be at least one.';
  end if;

  v_window := make_interval(secs => p_window_seconds);

  insert into public.portal_setup_resend_limits (
    rate_key,
    window_started_at,
    request_count,
    last_requested_at
  )
  values (
    p_rate_key,
    v_now,
    1,
    v_now
  )
  on conflict (rate_key) do nothing;

  select *
  into v_row
  from public.portal_setup_resend_limits
  where rate_key = p_rate_key
  for update;

  if v_row.window_started_at + v_window <= v_now then
    update public.portal_setup_resend_limits
    set
      window_started_at = v_now,
      request_count = 1,
      last_requested_at = v_now
    where rate_key = p_rate_key;

    return query
    select true, 0;
    return;
  end if;

  if v_row.request_count = 1 and v_row.last_requested_at = v_now then
    return query
    select true, 0;
    return;
  end if;

  if v_row.request_count >= p_max_requests then
    update public.portal_setup_resend_limits
    set last_requested_at = v_now
    where rate_key = p_rate_key;

    v_elapsed_seconds := greatest(
      0,
      ceil(
        extract(
          epoch from (
            (v_row.window_started_at + v_window) - v_now
          )
        )
      )::integer
    );

    return query
    select false, v_elapsed_seconds;
    return;
  end if;

  update public.portal_setup_resend_limits
  set
    request_count = request_count + 1,
    last_requested_at = v_now
  where rate_key = p_rate_key;

  return query
  select true, 0;
end;
$$;

revoke all on function public.claim_portal_setup_resend(text, integer, integer)
  from public;
revoke all on function public.claim_portal_setup_resend(text, integer, integer)
  from anon;
revoke all on function public.claim_portal_setup_resend(text, integer, integer)
  from authenticated;
grant execute
  on function public.claim_portal_setup_resend(text, integer, integer)
  to service_role;

commit;
