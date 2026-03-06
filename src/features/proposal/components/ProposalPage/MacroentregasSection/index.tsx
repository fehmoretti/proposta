'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function MacroentregasSection() {
  const { data } = useProposalData();

  const items = (data.macroatividades ?? []).filter((m) => m.nome.trim());
  const trlFrom = data.trlInicial ? `TRL ${data.trlInicial}` : '';
  const trlTo = data.trlFinal ? `TRL ${data.trlFinal}` : '';

  const trlDesc = 'De conceitos validados de forma isolada até demonstração de protótipo integrado em ambiente industrial relevante.';

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
            {items.map((item) => (
              <tr key={item.numero}>
                <td className={styles.macroTableTd}>
                  <div className={styles.macroNum}>
                    {String(item.numero).padStart(2, '0')}
                  </div>
                </td>
                <td className={styles.macroTableTd}>
                  <div className={styles.macroName}>{item.nome}</div>
                </td>
                <td className={styles.macroTableTd}>
                  <div dangerouslySetInnerHTML={{ __html: item.descricao }} />
                </td>
                <td className={styles.macroTableTd}>
                  <span className={styles.macroArea}>{item.areaResponsavel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(trlFrom || trlTo) && (
          <div className={styles.trlRow}>
            <span className={styles.trlLabel}>TRL</span>
            <div className={styles.trlBadges}>
              <div className={`${styles.trlBadge} ${styles.trlBadgeFrom}`}>
                {trlFrom}
              </div>
              <div className={styles.trlArrow}>→</div>
              <div className={`${styles.trlBadge} ${styles.trlBadgeTo}`}>
                {trlTo}
              </div>
            </div>
            {trlDesc && (
              <div className={styles.trlDescription}>
                {trlDesc}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
