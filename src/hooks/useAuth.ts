import create from 'zustand';

interface User {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  role: 'admin' | 'maintainer' | 'viewer';
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: {
    firstName: 'John',
    lastName: 'Doe',
    company: 'CableFlow',
    email: 'john@cableflow.io',
    role: 'admin',
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));