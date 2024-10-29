import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdmin: false,
      adminUser: null,

      login: async (email: string, password: string) => {
        // In a real app, validate against admin credentials
        if (email === 'admin@safereport.com' && password === 'admin123') {
          const admin = {
            id: '1',
            name: 'Admin User',
            email,
            role: 'admin' as const,
          };
          set({ adminUser: admin, isAdmin: true });
        } else {
          throw new Error('Invalid admin credentials');
        }
      },

      logout: () => {
        set({ adminUser: null, isAdmin: false });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);