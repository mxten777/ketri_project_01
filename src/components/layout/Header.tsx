import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Button from "../common/Button";
import SearchModal from "../common/SearchModal";
import { useAuth } from "../../contexts/AuthContext";
import { MenuItem } from "../../types";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "산업보건",
      path: "/industrial-health",
      children: [
        {
          label: "근골격계 유해요인조사",
          path: "/industrial-health/musculoskeletal",
        },
        {
          label: "화학물질관리",
          path: "/industrial-health/chemical-management",
        },
        { label: "산업보건컨설팅 실적", path: "/industrial-health/portfolio" },
        { label: "업무소개", path: "/industrial-health/introduction" },
      ],
    },
    {
      label: "먹는물검사",
      path: "/water-testing",
      children: [
        { label: "수질검사 대상 및 범위", path: "/water-testing/scope" },
        { label: "수질검사 의뢰 및 수수료", path: "/water-testing/fees" },
        { label: "검사 의뢰 신청 절차", path: "/water-testing/procedure" },
        { label: "업무소개", path: "/water-testing/introduction" },
      ],
    },
    {
      label: "투석용수",
      path: "/dialysis-water",
      children: [
        { label: "검사 의뢰 절차", path: "/dialysis-water/procedure" },
        { label: "검사기기 및 관련기준", path: "/dialysis-water/equipment" },
        {
          label: "수거기준 및 실행방법",
          path: "/dialysis-water/collection-standards",
        },
        {
          label: "채수방법 및 시료채수 위치",
          path: "/dialysis-water/sampling-methods",
        },
      ],
    },
    {
      label: "실내공기질",
      path: "/indoor-air-quality",
      children: [
        { label: "업무소개", path: "/indoor-air-quality/introduction" },
        {
          label: "실내공기질 측정 견적 요청",
          path: "/indoor-air-quality/quote-request",
        },
        {
          label: "실내공기질 성적서 조회",
          path: "/indoor-air-quality/certificate-lookup",
        },
      ],
    },
    {
      label: "석면분석",
      path: "/asbestos",
      children: [
        { label: "석면조사 분석", path: "/asbestos/investigation" },
        { label: "석면지도·도면", path: "/asbestos/mapping" },
        { label: "석면배출시설측정", path: "/asbestos/emission-measurement" },
        { label: "석면해체제거 관리", path: "/asbestos/removal-management" },
        { label: "석면건축물 위해성평가", path: "/asbestos/risk-assessment" },
        { label: "석면건축물 공기질측정", path: "/asbestos/air-quality" },
      ],
    },
    {
      label: "게시판",
      path: "/board",
      children: [
        { label: "공지사항", path: "/board/notices" },
        { label: "질문답변", path: "/board/qna" },
        { label: "자유게시판", path: "/board/free" },
        { label: "자료실", path: "/board/resources" },
      ],
    },
  ];

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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-22 lg:h-24">
          {/* Logo */}
          <Link to="" className="flex items-center flex-shrink-0">
            <img
              src={
                isDarkMode
                  ? "/images/logo_horizontal_trans.png"
                  : "/images/logo_horizontal.png"
              }
              alt="한국환경안전연구소"
              className="h-10 sm:h-11 md:h-12 lg:h-13 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Only on very large screens */}
          <nav className="hidden 2xl:flex items-center space-x-1">
            {menuItems.slice(0, 6).map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-colors duration-200 flex items-center space-x-1 whitespace-nowrap hover:bg-neutral-100 dark:hover:bg-neutral-800
                    ${
                      location.pathname.startsWith(item.path)
                        ? "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400"
                    }`}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-premium border border-neutral-200 dark:border-neutral-700 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-500 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              aria-label="다크모드 토글"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* User Menu / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 whitespace-nowrap"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm md:text-base font-medium max-w-20 md:max-w-24 truncate">
                    {userData?.displayName || "사용자"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-premium border border-neutral-200 dark:border-neutral-700 py-2">
                    <Link
                      to="/my-page"
                      className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      마이페이지
                    </Link>
                    {userData?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-3 text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        관리자 대시보드
                      </Link>
                    )}
                    <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm md:text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-neutral-700 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span className="text-sm md:text-base font-medium">로그인</span>
              </Link>
            )}

            {/* CTA Button */}
            <Button size="sm" className="hidden lg:inline-flex">
              견적문의
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="2xl:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="2xl:hidden border-t border-neutral-200 dark:border-neutral-800"
          >
            <div className="container-custom py-5 space-y-3">
              {menuItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className="block px-4 py-3 rounded-lg text-base md:text-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 rounded-lg text-sm md:text-base font-medium text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-neutral-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Header;
