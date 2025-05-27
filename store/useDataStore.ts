import { create } from "zustand";

interface User {
  username: string;
  role: "admin" | "editor" | null;
}

interface Store {
  user: User | null;
  posts: unknown[];
  darkMode: boolean;
  setUser: (user: User | null) => void;
  setPosts: (posts: unknown[]) => void;
  toggleDarkMode: () => void;
}

const useDataStore = create<Store>((set) => ({
  user: null,
  posts: [],
  darkMode: false,
  setUser: (user) => set(() => ({ user })),
  setPosts: (posts) => set(() => ({ posts })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useDataStore;
