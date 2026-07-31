/**
 * WellnessCheckin — Quick daily check-in (energía, sueño, estrés, ánimo).
 * Muestra el estado actual o un CTA para completar el check-in.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PressableCard, TitleSmall, BodySmall, LabelMedium, Caption } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import type { WellnessCheckin as WellnessCheckinType, MoodType } from '@/types';
import type { WellnessData } from '@/store/useUserStore';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle } from 'phosphor-react-native';

interface WellnessCheckinProps {
  checkin?: WellnessCheckinType | WellnessData;
  onPress?: () => void;
}

export function WellnessCheckin({ checkin, onPress }: WellnessCheckinProps) {
  if (!checkin) {
    return (
      <PressableCard variant="default" onPress={onPress}>
        <TitleSmall style={{ fontWeight: '700' }}>Check-in de bienestar</TitleSmall>
        <BodySmall color={colors.muted} style={styles.cta}>
          Toca para registrar cómo te sentís hoy
        </BodySmall>
      </PressableCard>
    );
  }

  return (
    <PressableCard variant="default" onPress={onPress}>
      <TitleSmall style={styles.title}>Bienestar hoy</TitleSmall>
      <View style={styles.metricsRow}>
        <WellnessMetric
          icon={<Lightning size={24} color={'#FF9500'} weight="fill" />}
          label="Energía"
          value={`${checkin.energy}/5`}
        />
        <WellnessMetric
          icon={<Moon size={24} color={'#5856D6'} weight="fill" />}
          label="Sueño"
          value={`${checkin.sleepHours}h`}
        />
        <WellnessMetric
          icon={<Brain size={24} color={'#007AFF'} weight="fill" />}
          label="Estrés"
          value={`${checkin.stress}/5`}
        />
        <WellnessMetric
          icon={getMoodIcon(checkin.mood)}
          label="Ánimo"
          value=""
          isIconOnly
        />
      </View>
    </PressableCard>
  );
}

function getMoodIcon(mood: MoodType) {
  switch (mood) {
    case 'excellent':
      return <Star size={24} color={colors.energyHigh} weight="fill" />;
    case 'good':
      return <Smiley size={24} color={colors.success} weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={24} color={colors.muted} weight="fill" />;
    case 'sad':
      return <SmileySad size={24} color={colors.fats} weight="fill" />;
    case 'stressed':
      return <WarningCircle size={24} color={colors.destructive} weight="fill" />;
    default:
      return <Smiley size={24} color={colors.muted} weight="fill" />;
  }
}

function WellnessMetric({
  icon,
  label,
  value,
  isIconOnly = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isIconOnly?: boolean;
}) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricIcon}>
        {icon}
      </View>
      <Caption>{label}</Caption>
      {!isIconOnly && <LabelMedium>{value}</LabelMedium>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  cta: {
    marginTop: spacing.xs,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
