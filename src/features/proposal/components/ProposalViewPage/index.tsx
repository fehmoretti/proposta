'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MantineProvider } from '@mantine/core';
import { proposalTheme } from '@/configs/mantine/theme';
import { ProposalPage } from '@/features/proposal';
import { ProposalDataProvider } from '@/providers/ProposalDataProvider';
import { getProposal } from '@/features/proposal/services/proposal-storage';

interface Props {
  readonly slug: string;
}

export function ProposalViewPage({ slug }: Props) {
  const router = useRouter();
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    const record = getProposal(slug);
    if (!record) {
      setExists(false);
    } else {
      setExists(true);
    }
  }, [slug]);

  if (exists === null) return null;

  if (!exists) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c0c14',
          color: '#fff',
          fontFamily: "'Syne', sans-serif",
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Proposta não encontrada
        </p>
        <a
          href="/"
          style={{ color: '#E8173A', fontSize: 14, marginTop: 8 }}
        >
          ← Voltar ao início
        </a>
      </div>
    );
  }

  return (
    <MantineProvider theme={proposalTheme} defaultColorScheme="dark">
      <ProposalDataProvider slug={slug}>
        <ProposalPage />
      </ProposalDataProvider>
    </MantineProvider>
  );
}
