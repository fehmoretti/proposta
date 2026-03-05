'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function HeroSection() {
  const { data } = useProposalData();

  return (
    <section id="hero" style={{ padding: 0, border: 'none' }}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={`${styles.heroTag} ${styles.fadeUp} ${styles.delay1}`}>
            {data.heroTag}
          </div>
          <h1 className={`${styles.heroClient} ${styles.fadeUp} ${styles.delay2}`}>
            {data.clientName}
            <span className={styles.heroClientAccent}>{data.clientNameAccent}</span>
          </h1>
          <p className={`${styles.heroTitle} ${styles.fadeUp} ${styles.delay3}`}>
            {data.heroTitle}
          </p>
          <div className={`${styles.heroMeta} ${styles.fadeUp} ${styles.delay4}`}>
            {data.heroMeta.map((item) => (
              <div key={item.label} className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>{item.label}</span>
                <span className={styles.heroMetaValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroGridPattern} />
          <div className={styles.heroAccent} />
          <div className={styles.heroBgText}>{data.heroBgText}</div>
          <div className={styles.heroNumber}>{data.heroNumber}</div>
        </div>
      </div>
    </section>
  );
}
