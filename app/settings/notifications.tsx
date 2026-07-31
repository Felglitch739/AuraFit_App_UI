import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [dailyCheckin, setDailyCheckin] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

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
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Notificaciones</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>RECORDATORIOS DIARIOS</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <LabelMedium style={[styles.toggleTitle, { color: colors.foreground }]}>Recordatorios de entrenamiento</LabelMedium>
                <BodySmall style={{ color: colors.muted }}>Avisos 15 min antes de tu rutina programada</BodySmall>
              </View>
              <Switch
                value={workoutReminders}
                onValueChange={setWorkoutReminders}
                trackColor={{ false: '#767577', true: colors.primary }}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <LabelMedium style={[styles.toggleTitle, { color: colors.foreground }]}>Check-in diario de bienestar</LabelMedium>
                <BodySmall style={{ color: colors.muted }}>Aviso por la noche para registrar ánimo y energía</BodySmall>
              </View>
              <Switch
                value={dailyCheckin}
                onValueChange={setDailyCheckin}
                trackColor={{ false: '#767577', true: colors.primary }}
              />
            </View>
          </GlassCard>

          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>RESÚMENES Y SONIDO</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <LabelMedium style={[styles.toggleTitle, { color: colors.foreground }]}>Resumen semanal de progreso</LabelMedium>
                <BodySmall style={{ color: colors.muted }}>Informe los domingos con métricas clave</BodySmall>
              </View>
              <Switch
                value={weeklyReport}
                onValueChange={setWeeklyReport}
                trackColor={{ false: '#767577', true: colors.primary }}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <LabelMedium style={[styles.toggleTitle, { color: colors.foreground }]}>Efectos de sonido</LabelMedium>
                <BodySmall style={{ color: colors.muted }}>Sonidos al completar series y ejercicios</BodySmall>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#767577', true: colors.primary }}
              />
            </View>
          </GlassCard>

          <Button title="Guardar preferencias" onPress={() => router.back()} variant="primary" style={styles.saveButton} />
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  toggleText: {
    flex: 1,
    marginRight: spacing.md,
  },
  toggleTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  divider: {
    height: 1,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
