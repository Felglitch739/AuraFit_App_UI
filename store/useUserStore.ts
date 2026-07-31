import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MoodType } from '@/types';

export interface UserProfile {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  weight: string;
  height: string;
  goal: 'maintenance' | 'muscle' | 'recomposition' | 'weight_loss' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete' | '';
  sports: string[];
  wantsAiRoutine: boolean | null;
}

export interface WellnessData {
  energy: number;
  sleepHours: number;
  stress: number;
  mood: MoodType;
  lastCheckinDate: string | null;
}

export type ThemeMode = 'dark' | 'light';

interface UserState {
  isOnboarded: boolean;
  themeMode: ThemeMode;
  profile: UserProfile;
  wellness: WellnessData;
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  completeOnboarding: (profileData: Partial<UserProfile>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  submitDailyCheckin: (data: Omit<WellnessData, 'lastCheckinDate'>) => void;
  resetApp: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  goal: '',
  activityLevel: '',
  sports: [],
  wantsAiRoutine: null,
};

const defaultWellness: WellnessData = {
  energy: 3,
  sleepHours: 7,
  stress: 3,
  mood: 'neutral',
  lastCheckinDate: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      themeMode: 'dark',
      profile: defaultProfile,
      wellness: defaultWellness,

      setThemeMode: (mode) => set({ themeMode: mode }),

      toggleThemeMode: () =>
        set((state) => ({
          themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
        })),

      completeOnboarding: (profileData) =>
        set((state) => ({
          isOnboarded: true,
          profile: { ...state.profile, ...profileData },
        })),

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      submitDailyCheckin: (data) =>
        set((state) => ({
          wellness: {
            ...data,
            lastCheckinDate: new Date().toISOString().split('T')[0],
          },
        })),

      resetApp: () =>
        set(() => ({
          isOnboarded: false,
          themeMode: 'dark',
          profile: defaultProfile,
          wellness: defaultWellness,
        })),
    }),
    {
      name: 'aurafit-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
