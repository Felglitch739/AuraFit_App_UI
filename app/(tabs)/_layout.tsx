import { Tabs, Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { FloatingTabBar } from '@/components/navigation/FloatingTabBar';
import { colors } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { House, Barbell, ForkKnife, ChartLineUp, User } from 'phosphor-react-native';

export default function TabLayout() {
  // Esperar a que Zustand cargue de AsyncStorage
  const [hasHydrated, setHasHydrated] = useState(false);
  const isOnboarded = useUserStore((state) => state.isOnboarded);

  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => setHasHydrated(true));
    setHasHydrated(useUserStore.persist.hasHydrated());
    return unsub;
  }, []);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoy',
          tabBarIcon: ({ color, focused }) => (
            <House size={24} color={color} weight={focused ? "fill" : "regular"} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Entreno',
          tabBarIcon: ({ color, focused }) => (
            <Barbell size={24} color={color} weight={focused ? "fill" : "regular"} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrición',
          tabBarIcon: ({ color, focused }) => (
            <ForkKnife size={24} color={color} weight={focused ? "fill" : "regular"} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color, focused }) => (
            <ChartLineUp size={24} color={color} weight={focused ? "fill" : "regular"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} weight={focused ? "fill" : "regular"} />
          ),
        }}
      />
    </Tabs>
  );
}
