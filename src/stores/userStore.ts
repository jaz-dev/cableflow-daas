import { create } from 'zustand';
import { usersApi, User } from '../api/users';

interface UserStore {
  curentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUser: (token: string) => Promise<void>;
  fetchAllUsers: (token: string) => Promise<void>;
  updateUser: (token: string, updates: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  curentUser: null,
  users: [],
  isLoading: false,
  error: null,

  fetchUser: async (token) => {
    try {
      const user = await usersApi.fetchUser(token);
      set({ curentUser: user});
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error fetching user:', error);
    }
  },

  fetchAllUsers: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const users = await usersApi.fetchAllUsers(token);
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error fetching users:', error);
    }
  },

  updateUser: async (token, updates) => {
    set({ isLoading: true, error: null });
  },
}));