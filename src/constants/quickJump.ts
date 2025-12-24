export interface QuickJumpItem {
  label: string;
  path: string;
  keywords: string[];
}

const QUICK_JUMP_SERVICES: QuickJumpItem[] = [
  { label: "산업보건컨설팅", path: "/services/industrial-health", keywords: ["산업", "보건", "작업환경", "컨설팅"] },
  { label: "먹는물 검사", path: "/services/water-testing", keywords: ["수질", "물", "검사", "먹는물"] },
  { label: "혈액투석용수", path: "/services/dialysis-water", keywords: ["투석", "투석용수", "혈액"] },
  { label: "실내공기질측정", path: "/services/indoor-air-quality", keywords: ["공기질", "실내", "측정"] },
  { label: "석면조사분석", path: "/services/asbestos", keywords: ["석면", "조사", "분석"] },
  { label: "공지사항", path: "/board/notice", keywords: ["공지", "뉴스", "업데이트"] },
  { label: "연구소 소개", path: "/about/greeting", keywords: ["연구소", "소개", "인사말"] },
];

export default QUICK_JUMP_SERVICES;
