import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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

const TAB_ICONS: Record<string, React.ElementType> = {
  index: House,
  workouts: Barbell,
  nutrition: ForkKnife,
  progress: ChartLineUp,
  profile: User,
};

const TAB_LABELS: Record<string, string> = {
  index: 'Hoy',
  workouts: 'Entreno',
  nutrition: 'Nutrición',
  progress: 'Progreso',
  profile: 'Perfil',
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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
        <Animated.View style={[styles.activeSubPill, animatedIndicatorStyle]} />
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
              color={isFocused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'}
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
        <View style={styles.webBlurContainer}>
          {renderContent()}
        </View>
      ) : (
        <BlurView
          intensity={85}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.blurContainer}
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
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 6,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: Platform.select({
      android: 'rgba(24, 24, 28, 0.94)',
      default: 'rgba(20, 20, 24, 0.65)',
    }),
  },
  webBlurContainer: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(24, 24, 28, 0.82)',
    // @ts-ignore Web blur filter support
    backdropFilter: 'blur(20px)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    top: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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

