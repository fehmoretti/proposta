'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function EscopoSection() {
  const { data } = useProposalData();

  return (
    <section id="escopo" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>04 — Escopo</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          O que está dentro e fora do projeto
        </h2>
        <div className={styles.escopoGrid}>
          <div className={styles.escopoCol}>
            <div className={styles.escopoColTitle}>
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              Escopo
            </div>
            <ul className={styles.escopoList}>
              {data.escopoItems.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.escopoItem} ${styles.escopoItemGreen}`}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.escopoCol} ${styles.escopoColNao}`}>
            <div className={styles.escopoColTitle}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              Não Escopo
            </div>
            <ul className={styles.escopoList}>
              {data.naoEscopoItems.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.escopoItem} ${styles.escopoItemRed}`}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
