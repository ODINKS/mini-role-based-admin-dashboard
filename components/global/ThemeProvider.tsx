"use client";
import { useEffect, useState } from "react";
import useDataStore from "@/store/useDataStore";

const ThemeProvider = () => {
  const darkMode = useDataStore((state) => state.darkMode);
  const [hydrated, setHydrated] = useState(false);

  // On mount, check localStorage and update Zustand state accordingly
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      useDataStore.getState().toggleDarkMode(); 
    }
    setHydrated(true);
  }, []);

  // Add or remove dark class after hydration
  useEffect(() => {
    if (!hydrated) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, hydrated]);

  return null;
};

export default ThemeProvider;
