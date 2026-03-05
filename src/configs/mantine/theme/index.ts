import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { THEME_COLORS, THEME_RADIUS, THEME_SPACING } from './theme.tokens';
import { THEME_COMPONENTS } from './theme.components';

/* ------------------------------------------------------------------ */
/*  Map token colors to Mantine color tuples                          */
/* ------------------------------------------------------------------ */
const asTuple = (arr: readonly string[]): MantineColorsTuple =>
  arr as unknown as MantineColorsTuple;

/* ------------------------------------------------------------------ */
/*  Main application theme (admin, dashboard, landing, etc.)          */
/* ------------------------------------------------------------------ */
export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: asTuple(THEME_COLORS.primary),
    secondary: asTuple(THEME_COLORS.secondary),
    neutralLight: asTuple(THEME_COLORS.neutralLight),
    neutralDark: asTuple(THEME_COLORS.neutralDark),
    danger: asTuple(THEME_COLORS.danger),
    success: asTuple(THEME_COLORS.success),
    warning: asTuple(THEME_COLORS.warning),
    info: asTuple(THEME_COLORS.info),
    dark: asTuple(THEME_COLORS.neutralDark),
  },

  fontFamily: "'Montserrat', sans-serif",
  headings: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
  },

  defaultRadius: 'sm',
  black: '#0A0A0A',
  white: '#F5F5F5',

  spacing: {
    xs: THEME_SPACING.xs,
    sm: THEME_SPACING.s,
    md: THEME_SPACING.m,
    lg: THEME_SPACING.l,
    xl: THEME_SPACING.xl,
  },

  radius: {
    xs: THEME_RADIUS.xs,
    sm: THEME_RADIUS.s,
    md: THEME_RADIUS.m,
    lg: THEME_RADIUS.l,
    xl: THEME_RADIUS.xl,
  },

  components: THEME_COMPONENTS as any,
});

/* ------------------------------------------------------------------ */
/*  Minimal theme for the proposal view page (no custom overrides)    */
/* ------------------------------------------------------------------ */
export const proposalTheme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: asTuple(THEME_COLORS.primary),
    dark: asTuple(THEME_COLORS.neutralDark),
  },
  fontFamily: "'Montserrat', sans-serif",
  headings: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: '700',
  },
  defaultRadius: 'sm',
  black: '#0A0A0A',
  white: '#F5F5F5',
});
