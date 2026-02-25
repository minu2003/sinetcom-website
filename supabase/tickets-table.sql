-- Run this in Supabase Dashboard → SQL Editor → New query
-- Creates the public.tickets table required by POST /api/tickets

CREATE TABLE IF NOT EXISTS public.tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  phone_ext text,
  note text,
  category text NOT NULL,
  issue_summary text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'Open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Optional: allow API (service role) to insert/select; anon can be restricted by RLS
-- If you use service_role in API routes, no RLS policy is required for the API to work.
-- Uncomment below to allow anonymous inserts (e.g. if you ever use anon key for tickets):
-- ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow anonymous insert" ON public.tickets FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow select by ticket_number and email" ON public.tickets FOR SELECT USING (true);

COMMENT ON TABLE public.tickets IS 'Support tickets from the website form';
