/**
 * Chip — Tag redondeado seleccionable (para filtros, muscle groups, etc.)
 */

import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { colors, radius, spacing, typography, touchTargets } from '@/constants/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    minHeight: touchTargets.minimum,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.8,
  },
  label: {
    ...typography.labelMedium,
    color: colors.foreground,
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});
