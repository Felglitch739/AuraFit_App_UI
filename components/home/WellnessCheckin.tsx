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
        <TitleSmall style={{ fontWeight: '700', color: '#FFFFFF' }}>Check-in de bienestar</TitleSmall>
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
          icon={<Lightning size={22} color={'#FF9F0A'} weight="fill" />}
          label="Energía"
          value={`${checkin.energy}/5`}
        />
        <WellnessMetric
          icon={<Moon size={22} color={'#5E5CE6'} weight="fill" />}
          label="Sueño"
          value={`${checkin.sleepHours}h`}
        />
        <WellnessMetric
          icon={<Brain size={22} color={'#0A84FF'} weight="fill" />}
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
      return <Star size={22} color="#FFD60A" weight="fill" />;
    case 'good':
      return <Smiley size={22} color="#30D158" weight="fill" />;
    case 'neutral':
      return <SmileyMeh size={22} color="#8E8E93" weight="fill" />;
    case 'sad':
      return <SmileySad size={22} color="#FF9F0A" weight="fill" />;
    case 'stressed':
      return <WarningCircle size={22} color="#FF453A" weight="fill" />;
    default:
      return <Smiley size={22} color="#8E8E93" weight="fill" />;
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
      <Caption color={colors.muted}>{label}</Caption>
      {!isIconOnly && <LabelMedium style={styles.metricValue}>{value}</LabelMedium>}
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
  cta: {
    marginTop: spacing.xs,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    gap: 4,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
