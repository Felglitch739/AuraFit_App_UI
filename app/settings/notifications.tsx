import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';

export default function NotificationsScreen() {
  const router = useRouter();

  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [dailyCheckin, setDailyCheckin] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

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
        <TitleSmall style={styles.headerTitle}>Notificaciones</TitleSmall>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Caption style={styles.sectionHeading}>RECORDATORIOS DIARIOS</Caption>
        <Card style={styles.card} padding={0}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <LabelMedium style={styles.toggleTitle}>Recordatorios de entrenamiento</LabelMedium>
              <BodySmall color={colors.muted}>Avisos 15 min antes de tu rutina programada</BodySmall>
            </View>
            <Switch
              value={workoutReminders}
              onValueChange={setWorkoutReminders}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <LabelMedium style={styles.toggleTitle}>Check-in diario de bienestar</LabelMedium>
              <BodySmall color={colors.muted}>Aviso por la noche para registrar ánimo y energía</BodySmall>
            </View>
            <Switch
              value={dailyCheckin}
              onValueChange={setDailyCheckin}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </Card>

        <Caption style={styles.sectionHeading}>RESÚMENES Y SONIDO</Caption>
        <Card style={styles.card} padding={0}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <LabelMedium style={styles.toggleTitle}>Resumen semanal de progreso</LabelMedium>
              <BodySmall color={colors.muted}>Informe los domingos con métricas clave</BodySmall>
            </View>
            <Switch
              value={weeklyReport}
              onValueChange={setWeeklyReport}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <LabelMedium style={styles.toggleTitle}>Efectos de sonido</LabelMedium>
              <BodySmall color={colors.muted}>Sonidos al completar series y ejercicios</BodySmall>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </Card>

        <Button title="Guardar preferencias" onPress={() => router.back()} variant="primary" style={styles.saveButton} />
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
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
