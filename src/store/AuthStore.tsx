import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout } from "../services/auth";
export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  address: string;
  phone: string;
  location: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setUser: (user: User) => void;
  users: User[] | null;
  setUsers: (users: User[]) => void;
  updateRole: (id: string, role: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      users: null,

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        logout();
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      setUsers: (users: User[]) => {
        set({ users });
      },
      updateRole: (id: string, role: string) => {
        set((state) => ({
          users: state.users?.map((user) =>
            user._id === id ? { ...user, role } : user
          ),
        }));
      },
    }),
    
    {
      name: "auth-storage", // name of the item in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
