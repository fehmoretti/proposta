import { createElement } from 'react';
import type {
  ButtonProps,
  InputProps,
  MantineTheme,
  ModalProps,
  ProgressProps,
  TabsProps,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { THEME_ACTIONICON, THEME_BUTTON, THEME_INPUT } from './theme.sizes';
import {
  THEME_COLORS,
  THEME_FONT,
  THEME_RADIUS,
  THEME_SPACING,
} from './theme.tokens';

type ComponentStylesFn<T> = (
  theme: MantineTheme,
  params: T,
) => Record<string, any>;

const inputLikeStyles: ComponentStylesFn<InputProps> = (_theme, params) => {
  const sizeKey = (params.size ?? 'xs') as keyof typeof THEME_INPUT;
  const config = THEME_INPUT[sizeKey];
  const hasLeft = Boolean(params.leftSection);
  const hasRight = Boolean(params.rightSection);
  return {
    root: {
      padding: config?.padding,
    },
    label: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: params.disabled
        ? THEME_COLORS.neutralLight[9]
        : THEME_COLORS.neutralLight[4],
    },
    description: {
      color: THEME_COLORS.neutralLight[8],
    },
    input: {
      background: '#0000001a',
      height: 'fit-content',
      color: THEME_COLORS.neutralLight[0],
      fontSize: config?.font?.fontSize,
      lineHeight: config?.font?.lineHeight,
      paddingTop: config?.padding?.top,
      paddingBottom: config?.padding?.bottom,
      ...(!hasLeft && { paddingLeft: config?.padding?.left }),
      ...(!hasRight && { paddingRight: config?.padding?.right }),
    },
  };
};

const textareaStyles: ComponentStylesFn<InputProps> = (_theme, params) => {
  const sizeKey = (params.size ?? 'md') as keyof typeof THEME_INPUT;
  const config = THEME_INPUT[sizeKey];

  return {
    label: {
      color: params.disabled
        ? THEME_COLORS.neutralLight[9]
        : THEME_COLORS.neutralLight[4],
    },
    description: {
      color: THEME_COLORS.neutralLight[8],
    },
    input: {
      color: THEME_COLORS.neutralLight[0],
      fontSize: config.font.fontSize,
      lineHeight: config.font.lineHeight,
      paddingTop: config.padding.top,
      paddingBottom: config.padding.bottom,
      paddingLeft: config.padding.left,
      paddingRight: config.padding.right,
    },
  };
};

