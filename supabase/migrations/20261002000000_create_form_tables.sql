-- Byte Club: form submission tables
-- Anyone (anon) can INSERT. Nobody can SELECT/UPDATE/DELETE through the API.
-- Read submissions in the Supabase dashboard (Table Editor), which bypasses RLS.

-- ---------------------------------------------------------------------------
-- Nonprofit partner inquiries
-- ---------------------------------------------------------------------------
create table public.partner_inquiries (
  id           uuid primary key default gen_random_uuid(),
  org_name     text not null check (char_length(org_name) between 1 and 200),
  contact_name text not null check (char_length(contact_name) between 1 and 200),
  email        text not null check (char_length(email) between 3 and 254 and email like '%@%'),
  website      text check (website is null or char_length(website) <= 300),
  need         text not null check (char_length(need) between 1 and 5000),
  timeline     text not null check (timeline in ('asap', '3months', '6months', 'flexible')),
  locale       text not null check (locale in ('fr', 'en')),
  consent      boolean not null check (consent),
  created_at   timestamptz not null default now()
);

comment on table public.partner_inquiries is 'Nonprofit partner form submissions. locale = language to reply in.';

-- ---------------------------------------------------------------------------
-- Student applications
-- ---------------------------------------------------------------------------
create table public.student_applications (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 254 and email like '%@%'),
  age        smallint not null check (age between 14 and 20),
  school     text not null check (char_length(school) between 1 and 200),
  country    text not null check (char_length(country) between 1 and 100),
  skills     text[] not null check (
               cardinality(skills) between 1 and 6
               and skills <@ array['frontend', 'backend', 'mobile', 'design', 'data', 'other']
             ),
  links      text[] not null default '{}' check (cardinality(links) <= 10),
  why        text not null check (char_length(why) between 1 and 5000),
  locale     text not null check (locale in ('fr', 'en')),
  consent    boolean not null check (consent),
  created_at timestamptz not null default now()
);

comment on table public.student_applications is 'Student cohort applications. Many applicants are minors (14+). locale = language to reply in.';

create index partner_inquiries_email_created_idx on public.partner_inquiries (email, created_at desc);
create index student_applications_email_created_idx on public.student_applications (email, created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security: insert-only for the public
-- ---------------------------------------------------------------------------
alter table public.partner_inquiries enable row level security;
alter table public.student_applications enable row level security;

-- Belt and braces: strip default grants, then give back INSERT only.
revoke all on public.partner_inquiries from anon, authenticated;
revoke all on public.student_applications from anon, authenticated;
grant insert on public.partner_inquiries to anon;
grant insert on public.student_applications to anon;

create policy "anon can insert partner inquiries"
  on public.partner_inquiries
  for insert
  to anon
  with check (true);

create policy "anon can insert student applications"
  on public.student_applications
  for insert
  to anon
  with check (true);

-- No SELECT / UPDATE / DELETE policies exist, so those are denied.

-- ---------------------------------------------------------------------------
-- Spam backstop: max 3 submissions per email per hour, per table.
-- Runs as the table owner so it can count rows anon can't see.
-- The app maps the 'rate_limited' error to a friendly message.
-- ---------------------------------------------------------------------------
create or replace function public.enforce_submission_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent int;
begin
  execute format(
    'select count(*) from public.%I where email = $1 and created_at > now() - interval ''1 hour''',
    tg_table_name
  ) into recent using new.email;

  if recent >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_submission_rate_limit() from public, anon, authenticated;

create trigger partner_inquiries_rate_limit
  before insert on public.partner_inquiries
  for each row execute function public.enforce_submission_rate_limit();

create trigger student_applications_rate_limit
  before insert on public.student_applications
  for each row execute function public.enforce_submission_rate_limit();
