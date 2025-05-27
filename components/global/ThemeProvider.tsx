"use client";

import useDataStore from "@/store/useDataStore";
import { useEffect } from "react";

const ThemeProvider = () => {
  const darkMode = useDataStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return null; // no UI needed
};

export default ThemeProvider;
