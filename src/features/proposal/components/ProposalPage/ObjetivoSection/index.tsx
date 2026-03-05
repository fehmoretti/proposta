'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function ObjetivoSection() {
  const { data } = useProposalData();

  return (
    <section id="objetivo" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>02 — Objetivo</div>
        <div className={styles.objetivoInner}>
          <div className={styles.objetivoNumber}>02</div>
          <div>
            <div
              className={styles.objetivoText}
              dangerouslySetInnerHTML={{ __html: data.objetivoText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
