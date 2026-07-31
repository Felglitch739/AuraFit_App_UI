/**
 * Home / Dashboard — Pantalla principal de AuraFit.
 *
 * Muestra:
 * - Saludo personalizado + fecha
 * - Wellness Check-in
 * - Resumen de calorías (anillo) + macros
 * - Card de próximo entrenamiento
 * - Mini-gráfico de actividad semanal
 */

import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, BodyMedium } from '@/components/ui';
import { WellnessCheckin } from '@/components/home/WellnessCheckin';
import { CalorieSummary } from '@/components/home/CalorieSummary';
import { NextWorkoutCard } from '@/components/home/NextWorkoutCard';
import { WeeklyActivityMini } from '@/components/home/WeeklyActivityMini';
import { colors, spacing } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import {
  mockTodayNutrition,
  mockTodayWorkout,
  mockWeeklyActivity,
} from '@/data/mock';

export default function HomeScreen() {
  const router = useRouter();
  const { profile, wellness } = useUserStore((state) => state);
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (wellness.lastCheckinDate !== todayStr) {
      // Small timeout to ensure navigation completes without warning during render
      setTimeout(() => {
        router.push('/checkin');
      }, 100);
    }
  }, [wellness.lastCheckinDate]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header — Saludo + Fecha */}
        <View style={styles.header}>
          <TitleLarge style={styles.greetingTitle}>Hola, {profile.name || 'User'}</TitleLarge>
          <BodyMedium color={colors.muted} style={styles.dateText}>
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </BodyMedium>
        </View>

        {/* Wellness Check-in */}
        <View style={styles.section}>
          <WellnessCheckin 
            checkin={wellness} 
            onPress={() => router.push('/checkin')}
          />
        </View>

        {/* Resumen de Calorías + Macros */}
        <View style={styles.section}>
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
        </View>

        {/* Próximo entrenamiento */}
        <View style={styles.section}>
          <NextWorkoutCard workout={mockTodayWorkout} />
        </View>

        {/* Actividad semanal */}
        <View style={styles.section}>
          <WeeklyActivityMini data={mockWeeklyActivity} />
        </View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 115,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  dateText: {
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.md,
  },
});
