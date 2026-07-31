import React, { useEffect, useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  /** Progreso de 0 a 1 */
  progress: number;
  /** Diámetro total del anillo */
  size: number;
  /** Grosor del trazo */
  strokeWidth?: number;
  /** Color principal o inicio de gradiente */
  color?: string;
  /** Colores del gradiente [inicio, fin] */
  gradientColors?: [string, string];
  /** Color del track (fondo) */
  trackColor?: string;
  /** Contenido central (ej: número, icono) */
  children?: React.ReactNode;
}

export function ProgressRing({
  progress,
  size,
  strokeWidth = 8,
  color = colors.primary,
  gradientColors,
  trackColor = '#E5E5EA',
  children,
}: ProgressRingProps) {
  const gradientId = useId();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const halfSize = size / 2;
  const ringRadius = halfSize - strokeWidth / 2;
  const circumference = 2 * Math.PI * ringRadius;

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(clampedProgress, {
      duration: 850,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedProgress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  const colorsToUse: [string, string] = gradientColors || [color, colors.secondary || '#5856D6'];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={`ringGradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colorsToUse[0]} />
            <Stop offset="100%" stopColor={colorsToUse[1]} />
          </LinearGradient>
        </Defs>

        {/* Track (fondo) */}
        <Circle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Arco de progreso animado */}
        <AnimatedCircle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius}
          stroke={`url(#ringGradient-${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${halfSize} ${halfSize})`}
        />
      </Svg>
      {children && <View style={styles.centerContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

