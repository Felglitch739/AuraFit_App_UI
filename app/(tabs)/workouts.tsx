/**
 * Workouts — Biblioteca de ejercicios + rutinas (con soporte dinámico para Modo Claro y Modo Oscuro).
 */

import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeshBackground, GlassCard, LabelMedium, BodySmall, Caption, Chip, Input } from '@/components/ui';
import { spacing, radius } from '@/constants/theme';
import { Barbell, CaretRight } from 'phosphor-react-native';
import { mockExercises } from '@/data/mock';
import type { MuscleGroup } from '@/types';
import { useTheme } from '@/hooks/useTheme';

const MUSCLE_GROUPS: { key: MuscleGroup | 'all'; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'chest', label: 'Pecho' },
  { key: 'back', label: 'Espalda' },
  { key: 'shoulders', label: 'Hombros' },
  { key: 'legs', label: 'Piernas' },
  { key: 'biceps', label: 'Bíceps' },
  { key: 'triceps', label: 'Tríceps' },
  { key: 'glutes', label: 'Glúteos' },
  { key: 'abs', label: 'Abdomen' },
];

const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  shoulders: 'Hombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  legs: 'Piernas',
  glutes: 'Glúteos',
  abs: 'Abdomen',
  cardio: 'Cardio',
  full_body: 'Cuerpo completo',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export default function WorkoutsScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | 'all'>('all');

  const filteredExercises = useMemo(() => {
    return mockExercises.filter((ex) => {
      const matchesSearch = searchQuery === '' ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [searchQuery, selectedGroup]);

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.largeTitle, { color: colors.foreground }]}>Ejercicios</Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Input
              placeholder="Buscar ejercicio..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[
                styles.searchInput,
                {
                  backgroundColor: isDark ? '#14141A' : '#FFFFFF',
                  borderColor: colors.borderLight,
                },
              ]}
            />
          </View>

          {/* Muscle group filters */}
          <View style={styles.filtersWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersScroll}
              contentContainerStyle={styles.chipRow}
            >
              {MUSCLE_GROUPS.map((group) => (
                <Chip
                  key={group.key}
                  label={group.label}
                  selected={selectedGroup === group.key}
                  onPress={() => setSelectedGroup(group.key)}
                  style={styles.chip}
                />
              ))}
            </ScrollView>
          </View>

          {/* Exercise list */}
          <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <GlassCard level="medium" style={styles.exerciseCard}>
                <View style={styles.exerciseRow}>
                  <View style={[styles.exerciseIconContainer, { backgroundColor: isDark ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 122, 255, 0.08)' }]}>
                    <Barbell size={22} color={colors.primary} weight="fill" />
                  </View>
                  <View style={styles.exerciseInfo}>
                    <LabelMedium style={[styles.exerciseTitle, { color: colors.foreground }]}>{item.name}</LabelMedium>
                    <BodySmall color={colors.muted} numberOfLines={1}>
                      {item.description}
                    </BodySmall>
                    <View style={styles.exerciseTags}>
                      <Caption style={[styles.tag, { color: colors.primary }]}>
                        {MUSCLE_GROUP_LABELS[item.muscleGroup]}
                      </Caption>
                      <Caption style={[styles.tagDivider, { color: colors.muted }]}>·</Caption>
                      <Caption style={[styles.tag, { color: colors.muted }]}>
                        {DIFFICULTY_LABELS[item.difficulty]}
                      </Caption>
                      {item.equipment && (
                        <>
                          <Caption style={[styles.tagDivider, { color: colors.muted }]}>·</Caption>
                          <Caption style={[styles.tag, { color: colors.muted }]}>{item.equipment}</Caption>
                        </>
                      )}
                    </View>
                  </View>
                  <CaretRight size={20} color={colors.muted} />
                </View>
              </GlassCard>
            )}
          />
        </View>
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  searchInput: {
    borderRadius: 12,
    height: 42,
  },
  filtersWrapper: {
    flexShrink: 0, 
  },
  filtersScroll: {
    flexGrow: 0,
  },
  chipRow: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
    gap: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 115,
  },
  exerciseCard: {
    marginBottom: spacing.sm,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagDivider: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
