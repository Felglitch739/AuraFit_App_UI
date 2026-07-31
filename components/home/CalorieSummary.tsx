import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlassCard, ProgressRing, DisplayMedium, Caption, LabelMedium } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

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
  const { colors, isDark } = useTheme();
  const calorieProgress = Math.min(consumed / target, 1);
  const remaining = Math.max(target - consumed, 0);

  return (
    <GlassCard level="hero" style={styles.container}>
      <Text style={[styles.sectionHeader, { color: colors.muted }]}>NUTRICIÓN DE HOY</Text>

      <View style={styles.mainRow}>
        {/* Anillo de Calorías */}
        <View style={styles.ringContainer}>
          <ProgressRing
            progress={calorieProgress}
            size={146}
            strokeWidth={14}
            gradientColors={isDark ? ['#0A84FF', '#5E5CE6'] : ['#007AFF', '#5AC8FA']}
          >
            <DisplayMedium style={[styles.calorieNumber, { color: colors.foreground }]}>
              {consumed.toLocaleString()}
            </DisplayMedium>
            <Caption style={[styles.targetCaption, { color: colors.muted }]}>/ {target.toLocaleString()} kcal</Caption>
          </ProgressRing>
        </View>

        {/* Mini-anillos/desglose de macros */}
        <View style={styles.macrosColumn}>
          <MacroBar
            label="Proteína"
            current={protein.current}
            target={protein.target}
            color={colors.protein}
            unit="g"
          />
          <MacroBar
            label="Carbohidratos"
            current={carbs.current}
            target={carbs.target}
            color={colors.carbs}
            unit="g"
          />
          <MacroBar
            label="Grasas"
            current={fats.current}
            target={fats.target}
            color={colors.fats}
            unit="g"
          />
        </View>
      </View>

      <View style={[styles.footerRow, { borderTopColor: colors.borderLight }]}>
        <View
          style={[
            styles.remainingPill,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F2F2F7',
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.remainingText, { color: colors.muted }]}>
            Restantes: <Text style={[styles.remainingValue, { color: colors.primary }]}>{remaining.toLocaleString()} kcal</Text>
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

function MacroBar({
  label,
  current,
  target,
  color,
  unit,
}: {
  label: string;
  current: number;
  target: number;
  color: string;
  unit: string;
}) {
  const { colors, isDark } = useTheme();
  const ratio = Math.min(current / target, 1);

  return (
    <View style={styles.macroItem}>
      <View style={styles.macroHeader}>
        <View style={styles.macroTitleRow}>
          <View style={[styles.macroDot, { backgroundColor: color }]} />
          <Caption style={[styles.macroLabel, { color: colors.muted }]}>{label}</Caption>
        </View>
        <LabelMedium style={[styles.macroValue, { color: colors.foreground }]}>
          {Math.round(current)}<Text style={[styles.macroTarget, { color: colors.muted }]}>/{target}{unit}</Text>
        </LabelMedium>
      </View>

      {/* Progress Bar Container */}
      <View style={[styles.track, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#E5E5EA' }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.round(ratio * 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calorieNumber: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 36,
  },
  targetCaption: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  macrosColumn: {
    flex: 1,
    marginLeft: spacing.lg,
    gap: spacing.sm,
  },
  macroItem: {
    gap: 4,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  macroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  macroValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  macroTarget: {
    fontWeight: '500',
    fontSize: 11,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  footerRow: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
  },
  remainingPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  remainingText: {
    fontSize: 12,
    fontWeight: '500',
  },
  remainingValue: {
    fontWeight: '800',
  },
});
