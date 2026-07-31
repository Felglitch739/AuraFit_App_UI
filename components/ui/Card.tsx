/**
 * Card — THE critical component.
 *
 * REGLA DE IMPLEMENTACIÓN (de context.md §7):
 * Sombra MÁS SIMPLE posible. Una sola sombra sutil.
 * - iOS: shadowColor/shadowOffset/shadowOpacity/shadowRadius
 * - Android: elevation bajo (2-4)
 * - Web: boxShadow aplicado manualmente
 * Sin librerías externas de sombra dual.
 * Sin efectos de "sombra clara + sombra oscura" superpuestas.
 *
 * Este componente fue probado AISLADO antes de aplicarse al sistema.
 */

import React from 'react';
import { View, StyleSheet, Platform, type ViewProps, type ViewStyle } from 'react-native';
import { colors, radius, spacing, shadows } from '@/constants/theme';

export type CardVariant = 'default' | 'elevated' | 'flat';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
  /** Padding interior — usa spacing tokens */
  padding?: number;
}

export function Card({
  children,
  variant = 'default',
  style,
  padding = spacing.md,
  ...props
}: CardProps) {
  const shadowStyle = getShadowStyle(variant);

  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        shadowStyle,
        padding !== undefined && { padding },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

function getShadowStyle(variant: CardVariant): ViewStyle {
  switch (variant) {
    case 'elevated':
      return shadows.cardElevated;

    case 'flat':
      return shadows.none;

    case 'default':
    default:
      return shadows.card;
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderColor: colors.borderLight,
    borderWidth: StyleSheet.hairlineWidth,
  },
  elevated: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
});
