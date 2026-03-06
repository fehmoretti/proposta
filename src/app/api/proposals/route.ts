import { NextResponse } from 'next/server';
import { getAllProposals, insertProposal } from '@/lib/db';

/* GET /api/proposals — list all proposals */
export async function GET() {
  const records = await getAllProposals();
  return NextResponse.json(records);
}

/* POST /api/proposals — create a new proposal */
export async function POST(req: Request) {
  const body = await req.json();
  const { slug } = body;
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  await insertProposal(body);
  return NextResponse.json(body, { status: 201 });
}
