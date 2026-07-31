import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft, CaretDown, ChatCircleText } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

const FAQS = [
  {
    q: '¿Cómo calcula AuraFit mis calorías diarias?',
    a: 'Utilizamos la fórmula Mifflin-St Jeor ajustada según tu nivel de actividad y objetivo personal (perder peso, ganar músculo o mantenimiento).',
  },
  {
    q: '¿Puedo personalizar mis rutinas de entrenamiento?',
    a: 'Sí, desde la pestaña Entreno puedes añadir ejercicios personalizados o reemplazar series y repeticiones.',
  },
  {
    q: '¿Cómo funciona la lectura de fotos de comida?',
    a: 'La IA analiza la imagen de tu plato y estima las porciones de macronutrientes (proteínas, carbohidratos y grasas) con alta precisión.',
  },
];

export default function SupportScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleContact = () => {
    Alert.alert('Soporte AuraFit', 'Envíanos un correo a soporte@aurafit.app y te responderemos en menos de 24 horas.');
  };

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
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Ayuda y soporte</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>PREGUNTAS FRECUENTES</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <View key={idx} style={[idx < FAQS.length - 1 && [styles.borderBottom, { borderBottomColor: colors.borderLight }]]}>
                  <Pressable
                    onPress={() => setOpenFaq(isOpen ? null : idx)}
                    style={styles.faqHeader}
                  >
                    <LabelMedium style={[styles.faqQuestion, { color: colors.foreground }]}>{item.q}</LabelMedium>
                    <CaretDown
                      size={18}
                      color={colors.muted}
                      style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                    />
                  </Pressable>
                  {isOpen && (
                    <View style={styles.faqBody}>
                      <BodySmall style={{ color: colors.muted }}>{item.a}</BodySmall>
                    </View>
                  )}
                </View>
              );
            })}
          </GlassCard>

          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>¿NECESITAS MÁS AYUDA?</Caption>
          <GlassCard level="hero" style={styles.card} padding={spacing.md}>
            <View style={styles.contactContainer}>
              <View style={[styles.contactIconBadge, { backgroundColor: isDark ? 'rgba(10, 132, 255, 0.14)' : '#F2F2F7' }]}>
                <ChatCircleText size={24} color={colors.primary} />
              </View>
              <LabelMedium style={[styles.contactTitle, { color: colors.foreground }]}>Soporte técnico 24/7</LabelMedium>
              <BodySmall style={[styles.contactDesc, { color: colors.muted }]}>
                Nuestro equipo está disponible para resolver cualquier duda o problema.
              </BodySmall>
              <Button
                title="Contactar soporte por Email"
                onPress={handleContact}
                variant="primary"
                style={styles.contactButton}
              />
            </View>
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
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  card: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  faqQuestion: {
    flex: 1,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  faqBody: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  contactContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  contactIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  contactDesc: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  contactButton: {
    width: '100%',
  },
});
