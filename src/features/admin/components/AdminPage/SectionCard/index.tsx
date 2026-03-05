'use client';

import { useState, useRef, type ReactNode } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import styles from '../AdminPage.module.css';

interface SectionCardProps {
  readonly id?: string;
  readonly icon: ReactNode;
  readonly title: string;
  readonly count?: number;
  readonly defaultOpen?: boolean;
  readonly children: ReactNode;
}

export function SectionCard({
  id,
  icon,
  title,
  count,
  defaultOpen = false,
  children,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.sectionCard} ref={anchorRef}>
      <div
        id={id}
        className={styles.sectionAnchor}
      />
      <div
        className={`${styles.sectionCardHeader} ${open ? styles.sectionCardHeaderOpen : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={styles.sectionCardHeaderIcon}>{icon}</div>
        <h3 className={styles.sectionCardTitle}>{title}</h3>
        {count !== undefined && (
          <span className={styles.sectionCardCount}>
            {count} {count === 1 ? 'item' : 'itens'}
          </span>
        )}
        <span
          className={`${styles.sectionCardChevron} ${open ? styles.sectionCardChevronOpen : ''}`}
        >
          <IconChevronDown size={18} />
        </span>
      </div>
      {open && <div className={styles.sectionCardDivider} />}
      <div className={open ? styles.sectionCardContentOpen : styles.sectionCardContent}>
        {children}
      </div>
    </div>
  );
}
