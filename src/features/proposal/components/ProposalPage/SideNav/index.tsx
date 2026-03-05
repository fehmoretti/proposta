import styles from '../ProposalPage.module.css';
import { SECTION_IDS, SECTION_LABELS } from '../../../constants/proposal.data';
import type { SectionId } from '../../../services/proposal.types';

type SideNavProps = {
  readonly activeSection: SectionId;
  readonly onNavigate: (id: string) => void;
};

export function SideNav({ activeSection, onNavigate }: SideNavProps) {
  return (
    <nav className={styles.sideNav}>
      {SECTION_IDS.map((id) => (
        <button
          key={id}
          className={`${styles.sideDot} ${activeSection === id ? styles.sideDotActive : ''}`}
          data-label={SECTION_LABELS[id]}
          onClick={() => onNavigate(id)}
          aria-label={`Navegar para ${SECTION_LABELS[id]}`}
        />
      ))}
    </nav>
  );
}
