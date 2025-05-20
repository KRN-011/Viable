"use client";

import { useTheme } from "@/lib/theme/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-background-secondary hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FaMoon className="w-5 h-5 text-text-secondary" />
      ) : (
        <FaSun className="w-5 h-5 text-text-secondary" />
      )}
    </button>
  );
}
