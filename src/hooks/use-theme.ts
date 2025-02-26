"use client";

import { useTheme as useNextTheme } from "next-themes";
export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === "dark",
  };
};
