import { create } from "zustand";

interface User {
  name: string;
  username: string;
  email: string;
  mobile: string;
  categories: string[];
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  setCategories: (categories: string[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "",
    username: "",
    email: "",
    mobile: "",
    categories: [],
  },

  setUser: (user) => set({ user }),

  setCategories: (categories) =>
    set((state) => ({
      user: {
        ...state.user,
        categories,
      },
    })),
}));
