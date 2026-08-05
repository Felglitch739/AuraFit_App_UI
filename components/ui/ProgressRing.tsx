import React, { useEffect, useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

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
  strokeWidth = 14,
  color = '#00F2FE',
  gradientColors = ['#00F2FE', '#4FACFE'],
  trackColor = 'rgba(255, 255, 255, 0.08)',
  children,
}: ProgressRingProps) {
  const gradientId = useId();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const halfSize = size / 2;
  const padding = strokeWidth + 4;
  const ringRadius = (size - padding) / 2;
  const circumference = 2 * Math.PI * ringRadius;

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(clampedProgress, {
      duration: 1100,
      easing: Easing.out(Easing.back(1.2)),
    });
  }, [clampedProgress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          {/* Main 3D Tube Gradient */}
          <LinearGradient id={`ringGradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="50%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>

          {/* Tube Specular Highlight */}
          <LinearGradient id={`highlightGradient-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
          </LinearGradient>
        </Defs>

        {/* Outer Shadow/Glow Track */}
        <Circle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius}
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth={strokeWidth + 4}
          fill="none"
        />

        {/* Track neumórfico excavado */}
        <Circle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Glow de fondo para el arco 3D */}
        <AnimatedCircle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius}
          stroke={gradientColors[0]}
          strokeWidth={strokeWidth + 6}
          strokeOpacity={0.35}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${halfSize} ${halfSize})`}
        />

        {/* Arco de progreso 3D principal (Tubo con volumen) */}
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

        {/* Capa de brillo especular superior (Bisel 3D) */}
        <AnimatedCircle
          cx={halfSize}
          cy={halfSize}
          r={ringRadius - strokeWidth * 0.22}
          stroke={`url(#highlightGradient-${gradientId})`}
          strokeWidth={strokeWidth * 0.35}
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

