import React from 'react';
import { Pressable, StyleSheet, Platform, type ViewStyle, type GestureResponderEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { radius, spacing, shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import type { CardVariant } from './Card';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressableCardProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: CardVariant;
  padding?: number;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

export function PressableCard({
  children,
  onPress,
  variant = 'default',
  padding = spacing.md,
  style,
  disabled = false,
}: PressableCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.97, {
      damping: 15,
      stiffness: 300,
    });
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (_) {}
    }
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1.0, {
      damping: 15,
      stiffness: 300,
    });
  };

  const shadowStyle = variant === 'elevated' ? shadows.cardElevated : variant === 'flat' ? shadows.none : shadows.card;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
        },
        shadowStyle,
        { padding },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
  },
});
