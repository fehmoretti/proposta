import type { ProposalFormData } from '../services/proposal-form.types';
import {
  HERO_META,
  DIAGRAM_NODES,
  PREMISSAS,
  ESCOPO_ITEMS,
  NAO_ESCOPO_ITEMS,
  MACROENTREGAS,
  TRL_INFO,
  GANTT_DATA,
  TOTAL_MONTHS,
  RISCOS,
  ORCAMENTO_ITEMS,
  ORCAMENTO_TOTAL,
  ORCAMENTO_LEGEND,
} from './proposal.data';

export const DEFAULT_PROPOSAL: ProposalFormData = {
  /* Hero */
  heroTag: 'Pré Proposta · 2025',
  clientName: 'HENKEL',
  clientNameAccent: 'Brasil',
  heroTitle:
    'Protótipo de sistema para monitoramento da aplicação de cola quente em embalagens',
  heroBgText: 'EOL',
  heroNumber: '01',
  heroMeta: HERO_META,

  /* Top Nav */
  navBrand: 'DT',
  navBrandAccent: '· SENAI São Paulo',
  navBadge: 'Pré Proposta',

  /* Contexto */
  contextoTitle: 'O problema que precisamos resolver',
  contextoParagraphs: [
    'O processo de fechamento de embalagens por meio de <strong>cola quente</strong> é uma etapa crítica da linha produtiva, com impacto direto no consumo de insumos, na qualidade do produto final e na geração de perdas operacionais.',
    'A ausência de monitoramento estruturado das variáveis de aplicação dificulta o controle do processo, resultando em uso excessivo de adesivo, retrabalho e descarte de embalagens.',
    'O projeto propõe o desenvolvimento de um <strong>protótipo de sistema integrado</strong> de automação e software para monitorar a aplicação de cola quente no processo End Of Line.',
  ],
  contextoHighlightValue: '18 kg',
  contextoHighlightLabel: 'de adesivo desperdiçado por turno de 8h',
  diagramTitle: 'Fluxo do processo monitorado',
  diagramNodes: DIAGRAM_NODES,

  /* Objetivo */
  objetivoText:
    'Desenvolver, em até <strong>15 meses</strong>, um protótipo funcional integrado de automação e software para monitoramento da aplicação de cola quente no processo <strong>End of Line</strong>, permitindo a coleta, visualização e registro de variáveis críticas de processo, com foco na <strong>análise operacional</strong>, controle do uso de insumos e identificação de oportunidades de redução de desperdícios.',

  /* Premissas */
  premissas: PREMISSAS,

  /* Escopo */
  escopoItems: ESCOPO_ITEMS,
  naoEscopoItems: NAO_ESCOPO_ITEMS,

  /* Macroentregas */
  macroentregas: MACROENTREGAS,
  trlInfo: TRL_INFO,

  /* Cronograma */
  ganttData: GANTT_DATA,
  totalMonths: TOTAL_MONTHS,

  /* Riscos */
  riscos: RISCOS,

  /* Orçamento */
  orcamentoItems: ORCAMENTO_ITEMS,
  orcamentoTotal: ORCAMENTO_TOTAL,
  orcamentoLegend: ORCAMENTO_LEGEND,

  /* Footer */
  footerBrand: 'SENAI',
  footerBrandAccent: 'Innovation',
  footerInfoText: 'Proposta Técnica & Comercial —',
  footerInfoAccent: 'Henkel',
  footerCode: 'v1.0 — 2025',

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
