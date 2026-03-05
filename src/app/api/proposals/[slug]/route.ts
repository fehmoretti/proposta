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

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/* GET /api/proposals/[slug] — get single proposal */
export async function GET(_req: Request, ctx: RouteContext) {
  ensureDir();
  const { slug } = await ctx.params;
  const fp = filePath(slug);

  if (!fs.existsSync(fp)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const raw = fs.readFileSync(fp, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}

/* PUT /api/proposals/[slug] — update proposal */
export async function PUT(req: Request, ctx: RouteContext) {
  ensureDir();
  const { slug } = await ctx.params;
  const fp = filePath(slug);

  if (!fs.existsSync(fp)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const body = await req.json();
  fs.writeFileSync(fp, JSON.stringify(body, null, 2), 'utf-8');
  return NextResponse.json(body);
}

/* DELETE /api/proposals/[slug] — delete proposal */
export async function DELETE(_req: Request, ctx: RouteContext) {
  ensureDir();
  const { slug } = await ctx.params;
  const fp = filePath(slug);

  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
  }

  return NextResponse.json({ ok: true });
}
