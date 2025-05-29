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
  justLoggedOut: boolean;
  setUser: (user: User | null) => void;
  setPosts: (posts: Post[]) => void;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  setJustLoggedOut: (val: boolean) => void;
}

const useDataStore = create<Store>((set) => ({
  user: null,
  posts: [],
  darkMode: false, // default false here
  justLoggedOut: false,
  setUser: (user) => set(() => ({ user })),
  setPosts: (posts) => set(() => ({ posts })),
  setDarkMode: (val) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", val.toString());
    }
    set(() => ({ darkMode: val }));
  },
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", newDarkMode.toString());
      }
      return { darkMode: newDarkMode };
    }),
  setJustLoggedOut: (val) => set(() => ({ justLoggedOut: val })),
}));

export default useDataStore;
