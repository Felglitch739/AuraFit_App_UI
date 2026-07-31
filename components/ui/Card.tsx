import React from 'react';
import { View, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { radius, spacing, shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export type CardVariant = 'default' | 'elevated' | 'flat';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: number;
}

export function Card({
  children,
  variant = 'default',
  style,
  padding = spacing.md,
  ...props
}: CardProps) {
  const { colors, isDark } = useTheme();
  const shadowStyle = getShadowStyle(variant);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.surface,
          borderColor: isDark ? colors.borderLight : colors.borderLight,
        },
        variant === 'elevated' && { borderColor: colors.border },
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
    borderRadius: radius.lg,
    borderWidth: 1,
  },
});
