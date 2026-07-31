import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlassCard, TitleSmall, BodySmall, LabelMedium, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import type { WellnessCheckin as WellnessCheckinType, MoodType } from '@/types';
import type { WellnessData } from '@/store/useUserStore';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle, CaretRight, Camera } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

interface WellnessCheckinProps {
  checkin?: WellnessCheckinType | WellnessData;
  onPress?: () => void;
}

export function WellnessCheckin({ checkin, onPress }: WellnessCheckinProps) {
  const { colors, isDark } = useTheme();

  if (!checkin) {
    return (
      <GlassCard level="medium" onPress={onPress} style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <TitleSmall style={{ fontWeight: '700', color: colors.foreground }}>Check-in de bienestar</TitleSmall>
          <CaretRight size={18} color={colors.muted} />
        </View>
        <BodySmall style={{ marginTop: spacing.xs, color: colors.muted }}>
          Toca para registrar tu estado de hoy
        </BodySmall>
      </GlassCard>
    );
  }

  return (
    <GlassCard level="medium" onPress={onPress} style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionHeader, { color: colors.muted }]}>RESUMEN DE BIENESTAR</Text>
        <CaretRight size={16} color={colors.muted} />
      </View>

      <View style={styles.metricsGrid}>
        <WellnessMetric
          icon={<Lightning size={18} color={colors.orange} weight="fill" />}
          label="Energía"
          value={`${checkin.energy}/5`}
          badgeBg={isDark ? 'rgba(255, 159, 10, 0.14)' : 'rgba(255, 149, 0, 0.10)'}
          badgeBorder={isDark ? 'rgba(255, 159, 10, 0.28)' : 'rgba(255, 149, 0, 0.20)'}
        />
        <WellnessMetric
          icon={<Moon size={18} color={colors.purple} weight="fill" />}
          label="Sueño"
          value={`${checkin.sleepHours}h`}
          badgeBg={isDark ? 'rgba(94, 92, 230, 0.14)' : 'rgba(88, 86, 214, 0.10)'}
          badgeBorder={isDark ? 'rgba(94, 92, 230, 0.28)' : 'rgba(88, 86, 214, 0.20)'}
        />
        <WellnessMetric
          icon={<Brain size={18} color={colors.primary} weight="fill" />}
          label="Estrés"
          value={`${checkin.stress}/5`}
          badgeBg={isDark ? 'rgba(10, 132, 255, 0.14)' : 'rgba(0, 122, 255, 0.10)'}
          badgeBorder={isDark ? 'rgba(10, 132, 255, 0.28)' : 'rgba(0, 122, 255, 0.20)'}
        />
        <WellnessMetric
          icon={getMoodIcon(checkin.mood, colors)}
          label="Ánimo"
          value={getMoodLabel(checkin.mood)}
          badgeBg={isDark ? 'rgba(48, 209, 88, 0.14)' : 'rgba(52, 199, 89, 0.10)'}
          badgeBorder={isDark ? 'rgba(48, 209, 88, 0.28)' : 'rgba(52, 199, 89, 0.20)'}
        />
      </View>
    </GlassCard>
  );
}

function getMoodIcon(mood: MoodType, colors: any) {
  switch (mood) {
    case 'excellent':
      return <Star size={18} color={colors.accent} weight="fill" />;
    case 'good':
      return <Smiley size={18} color={colors.success} weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={18} color={colors.muted} weight="fill" />;
    case 'sad':
      return <SmileySad size={18} color={colors.warning} weight="fill" />;
    case 'stressed':
      return <WarningCircle size={18} color={colors.destructive} weight="fill" />;
    default:
      return <Smiley size={18} color={colors.muted} weight="fill" />;
  }
}

function getMoodLabel(mood: MoodType) {
  switch (mood) {
    case 'excellent':
      return 'Excelente';
    case 'good':
      return 'Bueno';
    case 'neutral':
      return 'Normal';
    case 'sad':
      return 'Bajo';
    case 'stressed':
      return 'Alto';
    default:
      return 'OK';
  }
}

function WellnessMetric({
  icon,
  label,
  value,
  badgeBg,
  badgeBorder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badgeBg: string;
  badgeBorder: string;
}) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.metricItem,
        {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F9F9FB',
          borderColor: colors.borderLight,
        },
      ]}
    >
      <View style={[styles.iconBadge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
        {icon}
      </View>
      <Caption style={[styles.labelCaption, { color: colors.muted }]} numberOfLines={1}>
        {label}
      </Caption>
      <LabelMedium style={[styles.metricValueText, { color: colors.foreground }]} numberOfLines={1}>
        {value}
      </LabelMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 2,
  },
  metricItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 6,
  },
  labelCaption: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  metricValueText: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 2,
  },
});
