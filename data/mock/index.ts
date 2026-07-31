/**
 * Mock data — datos de prueba tipados.
 * Mismo shape que la API real de Laravel eventualmente devolverá.
 * TODO: reemplazar con llamadas fetch reales cuando se conecte el backend.
 */

import type { UserProfile, DailyNutrition, Meal, WellnessCheckin, Workout, Exercise, WeeklyPlan } from '@/types';

// ─── USER ──────────────────────────────────────────────────────
export const mockUser: UserProfile = {
  id: '1',
  name: 'Ana',
  email: 'ana@example.com',
  age: 28,
  gender: 'female',
  weight: 62,
  weightUnit: 'kg',
  height: 165,
  heightUnit: 'cm',
  fitnessLevel: 'intermediate',
  goal: 'gain_muscle',
  dailyCalorieTarget: 2100,
  macroTargets: {
    protein: 130,
    carbs: 230,
    fats: 70,
  },
  createdAt: '2026-01-15T10:00:00Z',
};

// ─── WELLNESS ──────────────────────────────────────────────────
export const mockTodayWellness: WellnessCheckin = {
  id: 'w1',
  date: new Date().toISOString().split('T')[0],
  energy: 4,
  sleepHours: 7.5,
  stress: 2,
  mood: 'good',
};

export const mockWellnessHistory: WellnessCheckin[] = [
  { id: 'w7', date: '2026-07-24', energy: 3, sleepHours: 6.5, stress: 3, mood: 'neutral' },
  { id: 'w6', date: '2026-07-25', energy: 4, sleepHours: 7, stress: 2, mood: 'good' },
  { id: 'w5', date: '2026-07-26', energy: 3, sleepHours: 6, stress: 4, mood: 'sad' },
  { id: 'w4', date: '2026-07-27', energy: 5, sleepHours: 8, stress: 1, mood: 'excellent' },
  { id: 'w3', date: '2026-07-28', energy: 4, sleepHours: 7.5, stress: 2, mood: 'good' },
  { id: 'w2', date: '2026-07-29', energy: 3, sleepHours: 7, stress: 3, mood: 'neutral' },
  mockTodayWellness,
];

// ─── EXERCISES (from Laravel DB) ───────────────────────────────
export const mockExercises: Exercise[] = [
  {
    id: 'e1',
    name: 'Press de banca',
    description: 'Acostado en banco plano, baja la barra al pecho y empuja hacia arriba.',
    muscleGroup: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    difficulty: 'intermediate',
    equipment: 'Barra y banco',
  },
  {
    id: 'e2',
    name: 'Sentadilla',
    description: 'Con barra en la espalda, flexiona rodillas hasta que los muslos estén paralelos al piso.',
    muscleGroup: 'legs',
    secondaryMuscles: ['glutes', 'abs'],
    difficulty: 'intermediate',
    equipment: 'Barra y rack',
  },
  {
    id: 'e3',
    name: 'Peso muerto',
    description: 'Levanta la barra del suelo manteniendo la espalda recta.',
    muscleGroup: 'back',
    secondaryMuscles: ['legs', 'glutes'],
    difficulty: 'advanced',
    equipment: 'Barra',
  },
  {
    id: 'e4',
    name: 'Press militar',
    description: 'De pie, empuja la barra por encima de la cabeza.',
    muscleGroup: 'shoulders',
    secondaryMuscles: ['triceps'],
    difficulty: 'intermediate',
    equipment: 'Barra',
  },
  {
    id: 'e5',
    name: 'Dominadas',
    description: 'Cuelga de una barra y sube el cuerpo hasta que la barbilla pase la barra.',
    muscleGroup: 'back',
    secondaryMuscles: ['biceps'],
    difficulty: 'advanced',
    equipment: 'Barra de dominadas',
  },
  {
    id: 'e6',
    name: 'Curl de bíceps',
    description: 'Con mancuernas, flexiona los codos para subir el peso.',
    muscleGroup: 'biceps',
    difficulty: 'beginner',
    equipment: 'Mancuernas',
  },
  {
    id: 'e7',
    name: 'Extensión de tríceps',
    description: 'Con mancuerna sobre la cabeza, extiende el codo para subir el peso.',
    muscleGroup: 'triceps',
    difficulty: 'beginner',
    equipment: 'Mancuerna',
  },
  {
    id: 'e8',
    name: 'Hip thrust',
    description: 'Con la espalda apoyada en un banco, empuja la cadera hacia arriba con barra.',
    muscleGroup: 'glutes',
    secondaryMuscles: ['legs'],
    difficulty: 'intermediate',
    equipment: 'Barra y banco',
  },
  {
    id: 'e9',
    name: 'Plancha',
    description: 'Mantén el cuerpo recto apoyado en antebrazos y puntas de los pies.',
    muscleGroup: 'abs',
    difficulty: 'beginner',
    equipment: 'Ninguno',
  },
  {
    id: 'e10',
    name: 'Remo con barra',
    description: 'Inclinado hacia adelante, jala la barra hacia el abdomen.',
    muscleGroup: 'back',
    secondaryMuscles: ['biceps'],
    difficulty: 'intermediate',
    equipment: 'Barra',
  },
];

