import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      checkAuth: () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          set({ user: JSON.parse(storedUser), isAuthenticated: true });
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          // In a real app, this would be an API call
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ user, isAuthenticated: true });
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        try {
          // In a real app, this would be an API call
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
          };
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ user, isAuthenticated: true });
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);