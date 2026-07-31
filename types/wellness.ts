/**
 * Wellness check-in types.
 */

export type MoodType = 'excellent' | 'good' | 'neutral' | 'sad' | 'stressed';

export interface WellnessCheckin {
  id: string;
  date: string; // ISO date string
  energy: number;   // 1-5
  sleepHours: number;
  stress: number;   // 1-5
  mood: MoodType;
  notes?: string;
}

export interface WellnessTrend {
  date: string;
  energy: number;
  sleepHours: number;
  stress: number;
}
