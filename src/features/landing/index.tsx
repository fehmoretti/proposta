'use client';

import { Button } from '@mantine/core';
import styles from './Landing.module.css';

const FEATURES = [
  {
    icon: '📝',
    title: 'Formulário Estruturado',
    text: 'Preencha todas as seções do formulário de pré-proposta com validação e campos calculados automaticamente.',
  },
  {
    icon: '🔗',
    title: 'Links Compartilháveis',
    text: 'Cada proposta gera um link único (slug) para visualização e compartilhamento com stakeholders.',
  },
  {
    icon: '📊',
    title: 'Visualização Profissional',
    text: 'Propostas renderizadas como páginas web responsivas com design moderno e interativo.',
  },
];

export function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/">
          <img src="/logo-dt.svg" alt="DT" className={styles.navLogo} />
          <span className={styles.navTitle}>
            SENAI <span className={styles.navAccent}>Distrito Tecnológico</span>
          </span>
        </a>
        <Button
          component="a"
          href="/admin"
          variant="subtle"
          color="gray"
          size="sm"
        >
          Painel Admin →
        </Button>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>SENAI</div>
        <span className={styles.heroTag}>Plataforma de Pré-Propostas</span>
        <h1 className={styles.heroTitle}>
          Gerador de{' '}
          <span className={styles.heroTitleAccent}>Pré-Propostas</span>{' '}
          de Inovação
        </h1>
        <p className={styles.heroSubtitle}>
          Crie, edite e compartilhe propostas de projetos de inovação para empresas
          parceiras do SENAI, com formulários estruturados e visualização profissional.
        </p>
        <div className={styles.heroActions}>
          <Button
            component="a"
            href="/admin"
            size="lg"
            color="red"
          >
            Acessar Painel Admin
          </Button>
        </div>
      </section>

      {/* Features */}
      <div className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureText}>{f.text}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        SENAI Distrito Tecnológico — Plataforma de Pré-Propostas © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
