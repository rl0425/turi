export type Provider = 'google' | 'github';

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export interface User {
  id: string;
  email: string;
  avatar_url?: string;
  user_name?: string;
  created_at: string;
} 