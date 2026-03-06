/**
 * Script para migrar propostas de data/proposals/*.json → SQLite (data/proposals.db)
 *
 * Uso: npx tsx scripts/migrate-json-to-sqlite.ts
 */
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_DIR = path.join(DATA_DIR, 'proposals');
const DB_PATH = path.join(DATA_DIR, 'proposals.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS proposals (
    slug        TEXT PRIMARY KEY,
    title       TEXT NOT NULL DEFAULT '',
    clientName  TEXT NOT NULL DEFAULT '',
    createdAt   TEXT NOT NULL,
    updatedAt   TEXT NOT NULL,
    data        TEXT NOT NULL DEFAULT '{}'
  );
`);

const insert = db.prepare(
  `INSERT OR REPLACE INTO proposals (slug, title, clientName, createdAt, updatedAt, data)
   VALUES (@slug, @title, @clientName, @createdAt, @updatedAt, @data)`
);

if (!fs.existsSync(JSON_DIR)) {
  console.log('Nenhuma pasta data/proposals encontrada. Nada a migrar.');
  process.exit(0);
}

const files = fs.readdirSync(JSON_DIR).filter((f) => f.endsWith('.json'));

if (files.length === 0) {
  console.log('Nenhum arquivo JSON encontrado em data/proposals/.');
  process.exit(0);
}

const migrate = db.transaction(() => {
  for (const file of files) {
    const raw = fs.readFileSync(path.join(JSON_DIR, file), 'utf-8');
    const record = JSON.parse(raw);

    insert.run({
      slug: record.slug,
      title: record.title ?? '',
      clientName: record.clientName ?? '',
      createdAt: record.createdAt ?? new Date().toISOString(),
      updatedAt: record.updatedAt ?? new Date().toISOString(),
      data: JSON.stringify(record.data ?? {}),
    });

    console.log(`  ✓ ${file} → slug="${record.slug}"`);
  }
});

console.log(`Migrando ${files.length} proposta(s)...`);
migrate();
console.log('Migração concluída com sucesso!');

db.close();
