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
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 유틸리티 바 (옵션) */}
          <div className="hidden md:flex items-center justify-end h-10 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-300">
              <Link to="/about/location" className="hover:text-primary-600 transition-colors">
                오시는 길
              </Link>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <Link to="/board/qna" className="hover:text-primary-600 transition-colors">
                자주 묻는 질문
              </Link>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <a href="tel:043-237-7624" className="hover:text-primary-600 transition-colors">
                📞 043-237-7624
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link to="/" className="flex items-center py-4 hover:opacity-80 transition-opacity">
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
              {menuItems.map((menu) => (
                <div
                  key={menu.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(menu.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="px-4 py-2 text-[15px] font-medium text-neutral-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-1 whitespace-nowrap group">
                    <span>{menu.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* 드롭다운 메뉴 - 개선된 호버 영역 */}
                  {openDropdown === menu.label && (
                    <div 
                      className="absolute top-full left-0 pt-2"
                      style={{ marginTop: '0px' }}
                    >
                      <div className="w-60 bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-700 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {menu.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-5 py-2.5 text-[14px] font-normal text-neutral-600 dark:text-neutral-100 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-150 hover:pl-6"
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
              {/* 검색 버튼 */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
                aria-label="검색"
              >
                <Search className="w-5 h-5" />
              </button>

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

              {/* 로그인/사용자 */}
              {user ? (
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  className="hidden md:flex items-center space-x-2 px-5 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
                >
                  <User className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {userData?.displayName || "사용자"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  <span>로그인</span>
                </button>
              )}

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
        <div className="fixed inset-0 top-[120px] bg-white/98 dark:bg-neutral-900/98 backdrop-blur-xl z-40 overflow-y-auto border-t border-neutral-100 dark:border-neutral-800">
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-2">
              {menuItems.map((menu) => (
                <div key={menu.label} className="space-y-1">
                  <div className="px-4 py-2.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {menu.label}
                  </div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block pl-8 pr-4 py-3 text-[15px] font-normal text-neutral-600 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all duration-150"
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
                  className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium text-center shadow-sm hover:shadow-md"
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
