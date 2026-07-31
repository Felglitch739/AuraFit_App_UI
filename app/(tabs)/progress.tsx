/**
 * Progress — VisionOS-style Glassmorphism & Apple Design Spatial Minimalist.
 */

import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassCard, TitleLarge, TitleSmall, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { mockWeightHistory, mockWellnessHistory } from '@/data/mock';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle, Fire, Trophy, Clock, CaretDown } from 'phosphor-react-native';
import type { MoodType } from '@/types';

export default function ProgressScreen() {
  const [expandedWellnessId, setExpandedWellnessId] = useState<string | null>(null);

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
        <Animated.View entering={FadeInDown.duration(300)}>
          <TitleLarge style={styles.pageTitle}>Progreso</TitleLarge>
          <BodySmall color={colors.muted} style={styles.subtitle}>
            Tu evolución a lo largo del tiempo
          </BodySmall>
        </Animated.View>

        {/* 1. HERO GLASS CARD — Peso corporal */}
        <Animated.View entering={FadeInDown.delay(100).duration(350)}>
          <GlassCard level="hero" style={styles.heroGlass}>
            <View style={styles.heroHeader}>
              <View style={styles.heroMainColumn}>
                <Caption style={styles.heroSubLabel}>PESO ACTUAL</Caption>
                <View style={styles.weightValueRow}>
                  <LabelMedium style={styles.weightNumber}>{latestWeight.weight}</LabelMedium>
                  <Caption style={styles.unitText}>kg</Caption>
                </View>
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
                const normalizedHeight = ((entry.weight - min) / range) * 70 + 18;

                const isLast = index === mockWeightHistory.length - 1;

                return (
                  <View key={entry.date} style={styles.chartBarColumn}>
                    <View
                      style={[
                        styles.chartBar,
                        {
                          height: normalizedHeight,
                          backgroundColor: isLast ? '#0A84FF' : 'rgba(255, 255, 255, 0.12)',
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
          </GlassCard>
        </Animated.View>

        {/* 2. UNIFIED SPATIAL GLASS SECTION — Historial de entrenamientos */}
        <Animated.View entering={FadeInDown.delay(200).duration(350)} style={styles.secondarySection}>
          <TitleSmall style={styles.sectionTitle}>Historial de entrenamientos</TitleSmall>
          <GlassCard level="subtle" padding={0} style={styles.unifiedStatBar}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(255, 159, 10, 0.16)', borderColor: 'rgba(255, 159, 10, 0.30)' }]}>
                <Fire size={16} color="#FF9F0A" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>12</LabelMedium>
              <Caption style={styles.statLabel}>Este mes</Caption>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(255, 55, 95, 0.16)', borderColor: 'rgba(255, 55, 95, 0.30)' }]}>
                <Trophy size={16} color="#FF375F" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>47</LabelMedium>
              <Caption style={styles.statLabel}>Total</Caption>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(94, 92, 230, 0.16)', borderColor: 'rgba(94, 92, 230, 0.30)' }]}>
                <Clock size={16} color="#5E5CE6" weight="fill" />
              </View>
              <LabelMedium style={styles.statValue}>38h</LabelMedium>
              <Caption style={styles.statLabel}>Tiempo total</Caption>
            </View>
          </GlassCard>
        </Animated.View>

        {/* 3. COLLAPSIBLE GLASS WELLNESS TRENDS */}
        <Animated.View entering={FadeInDown.delay(300).duration(350)} style={styles.secondarySection}>
          <TitleSmall style={styles.sectionTitle}>Tendencia de bienestar</TitleSmall>
          <View style={styles.wellnessList}>
            {mockWellnessHistory.slice(-4).reverse().map((entry) => {
              const isExpanded = expandedWellnessId === entry.id;

              return (
                <GlassCard
                  key={entry.id}
                  level="medium"
                  padding={0}
                  onPress={() => setExpandedWellnessId(isExpanded ? null : entry.id)}
                  style={styles.wellnessGlassItem}
                >
                  <View style={styles.wellnessHeaderRow}>
                    <View style={styles.dateBadge}>
                      <Caption style={styles.dateText}>{entry.date.slice(5, 10)}</Caption>
                    </View>

                    <View style={styles.quickMetricsRow}>
                      <View style={styles.miniMetricPill}>
                        <Lightning size={14} color="#FF9F0A" weight="fill" />
                        <Caption style={styles.pillText}>{entry.energy}/5</Caption>
                      </View>

                      {getMoodIcon(entry.mood, 18)}

                      <CaretDown
                        size={16}
                        color="#9898A0"
                        style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
                      />
                    </View>
                  </View>

                  {/* Expanded detail view */}
                  {isExpanded && (
                    <Animated.View entering={FadeInDown.duration(200)} style={styles.expandedDetailsContainer}>
                      <View style={styles.expandedMetric}>
                        <Moon size={16} color="#5E5CE6" weight="fill" />
                        <Caption style={{ color: '#9898A0' }}>Sueño:</Caption>
                        <LabelMedium style={styles.detailValue}>{entry.sleepHours}h</LabelMedium>
                      </View>

                      <View style={styles.expandedMetric}>
                        <Brain size={16} color="#0A84FF" weight="fill" />
                        <Caption style={{ color: '#9898A0' }}>Estrés:</Caption>
                        <LabelMedium style={styles.detailValue}>{entry.stress}/5</LabelMedium>
                      </View>
                    </Animated.View>
                  )}
                </GlassCard>
              );
            })}
          </View>
        </Animated.View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function getMoodIcon(mood: MoodType, size: number) {
  switch (mood) {
    case 'excellent':
      return <Star size={size} color="#FFD60A" weight="fill" />;
    case 'good':
      return <Smiley size={size} color="#30D158" weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={size} color="#9898A0" weight="fill" />;
    case 'sad':
      return <SmileySad size={size} color="#FF9F0A" weight="fill" />;
    case 'stressed':
      return <WarningCircle size={size} color="#FF453A" weight="fill" />;
    default:
      return <Smiley size={size} color="#9898A0" weight="fill" />;
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 180,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#F2F2F7',
  },
  subtitle: {
    marginTop: 2,
    marginBottom: spacing.lg,
    color: '#9898A0',
  },
  // HERO GLASS CARD
  heroGlass: {
    marginBottom: spacing.lg,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroMainColumn: {
    flex: 1,
    marginRight: spacing.sm,
  },
  heroSubLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#9898A0',
    marginBottom: 2,
  },
  weightValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  weightNumber: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: '#F2F2F7',
    lineHeight: 38,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9898A0',
  },
  weightChangeBadge: {
    backgroundColor: 'rgba(48, 209, 88, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(48, 209, 88, 0.22)',
  },
  weightDeltaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#30D158',
  },
  weightDeltaSub: {
    fontSize: 9,
    color: '#30D158',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 110,
    paddingTop: spacing.sm,
  },
  chartBarColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 14,
    borderRadius: 7,
  },
  chartLabel: {
    marginTop: spacing.xs,
    fontSize: 10,
    color: '#9898A0',
  },
  chartLabelActive: {
    color: '#F2F2F7',
    fontWeight: '700',
  },
  // SECONDARY SECTION
  secondarySection: {
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F2F2F7',
    marginBottom: spacing.sm,
  },
  unifiedStatBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  statIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F2F2F7',
    marginBottom: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#9898A0',
  },
  // WELLNESS LIST
  wellnessList: {
    gap: spacing.xs,
  },
  wellnessGlassItem: {
    overflow: 'hidden',
  },
  wellnessHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  dateBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F2F2F7',
  },
  quickMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniMetricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 159, 10, 0.14)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF9F0A',
  },
  expandedDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: spacing.xs,
  },
  expandedMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F2F2F7',
  },
});
