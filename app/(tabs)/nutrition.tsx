/**
 * Nutrition — Registro de comidas + resumen de macros diarios.
 */

import React from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card, TitleLarge, TitleSmall, LabelMedium, LabelSmall,
  BodySmall, Caption, ProgressRing, Button,
} from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { Sun, ForkKnife, Moon, Coffee, Plus } from 'phosphor-react-native';
import { mockTodayNutrition } from '@/data/mock';
import type { MealType } from '@/types';

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
  const nutrition = mockTodayNutrition;
  const calorieProgress = Math.min(nutrition.totalCalories / nutrition.calorieTarget, 1);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TitleLarge>Nutrición</TitleLarge>
        <BodySmall color={colors.muted} style={styles.date}>
          Hoy
        </BodySmall>

        {/* Daily Summary Card */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <ProgressRing
              progress={calorieProgress}
              size={100}
              strokeWidth={10}
              color={colors.primary}
            >
              <LabelMedium style={styles.calorieNumber}>
                {nutrition.totalCalories}
              </LabelMedium>
              <Caption>kcal</Caption>
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
        </Card>

        {/* Meals */}
        <TitleSmall style={styles.sectionTitle}>Comidas de hoy</TitleSmall>

        {ALL_MEAL_TYPES.map((mealType) => {
          const meal = nutrition.meals.find(m => m.type === mealType);

          return (
            <Card key={mealType} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealIconContainer}>
                  {React.createElement(MEAL_TYPE_ICONS[mealType], {
                    size: 20,
                    color: colors.primary,
                  })}
                </View>
                <View style={styles.mealHeaderText}>
                  <LabelMedium>{MEAL_TYPE_LABELS[mealType]}</LabelMedium>
                  {meal && (
                    <Caption>{meal.totalCalories} kcal</Caption>
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
                <View style={styles.foodList}>
                  {meal.foods.map((food) => (
                    <View key={food.id} style={styles.foodRow}>
                      <BodySmall style={styles.foodName}>{food.name}</BodySmall>
                      <Caption>{food.calories} kcal</Caption>
                    </View>
                  ))}
                </View>
              )}

              {!meal && (
                <BodySmall color={colors.muted} style={styles.emptyMeal}>
                  Sin registro todavía
                </BodySmall>
              )}
            </Card>
          );
        })}

        {/* Camera CTA */}
        <Button
          title="Analizar comida con foto"
          onPress={() => {}}
          variant="outline"
          style={styles.cameraButton}
          accessibilityLabel="Tomar foto de comida para análisis con IA"
        />

        <View style={{ height: spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
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
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.macroBarContainer}>
      <View style={styles.macroBarHeader}>
        <Caption>{label}</Caption>
        <Caption>{Math.round(current)}/{target}g</Caption>
      </View>
      <View style={styles.macroBarTrack}>
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 115,
  },
  date: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  calorieNumber: {
    fontSize: 20,
  },
  macrosSummary: {
    flex: 1,
    gap: spacing.sm,
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
    backgroundColor: colors.borderLight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  sectionTitle: {
    marginBottom: spacing.md,
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
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  mealHeaderText: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodList: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.xs,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    flex: 1,
  },
  emptyMeal: {
    marginTop: spacing.sm,
  },
  cameraButton: {
    marginTop: spacing.md,
  },
});
