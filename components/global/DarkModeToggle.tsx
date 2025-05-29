import useDataStore from "@/store/useDataStore";
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const darkMode = useDataStore((state) => state.darkMode);
  const toggleDarkMode = useDataStore((state) => state.toggleDarkMode);

  const iconColor = darkMode ? "#FBBF24" : "#374151";

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {darkMode ? (
        <FaSun size={20} color={iconColor} />
      ) : (
        <FaMoon size={20} color={iconColor} />
      )}
    </button>
  );
};

export default DarkModeToggle;
