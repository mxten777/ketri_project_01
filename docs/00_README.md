# KETRI 프로젝트 문서 구조 가이드

> **한국환경안전연구소(KETRI) 웹사이트 프로젝트의 공식 문서 저장소입니다.**  
> 이 문서는 프로젝트의 모든 문서를 체계적으로 정리하여, 고객·운영자·개발자·AI가 필요한 정보를 빠르게 찾을 수 있도록 구성되었습니다.

---

## 📂 문서 구조 개요

모든 문서는 **목적과 독자**에 따라 6개 카테고리로 분류됩니다:

| 폴더 | 목적 | 주요 독자 |
|------|------|-----------|
| **A_DELIVERABLE** | 고객 제출·보고용 공식 문서 | 고객, 임원, 의사결정자 |
| **B_OPERATION** | 실제 운영·배포·유지보수 | 시스템 관리자, 운영자 |
| **C_DESIGN_SYSTEM** | 디자인 시스템·테마 기준 | UI/UX 디자이너, 프론트엔드 개발자 |
| **D_DEVELOPMENT_GUIDE** | 개발 환경·규칙·가이드 | 신규 개발자, 유지보수 개발자 |
| **E_HISTORY_CHECKLIST** | 프로젝트 히스토리·검증 체크리스트 | PM, QA, 개발 리더 |
| **Z_ARCHIVE** | 참고용 아카이브 (과거 기획 문서) | 필요 시 참조 |

---

## 🎯 상황별 문서 찾기 가이드

