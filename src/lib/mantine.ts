import type { MantineThemeOverride, ModalProps } from '@mantine/core';
import { createEmotionCache } from '@mantine/core';

export const mantineCache = createEmotionCache({
  prepend: false,
  key: 'mantine',
});

export const theme: MantineThemeOverride = {
  fontFamily: 'Poppins, sans-serif',
  colorScheme: 'light',

  components: {
    Modal: {
      classNames: {
        title: 'font-semibold text-lg text-red-500 tracking-tight',
        content: 'text-zinc-700',
      } satisfies ModalProps['classNames'],
    },
  },
};
