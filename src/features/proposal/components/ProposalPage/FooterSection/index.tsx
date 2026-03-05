'use client';

import styles from '../ProposalPage.module.css';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function FooterSection() {
  const { data } = useProposalData();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        {data.footerBrand}{' '}
        <span className={styles.footerBrandAccent}>{data.footerBrandAccent}</span>
      </div>
      <div className={styles.footerInfo}>
        {data.footerInfoText}{' '}
        <span className={styles.footerInfoAccent}>{data.footerInfoAccent}</span>
      </div>
      <div className={styles.footerCode}>{data.footerCode}</div>
    </footer>
  );
}
