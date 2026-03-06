'use client';

import { MantineProvider as MantineBaseProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { theme } from '@/configs/mantine/theme';
import 'dayjs/locale/pt-br';

type MantineProviderProps = {
  readonly children: React.ReactNode;
};

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <MantineBaseProvider theme={theme} forceColorScheme="dark">
      <DatesProvider settings={{ locale: 'pt-br' }}>
        {children}
      </DatesProvider>
    </MantineBaseProvider>
  );
}
