import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { MENU_ITEMS, MenuGroup } from "../../constants/menu";
import HeaderMegaMenu from "./HeaderMegaMenu";
import HeaderGlobal from "./HeaderGlobal";
import { HeaderContext } from "./HeaderContext";

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
      {/* ✅ fixed + full width */}
      <header id="site-header" className="fixed top-0 left-0 right-0 z-50">
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

            <div className="flex items-center justify-between h-[84px]">
              <Link to="/" className="flex items-center py-3 hover:opacity-90 transition-opacity">
                <img
                  src={isDarkMode ? "/images/logo_horizontal_trans.png" : "/images/logo_horizontal.png"}
                  alt="한국환경안전연구소"
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

                      <HeaderMegaMenu
                        menu={menu}
                        isOpen={openDropdown === menu.label}
                        location={location}
                        onMouseEnter={handleMouseEnter}
                      />
                    </div>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2 md:gap-3">
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
                    setIsMobileMenuOpen((v) => !v);
                  }}
                  type="button"
                  className="lg:hidden p-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                  aria-label="메뉴"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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

          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {MENU_ITEMS.map((menu, idx) => (
              <AccordionMenuGroup
                key={menu.label}
                menu={menu}
                isLast={idx === MENU_ITEMS.length - 1}
                onCloseMenu={() => setIsMobileMenuOpen(false)}
              />
            ))}
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
