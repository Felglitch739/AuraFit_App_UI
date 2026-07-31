/**
 * CalorieSummary — Anillo de calorías principal + mini-anillos de macros.
 * El elemento visual central del Dashboard (estilo Apple Fitness).
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, ProgressRing, TitleSmall, DisplayMedium, BodySmall, Caption, LabelMedium } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';

interface CalorieSummaryProps {
  consumed: number;
  target: number;
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fats: { current: number; target: number };
}

export function CalorieSummary({
  consumed,
  target,
  protein,
  carbs,
  fats,
}: CalorieSummaryProps) {
  const calorieProgress = Math.min(consumed / target, 1);
  const remaining = Math.max(target - consumed, 0);

  return (
    <Card variant="default">
      <TitleSmall style={styles.title}>Calorías de hoy</TitleSmall>

      <View style={styles.mainRow}>
        {/* Anillo principal de calorías con gradiente Electric Dark */}
        <ProgressRing
          progress={calorieProgress}
          size={140}
          strokeWidth={14}
          gradientColors={['#0A84FF', '#5E5CE6']}
        >
          <DisplayMedium style={styles.calorieNumber}>
            {consumed.toLocaleString()}
          </DisplayMedium>
          <Caption style={styles.targetCaption}>de {target.toLocaleString()} kcal</Caption>
        </ProgressRing>

        {/* Mini-anillos de macros */}
        <View style={styles.macrosColumn}>
          <MacroRing
            label="Proteína"
            current={protein.current}
            target={protein.target}
            gradientColors={['#FF375F', '#FF453A']}
            unit="g"
          />
          <MacroRing
            label="Carbos"
            current={carbs.current}
            target={carbs.target}
            gradientColors={['#FFD60A', '#FF9F0A']}
            unit="g"
          />
          <MacroRing
            label="Grasas"
            current={fats.current}
            target={fats.target}
            gradientColors={['#30D158', '#64D2FF']}
            unit="g"
          />
        </View>
      </View>

      <View style={styles.remainingRow}>
        <BodySmall color={colors.muted}>
          Faltan <BodySmall style={styles.boldRemaining}>{remaining.toLocaleString()}</BodySmall> kcal
        </BodySmall>
      </View>
    </Card>
  );
}

function MacroRing({
  label,
  current,
  target,
  gradientColors,
  unit,
}: {
  label: string;
  current: number;
  target: number;
  gradientColors: [string, string];
  unit: string;
}) {
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.macroItem}>
      <ProgressRing
        progress={progress}
        size={46}
        strokeWidth={5}
        gradientColors={gradientColors}
      >
        <Caption style={{ fontSize: 9, fontWeight: '800', color: '#FFFFFF' }}>{Math.round(current)}</Caption>
      </ProgressRing>
      <View style={styles.macroTextColumn}>
        <Caption color={colors.muted}>{label}</Caption>
        <LabelMedium style={styles.macroValue}>
          {Math.round(current)}/{target}{unit}
        </LabelMedium>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macrosColumn: {
    flex: 1,
    marginLeft: spacing.lg,
    gap: spacing.sm,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  macroTextColumn: {
    flex: 1,
  },
  macroValue: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: '#FFFFFF',
  },
  calorieNumber: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: '#FFFFFF',
  },
  targetCaption: {
    fontSize: 11,
    marginTop: 2,
    color: colors.muted,
  },
  remainingRow: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  boldRemaining: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

