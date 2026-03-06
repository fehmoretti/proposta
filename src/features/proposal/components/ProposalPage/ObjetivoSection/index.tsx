'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function ObjetivoSection() {
  const { data } = useProposalData();

  const items = [
    { label: '', html: data.objetivoCentral },
    { label: 'Tecnologia / Abordagem', html: data.tecnologiaAbordagem },
    { label: 'Resultados esperados', html: data.resultadosEsperados },
  ].filter((i) => i.html);

  return (
    <section id="objetivo" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>02 — Objetivo</div>
        <div className={styles.objetivoInner}>
          <div className={styles.objetivoNumber}>02</div>
          <div className={styles.objetivoContent}>
            {items.map((item, i) => (
              <div key={item.label || i} className={styles.objetivoBlock}>
                {item.label && <div className={styles.objetivoBlockLabel}>{item.label}</div>}
                <div
                  className={styles.objetivoText}
                  dangerouslySetInnerHTML={{ __html: item.html }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
