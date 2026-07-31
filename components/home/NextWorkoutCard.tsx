import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlassCard, TitleSmall, LabelMedium, Caption, Button } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { Barbell, Play, Clock, Barbell as Dumbbell } from 'phosphor-react-native';
import type { Workout } from '@/types';
import { useTheme } from '@/hooks/useTheme';

interface NextWorkoutCardProps {
  workout: Workout;
  onStart?: () => void;
}

export function NextWorkoutCard({ workout, onStart }: NextWorkoutCardProps) {
  const { colors, isDark } = useTheme();
  const exerciseCount = workout.exercises.length;
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <GlassCard
      level="hero"
      onPress={onStart}
      style={[
        styles.cardContainer,
        { borderColor: isDark ? 'rgba(10, 132, 255, 0.25)' : colors.borderLight },
      ]}
    >
      <Text style={[styles.sectionHeader, { color: colors.muted }]}>PRÓXIMO ENTRENAMIENTO</Text>

      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isDark ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 122, 255, 0.08)',
              borderColor: isDark ? 'rgba(10, 132, 255, 0.28)' : 'rgba(0, 122, 255, 0.18)',
            },
          ]}
        >
          <Barbell size={22} color={colors.primary} weight="fill" />
        </View>
        <View style={styles.headerText}>
          <TitleSmall style={[styles.titleText, { color: colors.foreground }]}>{workout.name}</TitleSmall>
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Dumbbell size={12} color={colors.muted} />
              <Caption style={[styles.metaText, { color: colors.muted }]}>{exerciseCount} ejercicios</Caption>
            </View>
            <View style={styles.metaBadge}>
              <Clock size={12} color={colors.muted} />
              <Caption style={[styles.metaText, { color: colors.muted }]}>{totalSets} series</Caption>
            </View>
          </View>
        </View>
      </View>

      {/* Ejercicios preview */}
      <View style={styles.exerciseList}>
        {workout.exercises.slice(0, 3).map((ex, index) => (
          <View
            key={ex.exercise.id}
            style={[
              styles.exerciseRow,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#F9F9FB',
                borderColor: colors.borderLight,
              },
            ]}
          >
            <View style={[styles.indexPill, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#E5E5EA' }]}>
              <Caption style={[styles.exerciseNumber, { color: colors.muted }]}>{index + 1}</Caption>
            </View>
            <LabelMedium style={[styles.exerciseName, { color: colors.foreground }]} numberOfLines={1}>
              {ex.exercise.name}
            </LabelMedium>
            <View style={[styles.repsPill, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#E5E5EA' }]}>
              <Caption style={[styles.exerciseReps, { color: colors.primary }]}>
                {ex.sets.length}×{ex.sets[0]?.reps}
              </Caption>
            </View>
          </View>
        ))}
      </View>

      <Button
        title="Iniciar rutina"
        onPress={onStart || (() => {})}
        variant="primary"
        size="md"
        icon={<Play size={16} color={colors.onPrimary} weight="fill" />}
        style={styles.startButton}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: spacing.md,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  exerciseList: {
    marginBottom: spacing.md,
    gap: 6,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  indexPill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseNumber: {
    fontSize: 10,
    fontWeight: '800',
  },
  exerciseName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
  },
  repsPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  exerciseReps: {
    fontSize: 11,
    fontWeight: '700',
  },
  startButton: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
