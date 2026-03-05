'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  NumberInput,
  Select,
  Switch,
  Button,
  ActionIcon,
  Tooltip,
  Text,
} from '@mantine/core';
import type { ProposalFormData } from '@/features/proposal/services/proposal-form.types';
import { DEFAULT_PROPOSAL } from '@/features/proposal/constants/proposal-defaults';
import {
  getProposal,
  saveProposal,
  deleteProposal,
} from '@/features/proposal/services/proposal-storage';
import type {
  DiagramNode,
  EscopoItem,
  MacroatividadeForm,
  PremissaForm,
  OrcamentoCategoriaForm,
  CompraForm,
  RiscoForm,
} from '@/features/proposal/services/proposal.types';
import {
  IconBuilding,
  IconClipboardList,
  IconTarget,
  IconFlask,
  IconListCheck,
  IconPackage,
  IconPinned,
  IconCalendar,
  IconCurrencyDollar,
  IconChartBar,
  IconShoppingCart,
  IconAlertTriangle,
  IconX,
  IconCheck,
} from '@tabler/icons-react';
import { DIAGRAM_ICONS, DIAGRAM_ICON_MAP } from '@/features/proposal/constants/diagram-icons';
import { SectionCard } from './SectionCard';
import { RichTextArea } from '../RichTextArea';
import styles from './AdminPage.module.css';

/* ── Diagram icon select data ───────────── */
const DIAGRAM_ICON_OPTIONS = DIAGRAM_ICONS.map((i) => ({
  value: i.value,
  label: i.label,
}));

/* ── Select option data ─────────────────── */

const FONTE_FINANCIAMENTO_OPTIONS = [
  { value: 'EMBRAPII', label: 'EMBRAPII' },
  { value: 'SESI', label: 'SESI' },
  { value: 'Outra', label: 'Outra' },
];

const TRL_OPTIONS = [
  { value: '1', label: 'TRL 1 — Princípios básicos observados' },
  { value: '2', label: 'TRL 2 — Conceito de tecnologia formulado' },
  { value: '3', label: 'TRL 3 — Prova de conceito experimental' },
  { value: '4', label: 'TRL 4 — Tecnologia validada em laboratório' },
  { value: '5', label: 'TRL 5 — Tecnologia validada em ambiente relevante' },
  { value: '6', label: 'TRL 6 — Demonstração em ambiente relevante' },
  { value: '7', label: 'TRL 7 — Demonstração em ambiente operacional' },
  { value: '8', label: 'TRL 8 — Sistema completo qualificado' },
  { value: '9', label: 'TRL 9 — Sistema comprovado em operação' },
];

const RESPONSAVEL_OPTIONS = [
  { value: 'SENAI', label: 'SENAI' },
  { value: 'Empresa', label: 'Empresa' },
  { value: 'Ambos', label: 'Ambos' },
];

const CATEGORIA_CUSTO_OPTIONS = [
  { value: 'Hora Técnica de Inovação', label: 'Hora Técnica de Inovação' },
  { value: 'Máquinas e Equipamentos', label: 'Máquinas e Equipamentos' },
  { value: 'Dispositivo Eletrônico e Software', label: 'Dispositivo Eletrônico e Software' },
  { value: 'Despesas de Viagens', label: 'Despesas de Viagens' },
  { value: 'Material de Consumo', label: 'Material de Consumo' },
  { value: 'Hora Máquina', label: 'Hora Máquina' },
  { value: 'DOA e DI', label: 'DOA e DI' },
  { value: 'Outros', label: 'Outros' },
];

const FONTE_RESPONSAVEL_OPTIONS = [
  { value: 'Financiador', label: 'Financiador (EMBRAPII/SESI)' },
  { value: 'SENAI', label: 'SENAI' },
  { value: 'Empresa', label: 'Empresa' },
];

const TIPO_CONTRAPARTIDA_OPTIONS = [
  { value: 'Financeira', label: 'Financeira' },
  { value: 'Econômica', label: 'Econômica' },
];

const NIVEL_EXPOSICAO_OPTIONS = [
  { value: 'Baixo', label: 'Baixo' },
  { value: 'Médio', label: 'Médio' },
  { value: 'Alto', label: 'Alto' },
];

const ESTRATEGIA_GESTAO_OPTIONS = [
  { value: 'Mitigar', label: 'Mitigar' },
  { value: 'Aceitar', label: 'Aceitar' },
  { value: 'Transferir', label: 'Transferir' },
  { value: 'Evitar', label: 'Evitar' },
];

/* ── Sidebar sections ───────────────────── */

const ICON_SIZE = 18;

const SECTIONS = [
  { id: 'sec-1', icon: <IconBuilding size={ICON_SIZE} />, label: '1. Identificação' },
  { id: 'sec-2', icon: <IconClipboardList size={ICON_SIZE} />, label: '2. Contexto' },
  { id: 'sec-3', icon: <IconTarget size={ICON_SIZE} />, label: '3. Objetivo' },
  { id: 'sec-4', icon: <IconFlask size={ICON_SIZE} />, label: '4. TRL' },
  { id: 'sec-5', icon: <IconListCheck size={ICON_SIZE} />, label: '5. Escopo' },
  { id: 'sec-6', icon: <IconPackage size={ICON_SIZE} />, label: '6. Macroatividades' },
  { id: 'sec-7', icon: <IconPinned size={ICON_SIZE} />, label: '7. Premissas' },
  { id: 'sec-8', icon: <IconCalendar size={ICON_SIZE} />, label: '8. Cronograma' },
  { id: 'sec-9', icon: <IconCurrencyDollar size={ICON_SIZE} />, label: '9. Orçamento' },
  { id: 'sec-10', icon: <IconChartBar size={ICON_SIZE} />, label: '10. Detalhamento' },
  { id: 'sec-11', icon: <IconShoppingCart size={ICON_SIZE} />, label: '11. Compras' },
  { id: 'sec-12', icon: <IconAlertTriangle size={ICON_SIZE} />, label: '12. Riscos' },
];

