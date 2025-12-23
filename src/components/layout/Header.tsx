import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { MENU_ITEMS, MenuGroup } from "../../constants/menu";

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
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} bg-transparent`}
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
  });

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
    }, 1000);
    setCloseTimeout(timeout);
  };

  const toggleDarkMode = () => {
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`relative ${openDropdown ? 'bg-white dark:bg-neutral-900' : 'bg-white/10 dark:bg-neutral-950/30'} backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60`}
        >
          {/* 헤어라인 제거: 히어로와 겹칠 때 보이는 미세 선 제거 */}
          <div className="absolute inset-0 pointer-events-none shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_44px_rgba(0,0,0,0.45)]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* 유틸 바 (md+) => 높이 40px */}
            <div className="hidden md:flex items-center justify-end h-10">
              <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                <Link
                  to="/about/location"
                  className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  오시는 길
                </Link>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <a
                  href="tel:043-237-7624"
                  className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  📞 043-237-7624
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <a
                  href="mailto:contact@ketri.re.kr"
                  className="hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  이메일 문의
                </a>
              </div>
            </div>

            {/* 메인 헤더 => 모바일 84px, 데스크탑 84px */}
            <div className="flex items-center justify-between h-[84px]">
              {/* 로고 */}
              <Link to="/" className="flex items-center py-3 hover:opacity-90 transition-opacity">
                <img
                  src={isDarkMode ? "/images/logo_horizontal_trans.png" : "/images/logo_horizontal.png"}
                  alt="한국환경안전연구소"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </Link>

              {/* PC 메뉴 (lg+) */}
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
                      <button
                        type="button"
                        className={[
                          "relative px-4 py-2 rounded-xl text-[15px] font-medium whitespace-nowrap flex items-center gap-1",
                          "transition-all duration-200",
                          "text-neutral-700 dark:text-white hover:text-primary-700 dark:hover:text-primary-200",
                          "hover:bg-neutral-50 dark:hover:bg-white/5",
                          active ? "text-primary-700 dark:text-primary-200 bg-primary-50/60 dark:bg-primary-900/10" : "",
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

                      {openDropdown === menu.label && (
                        <div>
                          {/* invisible bridge to prevent cursor gap between button and dropdown */}
                          <div
                            className="absolute left-0 top-[calc(100%-24px)] w-full h-8 z-[89] pointer-events-auto"
                            onMouseEnter={() => handleMouseEnter(menu.label)}
                          />
                          <div
                            className="absolute left-0 top-[calc(100%-12px)] w-72 z-[90]"
                            onMouseEnter={() => handleMouseEnter(menu.label)}
                            onMouseLeave={handleMouseLeave}
                            style={{ pointerEvents: 'auto' }}
                          >
                          <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-700/90 bg-white dark:bg-neutral-900 backdrop-blur-md shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.55)] overflow-hidden">
                            <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700/80">
                              <div className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-200">
                                {menu.label}
                              </div>
                              <div className="text-[12px] text-neutral-500 dark:text-neutral-400">
                                관련 메뉴 바로가기
                              </div>
                            </div>
                            <div className="py-2">
                              {menu.items.map((item) => {
                                const itemActive =
                                  location.pathname === item.path ||
                                  location.pathname.startsWith(item.path.split('#')[0] + "/");
                                const hasHash = item.path.includes('#');
                                const Component = hasHash ? 'a' : Link;
                                const linkProps = hasHash ? { href: item.path } : { to: item.path };
                                
                                return (
                                  <Component
                                    key={item.path}
                                    {...linkProps}
                                    className={[
                                      "group block px-5 py-3 text-[14px] rounded-xl mx-2",
                                      "transition-all duration-150",
                                      itemActive
                                        ? "bg-primary-50 dark:bg-primary-900/15 text-primary-700 dark:text-primary-200"
                                          : "text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-primary-700 dark:hover:text-primary-200",
                                    ].join(" ")}
                                    onClick={() => setTimeout(() => setOpenDropdown(null), 150)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="group-hover:translate-x-[2px] transition-transform">
                                        {item.label}
                                      </span>
                                      <span className="text-[12px] text-neutral-400 dark:text-neutral-500">›</span>
                                    </div>
                                  </Component>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* 우측 아이콘 */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-200 hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
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
                  className="lg:hidden p-2.5 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                  aria-label="메뉴"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
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
              <X className="w-7 h-7 text-neutral-700 dark:text-neutral-200" />
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
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              빠른 문의:{" "}
              <a className="text-primary-700 dark:text-primary-300" href="tel:043-237-7624">
                043-237-7624
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
