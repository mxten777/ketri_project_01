# 한국환경안전연구소 (KETRI) 웹사이트 - 전체 파일 트리

```
ketri_project_01/
│
├── 📄 루트 설정 파일들
│   ├── package.json                    # 의존성 및 스크립트
│   ├── vite.config.ts                  # Vite 빌드 설정
│   ├── tsconfig.json                   # TypeScript 설정
│   ├── tsconfig.node.json              # Node TypeScript 설정
│   ├── tailwind.config.js              # Tailwind CSS 설정
│   ├── postcss.config.js               # PostCSS 설정
│   ├── .eslintrc.cjs                   # ESLint 규칙
│   ├── .gitignore                      # Git 무시 파일
│   ├── .env.example                    # 환경 변수 예제
│   ├── vercel.json                     # Vercel 배포 설정
│   ├── index.html                      # HTML 진입점
│   └── README.md                       # 프로젝트 개요
│
├── 📚 docs/                            # 프로젝트 문서 (6개)
│   ├── GETTING_STARTED.md             # 설치 및 실행 가이드
│   ├── SITEMAP.md                     # 사이트맵 및 IA
│   ├── FIREBASE_STRUCTURE.md          # Firebase DB 구조
│   ├── DESIGN_SYSTEM.md               # 디자인 시스템 가이드
│   ├── DEPLOYMENT.md                  # Vercel 배포 가이드
│   ├── PROJECT_COMPLETE.md            # 프로젝트 완료 리포트
│   └── FILE_TREE.md                   # 이 파일
│
├── 🎨 public/                          # 정적 파일
│   ├── robots.txt                      # 검색엔진 크롤러 설정
│   └── favicon.svg                     # 파비콘
│
└── 💻 src/                             # 소스 코드
    │
    ├── 🧩 components/                  # React 컴포넌트
    │   │
    │   ├── common/                     # 공통 컴포넌트 (3개)
    │   │   ├── Button.tsx             # 버튼 컴포넌트 (4 variants)
    │   │   ├── Card.tsx               # 카드 컴포넌트
    │   │   └── ScrollToTop.tsx        # 자동 스크롤 컴포넌트
    │   │
    │   ├── layout/                     # 레이아웃 컴포넌트 (3개)
    │   │   ├── Header.tsx             # 헤더 (네비게이션, 검색)
    │   │   ├── Footer.tsx             # 푸터 (링크, 연락처)
    │   │   └── Layout.tsx             # 전체 레이아웃 래퍼
    │   │
    │   └── features/                   # 기능별 컴포넌트 (향후 추가)
    │       └── (추후 추가: SearchModal, QuoteForm 등)
    │
    ├── 📄 pages/                       # 페이지 컴포넌트
    │   │
    │   ├── Home.tsx                    # 홈페이지 (메인)
    │   │
    │   ├── services/                   # 서비스 페이지 (5개)
    │   │   ├── IndustrialHealth.tsx   # 산업보건컨설팅
    │   │   ├── WaterTesting.tsx       # 먹는물 검사
    │   │   ├── DialysisWater.tsx      # 혈액특성용수
    │   │   ├── IndoorAirQuality.tsx   # 실내공기질 측정
    │   │   └── Asbestos.tsx           # 석면조사·분석
    │   │
    │   ├── board/                      # 게시판 페이지 (1개)
    │   │   └── Board.tsx              # 게시판 메인
    │   │
    │   ├── auth/                       # 인증 페이지 (2개)
    │   │   ├── Login.tsx              # 로그인
    │   │   └── Register.tsx           # 회원가입
    │   │
    │   ├── admin/                      # 관리자 페이지 (1개)
    │   │   └── Dashboard.tsx          # 관리자 대시보드
    │   │
    │   └── MyPage.tsx                  # 마이페이지
    │
    ├── ⚙️ config/                      # 설정 파일
    │   └── firebase.ts                 # Firebase 초기화
    │
    ├── 📦 types/                       # TypeScript 타입 정의
    │   └── index.ts                    # 모든 인터페이스 (15+)
    │
    ├── 🪝 hooks/                       # 커스텀 훅 (향후 추가)
    │   └── (추후 추가: useAuth, useFirestore 등)
    │
    ├── 🛠️ utils/                       # 유틸리티 함수 (향후 추가)
    │   └── (추후 추가: formatDate, validators 등)
    │
    ├── 🗂️ store/                       # 상태 관리 (향후 추가)
    │   └── (추후 추가: authStore, uiStore 등)
    │
    ├── App.tsx                         # 메인 App 컴포넌트 (라우팅)
    ├── main.tsx                        # React 진입점
    └── index.css                       # 글로벌 스타일 (Tailwind)
```

---

## 📊 파일 통계

### 파일 개수

- **설정 파일**: 12개
- **문서**: 7개
- **정적 파일**: 2개
- **컴포넌트**: 6개
- **페이지**: 11개
- **설정/타입**: 3개
- **총 파일 수**: **약 41개** (핵심 파일 기준)

### 코드 라인 수 (추정)

- **TypeScript/TSX**: ~4,000 줄
- **CSS**: ~300 줄
- **설정 파일**: ~200 줄
- **문서**: ~3,500 줄
- **총 라인 수**: **약 8,000 줄**

---

## 🎯 핵심 파일 설명

### 루트 레벨

