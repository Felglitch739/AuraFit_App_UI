import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, BodyLarge, Button } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { Robot, Barbell } from 'phosphor-react-native';

export default function RoutineScreen() {
  const router = useRouter();
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  
  const [wantsAi, setWantsAi] = useState<boolean | null>(null);

  const handleFinish = () => {
    if (wantsAi !== null) {
      completeOnboarding({ wantsAiRoutine: wantsAi });
      // Redirects automatically because _layout.tsx listens to isOnboarded
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <TitleLarge style={styles.title}>Rutina de Entrenamiento</TitleLarge>
        <BodyLarge style={styles.subtitle} color={colors.muted}>
          ¿Quieres que AuraFit genere una rutina inteligente basada en tus objetivos, o ya tienes la tuya?
        </BodyLarge>

        <View style={styles.options}>
          <OptionCard 
            title="Generar con IA" 
            icon={<Robot size={32} color={wantsAi === true ? colors.onPrimary : colors.primary} />}
            isSelected={wantsAi === true}
            onPress={() => setWantsAi(true)}
          />
          <OptionCard 
            title="Ya tengo la mía" 
            icon={<Barbell size={32} color={wantsAi === false ? colors.onPrimary : colors.primary} />}
            isSelected={wantsAi === false}
            onPress={() => setWantsAi(false)}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Finalizar Setup" 
          onPress={handleFinish} 
          disabled={wantsAi === null}
        />
      </View>
    </SafeAreaView>
  );
}

function OptionCard({ title, icon, isSelected, onPress }: { title: string; icon: React.ReactNode; isSelected: boolean; onPress: () => void }) {
  return (
    <View style={[styles.cardWrapper, isSelected && styles.cardWrapperSelected]}>
      <Button 
        variant={isSelected ? 'primary' : 'outline'}
        title={title}
        onPress={onPress}
        style={styles.optionBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl * 1.5,
  },
  options: {
    gap: spacing.lg,
  },
  cardWrapper: {
    opacity: 0.7,
  },
  cardWrapperSelected: {
    opacity: 1,
  },
  optionBtn: {
    paddingVertical: spacing.xl,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
});
