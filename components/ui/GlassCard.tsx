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
    hero: 'rgba(20, 20, 28, 0.72)',
    medium: 'rgba(20, 20, 28, 0.62)',
    subtle: 'rgba(255, 255, 255, 0.05)',
  };

  const bgMapLight = {
    hero: 'rgba(255, 255, 255, 0.78)',
    medium: 'rgba(255, 255, 255, 0.68)',
    subtle: 'rgba(255, 255, 255, 0.50)',
  };

  const borderMapDark = {
    hero: 'rgba(255, 255, 255, 0.20)',
    medium: 'rgba(255, 255, 255, 0.14)',
    subtle: 'rgba(255, 255, 255, 0.08)',
  };

  const borderMapLight = {
    hero: 'rgba(255, 255, 255, 0.90)',
    medium: 'rgba(255, 255, 255, 0.75)',
    subtle: 'rgba(255, 255, 255, 0.55)',
  };

  const glowStyle: ViewStyle = glowColor
    ? {
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.35 : 0.22,
        shadowRadius: 14,
        elevation: 6,
      }
    : isDark ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      } : {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        elevation: 3,
      };

  // Check if flex: 1 is in style
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const outerFlexStyle: ViewStyle = flattenedStyle.flex !== undefined ? { flex: flattenedStyle.flex } : {};

  const bevelHighlight: ViewStyle = {
    borderTopColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.95)',
    borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.85)',
  };

  const cardStyle = [
    styles.cardContent,
    bevelHighlight,
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
      style={[styles.blurContainer, cardStyle]}
      {...props}
    >
      {children}
    </BlurView>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        renderToHardwareTextureAndroid={true}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.outerContainer, outerFlexStyle, glowStyle, animatedStyle]}
      >
        {innerComponent}
      </AnimatedPressable>
    );
  }

  return (
    <View
      renderToHardwareTextureAndroid={true}
      style={[styles.outerContainer, outerFlexStyle, glowStyle]}
    >
      {innerComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: radius.lg,
    marginVertical: spacing.xs,
    overflow: 'hidden',
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
    borderWidth: 1.2,
    borderRadius: radius.lg,
    flex: 1,
  },
});
