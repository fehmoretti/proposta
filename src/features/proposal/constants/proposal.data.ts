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
  SectionId,
} from '../services/proposal.types';

export const HERO_META: HeroMeta[] = [
  { label: 'Duração', value: '15 meses' },
  { label: 'TRL Final', value: '6' },
  { label: 'Investimento', value: 'R$751k' },
];

export const DIAGRAM_NODES: DiagramNode[] = [
  { icon: '📦', label: 'Contagem de Entrada', sub: 'Sensor fotoelétrico' },
  { icon: '🌡️', label: 'Temperatura do Adesivo', sub: 'Sensor laser' },
  { icon: '💧', label: 'Flow Meter — Coleiro Nordson', sub: 'Fluxo de cola' },
  { icon: '👁️', label: 'Sensor de Aba Aberta', sub: 'Inspeção visual' },
  { icon: '✓', label: 'Contagem de Saída', sub: 'Embalagens OK', isSuccess: true },
];

export const PREMISSAS: Premissa[] = [
  {
    code: 'P01',
    text: 'Infraestrutura de nuvem (Azure), incluindo ambientes de homologação e produção, disponibilizada até o',
    highlight: '4º mês',
  },
  {
    code: 'P02',
    text: 'Definições de dados, parâmetros de processo, regras de negócio e critérios operacionais fornecidos pela Henkel até o',
    highlight: '3º mês',
  },
  {
    code: 'P03',
    text: 'Aquisição de equipamentos e sensores de responsabilidade exclusiva da Henkel até o',
    highlight: '3º mês',
  },
  {
    code: 'P04',
    text: 'Testes do sistema realizados presencialmente no',
    highlight: 'laboratório da Henkel',
  },
  {
    code: 'P05',
    text: 'Sensores e CLP selecionados considerando a',
    highlight: 'infraestrutura existente',
  },
  {
    code: 'P06',
    text: 'Painel de automação projetado exclusivamente para o protótipo, conforme',
    highlight: 'normas técnicas',
  },
];

export const ESCOPO_ITEMS: EscopoItem[] = [
  { text: 'Protótipo de automação para monitoramento do processo End of Line' },
  { text: 'Integração de sensores de temperatura, fluxo e contagem' },
  { text: 'CLP para aquisição e envio contínuo dos dados de processo' },
  { text: 'Configuração de lógica de controle, limites e alarmes básicos' },
  { text: 'Desenvolvimento de módulo de software end-of-line' },
  { text: 'Evolução da arquitetura HLC para suportar modularidade e escalabilidade' },
  { text: 'Funcionalidades de visualização, histórico e alertas operacionais' },
  { text: 'Integração com ambiente de nuvem da empresa parceira' },
];

export const NAO_ESCOPO_ITEMS: EscopoItem[] = [
  { text: 'Funcionalidades não explicitamente definidas no escopo aprovado' },
  { text: 'Aquisição, instalação e infraestrutura de equipamentos e rede' },
  { text: 'Configuração e manutenção de infraestrutura de TI corporativa' },
  { text: 'Suporte operacional contínuo após a entrega' },
  { text: 'Integração com sistemas corporativos não previstos' },
  { text: 'Desenvolvimento de aplicativos móveis ou treinamentos' },
  { text: 'Modificações estruturais na linha produtiva' },
  { text: 'Comprovação quantitativa de redução de desperdício' },
];

export const MACROENTREGAS: Macroentrega[] = [
  {
    number: '01',
    name: 'Refinamento técnico e arquitetura da solução',
    detail:
      'Refinamento do escopo, levantamento de variáveis, definição de requisitos funcionais e não funcionais e modelagem da arquitetura integrada. Inclui especificação técnica dos sensores e do controlador industrial.',
    area: 'Software + Automação',
  },
  {
    number: '02',
    name: 'Desenvolvimento do protótipo',
    detail:
      'Implementação da coleta de dados em campo, evolução da arquitetura HLC para suportar modularidade e escalabilidade, e desenvolvimento do módulo de software com visualização e alertas.',
    area: 'Software + Automação',
  },
  {
    number: '03',
    name: 'Integração e demonstração em ambiente relevante',
    detail:
      'Integração final entre automação e software, implantação em ambiente industrial, testes funcionais, avaliação de desempenho e documentação técnica completa.',
    area: 'Software + Automação',
  },
];

