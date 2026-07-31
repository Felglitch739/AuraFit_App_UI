import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, LabelMedium, BodySmall, Button } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { CheckCircle } from 'phosphor-react-native';

export default function GoalsScreen() {
  const router = useRouter();
  const updateProfile = useUserStore((state) => state.updateProfile);
  
  const [goal, setGoal] = useState<'maintenance' | 'muscle' | 'recomposition' | 'weight_loss' | ''>('');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'athlete' | ''>('');

  const handleNext = () => {
    updateProfile({ goal, activityLevel: activity });
    router.push('/onboarding/routine');
  };

  const isFormValid = goal !== '' && activity !== '';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TitleLarge style={styles.title}>Tus Objetivos</TitleLarge>

        <LabelMedium style={styles.sectionTitle}>¿Cuál es tu meta principal?</LabelMedium>
        <SelectCard 
          title="Mantenimiento" 
          subtitle="Mantener mi peso y salud actual" 
          isSelected={goal === 'maintenance'} 
          onPress={() => setGoal('maintenance')} 
        />
        <SelectCard 
          title="Bajar de peso" 
          subtitle="Perder grasa corporal" 
          isSelected={goal === 'weight_loss'} 
          onPress={() => setGoal('weight_loss')} 
        />
        <SelectCard 
          title="Crecer músculo" 
          subtitle="Ganar fuerza y masa muscular (Volumen)" 
          isSelected={goal === 'muscle'} 
          onPress={() => setGoal('muscle')} 
        />
        <SelectCard 
          title="Recomposición" 
          subtitle="Perder grasa y ganar músculo simultáneamente" 
          isSelected={goal === 'recomposition'} 
          onPress={() => setGoal('recomposition')} 
        />

        <LabelMedium style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          Nivel de actividad actual
        </LabelMedium>
        <SelectCard 
          title="Sedentario" 
          subtitle="Poco o ningún ejercicio" 
          isSelected={activity === 'sedentary'} 
          onPress={() => setActivity('sedentary')} 
        />
        <SelectCard 
          title="Ligero / Moderado" 
          subtitle="Ejercicio 1-3 veces por semana" 
          isSelected={activity === 'moderate'} 
          onPress={() => setActivity('moderate')} 
        />
        <SelectCard 
          title="Muy Activo / Atleta" 
          subtitle="Ejercicio duro 4+ veces por semana" 
          isSelected={activity === 'athlete'} 
          onPress={() => setActivity('athlete')} 
        />

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Continuar" 
          onPress={handleNext} 
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}

function SelectCard({ title, subtitle, isSelected, onPress }: { title: string; subtitle: string; isSelected: boolean; onPress: () => void }) {
  return (
    <Pressable 
      style={[styles.card, isSelected && styles.cardSelected]} 
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <LabelMedium style={isSelected ? styles.cardTitleSelected : styles.cardTitle}>
          {title}
        </LabelMedium>
        <BodySmall style={isSelected ? styles.cardSubtitleSelected : styles.cardSubtitle}>
          {subtitle}
        </BodySmall>
      </View>
      {isSelected && (
        <CheckCircle size={24} color={colors.primary} weight="fill" />
      )}
    </Pressable>
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
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.foreground,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  cardSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: colors.foreground,
  },
  cardTitleSelected: {
    color: colors.primary,
  },
  cardSubtitle: {
    color: colors.muted,
    marginTop: 2,
  },
  cardSubtitleSelected: {
    color: colors.primary,
    opacity: 0.8,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
});
