-- Execute este SQL no SQL Editor do Supabase Dashboard
-- para criar a tabela de propostas.

create table if not exists proposals (
  slug        text primary key,
  title       text not null default '',
  client_name text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  data        jsonb not null default '{}'::jsonb
);

-- Índice para ordenar por data de atualização
create index if not exists idx_proposals_updated_at
  on proposals (updated_at desc);

-- Habilita Row Level Security (aberto para uso com anon key)
alter table proposals enable row level security;

-- Política que permite todas as operações (ajuste conforme necessidade)
create policy "Allow all access" on proposals
  for all
  using (true)
  with check (true);
