'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function MacroentregasSection() {
  const { data } = useProposalData();

  return (
    <section id="macroentregas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>05 — Macroentregas</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          Fases do projeto
        </h2>
        <table className={styles.macroTable}>
          <thead>
            <tr>
              <th className={styles.macroTableTh} style={{ width: 60 }}>Nº</th>
              <th className={styles.macroTableTh} style={{ width: 220 }}>Macroentrega</th>
              <th className={styles.macroTableTh}>Detalhamento</th>
              <th className={styles.macroTableTh} style={{ width: 160 }}>Área</th>
            </tr>
          </thead>
          <tbody>
            {data.macroentregas.map((item) => (
              <tr key={item.number}>
                <td className={styles.macroTableTd}>
                  <div className={styles.macroNum}>{item.number}</div>
                </td>
                <td className={styles.macroTableTd}>
                  <div className={styles.macroName}>{item.name}</div>
                </td>
                <td className={styles.macroTableTd}>{item.detail}</td>
                <td className={styles.macroTableTd}>
                  <span className={styles.macroArea}>{item.area}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.trlRow}>
          <span className={styles.trlLabel}>TRL</span>
          <div className={styles.trlBadges}>
            <div className={`${styles.trlBadge} ${styles.trlBadgeFrom}`}>
              {data.trlInfo.from}
            </div>
            <div className={styles.trlArrow}>→</div>
            <div className={`${styles.trlBadge} ${styles.trlBadgeTo}`}>
              {data.trlInfo.to}
            </div>
          </div>
          <div className={styles.trlDescription}>{data.trlInfo.description}</div>
        </div>
      </div>
    </section>
  );
}
