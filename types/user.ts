/**
 * User types — shape que la API real eventualmente devolverá.
 * Por ahora se usan con datos mock.
 */

export type Gender = 'male' | 'female' | 'other';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_endurance';
export type WeightUnit = 'kg' | 'lb';
export type HeightUnit = 'cm' | 'in';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age: number;
  gender: Gender;
  weight: number;
  weightUnit: WeightUnit;
  height: number;
  heightUnit: HeightUnit;
  fitnessLevel: FitnessLevel;
  goal: FitnessGoal;
  dailyCalorieTarget: number;
  macroTargets: MacroTargets;
  createdAt: string;
}

export interface MacroTargets {
  protein: number;  // gramos
  carbs: number;    // gramos
  fats: number;     // gramos
}
