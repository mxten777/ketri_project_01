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
  /** Optional one-line description shown in the mega menu */
  description?: string;
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
  mainPath?: string;
  /** Optional one-line description for the group (left column in mega menu) */
  description?: string;
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
    mainPath: "/about/greeting",
    description: "연구소의 미션·연혁·조직 및 주요 장비 안내",
    items: [
      { label: "인사말", path: "/about/greeting", description: "연구소장 인사말과 비전" },
      { label: "연혁", path: "/about/history", description: "주요 연혁과 성장 이력" },
      { label: "조직도", path: "/about/organization", description: "조직 구성 및 연락처" },
      { label: "CI소개", path: "/about/ci", description: "브랜드 가이드와 CI 안내" },
      { label: "인증서", path: "/about/certificates", description: "보유 인증서 및 신뢰성" },
      { label: "주요장비현황", path: "/about/equipment", description: "핵심 장비 및 성능 개요" },
      { label: "오시는길", path: "/about/location", description: "연구소 위치 및 교통 안내" },
    ],
  },
  {
    label: "산업보건컨설팅",
    mainPath: "/services/industrial-health",
    description: "현장 중심의 산업보건 전문 컨설팅 및 검사 서비스",
    items: [
      { label: "작업환경측정", path: "/services/industrial-health#work-environment", description: "작업장 유해인자 측정" },
      { label: "위험성평가", path: "/services/industrial-health#risk-assessment", description: "리스크 식별 및 개선안" },
      { label: "근골격계유해요인조사", path: "/services/industrial-health#musculoskeletal", description: "인체공학적 평가" },
      { label: "화학물질관리", path: "/services/industrial-health#chemical-management", description: "유해물질 관리 및 SDS" },
      { label: "서비스 프로세스", path: "/services/industrial-health#service-process", description: "절차 및 의뢰 흐름" },
    ],
  },
  {
    label: "먹는물 검사",
    mainPath: "/services/water-testing",
    description: "수질검사 서비스 개요 및 검사 항목 안내",
    items: [
      { label: "업무소개", path: "/services/water-testing#introduction", description: "수질 검사 전반 개요" },
      { label: "수질검사대상 및 범위", path: "/services/water-testing#scope", description: "검사 대상과 항목 범위" },
      { label: "수질검사주기 및 수수료", path: "/services/water-testing#schedule", description: "검사 주기 및 비용 안내" },
      { label: "검사의뢰 신청절차", path: "/services/water-testing#procedure", description: "의뢰 방법 및 제출 서류" },
    ],
  },
  {
    label: "혈액투석용수",
    mainPath: "/services/dialysis-water",
    description: "안전한 투석환경을 위한 투석용수 검사 안내",
    items: [
      { label: "업무소개", path: "/services/dialysis-water#introduction", description: "투석용수 검사 항목 안내" },
      { label: "검사의뢰절차", path: "/services/dialysis-water#procedure", description: "의뢰 및 샘플링 절차" },
      { label: "검사주기 및 관련기준", path: "/services/dialysis-water#schedule", description: "주기 및 규격 기준" },
      { label: "수질기준 및 실험방법", path: "/services/dialysis-water#standards", description: "측정 방법 및 기준" },
      { label: "채수방법 및 시료채수위치", path: "/services/dialysis-water#sampling", description: "채수 요령 및 위치" },
    ],
  },
  {
    label: "실내공기질측정",
    mainPath: "/services/indoor-air-quality",
    description: "실내공기질 관련 측정 항목 및 기준 안내",
    items: [
      { label: "업무 소개", path: "/services/indoor-air-quality#introduction", description: "실내공기질 측정 개요" },
      { label: "측정 대상시설", path: "/services/indoor-air-quality#facilities", description: "대상 및 적용 범위" },
      { label: "측정 항목 및 기준", path: "/services/indoor-air-quality#standards", description: "측정 항목과 평가 기준" },
    ],
  },
  {
    label: "석면조사분석",
    mainPath: "/services/asbestos",
    description: "석면 관련 조사·분석 및 위해성 평가 서비스",
    items: [
      { label: "석면조사분석", path: "/services/asbestos#survey", description: "정성·정량 분석 서비스" },
      { label: "석면농도측정", path: "/services/asbestos#concentration", description: "농도 측정 절차" },
      { label: "석면비산정도측정", path: "/services/asbestos#dispersion", description: "비산도 측정 방법" },
      { label: "석면해체제거감리", path: "/services/asbestos#supervision", description: "해체 감리 및 감독" },
      { label: "석면건축물 위해성평가", path: "/services/asbestos#risk-assessment", description: "건물 위해성 평가" },
      { label: "석면건축물 공기질측정", path: "/services/asbestos#air-quality", description: "공기질 모니터링" },
    ],
  },
  {
    label: "정보센터",
    description: "공지사항 및 자료실을 통해 최신 정보를 제공",
    items: [
      { label: "공지사항", path: "/board/notice", description: "중요 공지 및 안내" },
    ],
  },
];

// 홈 페이지 서비스 카드 데이터
export const SERVICES: ServiceItem[] = [
  {
    icon: Building2,
    title: "산업보건컨설팅",
    description: "작업환경측정, 근골격계질환 예방, 화학물질 위해성 평가 등 산업보건 전문 서비스",
    path: "/services/industrial-health",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Droplets,
    title: "먹는물 검사",
    description: "KOLAS 인증으로 수돗물·지하수·정수기 등 59개 항목 수질검사 서비스",
    path: "/services/water-testing",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: FlaskConical,
    title: "혈액투석용수",
    description: "투석용수 21개 항목, 전처리용수 15개 항목 검사로 환자 안전 도모",
    path: "/services/dialysis-water",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wind,
    title: "실내공기질측정",
    description: "PM10, PM2.5, CO₂, 라돈 등 다중이용시설 9개 항목 실내공기질 측정",
    path: "/services/indoor-air-quality",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "석면조사분석",
    description: "환경부 지정 석면조사기관으로 정성·정량분석 및 위해성 평가 서비스",
    path: "/services/asbestos",
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
  phone: "043-237-7824",
  phoneRange: "043.237.7824~5",
  fax: "043.237.7626",
  email: "kesri@kesri.co.kr",
  address: "충청북도 청주시 흥덕구 오송읍 오송생명2로 96 (충북바이오메디컬플라자)",
};
