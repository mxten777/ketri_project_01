import React from "react";

export interface HeaderContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  toggleDarkMode: () => void;
}

export const HeaderContext = React.createContext<HeaderContextType | null>(null);
