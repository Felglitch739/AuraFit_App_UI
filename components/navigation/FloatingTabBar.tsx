import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { House, Barbell, ForkKnife, ChartLineUp, User } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

const TAB_ICONS: Record<string, React.ElementType> = {
  index: House,
  workouts: Barbell,
  nutrition: ForkKnife,
  progress: ChartLineUp,
  profile: User,
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = state.index;

  const tabWidth = containerWidth > 0 ? (containerWidth - 12) / state.routes.length : 0;
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth > 0) {
      translateX.value = withSpring(activeIndex * tabWidth + 6, {
        damping: 18,
        stiffness: 220,
      });
    }
  }, [activeIndex, tabWidth]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: tabWidth > 0 ? tabWidth : '20%',
    };
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const renderContent = () => (
    <View style={styles.tabContent} onLayout={handleLayout}>
      {/* Sliding Active Indicator */}
      {tabWidth > 0 && (
        <Animated.View
          style={[
            styles.activeSubPill,
            {
              backgroundColor: isDark ? 'rgba(10, 132, 255, 0.22)' : 'rgba(0, 122, 255, 0.12)',
              borderColor: isDark ? 'rgba(10, 132, 255, 0.45)' : 'rgba(0, 122, 255, 0.28)',
              shadowColor: colors.primary,
            },
            animatedIndicatorStyle,
          ]}
        />
      )}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const IconComponent = TAB_ICONS[route.name] || House;

        const onPress = () => {
          if (Platform.OS !== 'web') {
            try {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            } catch (_) {}
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabItem}
          >
            <IconComponent
              size={22}
              color={isFocused ? colors.primary : colors.muted}
              weight={isFocused ? 'fill' : 'regular'}
            />
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      {Platform.OS === 'web' ? (
        <View
          style={[
            styles.webBlurContainer,
            {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
              backgroundColor: isDark ? 'rgba(18, 18, 22, 0.88)' : 'rgba(255, 255, 255, 0.88)',
              // @ts-ignore WebkitBackdropFilter for frosted glass blur on web
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            },
          ]}
        >
          {renderContent()}
        </View>
      ) : (
        <BlurView
          intensity={90}
          tint={isDark ? 'dark' : 'light'}
          experimentalBlurMethod="dimezisBlurView"
          style={[
            styles.blurContainer,
            {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
              backgroundColor: isDark
                ? 'rgba(18, 18, 22, 0.88)'
                : 'rgba(255, 255, 255, 0.88)',
            },
          ]}
        >
          {renderContent()}
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
    height: 52,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 8,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
  },
  webBlurContainer: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    position: 'relative',
  },
  activeSubPill: {
    position: 'absolute',
    height: 40,
    borderRadius: 20,
    top: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
  },
  tabItem: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    zIndex: 2,
  },
});
