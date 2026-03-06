'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `R$${(value / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (value >= 1_000) return `R$${Math.round(value / 1_000)}k`;
  return `R$${value}`;
}

export function HeroSection() {
  const { data } = useProposalData();

  const totalInvestimento =
    (data.valorFontePrincipal ?? 0) + (data.valorSenai ?? 0) + (data.valorEmpresa ?? 0);

  const heroMeta = [
    { label: 'Duração', value: data.totalMonths ? `${data.totalMonths} meses` : '—' },
    { label: 'TRL Final', value: data.trlFinal || '—' },
    { label: 'Investimento', value: totalInvestimento > 0 ? formatCurrency(totalInvestimento) : '—' },
  ];

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
            {heroMeta.map((item) => (
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