export const THEME_COMPONENTS = {
  DatePicker: {
    defaultProps: { locale: 'pt-br' },
  },
  DatePickerInput: {
    defaultProps: { locale: 'pt-br', size: 'sm' },
    styles: inputLikeStyles,
  },
  DateRangePicker: {
    defaultProps: { locale: 'pt-br' },
  },
  DateRangePickerInput: {
    defaultProps: { locale: 'pt-br', size: 'sm' },
    styles: inputLikeStyles,
  },

  Badge: {
    defaultProps: {
      radius: 'xxxs',
      tt: 'capitalize',
      fw: '400',
      py: '4px',
    },
  },

  Button: {
    defaultProps: { size: 'xs' },
    styles: (_theme: MantineTheme, params: ButtonProps) => {
      let sizeKey = (params.size ?? 'md') as keyof typeof THEME_BUTTON;

      if (typeof sizeKey === 'string' && sizeKey.includes('compact')) {
        sizeKey = sizeKey.replace('compact-', '') as keyof typeof THEME_BUTTON;
      }

      const config = THEME_BUTTON[sizeKey];

      return {
        root: {
          height: 'fit-content',
          fontSize: config?.font?.fontSize,
          lineHeight: config?.font?.lineHeight,
          padding: config?.padding,
        },
      };
    },
  },

  ActionIcon: {
    defaultProps: { size: 'sm' },
    styles: (_theme: MantineTheme, params: ButtonProps) => {
      const sizeKey = (params.size ?? 'md') as keyof typeof THEME_ACTIONICON;
      const config = THEME_ACTIONICON[sizeKey];

      return {
        root: {
          height: 'fit-content',
          width: 'fit-content',
          fontSize: config?.size?.fontSize,
          lineHeight: config?.size?.lineHeight,
          padding: config?.padding,
        },
        icon: {
          height: `calc(${config?.size?.fontSize} * ${config?.size?.lineHeight})`,
          width: `calc(${config?.size?.fontSize} * ${config?.size?.lineHeight})`,
        },
      };
    },
  },

  Input: {
    defaultProps: { size: 'sm' },
    styles: inputLikeStyles,
  },

  NumberInput: {
    defaultProps: {
      size: 'sm',
      thousandSeparator: '.',
      decimalSeparator: ',',
      decimalScale: 2,
    },
    styles: inputLikeStyles,
  },

  TextInput: {
    defaultProps: {
      size: 'sm',
    },
    styles: inputLikeStyles,
  },

  Select: {
    defaultProps: {
      size: 'sm',
      rightSection: createElement(IconChevronDown, { size: 16, color: THEME_COLORS.neutralLight[6] }),
      rightSectionPointerEvents: 'none' as const,
    },
    styles: (_theme: MantineTheme, params: InputProps) => {
      const base = inputLikeStyles(_theme, params);
      return {
        ...base,
        dropdown: {
          background: THEME_COLORS.neutralDark[2],
          borderColor: THEME_COLORS.neutralDark[5],
        },
        option: {
          color: THEME_COLORS.neutralLight[2],
        },
      };
    },
  },

  InputBase: {
    defaultProps: { size: 'sm' },
    styles: inputLikeStyles,
  },

  PillsInput: {
    defaultProps: { size: 'sm' },
    styles: inputLikeStyles,
  },

  Textarea: {
    defaultProps: {
      size: 'sm',
    },
    styles: textareaStyles,
  },

  Switch: {
    styles: {
      label: { color: THEME_COLORS.neutralLight[4] },
    },
  },

  ColorInput: {
    defaultProps: {},
    styles: inputLikeStyles,
  },

  Modal: {
    styles: (_theme: MantineTheme, params: ModalProps) => {
      const fontConfig = THEME_FONT;
      const spacingConfig = THEME_SPACING;

      return {
        overlay: {
          background: 'rgba(0, 0, 0, 0.65)',
        },
        content: {
          minWidth: !params.size ? '491px' : undefined,
          background: THEME_COLORS.neutralDark[2],
          borderColor: THEME_COLORS.neutralDark[5],
        },
        header: {
          padding: spacingConfig.m,
          background: THEME_COLORS.neutralDark[2],
        },
        title: {
          fontSize: fontConfig.l.fontSize,
          fontWeight: 600,
          color: THEME_COLORS.neutralLight[0],
        },
        close: {
          color: THEME_COLORS.neutralLight[7],
          '&:hover': {
            background: THEME_COLORS.neutralDark[4],
          },
        },
        body: {
          padding: spacingConfig.m,
          paddingTop: 0,
        },
      };
    },
  },

  Tabs: {
    classNames: {
      tab: 'tab-button',
    },
    styles: (_theme: MantineTheme, params: TabsProps) => {
      const fontConfig = THEME_FONT;
      const spacingConfig = THEME_SPACING;
      const radiusConfig = THEME_RADIUS;
      const colorConfig = THEME_COLORS;

      if (params.variant === 'pills') {
        return {
          list: {
            border: '1px solid',
            borderColor: colorConfig.neutralDark[9],
            borderRadius: radiusConfig.xs,
            padding: spacingConfig.xxxs,
            gap: spacingConfig.xxs,
          },
          tabLabel: {
            fontSize: fontConfig.xs.fontSize,
          },
        };
      }

      if (params.variant === 'default') {
        return {
          tabLabel: {
            fontSize: fontConfig.xs.fontSize,
          },
          tab: {
            background: 'transparent',
          },
          list: {
            border: 'none',
          },
        };
      }

      return {};
    },
  },

  Progress: {
    styles: (_theme: MantineTheme, _params: ProgressProps) => {
      const spacingConfig = THEME_SPACING;
      const fontConfig = THEME_FONT;
      const value = Array.isArray(_params?.children)
        ? ((_params.children as any)[0]?.props?.value ?? 0)
        : 0;

      return {
        root: {
          backgroundColor: THEME_COLORS.neutralDark[4],
          padding: spacingConfig['4xs'],
          borderRadius: 6,
          height: fontConfig.xxl.fontSize,
        },
        section: {
          borderRadius: spacingConfig.xxxs,
          backgroundColor:
            value >= 100
              ? THEME_COLORS.overlaySuccess[4]
              : THEME_COLORS.overlayPrimary[4],
        },
        label: {
          fontWeight: 400,
          fontSize: fontConfig.xs.fontSize,
        },
      };
    },
  },

  Card: {
    styles: () => {
      const spacingConfig = THEME_SPACING;
      const radiusConfig = THEME_RADIUS;

      return {
        root: {
          borderRadius: radiusConfig.xs,
          padding: spacingConfig.s,
        },
      };
    },
  },

  Grid: {
    defaultProps: {
      gutter: 'md',
    },
  },

  GridCol: {
    styles: () => ({
      col: {
        minWidth: 0,
      },
    }),
  },
};