export const TRL_INFO: TrlInfo = {
  from: 'TRL 4',
  to: 'TRL 6',
  description:
    'De conceitos validados de forma isolada até demonstração de protótipo integrado em ambiente industrial relevante.',
};

export const GANTT_DATA: GanttItem[] = [
  { label: 'Mobilização Interna', start: 1, end: 1, isMobilization: true },
  { label: '01. Refinamento técnico', start: 2, end: 4, milestone: 4 },
  { label: '02. Desenvolvimento do protótipo', start: 4, end: 12, milestone: 12 },
  { label: '03. Integração e demonstração', start: 12, end: 15, milestone: 15 },
];

export const TOTAL_MONTHS = 15;

export const RISCOS: RiscoItem[] = [
  {
    identification: 'Taxa de aquisição de dados incompatível com a velocidade da linha',
    consequence: 'Perda de eventos e conclusões incorretas sobre o processo',
    level: 'medio',
    responsible: 'SENAI',
  },
  {
    identification: 'Falha na medição de temperatura do adesivo',
    consequence: 'Aplicação incorreta do adesivo e falha no fechamento de embalagens',
    level: 'medio',
    responsible: 'SENAI',
  },
  {
    identification: 'Atraso na liberação de acessos e ambientes em nuvem',
    consequence: 'Bloqueio do desenvolvimento, testes e integração do software',
    level: 'alto',
    responsible: 'HENKEL',
  },
  {
    identification: 'Falha na comunicação entre automação e software',
    consequence: 'Indisponibilidade de relatórios, alarmes e dados históricos',
    level: 'baixo',
    responsible: 'SENAI',
  },
  {
    identification: 'Atraso ou não aquisição de sensores e componentes',
    consequence: 'Atraso no cronograma e impacto nas macroentregas',
    level: 'medio',
    responsible: 'SENAI / HENKEL',
  },
];

export const ORCAMENTO_ITEMS: OrcamentoItem[] = [
  { fonte: 'EMBRAPII', financeira: 'R$ 247.907,54', percentage: 33 },
  { fonte: 'SENAI', economica: 'R$ 202.832,62', percentage: 27 },
  { fonte: 'HENKEL', financeira: 'R$ 300.492,77', percentage: 40 },
];

export const ORCAMENTO_TOTAL: OrcamentoTotal = {
  value: 'R$ 751.232',
  formatted: 'R$ 751.232,93',
};

export const ORCAMENTO_LEGEND: LegendItem[] = [
  { name: 'EMBRAPII', percentage: 33, color: '#E8173A' },
  { name: 'HENKEL', percentage: 40, color: '#8B0F22' },
  { name: 'SENAI', percentage: 27, color: '#3A3A3A' },
];

export const SECTION_IDS: SectionId[] = [
  'hero',
  'contexto',
  'objetivo',
  'premissas',
  'escopo',
  'macroentregas',
  'cronograma',
  'riscos',
  'orcamento',
];

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Início',
  contexto: 'Contexto',
  objetivo: 'Objetivo',
  premissas: 'Premissas',
  escopo: 'Escopo',
  macroentregas: 'Entregas',
  cronograma: 'Cronograma',
  riscos: 'Riscos',
  orcamento: 'Orçamento',
};

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: '#contexto', label: 'Contexto' },
  { href: '#objetivo', label: 'Objetivo' },
  { href: '#escopo', label: 'Escopo' },
  { href: '#macroentregas', label: 'Entregas' },
  { href: '#orcamento', label: 'Orçamento' },
];
