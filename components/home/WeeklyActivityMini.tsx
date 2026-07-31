/**
 * WeeklyActivityMini — Mini gráfico de barras de actividad semanal.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, TitleSmall, Caption, LabelSmall } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';

interface DayActivity {
  day: string;
  minutes: number;
  completed: boolean;
}

interface WeeklyActivityMiniProps {
  data: DayActivity[];
}

export function WeeklyActivityMini({ data }: WeeklyActivityMiniProps) {
  const maxMinutes = Math.max(...data.map(d => d.minutes), 1);

  return (
    <Card variant="default">
      <TitleSmall style={styles.title}>Actividad semanal</TitleSmall>
      <View style={styles.barsRow}>
        {data.map((day) => {
          const barHeight = day.minutes > 0
            ? Math.max((day.minutes / maxMinutes) * 80, 8)
            : 4;

          return (
            <View key={day.day} style={styles.barColumn}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: day.completed ? colors.primary : 'rgba(255, 255, 255, 0.08)',
                    },
                    day.completed && shadows.glowPrimary,
                  ]}
                />
              </View>
              <LabelSmall
                style={[
                  styles.dayLabel,
                  day.completed && styles.dayLabelActive,
                ]}
              >
                {day.day}
              </LabelSmall>
              {day.minutes > 0 && (
                <Caption style={styles.minuteLabel}>{day.minutes}m</Caption>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    minHeight: 4,
  },
  dayLabel: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 11,
  },
  dayLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  minuteLabel: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },
});
