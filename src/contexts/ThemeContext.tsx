import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { ThemeType, applyTheme, getStoredTheme, getInitialDarkMode, applyDarkMode } from "@/config/themes";
import { ThemeContext } from "./ThemeContext.core";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeType>(getStoredTheme());
  const [isDark, setIsDark] = useState<boolean>(() => getInitialDarkMode());
  const initialized = useRef(false);

  // 초기화 (한 번만 실행)
  useEffect(() => {
    if (!initialized.current) {
      const initialDark = getInitialDarkMode();
      applyDarkMode(initialDark);
      setIsDark(initialDark);
      initialized.current = true;
    }
  }, []);

  // 테마 변경 (다크모드는 건드리지 않음)
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 테마 변경
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  // 다크 모드 토글 (상태, DOM, localStorage 동기 갱신)
  const toggleDark = useCallback(() => {
    setIsDark(prev => {
      const nextDark = !prev;
      // 동일 tick에서 DOM과 localStorage 갱신
      if (nextDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("app-dark-mode", nextDark.toString());
      return nextDark;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Note: `useTheme` is provided from ThemeContext.core to keep this file exporting only the Provider component.
