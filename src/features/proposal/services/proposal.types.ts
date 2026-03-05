export interface HeroMeta {
  label: string;
  value: string;
}

export interface DiagramNode {
  icon: string;
  label: string;
  sub: string;
  isSuccess?: boolean;
}

export interface Premissa {
  code: string;
  text: string;
  highlight?: string;
}

export interface EscopoItem {
  text: string;
}

export interface Macroentrega {
  number: string;
  name: string;
  detail: string;
  area: string;
}

export interface TrlInfo {
  from: string;
  to: string;
  description: string;
}

export interface GanttItem {
  label: string;
  start: number;
  end: number;
  milestone?: number;
  isMobilization?: boolean;
}

export interface RiscoItem {
  identification: string;
  consequence: string;
  level: 'alto' | 'medio' | 'baixo';
  responsible: string;
}

export interface OrcamentoItem {
  fonte: string;
  financeira?: string;
  economica?: string;
  percentage: number;
}

export interface OrcamentoTotal {
  value: string;
  formatted: string;
}

export interface LegendItem {
  name: string;
  percentage: number;
  color: string;
}

export type SectionId =
  | 'hero'
  | 'contexto'
  | 'objetivo'
  | 'premissas'
  | 'escopo'
  | 'macroentregas'
  | 'cronograma'
  | 'riscos'
  | 'orcamento';

/* ── Pre-Proposal Form Types ────────────── */

export interface MacroatividadeForm {
  numero: number;
  nome: string;
  descricao: string;
  areaResponsavel: string;
  mesInicio: number | null;
  mesTermino: number | null;
}

export interface PremissaForm {
  descricao: string;
  responsavel: string;
  prazo: number | null;
}

export interface OrcamentoCategoriaForm {
  categoria: string;
  fonteResponsavel: string;
  tipoContrapartida: string;
  valor: number | null;
}

export interface CompraForm {
  nome: string;
  quantidade: number | null;
  valorUnitario: number | null;
  observacoes: string;
}

export interface RiscoForm {
  descricao: string;
  causas: string;
  consequencias: string;
  nivelExposicao: string;
  estrategiaGestao: string;
  acaoContencao: string;
  responsavel: string;
}
