/**
 * AuraFit Design System — Design Tokens
 *
 * Regla de oro: sombras SIMPLES. Una sola sombra sutil.
 * Sin sombra dual, sin librerías externas, sin neumorfismo.
 *
 * Validado contra context.md §7:
 * - Fondo blanco puro, cards gris muy claro
 * - Bordes redondeados grandes y consistentes
 * - Sombras casi imperceptibles
 * - Sensación "premium, minimalista, tranquilo"
 */

import { Platform, type ViewStyle } from 'react-native';

// ─── COLORS ────────────────────────────────────────────────────
export const lightColors = {
  primary: '#007AFF',       // iOS System Blue
  onPrimary: '#FFFFFF',     // Blanco puro para contraste
  secondary: '#5AC8FA',     // iOS Light Blue para acentos secundarios
  accent: '#34C759',        // iOS System Green para CTA / éxitos

  background: '#F2F2F7',    // Fondo general (iOS System Grouped Background)
  surface: '#FFFFFF',       // Cards (Blanco puro)
  surfaceElevated: '#FFFFFF', 

  foreground: '#000000',    // Texto principal (iOS Black)
  muted: '#8E8E93',         // Texto secundario (iOS System Gray)
  subtle: '#C7C7CC',        // Texto terciario / disabled

  border: '#C6C6C8',        // Bordes (iOS Separator)
  borderLight: '#E5E5EA',   // Bordes sutiles (iOS Opaque Separator)

  destructive: '#FF3B30',   // iOS System Red
  warning: '#FF9500',       // iOS System Orange
  success: '#34C759',       // iOS System Green

  protein: '#FF3B30',       // Rojo
  carbs: '#FFCC00',         // Amarillo iOS
  fats: '#007AFF',          // Azul iOS

  energyHigh: '#FF9500',
  energyLow: '#8E8E93',
  sleepGood: '#5856D6',     // iOS Purple/Indigo
  stressLow: '#34C759',
  stressHigh: '#FF3B30',

  glowPrimary: 'rgba(0, 122, 255, 0.4)',
  glowAccent: 'rgba(52, 199, 89, 0.4)',

  tabIconDefault: '#8E8E93',
  tabIconSelected: '#007AFF',
} as const;

export const darkColors = {
  // Core (Oura / Whoop / Linear inspired)
  primary: '#0A84FF',       // Neon Electric Blue
  onPrimary: '#FFFFFF',     // Pure White
  secondary: '#5E5CE6',     // Electric Indigo
  accent: '#30D158',        // Neon Green

  // Glow Colors
  glowPrimary: '#0A84FF',
  glowAccent: '#30D158',

  // Surfaces (Cold near-pure black & dark solid cards)
  background: '#0A0A0F',    // Deep cold black
  surface: '#14141A',       // Solid dark card surface
  surfaceElevated: '#1C1C24', 

  // Text Hierarchy
  foreground: '#FFFFFF',    // Primary text / Big numbers (Pure White)
  muted: '#8E8E93',         // Secondary text / Labels (iOS System Gray)
  subtle: '#48484A',        // Tertiary text / disabled

  // Borders (Crisp 1px subtle white outlines)
  border: 'rgba(255, 255, 255, 0.12)',
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

// Active Theme Palette for feature/ui-experiments branch
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
// Usamos la fuente del sistema por defecto (San Francisco en iOS,
// Roboto en Android). Inter se cargará después vía expo-font.
// Por ahora, system font funciona bien y es la fallback más segura.

export const typography = {
  // Números grandes (calorías, pesos)
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
  // Títulos de sección
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
  // Subtítulos / labels
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
  // Body text
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
  // Captions
  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
} as const;

// ─── SHADOWS ───────────────────────────────────────────────────
// En la estética Apple HIG (flat design actual), agrupamos con fondos y bordes 
// extremadamente finos o sombras casi nulas.

export const shadows = {
  /** Sombra sutil / borde para cards en dark mode */
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as ViewStyle,

  /** Sombra sutil de elevación (modales, popovers) */
  cardElevated: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as ViewStyle,

  /** GLOW Eléctrico Azul para anillo / CTA principal */
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

  /** GLOW Neón Verde para éxitos / acentos */
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

// ─── ICON SIZES ────────────────────────────────────────────────
export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

// ─── TOUCH TARGETS ─────────────────────────────────────────────
// Mínimo 44×44pt (iOS) / 48×48dp (Android) — WCAG
export const touchTargets = {
  minimum: 44,
  comfortable: 48,
} as const;

// ─── ANIMATION TIMING ──────────────────────────────────────────
export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

// ─── LEGACY COMPAT (para scaffold existente que usa Colors) ────
export const Colors = {
  light: {
    text: colors.foreground,
    background: colors.background,
    tint: colors.primary,
    icon: colors.muted,
    tabIconDefault: colors.tabIconDefault,
    tabIconSelected: colors.tabIconSelected,
  },
  dark: {
    // Dark mode fuera de scope para v1 (context.md §6),
    // pero dejamos los tokens para no romper el scaffold
    text: '#ECEDEE',
    background: '#151718',
    tint: '#FFFFFF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
  },
} as const;
