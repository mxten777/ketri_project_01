/**
 * Theme Configuration
 * 업종별 테마 설정 및 관리
 */

export type ThemeType = 
  | "default"      // Environment/Lab (Light Blue)
  | "healthcare"   // Green
  | "finance"      // Blue
  | "education"    // Amber
  | "food"         // Red
  | "technology";  // Purple

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  primaryColor: string;
  fontFamily?: string;
  borderRadius?: "sharp" | "normal" | "round";
  spacing?: "compact" | "normal" | "relaxed";
}

export const themes: Record<ThemeType, Theme> = {
  default: {
    id: "default",
    name: "환경/분석 (기본)",
    description: "환경 분석 및 실험실 업종",
    primaryColor: "#0083ff",
    fontFamily: "Pretendard",
    borderRadius: "normal",
    spacing: "normal",
  },
  healthcare: {
    id: "healthcare",
    name: "의료/헬스케어",
    description: "병원, 클리닉, 헬스케어 서비스",
    primaryColor: "#10b981",
    fontFamily: "Pretendard",
    borderRadius: "round",
    spacing: "relaxed",
  },
  finance: {
    id: "finance",
    name: "금융/핀테크",
    description: "은행, 증권, 핀테크 서비스",
    primaryColor: "#3b82f6",
    fontFamily: "Pretendard",
    borderRadius: "sharp",
    spacing: "compact",
  },
  education: {
    id: "education",
    name: "교육",
    description: "학교, 학원, 교육 플랫폼",
    primaryColor: "#d97706",
    fontFamily: "Pretendard",
    borderRadius: "normal",
    spacing: "normal",
  },
  food: {
    id: "food",
    name: "식품/외식",
    description: "레스토랑, 카페, 식품 서비스",
    primaryColor: "#ef4444",
    fontFamily: "Pretendard",
    borderRadius: "round",
    spacing: "relaxed",
  },
  technology: {
    id: "technology",
    name: "IT/기술",
    description: "소프트웨어, SaaS, IT 서비스",
    primaryColor: "#8b5cf6",
    fontFamily: "JetBrains Mono",
    borderRadius: "sharp",
    spacing: "compact",
  },
};

/**
 * 테마 적용 함수
 */
export const applyTheme = (theme: ThemeType): void => {
  const root = document.documentElement;
  
  // data-theme 속성 설정
  root.setAttribute("data-theme", theme);
  
  // 로컬 스토리지에 저장
  localStorage.setItem("app-theme", theme);
};

/**
 * 저장된 테마 불러오기
 */
export const getStoredTheme = (): ThemeType => {
  const stored = localStorage.getItem("app-theme") as ThemeType;
  return stored && themes[stored] ? stored : "default";
};

/**
 * 다크 모드 토글
 */
export const toggleDarkMode = (): void => {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  
  if (isDark) {
    root.classList.remove("dark");
    localStorage.setItem("app-dark-mode", "false");
  } else {
    root.classList.add("dark");
    localStorage.setItem("app-dark-mode", "true");
  }
};

/**
 * 다크 모드 초기화
 */
export const initDarkMode = (): void => {
  const root = document.documentElement;
  const stored = localStorage.getItem("app-dark-mode");
  
  if (stored === "true") {
    root.classList.add("dark");
  } else if (stored === "false") {
    root.classList.remove("dark");
  } else {
    // 시스템 설정 따르기
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }
};
