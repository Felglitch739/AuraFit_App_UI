/**
 * Card Test — Pantalla temporal para validar sombras visualmente.
 *
 * ANTES de continuar con el resto de componentes y pantallas,
 * esta pantalla debe verse bien en:
 * 1. Android real (Expo Go)
 * 2. Web (npm run web)
 *
 * Si hay artefactos visuales (sombras oscuras, manchas, bordes raros),
 * se arreglan AQUÍ en este componente aislado, no después.
 *
 * Accesible en: http://localhost:8081/card-test (web)
 * o navegando a /card-test en la app
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography, radius } from '@/constants/theme';

export default function CardTestScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.pageTitle}>Card Shadow Test</Text>
      <Text style={styles.pageSubtitle}>
        Verifica que las sombras se ven bien sin artefactos visuales
      </Text>

      {/* Variant: default */}
      <Text style={styles.sectionLabel}>variant="default"</Text>
      <Card>
        <Text style={styles.cardTitle}>Card Default</Text>
        <Text style={styles.cardBody}>
          Sombra sutil, casi imperceptible. No debe haber bordes oscuros,
          manchas, ni curvas visibles en la sombra.
        </Text>
      </Card>

      {/* Variant: elevated */}
      <Text style={styles.sectionLabel}>variant="elevated"</Text>
      <Card variant="elevated">
        <Text style={styles.cardTitle}>Card Elevated</Text>
        <Text style={styles.cardBody}>
          Sombra un poco más visible que default, pero aún sutil.
          Usada para CTAs y cards destacadas.
        </Text>
      </Card>

      {/* Variant: flat */}
      <Text style={styles.sectionLabel}>variant="flat"</Text>
      <Card variant="flat">
        <Text style={styles.cardTitle}>Card Flat</Text>
        <Text style={styles.cardBody}>
          Sin sombra. Solo el color de fondo y border-radius.
        </Text>
      </Card>

      {/* Multiple cards stacked (para ver si las sombras interfieren entre sí) */}
      <Text style={styles.sectionLabel}>Múltiples cards apiladas</Text>
      <Card style={styles.stackedCard}>
        <Text style={styles.cardTitle}>1,245</Text>
        <Text style={styles.cardSubtext}>calorías consumidas</Text>
      </Card>
      <Card style={styles.stackedCard}>
        <Text style={styles.cardTitle}>Push Day</Text>
        <Text style={styles.cardSubtext}>Pecho y Tríceps — 3 ejercicios</Text>
      </Card>
      <Card style={styles.stackedCard}>
        <View style={styles.macroRow}>
          <View style={[styles.macroDot, { backgroundColor: colors.protein }]} />
          <Text style={styles.macroLabel}>Proteína: 63g / 130g</Text>
        </View>
        <View style={styles.macroRow}>
          <View style={[styles.macroDot, { backgroundColor: colors.carbs }]} />
          <Text style={styles.macroLabel}>Carbos: 137g / 230g</Text>
        </View>
        <View style={styles.macroRow}>
          <View style={[styles.macroDot, { backgroundColor: colors.fats }]} />
          <Text style={styles.macroLabel}>Grasas: 25g / 70g</Text>
        </View>
      </Card>

      {/* Card con contenido denso (simula el Dashboard) */}
      <Text style={styles.sectionLabel}>Card densa (simula Dashboard)</Text>
      <Card>
        <View style={styles.denseHeader}>
          <Text style={styles.denseTitle}>Resumen del día</Text>
          <Text style={styles.denseDate}>30 Jul 2026</Text>
        </View>
        <View style={styles.denseStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,035</Text>
            <Text style={styles.statLabel}>kcal</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>63g</Text>
            <Text style={styles.statLabel}>proteína</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7.5h</Text>
            <Text style={styles.statLabel}>sueño</Text>
          </View>
        </View>
      </Card>

      {/* Spacer at bottom */}
      <View style={{ height: spacing['2xl'] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing['2xl'],
  },
  pageTitle: {
    ...typography.titleLarge,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    ...typography.bodyMedium,
    color: colors.muted,
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    ...typography.labelSmall,
    color: colors.muted,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  cardTitle: {
    ...typography.titleMedium,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  cardBody: {
    ...typography.bodyMedium,
    color: colors.subtle,
    lineHeight: 20,
  },
  cardSubtext: {
    ...typography.bodySmall,
    color: colors.muted,
  },
  stackedCard: {
    marginBottom: spacing.sm,
  },
  macroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  macroDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  macroLabel: {
    ...typography.bodyMedium,
    color: colors.foreground,
  },
  denseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  denseTitle: {
    ...typography.titleSmall,
    color: colors.foreground,
  },
  denseDate: {
    ...typography.bodySmall,
    color: colors.muted,
  },
  denseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.displayMedium,
    color: colors.foreground,
    fontSize: 24,
  },
  statLabel: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.borderLight,
  },
});
