import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MeshBackground, GlassCard, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { mockWeightHistory, mockWellnessHistory } from '@/data/mock';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle, Fire, Trophy, Clock, CaretDown, TrendDown, TrendUp } from 'phosphor-react-native';
import type { MoodType } from '@/types';
import { useTheme } from '@/hooks/useTheme';

export default function ProgressScreen() {
  const { colors, isDark } = useTheme();
  const [expandedWellnessId, setExpandedWellnessId] = useState<string | null>(null);

  const latestWeight = mockWeightHistory[mockWeightHistory.length - 1];
  const firstWeight = mockWeightHistory[0];
  const weightChange = latestWeight.weight - firstWeight.weight;
  const isLoss = weightChange <= 0;

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(350)} style={styles.header}>
            <Text style={[styles.pageTitle, { color: colors.foreground }]}>Progreso</Text>
            <BodySmall style={{ color: colors.muted, marginTop: 4 }}>
              Tu evolución a lo largo del tiempo
            </BodySmall>
          </Animated.View>

          {/* 1. HERO GLASS CARD — Peso corporal */}
          <Animated.View entering={FadeInDown.delay(100).duration(350)}>
            <GlassCard level="hero" style={styles.heroGlass}>
              <Text style={[styles.sectionHeader, { color: colors.muted }]}>PESO ACTUAL</Text>

              <View style={styles.heroHeader}>
                <View style={styles.weightValueRow}>
                  <Text style={[styles.weightNumber, { color: colors.foreground }]}>{latestWeight.weight}</Text>
                  <Text style={[styles.unitText, { color: colors.muted }]}>kg</Text>
                </View>

                <View
                  style={[
                    styles.weightChangeBadge,
                    {
                      backgroundColor: isLoss
                        ? isDark ? 'rgba(48, 209, 88, 0.14)' : 'rgba(52, 199, 89, 0.12)'
                        : isDark ? 'rgba(255, 159, 10, 0.14)' : 'rgba(255, 149, 0, 0.12)',
                      borderColor: isLoss ? colors.success : colors.warning,
                    },
                  ]}
                >
                  {isLoss ? (
                    <TrendDown size={14} color={colors.success} weight="bold" />
                  ) : (
                    <TrendUp size={14} color={colors.warning} weight="bold" />
                  )}
                  <Text style={[styles.weightDeltaText, { color: isLoss ? colors.success : colors.warning }]}>
                    {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                  </Text>
                  <Text style={[styles.weightDeltaSub, { color: colors.muted }]}>vs inicio</Text>
                </View>
              </View>

              {/* Bar graph */}
              <View style={styles.chartContainer}>
                {mockWeightHistory.map((entry, index) => {
                  const min = Math.min(...mockWeightHistory.map((e) => e.weight));
                  const max = Math.max(...mockWeightHistory.map((e) => e.weight));
                  const range = max - min || 1;
                  const normalizedHeight = ((entry.weight - min) / range) * 65 + 20;
                  const isLast = index === mockWeightHistory.length - 1;

                  return (
                    <View key={entry.date} style={styles.chartBarColumn}>
                      <View style={styles.barWrapper}>
                        <View
                          style={[
                            styles.chartBar,
                            {
                              height: normalizedHeight,
                              backgroundColor: isLast ? colors.primary : isDark ? 'rgba(255, 255, 255, 0.10)' : '#E5E5EA',
                            },
                          ]}
                        />
                      </View>
                      <Caption style={[styles.chartLabel, { color: isLast ? colors.primary : colors.muted }]}>
                        {entry.date.slice(5, 10)}
                      </Caption>
                    </View>
                  );
                })}
              </View>
            </GlassCard>
          </Animated.View>

          {/* 2. MODULAR GRID — Historial de entrenamientos */}
          <Animated.View entering={FadeInDown.delay(200).duration(350)} style={styles.secondarySection}>
            <Text style={[styles.sectionTitleHeader, { color: colors.muted }]}>HISTORIAL DE ENTRENAMIENTOS</Text>
            
            <View style={styles.statsGridRow}>
              {/* Stat 1: Este mes */}
              <GlassCard level="medium" style={styles.statTile}>
                <View style={[styles.statIconBadge, { backgroundColor: isDark ? 'rgba(255, 159, 10, 0.14)' : 'rgba(255, 149, 0, 0.10)', borderColor: colors.orange }]}>
                  <Fire size={20} color={colors.orange} weight="fill" />
                </View>
                <Text style={[styles.statTileValue, { color: colors.foreground }]}>12</Text>
                <Caption style={[styles.statTileLabel, { color: colors.muted }]} numberOfLines={1}>
                  Este mes
                </Caption>
              </GlassCard>

              {/* Stat 2: Total */}
              <GlassCard level="medium" style={styles.statTile}>
                <View style={[styles.statIconBadge, { backgroundColor: isDark ? 'rgba(94, 92, 230, 0.14)' : 'rgba(88, 86, 214, 0.10)', borderColor: colors.purple }]}>
                  <Trophy size={20} color={colors.purple} weight="fill" />
                </View>
                <Text style={[styles.statTileValue, { color: colors.foreground }]}>47</Text>
                <Caption style={[styles.statTileLabel, { color: colors.muted }]} numberOfLines={1}>
                  Total
                </Caption>
              </GlassCard>

              {/* Stat 3: Tiempo total */}
              <GlassCard level="medium" style={styles.statTile}>
                <View style={[styles.statIconBadge, { backgroundColor: isDark ? 'rgba(10, 132, 255, 0.14)' : 'rgba(0, 122, 255, 0.10)', borderColor: colors.primary }]}>
                  <Clock size={20} color={colors.primary} weight="fill" />
                </View>
                <Text style={[styles.statTileValue, { color: colors.foreground }]}>38h</Text>
                <Caption style={[styles.statTileLabel, { color: colors.muted }]} numberOfLines={1}>
                  Tiempo total
                </Caption>
              </GlassCard>
            </View>
          </Animated.View>

          {/* 3. TENDENCIA DE BIENESTAR */}
          <Animated.View entering={FadeInDown.delay(300).duration(350)} style={styles.secondarySection}>
            <Text style={[styles.sectionTitleHeader, { color: colors.muted }]}>TENDENCIA DE BIENESTAR</Text>
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
                      <View style={[styles.dateBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F2F2F7', borderColor: colors.borderLight }]}>
                        <Text style={[styles.dateText, { color: colors.foreground }]}>{entry.date.slice(5, 10)}</Text>
                      </View>

                      <View style={styles.quickMetricsRow}>
                        <View style={[styles.miniMetricPill, { backgroundColor: isDark ? 'rgba(255, 159, 10, 0.14)' : 'rgba(255, 149, 0, 0.10)', borderColor: colors.orange }]}>
                          <Lightning size={14} color={colors.orange} weight="fill" />
                          <Text style={[styles.pillText, { color: colors.orange }]}>{entry.energy}/5</Text>
                        </View>

                        <View style={styles.moodPill}>
                          {getMoodIcon(entry.mood, 16, colors)}
                        </View>

                        <CaretDown
                          size={16}
                          color={colors.muted}
                          style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
                        />
                      </View>
                    </View>

                    {/* Expanded detail view */}
                    {isExpanded && (
                      <Animated.View entering={FadeInDown.duration(200)} style={[styles.expandedDetailsContainer, { borderTopColor: colors.borderLight }]}>
                        <View style={styles.expandedMetric}>
                          <View style={[styles.detailIconBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F2F2F7' }]}>
                            <Moon size={14} color={colors.purple} weight="fill" />
                          </View>
                          <Caption style={{ color: colors.muted }}>Sueño:</Caption>
                          <LabelMedium style={{ color: colors.foreground, fontWeight: '800' }}>{entry.sleepHours}h</LabelMedium>
                        </View>

                        <View style={styles.expandedMetric}>
                          <View style={[styles.detailIconBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F2F2F7' }]}>
                            <Brain size={14} color={colors.primary} weight="fill" />
                          </View>
                          <Caption style={{ color: colors.muted }}>Estrés:</Caption>
                          <LabelMedium style={{ color: colors.foreground, fontWeight: '800' }}>{entry.stress}/5</LabelMedium>
                        </View>
                      </Animated.View>
                    )}
                  </GlassCard>
                );
              })}
            </View>
          </Animated.View>
          
          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

function getMoodIcon(mood: MoodType, size: number, colors: any) {
  switch (mood) {
    case 'excellent':
      return <Star size={size} color={colors.accent} weight="fill" />;
    case 'good':
      return <Smiley size={size} color={colors.success} weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={size} color={colors.muted} weight="fill" />;
    case 'sad':
      return <SmileySad size={size} color={colors.warning} weight="fill" />;
    case 'stressed':
      return <WarningCircle size={size} color={colors.destructive} weight="fill" />;
    default:
      return <Smiley size={size} color={colors.muted} weight="fill" />;
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  header: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  sectionTitleHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  heroGlass: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  weightValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  weightNumber: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 44,
  },
  unitText: {
    fontSize: 18,
    fontWeight: '600',
  },
  weightChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  weightDeltaText: {
    fontSize: 13,
    fontWeight: '800',
  },
  weightDeltaSub: {
    fontSize: 10,
    fontWeight: '500',
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
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: 14,
    borderRadius: 7,
  },
  chartLabel: {
    marginTop: spacing.xs,
    fontSize: 10,
    fontWeight: '600',
  },
  secondarySection: {
    marginVertical: spacing.xs,
  },
  statsGridRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  statIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs + 2,
    borderWidth: 1,
  },
  statTileValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  statTileLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniMetricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  moodPill: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  expandedDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  expandedMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
