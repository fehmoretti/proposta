'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { ProposalFormData } from '@/features/proposal/services/proposal-form.types';
import { DEFAULT_PROPOSAL } from '@/features/proposal/constants/proposal-defaults';
import { getProposal, saveProposal } from '@/features/proposal/services/proposal-storage';

interface ProposalContextValue {
  data: ProposalFormData;
  updateData: (next: ProposalFormData) => void;
  resetData: () => void;
}

const ProposalContext = createContext<ProposalContextValue | null>(null);

interface ProposalDataProviderProps {
  readonly slug?: string;
  readonly children: ReactNode;
}

export function ProposalDataProvider({ slug, children }: ProposalDataProviderProps) {
  const [data, setData] = useState<ProposalFormData>(DEFAULT_PROPOSAL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (slug) {
        const record = await getProposal(slug);
        if (cancelled) return;
        if (record) {
          setData({ ...DEFAULT_PROPOSAL, ...record.data, clientName: record.clientName || record.data.clientName });
        }
      }
      setHydrated(true);
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const updateData = useCallback(
    (next: ProposalFormData) => {
      setData(next);
      if (slug) {
        void saveProposal(slug, next);
      }
    },
    [slug],
  );

  const resetData = useCallback(() => {
    setData(DEFAULT_PROPOSAL);
  }, []);

  const value = useMemo(
    () => ({ data, updateData, resetData }),
    [data, updateData, resetData],
  );

  if (!hydrated) return null;

  return (
    <ProposalContext.Provider value={value}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposalData(): ProposalContextValue {
  const ctx = useContext(ProposalContext);
  if (!ctx) {
    throw new Error('useProposalData must be used within ProposalDataProvider');
  }
  return ctx;
}
