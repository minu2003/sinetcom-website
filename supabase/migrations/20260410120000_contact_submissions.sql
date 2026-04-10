-- Run in Supabase SQL editor or via CLI if you use migrations.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  country text,
  contact_number text,
  message text not null
);

comment on table public.contact_submissions is 'Website contact form rows; written only from Next.js API with service role.';

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;
