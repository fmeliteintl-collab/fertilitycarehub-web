-- 1) Function: writes an audit row after a subscriber insert
create or replace function public.log_subscriber_insert()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.subscribe_audit_logs (
    email,
    status,
    error_message,
    created_at
  )
  values (
    new.email,
    'success',
    null,
    now()
  );

  return new;
end;
$$;

-- 2) Trigger: attaches function to the subscribers table
drop trigger if exists trg_log_subscriber_insert on public.subscribers;

create trigger trg_log_subscriber_insert
after insert on public.subscribers
for each row
execute function public.log_subscriber_insert();