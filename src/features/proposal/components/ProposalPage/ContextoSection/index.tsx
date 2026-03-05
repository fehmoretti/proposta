'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function ContextoSection() {
  const { data } = useProposalData();

  return (
    <section id="contexto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>01 — Contexto</div>
        <div className={styles.contextGrid}>
          <div>
            <h2 className={styles.sectionTitle}>{data.contextoTitle}</h2>
            <div className={styles.contextText}>
              {data.contextoParagraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              <div className={styles.contextHighlight}>
                <div className={styles.contextHighlightValue}>
                  {data.contextoHighlightValue}
                </div>
                <div className={styles.contextHighlightLabel}>
                  {data.contextoHighlightLabel}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contextDiagram}>
              <div className={styles.diagramTitle}>{data.diagramTitle}</div>
              {data.diagramNodes.map((node) => (
                <div
                  key={node.label}
                  className={`${styles.diagramNode} ${node.isSuccess ? styles.diagramNodeSuccess : ''}`}
                >
                  <div
                    className={`${styles.diagramNodeIcon} ${node.isSuccess ? styles.diagramNodeIconSuccess : ''}`}
                  >
                    {node.icon}
                  </div>
                  <div
                    className={`${styles.diagramNodeLabel} ${node.isSuccess ? styles.diagramNodeLabelSuccess : ''}`}
                  >
                    {node.label}
                  </div>
                  <div className={styles.diagramNodeSub}>{node.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
