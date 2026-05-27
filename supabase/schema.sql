-- UCL Final fan poll — Supabase schema
-- Run in: Supabase Dashboard → SQL Editor → New query → Run

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.polls (
  id text primary key,
  title text not null,
  opens_at timestamptz default now(),
  closes_at timestamptz
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id text not null references public.polls (id) on delete cascade,
  choice text not null check (choice in ('arsenal', 'psg')),
  voter_token text not null,
  created_at timestamptz not null default now(),
  unique (poll_id, voter_token)
);

create index if not exists votes_poll_id_idx on public.votes (poll_id);
create index if not exists votes_poll_choice_idx on public.votes (poll_id, choice);

-- Seed poll (edit dates if needed)
insert into public.polls (id, title, opens_at, closes_at)
values (
  'ucl-final-2026',
  'UCL Final 2026 — Arsenal vs Paris SG',
  now(),
  '2026-05-31 23:59:59+00'
)
on conflict (id) do update set
  title = excluded.title,
  closes_at = excluded.closes_at;

-- ---------------------------------------------------------------------------
-- Stats RPC (public read, aggregated only)
-- ---------------------------------------------------------------------------

create or replace function public.get_poll_stats(p_poll_id text)
returns table (
  choice text,
  vote_count bigint,
  pct numeric
)
language sql
stable
security definer
set search_path = public
as $$
  with counts as (
    select v.choice, count(*)::bigint as vote_count
    from public.votes v
    where v.poll_id = p_poll_id
    group by v.choice
  ),
  total as (
    select coalesce(sum(vote_count), 0)::bigint as n from counts
  ),
  choices as (
    select unnest(array['arsenal', 'psg']::text[]) as choice
  )
  select
    c.choice,
    coalesce(ct.vote_count, 0) as vote_count,
    case
      when (select n from total) = 0 then 0::numeric
      else round(coalesce(ct.vote_count, 0)::numeric / (select n from total) * 100, 1)
    end as pct
  from choices c
  left join counts ct on ct.choice = c.choice;
$$;

grant execute on function public.get_poll_stats(text) to anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on public.polls to anon, authenticated;
grant select, insert on public.votes to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.polls enable row level security;
alter table public.votes enable row level security;

-- Polls: read-only for clients
drop policy if exists polls_select_anon on public.polls;
create policy polls_select_anon
  on public.polls for select
  to anon, authenticated
  using (true);

-- Votes: insert only (no update/delete for anon)
drop policy if exists votes_insert_anon on public.votes;
create policy votes_insert_anon
  on public.votes for insert
  to anon, authenticated
  with check (
    poll_id = 'ucl-final-2026'
    and choice in ('arsenal', 'psg')
    and char_length(voter_token) >= 16
    and char_length(voter_token) <= 64
  );

-- Optional: allow read for debugging (disable in production if you prefer RPC-only)
drop policy if exists votes_select_anon on public.votes;
create policy votes_select_anon
  on public.votes for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Close poll helper (run manually after final)
-- ---------------------------------------------------------------------------
-- update public.polls set closes_at = now() where id = 'ucl-final-2026';
