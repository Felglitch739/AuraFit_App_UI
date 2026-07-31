import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import { useRouter, usePathname } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const TAB_ROUTES = [
  '/',
  '/workouts',
  '/nutrition',
  '/progress',
  '/profile',
];

interface TabSwipeHandlerProps {
  children: React.ReactNode;
}

export function TabSwipeHandler({ children }: TabSwipeHandlerProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine current tab index
  const currentIndex = TAB_ROUTES.findIndex((r) => {
    if (r === '/') return pathname === '/' || pathname === '/index';
    return pathname.startsWith(r);
  });

  const navigateToTab = (index: number) => {
    if (index >= 0 && index < TAB_ROUTES.length) {
      if (Platform.OS !== 'web') {
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (_) {}
      }
      router.push(TAB_ROUTES[index] as any);
    }
  };

  // Swipe Left -> Next Tab
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      if (currentIndex !== -1 && currentIndex < TAB_ROUTES.length - 1) {
        navigateToTab(currentIndex + 1);
      }
    });

  // Swipe Right -> Previous Tab
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      if (currentIndex !== -1 && currentIndex > 0) {
        navigateToTab(currentIndex - 1);
      }
    });

  const composedGesture = Gesture.Simultaneous(flingLeft, flingRight);

  return (
    <GestureDetector gesture={composedGesture}>
      {children}
    </GestureDetector>
  );
}
