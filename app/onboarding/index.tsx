import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, BodyLarge, Button } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { Sparkle } from 'phosphor-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Sparkle size={64} color={colors.primary} weight="fill" />
        </View>
        
        <TitleLarge style={styles.title}>Bienvenido a AuraFit</TitleLarge>
        <BodyLarge style={styles.subtitle} color={colors.muted}>
          Tu bienestar integral, hiper-personalizado. 
          Vamos a configurar tu perfil para adaptar todo a ti.
        </BodyLarge>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Empezar" 
          onPress={() => router.push('/onboarding/personal-data')} 
        />
      </View>
    </SafeAreaView>
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
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: spacing.xl,
  },
});
