'use client';

import { MantineProvider as MantineBaseProvider } from '@mantine/core';
import { theme } from '@/configs/mantine/theme';

type MantineProviderProps = {
  readonly children: React.ReactNode;
};

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <MantineBaseProvider theme={theme} forceColorScheme="dark">
      {children}
    </MantineBaseProvider>
  );
}
