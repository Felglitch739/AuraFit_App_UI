import React, { useEffect, useState } from 'react';
import { Text, type TextStyle, type StyleProp } from 'react-native';
import {
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

interface AnimatedCountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: StyleProp<TextStyle>;
  formatter?: (val: number) => string;
}

export function AnimatedCountUp({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
  formatter,
}: AnimatedCountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>(
    prefix + (0).toFixed(decimals) + suffix
  );

  const countValue = useSharedValue(0);

  useEffect(() => {
    countValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, duration]);

  useAnimatedReaction(
    () => countValue.value,
    (currentValue) => {
      let formatted: string;
      if (formatter) {
        formatted = formatter(currentValue);
      } else {
        const valStr = currentValue.toFixed(decimals);
        const parts = valStr.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formatted = `${prefix}${parts.join('.')}${suffix}`;
      }
      runOnJS(setDisplayValue)(formatted);
    },
    [value, prefix, suffix, decimals, formatter]
  );

  return <Text style={style}>{displayValue}</Text>;
}
