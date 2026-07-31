import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft, Check, Target, Trophy, Pulse } from 'phosphor-react-native';
import { useUserStore, type UserProfile } from '@/store/useUserStore';
import { useTheme } from '@/hooks/useTheme';

type GoalType = UserProfile['goal'];
type ActivityType = UserProfile['activityLevel'];

const GOAL_OPTIONS: { key: GoalType; label: string; desc: string; icon: any }[] = [
  { key: 'weight_loss', label: 'Perder peso', desc: 'Reducir grasa manteniendo masa muscular', icon: Target },
  { key: 'muscle', label: 'Ganar músculo', desc: 'Aumentar fuerza y volumen muscular', icon: Trophy },
  { key: 'maintenance', label: 'Mantenimiento', desc: 'Mantener peso y mejorar salud general', icon: Pulse },
];

const LEVEL_OPTIONS: { key: ActivityType; label: string; desc: string }[] = [
  { key: 'light', label: 'Principiante', desc: 'Menos de 6 meses entrenando' },
  { key: 'moderate', label: 'Intermedio', desc: '6 meses a 2 años constantes' },
  { key: 'active', label: 'Avanzado', desc: 'Más de 2 años de experiencia' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { profile, updateProfile } = useUserStore((state) => state);

  const [selectedGoal, setSelectedGoal] = useState<GoalType>(profile.goal || 'muscle');
  const [selectedLevel, setSelectedLevel] = useState<ActivityType>(profile.activityLevel || 'moderate');

  const handleSave = () => {
    updateProfile({
      goal: selectedGoal,
      activityLevel: selectedLevel,
    });
    router.back();
  };

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E5E5EA' }]}
            accessibilityLabel="Volver"
          >
            <CaretLeft size={20} color={colors.foreground} />
          </Pressable>
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Objetivos y nivel</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Goal section */}
          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>OBJETIVO PRINCIPAL</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            {GOAL_OPTIONS.map((g, idx) => {
              const Icon = g.icon;
              const isSelected = selectedGoal === g.key;
              return (
                <Pressable
                  key={g.key}
                  onPress={() => setSelectedGoal(g.key)}
                  style={[
                    styles.optionRow,
                    idx < GOAL_OPTIONS.length - 1 && [styles.borderBottom, { borderBottomColor: colors.borderLight }],
                  ]}
                >
                  <View style={styles.iconWrapper}>
                    <Icon size={20} color={colors.primary} />
                  </View>
                  <View style={styles.optionText}>
                    <LabelMedium style={[styles.optionTitle, { color: colors.foreground }]}>{g.label}</LabelMedium>
                    <BodySmall style={{ color: colors.muted }}>{g.desc}</BodySmall>
                  </View>
                  {isSelected && <Check size={20} color={colors.primary} weight="bold" />}
                </Pressable>
              );
            })}
          </GlassCard>

          {/* Level section */}
          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>NIVEL DE EXPERIENCIA</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            {LEVEL_OPTIONS.map((l, idx) => {
              const isSelected = selectedLevel === l.key;
              return (
                <Pressable
                  key={l.key}
                  onPress={() => setSelectedLevel(l.key)}
                  style={[
                    styles.optionRow,
                    idx < LEVEL_OPTIONS.length - 1 && [styles.borderBottom, { borderBottomColor: colors.borderLight }],
                  ]}
                >
                  <View style={styles.optionText}>
                    <LabelMedium style={[styles.optionTitle, { color: colors.foreground }]}>{l.label}</LabelMedium>
                    <BodySmall style={{ color: colors.muted }}>{l.desc}</BodySmall>
                  </View>
                  {isSelected && <Check size={20} color={colors.primary} weight="bold" />}
                </Pressable>
              );
            })}
          </GlassCard>

          <Button title="Guardar cambios" onPress={handleSave} variant="primary" style={styles.saveButton} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
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
    marginBottom: spacing.xs,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  card: {
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
