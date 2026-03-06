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
import {
  IconFileText,
  IconCalendar,
  IconClipboardList,
  IconExternalLink,
  IconCopy,
  IconTrash,
  IconCheck,
  IconSearch,
} from '@tabler/icons-react';
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
  const [newSigla, setNewSigla] = useState('');
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const all = await listProposals();
      setProposals(all);
      setHydrated(true);
    })();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCreate = async () => {
    if (!newTitle.trim() && !newClient.trim()) return;
    const record = await createProposal(newTitle.trim(), newClient.trim(), newSigla.trim());
    setProposals(await listProposals());
    setShowCreate(false);
    setNewTitle('');
    setNewClient('');
    setNewSigla('');
    showToast(`Proposta "${record.title}" criada`);
    router.push(`/admin/${record.slug}`);
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Excluir a proposta "${title}"?`)) return;
    await deleteProposal(slug);
    setProposals(await listProposals());
    showToast('Proposta excluída');
  };

  const handleDuplicate = async (slug: string) => {
    const copy = await duplicateProposal(slug);
    if (copy) {
      setProposals(await listProposals());
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
              <div className={styles.sidebarItemIcon}><IconFileText size={18} /></div>
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

            {/* Search */}
            <TextInput
              placeholder="Pesquisar por empresa, sigla ou projeto..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              className={styles.searchBar}
            />

            {/* Proposals List */}
            {proposals.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><IconClipboardList size={48} /></div>
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
                {proposals
                  .filter((p) => {
                    if (!search.trim()) return true;
                    const q = search.toLowerCase();
                    return (
                      (p.title || '').toLowerCase().includes(q) ||
                      (p.clientName || '').toLowerCase().includes(q) ||
                      p.slug.toLowerCase().includes(q) ||
                      (p.data?.siglaProjeto || '').toLowerCase().includes(q)
                    );
                  })
                  .map((p) => (
                  <div key={p.slug} className={styles.proposalCard}>
                    <div
                      className={styles.proposalIcon}
                      onClick={() => router.push(`/admin/${p.slug}`)}
                    >
                      <IconFileText size={20} />
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
                          <IconExternalLink size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Duplicar">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          onClick={() => handleDuplicate(p.slug)}
                        >
                          <IconCopy size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Excluir">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(p.slug, p.title)}
                        >
                          <IconTrash size={16} />
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
          <TextInput
            label="Sigla do projeto"
            placeholder="Ex: HLC, EoL, SIMO"
            description="Será usada como link da proposta"
            value={newSigla}
            onChange={(e) => setNewSigla(e.currentTarget.value)}
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
          <span className={styles.toastIcon}><IconCheck size={16} /></span>
          {toast}
        </div>
      )}
    </div>
  );
}
