'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';
import { DIAGRAM_ICON_MAP } from '@/features/proposal/constants/diagram-icons';

export function ContextoSection() {
  const { data } = useProposalData();

  /* Build paragraphs from form fields (Section 2) */
  const paragraphs: string[] = [];
  if (data.processoOperacao) paragraphs.push(data.processoOperacao);
  if (data.desafiosAtuais) paragraphs.push(data.desafiosAtuais);
  if (data.existeSolucaoPrevia && data.descricaoSolucaoPrevia) {
    paragraphs.push(data.descricaoSolucaoPrevia);
  }

  /* Use form-derived paragraphs if available, otherwise fall back to contextoParagraphs */
  const displayParagraphs = paragraphs.length > 0 ? paragraphs : data.contextoParagraphs;

  return (
    <section id="contexto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>01 — Contexto</div>
        <div className={styles.contextGrid}>
          <div>
            <h2 className={styles.sectionTitle}>O problema que precisamos resolver</h2>
            <div className={styles.contextText}>
              {displayParagraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {(data.contextoHighlightValue || data.contextoHighlightLabel) && (
                <div className={styles.contextHighlight}>
                  <div className={styles.contextHighlightValue}>
                    {data.contextoHighlightValue}
                  </div>
                  <div className={styles.contextHighlightLabel}>
                    {data.contextoHighlightLabel}
                  </div>
                </div>
              )}
            </div>
          </div>
          {data.diagramNodes.length > 0 && (
            <div>
              <div className={styles.contextDiagram}>
                <div className={styles.diagramTitle}>{data.diagramTitle}</div>
                {data.diagramNodes.map((node, i) => (
                  <div
                    key={i}
                    className={`${styles.diagramNode} ${node.isSuccess ? styles.diagramNodeSuccess : ''}`}
                  >
                    <div
                      className={`${styles.diagramNodeIcon} ${node.isSuccess ? styles.diagramNodeIconSuccess : ''}`}
                    >
                      {DIAGRAM_ICON_MAP[node.icon]
                        ? (() => { const Ic = DIAGRAM_ICON_MAP[node.icon]; return <Ic size={16} />; })()
                        : node.icon}
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
          )}
        </div>
      </div>
    </section>
  );
}
