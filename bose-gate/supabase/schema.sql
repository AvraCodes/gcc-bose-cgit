-- ============================================================
-- Bose Gate — Supabase schema
-- Run this in the Supabase SQL Editor (one shot).
-- ============================================================

-- 1. ACCESS KEYS (stored as sha256 hashes, never plaintext) ---
create table if not exists access_keys (
  id          uuid primary key default gen_random_uuid(),
  key_hash    text not null unique,
  role        text not null check (role in ('admin','bose','general')),
  label       text not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- 2. SESSIONS (one row per login) -----------------------------
create table if not exists sessions (
  id               uuid primary key default gen_random_uuid(),
  key_id           uuid references access_keys(id),
  role             text not null,
  label            text not null,
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  duration_seconds integer,
  active_seconds   integer default 0,
  user_agent       text,
  browser          text,
  device           text,
  ip               text,
  day              date not null default (now() at time zone 'utc')::date
);

-- 3. ENGAGEMENT (accumulated active time per section) ---------
create table if not exists engagement (
  session_id  uuid not null references sessions(id) on delete cascade,
  section     text not null,
  seconds     numeric not null default 0,
  updated_at  timestamptz not null default now(),
  primary key (session_id, section)
);

-- Atomic accumulate: add delta seconds to a (session, section) --
create or replace function add_engagement(p_session uuid, p_section text, p_delta numeric)
returns void language sql as $$
  insert into engagement (session_id, section, seconds, updated_at)
  values (p_session, p_section, p_delta, now())
  on conflict (session_id, section)
  do update set seconds = engagement.seconds + excluded.seconds, updated_at = now();
$$;

-- 4. LOCK EVERYTHING DOWN -------------------------------------
-- RLS on + no policies = anon/public clients can read NOTHING.
-- Only the server (service role) can touch these tables.
alter table access_keys enable row level security;
alter table sessions    enable row level security;
alter table engagement  enable row level security;

create index if not exists idx_sessions_day  on sessions(day);
create index if not exists idx_sessions_role on sessions(role);

-- 5. SEED 3 DEFAULT KEYS --------------------------------------
-- Plaintext (change these later by replacing the hashes):
--   Admin   : BOSE-ADMIN-2026
--   Bose    : BOSE-CLIENT-2026
--   General : BOSE-GUEST-2026
insert into access_keys (key_hash, role, label) values
  ('d3eb30a4eb7dcfe152ebf21abd67582c299125c097263835ffc5774ff68f89d2','admin','Admin Key'),
  ('c9391784a7f8ae06eeb60757ece0581523825f0da51132cc65c7312b1109dfb0','bose','Bose Key'),
  ('de284f5ebd31db4c28228141d5ebb2bafeb9677fe65e6d2d2075bfd5415afe61','general','General User Key')
on conflict (key_hash) do nothing;

-- To add/replace a key later, hash it first:
--   echo -n "YOUR-NEW-KEY" | sha256sum
-- then: insert into access_keys (key_hash, role, label) values ('<hash>','admin','Label');
