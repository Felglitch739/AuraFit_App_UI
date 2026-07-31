import React from 'react';
import { View, StyleSheet, Platform, Pressable, type ViewProps, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { radius, spacing } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';

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
  const themeMode = useUserStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
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

  const bgMapDark = {
    hero: '#14141A',
    medium: '#14141A',
    subtle: 'rgba(255, 255, 255, 0.03)',
  };

  const bgMapLight = {
    hero: '#FFFFFF',
    medium: '#FFFFFF',
    subtle: 'rgba(0, 0, 0, 0.02)',
  };

  const borderMapDark = {
    hero: 'rgba(255, 255, 255, 0.14)',
    medium: 'rgba(255, 255, 255, 0.10)',
    subtle: 'rgba(255, 255, 255, 0.06)',
  };

  const borderMapLight = {
    hero: '#E5E5EA',
    medium: '#E5E5EA',
    subtle: '#E5E5EA',
  };

  const glowStyle: ViewStyle = glowColor
    ? {
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.25 : 0.12,
        shadowRadius: 8,
        elevation: 4,
      }
    : isDark ? {} : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      };

  // Check if flex: 1 is in style
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const outerFlexStyle: ViewStyle = flattenedStyle.flex !== undefined ? { flex: flattenedStyle.flex } : {};

  const cardStyle = [
    styles.cardContent,
    {
      backgroundColor: isDark ? bgMapDark[level] : bgMapLight[level],
      borderColor: isDark ? borderMapDark[level] : borderMapLight[level],
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
      tint={isDark ? "dark" : "light"}
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
        style={[styles.outerContainer, outerFlexStyle, glowStyle, animatedStyle]}
      >
        {innerComponent}
      </AnimatedPressable>
    );
  }

  return <View style={[styles.outerContainer, outerFlexStyle, glowStyle]}>{innerComponent}</View>;
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: radius.lg,
    marginVertical: spacing.xs,
  },
  blurContainer: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    flex: 1,
  },
  webGlass: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    flex: 1,
  },
  cardContent: {
    borderWidth: 1,
    borderRadius: radius.lg,
    flex: 1,
  },
});
