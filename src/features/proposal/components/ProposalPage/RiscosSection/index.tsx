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

  const items = (data.riscosForm ?? []).filter((r) => r.descricao.trim());

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
          {items.map((risco, i) => {
            const level = risco.nivelExposicao.toLowerCase().replace('é', 'e');
            return (
              <div key={i} className={styles.riscoCard}>
                <div className={styles.riscoCell}>
                  <div dangerouslySetInnerHTML={{ __html: risco.descricao }} />
                </div>
                <div className={styles.riscoCell}>
                  <div dangerouslySetInnerHTML={{ __html: risco.consequencias }} />
                </div>
                <div className={styles.riscoCell}>
                  <span className={`${styles.badge} ${BADGE_MAP[level] ?? ''}`}>
                    {LEVEL_LABEL[level] ?? risco.nivelExposicao}
                  </span>
                </div>
                <div className={styles.riscoCell}>
                  {risco.responsavel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
