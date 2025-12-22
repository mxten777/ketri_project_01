import {
  Building2,
  Droplets,
  FlaskConical,
  Wind,
  Shield,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  path: string;
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
  mainPath?: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
}

// 메뉴 구조 정의
export const MENU_ITEMS: MenuGroup[] = [
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
    mainPath: "/industrial-health",
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
    mainPath: "/water-testing",
    items: [
      { label: "업무소개", path: "/water-testing/introduction" },
      { label: "수질검사대상 및 범위", path: "/water-testing/scope" },
      { label: "수질검사주기 및 수수료", path: "/water-testing/schedule" },
      { label: "검사의뢰 신청절차", path: "/water-testing/procedure" },
    ],
  },
  {
    label: "혈액투석용수",
    mainPath: "/dialysis-water",
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
    mainPath: "/indoor-air-quality",
    items: [
      { label: "업무 소개", path: "/indoor-air-quality/introduction" },
      { label: "실내공기질 측정 검의 요청", path: "/indoor-air-quality/request" },
      { label: "실내공기질 성적서 조회", path: "/indoor-air-quality/report" },
    ],
  },
  {
    label: "석면조사분석",
    mainPath: "/asbestos",
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
    label: "정보센터",
    items: [
      { label: "공지사항", path: "/board/notice" },
    ],
  },
];

// 홈 페이지 서비스 카드 데이터
export const SERVICES: ServiceItem[] = [
  {
    icon: Building2,
    title: "산업보건컨설팅",
    description: "작업환경측정, 근골격계질환 예방, 화학물질 위해성 평가 등 산업보건 전문 서비스",
    path: "/industrial-health",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Droplets,
    title: "먹는물 검사",
    description: "KOLAS 인증으로 수돗물·지하수·정수기 등 59개 항목 수질검사 서비스",
    path: "/water-testing",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: FlaskConical,
    title: "혈액투석용수",
    description: "투석용수 21개 항목, 전처리용수 15개 항목 검사로 환자 안전 도모",
    path: "/dialysis-water",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wind,
    title: "실내공기질측정",
    description: "PM10, PM2.5, CO₂, 라돈 등 다중이용시설 9개 항목 실내공기질 측정",
    path: "/indoor-air-quality",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "석면조사분석",
    description: "환경부 지정 석면조사기관으로 정성·정량분석 및 위해성 평가 서비스",
    path: "/asbestos",
    color: "from-orange-500 to-red-500",
  },
];

// 회사 통계 데이터
export const COMPANY_STATS = [
  { value: "19년", label: "신뢰의 경험" },
  { value: "650+", label: "협력 고객사" },
  { value: "11+", label: "보유 인증" },
  { value: "KOLAS", label: "공인 인증기관" },
];

// 연락처 정보
export const CONTACT_INFO = {
  phone: "043-237-7624",
  phoneRange: "043.237.7624~5",
  fax: "043.237.7626",
  email: "kesri@kesri.co.kr",
  address: "충청북도 청주시 흥덕구 오송읍 오송생명2로 96 (충북바이오메디컬플라자)",
};
