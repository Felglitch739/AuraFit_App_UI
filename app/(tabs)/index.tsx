import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MeshBackground, BodyMedium } from '@/components/ui';
import { WellnessCheckin } from '@/components/home/WellnessCheckin';
import { CalorieSummary } from '@/components/home/CalorieSummary';
import { NextWorkoutCard } from '@/components/home/NextWorkoutCard';
import { WeeklyActivityMini } from '@/components/home/WeeklyActivityMini';
import { spacing } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { useTheme } from '@/hooks/useTheme';
import {
  mockTodayNutrition,
  mockTodayWorkout,
  mockWeeklyActivity,
} from '@/data/mock';

export default function HomeScreen() {
  const router = useRouter();
  const { profile, wellness } = useUserStore((state) => state);
  const { colors } = useTheme();

  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (wellness.lastCheckinDate !== todayStr) {
      setTimeout(() => {
        router.push('/checkin');
      }, 100);
    }
  }, [wellness.lastCheckinDate]);

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header — Saludo + Fecha */}
          <Animated.View entering={FadeInDown.duration(350)} style={styles.header}>
            <Text style={[styles.greetingTitle, { color: colors.foreground }]}>
              Hola, {profile.name || 'User'}
            </Text>
            <BodyMedium style={[styles.dateText, { color: colors.muted }]}>
              {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
            </BodyMedium>
          </Animated.View>

          {/* Wellness Check-in */}
          <Animated.View entering={FadeInDown.delay(100).duration(350)} style={styles.section}>
            <WellnessCheckin 
              checkin={wellness} 
              onPress={() => router.push('/checkin')}
            />
          </Animated.View>

          {/* Resumen de Calorías + Macros */}
          <Animated.View entering={FadeInDown.delay(200).duration(350)} style={styles.section}>
            <CalorieSummary
              consumed={mockTodayNutrition.totalCalories}
              target={mockTodayNutrition.calorieTarget}
              protein={{
                current: mockTodayNutrition.totalProtein,
                target: mockTodayNutrition.proteinTarget,
              }}
              carbs={{
                current: mockTodayNutrition.totalCarbs,
                target: mockTodayNutrition.carbsTarget,
              }}
              fats={{
                current: mockTodayNutrition.totalFats,
                target: mockTodayNutrition.fatsTarget,
              }}
            />
          </Animated.View>

          {/* Próximo entrenamiento */}
          <Animated.View entering={FadeInDown.delay(300).duration(350)} style={styles.section}>
            <NextWorkoutCard workout={mockTodayWorkout} />
          </Animated.View>

          {/* Actividad semanal */}
          <Animated.View entering={FadeInDown.delay(400).duration(350)} style={styles.section}>
            <WeeklyActivityMini data={mockWeeklyActivity} />
          </Animated.View>

          {/* Bottom spacer for floating tab bar */}
          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  header: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  dateText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.md,
  },
});
