import type { Metadata } from 'next';
import { MantineProvider } from '@/providers/MantineProvider';

import '@mantine/core/styles.css';
import '@/configs/mantine/theme/theme-vars.css';

export const metadata: Metadata = {
  title: 'Pré-Propostas — SENAI Distrito Tecnológico',
  description: 'Plataforma de geração de pré-propostas de projetos de inovação',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-mantine-color-scheme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
