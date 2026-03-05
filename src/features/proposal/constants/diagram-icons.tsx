import {
  IconPackage,
  IconTemperature,
  IconDroplet,
  IconEye,
  IconCheck,
  IconBolt,
  IconSettings,
  IconCpu,
  IconWifi,
  IconChartLine,
  IconFlask,
  IconTool,
  IconCamera,
  IconGauge,
  IconCloud,
  IconDatabase,
  IconRouter,
  IconDeviceDesktop,
  IconBinaryTree,
  IconAntenna,
  IconScan,
  IconBarcode,
  IconScale,
  IconRuler,
  IconClock,
  IconShield,
  IconLock,
  IconBellRinging,
  IconReportAnalytics,
  IconCircleCheck,
  IconAlertTriangle,
  IconTruck,
  IconBox,
  IconPrinter,
  IconAdjustments,
  IconActivity,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';

export interface DiagramIconOption {
  value: string;
  label: string;
  Icon: ComponentType<{ size?: number | string; color?: string }>;
}

export const DIAGRAM_ICONS: DiagramIconOption[] = [
  /* Sensores & Medição */
  { value: 'IconTemperature', label: 'Temperatura', Icon: IconTemperature },
  { value: 'IconDroplet', label: 'Fluido / Vazão', Icon: IconDroplet },
  { value: 'IconEye', label: 'Inspeção visual', Icon: IconEye },
  { value: 'IconScan', label: 'Scanner', Icon: IconScan },
  { value: 'IconBarcode', label: 'Código de barras', Icon: IconBarcode },
  { value: 'IconCamera', label: 'Câmera / Visão', Icon: IconCamera },
  { value: 'IconGauge', label: 'Medidor / Gauge', Icon: IconGauge },
  { value: 'IconScale', label: 'Balança / Peso', Icon: IconScale },
  { value: 'IconRuler', label: 'Régua / Dimensão', Icon: IconRuler },
  { value: 'IconActivity', label: 'Atividade / Sinal', Icon: IconActivity },
  { value: 'IconAntenna', label: 'Antena / Sensor', Icon: IconAntenna },

  /* Processo & Equipamento */
  { value: 'IconPackage', label: 'Embalagem / Caixa', Icon: IconPackage },
  { value: 'IconBox', label: 'Container / Box', Icon: IconBox },
  { value: 'IconSettings', label: 'Engrenagem', Icon: IconSettings },
  { value: 'IconTool', label: 'Ferramenta', Icon: IconTool },
  { value: 'IconAdjustments', label: 'Ajustes', Icon: IconAdjustments },
  { value: 'IconBolt', label: 'Energia / Elétrico', Icon: IconBolt },
  { value: 'IconFlask', label: 'Laboratório', Icon: IconFlask },
  { value: 'IconPrinter', label: 'Impressora', Icon: IconPrinter },
  { value: 'IconTruck', label: 'Logística', Icon: IconTruck },

  /* Tecnologia & Dados */
  { value: 'IconCpu', label: 'Processador / CPU', Icon: IconCpu },
  { value: 'IconWifi', label: 'Conectividade', Icon: IconWifi },
  { value: 'IconCloud', label: 'Nuvem / Cloud', Icon: IconCloud },
  { value: 'IconDatabase', label: 'Banco de dados', Icon: IconDatabase },
  { value: 'IconRouter', label: 'Roteador / Rede', Icon: IconRouter },
  { value: 'IconDeviceDesktop', label: 'Monitor / Dashboard', Icon: IconDeviceDesktop },
  { value: 'IconBinaryTree', label: 'Decisão / Árvore', Icon: IconBinaryTree },
  { value: 'IconChartLine', label: 'Gráfico / Analytics', Icon: IconChartLine },
  { value: 'IconReportAnalytics', label: 'Relatório', Icon: IconReportAnalytics },

  /* Status */
  { value: 'IconCheck', label: 'Aprovado / OK', Icon: IconCheck },
  { value: 'IconCircleCheck', label: 'Concluído', Icon: IconCircleCheck },
  { value: 'IconAlertTriangle', label: 'Alerta', Icon: IconAlertTriangle },
  { value: 'IconShield', label: 'Segurança', Icon: IconShield },
  { value: 'IconLock', label: 'Bloqueio', Icon: IconLock },
  { value: 'IconBellRinging', label: 'Notificação', Icon: IconBellRinging },
  { value: 'IconClock', label: 'Tempo / Timer', Icon: IconClock },
];

/** Map icon key → component for fast lookup */
export const DIAGRAM_ICON_MAP: Record<string, ComponentType<{ size?: number | string; color?: string }>> =
  Object.fromEntries(DIAGRAM_ICONS.map((i) => [i.value, i.Icon]));
