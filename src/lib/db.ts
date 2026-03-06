import { createClient } from '@supabase/supabase-js';
import type { ProposalRecord } from '@/features/proposal/services/proposal-storage';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

/* ── Row ↔ Record mapping ────────────────── */

interface ProposalRow {
  slug: string;
  title: string;
  client_name: string;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
}

function rowToRecord(row: ProposalRow): ProposalRecord {
  return {
    slug: row.slug,
    title: row.title,
    clientName: row.client_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    data: row.data as unknown as ProposalRecord['data'],
  };
}

/* ── Public API (async) ──────────────────── */

export async function getAllProposals(): Promise<ProposalRecord[]> {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToRecord);
}

export async function getProposalBySlug(slug: string): Promise<ProposalRecord | null> {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToRecord(data) : null;
}

export async function proposalExists(slug: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('proposals')
    .select('slug', { count: 'exact', head: true })
    .eq('slug', slug);

  if (error) throw error;
  return (count ?? 0) > 0;
}

export async function insertProposal(record: ProposalRecord): Promise<void> {
  const { error } = await supabase.from('proposals').insert({
    slug: record.slug,
    title: record.title,
    client_name: record.clientName,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
    data: record.data,
  });

  if (error) throw error;
}

export async function updateProposal(record: ProposalRecord): Promise<void> {
  const { error } = await supabase
    .from('proposals')
    .update({
      title: record.title,
      client_name: record.clientName,
      updated_at: record.updatedAt,
      data: record.data,
    })
    .eq('slug', record.slug);

  if (error) throw error;
}

export async function deleteProposalBySlug(slug: string): Promise<void> {
  const { error } = await supabase
    .from('proposals')
    .delete()
    .eq('slug', slug);

  if (error) throw error;
}
