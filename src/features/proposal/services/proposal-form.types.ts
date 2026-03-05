import type {
  HeroMeta,
  DiagramNode,
  Premissa,
  EscopoItem,
  Macroentrega,
  TrlInfo,
  GanttItem,
  RiscoItem,
  OrcamentoItem,
  OrcamentoTotal,
  LegendItem,
  MacroatividadeForm,
  PremissaForm,
  OrcamentoCategoriaForm,
  CompraForm,
  RiscoForm,
} from './proposal.types';

/** All editable content for the proposal page */
export interface ProposalFormData {
  /* ── Hero ─────────────────────────────────── */
  heroTag: string;
  clientName: string;
  clientNameAccent: string;
  heroTitle: string;
  heroBgText: string;
  heroNumber: string;
  heroMeta: HeroMeta[];

  /* ── Top Nav ──────────────────────────────── */
  navBrand: string;
  navBrandAccent: string;
  navBadge: string;

  /* ── Contexto ─────────────────────────────── */
  contextoTitle: string;
  contextoParagraphs: string[];
  contextoHighlightValue: string;
  contextoHighlightLabel: string;
  diagramTitle: string;
  diagramNodes: DiagramNode[];

  /* ── Objetivo ─────────────────────────────── */
  objetivoText: string;

  /* ── Premissas ────────────────────────────── */
  premissas: Premissa[];

  /* ── Escopo ───────────────────────────────── */
  escopoItems: EscopoItem[];
  naoEscopoItems: EscopoItem[];

  /* ── Macroentregas ────────────────────────── */
  macroentregas: Macroentrega[];
  trlInfo: TrlInfo;

  /* ── Cronograma ───────────────────────────── */
  ganttData: GanttItem[];
  totalMonths: number;

  /* ── Riscos ───────────────────────────────── */
  riscos: RiscoItem[];

  /* ── Orçamento ────────────────────────────── */
  orcamentoItems: OrcamentoItem[];
  orcamentoTotal: OrcamentoTotal;
  orcamentoLegend: LegendItem[];

  /* ── Footer ───────────────────────────────── */
  footerBrand: string;
  footerBrandAccent: string;
  footerInfoText: string;
  footerInfoAccent: string;
  footerCode: string;

  /* ═══════════════════════════════════════════ */
  /* ── Formulário Pré-Proposta ──────────────── */
  /* ═══════════════════════════════════════════ */

  /* ── Seção 1 — Identificação ──────────────── */
  responsavelProjeto: string;
  dataElaboracao: string;
  fonteFinanciamento: string;

  /* ── Seção 2 — Contexto e Problema ────────── */
  processoOperacao: string;
  desafiosAtuais: string;
  impactosMensuraveis: string;
  existeSolucaoPrevia: boolean;
  descricaoSolucaoPrevia: string;

  /* ── Seção 3 — Objetivo ──────────────────── */
  objetivoCentral: string;
  tecnologiaAbordagem: string;
  resultadosEsperados: string;

  /* ── Seção 4 — TRL ─────────────────────── */
  trlInicial: string;
  trlFinal: string;
  justificativaTrlInicial: string;
  justificativaTrlFinal: string;

  /* ── Seção 5 — Escopo ──────────────────── */
  dentroEscopo: string;
  foraEscopo: string;
  restricoesEscopo: string;

  /* ── Seção 6 — Macroatividades ─────────── */
  macroatividades: MacroatividadeForm[];

  /* ── Seção 7 — Premissas (Form) ────────── */
  premissasForm: PremissaForm[];

  /* ── Seção 8 — Cronograma e Entregas ───── */
  qtdRelatoriosEntrega: number | null;
  mesesEntregaParcial: number[];
  mesEntregaFinal: number | null;
  mesesRepasseFinanceiro: number[];

  /* ── Seção 9 — Orçamento (Form) ────────── */
  valorFontePrincipal: number | null;
  valorSenai: number | null;
  valorEmpresa: number | null;

  /* ── Seção 10 — Detalhamento Orçamento ──── */
  orcamentoCategorias: OrcamentoCategoriaForm[];

  /* ── Seção 11 — Previsão de Compras ─────── */
  compras: CompraForm[];

  /* ── Seção 12 — Matriz de Riscos (Form) ─── */
  riscosForm: RiscoForm[];
}
