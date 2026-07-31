import React from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, LabelMedium, BodySmall } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function TermsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E5E5EA' }]}
            accessibilityLabel="Volver"
          >
            <CaretLeft size={20} color={colors.foreground} />
          </Pressable>
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Términos de servicio</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GlassCard level="hero" style={styles.card}>
            <LabelMedium style={[styles.title, { color: colors.foreground }]}>1. Aceptación de los Términos</LabelMedium>
            <BodySmall style={[styles.paragraph, { color: colors.muted }]}>
              Al descargar, instalar o utilizar AuraFit, aceptas quedar vinculado por estos Términos de Servicio y por nuestra Política de Privacidad.
            </BodySmall>

            <LabelMedium style={[styles.title, { color: colors.foreground }]}>2. Uso de la Aplicación y Salud</LabelMedium>
            <BodySmall style={[styles.paragraph, { color: colors.muted }]}>
              AuraFit ofrece recomendaciones de entrenamiento y nutrición basadas en modelos de datos. Esta información tiene carácter exclusivamente informativo y no constituye consejo médico ni diagnóstico profesional.
            </BodySmall>

            <LabelMedium style={[styles.title, { color: colors.foreground }]}>3. Privacidad y Datos de Usuario</LabelMedium>
            <BodySmall style={[styles.paragraph, { color: colors.muted }]}>
              Tus datos de salud, progreso y perfil se almacenan de forma segura y nunca se venderán a terceros. Puedes solicitar la exportación o eliminación completa de tu información en cualquier momento desde la sección Privacidad.
            </BodySmall>

            <LabelMedium style={[styles.title, { color: colors.foreground }]}>4. Modificaciones</LabelMedium>
            <BodySmall style={[styles.paragraph, { color: colors.muted }]}>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado de la aplicación tras dichos cambios constituye tu aceptación de los nuevos términos.
            </BodySmall>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
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
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  card: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
});
