/**
 * AuraFit Design System — Design Tokens & Theme Manager
 */

import { Platform, type ViewStyle } from 'react-native';

// ─── COLORS ────────────────────────────────────────────────────
export const lightColors = {
  primary: '#007AFF',       // iOS System Blue
  onPrimary: '#FFFFFF',     // Pure White
  secondary: '#5AC8FA',     // iOS Light Blue
  accent: '#34C759',        // iOS System Green
  blue: '#007AFF',
  orange: '#FF9500',
  purple: '#5856D6',

  background: '#F2F2F7',    // iOS System Grouped Background
  bgSecondary: '#E5E5EA',
  surface: '#FFFFFF',       // Clean White Cards
  surfaceElevated: '#FFFFFF',

  foreground: '#000000',    // Text Primary
  text: '#000000',
  muted: '#8E8E93',         // Text Secondary
  subtle: '#C7C7CC',        // Text Disabled
  icon: '#8E8E93',

  border: '#C6C6C8',        // iOS Separator
  borderActive: '#007AFF',
  borderLight: '#E5E5EA',

  destructive: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',

  protein: '#FF3B30',       // Red
  carbs: '#FFCC00',         // Yellow
  fats: '#007AFF',          // Blue

  energyHigh: '#FF9500',
  energyLow: '#8E8E93',
  sleepGood: '#5856D6',
  stressLow: '#34C759',
  stressHigh: '#FF3B30',

  glowCyan: 'rgba(0, 122, 255, 0.20)',
  glowPurple: 'rgba(88, 86, 214, 0.20)',
  glowBlue: 'rgba(0, 122, 255, 0.20)',
  glowGreen: 'rgba(52, 199, 89, 0.20)',
  glowOrange: 'rgba(255, 149, 0, 0.20)',

  tabIconDefault: '#8E8E93',
  tabIconSelected: '#007AFF',
} as const;

export const darkColors = {
  // Core (Original Dark Mode: Oura / Whoop / Linear inspired)
  primary: '#0A84FF',       // Neon Electric Blue
  onPrimary: '#FFFFFF',     // Pure White
  secondary: '#5E5CE6',     // Electric Indigo
  blue: '#0A84FF',
  accent: '#30D158',        // Neon Green
  orange: '#FF9F0A',
  purple: '#5E5CE6',

  // Glow Colors
  glowCyan: 'rgba(10, 132, 255, 0.35)',
  glowPurple: 'rgba(94, 92, 230, 0.35)',
  glowBlue: 'rgba(10, 132, 255, 0.35)',
  glowGreen: 'rgba(48, 209, 88, 0.35)',
  glowOrange: 'rgba(255, 159, 10, 0.35)',

  // Surfaces (Cold near-pure black & dark solid cards)
  background: '#0A0A0F',    // Deep cold black
  bgSecondary: '#14141A',   // Solid dark surface
  surface: '#14141A',       // Solid dark card surface
  surfaceElevated: '#1C1C24', 

  // Text Hierarchy
  foreground: '#FFFFFF',    // Pure White
  text: '#FFFFFF',
  muted: '#8E8E93',         // Secondary text / Labels
  subtle: '#48484A',        // Disabled text
  icon: '#8E8E93',

  // Borders (Crisp 1px subtle white outlines)
  border: 'rgba(255, 255, 255, 0.12)',
  borderActive: '#0A84FF',
  borderLight: 'rgba(255, 255, 255, 0.08)',

  // Feedback
  destructive: '#FF453A',   // System Red Dark
  warning: '#FF9F0A',       // System Orange Dark
  success: '#30D158',       // System Green Dark

  // High-contrast Macro colors for dark mode
  protein: '#FF375F',       // Neon Pink/Red
  carbs: '#FFD60A',         // Vibrant Amber
  fats: '#30D158',          // Neon Green

  // Wellness
  energyHigh: '#FF9F0A',
  energyLow: '#8E8E93',
  sleepGood: '#5E5CE6',
  stressLow: '#30D158',
  stressHigh: '#FF453A',

  // Tab bar
  tabIconDefault: '#8E8E93',
  tabIconSelected: '#FFFFFF',
} as const;

export function getThemeColors(mode: 'dark' | 'light') {
  return mode === 'light' ? lightColors : darkColors;
}

// Active default export
export const colors = darkColors;

// ─── SPACING (8dp rhythm) ──────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

// ─── BORDER RADIUS ─────────────────────────────────────────────
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// ─── TYPOGRAPHY ────────────────────────────────────────────────
export const typography = {
  displayLarge: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
  },
  displayMedium: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  titleLarge: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  titleSmall: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  labelMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
} as const;

// ─── SHADOWS ───────────────────────────────────────────────────
export const shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as ViewStyle,

  cardElevated: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as ViewStyle,

  glowPrimary: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0A84FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }) as ViewStyle,

  glowAccent: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#30D158',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }) as ViewStyle,

  none: {} as ViewStyle,
} as const;

export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export const touchTargets = {
  minimum: 44,
  comfortable: 48,
} as const;

export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

export const Colors = {
  light: lightColors,
  dark: darkColors,
} as const;
