import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Provider, AuthResponse } from '../types/auth.types';

const supabase = createClientComponentClient();

export const signInWithProvider = async (provider: Provider): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
};

export const getUser = async (): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}; 