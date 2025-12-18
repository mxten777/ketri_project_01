import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Moon, Sun, LogIn, User, ChevronDown } from "lucide-react";
import SearchModal from "../common/SearchModal";
import { useAuth } from "../../contexts/AuthContext";

interface MenuItem {
  label: string;
  path: string;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuItems: MenuGroup[] = [
  {
    label: "연구소 소개",
    items: [
      { label: "인사말", path: "/about/greeting" },
      { label: "연혁", path: "/about/history" },
      { label: "조직도", path: "/about/organization" },
      { label: "CI소개", path: "/about/ci" },
      { label: "인증서", path: "/about/certificates" },
      { label: "주요장비현황", path: "/about/equipment" },
      { label: "오시는길", path: "/about/location" },
    ],
  },
  {
    label: "산업보건컨설팅",
    items: [
      { label: "작업환경측정", path: "/industrial-health/work-environment" },
      { label: "위험성평가", path: "/industrial-health/risk-assessment" },
      { label: "근골격계유해요인조사", path: "/industrial-health/musculoskeletal" },
      { label: "화학물질관리", path: "/industrial-health/chemical-management" },
      { label: "산업보건컨설팅 실적", path: "/industrial-health/portfolio" },
    ],
  },
  {
    label: "먹는물 검사",
    items: [
      { label: "업무소개", path: "/water-testing/introduction" },
      { label: "수질검사대상 및 범위", path: "/water-testing/scope" },
      { label: "수질검사주기 및 수수료", path: "/water-testing/schedule" },
      { label: "검사의뢰 신청절차", path: "/water-testing/procedure" },
    ],
  },
  {
    label: "혈액투석용수",
    items: [
      { label: "업무소개", path: "/dialysis-water/introduction" },
      { label: "검사의뢰절차", path: "/dialysis-water/procedure" },
      { label: "검사주기 및 관련기준", path: "/dialysis-water/schedule" },
      { label: "수질기준 및 실험방법", path: "/dialysis-water/standards" },
      { label: "채수방법 및 시료채수위치", path: "/dialysis-water/sampling" },
    ],
  },
  {
    label: "실내공기질측정",
    items: [
      { label: "업무 소개", path: "/indoor-air-quality/introduction" },
      { label: "실내공기질 측정 검의 요청", path: "/indoor-air-quality/request" },
      { label: "실내공기질 성적서 조회", path: "/indoor-air-quality/report" },
    ],
  },
  {
    label: "석면조사분석",
    items: [
      { label: "석면조사분석", path: "/asbestos/survey" },
      { label: "석면농도측정", path: "/asbestos/concentration" },
      { label: "석면비산정도측정", path: "/asbestos/dispersion" },
      { label: "석면해체제거감리", path: "/asbestos/supervision" },
      { label: "석면건축물 위해성평가", path: "/asbestos/risk-assessment" },
      { label: "석면건축물 공기질측정", path: "/asbestos/air-quality" },
    ],
  },
  {
    label: "게시판",
    items: [
      { label: "공지사항", path: "/board/notice" },
      { label: "질문답변", path: "/board/qna" },
      { label: "자료실", path: "/board/resources" },
      { label: "자유게시판", path: "/board/free" },
    ],
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
  const navigate = useNavigate();
  const { user, userData, logout } = useAuth();

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
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 로고 */}
            <Link to="/" className="flex items-center">
              <img
                src={
                  isDarkMode
                    ? "/images/logo_horizontal_trans.png"
                    : "/images/logo_horizontal.png"
                }
                alt="한국환경안전연구소"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* PC 메뉴 (lg 이상) */}
            <nav className="hidden lg:flex items-center space-x-0.5">
              {menuItems.map((menu) => (
                <div
                  key={menu.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(menu.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="px-3 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center space-x-1 whitespace-nowrap">
                    <span>{menu.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {openDropdown === menu.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                      {menu.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 우측 아이콘 메뉴 */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* 검색 버튼 */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="검색"
              >
                <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </button>

              {/* 다크모드 토글 */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="다크모드 토글"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>

              {/* 로그인/사용자 */}
              {user ? (
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <User className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                    {userData?.displayName || "사용자"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all shadow-md font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-base">로그인</span>
                </button>
              )}

              {/* 햄버거 메뉴 (모바일만) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="메뉴"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white dark:bg-neutral-900 z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <nav className="space-y-2">
              {menuItems.map((menu) => (
                <div key={menu.label} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-bold text-primary-600 dark:text-primary-400">
                    {menu.label}
                  </div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block pl-8 pr-4 py-2.5 text-base text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* 모바일 로그인 */}
              {!user && (
                <button
                  onClick={() => {
                    navigate("/auth/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-6 px-4 py-3 bg-[#0069FF] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  로그인
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