/* ── Helpers ─────────────────────────────── */

const formatBRL = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

/* ════════════════════════════════════════════ */

interface AdminPageProps {
  readonly slug: string;
}

export function AdminPage({ slug }: AdminPageProps) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [savedData, setSavedData] = useState<ProposalFormData>(DEFAULT_PROPOSAL);
  const [form, setForm] = useState<ProposalFormData>(DEFAULT_PROPOSAL);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  /* ── Load from storage on mount ────────── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const record = await getProposal(slug);
      if (cancelled) return;
      if (!record) {
        router.replace('/admin');
        return;
      }
      const merged = { ...DEFAULT_PROPOSAL, ...record.data };
      setSavedData(merged);
      setForm(merged);
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [slug, router]);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(savedData),
    [form, savedData],
  );

  /* ── Field setter ─────────────────────── */
  const set = useCallback(
    <K extends keyof ProposalFormData>(key: K, value: ProposalFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  /* ── Persist / Reset ──────────────────── */
  const handleSave = async () => {
    const updated = await saveProposal(slug, form);
    if (updated) {
      setSavedData(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Excluir esta proposta permanentemente?')) return;
    await deleteProposal(slug);
    router.push('/admin');
  };

  if (!loaded) return null;

  /* ── Scroll ───────────────────────────── */
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Array helpers ────────────────────── */
  function updateArrayItem<T>(arr: T[], index: number, patch: Partial<T>): T[] {
    return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }

  function removeArrayItem<T>(arr: T[], index: number): T[] {
    return arr.filter((_, i) => i !== index);
  }

  /* ── Calculated values (Sec 9) ────────── */
  const valorTotal =
    (form.valorFontePrincipal ?? 0) + (form.valorSenai ?? 0) + (form.valorEmpresa ?? 0);
  const pctFonte = valorTotal > 0 ? ((form.valorFontePrincipal ?? 0) / valorTotal) * 100 : 0;
  const pctSenai = valorTotal > 0 ? ((form.valorSenai ?? 0) / valorTotal) * 100 : 0;
  const pctEmpresa = valorTotal > 0 ? ((form.valorEmpresa ?? 0) / valorTotal) * 100 : 0;

  /* ── Handle qtdRelatorios change ──────── */
  const handleQtdRelatoriosChange = (val: number | string) => {
    const count = typeof val === 'number' ? val : 0;
    setForm((prev) => {
      const current = prev.mesesEntregaParcial;
      let next: number[];
      if (count > current.length) {
        next = [...current, ...Array<number>(count - current.length).fill(0)];
      } else {
        next = current.slice(0, count);
      }
      return { ...prev, qtdRelatoriosEntrega: count || null, mesesEntregaParcial: next };
    });
  };

  /* ═══════════════════════════════════════ */
  /* ── Render ────────────────────────────── */
  /* ═══════════════════════════════════════ */

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Sidebar ──────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <h2 className={styles.sidebarBrandTitle}>
              <span className={styles.sidebarBrandDot} />
              Pré-Proposta
            </h2>
            <p className={styles.sidebarBrandSub}>SENAI Distrito Tecnológico</p>
          </div>

          <nav className={styles.sidebarNav}>
            {SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className={`${styles.sidebarItem} ${activeSection === sec.id ? styles.sidebarItemActive : ''}`}
                onClick={() => scrollToSection(sec.id)}
              >
                <div className={styles.sidebarItemIcon}>{sec.icon}</div>
                <span className={styles.sidebarItemLabel}>{sec.label}</span>
              </div>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              fullWidth
              component="a"
              href={`/${slug}`}
              target="_blank"
            >
              Ver Proposta ↗
            </Button>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              fullWidth
              component="a"
              href="/admin"
            >
              ← Voltar às Propostas
            </Button>
          </div>
        </aside>

        {/* ── Main Content ─────────────── */}
        <main className={styles.main}>
          <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTop}>
                <div>
                  <h1 className={styles.title}>Formulário de Pré-Proposta</h1>
                  <p className={styles.subtitle}>
                    Preencha os campos para geração da pré-proposta de projeto de inovação.
                    Campos com * são obrigatórios.
                  </p>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════ */}
            {/* Seção 1 — Identificação da Proposta   */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-1" icon={<IconBuilding size={20} />} title="Seção 1 — Identificação da Proposta" defaultOpen>
              <div className={styles.fieldGrid3}>
                <TextInput
                  label="1.1 — Nome da empresa parceira"
                  placeholder="Ex: Henkel Brasil"
                  withAsterisk
                  value={form.clientName}
                  onChange={(e) => set('clientName', e.currentTarget.value)}
                />
                <TextInput
                  label="1.2 — Título do projeto"
                  placeholder="Ex: Protótipo de sistema de monitoramento..."
                  withAsterisk
                  value={form.heroTitle}
                  onChange={(e) => set('heroTitle', e.currentTarget.value)}
                />
                <TextInput
                  label="1.3 — Responsável pelo projeto (Empresa)"
                  placeholder="Nome do responsável"
                  value={form.responsavelProjeto}
                  onChange={(e) => set('responsavelProjeto', e.currentTarget.value)}
                />
                <TextInput
                  label="1.4 — Data de elaboração"
                  description="Preenchida automaticamente com a data atual"
                  type="date"
                  value={form.dataElaboracao}
                  onChange={(e) => set('dataElaboracao', e.currentTarget.value)}
                />
                <Select
                  label="1.5 — Fonte de financiamento principal"
                  placeholder="Selecione..."
                  withAsterisk
                  data={FONTE_FINANCIAMENTO_OPTIONS}
                  value={form.fonteFinanciamento || null}
                  onChange={(val) => set('fonteFinanciamento', val ?? '')}
                />
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 2 — Contexto e Problema         */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-2" icon={<IconClipboardList size={20} />} title="Seção 2 — Contexto e Problema">
              <div className={styles.fieldGrid1}>
                <RichTextArea
                  label="2.1 — Qual é o processo ou operação da empresa que apresenta o problema?"
                  placeholder="Ex: Linha de embalagem End-of-Line com aplicação de cola quente"
                  withAsterisk
                  value={form.processoOperacao}
                  onChange={(val) => set('processoOperacao', val)}
                />
                <RichTextArea
                  label="2.2 — Quais são os desafios atuais enfrentados nesse processo?"
                  placeholder="Ex: Falta de controle sobre a quantidade de adesivo aplicado, gerando desperdício e retrabalho"
                  withAsterisk
                  value={form.desafiosAtuais}
                  onChange={(val) => set('desafiosAtuais', val)}
                />
                <RichTextArea
                  label="2.3 — Quais são os impactos mensuráveis do problema?"
                  description="Ex: desperdício, retrabalho, erros"
                  placeholder="Ex: Desperdício de 18 kg de adesivo por turno de 8h, gerando custos adicionais de R$ X/mês"
                  value={form.impactosMensuraveis}
                  onChange={(val) => set('impactosMensuraveis', val)}
                />
              </div>
              <div className={styles.fieldGrid3}>
                <TextInput
                  label="Destaque — Valor"
                  description="Número ou métrica principal do bloco de destaque"
                  placeholder="Ex: 18 kg"
                  value={form.contextoHighlightValue}
                  onChange={(e) => set('contextoHighlightValue', e.currentTarget.value)}
                />
                <TextInput
                  label="Destaque — Descrição"
                  description="Texto complementar do destaque"
                  placeholder="Ex: de adesivo desperdiçado por turno de 8h"
                  value={form.contextoHighlightLabel}
                  onChange={(e) => set('contextoHighlightLabel', e.currentTarget.value)}
                />
                <Switch
                  label="2.4 — Existe alguma solução prévia já desenvolvida ou testada?"
                  checked={form.existeSolucaoPrevia}
                  onChange={(e) => set('existeSolucaoPrevia', e.currentTarget.checked)}
                  size="md"
                  mt="auto"
                />
              </div>
              {form.existeSolucaoPrevia && (
                <div className={styles.fieldGrid1}>
                  <RichTextArea
                    label="2.5 — Descreva o que já foi feito e quais limitações foram identificadas"
                    description="Visível somente quando 2.4 = Sim"
                    placeholder="Ex: Foi testada uma solução manual de pesagem, mas sem integração com o sistema de controle"
                    value={form.descricaoSolucaoPrevia}
                    onChange={(val) => set('descricaoSolucaoPrevia', val)}
                  />
                </div>
              )}

              {/* ── Diagrama de fluxo (subsection) ── */}
              <div className={styles.subsectionDivider}>
                <span className={styles.subsectionLabel}>Diagrama de Fluxo</span>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.fieldFull}>
                  <TextInput
                    label="2.6 — Título do diagrama"
                    placeholder="Ex: Fluxo do processo monitorado"
                    value={form.diagramTitle}
                    onChange={(e) => set('diagramTitle', e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className={styles.diagramArrayHeader}>
                <span className={styles.diagramArrayLabel}>2.7 — Etapas do diagrama</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('diagramNodes', [
                      ...form.diagramNodes,
                      { icon: '', label: '', sub: '', isSuccess: false },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.diagramNodes.length === 0 && (
                <div className={styles.emptyState}>
                  Nenhuma etapa adicionada. O diagrama ficará oculto na proposta.
                </div>
              )}
              <div className={styles.diagramNodesGrid}>
              {form.diagramNodes.map((node, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>
                      ETAPA #{i + 1}
                    </span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() =>
                          set('diagramNodes', removeArrayItem(form.diagramNodes, i))
                        }
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <div className={styles.diagramNodeFields}>
                    <div className={styles.diagramNodeRow}>
                      <div className={styles.diagramNodeIconCol}>
                        <Select
                          label="Ícone"
                          placeholder="Selecione"
                          data={DIAGRAM_ICON_OPTIONS}
                          value={node.icon || null}
                          onChange={(val) =>
                            set(
                              'diagramNodes',
                              updateArrayItem<DiagramNode>(form.diagramNodes, i, {
                                icon: val ?? '',
                              }),
                            )
                          }
                          searchable
                          leftSection={
                            node.icon && DIAGRAM_ICON_MAP[node.icon]
                              ? (() => { const Ic = DIAGRAM_ICON_MAP[node.icon]; return <Ic size={16} color="var(--color-neutral-light-4)" />; })()
                              : undefined
                          }
                          renderOption={({ option }) => {
                            const Ic = DIAGRAM_ICON_MAP[option.value];
                            return (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {Ic && <Ic size={16} color="var(--color-neutral-light-4)" />}
                                <span>{option.label}</span>
                              </div>
                            );
                          }}
                        />
                      </div>
                      <div className={styles.diagramNodeTitleCol}>
                        <TextInput
                          label="Título da etapa"
                          placeholder="Ex: Contagem de Entrada"
                          value={node.label}
                          onChange={(e) =>
                            set(
                              'diagramNodes',
                              updateArrayItem<DiagramNode>(form.diagramNodes, i, {
                                label: e.currentTarget.value,
                              }),
                            )
                          }
                        />
                      </div>
                    </div>
                    <TextInput
                      label="Subtítulo"
                      placeholder="Ex: Sensor fotoelétrico"
                      value={node.sub}
                      onChange={(e) =>
                        set(
                          'diagramNodes',
                          updateArrayItem<DiagramNode>(form.diagramNodes, i, {
                            sub: e.currentTarget.value,
                          }),
                        )
                      }
                    />
                    <div className={styles.diagramNodeSwitch}>
                      <Switch
                        label="Sucesso"
                        checked={!!node.isSuccess}
                        onChange={(e) =>
                          set(
                            'diagramNodes',
                            updateArrayItem<DiagramNode>(form.diagramNodes, i, {
                              isSuccess: e.currentTarget.checked,
                            }),
                          )
                        }
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 3 — Objetivo do Projeto         */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-3" icon={<IconTarget size={20} />} title="Seção 3 — Objetivo do Projeto">
              <div className={styles.fieldGrid}>
                <div className={styles.fieldFull}>
                  <RichTextArea
                    label="3.1 — Qual é o objetivo central do projeto?"
                    placeholder="Ex: Desenvolver um protótipo funcional para monitoramento da aplicação de cola quente"
                    withAsterisk
                    value={form.objetivoCentral}
                    onChange={(val) => set('objetivoCentral', val)}
                  />
                </div>
                <NumberInput
                  label="3.2 — Prazo estimado de execução (meses)"
                  description="Valor espelhado automaticamente no campo 8.1"
                  placeholder="Ex: 15"
                  withAsterisk
                  value={form.totalMonths}
                  onChange={(val) => set('totalMonths', typeof val === 'number' ? val : 1)}
                  min={1}
                  max={60}
                  allowDecimal={false}
                />
                <div />
                <div className={styles.fieldFull}>
                  <RichTextArea
                    label="3.3 — Qual tecnologia ou abordagem será utilizada para resolver o problema?"
                    placeholder="Ex: Sensores IoT, visão computacional, sistema embarcado com comunicação MQTT"
                    value={form.tecnologiaAbordagem}
                    onChange={(val) => set('tecnologiaAbordagem', val)}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <RichTextArea
                    label="3.4 — Quais são os resultados esperados ao final do projeto?"
                    placeholder="Ex: Redução de 30% no desperdício de adesivo, dashboard de monitoramento em tempo real"
                    value={form.resultadosEsperados}
                    onChange={(val) => set('resultadosEsperados', val)}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 4 — TRL                         */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-4" icon={<IconFlask size={20} />} title="Seção 4 — TRL (Technology Readiness Level)">
              <div className={styles.fieldGrid}>
                <Select
                  label="4.1 — TRL inicial do projeto"
                  placeholder="Selecione..."
                  withAsterisk
                  data={TRL_OPTIONS}
                  value={form.trlInicial || null}
                  onChange={(val) => set('trlInicial', val ?? '')}
                />
                <Select
                  label="4.2 — TRL final esperado"
                  placeholder="Selecione..."
                  description="Deve ser ≥ TRL inicial"
                  withAsterisk
                  data={TRL_OPTIONS}
                  value={form.trlFinal || null}
                  onChange={(val) => set('trlFinal', val ?? '')}
                />
                <div className={styles.fieldFull}>
                  <RichTextArea
                    label="4.3 — Justificativa para o TRL inicial"
                    placeholder="Ex: Já existem estudos laboratoriais comprovando a viabilidade dos sensores selecionados"
                    value={form.justificativaTrlInicial}
                    onChange={(val) => set('justificativaTrlInicial', val)}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <RichTextArea
                    label="4.4 — Justificativa para o TRL final esperado"
                    placeholder="Ex: Ao final, o protótipo estará validado em ambiente industrial real"
                    value={form.justificativaTrlFinal}
                    onChange={(val) => set('justificativaTrlFinal', val)}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 5 — Escopo                      */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-5"
              icon={<IconListCheck size={20} />}
              title="Seção 5 — Escopo"
              count={form.escopoItems.length + form.naoEscopoItems.length}
            >
              {/* 5.1 — Dentro do Escopo */}
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>5.1 — Itens dentro do escopo *</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('escopoItems', [...form.escopoItems, { text: '' }])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.escopoItems.length === 0 && (
                <div className={styles.emptyState}>Nenhum item de escopo adicionado</div>
              )}
              {form.escopoItems.map((item, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>ESCOPO #{i + 1}</span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() =>
                          set('escopoItems', removeArrayItem(form.escopoItems, i))
                        }
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <TextInput
                    placeholder="Descrição do item de escopo..."
                    value={item.text}
                    onChange={(e) =>
                      set(
                        'escopoItems',
                        updateArrayItem<EscopoItem>(form.escopoItems, i, {
                          text: e.currentTarget.value,
                        }),
                      )
                    }
                  />
                </div>
              ))}

              {/* 5.2 — Fora do Escopo */}
              <div className={styles.arraySection}>
                <div className={styles.arrayHeader}>
                  <span className={styles.arrayTitle}>5.2 — Itens fora do escopo</span>
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() =>
                      set('naoEscopoItems', [...form.naoEscopoItems, { text: '' }])
                    }
                  >
                    + Adicionar
                  </Button>
                </div>
                {form.naoEscopoItems.length === 0 && (
                  <div className={styles.emptyState}>Nenhum item fora do escopo</div>
                )}
                {form.naoEscopoItems.map((item, i) => (
                  <div key={i} className={styles.arrayItem}>
                    <div className={styles.arrayItemHeader}>
                      <span className={styles.arrayItemIndex}>NÃO ESCOPO #{i + 1}</span>
                      <Tooltip label="Remover">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          onClick={() =>
                            set('naoEscopoItems', removeArrayItem(form.naoEscopoItems, i))
                          }
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                    <TextInput
                      placeholder="Descrição do item fora do escopo..."
                      value={item.text}
                      onChange={(e) =>
                        set(
                          'naoEscopoItems',
                          updateArrayItem<EscopoItem>(form.naoEscopoItems, i, {
                            text: e.currentTarget.value,
                          }),
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              {/* 5.3 — Restrições */}
              <div className={styles.arraySection}>
                <div className={styles.fieldGrid}>
                  <div className={styles.fieldFull}>
                    <RichTextArea
                      label="5.3 — Existem restrições de quantidade, modelos ou ambientes?"
                      description='Ex: "Apenas 5 conjuntos de montagem serão considerados"'
                      placeholder="Ex: Validação limitada a 2 linhas de produção na unidade de Itapevi"
                      value={form.restricoesEscopo}
                      onChange={(val) => set('restricoesEscopo', val)}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 6 — Macroatividades              */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-6"
              icon={<IconPackage size={20} />}
              title="Seção 6 — Macroatividades / Macroentregas"
              count={form.macroatividades.length}
            >
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>Macroatividades</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('macroatividades', [
                      ...form.macroatividades,
                      {
                        numero: form.macroatividades.length + 1,
                        nome: '',
                        descricao: '',
                        areaResponsavel: '',
                        mesInicio: null,
                        mesTermino: null,
                      },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.macroatividades.length === 0 && (
                <div className={styles.emptyState}>
                  Nenhuma macroatividade adicionada. Mínimo de 1 entrada.
                </div>
              )}
              {form.macroatividades.map((item, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>
                      MACROATIVIDADE #{item.numero}
                    </span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => {
                          const next = removeArrayItem(form.macroatividades, i).map(
                            (m, idx) => ({ ...m, numero: idx + 1 }),
                          );
                          set('macroatividades', next);
                        }}
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <div className={styles.arrayItemFields}>
                    <NumberInput
                      label="6.1 — Número"
                      description="Gerado automaticamente"
                      value={item.numero}
                      readOnly
                      allowDecimal={false}
                    />
                    <TextInput
                      label="6.2 — Nome da macroatividade"
                      withAsterisk
                      placeholder="Ex: Refinamento técnico"
                      value={item.nome}
                      onChange={(e) =>
                        set(
                          'macroatividades',
                          updateArrayItem<MacroatividadeForm>(form.macroatividades, i, {
                            nome: e.currentTarget.value,
                          }),
                        )
                      }
                    />
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="6.3 — Descrição detalhada da atividade"
                        placeholder="Ex: Levantamento de requisitos técnicos, definição de arquitetura e seleção de componentes"
                        value={item.descricao}
                        onChange={(val) =>
                          set(
                            'macroatividades',
                            updateArrayItem<MacroatividadeForm>(form.macroatividades, i, {
                              descricao: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <TextInput
                      label="6.4 — Área responsável"
                      placeholder='Ex: "Vertical TDA", "Software e Automação"'
                      value={item.areaResponsavel}
                      onChange={(e) =>
                        set(
                          'macroatividades',
                          updateArrayItem<MacroatividadeForm>(form.macroatividades, i, {
                            areaResponsavel: e.currentTarget.value,
                          }),
                        )
                      }
                    />
                    <div />
                    <NumberInput
                      label="6.5 — Mês de início"
                      description={`Entre 1 e ${form.totalMonths}`}
                      placeholder="Ex: 1"
                      value={item.mesInicio ?? ''}
                      onChange={(val) =>
                        set(
                          'macroatividades',
                          updateArrayItem<MacroatividadeForm>(form.macroatividades, i, {
                            mesInicio: typeof val === 'number' ? val : null,
                          }),
                        )
                      }
                      min={1}
                      max={form.totalMonths || undefined}
                      allowDecimal={false}
                    />
                    <NumberInput
                      label="6.6 — Mês de término"
                      description={`Entre 1 e ${form.totalMonths}. Deve ser ≥ mês de início`}
                      placeholder="Ex: 5"
                      value={item.mesTermino ?? ''}
                      onChange={(val) =>
                        set(
                          'macroatividades',
                          updateArrayItem<MacroatividadeForm>(form.macroatividades, i, {
                            mesTermino: typeof val === 'number' ? val : null,
                          }),
                        )
                      }
                      min={item.mesInicio ?? 1}
                      max={form.totalMonths || undefined}
                      allowDecimal={false}
                    />
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 7 — Premissas                   */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-7"
              icon={<IconPinned size={20} />}
              title="Seção 7 — Premissas"
              count={form.premissasForm.length}
            >
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>Premissas do Projeto</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('premissasForm', [
                      ...form.premissasForm,
                      { descricao: '', responsavel: '', prazo: null },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.premissasForm.length === 0 && (
                <div className={styles.emptyState}>Nenhuma premissa adicionada</div>
              )}
              {form.premissasForm.map((item, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>PREMISSA #{i + 1}</span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() =>
                          set('premissasForm', removeArrayItem(form.premissasForm, i))
                        }
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <div className={styles.arrayItemFields}>
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="7.1 — Descrição da premissa"
                        placeholder="Ex: A empresa fornecerá acesso à linha de produção para instalação dos sensores"
                        withAsterisk
                        value={item.descricao}
                        onChange={(val) =>
                          set(
                            'premissasForm',
                            updateArrayItem<PremissaForm>(form.premissasForm, i, {
                              descricao: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <Select
                      label="7.2 — Responsável pelo cumprimento"
                      placeholder="Selecione..."
                      data={RESPONSAVEL_OPTIONS}
                      value={item.responsavel || null}
                      onChange={(val) =>
                        set(
                          'premissasForm',
                          updateArrayItem<PremissaForm>(form.premissasForm, i, {
                            responsavel: val ?? '',
                          }),
                        )
                      }
                    />
                    <NumberInput
                      label="7.3 — Prazo (mês do projeto)"
                      description={`Entre 1 e ${form.totalMonths}`}
                      placeholder="Ex: 3"
                      value={item.prazo ?? ''}
                      onChange={(val) =>
                        set(
                          'premissasForm',
                          updateArrayItem<PremissaForm>(form.premissasForm, i, {
                            prazo: typeof val === 'number' ? val : null,
                          }),
                        )
                      }
                      min={1}
                      max={form.totalMonths || undefined}
                      allowDecimal={false}
                    />
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 8 — Cronograma e Entregas       */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-8" icon={<IconCalendar size={20} />} title="Seção 8 — Cronograma e Entregas">
              <div className={styles.fieldGrid}>
                <NumberInput
                  label="8.1 — Duração total do projeto (meses)"
                  description="Espelhado automaticamente do campo 3.2"
                  withAsterisk
                  value={form.totalMonths}
                  readOnly
                  allowDecimal={false}
                />
                <NumberInput
                  label="8.2 — Relatórios de entrega parcial previstos"
                  placeholder="Ex: 3"
                  value={form.qtdRelatoriosEntrega ?? ''}
                  onChange={handleQtdRelatoriosChange}
                  min={0}
                  max={20}
                  allowDecimal={false}
                />
              </div>

              {(form.qtdRelatoriosEntrega ?? 0) > 0 && (
                <div className={styles.arraySection}>
                  <div className={styles.arrayHeader}>
                    <span className={styles.arrayTitle}>
                      8.3 — Mês de cada entrega parcial
                    </span>
                  </div>
                  <div className={styles.fieldGrid}>
                    {Array.from({ length: form.qtdRelatoriosEntrega ?? 0 }).map((_, i) => (
                      <NumberInput
                        key={i}
                        label={`Entrega parcial ${i + 1}`}
                        placeholder="Mês"
                        value={form.mesesEntregaParcial[i] ?? ''}
                        onChange={(val) => {
                          const next = [...form.mesesEntregaParcial];
                          next[i] = typeof val === 'number' ? val : 0;
                          set('mesesEntregaParcial', next);
                        }}
                        min={1}
                        max={form.totalMonths || undefined}
                        allowDecimal={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.fieldGrid} style={{ marginTop: 18 }}>
                <NumberInput
                  label="8.4 — Mês da entrega final"
                  description={`Entre 1 e ${form.totalMonths}`}
                  placeholder="Ex: 15"
                  value={form.mesEntregaFinal ?? ''}
                  onChange={(val) =>
                    set('mesEntregaFinal', typeof val === 'number' ? val : null)
                  }
                  min={1}
                  max={form.totalMonths || undefined}
                  allowDecimal={false}
                />
              </div>

              {/* 8.5 — Meses de repasse financeiro */}
              <div className={styles.arraySection}>
                <div className={styles.arrayHeader}>
                  <span className={styles.arrayTitle}>
                    8.5 — Meses de repasse financeiro
                  </span>
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() =>
                      set('mesesRepasseFinanceiro', [...form.mesesRepasseFinanceiro, 0])
                    }
                  >
                    + Adicionar
                  </Button>
                </div>
                {form.mesesRepasseFinanceiro.length === 0 && (
                  <div className={styles.emptyState}>Nenhum repasse definido</div>
                )}
                <div className={styles.fieldGrid}>
                  {form.mesesRepasseFinanceiro.map((mes, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                      <NumberInput
                        label={`Repasse ${i + 1}`}
                        placeholder="Mês"
                        value={mes || ''}
                        onChange={(val) => {
                          const next = [...form.mesesRepasseFinanceiro];
                          next[i] = typeof val === 'number' ? val : 0;
                          set('mesesRepasseFinanceiro', next);
                        }}
                        min={1}
                        max={form.totalMonths || undefined}
                        allowDecimal={false}
                        style={{ flex: 1 }}
                      />
                      <Tooltip label="Remover">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          style={{ marginBottom: 4 }}
                          onClick={() =>
                            set(
                              'mesesRepasseFinanceiro',
                              removeArrayItem(form.mesesRepasseFinanceiro, i),
                            )
                          }
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 9 — Orçamento                   */}
            {/* ═════════════════════════════════════ */}
            <SectionCard id="sec-9" icon={<IconCurrencyDollar size={20} />} title="Seção 9 — Orçamento">
              <div className={styles.fieldGrid}>
                <NumberInput
                  label="9.1 — Contrapartida financeira da fonte principal (R$)"
                  description={form.fonteFinanciamento ? `Fonte: ${form.fonteFinanciamento}` : 'Defina a fonte na Seção 1'}
                  placeholder="Ex: 500.000,00"
                  withAsterisk
                  prefix="R$ "
                  decimalScale={2}
                  thousandSeparator="."
                  decimalSeparator=","
                  value={form.valorFontePrincipal ?? ''}
                  onChange={(val) =>
                    set('valorFontePrincipal', typeof val === 'number' ? val : null)
                  }
                  min={0}
                />
                <TextInput
                  label="9.2 — Percentual da fonte principal (%)"
                  description="Calculado automaticamente"
                  value={valorTotal > 0 ? `${pctFonte.toFixed(1)}%` : '—'}
                  readOnly
                />
                <NumberInput
                  label="9.3 — Contrapartida econômica do SENAI (R$)"
                  placeholder="Ex: 300.000,00"
                  withAsterisk
                  prefix="R$ "
                  decimalScale={2}
                  thousandSeparator="."
                  decimalSeparator=","
                  value={form.valorSenai ?? ''}
                  onChange={(val) =>
                    set('valorSenai', typeof val === 'number' ? val : null)
                  }
                  min={0}
                />
                <TextInput
                  label="9.4 — Percentual do SENAI (%)"
                  description="Calculado automaticamente"
                  value={valorTotal > 0 ? `${pctSenai.toFixed(1)}%` : '—'}
                  readOnly
                />
                <NumberInput
                  label="9.5 — Contrapartida financeira da empresa (R$)"
                  placeholder="Ex: 200.000,00"
                  withAsterisk
                  prefix="R$ "
                  decimalScale={2}
                  thousandSeparator="."
                  decimalSeparator=","
                  value={form.valorEmpresa ?? ''}
                  onChange={(val) =>
                    set('valorEmpresa', typeof val === 'number' ? val : null)
                  }
                  min={0}
                />
                <TextInput
                  label="9.6 — Percentual da empresa (%)"
                  description="Calculado automaticamente"
                  value={valorTotal > 0 ? `${pctEmpresa.toFixed(1)}%` : '—'}
                  readOnly
                />
                <div className={styles.fieldFull}>
                  <TextInput
                    label="9.7 — Valor total do projeto (R$)"
                    description="Calculado automaticamente: 9.1 + 9.3 + 9.5"
                    value={valorTotal > 0 ? formatBRL(valorTotal) : '—'}
                    readOnly
                    styles={{
                      input: {
                        fontWeight: 700,
                        fontSize: 16,
                        color: '#fff',
                      },
                    }}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 10 — Detalhamento do Orçamento  */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-10"
              icon={<IconChartBar size={20} />}
              title="Seção 10 — Detalhamento do Orçamento por Categoria"
              count={form.orcamentoCategorias.length}
            >
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>Categorias de Custo</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('orcamentoCategorias', [
                      ...form.orcamentoCategorias,
                      { categoria: '', fonteResponsavel: '', tipoContrapartida: '', valor: null },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.orcamentoCategorias.length === 0 && (
                <div className={styles.emptyState}>Nenhuma categoria adicionada</div>
              )}
              {form.orcamentoCategorias.map((item, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>CATEGORIA #{i + 1}</span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() =>
                          set(
                            'orcamentoCategorias',
                            removeArrayItem(form.orcamentoCategorias, i),
                          )
                        }
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <div className={styles.arrayItemFields}>
                    <Select
                      label="10.1 — Categoria de custo"
                      placeholder="Selecione..."
                      data={CATEGORIA_CUSTO_OPTIONS}
                      value={item.categoria || null}
                      onChange={(val) =>
                        set(
                          'orcamentoCategorias',
                          updateArrayItem<OrcamentoCategoriaForm>(form.orcamentoCategorias, i, {
                            categoria: val ?? '',
                          }),
                        )
                      }
                    />
                    <Select
                      label="10.2 — Fonte responsável"
                      placeholder="Selecione..."
                      data={FONTE_RESPONSAVEL_OPTIONS}
                      value={item.fonteResponsavel || null}
                      onChange={(val) =>
                        set(
                          'orcamentoCategorias',
                          updateArrayItem<OrcamentoCategoriaForm>(form.orcamentoCategorias, i, {
                            fonteResponsavel: val ?? '',
                          }),
                        )
                      }
                    />
                    <Select
                      label="10.3 — Tipo de contrapartida"
                      placeholder="Selecione..."
                      data={TIPO_CONTRAPARTIDA_OPTIONS}
                      value={item.tipoContrapartida || null}
                      onChange={(val) =>
                        set(
                          'orcamentoCategorias',
                          updateArrayItem<OrcamentoCategoriaForm>(form.orcamentoCategorias, i, {
                            tipoContrapartida: val ?? '',
                          }),
                        )
                      }
                    />
                    <NumberInput
                      label="10.4 — Valor (R$)"
                      placeholder="Ex: 50.000,00"
                      prefix="R$ "
                      decimalScale={2}
                      thousandSeparator="."
                      decimalSeparator=","
                      value={item.valor ?? ''}
                      onChange={(val) =>
                        set(
                          'orcamentoCategorias',
                          updateArrayItem<OrcamentoCategoriaForm>(form.orcamentoCategorias, i, {
                            valor: typeof val === 'number' ? val : null,
                          }),
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 11 — Previsão de Compras        */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-11"
              icon={<IconShoppingCart size={20} />}
              title="Seção 11 — Previsão de Compras"
              count={form.compras.length}
            >
              <Text size="xs" c="dimmed" mb="md">
                Itens a serem adquiridos pela empresa, não inclusos no orçamento do projeto.
              </Text>
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>Itens de Compra</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('compras', [
                      ...form.compras,
                      { nome: '', quantidade: null, valorUnitario: null, observacoes: '' },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.compras.length === 0 && (
                <div className={styles.emptyState}>Nenhum item adicionado</div>
              )}
              {form.compras.map((item, i) => {
                const custoTotal =
                  item.quantidade != null && item.valorUnitario != null
                    ? item.quantidade * item.valorUnitario
                    : null;
                return (
                  <div key={i} className={styles.arrayItem}>
                    <div className={styles.arrayItemHeader}>
                      <span className={styles.arrayItemIndex}>ITEM #{i + 1}</span>
                      <Tooltip label="Remover">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          onClick={() => set('compras', removeArrayItem(form.compras, i))}
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                    <div className={styles.arrayItemFields}>
                      <TextInput
                        label="11.1 — Nome do material ou equipamento"
                        placeholder="Ex: Sensor de temperatura industrial"
                        value={item.nome}
                        onChange={(e) =>
                          set(
                            'compras',
                            updateArrayItem<CompraForm>(form.compras, i, {
                              nome: e.currentTarget.value,
                            }),
                          )
                        }
                      />
                      <NumberInput
                        label="11.2 — Quantidade"
                        placeholder="Ex: 5"
                        value={item.quantidade ?? ''}
                        onChange={(val) =>
                          set(
                            'compras',
                            updateArrayItem<CompraForm>(form.compras, i, {
                              quantidade: typeof val === 'number' ? val : null,
                            }),
                          )
                        }
                        min={0}
                        allowDecimal={false}
                      />
                      <NumberInput
                        label="11.3 — Valor unitário estimado (R$)"
                        placeholder="Ex: 1.200,00"
                        prefix="R$ "
                        decimalScale={2}
                        thousandSeparator="."
                        decimalSeparator=","
                        value={item.valorUnitario ?? ''}
                        onChange={(val) =>
                          set(
                            'compras',
                            updateArrayItem<CompraForm>(form.compras, i, {
                              valorUnitario: typeof val === 'number' ? val : null,
                            }),
                          )
                        }
                        min={0}
                      />
                      <TextInput
                        label="11.4 — Custo total (R$)"
                        description="Calculado: 11.2 × 11.3"
                        value={custoTotal != null ? formatBRL(custoTotal) : '—'}
                        readOnly
                      />
                      <div className={styles.arrayItemFieldFull}>
                        <TextInput
                          label="11.5 — Observações"
                          placeholder="Ex: Fornecedor preferencial, prazo de entrega estimado, etc."
                          value={item.observacoes}
                          onChange={(e) =>
                            set(
                              'compras',
                              updateArrayItem<CompraForm>(form.compras, i, {
                                observacoes: e.currentTarget.value,
                              }),
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </SectionCard>

            {/* ═════════════════════════════════════ */}
            {/* Seção 12 — Matriz de Riscos           */}
            {/* ═════════════════════════════════════ */}
            <SectionCard
              id="sec-12"
              icon={<IconAlertTriangle size={20} />}
              title="Seção 12 — Matriz de Riscos"
              count={form.riscosForm.length}
            >
              <div className={styles.arrayHeader}>
                <span className={styles.arrayTitle}>Riscos Identificados</span>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() =>
                    set('riscosForm', [
                      ...form.riscosForm,
                      {
                        descricao: '',
                        causas: '',
                        consequencias: '',
                        nivelExposicao: '',
                        estrategiaGestao: '',
                        acaoContencao: '',
                        responsavel: '',
                      },
                    ])
                  }
                >
                  + Adicionar
                </Button>
              </div>
              {form.riscosForm.length === 0 && (
                <div className={styles.emptyState}>Nenhum risco adicionado</div>
              )}
              {form.riscosForm.map((risco, i) => (
                <div key={i} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayItemIndex}>RISCO #{i + 1}</span>
                    <Tooltip label="Remover">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() =>
                          set('riscosForm', removeArrayItem(form.riscosForm, i))
                        }
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                  <div className={styles.arrayItemFields}>
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="12.1 — Descrição do risco"
                        placeholder="Ex: Atraso na entrega de componentes importados"
                        value={risco.descricao}
                        onChange={(val) =>
                          set(
                            'riscosForm',
                            updateArrayItem<RiscoForm>(form.riscosForm, i, {
                              descricao: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="12.2 — Causas do risco"
                        placeholder="Ex: Dependência de fornecedores internacionais com lead time longo"
                        value={risco.causas}
                        onChange={(val) =>
                          set(
                            'riscosForm',
                            updateArrayItem<RiscoForm>(form.riscosForm, i, {
                              causas: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="12.3 — Consequências"
                        placeholder="Ex: Atraso no cronograma de 2 meses, impactando a entrega final"
                        value={risco.consequencias}
                        onChange={(val) =>
                          set(
                            'riscosForm',
                            updateArrayItem<RiscoForm>(form.riscosForm, i, {
                              consequencias: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <Select
                      label="12.4 — Nível de exposição ao risco"
                      placeholder="Selecione..."
                      data={NIVEL_EXPOSICAO_OPTIONS}
                      value={risco.nivelExposicao || null}
                      onChange={(val) =>
                        set(
                          'riscosForm',
                          updateArrayItem<RiscoForm>(form.riscosForm, i, {
                            nivelExposicao: val ?? '',
                          }),
                        )
                      }
                    />
                    <Select
                      label="12.5 — Estratégia de gestão"
                      placeholder="Selecione..."
                      data={ESTRATEGIA_GESTAO_OPTIONS}
                      value={risco.estrategiaGestao || null}
                      onChange={(val) =>
                        set(
                          'riscosForm',
                          updateArrayItem<RiscoForm>(form.riscosForm, i, {
                            estrategiaGestao: val ?? '',
                          }),
                        )
                      }
                    />
                    <div className={styles.arrayItemFieldFull}>
                      <RichTextArea
                        label="12.6 — Ação de contenção ou alavancagem"
                        placeholder="Ex: Mapear fornecedores alternativos nacionais como plano B"
                        value={risco.acaoContencao}
                        onChange={(val) =>
                          set(
                            'riscosForm',
                            updateArrayItem<RiscoForm>(form.riscosForm, i, {
                              acaoContencao: val,
                            }),
                          )
                        }
                      />
                    </div>
                    <Select
                      label="12.7 — Responsável"
                      placeholder="Selecione..."
                      data={RESPONSAVEL_OPTIONS}
                      value={risco.responsavel || null}
                      onChange={(val) =>
                        set(
                          'riscosForm',
                          updateArrayItem<RiscoForm>(form.riscosForm, i, {
                            responsavel: val ?? '',
                          }),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* Spacer for save bar */}
            <div style={{ height: 80 }} />
          </div>
        </main>
      </div>

      {/* ── Floating Save Bar ──────────── */}
      <div className={styles.saveBar}>
        {isDirty && (
          <div className={styles.saveBarStatus}>
            <span className={styles.unsavedDot} />
            Alterações não salvas
          </div>
        )}
        <Button variant="subtle" color="red" onClick={handleDelete}>
          Excluir
        </Button>
        <Button color="red" onClick={handleSave} disabled={!isDirty}>
          Salvar Alterações
        </Button>
      </div>

      {saved && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}><IconCheck size={16} /></span>
          Alterações salvas com sucesso!
        </div>
      )}
    </div>
  );
}
