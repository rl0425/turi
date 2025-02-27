import { create } from 'zustand';
import { User } from '../types/auth.types';
import { signInWithProvider } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (provider: 'google' | 'github') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  signIn: async (provider) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await signInWithProvider(provider);
      if (error) throw error;
      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
})); 