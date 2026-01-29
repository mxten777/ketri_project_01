import { useMemo, useState } from "react";
import LegacyHeader from "./Header.legacy";
import { HeaderContext } from "./HeaderContext";
import { useTheme } from "@/contexts/ThemeContext.core";

export default function HeaderRoot() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Use global theme context instead of local state
  const { isDark, toggleDark } = useTheme();

  const ctx = useMemo(
    () => ({
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      openDropdown,
      setOpenDropdown,
      isDarkMode: isDark,
      setIsDarkMode: () => {}, // deprecated, use toggleDark
      toggleDarkMode: toggleDark,
      isSearchOpen,
      setIsSearchOpen,
    }),
    [isMobileMenuOpen, openDropdown, isDark, toggleDark, isSearchOpen]
  );

  return (
    <HeaderContext.Provider value={ctx}>
      <LegacyHeader />
    </HeaderContext.Provider>
  );
}

