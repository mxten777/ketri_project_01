import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { MENU_ITEMS } from "../../constants/menu";

const Header = () => {
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
    }, 300);
    setCloseTimeout(timeout);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", newMode.toString());
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral-950 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 유틸리티 바 (옵션) */}
          <div className="hidden md:flex items-center justify-end h-10 border-b border-neutral-100 dark:border-neutral-800/70">
            <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400">
              <Link
                to="/about/location"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                오시는 길
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <a
                href="tel:043-237-7624"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                📞 043-237-7624
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <a
                href="mailto:contact@ketri.re.kr"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                이메일 문의
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link
              to="/"
              className="flex items-center py-4 hover:opacity-80 transition-opacity"
            >
              <img
                src={
                  isDarkMode
                    ? "/images/logo_horizontal_trans.png"
                    : "/images/logo_horizontal.png"
                }
                alt="한국환경안전연구소"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* PC 메뉴 (lg 이상) */}
            <nav className="hidden lg:flex items-center space-x-1">
              {MENU_ITEMS.map((menu) => (
                <div
                  key={menu.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(menu.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="px-4 py-2 text-[15px] font-medium text-neutral-700 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-1 whitespace-nowrap group">
                    <span>{menu.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {openDropdown === menu.label && (
                    <div 
                      className="absolute top-[calc(100%-6px)] left-0 w-64 z-60 pt-0"
                      onMouseEnter={() => handleMouseEnter(menu.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-700 py-3 animate-in fade-in duration-200">
                        {menu.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-5 py-3 text-[14px] font-normal text-neutral-600 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-150 hover:pl-6"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 우측 아이콘 메뉴 */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* 다크모드 토글 */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
                aria-label="다크모드 토글"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* 햄버거 메뉴 (모바일만) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-xl transition-colors"
                aria-label="메뉴"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[120px] md:top-[130px] bottom-0 bg-white dark:bg-neutral-950 z-40 overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            <nav className="space-y-4">
              {MENU_ITEMS.map((menu, index) => (
                <div key={menu.label} className="space-y-1">
                  <div className="px-4 py-2.5 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {menu.label}
                  </div>
                  <div className="space-y-0.5">
                    {menu.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block pl-8 pr-4 py-3 text-[15px] font-normal text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all duration-150 active:scale-[0.98]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  {index < menuItems.length - 1 && (
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
