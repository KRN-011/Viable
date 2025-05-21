import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, themeConfig } from "./theme.config";

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // Check system preference
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme CSS variables
    const themeTokens = themeConfig[theme];

    Object.entries(themeTokens.colors.primary).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--color-primary-${key}`,
        value,
      );
    });

    Object.entries(themeTokens.colors.background).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--background-${key}`, value);
    });

    Object.entries(themeTokens.colors.text).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--text-${key}`, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
