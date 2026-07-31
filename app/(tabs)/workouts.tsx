/**
 * Workouts — Biblioteca de ejercicios + rutinas.
 */

import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TitleLarge, TitleSmall, LabelMedium, BodySmall, Caption, Chip, Input } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { Barbell, CaretRight } from 'phosphor-react-native';
import { mockExercises } from '@/data/mock';
import type { MuscleGroup } from '@/types';

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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TitleLarge style={styles.largeTitle}>Ejercicios</TitleLarge>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Buscar ejercicio..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
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
            <Card style={styles.exerciseCard}>
              <View style={styles.exerciseRow}>
                <View style={styles.exerciseIconContainer}>
                  <Barbell size={24} color={colors.primary} />
                </View>
                <View style={styles.exerciseInfo}>
                  <LabelMedium style={styles.exerciseTitle}>{item.name}</LabelMedium>
                  <BodySmall color={colors.muted} numberOfLines={1}>
                    {item.description}
                  </BodySmall>
                  <View style={styles.exerciseTags}>
                    <Caption style={styles.tag}>
                      {MUSCLE_GROUP_LABELS[item.muscleGroup]}
                    </Caption>
                    <Caption style={styles.tagDivider}>·</Caption>
                    <Caption style={styles.tag}>
                      {DIFFICULTY_LABELS[item.difficulty]}
                    </Caption>
                    {item.equipment && (
                      <>
                        <Caption style={styles.tagDivider}>·</Caption>
                        <Caption style={styles.tag}>{item.equipment}</Caption>
                      </>
                    )}
                  </View>
                </View>
                <CaretRight size={20} color={'#C7C7CC'} />
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Apple iOS Grouped Background
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10, // iOS style search bar radius
    height: 36,
  },
  filtersWrapper: {
    // Ensures it doesn't take flex space and overlap
    flexShrink: 0, 
  },
  filtersScroll: {
    flexGrow: 0,
  },
  chipRow: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    marginRight: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 115,
  },
  exerciseCard: {
    marginBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // More pronounced rounding for Apple style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0, // Remove any subtle borders for a cleaner look
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  exerciseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: '#F2F2F7', // subtle gray behind icon
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    color: colors.primary,
    fontSize: 12, // slightly larger for readability
    fontWeight: '500',
  },
  tagDivider: {
    marginHorizontal: 4,
    color: '#8E8E93', // iOS system gray
    fontSize: 12,
  },
});
