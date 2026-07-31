/**
 * NextWorkoutCard — Muestra el próximo entrenamiento con CTA "Iniciar".
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PressableCard, TitleSmall, LabelMedium, BodySmall, Caption, Button } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { Barbell } from 'phosphor-react-native';
import type { Workout } from '@/types';

interface NextWorkoutCardProps {
  workout: Workout;
  onStart?: () => void;
}

export function NextWorkoutCard({ workout, onStart }: NextWorkoutCardProps) {
  const exerciseCount = workout.exercises.length;
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <PressableCard variant="elevated" onPress={onStart || (() => {})}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Barbell size={24} color={colors.primary} />
        </View>
        <View style={styles.headerText}>
          <TitleSmall style={{ fontWeight: '700' }}>{workout.name}</TitleSmall>
          <BodySmall color={colors.muted}>
            {exerciseCount} ejercicios · {totalSets} series
          </BodySmall>
        </View>
      </View>

      {/* Ejercicios preview */}
      <View style={styles.exerciseList}>
        {workout.exercises.slice(0, 3).map((ex, index) => (
          <View key={ex.exercise.id} style={styles.exerciseRow}>
            <Caption style={styles.exerciseNumber}>{index + 1}</Caption>
            <LabelMedium style={styles.exerciseName}>{ex.exercise.name}</LabelMedium>
            <Caption style={{ fontWeight: '600' }}>{ex.sets.length}×{ex.sets[0]?.reps}</Caption>
          </View>
        ))}
      </View>

      <Button
        title="Iniciar entrenamiento"
        onPress={onStart || (() => {})}
        variant="primary"
        size="md"
        style={styles.startButton}
        accessibilityLabel="Iniciar entrenamiento"
      />
    </PressableCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  exerciseList: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  exerciseNumber: {
    width: 20,
    textAlign: 'center',
    color: colors.muted,
  },
  exerciseName: {
    flex: 1,
    fontSize: 13,
  },
  startButton: {
    marginTop: spacing.xs,
  },
});
