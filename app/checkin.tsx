import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Slider from '@react-native-community/slider';
import { MeshBackground, GlassCard, TitleSmall, LabelMedium, Caption, Button, StaggerView } from '@/components/ui';
import { spacing, radius } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import type { MoodType } from '@/types';
import { Lightning, Moon, Brain, Smiley, SmileyMeh, SmileySad, Star, WarningCircle, X } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MOOD_OPTIONS: { type: MoodType; label: string; icon: any; colorKey: string }[] = [
  { type: 'excellent', label: 'Excelente', icon: Star, colorKey: 'accent' },
  { type: 'good', label: 'Bueno', icon: Smiley, colorKey: 'success' },
  { type: 'neutral', label: 'Normal', icon: SmileyMeh, colorKey: 'muted' },
  { type: 'sad', label: 'Bajo', icon: SmileySad, colorKey: 'warning' },
  { type: 'stressed', label: 'Estresado', icon: WarningCircle, colorKey: 'destructive' },
];

export default function CheckinModal() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { wellness, submitDailyCheckin } = useUserStore((state) => state);

  const [energy, setEnergy] = useState(wellness.energy || 4);
  const [sleep, setSleep] = useState(wellness.sleepHours || 7.5);
  const [stress, setStress] = useState(wellness.stress || 2);
  const [mood, setMood] = useState<MoodType>(wellness.mood || 'good');

  const handleSave = () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (_) {}
    }
    submitDailyCheckin({ energy, sleepHours: sleep, stress, mood });
    router.back();
  };

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* Header */}
        <StaggerView index={0}>
          <View style={styles.header}>
            <View style={{ width: 36 }} />
            <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Check-in de Bienestar</TitleSmall>
            <Pressable
              onPress={() => router.back()}
              style={[styles.closeButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' }]}
              accessibilityLabel="Cerrar modal"
            >
              <X size={18} color={colors.foreground} />
            </Pressable>
          </View>
        </StaggerView>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* 1. ENERGÍA */}
          <StaggerView index={1}>
            <GlassCard level="hero" glowColor="#F97316" style={styles.card}>
              <View style={styles.metricHeaderRow}>
                <View style={[styles.clayBadge, { backgroundColor: '#F97316' }]}>
                  <Lightning size={24} color="#FFFFFF" weight="fill" />
                </View>
                <View style={styles.metricTextCol}>
                  <LabelMedium style={[styles.metricTitle, { color: colors.foreground }]}>Nivel de Energía</LabelMedium>
                  <Caption style={{ color: colors.muted }}>¿Qué tan enérgico te sientes hoy?</Caption>
                </View>
                <View style={[styles.valuePill, { backgroundColor: 'rgba(249, 115, 22, 0.18)' }]}>
                  <Text style={[styles.valuePillText, { color: '#F97316' }]}>{energy}/5</Text>
                </View>
              </View>

              {/* Custom Step Selector Buttons for Energy */}
              <View style={styles.stepRow}>
                {[1, 2, 3, 4, 5].map((val) => {
                  const isSelected = energy === val;
                  return (
                    <Pressable
                      key={val}
                      onPress={() => {
                        setEnergy(val);
                        if (Platform.OS !== 'web') {
                          try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch (_) {}
                        }
                      }}
                      style={[
                        styles.stepItem,
                        isSelected ? styles.stepItemSelectedOrange : styles.stepItemDefault,
                        { borderColor: isSelected ? '#F97316' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.08)') },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepText,
                          { color: isSelected ? '#FFFFFF' : colors.foreground },
                        ]}
                      >
                        {val}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </GlassCard>
          </StaggerView>

          {/* 2. SUEÑO */}
          <StaggerView index={2}>
            <GlassCard level="hero" glowColor="#A855F7" style={styles.card}>
              <View style={styles.metricHeaderRow}>
                <View style={[styles.clayBadge, { backgroundColor: '#A855F7' }]}>
                  <Moon size={24} color="#FFFFFF" weight="fill" />
                </View>
                <View style={styles.metricTextCol}>
                  <LabelMedium style={[styles.metricTitle, { color: colors.foreground }]}>Horas de Sueño</LabelMedium>
                  <Caption style={{ color: colors.muted }}>¿Cuántas horas descansaste anoche?</Caption>
                </View>
                <View style={[styles.valuePill, { backgroundColor: 'rgba(168, 85, 247, 0.18)' }]}>
                  <Text style={[styles.valuePillText, { color: '#A855F7' }]}>{sleep}h</Text>
                </View>
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={3}
                  maximumValue={12}
                  step={0.5}
                  value={sleep}
                  onValueChange={(val) => {
                    setSleep(val);
                  }}
                  minimumTrackTintColor="#A855F7"
                  maximumTrackTintColor={isDark ? 'rgba(255,255,255,0.12)' : '#E5E5EA'}
                  thumbTintColor="#A855F7"
                />
                <View style={styles.sliderLabelsRow}>
                  <Caption style={{ color: colors.muted }}>3h</Caption>
                  <Caption style={{ color: colors.muted, fontWeight: '700' }}>7.5h (Ideal)</Caption>
                  <Caption style={{ color: colors.muted }}>12h</Caption>
                </View>
              </View>
            </GlassCard>
          </StaggerView>

          {/* 3. ESTRÉS */}
          <StaggerView index={3}>
            <GlassCard level="hero" glowColor="#3B82F6" style={styles.card}>
              <View style={styles.metricHeaderRow}>
                <View style={[styles.clayBadge, { backgroundColor: '#3B82F6' }]}>
                  <Brain size={24} color="#FFFFFF" weight="fill" />
                </View>
                <View style={styles.metricTextCol}>
                  <LabelMedium style={[styles.metricTitle, { color: colors.foreground }]}>Nivel de Estrés</LabelMedium>
                  <Caption style={{ color: colors.muted }}>1 es muy relajado, 5 es estrés alto</Caption>
                </View>
                <View style={[styles.valuePill, { backgroundColor: 'rgba(59, 130, 246, 0.18)' }]}>
                  <Text style={[styles.valuePillText, { color: '#3B82F6' }]}>{stress}/5</Text>
                </View>
              </View>

              <View style={styles.stepRow}>
                {[1, 2, 3, 4, 5].map((val) => {
                  const isSelected = stress === val;
                  return (
                    <Pressable
                      key={val}
                      onPress={() => {
                        setStress(val);
                        if (Platform.OS !== 'web') {
                          try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch (_) {}
                        }
                      }}
                      style={[
                        styles.stepItem,
                        isSelected ? styles.stepItemSelectedBlue : styles.stepItemDefault,
                        { borderColor: isSelected ? '#3B82F6' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.08)') },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepText,
                          { color: isSelected ? '#FFFFFF' : colors.foreground },
                        ]}
                      >
                        {val}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </GlassCard>
          </StaggerView>

          {/* 4. ÁNIMO / ESTADO DE ÁNIMO */}
          <StaggerView index={4}>
            <GlassCard level="hero" glowColor="#3B82F6" style={styles.card}>
              <LabelMedium style={[styles.metricTitle, { color: colors.foreground, marginBottom: 4 }]}>
                ¿Cómo está tu ánimo hoy?
              </LabelMedium>
              <Caption style={{ color: colors.muted, marginBottom: spacing.md }}>
                Selecciona el estado que mejor describe tu día
              </Caption>

              <View style={styles.moodGridRow}>
                {MOOD_OPTIONS.map((item) => {
                  const isSelected = mood === item.type;
                  const iconColor = isSelected ? (colors as any)[item.colorKey] || '#3B82F6' : colors.muted;

                  return (
                    <MoodCardTile
                      key={item.type}
                      item={item}
                      isSelected={isSelected}
                      iconColor={iconColor}
                      colors={colors}
                      isDark={isDark}
                      onSelect={() => {
                        setMood(item.type);
                        if (Platform.OS !== 'web') {
                          try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); } catch (_) {}
                        }
                      }}
                    />
                  );
                })}
              </View>
            </GlassCard>
          </StaggerView>

          <StaggerView index={5}>
            <Button
              title="Guardar Check-in de Hoy"
              onPress={handleSave}
              variant="primary"
              size="lg"
              style={styles.saveButton}
            />
          </StaggerView>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

function MoodCardTile({
  item,
  isSelected,
  iconColor,
  colors,
  isDark,
  onSelect,
}: {
  item: typeof MOOD_OPTIONS[0];
  isSelected: boolean;
  iconColor: string;
  colors: any;
  isDark: boolean;
  onSelect: () => void;
}) {
  const IconComponent = item.icon;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.moodTile,
        {
          backgroundColor: isSelected
            ? isDark ? 'rgba(59, 130, 246, 0.22)' : 'rgba(59, 130, 246, 0.14)'
            : isDark ? 'rgba(255, 255, 255, 0.04)' : '#F2F2F7',
          borderColor: isSelected
            ? '#3B82F6'
            : colors.borderLight,
        },
        animatedStyle,
      ]}
    >
      <IconComponent size={30} color={iconColor} weight={isSelected ? 'fill' : 'regular'} />
      <Caption
        style={[
          styles.moodLabel,
          {
            color: isSelected ? colors.foreground : colors.muted,
            fontWeight: isSelected ? '800' : '500',
          },
        ]}
        numberOfLines={1}
      >
        {item.label}
      </Caption>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    padding: spacing.md + 2,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  clayBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  metricTextCol: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  valuePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  valuePillText: {
    fontSize: 15,
    fontWeight: '800',
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
  stepItem: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepItemDefault: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  stepItemSelectedOrange: {
    backgroundColor: '#F97316',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  stepItemSelectedBlue: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '800',
  },
  sliderContainer: {
    marginTop: spacing.xs,
  },
  slider: {
    width: '100%',
    height: 44,
  },
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 2,
  },
  moodGridRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  moodTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 6,
    paddingHorizontal: 2,
    borderRadius: 16,
    borderWidth: 1.2,
    gap: 6,
  },
  moodLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});

