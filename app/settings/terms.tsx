import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleSmall, Button, LabelMedium, BodySmall } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';

export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Button
          title=""
          variant="outline"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <CaretLeft size={22} color={colors.text} />
        </Button>
        <TitleSmall style={styles.headerTitle}>Términos de servicio</TitleSmall>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <LabelMedium style={styles.title}>1. Aceptación de los Términos</LabelMedium>
          <BodySmall color={colors.muted} style={styles.paragraph}>
            Al descargar, instalar o utilizar AuraFit, aceptas quedar vinculado por estos Términos de Servicio y por nuestra Política de Privacidad.
          </BodySmall>

          <LabelMedium style={styles.title}>2. Uso de la Aplicación y Salud</LabelMedium>
          <BodySmall color={colors.muted} style={styles.paragraph}>
            AuraFit ofrece recomendaciones de entrenamiento y nutrición basadas en modelos de datos. Esta información tiene carácter exclusivamente informativo y no constituye consejo médico ni diagnóstico profesional.
          </BodySmall>

          <LabelMedium style={styles.title}>3. Privacidad y Datos de Usuario</LabelMedium>
          <BodySmall color={colors.muted} style={styles.paragraph}>
            Tus datos de salud, progreso y perfil se almacenan de forma segura y nunca se venderán a terceros. Puedes solicitar la exportación o eliminación completa de tu información en cualquier momento desde la sección Privacidad.
          </BodySmall>

          <LabelMedium style={styles.title}>4. Modificaciones</LabelMedium>
          <BodySmall color={colors.muted} style={styles.paragraph}>
            Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado de la aplicación tras dichos cambios constituye tu aceptación de los nuevos términos.
          </BodySmall>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    paddingHorizontal: 0,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.lg,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    color: colors.text,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
});
