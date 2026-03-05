'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';
import type { LegendItem } from '../../../services/proposal.types';

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
              {data.orcamentoItems.map((item) => (
                <tr key={item.fonte}>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoFonte}`}>
                    {item.fonte}
                  </td>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoValor}`}>
                    {item.financeira ?? '—'}
                  </td>
                  <td className={`${styles.orcamentoTableTd} ${styles.orcamentoValor}`}>
                    {item.economica ?? '—'}
                  </td>
                  <td className={styles.orcamentoTableTd}>
                    <div className={styles.pctBarWrap}>
                      <div className={styles.pctBar}>
                        <div
                          className={`${styles.pctFill} ${item.percentage < 40 && item.fonte !== data.orcamentoLegend[0]?.name ? styles.pctFillMuted : ''}`}
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
                  {data.orcamentoTotal.formatted}
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
            <div className={styles.orcamentoCardValue}>{data.orcamentoTotal.value}</div>

            <DonutChart legend={data.orcamentoLegend} />

            <div className={styles.legend}>
              {data.orcamentoLegend.map((item) => (
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
