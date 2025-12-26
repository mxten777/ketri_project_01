import { useState, useEffect, ReactNode } from "react";
import { ThemeType, applyTheme, getStoredTheme, initDarkMode, toggleDarkMode } from "@/config/themes";
import { ThemeContext } from "./ThemeContext.core";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeType>(getStoredTheme());
  const [isDark, setIsDark] = useState(false);

  // 테마 초기화
  useEffect(() => {
    applyTheme(theme);
    initDarkMode();
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [theme]);

  // 테마 변경
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  // 다크 모드 토글
  const toggleDark = () => {
    toggleDarkMode();
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Note: `useTheme` is provided from ThemeContext.core to keep this file exporting only the Provider component.
