'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';
import type { LegendItem } from '../../../services/proposal.types';

const COLORS = ['#E8173A', '#FF6B6B', '#4ECDC4'];

function formatBRL(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatShort(val: number): string {
  if (val >= 1_000_000) return `R$${(val / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (val >= 1_000) return `R$${Math.round(val / 1_000)}K`;
  return `R$${val}`;
}

function DonutChart({ legend }: { readonly legend: LegendItem[] }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={styles.donutWrap}>
      <svg viewBox="0 0 130 130">
        {legend.map((item) => {
          const dash = (item.percentage / 100) * circumference;
          const currentOffset = offset;
          offset += dash;

          return (
            <circle
              key={item.name}
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="22"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
            />
          );
        })}
      </svg>
      <div className={styles.donutCenter}>100 %</div>
    </div>
  );
}

export function OrcamentoSection() {
  const { data } = useProposalData();

  const fontePrincipal = data.valorFontePrincipal ?? 0;
  const senai = data.valorSenai ?? 0;
  const empresa = data.valorEmpresa ?? 0;
  const total = fontePrincipal + senai + empresa;

  const fonteLabel = data.fonteFinanciamento || 'Fonte Principal';

  const pctFonte = total > 0 ? (fontePrincipal / total) * 100 : 0;
  const pctSenai = total > 0 ? (senai / total) * 100 : 0;
  const pctEmpresa = total > 0 ? (empresa / total) * 100 : 0;

  const rows = [
    { fonte: fonteLabel, financeira: formatBRL(fontePrincipal), economica: '—', percentage: Math.round(pctFonte) },
    { fonte: 'SENAI', financeira: '—', economica: formatBRL(senai), percentage: Math.round(pctSenai) },
    { fonte: 'Empresa', financeira: formatBRL(empresa), economica: '—', percentage: Math.round(pctEmpresa) },
  ].filter((r) => r.percentage > 0);

  const legend: LegendItem[] = [
    { name: fonteLabel, percentage: Math.round(pctFonte), color: COLORS[0] },
    { name: 'SENAI', percentage: Math.round(pctSenai), color: COLORS[1] },
    { name: 'Empresa', percentage: Math.round(pctEmpresa), color: COLORS[2] },
  ].filter((l) => l.percentage > 0);

  return (
    <section id="orcamento" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>08 — Orçamento</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          Investimento e fontes de recurso
        </h2>

        <div className={styles.orcamentoLayout}>
          {/* Table */}
          <table className={styles.orcamentoTable}>
            <thead>
              <tr>
                <th className={styles.orcamentoTableTh}>Fonte</th>
                <th className={styles.orcamentoTableTh}>Financeira</th>
                <th className={styles.orcamentoTableTh}>Econômica</th>
                <th className={styles.orcamentoTableTh}>Part. %</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.fonte}>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoFonte}`}>
                    {item.fonte}
                  </td>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoValor}`}>
                    {item.financeira}
                  </td>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoValor}`}>
                    {item.economica}
                  </td>
                  <td className={styles.orcamentoTableTd}>
                    <div className={styles.pctBarWrap}>
                      <div className={styles.pctBar}>
                        <div
                          className={styles.pctFill}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className={styles.pctText}>{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td className={`${styles.orcamentoTableTd} ${styles.totalFonte}`}>
                  TOTAL
                </td>
                <td
                  colSpan={2}
                  className={`${styles.orcamentoTableTd} ${styles.totalValor}`}
                >
                  {total > 0 ? formatBRL(total) : '—'}
                </td>
                <td className={styles.orcamentoTableTd}>
                  <div className={styles.pctBarWrap}>
                    <div className={styles.pctBar}>
                      <div className={styles.pctFill} style={{ width: '100%' }} />
                    </div>
                    <span className={styles.pctText}>100%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Card com Donut */}
          <div className={styles.orcamentoCard}>
            <div className={styles.orcamentoCardLabel}>Investimento Total</div>
            <div className={styles.orcamentoCardValue}>
              {total > 0 ? formatShort(total) : '—'}
            </div>

            {legend.length > 0 && <DonutChart legend={legend} />}

            <div className={styles.legend}>
              {legend.map((item) => (
                <div key={item.name} className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ background: item.color }}
                  />
                  <span className={styles.legendName}>{item.name}</span>
                  <span className={styles.legendPct}>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
