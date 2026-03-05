'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function CronogramaSection() {
  const { data } = useProposalData();
  const months = Array.from({ length: data.totalMonths }, (_, i) => i + 1);

  return (
    <section id="cronograma" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>06 — Cronograma</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          {data.totalMonths} meses de execução
        </h2>
        <div className={styles.gantt}>
          <table className={styles.ganttTable}>
            <thead>
              <tr>
                <th className={`${styles.ganttHeaderTh} ${styles.ganttHeaderThFirst}`}>
                  Atividade
                </th>
                {months.map((m) => (
                  <th key={m} className={styles.ganttHeaderTh}>
                    M{m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.ganttData.map((item) => (
                <tr key={item.label}>
                  <td className={`${styles.ganttRowTd} ${styles.ganttRowTdFirst}`}>
                    {item.label}
                  </td>
                  {months.map((m) => {
                    const isInRange = m >= item.start && m <= item.end;
                    const isStart = m === item.start;
                    const isEnd = m === item.end;
                    const hasMilestone = item.milestone === m;

                    return (
                      <td key={m} className={styles.ganttRowTd}>
                        <div className={styles.ganttCell}>
                          {isInRange && (
                            <div
                              className={`${styles.ganttBar} ${item.isMobilization ? styles.ganttBarMob : ''}`}
                              style={{
                                left: isStart ? '10%' : '0',
                                right: isEnd ? '10%' : '0',
                                borderLeft: !isStart ? 'none' : undefined,
                              }}
                            />
                          )}
                          {hasMilestone && (
                            <div className={styles.ganttMilestone} />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
