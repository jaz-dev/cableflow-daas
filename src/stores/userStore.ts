import { create } from 'zustand';
import { usersApi, User } from '../api/users';

interface UserStore {
  user: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUser: (token: string) => Promise<void>;
  fetchAllUsers: (token: string) => Promise<void>;
  updateUser: (token: string, updates: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],
  isLoading: false,
  error: null,

  fetchUser: async (token) => {
    try {
      const user = await usersApi.fetchUser(token);
      set({ user: user});
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
    try {
      const updatedUser = await usersApi.updateUser(token, updates);
      set({
        user: updatedUser,
        isLoading: false
      });
      return updatedUser;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      console.error('Error updating user:', error);
      throw error;
    }
  },
}));