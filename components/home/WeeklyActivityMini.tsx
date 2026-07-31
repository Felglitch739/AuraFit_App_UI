import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlassCard, Caption, LabelSmall } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

interface DayActivity {
  day: string;
  minutes: number;
  completed: boolean;
}

interface WeeklyActivityMiniProps {
  data: DayActivity[];
}

export function WeeklyActivityMini({ data }: WeeklyActivityMiniProps) {
  const { colors, isDark } = useTheme();
  const maxMinutes = Math.max(...data.map(d => d.minutes), 1);

  return (
    <GlassCard level="medium" style={styles.cardContainer}>
      <Text style={[styles.sectionHeader, { color: colors.muted }]}>ACTIVIDAD SEMANAL</Text>

      <View style={styles.barsRow}>
        {data.map((day) => {
          const barHeight = day.minutes > 0
            ? Math.max((day.minutes / maxMinutes) * 72, 10)
            : 4;

          return (
            <View key={day.day} style={styles.barColumn}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: day.completed
                        ? colors.primary
                        : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : '#E5E5EA',
                    },
                  ]}
                />
              </View>
              <LabelSmall
                style={[
                  styles.dayLabel,
                  { color: day.completed ? colors.foreground : colors.muted },
                  day.completed && styles.dayLabelActive,
                ]}
              >
                {day.day}
              </LabelSmall>
              {day.minutes > 0 ? (
                <Caption style={[styles.minuteLabel, { color: colors.primary }]}>{day.minutes}m</Caption>
              ) : (
                <Caption style={[styles.minuteLabelMuted, { color: colors.subtle }]}>-</Caption>
              )}
            </View>
          );
        })}
      </View>
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
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 115,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  bar: {
    width: 14,
    borderRadius: 7,
    minHeight: 4,
  },
  dayLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
  },
  dayLabelActive: {
    fontWeight: '800',
  },
  minuteLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  minuteLabelMuted: {
    fontSize: 10,
    marginTop: 2,
  },
});
