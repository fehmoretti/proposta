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

/* ── Keys ────────────────────────────────── */

const INDEX_KEY = 'proposals-index';

function storageKey(slug: string) {
  return `proposal-${slug}`;
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

/* ── Index (list of slugs) ───────────────── */

export function listSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveSlugs(slugs: string[]) {
  localStorage.setItem(INDEX_KEY, JSON.stringify(slugs));
}

/* ── CRUD ────────────────────────────────── */

export function listProposals(): ProposalRecord[] {
  const slugs = listSlugs();
  return slugs
    .map((s) => getProposal(s))
    .filter((r): r is ProposalRecord => r !== null);
}

export function getProposal(slug: string): ProposalRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return null;
    return JSON.parse(raw) as ProposalRecord;
  } catch {
    return null;
  }
}

export function createProposal(title: string, clientName: string): ProposalRecord {
  const slugs = listSlugs();
  const baseSlug = toSlug(title || clientName || 'proposta');
  const slug = ensureUniqueSlug(baseSlug, slugs);
  const now = new Date().toISOString();

  const record: ProposalRecord = {
    slug,
    title,
    clientName,
    createdAt: now,
    updatedAt: now,
    data: {
      ...DEFAULT_PROPOSAL,
      clientName,
      heroTitle: title,
    },
  };

  localStorage.setItem(storageKey(slug), JSON.stringify(record));
  saveSlugs([...slugs, slug]);
  return record;
}

export function saveProposal(slug: string, data: ProposalFormData): ProposalRecord | null {
  const existing = getProposal(slug);
  if (!existing) return null;

  const updated: ProposalRecord = {
    ...existing,
    title: data.heroTitle || existing.title,
    clientName: data.clientName || existing.clientName,
    updatedAt: new Date().toISOString(),
    data,
  };

  localStorage.setItem(storageKey(slug), JSON.stringify(updated));
  return updated;
}

export function deleteProposal(slug: string): void {
  localStorage.removeItem(storageKey(slug));
  const slugs = listSlugs().filter((s) => s !== slug);
  saveSlugs(slugs);
}

export function duplicateProposal(slug: string): ProposalRecord | null {
  const original = getProposal(slug);
  if (!original) return null;

  const slugs = listSlugs();
  const baseSlug = toSlug(`${original.title}-copia`);
  const newSlug = ensureUniqueSlug(baseSlug, slugs);
  const now = new Date().toISOString();

  const record: ProposalRecord = {
    ...original,
    slug: newSlug,
    title: `${original.title} (Cópia)`,
    createdAt: now,
    updatedAt: now,
  };

  localStorage.setItem(storageKey(newSlug), JSON.stringify(record));
  saveSlugs([...slugs, newSlug]);
  return record;
}
