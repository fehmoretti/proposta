import { THEME_FONT, THEME_SPACING } from './theme.tokens';

export const THEME_BUTTON = {
  xs: {
    font: THEME_FONT.xs,
    padding: `${THEME_SPACING.xxs} ${THEME_SPACING.xs}`,
  },
  sm: {
    font: THEME_FONT.xs,
    padding: `${THEME_SPACING.xs} ${THEME_SPACING.s}`,
  },
  md: {
    font: THEME_FONT.s,
    padding: `${THEME_SPACING.s} ${THEME_SPACING.s}`,
  },
  lg: {
    font: THEME_FONT.m,
    padding: `${THEME_SPACING.s} ${THEME_SPACING.s}`,
  },
  xl: {
    font: THEME_FONT.l,
    padding: `${THEME_SPACING.m} ${THEME_SPACING.l}`,
  },
} as const;

export const THEME_ACTIONICON = {
  xs: {
    size: THEME_FONT.xs,
    padding: 9,
  },
  sm: {
    size: THEME_FONT.xs,
    padding: 12,
  },
  md: {
    size: THEME_FONT.s,
    padding: 18,
  },
  lg: {
    size: THEME_FONT.m,
    padding: 18,
  },
  xl: {
    size: THEME_FONT.l,
    padding: 20,
  },
} as const;

export const THEME_INPUT = {
  xs: {
    font: THEME_FONT.xs,
    padding: {
      top: THEME_SPACING.xxs,
      bottom: THEME_SPACING.xxs,
      left: THEME_SPACING.s,
      right: THEME_SPACING.s,
    },
  },
  sm: {
    font: THEME_FONT.xs,
    padding: {
      top: THEME_SPACING.xs,
      bottom: THEME_SPACING.xs,
      left: THEME_SPACING.s,
      right: THEME_SPACING.s,
    },
  },
  md: {
    font: THEME_FONT.s,
    padding: {
      top: THEME_SPACING.s,
      bottom: THEME_SPACING.s,
      left: THEME_SPACING.s,
      right: THEME_SPACING.s,
    },
  },
  lg: {
    font: THEME_FONT.m,
    padding: {
      top: THEME_SPACING.s,
      bottom: THEME_SPACING.s,
      left: THEME_SPACING.s,
      right: THEME_SPACING.s,
    },
  },
  xl: {
    font: THEME_FONT.l,
    padding: {
      top: THEME_SPACING.s,
      bottom: THEME_SPACING.s,
      left: THEME_SPACING.s,
      right: THEME_SPACING.s,
    },
  },
} as const;
