'use client';

import styles from './ProposalPage.module.css';
import { useScrollProgress, useActiveSection, useScrollTo } from './hooks/useProposalScroll';
import { TopNav } from './TopNav';
import { SideNav } from './SideNav';
import { HeroSection } from './HeroSection';
import { ContextoSection } from './ContextoSection';
import { ObjetivoSection } from './ObjetivoSection';
import { PremissasSection } from './PremissasSection';
import { EscopoSection } from './EscopoSection';
import { MacroentregasSection } from './MacroentregasSection';
import { CronogramaSection } from './CronogramaSection';
import { RiscosSection } from './RiscosSection';
import { OrcamentoSection } from './OrcamentoSection';
import { FooterSection } from './FooterSection';

export function ProposalPage() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const scrollTo = useScrollTo();

  return (
    <div className={styles.root}>
      {/* Scroll progress bar */}
      <div className={styles.scrollProgress} style={{ width: `${progress}%` }} />

      {/* Navigation */}
      <TopNav />
      <SideNav activeSection={activeSection} onNavigate={scrollTo} />

      {/* Sections */}
      <HeroSection />
      <ContextoSection />
      <ObjetivoSection />
      <PremissasSection />
      <EscopoSection />
      <MacroentregasSection />
      <CronogramaSection />
      <RiscosSection />
      <OrcamentoSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
