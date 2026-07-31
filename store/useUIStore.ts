/**
 * UI Store — estado de interfaz (modals, sheets, etc.)
 */

import { create } from 'zustand';

interface UIState {
  // Wellness check-in modal
  isWellnessModalOpen: boolean;
  openWellnessModal: () => void;
  closeWellnessModal: () => void;

  // General loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isWellnessModalOpen: false,
  openWellnessModal: () => set({ isWellnessModalOpen: true }),
  closeWellnessModal: () => set({ isWellnessModalOpen: false }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
