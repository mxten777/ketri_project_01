import { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { MENU_ITEMS, MenuGroup } from "../../constants/menu";
import HeaderGlobal from "./HeaderGlobal";
import HeaderHero from "./HeaderHero";
import HeaderMegaMenu from "./HeaderMegaMenu";
import { HeaderContext } from "./HeaderContext";
import { isAllowed } from "../../constants/menuFilter";
import QuickJumpSearch from "../common/QuickJumpSearch";

interface AccordionMenuGroupProps {
  menu: MenuGroup;
  isLast: boolean;
  onCloseMenu: () => void;
}

function AccordionMenuGroup({ menu, isLast, onCloseMenu }: AccordionMenuGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-1">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-primary-700 dark:text-primary-300 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-xl transition-all"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`menu-group-${menu.label}`}
        type="button"
      >
        <span>{menu.label}</span>
        <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={`menu-group-${menu.label}`}
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-transparent`}
      >
        <ul className="pl-4 pr-2 py-1 space-y-1">
          {menu.items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block px-4 py-2 text-[15px] font-normal text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-200 rounded-lg transition-all duration-150 active:scale-[0.98]"
                onClick={onCloseMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {!isLast && <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2 mx-4" />}
    </div>
  );
}

const Header = () => {
  const location = useLocation();

  const ctx = useContext(HeaderContext);

  const menuRefs = useRef<Record<string, HTMLElement | null>>({});

  // local fallbacks when HeaderContext is not provided
  const [isMobileMenuOpenLocal, setIsMobileMenuOpenLocal] = useState(false);
  const [openDropdownLocal, setOpenDropdownLocal] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isDarkModeLocal, setIsDarkModeLocal] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
  });

  const isMobileMenuOpen = ctx?.isMobileMenuOpen ?? isMobileMenuOpenLocal;
  const setIsMobileMenuOpen = ctx?.setIsMobileMenuOpen ?? setIsMobileMenuOpenLocal;

  const openDropdown = ctx?.openDropdown ?? openDropdownLocal;
  const setOpenDropdown = ctx?.setOpenDropdown ?? setOpenDropdownLocal;

  const isDarkMode = ctx?.isDarkMode ?? isDarkModeLocal;
  const setIsDarkMode = ctx?.setIsDarkMode ?? setIsDarkModeLocal;

  const handleMouseEnter = (menuLabel: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(menuLabel);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
    setCloseTimeout(timeout);
  };

  // Clear any pending close timeout on unmount to avoid side-effects
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const toggleDarkMode = () => {
    if (ctx?.toggleDarkMode) return ctx.toggleDarkMode();

    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("darkMode", newMode.toString());
  };

  const isMenuActive = (menu: MenuGroup) => {
    return menu.items.some(
      (it) => location.pathname === it.path || location.pathname.startsWith(it.path + "/")
    );
  };

  return (
    <>
      {/* ✅ sticky + full width (use CSS variable z-index) */}
      <header id="site-header" className="sticky top-0 left-0 right-0 z-[var(--z-fixed)]">
        <div
          className={[
            "relative",
            openDropdown ? "bg-white dark:bg-neutral-900" : "bg-white/10 dark:bg-neutral-950/30",
            "backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60",
          ].join(" ")}
        >
          <div className="absolute inset-0 pointer-events-none shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_44px_rgba(0,0,0,0.45)]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HeaderGlobal />

            <HeaderHero
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={(v) => setIsMobileMenuOpen(v)}
              menuRefs={menuRefs}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              isMenuActive={isMenuActive}
            />
          </div>
        </div>
      </header>

      {/* Render mega menus as portals so they escape stacking context */}
      {/* Single consolidated mega menu for stable hover behavior */}
      <HeaderMegaMenu
        menus={MENU_ITEMS}
        activeGroup={openDropdown}
        isOpen={!!openDropdown}
        location={location}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        anchorEl={openDropdown ? menuRefs.current[openDropdown] : null}
      />

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-white/95 dark:bg-neutral-950/92 backdrop-blur-md flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-lg font-bold text-primary-700 dark:text-primary-300">메뉴</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="메뉴 닫기"
              type="button"
            >
              <X className="w-7 h-7 text-neutral-800 dark:text-neutral-200" />
            </button>
          </div>

          <QuickJumpSearch mobile />

          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {MENU_ITEMS.map((menu, idx) => {
              const filteredItems = menu.items.filter((it) => isAllowed(it.path));
              // skip empty groups entirely
              if (filteredItems.length === 0) return null;
              const group = { ...menu, items: filteredItems };
              // also hide mainPath if it's not allowed
              if (group.mainPath && !isAllowed(group.mainPath)) delete group.mainPath;

              return (
                <AccordionMenuGroup
                  key={menu.label}
                  menu={group}
                  isLast={idx === MENU_ITEMS.length - 1}
                  onCloseMenu={() => setIsMobileMenuOpen(false)}
                />
              );
            })}
          </nav>

          <div className="px-6 pb-6 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              빠른 문의: {" "}
              <a className="text-primary-800 dark:text-primary-200" href="tel:043-237-7824">
                043-237-7824
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
