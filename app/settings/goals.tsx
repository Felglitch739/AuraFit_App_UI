import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { CaretLeft, Check, Target, Trophy, Pulse } from 'phosphor-react-native';
import { useUserStore } from '@/store/useUserStore';
import type { PrimaryGoal, FitnessLevel } from '@/types';

const GOAL_OPTIONS: { key: PrimaryGoal; label: string; desc: string; icon: any }[] = [
  { key: 'lose_weight', label: 'Perder peso', desc: 'Reducir grasa manteniendo masa muscular', icon: Target },
  { key: 'build_muscle', label: 'Ganar músculo', desc: 'Aumentar fuerza y volumen muscular', icon: Trophy },
  { key: 'maintain', label: 'Mantenimiento', desc: 'Mantener peso y mejorar salud general', icon: Pulse },
];

const LEVEL_OPTIONS: { key: FitnessLevel; label: string; desc: string }[] = [
  { key: 'beginner', label: 'Principiante', desc: 'Menos de 6 meses entrenando' },
  { key: 'intermediate', label: 'Intermedio', desc: '6 meses a 2 años constantes' },
  { key: 'advanced', label: 'Avanzado', desc: 'Más de 2 años de experiencia' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { profile, setProfile } = useUserStore((state) => state);

  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal>(profile.primaryGoal || 'build_muscle');
  const [selectedLevel, setSelectedLevel] = useState<FitnessLevel>(profile.fitnessLevel || 'intermediate');

  const handleSave = () => {
    setProfile({
      primaryGoal: selectedGoal,
      fitnessLevel: selectedLevel,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Button
          title=""
          variant="outline"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <CaretLeft size={22} color={colors.text} />
        </Button>
        <TitleSmall style={styles.headerTitle}>Objetivos y nivel</TitleSmall>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Goal section */}
        <Caption style={styles.sectionHeading}>OBJETIVO PRINCIPAL</Caption>
        <Card style={styles.card} padding={0}>
          {GOAL_OPTIONS.map((g, idx) => {
            const Icon = g.icon;
            const isSelected = selectedGoal === g.key;
            return (
              <Pressable
                key={g.key}
                onPress={() => setSelectedGoal(g.key)}
                style={[
                  styles.optionRow,
                  idx < GOAL_OPTIONS.length - 1 && styles.borderBottom,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <Icon size={20} color={colors.primary} />
                </View>
                <View style={styles.optionText}>
                  <LabelMedium style={styles.optionTitle}>{g.label}</LabelMedium>
                  <BodySmall color={colors.muted}>{g.desc}</BodySmall>
                </View>
                {isSelected && <Check size={20} color={colors.primary} weight="bold" />}
              </Pressable>
            );
          })}
        </Card>

        {/* Level section */}
        <Caption style={styles.sectionHeading}>NIVEL DE EXPERIENCIA</Caption>
        <Card style={styles.card} padding={0}>
          {LEVEL_OPTIONS.map((l, idx) => {
            const isSelected = selectedLevel === l.key;
            return (
              <Pressable
                key={l.key}
                onPress={() => setSelectedLevel(l.key)}
                style={[
                  styles.optionRow,
                  idx < LEVEL_OPTIONS.length - 1 && styles.borderBottom,
                ]}
              >
                <View style={styles.optionText}>
                  <LabelMedium style={styles.optionTitle}>{l.label}</LabelMedium>
                  <BodySmall color={colors.muted}>{l.desc}</BodySmall>
                </View>
                {isSelected && <Check size={20} color={colors.primary} weight="bold" />}
              </Pressable>
            );
          })}
        </Card>

        <Button title="Guardar cambios" onPress={handleSave} variant="primary" style={styles.saveButton} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  iconWrapper: {
    width: 32,
    marginRight: spacing.sm,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
