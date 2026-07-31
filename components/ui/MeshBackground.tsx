import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useUserStore } from '@/store/useUserStore';
import { darkColors, lightColors } from '@/constants/theme';

interface MeshBackgroundProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function MeshBackground({ children, style }: MeshBackgroundProps) {
  const themeMode = useUserStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? darkColors.background : lightColors.background },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
