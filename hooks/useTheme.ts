import { useUserStore } from '@/store/useUserStore';
import { lightColors, darkColors } from '@/constants/theme';

export function useTheme() {
  const themeMode = useUserStore((state) => state.themeMode);
  const setThemeMode = useUserStore((state) => state.setThemeMode);
  const toggleThemeMode = useUserStore((state) => state.toggleThemeMode);

  const isDark = themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return {
    themeMode,
    isDark,
    colors,
    setThemeMode,
    toggleThemeMode,
  };
}
