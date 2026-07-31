/**
 * Workout & exercise types.
 * Shapes match the Laravel backend's exercise table + AI-generated routines.
 */

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'abs'
  | 'cardio'
  | 'full_body';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  difficulty: Difficulty;
  imageUrl?: string;
  equipment?: string;
}

export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight?: number;       // kg o lb según preferencia del usuario
  rir?: number;          // Reps in Reserve (0-4)
  completed: boolean;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  restSeconds: number;   // Descanso entre sets
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  durationMinutes?: number;
  completed: boolean;
}

/** Rutina semanal generada por IA */
export interface WeeklyPlan {
  id: string;
  weekStartDate: string;
  days: WeeklyPlanDay[];
  splitType: 'ppl' | 'upper_lower' | 'full_body';
}

export interface WeeklyPlanDay {
  dayOfWeek: number;   // 0=domingo, 6=sábado
  name: string;        // ej: "Push Day", "Rest"
  workout?: Workout;
  isRestDay: boolean;
}
