'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function PremissasSection() {
  const { data } = useProposalData();

  return (
    <section id="premissas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>03 — Premissas</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          Condições para execução do projeto
        </h2>
        <div className={styles.premissasGrid}>
          {data.premissas.map((premissa) => (
            <div key={premissa.code} className={styles.premissaCard}>
              <div className={styles.premissaNumber}>{premissa.code}</div>
              <div className={styles.premissaText}>
                {premissa.text}{' '}
                {premissa.highlight && (
                  <strong className={styles.premissaHighlight}>
                    {premissa.highlight}
                  </strong>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
