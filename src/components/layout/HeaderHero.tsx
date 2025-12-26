import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import QuickJumpSearch from "../common/QuickJumpSearch";
import { MENU_ITEMS, MenuGroup } from "../../constants/menu";

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  menuRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  handleMouseEnter: (label: string) => void;
  handleMouseLeave: () => void;
  isMenuActive: (menu: MenuGroup) => boolean;
}

export default function HeaderHero({
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  menuRefs,
  handleMouseEnter,
  handleMouseLeave,
  isMenuActive,
}: Props) {
  return (
    <div className="flex items-center justify-between" style={{ height: "var(--app-header-h, 84px)" }}>
      <Link to="/" className="flex items-center py-2 hover:opacity-90 transition-opacity">
        <img
          src={isDarkMode ? "/images/logo_horizontal_trans.png" : "/images/logo_horizontal.png"}
          alt="한국환경안전연구소"
          width={200}
          height={48}
          className="h-12 md:h-14 w-auto object-contain"
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-1">
        {MENU_ITEMS.map((menu) => {
          const active = isMenuActive(menu);

          return (
            <div
              key={menu.label}
              className="relative"
              ref={(el) => (menuRefs.current[menu.label] = el)}
              onMouseEnter={() => handleMouseEnter(menu.label)}
              onMouseLeave={handleMouseLeave}
            >
              {menu.mainPath ? (
                <Link
                  to={menu.mainPath}
                  className={[
                    "relative px-4 py-2 rounded-xl text-[15px] font-medium whitespace-nowrap flex items-center gap-1",
                    "transition-all duration-200",
                    "text-neutral-700 dark:text-white hover:text-primary-800 dark:hover:text-primary-200",
                    "hover:bg-neutral-50 dark:hover:bg-white/5",
                    active
                      ? "text-primary-800 dark:text-primary-200 bg-primary-50/60 dark:bg-primary-900/10"
                      : "",
                  ].join(" ")}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  <span
                    className={[
                      "absolute left-3 right-3 bottom-[6px] h-[2px] rounded-full",
                      "bg-primary-600/70",
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50",
                      "transition-all duration-200",
                    ].join(" ")}
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  className={[
                    "relative px-4 py-2 rounded-xl text-[15px] font-medium whitespace-nowrap flex items-center gap-1",
                    "transition-all duration-200",
                    "text-neutral-700 dark:text-white hover:text-primary-800 dark:hover:text-primary-200",
                    "hover:bg-neutral-50 dark:hover:bg-white/5",
                    active
                      ? "text-primary-800 dark:text-primary-200 bg-primary-50/60 dark:bg-primary-900/10"
                      : "",
                  ].join(" ")}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  <span
                    className={[
                      "absolute left-3 right-3 bottom-[6px] h-[2px] rounded-full",
                      "bg-primary-600/70",
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50",
                      "transition-all duration-200",
                    ].join(" ")}
                  />
                </button>
              )}

              {/* Mega menu portal will render based on anchor (provided by parent) */}
              {/* HeaderHero intentionally doesn't render the portal itself */}
            </div>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:block">
          <QuickJumpSearch />
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-primary-800 dark:hover:text-primary-200 hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
          aria-label="다크모드 토글"
          type="button"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          type="button"
          className="lg:hidden p-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
          aria-label="메뉴"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}

