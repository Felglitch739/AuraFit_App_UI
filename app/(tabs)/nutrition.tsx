import React from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MeshBackground, GlassCard, LabelMedium,
  BodySmall, Caption, ProgressRing, AnimatedCountUp, StaggerView,
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
          <StaggerView index={0}>
            <Text style={[styles.largeTitle, { color: colors.foreground }]}>Nutrición</Text>
            <BodySmall style={[styles.date, { color: colors.muted }]}>
              Hoy
            </BodySmall>
          </StaggerView>

          {/* Daily Summary Card */}
          <StaggerView index={1}>
            <GlassCard level="hero" glowColor="#3B82F6" style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ProgressRing
                  progress={calorieProgress}
                  size={116}
                  strokeWidth={14}
                  gradientColors={['#00F2FE', '#3B82F6']}
                >
                  <AnimatedCountUp
                    value={nutrition.totalCalories}
                    duration={1200}
                    style={[styles.calorieNumber, { color: colors.foreground }]}
                  />
                  <Caption style={{ color: colors.muted, fontWeight: '700' }}>
                    / {nutrition.calorieTarget} kcal
                  </Caption>
                </ProgressRing>

                <View style={styles.macrosSummary}>
                  <MacroBar
                    label="Proteína"
                    current={nutrition.totalProtein}
                    target={nutrition.proteinTarget}
                    color="#3B82F6"
                  />
                  <MacroBar
                    label="Carbos"
                    current={nutrition.totalCarbs}
                    target={nutrition.carbsTarget}
                    color="#F97316"
                  />
                  <MacroBar
                    label="Grasas"
                    current={nutrition.totalFats}
                    target={nutrition.fatsTarget}
                    color="#A855F7"
                  />
                </View>
              </View>
            </GlassCard>
          </StaggerView>

          {/* AI Camera Meal Scanner — Tarjeta unificada interactiva */}
          <StaggerView index={2}>
            <GlassCard
              level="hero"
              glowColor="#3B82F6"
              onPress={() => {}}
              style={[
                styles.cameraCard,
                {
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)',
                },
              ]}
            >
              <View style={styles.cameraRow}>
                <View
                  style={[
                    styles.cameraIconContainer,
                    {
                      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.22)' : 'rgba(59, 130, 246, 0.14)',
                    },
                  ]}
                >
                  <Camera size={24} color="#3B82F6" weight="fill" />
                </View>
                <View style={styles.cameraTextCol}>
                  <View style={styles.aiBadgeRow}>
                    <Sparkle size={13} color="#3B82F6" weight="fill" />
                    <Text style={[styles.aiBadgeText, { color: '#3B82F6' }]}>RECONOCIMIENTO IA</Text>
                  </View>
                  <Text style={[styles.cameraTitle, { color: colors.foreground }]}>Analizar comida con foto</Text>
                  <Caption style={{ color: colors.muted }}>Toca para escanear plato y calcular macros</Caption>
                </View>
                <View style={[styles.cameraActionBadge, { backgroundColor: '#3B82F6' }]}>
                  <Camera size={18} color="#FFFFFF" weight="fill" />
                </View>
              </View>
            </GlassCard>
          </StaggerView>

          {/* Meals Header */}
          <StaggerView index={3}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Comidas de hoy</Text>
          </StaggerView>

          {/* Meals */}
          {ALL_MEAL_TYPES.map((mealType, i) => {
            const meal = nutrition.meals.find(m => m.type === mealType);
            const mealGlowColors: Record<MealType, string> = {
              breakfast: '#F97316',
              lunch: '#3B82F6',
              dinner: '#A855F7',
              snack: '#10B981',
            };

            return (
              <StaggerView key={mealType} index={4 + i}>
                <GlassCard
                  level="medium"
                  glowColor={mealGlowColors[mealType]}
                  style={styles.mealCard}
                  onPress={() => {}}
                >
                  <View style={styles.mealHeader}>
                    <View style={[styles.mealIconContainer, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F2F2F7' }]}>
                      {React.createElement(MEAL_TYPE_ICONS[mealType], {
                        size: 19,
                        color: mealGlowColors[mealType],
                        weight: 'fill',
                      })}
                    </View>
                    <View style={styles.mealHeaderText}>
                      <LabelMedium style={{ color: colors.foreground, fontWeight: '800' }}>
                        {MEAL_TYPE_LABELS[mealType]}
                      </LabelMedium>
                      {meal && (
                        <Caption style={{ color: colors.muted, fontWeight: '600' }}>{meal.totalCalories} kcal</Caption>
                      )}
                    </View>
                    <Pressable
                      style={styles.addButton}
                      accessibilityLabel={`Agregar ${MEAL_TYPE_LABELS[mealType]}`}
                      accessibilityRole="button"
                    >
                      <Plus size={20} color={mealGlowColors[mealType]} weight="bold" />
                    </Pressable>
                  </View>

                  {meal && meal.foods.length > 0 && (
                    <View style={[styles.foodList, { borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }]}>
                      {meal.foods.map((food) => (
                        <View key={food.id} style={styles.foodRow}>
                          <BodySmall style={{ flex: 1, color: colors.foreground, fontWeight: '600' }}>
                            {food.name}
                          </BodySmall>
                          <Caption style={{ color: colors.muted, fontWeight: '700' }}>{food.calories} kcal</Caption>
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
              </StaggerView>
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
        <Caption style={{ color: colors.muted, fontWeight: '600' }}>{label}</Caption>
        <Caption style={{ color: colors.foreground, fontWeight: '800' }}>
          {Math.round(current)}/{target}g
        </Caption>
      </View>
      <View style={[styles.macroBarTrack, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.10)' : '#E5E5EA' }]}>
        <View
          style={[
            styles.macroBarFill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        >
          {/* 3D Specular Highlight en la barra de macro */}
          <View style={styles.macroHighlight} />
        </View>
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
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  date: {
    marginTop: 2,
    marginBottom: spacing.md,
  },
  summaryCard: {
    marginBottom: spacing.md,
    paddingVertical: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  calorieNumber: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  macrosSummary: {
    flex: 1,
    gap: spacing.xs + 2,
  },
  macroBarContainer: {
    gap: 4,
  },
  macroBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroBarTrack: {
    height: 9,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: radius.full,
    position: 'relative',
  },
  macroHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderTopLeftRadius: radius.full,
    borderTopRightRadius: radius.full,
  },
  cameraCard: {
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  cameraRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cameraTextCol: {
    flex: 1,
    paddingRight: spacing.xs,
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
  cameraActionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.sm,
    letterSpacing: -0.4,
  },
  mealCard: {
    marginBottom: spacing.sm + 2,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIconContainer: {
    width: 38,
    height: 38,
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

