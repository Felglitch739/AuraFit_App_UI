/**
 * Button — Pressable con feedback visual (opacity + scale sutil).
 * Cumple touch target mínimo de 44×44pt.
 */

import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors, radius, spacing, typography, animation, touchTargets } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function Button({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.97, { duration: animation.fast });
    opacity.value = withTiming(0.85, { duration: animation.fast });
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: animation.fast });
    opacity.value = withTiming(1, { duration: animation.fast });
  }, [scale, opacity]);

  const buttonStyle = getButtonStyle(variant, size, disabled);
  const textStyle = getTextStyle(variant, size, disabled);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[buttonStyle, animatedStyle, style]}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.onPrimary : colors.primary}
          size="small"
        />
      ) : children ? (
        children
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </AnimatedPressable>
  );
}

function getButtonStyle(variant: ButtonVariant, size: ButtonSize, disabled: boolean): ViewStyle {
  const base: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    minHeight: touchTargets.minimum,
    ...getSizeStyle(size),
  };

  if (disabled) {
    return {
      ...base,
      backgroundColor: colors.border,
    };
  }

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: colors.primary };
    case 'secondary':
      return { ...base, backgroundColor: colors.secondary };
    case 'outline':
      return { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary };
    case 'ghost':
      return { ...base, backgroundColor: 'transparent' };
  }
}

function getTextStyle(variant: ButtonVariant, size: ButtonSize, disabled: boolean) {
  const base = {
    ...typography.labelLarge,
    ...(size === 'sm' ? typography.labelMedium : {}),
  };

  if (disabled) {
    return { ...base, color: colors.muted };
  }

  switch (variant) {
    case 'primary':
      return { ...base, color: colors.onPrimary };
    case 'secondary':
      return { ...base, color: colors.foreground };
    case 'outline':
    case 'ghost':
      return { ...base, color: colors.primary };
  }
}

function getSizeStyle(size: ButtonSize): ViewStyle {
  switch (size) {
    case 'sm':
      return { paddingHorizontal: spacing.md, paddingVertical: spacing.sm };
    case 'lg':
      return { paddingHorizontal: spacing.xl, paddingVertical: spacing.md };
    case 'md':
    default:
      return { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 4 };
  }
}