### 💼 고객에게 프로젝트를 보고해야 할 때
→ **A_DELIVERABLE/** 폴더를 확인하세요

- **프로젝트 완료 보고서가 필요하다면**: [01_Project_Completion_Report.md](A_DELIVERABLE/01_Project_Completion_Report.md)
- **리뉴얼 배경과 목표를 설명해야 한다면**: [02_Renewal_Overview.md](A_DELIVERABLE/02_Renewal_Overview.md)
- **관리자 사용법을 안내해야 한다면**: [03_Admin_Manual.md](A_DELIVERABLE/03_Admin_Manual.md)
- **향후 유지보수 계획을 설명해야 한다면**: [04_Maintenance_and_Roadmap.md](A_DELIVERABLE/04_Maintenance_and_Roadmap.md)

---

### 🔧 웹사이트를 운영·배포해야 할 때
→ **B_OPERATION/** 폴더를 확인하세요

- **Vercel에 배포해야 한다면**: [DEPLOYMENT.md](B_OPERATION/DEPLOYMENT.md)
- **Firebase 데이터베이스 구조를 확인해야 한다면**: [FIREBASE_STRUCTURE.md](B_OPERATION/FIREBASE_STRUCTURE.md)
- **최근 유지보수 이력을 확인해야 한다면**: [MAINTENANCE_IMPROVEMENTS.md](B_OPERATION/MAINTENANCE_IMPROVEMENTS.md)
- **사이트 이전·SEO 작업을 해야 한다면**: [SITE_MIGRATION.md](B_OPERATION/SITE_MIGRATION.md)

---

### 🎨 디자인 시스템을 이해하거나 적용해야 할 때
→ **C_DESIGN_SYSTEM/** 폴더를 확인하세요

- **전체 디자인 시스템을 파악해야 한다면**: [DESIGN_SYSTEM.md](C_DESIGN_SYSTEM/DESIGN_SYSTEM.md)
- **테마 시스템 구현 방법을 알고 싶다면**: [THEME_SYSTEM_GUIDE.md](C_DESIGN_SYSTEM/THEME_SYSTEM_GUIDE.md)
- **테마 시스템 구현 완료 내역을 확인하려면**: [THEME_IMPLEMENTATION_SUMMARY.md](C_DESIGN_SYSTEM/THEME_IMPLEMENTATION_SUMMARY.md)
- **테마 시스템 적용 체크리스트가 필요하다면**: [THEME_CHECKLIST.md](C_DESIGN_SYSTEM/THEME_CHECKLIST.md)
- **Figma 디자인을 코드로 구현하는 법을 알고 싶다면**: [FIGMA_DESIGN_SYSTEM_GUIDE.md](C_DESIGN_SYSTEM/FIGMA_DESIGN_SYSTEM_GUIDE.md)
- **Figma 구현 완료 내역을 확인하려면**: [FIGMA_IMPLEMENTATION_SUMMARY.md](C_DESIGN_SYSTEM/FIGMA_IMPLEMENTATION_SUMMARY.md)
- **다른 프로젝트에 Figma 표준을 적용하려면**: [FIGMA_STANDARD_PROMPT_GUIDE.md](C_DESIGN_SYSTEM/FIGMA_STANDARD_PROMPT_GUIDE.md)

---

### 💻 개발 환경을 구축하거나 코드를 이해해야 할 때
→ **D_DEVELOPMENT_GUIDE/** 폴더를 확인하세요

- **프로젝트를 처음 시작한다면**: [GETTING_STARTED.md](D_DEVELOPMENT_GUIDE/GETTING_STARTED.md)
- **프로젝트 폴더 구조를 파악하고 싶다면**: [FILE_TREE.md](D_DEVELOPMENT_GUIDE/FILE_TREE.md)
- **Git 사용 규칙을 알고 싶다면**: [GIT_MANAGEMENT.md](D_DEVELOPMENT_GUIDE/GIT_MANAGEMENT.md)
- **프로젝트 최적화 이력을 확인하려면**: [OPTIMIZATION_REPORT.md](D_DEVELOPMENT_GUIDE/OPTIMIZATION_REPORT.md)

---

### 📋 프로젝트 히스토리나 QA 체크리스트를 확인해야 할 때
→ **E_HISTORY_CHECKLIST/** 폴더를 확인하세요

- **프로젝트 전체 완료 보고서를 보려면**: [PROJECT_FINAL_REPORT.md](E_HISTORY_CHECKLIST/PROJECT_FINAL_REPORT.md)
- **프로젝트 Phase별 완료 리포트를 보려면**: [PROJECT_COMPLETE.md](E_HISTORY_CHECKLIST/PROJECT_COMPLETE.md)
- **Phase 1 (Header & Hero 안정화) 보고서**: [phase-1-hero-header-safe-report.md](E_HISTORY_CHECKLIST/phase-1-hero-header-safe-report.md)
- **Phase 2 (메가메뉴) QA 체크리스트**: [mega-menu-phase2-checklist.md](E_HISTORY_CHECKLIST/mega-menu-phase2-checklist.md)

---

### 🗄️ 과거 기획 문서나 참고 자료를 찾을 때
→ **Z_ARCHIVE/** 폴더를 확인하세요

- **SEO 마이그레이션 계획서**: [SEO_MIGRATION_PLAN.md](Z_ARCHIVE/SEO_MIGRATION_PLAN.md)
- **초기 사이트맵**: [SITEMAP.md](Z_ARCHIVE/SITEMAP.md)
- **게시판 크롤러 사용법**: [CRAWL_BOARD_README.md](Z_ARCHIVE/CRAWL_BOARD_README.md)

---

## 📚 각 폴더별 상세 설명

### A_DELIVERABLE (고객 제출용 문서)

**목적**: 고객에게 공식적으로 제출하거나 보고하는 문서  
**특징**: 완성도 높은 형식, 비즈니스 용어 사용, 프로젝트 성과 강조

| 문서 | 설명 |
|------|------|
| 01_Project_Completion_Report.md | 프로젝트 완료 보고서 (범위, 기술 스택, 성과) |
| 02_Renewal_Overview.md | 리뉴얼 배경, 목표, 개선 사항 상세 개요 |
| 03_Admin_Manual.md | 관리자 시스템 운영 매뉴얼 (로그인, 공지사항 관리) |
| 04_Maintenance_and_Roadmap.md | 유지보수 범위 및 향후 발전 방향 |

---

### B_OPERATION (운영/유지보수 문서)

**목적**: 웹사이트 운영, 배포, 유지보수에 필요한 실무 문서  
**특징**: 명령어, 설정 방법, 체크리스트 중심

| 문서 | 설명 |
|------|------|
| DEPLOYMENT.md | Vercel 배포 가이드 (환경변수, 빌드 설정) |
| FIREBASE_STRUCTURE.md | Firestore 컬렉션 구조, Security Rules |
| MAINTENANCE_IMPROVEMENTS.md | 최근 유지보수 이력 및 개선 사항 |
| SITE_MIGRATION.md | 사이트 이전 시 필요한 URL 목록 및 리디렉션 |

---

### C_DESIGN_SYSTEM (디자인 시스템·테마)

**목적**: 디자인 표준, 테마 시스템, Figma 구현 가이드  
**특징**: 컬러, 타이포그래피, 컴포넌트 기준 정의

| 문서 | 설명 |
|------|------|
| DESIGN_SYSTEM.md | 전체 디자인 시스템 (컬러, 타이포그래피, 컴포넌트) |
| THEME_SYSTEM_GUIDE.md | 재사용 가능한 테마 기반 UI 시스템 구현 가이드 |
| THEME_IMPLEMENTATION_SUMMARY.md | 테마 시스템 구현 완료 요약 |
| THEME_CHECKLIST.md | 테마 시스템 적용 10단계 체크리스트 |
| FIGMA_DESIGN_SYSTEM_GUIDE.md | Figma Dev Mode 기준 디자인 시스템 구현 |
| FIGMA_IMPLEMENTATION_SUMMARY.md | Figma 디자인 시스템 구현 완료 요약 |
| FIGMA_STANDARD_PROMPT_GUIDE.md | 다른 프로젝트에 Figma 표준 적용 프롬프트 |

---

### D_DEVELOPMENT_GUIDE (개발 가이드)

**목적**: 개발 환경 구축, 코드 규칙, 프로젝트 구조 이해  
**특징**: 설치 방법, 폴더 구조, Git 규칙 중심

| 문서 | 설명 |
|------|------|
| GETTING_STARTED.md | 프로젝트 설치 및 실행 가이드 |
| FILE_TREE.md | 전체 프로젝트 폴더·파일 구조 |
| GIT_MANAGEMENT.md | Git 버전 관리 규칙 (커밋, 브랜치, 금지 패턴) |
| OPTIMIZATION_REPORT.md | 프로젝트 최적화 완료 보고서 |

---

### E_HISTORY_CHECKLIST (히스토리·검증)

**목적**: 프로젝트 완료 이력, Phase별 작업 내역, QA 체크리스트  
**특징**: 타임라인, 작업 항목, 검증 기준

| 문서 | 설명 |
|------|------|
| PROJECT_FINAL_REPORT.md | 최종 완료 보고서 (1201줄, 전체 프로젝트 히스토리) |
| PROJECT_COMPLETE.md | Phase별 완료 리포트 |
| phase-1-hero-header-safe-report.md | Phase 1: Header & Hero 안정화 기술 보고서 |
| mega-menu-phase2-checklist.md | Phase 2: 메가메뉴 QA 체크리스트 |

---

### Z_ARCHIVE (아카이브)

**목적**: 과거 기획 문서나 더 이상 사용하지 않지만 참고할 수 있는 자료  
**특징**: 초기 기획, 크롤링 도구, SEO 계획 등

| 문서 | 설명 |
|------|------|
| SEO_MIGRATION_PLAN.md | SEO 마이그레이션 실행 계획서 |
| SITEMAP.md | 초기 사이트맵 및 정보구조(IA) |
| CRAWL_BOARD_README.md | 게시판 크롤러 사용법 |

---

## 🔍 문서 검색 팁

### 키워드로 찾기

| 키워드 | 관련 문서 위치 |
|--------|----------------|
| 배포, Vercel, 환경변수 | B_OPERATION/DEPLOYMENT.md |
| Firebase, Firestore | B_OPERATION/FIREBASE_STRUCTURE.md |
| 디자인, 컬러, 타이포그래피 | C_DESIGN_SYSTEM/DESIGN_SYSTEM.md |
| 테마, 다크모드 | C_DESIGN_SYSTEM/THEME_SYSTEM_GUIDE.md |
| 설치, npm, 실행 | D_DEVELOPMENT_GUIDE/GETTING_STARTED.md |
| Git, 커밋, 브랜치 | D_DEVELOPMENT_GUIDE/GIT_MANAGEMENT.md |
| 관리자, 로그인, 공지사항 | A_DELIVERABLE/03_Admin_Manual.md |
| 유지보수, 로드맵 | A_DELIVERABLE/04_Maintenance_and_Roadmap.md |

---

## 📝 문서 관리 원칙

### ✅ 해야 할 것

1. **문서는 항상 하나의 폴더에만 존재해야 함** (중복 금지)
2. **고객 제출용 문서(A_DELIVERABLE)를 최신 상태로 유지**
3. **운영 중 변경 사항은 B_OPERATION 문서에 반영**
4. **새로운 기능 개발 시 D_DEVELOPMENT_GUIDE 업데이트**

### ❌ 하지 말아야 할 것

1. **여러 폴더에 같은 내용의 문서를 중복 생성하지 말 것**
2. **개인 메모나 임시 파일을 docs/ 폴더에 저장하지 말 것**
3. **고객용 문서에 개발 디버깅 정보를 포함하지 말 것**

---

## 🤖 AI/RAG 시스템을 위한 메타데이터

이 문서 구조는 AI 기반 검색(RAG)에 최적화되어 있습니다.

### 각 폴더의 RAG 우선순위

| 폴더 | 검색 우선순위 | 주요 검색 키워드 |
|------|--------------|------------------|
| A_DELIVERABLE | 최상 | 프로젝트 완료, 리뉴얼, 관리자, 유지보수 |
| B_OPERATION | 상 | 배포, Firebase, Vercel, 운영 |
| C_DESIGN_SYSTEM | 중 | 디자인, 테마, Figma, 컬러 |
| D_DEVELOPMENT_GUIDE | 중 | 설치, Git, 폴더 구조, 개발 |
| E_HISTORY_CHECKLIST | 하 | 히스토리, Phase, 체크리스트 |
| Z_ARCHIVE | 최하 | SEO, 사이트맵, 크롤러 |

---

## 📌 빠른 참조

### 긴급 상황별 문서

| 상황 | 문서 경로 |
|------|----------|
| 🚨 배포가 안 됨 | [B_OPERATION/DEPLOYMENT.md](B_OPERATION/DEPLOYMENT.md) |
| 🚨 Firebase 에러 | [B_OPERATION/FIREBASE_STRUCTURE.md](B_OPERATION/FIREBASE_STRUCTURE.md) |
| 🚨 관리자가 로그인 안 됨 | [A_DELIVERABLE/03_Admin_Manual.md](A_DELIVERABLE/03_Admin_Manual.md) |
| 🚨 디자인이 깨짐 | [C_DESIGN_SYSTEM/DESIGN_SYSTEM.md](C_DESIGN_SYSTEM/DESIGN_SYSTEM.md) |
| 🚨 개발 환경 설정 실패 | [D_DEVELOPMENT_GUIDE/GETTING_STARTED.md](D_DEVELOPMENT_GUIDE/GETTING_STARTED.md) |

---

## 📖 문서 버전 이력

| 버전 | 날짜 | 변경 내역 |
|------|------|-----------|
| 1.0 | 2026-01-04 | 문서 구조 재정리 완료 (6개 폴더 분류) |

---

## 📞 문의

문서 구조나 내용에 대한 문의는 프로젝트 관리자에게 연락하세요.

**프로젝트**: 한국환경안전연구소(KETRI) 웹사이트 리뉴얼  
**기술 스택**: React + Vite + TypeScript + TailwindCSS + Firebase + Vercel
