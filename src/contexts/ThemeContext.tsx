import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeType, applyTheme, getStoredTheme, initDarkMode, toggleDarkMode } from "@/config/themes";

interface ThemeContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

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
  }, []);

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

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
