import React, { useEffect } from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface StaggerViewProps {
  children: React.ReactNode;
  index?: number;
  delayStep?: number;
  style?: StyleProp<ViewStyle>;
}

export function StaggerView({
  children,
  index = 0,
  delayStep = 100,
  style,
}: StaggerViewProps) {
  const delay = index * delayStep;
  const translateY = useSharedValue(-24);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 15,
        stiffness: 140,
        mass: 0.8,
      })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 350 })
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
