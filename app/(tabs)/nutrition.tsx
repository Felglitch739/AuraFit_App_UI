/**
 * Nutrition — Registro de comidas + resumen de macros diarios + escáner con foto.
 */

import React from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MeshBackground, GlassCard, TitleLarge, TitleSmall, LabelMedium,
  BodySmall, Caption, ProgressRing, Button,
} from '@/components/ui';
import { spacing, radius } from '@/constants/theme';
import { Sun, ForkKnife, Moon, Coffee, Plus, Camera, Sparkle } from 'phosphor-react-native';
import { mockTodayNutrition } from '@/data/mock';
import type { MealType } from '@/types';
import { useTheme } from '@/hooks/useTheme';

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  dinner: 'Cena',
  snack: 'Snack',
};

const MEAL_TYPE_ICONS: Record<MealType, any> = {
  breakfast: Sun,
  lunch: ForkKnife,
  dinner: Moon,
  snack: Coffee,
};

const ALL_MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function NutritionScreen() {
  const { colors, isDark } = useTheme();
  const nutrition = mockTodayNutrition;
  const calorieProgress = Math.min(nutrition.totalCalories / nutrition.calorieTarget, 1);

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={[styles.largeTitle, { color: colors.foreground }]}>Nutrición</Text>
          <BodySmall style={[styles.date, { color: colors.muted }]}>
            Hoy
          </BodySmall>

          {/* Daily Summary Card */}
          <GlassCard level="hero" style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <ProgressRing
                progress={calorieProgress}
                size={104}
                strokeWidth={11}
                color={colors.primary}
                gradientColors={isDark ? ['#0A84FF', '#5E5CE6'] : ['#007AFF', '#5AC8FA']}
              >
                <LabelMedium style={[styles.calorieNumber, { color: colors.foreground }]}>
                  {nutrition.totalCalories}
                </LabelMedium>
                <Caption style={{ color: colors.muted }}>kcal</Caption>
              </ProgressRing>

              <View style={styles.macrosSummary}>
                <MacroBar
                  label="Proteína"
                  current={nutrition.totalProtein}
                  target={nutrition.proteinTarget}
                  color={colors.protein}
                />
                <MacroBar
                  label="Carbos"
                  current={nutrition.totalCarbs}
                  target={nutrition.carbsTarget}
                  color={colors.carbs}
                />
                <MacroBar
                  label="Grasas"
                  current={nutrition.totalFats}
                  target={nutrition.fatsTarget}
                  color={colors.fats}
                />
              </View>
            </View>
          </GlassCard>

          {/* AI Camera Meal Scanner — Reordenado arriba de Comidas de hoy */}
          <GlassCard
            level="hero"
            style={[
              styles.cameraCard,
              {
                borderColor: isDark ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 122, 255, 0.25)',
              },
            ]}
          >
            <View style={styles.cameraRow}>
              <View
                style={[
                  styles.cameraIconContainer,
                  {
                    backgroundColor: isDark ? 'rgba(10, 132, 255, 0.16)' : 'rgba(0, 122, 255, 0.10)',
                  },
                ]}
              >
                <Camera size={22} color={colors.primary} weight="fill" />
              </View>
              <View style={styles.cameraTextCol}>
                <View style={styles.aiBadgeRow}>
                  <Sparkle size={12} color={colors.primary} weight="fill" />
                  <Text style={[styles.aiBadgeText, { color: colors.primary }]}>RECONOCIMIENTO IA</Text>
                </View>
                <Text style={[styles.cameraTitle, { color: colors.foreground }]}>Analizar comida con foto</Text>
                <Caption style={{ color: colors.muted }}>Saca una foto a tu plato para calcular macros</Caption>
              </View>
            </View>
            <Button
              title="Tomar o subir foto"
              onPress={() => {}}
              variant="primary"
              size="md"
              icon={<Camera size={16} color={colors.onPrimary} weight="fill" />}
              style={styles.cameraButton}
              accessibilityLabel="Tomar foto de comida para análisis con IA"
            />
          </GlassCard>

          {/* Meals */}
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Comidas de hoy</Text>

          {ALL_MEAL_TYPES.map((mealType) => {
            const meal = nutrition.meals.find(m => m.type === mealType);

            return (
              <GlassCard key={mealType} level="medium" style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={[styles.mealIconContainer, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F2F2F7' }]}>
                    {React.createElement(MEAL_TYPE_ICONS[mealType], {
                      size: 18,
                      color: colors.primary,
                      weight: 'fill',
                    })}
                  </View>
                  <View style={styles.mealHeaderText}>
                    <LabelMedium style={{ color: colors.foreground, fontWeight: '700' }}>
                      {MEAL_TYPE_LABELS[mealType]}
                    </LabelMedium>
                    {meal && (
                      <Caption style={{ color: colors.muted }}>{meal.totalCalories} kcal</Caption>
                    )}
                  </View>
                  <Pressable
                    style={styles.addButton}
                    accessibilityLabel={`Agregar ${MEAL_TYPE_LABELS[mealType]}`}
                    accessibilityRole="button"
                  >
                    <Plus size={20} color={colors.primary} />
                  </Pressable>
                </View>

                {meal && meal.foods.length > 0 && (
                  <View style={[styles.foodList, { borderTopColor: colors.borderLight }]}>
                    {meal.foods.map((food) => (
                      <View key={food.id} style={styles.foodRow}>
                        <BodySmall style={{ flex: 1, color: colors.foreground, fontWeight: '500' }}>
                          {food.name}
                        </BodySmall>
                        <Caption style={{ color: colors.muted, fontWeight: '600' }}>{food.calories} kcal</Caption>
                      </View>
                    ))}
                  </View>
                )}

                {!meal && (
                  <BodySmall style={{ marginTop: spacing.xs, color: colors.muted }}>
                    Sin registro todavía
                  </BodySmall>
                )}
              </GlassCard>
            );
          })}

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

function MacroBar({
  label,
  current,
  target,
  color,
}: {
  label: string;
  current: number;
  target: number;
  color: string;
}) {
  const { colors, isDark } = useTheme();
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.macroBarContainer}>
      <View style={styles.macroBarHeader}>
        <Caption style={{ color: colors.muted }}>{label}</Caption>
        <Caption style={{ color: colors.foreground, fontWeight: '700' }}>{Math.round(current)}/{target}g</Caption>
      </View>
      <View style={[styles.macroBarTrack, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#E5E5EA' }]}>
        <View
          style={[
            styles.macroBarFill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  date: {
    marginTop: 2,
    marginBottom: spacing.md,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  calorieNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  macrosSummary: {
    flex: 1,
    gap: spacing.xs,
  },
  macroBarContainer: {
    gap: 4,
  },
  macroBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroBarTrack: {
    height: 6,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  cameraCard: {
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  cameraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cameraIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cameraTextCol: {
    flex: 1,
  },
  aiBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cameraTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cameraButton: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  mealCard: {
    marginBottom: spacing.sm,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  mealHeaderText: {
    flex: 1,
  },
  addButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodList: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    gap: spacing.xs,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
