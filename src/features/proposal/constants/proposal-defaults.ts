import type { ProposalFormData } from '../services/proposal-form.types';

export const DEFAULT_PROPOSAL: ProposalFormData = {
  /* Hero */
  heroTag: '',
  clientName: '',
  clientNameAccent: '',
  heroTitle: '',
  heroBgText: '',
  heroNumber: '',
  heroMeta: [],

  /* Top Nav */
  navBrand: 'DT',
  navBrandAccent: '· SENAI São Paulo',
  navBadge: 'Pré Proposta',

  /* Contexto */
  contextoTitle: '',
  contextoParagraphs: [],
  contextoHighlightValue: '',
  contextoHighlightLabel: '',
  diagramTitle: '',
  diagramNodes: [],

  /* Objetivo */
  objetivoText: '',

  /* Premissas */
  premissas: [],

  /* Escopo */
  escopoItems: [],
  naoEscopoItems: [],

  /* Macroentregas */
  macroentregas: [],
  trlInfo: { from: '', to: '', description: '' },

  /* Cronograma */
  ganttData: [],
  totalMonths: 0,

  /* Riscos */
  riscos: [],

  /* Orçamento */
  orcamentoItems: [],
  orcamentoTotal: { value: '', formatted: '' },
  orcamentoLegend: [],

  /* Footer */
  footerBrand: 'SENAI',
  footerBrandAccent: 'Innovation',
  footerInfoText: 'Proposta Técnica & Comercial —',
  footerInfoAccent: '',
  footerCode: '',

  /* ═══════════════════════════════════════════ */
  /* ── Formulário Pré-Proposta ──────────────── */
  /* ═══════════════════════════════════════════ */

  /* Seção 1 — Identificação */
  responsavelProjeto: '',
  dataElaboracao: new Date().toISOString().slice(0, 10),
  fonteFinanciamento: '',

  /* Seção 2 — Contexto e Problema */
  processoOperacao: '',
  desafiosAtuais: '',
  impactosMensuraveis: '',
  existeSolucaoPrevia: false,
  descricaoSolucaoPrevia: '',

  /* Seção 3 — Objetivo */
  objetivoCentral: '',
  tecnologiaAbordagem: '',
  resultadosEsperados: '',

  /* Seção 4 — TRL */
  trlInicial: '',
  trlFinal: '',
  justificativaTrlInicial: '',
  justificativaTrlFinal: '',

  /* Seção 5 — Escopo */
  dentroEscopo: '',
  foraEscopo: '',
  restricoesEscopo: '',

  /* Seção 6 — Macroatividades */
  macroatividades: [],

  /* Seção 7 — Premissas */
  premissasForm: [],

  /* Seção 8 — Cronograma */
  qtdRelatoriosEntrega: null,
  mesesEntregaParcial: [],
  mesEntregaFinal: null,
  mesesRepasseFinanceiro: [],

  /* Seção 9 — Orçamento */
  valorFontePrincipal: null,
  valorSenai: null,
  valorEmpresa: null,

  /* Seção 10 — Detalhamento Orçamento */
  orcamentoCategorias: [],

  /* Seção 11 — Compras */
  compras: [],

  /* Seção 12 — Riscos */
  riscosForm: [],
};
