import React from 'react';
import { Pressable, Text, StyleSheet, Platform, type ViewStyle, type StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { radius, spacing, typography, touchTargets } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  const { colors, isDark } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.94, { damping: 16, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 300 });
  };

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS !== 'web') {
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (_) {}
      }
      onPress();
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.chip,
        {
          backgroundColor: selected
            ? colors.primary
            : isDark
            ? 'rgba(255, 255, 255, 0.06)'
            : '#E5E5EA',
          borderColor: selected
            ? colors.primary
            : isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : '#D1D1D6',
        },
        animatedStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? colors.onPrimary : colors.foreground,
            fontWeight: selected ? '700' : '600',
          },
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.xl,
    borderWidth: 1,
    minHeight: touchTargets.minimum - 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.labelMedium,
    fontSize: 13,
  },
});
