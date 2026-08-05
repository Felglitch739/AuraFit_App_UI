import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, type ViewStyle } from 'react-native';
import Svg, { Rect, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useUserStore } from '@/store/useUserStore';
import { darkColors, lightColors } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MeshBackgroundProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function MeshBackground({ children, style }: MeshBackgroundProps) {
  const themeMode = useUserStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';

  // Animaciones de respiración/flotación para los orbes (8-10s por ciclo)
  const orb1Scale = useSharedValue(1);
  const orb1TranslateY = useSharedValue(0);

  const orb2Scale = useSharedValue(1);
  const orb2TranslateX = useSharedValue(0);

  const orb3Scale = useSharedValue(1);
  const orb3TranslateY = useSharedValue(0);

  useEffect(() => {
    orb1Scale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 9000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb1TranslateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 8500, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 8500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    orb2Scale.value = withRepeat(
      withSequence(
        withTiming(1.22, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb2TranslateX.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 9500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-25, { duration: 9500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    orb3Scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb3TranslateY.value = withRepeat(
      withSequence(
        withTiming(18, { duration: 7500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-18, { duration: 7500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const orb1Style = useAnimatedStyle(() => ({
    transform: [
      { scale: orb1Scale.value },
      { translateY: orb1TranslateY.value },
    ],
  }));

  const orb2Style = useAnimatedStyle(() => ({
    transform: [
      { scale: orb2Scale.value },
      { translateX: orb2TranslateX.value },
    ],
  }));

  const orb3Style = useAnimatedStyle(() => ({
    transform: [
      { scale: orb3Scale.value },
      { translateY: orb3TranslateY.value },
    ],
  }));

  const opacityBlue = isDark ? 0.35 : 0.22;
  const opacityOrange = isDark ? 0.30 : 0.20;
  const opacityPurple = isDark ? 0.28 : 0.18;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? darkColors.background : lightColors.background },
        style,
      ]}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Orbe 1: Azul Soft (#3B82F6) Top-Left */}
        <Animated.View
          renderToHardwareTextureAndroid={true}
          style={[styles.orb, styles.orbBlue, orb1Style]}
        >
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#3B82F6" stopOpacity={opacityBlue} />
                <Stop offset="60%" stopColor="#3B82F6" stopOpacity={opacityBlue * 0.4} />
                <Stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#blueGlow)" />
          </Svg>
        </Animated.View>

        {/* Orbe 2: Naranja Cálido (#F97316) Center-Right */}
        <Animated.View
          renderToHardwareTextureAndroid={true}
          style={[styles.orb, styles.orbOrange, orb2Style]}
        >
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#F97316" stopOpacity={opacityOrange} />
                <Stop offset="60%" stopColor="#F97316" stopOpacity={opacityOrange * 0.4} />
                <Stop offset="100%" stopColor="#F97316" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#orangeGlow)" />
          </Svg>
        </Animated.View>

        {/* Orbe 3: Violeta Lavanda (#A855F7) Bottom-Left */}
        <Animated.View
          renderToHardwareTextureAndroid={true}
          style={[styles.orb, styles.orbPurple, orb3Style]}
        >
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id="purpleGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#A855F7" stopOpacity={opacityPurple} />
                <Stop offset="60%" stopColor="#A855F7" stopOpacity={opacityPurple * 0.4} />
                <Stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#purpleGlow)" />
          </Svg>
        </Animated.View>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbBlue: {
    top: -SCREEN_HEIGHT * 0.08,
    left: -SCREEN_WIDTH * 0.15,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_WIDTH * 0.95,
  },
  orbOrange: {
    top: SCREEN_HEIGHT * 0.28,
    right: -SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
  },
  orbPurple: {
    bottom: -SCREEN_HEIGHT * 0.05,
    left: -SCREEN_WIDTH * 0.10,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_WIDTH * 0.85,
  },
});

