import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, LabelMedium, Button } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import type { MoodType } from '@/types/wellness';
import { Smiley, SmileyMeh, SmileySad, Lightning, Moon, Brain } from 'phosphor-react-native';
import Slider from '@react-native-community/slider';

export default function CheckinModal() {
  const router = useRouter();
  const { wellness, submitDailyCheckin } = useUserStore((state) => state);
  
  const [energy, setEnergy] = useState(wellness.energy);
  const [sleep, setSleep] = useState(wellness.sleepHours);
  const [stress, setStress] = useState(wellness.stress);
  const [mood, setMood] = useState<MoodType>(wellness.mood);

  const handleSave = () => {
    submitDailyCheckin({ energy, sleepHours: sleep, stress, mood });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TitleLarge style={styles.title}>Check-in Diario</TitleLarge>

        {/* Energy */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Lightning size={24} color={colors.energyHigh} weight="fill" />
            <LabelMedium style={styles.label}>Energía: {energy}/5</LabelMedium>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={energy}
            onValueChange={setEnergy}
            minimumTrackTintColor={colors.energyHigh}
            maximumTrackTintColor={colors.border}
          />
        </View>

        {/* Sleep */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Moon size={24} color={colors.sleepGood} weight="fill" />
            <LabelMedium style={styles.label}>Sueño: {sleep} horas</LabelMedium>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={12}
            step={0.5}
            value={sleep}
            onValueChange={setSleep}
            minimumTrackTintColor={colors.sleepGood}
            maximumTrackTintColor={colors.border}
          />
        </View>

        {/* Stress */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Brain size={24} color={colors.primary} weight="fill" />
            <LabelMedium style={styles.label}>Nivel de Estrés: {stress}/5</LabelMedium>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={stress}
            onValueChange={setStress}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
          />
        </View>

        {/* Mood */}
        <View style={styles.section}>
          <LabelMedium style={styles.label}>¿Cómo te sientes?</LabelMedium>
          <View style={styles.moodRow}>
            <MoodButton 
              current={mood} 
              type="excellent" 
              icon={<Smiley size={32} weight="fill" color={mood === 'excellent' ? colors.success : colors.muted} />} 
              onPress={() => setMood('excellent')} 
            />
            <MoodButton 
              current={mood} 
              type="good" 
              icon={<Smiley size={32} color={mood === 'good' ? colors.success : colors.muted} />} 
              onPress={() => setMood('good')} 
            />
            <MoodButton 
              current={mood} 
              type="neutral" 
              icon={<SmileyMeh size={32} color={mood === 'neutral' ? colors.warning : colors.muted} />} 
              onPress={() => setMood('neutral')} 
            />
            <MoodButton 
              current={mood} 
              type="sad" 
              icon={<SmileySad size={32} color={mood === 'sad' ? colors.primary : colors.muted} />} 
              onPress={() => setMood('sad')} 
            />
            <MoodButton 
              current={mood} 
              type="stressed" 
              icon={<Brain size={32} color={mood === 'stressed' ? colors.destructive : colors.muted} />} 
              onPress={() => setMood('stressed')} 
            />
          </View>
        </View>

      </ScrollView>
      <View style={styles.footer}>
        <Button title="Guardar Check-in" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

function MoodButton({ current, type, icon, onPress }: { current: string; type: string; icon: React.ReactNode; onPress: () => void }) {
  const isSelected = current === type;
  return (
    <Button 
      variant="ghost" 
      onPress={onPress} 
      title="" 
      style={[styles.moodBtn, isSelected && styles.moodBtnSelected]}
    >
      {icon}
    </Button>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    marginLeft: spacing.sm,
    color: colors.foreground,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  moodBtn: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  moodBtnSelected: {
    backgroundColor: colors.borderLight,
  },
  footer: {
    padding: spacing.xl,
  },
});
