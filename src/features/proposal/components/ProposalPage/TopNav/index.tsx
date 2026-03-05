'use client';

import styles from '../ProposalPage.module.css';
import { NAV_LINKS } from '../../../constants/proposal.data';
import { useProposalData } from '@/providers/ProposalDataProvider';

export function TopNav() {
  const { data } = useProposalData();

  return (
    <nav className={styles.topnav}>
      <div className={styles.navBrand}>
        <span className={styles.navBrandAccent}>{data.navBrand}</span> {data.navBrandAccent}
      </div>
      <ul className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.navBadge}>{data.navBadge}</div>
    </nav>
  );
}
