-- Schéma des candidatures d'audition (Postgres / Vercel Postgres / Neon).
-- La table est aussi créée automatiquement par l'API au premier accès
-- (voir server/postgresStore.ts), ce fichier sert de référence.

create table if not exists audition_submissions (
  id uuid primary key,
  submitted_at timestamptz not null,
  full_name text not null,
  email text not null,
  whatsapp text not null default '',
  github_url text not null default '',
  level smallint not null check (level between 1 and 4),
  track text not null check (track in ('informatique', 'telecoms')),
  tally_submitted boolean not null default false,
  answers jsonb not null default '[]'::jsonb
);

create index if not exists audition_submissions_submitted_at_idx
  on audition_submissions (submitted_at desc);
