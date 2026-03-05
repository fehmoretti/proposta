'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

const BADGE_MAP: Record<string, string> = {
  alto: styles.badgeAlto,
  medio: styles.badgeMedio,
  baixo: styles.badgeBaixo,
};

const LEVEL_LABEL: Record<string, string> = {
  alto: 'Alto',
  medio: 'Médio',
  baixo: 'Baixo',
};

export function RiscosSection() {
  const { data } = useProposalData();

  return (
    <section id="riscos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>07 — Matriz de Riscos</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          Riscos identificados e estratégias
        </h2>
        <div className={styles.riscosGrid}>
          <div className={styles.riscoHeaderRow}>
            <div className={styles.riscoHeaderCell}>Risco</div>
            <div className={styles.riscoHeaderCell}>Consequência</div>
            <div className={styles.riscoHeaderCell}>Exposição</div>
            <div className={styles.riscoHeaderCell}>Responsável</div>
          </div>
          {data.riscos.map((risco) => (
            <div key={risco.identification} className={styles.riscoCard}>
              <div className={styles.riscoCell}>
                <div className={styles.riscoCellTitle}>Identificação</div>
                {risco.identification}
              </div>
              <div className={styles.riscoCell}>
                <div className={styles.riscoCellTitle}>Consequência</div>
                {risco.consequence}
              </div>
              <div className={styles.riscoCell}>
                <div className={styles.riscoCellTitle}>Nível</div>
                <span className={`${styles.badge} ${BADGE_MAP[risco.level]}`}>
                  {LEVEL_LABEL[risco.level]}
                </span>
              </div>
              <div className={styles.riscoCell}>
                <div className={styles.riscoCellTitle}>Resp.</div>
                {risco.responsible}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
