import React from 'react';
import { View, StyleSheet, Platform, Pressable, type ViewProps, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { radius, spacing } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  /** Nivel de profundidad y difuminado: 'hero' | 'medium' | 'subtle' */
  level?: 'hero' | 'medium' | 'subtle';
  padding?: number;
  glowColor?: string;
  onPress?: () => void;
}

export function GlassCard({
  children,
  level = 'medium',
  padding = spacing.md,
  glowColor,
  onPress,
  style,
  ...props
}: GlassCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      // Apple Design: Critically-damped spring (smooth, no overshoot)
      scale.value = withSpring(0.98, { damping: 18, stiffness: 220 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 18, stiffness: 220 });
    }
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

  const intensityMap = {
    hero: Platform.OS === 'ios' ? 45 : 75,
    medium: Platform.OS === 'ios' ? 30 : 55,
    subtle: Platform.OS === 'ios' ? 20 : 40,
  };

  const bgMap = {
    hero: 'rgba(255, 255, 255, 0.06)',
    medium: 'rgba(255, 255, 255, 0.04)',
    subtle: 'rgba(255, 255, 255, 0.02)',
  };

  const borderMap = {
    hero: 'rgba(255, 255, 255, 0.18)',
    medium: 'rgba(255, 255, 255, 0.12)',
    subtle: 'rgba(255, 255, 255, 0.07)',
  };

  const glowStyle: ViewStyle = glowColor
    ? {
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 4,
      }
    : {};

  const cardStyle = [
    styles.cardContent,
    {
      backgroundColor: bgMap[level],
      borderColor: borderMap[level],
      padding,
    },
    style,
  ];

  const innerComponent = Platform.OS === 'web' ? (
    <View style={[styles.webGlass, cardStyle]} {...props}>
      {children}
    </View>
  ) : (
    <BlurView
      intensity={intensityMap[level]}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={[styles.blurContainer, cardStyle]}
      {...props}
    >
      {children}
    </BlurView>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.outerContainer, glowStyle, animatedStyle]}
      >
        {innerComponent}
      </AnimatedPressable>
    );
  }

  return <View style={[styles.outerContainer, glowStyle]}>{innerComponent}</View>;
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: radius.lg,
    marginVertical: spacing.xs,
  },
  blurContainer: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  webGlass: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    // @ts-ignore Web blur filter support
    backdropFilter: 'blur(24px)',
  },
  cardContent: {
    borderWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: radius.lg,
  },
});