- **`package.json`** - 프로젝트 메타데이터 및 의존성
- **`vite.config.ts`** - Vite 빌드 최적화 설정 (코드 스플리팅)
- **`tailwind.config.js`** - 커스텀 컬러, 폰트, 애니메이션 정의
- **`vercel.json`** - 리다이렉트, 헤더, 캐싱 설정
- **`index.html`** - SEO 메타태그, OG tags 포함

### 문서

- **`GETTING_STARTED.md`** - 개발자 온보딩 가이드
- **`SITEMAP.md`** - 전체 사이트 구조 (50+ 페이지)
- **`FIREBASE_STRUCTURE.md`** - DB 스키마 및 Security Rules
- **`DESIGN_SYSTEM.md`** - UI 가이드라인 (컬러, 폰트, 컴포넌트)
- **`DEPLOYMENT.md`** - Vercel 배포 매뉴얼
- **`PROJECT_COMPLETE.md`** - 프로젝트 완료 리포트

### 핵심 컴포넌트

- **`Header.tsx`** - 반응형 네비게이션, 메가메뉴, 검색 모달
- **`Footer.tsx`** - 링크, 연락처, SNS
- **`Button.tsx`** - 4가지 variant (primary, secondary, outline, ghost)
- **`Card.tsx`** - Framer Motion 애니메이션 통합

### 페이지

- **`Home.tsx`** - 히어로, 서비스 카드, 통계, 공지사항 (약 400줄)
- **`IndustrialHealth.tsx`** - 서비스 상세 페이지 템플릿
- **`Login.tsx`** - 로그인 폼 (validation, 상태 관리)

### 설정

- **`firebase.ts`** - Firebase SDK 초기화
- **`types/index.ts`** - 15+ 인터페이스 (User, Certificate, Notice 등)
- **`App.tsx`** - React Router v6 라우팅 (lazy loading)

---

## 🔄 향후 추가될 파일 (Phase 2)

### Hooks

```
src/hooks/
├── useAuth.ts           # Firebase Auth 훅
├── useFirestore.ts      # Firestore CRUD 훅
├── useStorage.ts        # Firebase Storage 훅
└── useForm.ts           # 폼 validation 훅
```

### Utils

```
src/utils/
├── formatters.ts        # 날짜, 숫자 포맷팅
├── validators.ts        # 입력값 검증
├── api.ts              # Firebase API 래퍼
└── constants.ts         # 상수 정의
```

### Store (Zustand)

```
src/store/
├── authStore.ts         # 인증 상태 관리
├── uiStore.ts          # UI 상태 (다크모드, 사이드바)
└── dataStore.ts        # 데이터 캐싱
```

### Features

```
src/components/features/
├── SearchModal.tsx      # 통합 검색
├── QuoteForm.tsx        # 견적 요청 폼
├── CertificateLookup.tsx # 성적서 조회
├── BoardList.tsx        # 게시판 리스트
└── AdminTable.tsx       # 관리자 테이블
```

### Pages (추가)

```
src/pages/
├── CertificateLookup.tsx
├── QuoteRequest.tsx
├── About.tsx
└── Contact.tsx
```

---

## 📦 의존성 패키지 (package.json)

### 프로덕션 의존성

- `react` (18.3.1) - UI 라이브러리
- `react-dom` (18.3.1)
- `react-router-dom` (6.22.0) - 라우팅
- `firebase` (10.8.0) - 백엔드
- `framer-motion` (11.0.3) - 애니메이션
- `lucide-react` (0.344.0) - 아이콘
- `react-hook-form` (7.50.0) - 폼 관리
- `zustand` (4.5.0) - 상태 관리
- `date-fns` (3.3.1) - 날짜 유틸리티

### 개발 의존성

- `@vitejs/plugin-react` (4.2.1)
- `typescript` (5.3.3)
- `tailwindcss` (3.4.1)
- `autoprefixer` (10.4.17)
- `eslint` (8.56.0)
- `@types/react` (18.3.1)
- `@types/react-dom` (18.3.0)

---

## 🎨 스타일 구조

### Tailwind 커스텀 설정

- **컬러**: Primary (Blue), Secondary (Sky), Accent (Orange), Neutral (Gray)
- **폰트**: Pretendard Variable
- **스페이싱**: 4px 기반 시스템
- **애니메이션**: fadeIn, slideUp, scaleIn, float

### CSS 클래스 구조

```css
/* 유틸리티 클래스 (index.css) */
.btn-primary
  .btn-secondary
  .btn-outline
  .btn-ghost
  .card
  .card-hover
  .input
  .badge
  .heading-display
  .heading-xl
  .text-gradient
  .glass;
```

---

## 🔒 보안 파일 (.gitignore)

무시되는 파일들:

- `.env` (환경 변수)
- `node_modules/` (의존성)
- `dist/` (빌드 결과물)
- `.firebase/` (Firebase 캐시)
- `.vercel/` (Vercel 설정)

---

## 📈 프로젝트 성장 예상

### Phase 1 (현재)

- 41개 파일
- 8,000 줄 코드

### Phase 2 (예상)

- +20개 파일 (hooks, utils, features)
- +3,000 줄 코드

### Phase 3 (예상)

- +10개 파일 (테스트, 추가 페이지)
- +2,000 줄 코드

### 최종 (예상)

- **총 70+ 파일**
- **총 13,000+ 줄 코드**

---

이 파일 트리는 프로젝트의 전체 구조를 한눈에 파악하기 위한 참고 자료입니다.