// ─── TODAY'S WORKOUT ───────────────────────────────────────────
export const mockTodayWorkout: Workout = {
  id: 'wo1',
  name: 'Push Day — Pecho y Tríceps',
  date: new Date().toISOString().split('T')[0],
  completed: false,
  exercises: [
    {
      exercise: mockExercises[0], // Press de banca
      sets: [
        { setNumber: 1, reps: 10, weight: 40, rir: 3, completed: false },
        { setNumber: 2, reps: 10, weight: 40, rir: 2, completed: false },
        { setNumber: 3, reps: 8, weight: 42.5, rir: 1, completed: false },
      ],
      restSeconds: 120,
    },
    {
      exercise: mockExercises[3], // Press militar
      sets: [
        { setNumber: 1, reps: 10, weight: 25, rir: 3, completed: false },
        { setNumber: 2, reps: 10, weight: 25, rir: 2, completed: false },
        { setNumber: 3, reps: 8, weight: 27.5, rir: 1, completed: false },
      ],
      restSeconds: 90,
    },
    {
      exercise: mockExercises[6], // Extensión de tríceps
      sets: [
        { setNumber: 1, reps: 12, weight: 10, rir: 3, completed: false },
        { setNumber: 2, reps: 12, weight: 10, rir: 2, completed: false },
        { setNumber: 3, reps: 10, weight: 12, rir: 1, completed: false },
      ],
      restSeconds: 60,
    },
  ],
};

// ─── NUTRITION ─────────────────────────────────────────────────
export const mockTodayNutrition: DailyNutrition = {
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: 'm1',
      type: 'breakfast',
      date: new Date().toISOString().split('T')[0],
      foods: [
        { id: 'f1', name: 'Avena con leche', calories: 350, protein: 12, carbs: 55, fats: 8, servingSize: '1 tazón' },
        { id: 'f2', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4, servingSize: '1 unidad' },
      ],
      totalCalories: 455,
      totalProtein: 13.3,
      totalCarbs: 82,
      totalFats: 8.4,
    },
    {
      id: 'm2',
      type: 'lunch',
      date: new Date().toISOString().split('T')[0],
      foods: [
        { id: 'f3', name: 'Pollo a la plancha', calories: 280, protein: 42, carbs: 0, fats: 12, servingSize: '200g' },
        { id: 'f4', name: 'Arroz integral', calories: 220, protein: 5, carbs: 45, fats: 2, servingSize: '1 taza' },
        { id: 'f5', name: 'Ensalada mixta', calories: 80, protein: 3, carbs: 10, fats: 3, servingSize: '1 porción' },
      ],
      totalCalories: 580,
      totalProtein: 50,
      totalCarbs: 55,
      totalFats: 17,
    },
  ],
  totalCalories: 1035,
  totalProtein: 63.3,
  totalCarbs: 137,
  totalFats: 25.4,
  calorieTarget: 2100,
  proteinTarget: 130,
  carbsTarget: 230,
  fatsTarget: 70,
};

// ─── WEEKLY ACTIVITY (for mini chart) ──────────────────────────
export const mockWeeklyActivity = [
  { day: 'L', minutes: 45, completed: true },
  { day: 'M', minutes: 60, completed: true },
  { day: 'X', minutes: 0, completed: false },
  { day: 'J', minutes: 50, completed: true },
  { day: 'V', minutes: 0, completed: false },
  { day: 'S', minutes: 30, completed: true },
  { day: 'D', minutes: 0, completed: false },
];

// ─── WEIGHT HISTORY (for progress chart) ───────────────────────
export const mockWeightHistory = [
  { date: '2026-06-01', weight: 65 },
  { date: '2026-06-08', weight: 64.5 },
  { date: '2026-06-15', weight: 64.2 },
  { date: '2026-06-22', weight: 63.8 },
  { date: '2026-06-29', weight: 63.5 },
  { date: '2026-07-06', weight: 63.1 },
  { date: '2026-07-13', weight: 62.8 },
  { date: '2026-07-20', weight: 62.5 },
  { date: '2026-07-27', weight: 62 },
];
