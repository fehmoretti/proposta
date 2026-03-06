'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function PremissasSection() {
  const { data } = useProposalData();

  const items = (data.premissasForm ?? []).filter((p) => p.descricao.trim());

  if (items.length === 0) return null;

  return (
    <section id="premissas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>03 — Premissas</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>
          Condições para execução do projeto
        </h2>
        <div className={styles.premissasGrid}>
          {items.map((item, i) => (
            <div key={i} className={styles.premissaCard}>
              <div className={styles.premissaNumber}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                className={styles.premissaText}
                dangerouslySetInnerHTML={{
                  __html: item.descricao + (item.responsavel ? ` <strong class="${styles.premissaHighlight}">— ${item.responsavel}</strong>` : ''),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
