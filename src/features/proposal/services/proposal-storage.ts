import type { ProposalFormData } from './proposal-form.types';
import { DEFAULT_PROPOSAL } from '../constants/proposal-defaults';

/* ── Proposal Record ─────────────────────── */

export interface ProposalRecord {
  slug: string;
  title: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  data: ProposalFormData;
}

/* ── Slug helpers ────────────────────────── */

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'proposta';
}

function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) return slug;
  let i = 2;
  while (existingSlugs.includes(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

/* ── Name split helper ───────────────────── */

export function splitClientName(fullName: string): { main: string; accent: string } {
  const parts = fullName.trim().split(/\s+/);
  const main = (parts[0] ?? '').toUpperCase();
  const accent = parts.slice(1).join(' ');
  return { main, accent };
}

/* ── API-based CRUD ──────────────────────── */

const API = '/api/proposals';

export async function listProposals(): Promise<ProposalRecord[]> {
  try {
    const res = await fetch(API);
    if (!res.ok) return [];
    return (await res.json()) as ProposalRecord[];
  } catch {
    return [];
  }
}

export async function getProposal(slug: string): Promise<ProposalRecord | null> {
  try {
    const res = await fetch(`${API}/${slug}`);
    if (!res.ok) return null;
    return (await res.json()) as ProposalRecord;
  } catch {
    return null;
  }
}

export async function createProposal(title: string, clientName: string, sigla?: string): Promise<ProposalRecord> {
  const all = await listProposals();
  const existingSlugs = all.map((p) => p.slug);
  const baseSlug = toSlug(sigla || title || clientName || 'proposta');
  const slug = ensureUniqueSlug(baseSlug, existingSlugs);
  const now = new Date().toISOString();

  const record: ProposalRecord = {
    slug,
    title,
    clientName,
    createdAt: now,
    updatedAt: now,
    data: {
      ...DEFAULT_PROPOSAL,
      clientName: clientName,
      clientNameAccent: '',
      heroTitle: title,
      siglaProjeto: sigla || '',
      heroTag: `Pré proposta · ${new Date().getFullYear()}`,
    },
  };

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });

  return record;
}

export async function saveProposal(slug: string, data: ProposalFormData): Promise<ProposalRecord | null> {
  const existing = await getProposal(slug);
  if (!existing) return null;

  const updated: ProposalRecord = {
    ...existing,
    title: data.heroTitle || existing.title,
    clientName: data.clientName || existing.clientName,
    updatedAt: new Date().toISOString(),
    data,
  };

  await fetch(`${API}/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  });

  return updated;
}

export async function deleteProposal(slug: string): Promise<void> {
  await fetch(`${API}/${slug}`, { method: 'DELETE' });
}

export async function duplicateProposal(slug: string): Promise<ProposalRecord | null> {
  const original = await getProposal(slug);
  if (!original) return null;

  const all = await listProposals();
  const existingSlugs = all.map((p) => p.slug);
  const baseSlug = toSlug(`${original.title}-copia`);
  const newSlug = ensureUniqueSlug(baseSlug, existingSlugs);
  const now = new Date().toISOString();

  const record: ProposalRecord = {
    ...original,
    slug: newSlug,
    title: `${original.title} (Cópia)`,
    createdAt: now,
    updatedAt: now,
  };

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });

  return record;
}
