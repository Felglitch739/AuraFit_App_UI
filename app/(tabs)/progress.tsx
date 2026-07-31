/**
 * Progress — Gráficas de peso, historial de entrenamientos, tendencias.
 */

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TitleLarge, TitleSmall, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { mockWeightHistory, mockWellnessHistory } from '@/data/mock';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle, Fire, Trophy, Clock } from 'phosphor-react-native';
import type { MoodType } from '@/types';

export default function ProgressScreen() {
  const latestWeight = mockWeightHistory[mockWeightHistory.length - 1];
  const firstWeight = mockWeightHistory[0];
  const weightChange = latestWeight.weight - firstWeight.weight;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TitleLarge style={styles.pageTitle}>Progreso</TitleLarge>
        <BodySmall color={colors.muted} style={styles.subtitle}>
          Tu evolución a lo largo del tiempo
        </BodySmall>

        {/* 1. HERO DOMINANT CARD — Peso corporal */}
        <Card variant="elevated" style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Caption style={styles.heroSubLabel}>PESO ACTUAL</Caption>
              <LabelMedium style={styles.weightNumber}>
                {latestWeight.weight} <Caption style={styles.unitText}>kg</Caption>
              </LabelMedium>
            </View>
            <View style={styles.weightChangeBadge}>
              <LabelMedium style={styles.weightDeltaText}>
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
              </LabelMedium>
              <Caption style={styles.weightDeltaSub}>vs inicio</Caption>
            </View>
          </View>

          {/* High impact weight curve chart */}
          <View style={styles.chartContainer}>
            {mockWeightHistory.map((entry, index) => {
              const min = Math.min(...mockWeightHistory.map((e) => e.weight));
              const max = Math.max(...mockWeightHistory.map((e) => e.weight));
              const range = max - min || 1;
              const normalizedHeight = ((entry.weight - min) / range) * 70 + 25;

              const isLast = index === mockWeightHistory.length - 1;

              return (
                <View key={entry.date} style={styles.chartBarColumn}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: normalizedHeight,
                        backgroundColor: isLast ? '#007AFF' : 'rgba(0, 122, 255, 0.25)',
                      },
                    ]}
                  />
                  <Caption style={[styles.chartLabel, isLast && styles.chartLabelActive]}>
                    {entry.date.slice(5, 10)}
                  </Caption>
                </View>
              );
            })}
          </View>
        </Card>

        {/* 2. FRAMELESS SECONDARY SECTION — Historial de entrenamientos */}
        <View style={styles.secondarySection}>
          <TitleSmall style={styles.sectionTitle}>Historial de entrenamientos</TitleSmall>
          <View style={styles.statRow}>
            <View style={styles.statBoxOrganic}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(255, 149, 0, 0.12)' }]}>
                <Fire size={18} color="#FF9500" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>12</LabelMedium>
              <Caption color={colors.muted}>Este mes</Caption>
            </View>

            <View style={styles.statBoxOrganic}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(255, 45, 85, 0.12)' }]}>
                <Trophy size={18} color="#FF2D55" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>47</LabelMedium>
              <Caption color={colors.muted}>Total</Caption>
            </View>

            <View style={styles.statBoxOrganic}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(88, 86, 214, 0.12)' }]}>
                <Clock size={18} color="#5856D6" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>38h</LabelMedium>
              <Caption color={colors.muted}>Tiempo total</Caption>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 3. FRAMELESS ORGANIC SECTION — Tendencia de bienestar */}
        <View style={styles.secondarySection}>
          <TitleSmall style={styles.sectionTitle}>Tendencia de bienestar</TitleSmall>
          <View style={styles.organicWellnessList}>
            {mockWellnessHistory.slice(-4).reverse().map((entry) => (
              <View key={entry.id} style={styles.organicWellnessCard}>
                <View style={styles.organicDateBadge}>
                  <Caption style={styles.organicDateText}>{entry.date.slice(5, 10)}</Caption>
                </View>
                <View style={styles.organicMetricsContainer}>
                  <View style={styles.organicBadge}>
                    <Lightning size={16} color="#FF9500" weight="fill" />
                    <Caption style={styles.badgeText}>{entry.energy}/5</Caption>
                  </View>

                  <View style={styles.organicBadge}>
                    <Moon size={16} color="#5856D6" weight="fill" />
                    <Caption style={styles.badgeText}>{entry.sleepHours}h</Caption>
                  </View>

                  <View style={styles.organicBadge}>
                    <Brain size={16} color="#007AFF" weight="fill" />
                    <Caption style={styles.badgeText}>{entry.stress}/5</Caption>
                  </View>

                  <View style={styles.moodBadgeContainer}>
                    {getMoodIcon(entry.mood, 18)}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getMoodIcon(mood: MoodType, size: number) {
  switch (mood) {
    case 'excellent':
      return <Star size={size} color="#FFCC00" weight="fill" />;
    case 'good':
      return <Smiley size={size} color="#34C759" weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={size} color="#8E8E93" weight="fill" />;
    case 'sad':
      return <SmileySad size={size} color="#FF9500" weight="fill" />;
    case 'stressed':
      return <WarningCircle size={size} color="#FF3B30" weight="fill" />;
    default:
      return <Smiley size={size} color="#8E8E93" weight="fill" />;
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 150,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  subtitle: {
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  // HERO CARD
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 0,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  heroSubLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#8E8E93',
    marginBottom: 2,
  },
  weightNumber: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    color: colors.text,
  },
  unitText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.muted,
  },
  weightChangeBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'flex-end',
  },
  weightDeltaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#34C759',
  },
  weightDeltaSub: {
    fontSize: 10,
    color: '#34C759',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: spacing.md,
  },
  chartBarColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    borderRadius: 10,
  },
  chartLabel: {
    marginTop: spacing.xs,
    fontSize: 10,
    color: '#8E8E93',
  },
  chartLabelActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
  // SECONDARY FRAMELESS SECTIONS
  secondarySection: {
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statBoxOrganic: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  // ORGANIC WELLNESS TRENDS
  organicWellnessList: {
    gap: spacing.sm,
  },
  organicWellnessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organicDateBadge: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  organicDateText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
  },
  organicMetricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  moodBadgeContainer: {
    marginLeft: 4,
  },
});
