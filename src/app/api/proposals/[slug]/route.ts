import { NextResponse } from 'next/server';
import { getProposalBySlug, updateProposal, deleteProposalBySlug, proposalExists } from '@/lib/db';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/* GET /api/proposals/[slug] — get single proposal */
export async function GET(_req: Request, ctx: RouteContext) {
  const { slug } = await ctx.params;
  const record = await getProposalBySlug(slug);

  if (!record) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  return NextResponse.json(record);
}

/* PUT /api/proposals/[slug] — update proposal */
export async function PUT(req: Request, ctx: RouteContext) {
  const { slug } = await ctx.params;

  if (!(await proposalExists(slug))) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const body = await req.json();
  await updateProposal(body);
  return NextResponse.json(body);
}

/* DELETE /api/proposals/[slug] — delete proposal */
export async function DELETE(_req: Request, ctx: RouteContext) {
  const { slug } = await ctx.params;
  await deleteProposalBySlug(slug);
  return NextResponse.json({ ok: true });
}
