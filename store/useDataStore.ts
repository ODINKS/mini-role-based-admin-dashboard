import { create } from "zustand";

interface User {
  username: string;
  role: "admin" | "editor" | null;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Store {
  user: User | null;
  posts: Post[];
  darkMode: boolean;
  setUser: (user: User | null) => void;
  setPosts: (posts: Post[]) => void;
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
