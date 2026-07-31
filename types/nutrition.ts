/**
 * Nutrition types — comidas, alimentos, macros diarios.
 */

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;   // gramos
  carbs: number;     // gramos
  fats: number;      // gramos
  servingSize: string; // ej: "100g", "1 unidad"
  imageUrl?: string;
  isAIEstimated?: boolean; // true si vino de análisis de foto
}

export interface Meal {
  id: string;
  type: MealType;
  date: string;
  foods: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface DailyNutrition {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
}

export interface NutritionTrend {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
