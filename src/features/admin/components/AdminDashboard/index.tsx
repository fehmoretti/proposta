'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Button,
  ActionIcon,
  Tooltip,
  Modal,
} from '@mantine/core';
import {
  listProposals,
  createProposal,
  deleteProposal,
  duplicateProposal,
  type ProposalRecord,
} from '@/features/proposal/services/proposal-storage';
import styles from './AdminDashboard.module.css';

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

export function AdminDashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState<ProposalRecord[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    setProposals(listProposals());
    setHydrated(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCreate = () => {
    if (!newTitle.trim() && !newClient.trim()) return;
    const record = createProposal(newTitle.trim(), newClient.trim());
    setProposals(listProposals());
    setShowCreate(false);
    setNewTitle('');
    setNewClient('');
    showToast(`Proposta "${record.title}" criada`);
    router.push(`/admin/${record.slug}`);
  };

  const handleDelete = (slug: string, title: string) => {
    if (!confirm(`Excluir a proposta "${title}"?`)) return;
    deleteProposal(slug);
    setProposals(listProposals());
    showToast('Proposta excluída');
  };

  const handleDuplicate = (slug: string) => {
    const copy = duplicateProposal(slug);
    if (copy) {
      setProposals(listProposals());
      showToast(`Cópia criada: "${copy.title}"`);
    }
  };

  if (!hydrated) return null;

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Sidebar ──────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <h2 className={styles.sidebarBrandTitle}>
              <span className={styles.sidebarBrandDot} />
              Admin Panel
            </h2>
            <p className={styles.sidebarBrandSub}>SENAI Distrito Tecnológico</p>
          </div>

          <nav className={styles.sidebarNav}>
            <div className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>
              <div className={styles.sidebarItemIcon}>📄</div>
              <span className={styles.sidebarItemLabel}>Propostas</span>
            </div>
          </nav>

          <div className={styles.sidebarFooter}>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              fullWidth
              component="a"
              href="/"
            >
              ← Página Inicial
            </Button>
          </div>
        </aside>

        {/* ── Main ─────────────────────── */}
        <main className={styles.main}>
          <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerText}>
                <h1>Propostas</h1>
                <p>Gerencie as pré-propostas de projetos de inovação.</p>
              </div>
              <Button color="red" onClick={() => setShowCreate(true)}>
                + Nova Proposta
              </Button>
            </div>

            {/* Stats */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📄</div>
                <div>
                  <p className={styles.statValue}>{proposals.length}</p>
                  <p className={styles.statLabel}>Propostas</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🏢</div>
                <div>
                  <p className={styles.statValue}>
                    {new Set(proposals.map((p) => p.clientName)).size}
                  </p>
                  <p className={styles.statLabel}>Empresas</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div>
                  <p className={styles.statValue}>
                    {proposals.length > 0
                      ? formatDate(
                          proposals.reduce((a, b) =>
                            a.updatedAt > b.updatedAt ? a : b,
                          ).updatedAt,
                        )
                      : '—'}
                  </p>
                  <p className={styles.statLabel}>Última atualização</p>
                </div>
              </div>
            </div>

            {/* Proposals List */}
            {proposals.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <h3 className={styles.emptyTitle}>Nenhuma proposta criada</h3>
                <p className={styles.emptyText}>
                  Crie sua primeira pré-proposta para começar.
                </p>
                <Button color="red" onClick={() => setShowCreate(true)}>
                  + Nova Proposta
                </Button>
              </div>
            ) : (
              <div className={styles.proposalsGrid}>
                {proposals.map((p) => (
                  <div key={p.slug} className={styles.proposalCard}>
                    <div
                      className={styles.proposalIcon}
                      onClick={() => router.push(`/admin/${p.slug}`)}
                    >
                      📄
                    </div>
                    <div
                      className={styles.proposalInfo}
                      onClick={() => router.push(`/admin/${p.slug}`)}
                    >
                      <h3 className={styles.proposalTitle}>
                        {p.title || 'Sem título'}
                      </h3>
                      <div className={styles.proposalMeta}>
                        <span className={styles.proposalClient}>
                          {p.clientName || 'Sem empresa'}
                        </span>
                        <span className={styles.proposalSlug}>/{p.slug}</span>
                      </div>
                    </div>
                    <span className={styles.proposalDate}>
                      {formatDate(p.updatedAt)}
                    </span>
                    <div className={styles.proposalActions}>
                      <Tooltip label="Ver proposta">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          component="a"
                          href={`/${p.slug}`}
                          target="_blank"
                        >
                          🔗
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Duplicar">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          onClick={() => handleDuplicate(p.slug)}
                        >
                          📋
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Excluir">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(p.slug, p.title)}
                        >
                          🗑️
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Create Modal ─────────────── */}
      <Modal
        opened={showCreate}
        onClose={() => setShowCreate(false)}
        title="Nova Proposta"
        centered
        size="md"
      >
        <div className={styles.modalFields}>
          <TextInput
            label="Título do projeto"
            placeholder="Ex: Protótipo de monitoramento..."
            withAsterisk
            value={newTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <TextInput
            label="Nome da empresa parceira"
            placeholder="Ex: Henkel Brasil"
            withAsterisk
            value={newClient}
            onChange={(e) => setNewClient(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <Button color="red" fullWidth onClick={handleCreate} mt="sm">
            Criar Proposta
          </Button>
        </div>
      </Modal>

      {/* Toast */}
      {toast && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}
