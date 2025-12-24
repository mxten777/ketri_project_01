import { useMemo, useState, useCallback } from "react";
import LegacyHeader from "./Header.legacy";
import { HeaderContext } from "./HeaderContext";

export default function HeaderRoot() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
  });

  const toggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", newMode.toString());
  }, [isDarkMode]);

  const ctx = useMemo(
    () => ({ isMobileMenuOpen, setIsMobileMenuOpen, openDropdown, setOpenDropdown, isDarkMode, setIsDarkMode, toggleDarkMode }),
    [isMobileMenuOpen, openDropdown, isDarkMode, toggleDarkMode]
  );

  return (
    <HeaderContext.Provider value={ctx}>
      <LegacyHeader />
    </HeaderContext.Provider>
  );
}

