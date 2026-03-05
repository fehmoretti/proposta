import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data', 'proposals');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(slug: string) {
  return path.join(DATA_DIR, `${slug}.json`);
}

/* GET /api/proposals — list all proposals */
export async function GET() {
  ensureDir();
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
  const records = files.map((f) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, f), 'utf-8');
    return JSON.parse(raw);
  });
  // sort by updatedAt descending
  records.sort((a: any, b: any) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
  return NextResponse.json(records);
}

/* POST /api/proposals — create a new proposal */
export async function POST(req: Request) {
  ensureDir();
  const body = await req.json();
  const { slug } = body;
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  fs.writeFileSync(filePath(slug), JSON.stringify(body, null, 2), 'utf-8');
  return NextResponse.json(body, { status: 201 });
}
