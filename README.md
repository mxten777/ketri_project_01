# 한국환경안전연구소 (KETRI) 공식 웹사이트

> 프리미엄급 환경안전 전문기관 웹사이트 리뉴얼 프로젝트

## 🎯 프로젝트 개요

한국환경안전연구소의 공식 홈페이지를 최신 웹 기술 스택으로 리뉴얼한 프로젝트입니다.
산업보건, 먹는물 검사, 석면조사, 실내공기질 측정 등 전문 서비스를 제공하는 연구소의 신뢰성과 전문성을 강조한 프리미엄 UI/UX를 제공합니다.

## 🚀 기술 스택

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3.4+
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
ketri_project_01/
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트 (Button, Card, etc.)
│   │   ├── layout/         # 레이아웃 컴포넌트 (Header, Footer, etc.)
│   │   └── features/       # 기능별 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── services/       # 서비스 페이지들
│   │   ├── admin/          # 관리자 페이지
│   │   └── auth/           # 인증 페이지
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸리티 함수
│   ├── types/              # TypeScript 타입 정의
│   ├── store/              # Zustand 스토어
│   ├── config/             # 설정 파일
│   │   └── firebase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # 정적 파일
├── docs/                   # 프로젝트 문서
│   ├── SITEMAP.md         # 사이트맵 및 IA
│   ├── DESIGN_SYSTEM.md   # 디자인 시스템
│   ├── FIREBASE_STRUCTURE.md  # Firebase DB 구조
│   └── DEPLOYMENT.md      # 배포 가이드
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## 🎨 주요 기능

### 사용자 기능
- ✅ 반응형 디자인 (Mobile-first)
- ✅ 다크모드 지원
- ✅ 통합 검색 기능 (문서/성적서/게시판)
- ✅ 성적서 조회 시스템
- ✅ 견적 요청 기능 (먹는물, 석면, 공기질)
- ✅ 회원가입 및 로그인 (Firebase Auth)
- ✅ 게시판 (공지사항, 질문답변, 자유게시판, 자료실)
- ✅ 부드러운 애니메이션 및 스크롤 효과

### 관리자 기능
- ✅ 콘텐츠 관리 (CRUD)
- ✅ 성적서 업로드 및 관리
- ✅ 게시판 관리
- ✅ 회원 관리
- ✅ 통계 대시보드

## 📋 메뉴 구조

1. **산업보건컨설팅**
   - 근골격계 유해요인조사
   - 화학물질관리
   - 산업보건컨설팅 실적
   - 업무소개

2. **먹는물 검사**
   - 수질검사 대상 및 범위
   - 수질검사 의뢰 및 수수료
   - 검사 의뢰 신청 절차
   - 업무소개

3. **혈액특성용수**
   - 검사 의뢰 절차
   - 검사기기 및 관련기준
   - 수거기준 및 실행방법
   - 채수방법 및 시료채수 위치

4. **실내공기질 측정**
   - 업무소개
   - 실내공기질 측정 견적 요청
   - 실내공기질 성적서 조회

5. **석면조사·분석**
   - 석면조사 분석
   - 석면지도·도면
   - 석면배출시설측정
   - 석면해체제거 관리
   - 석면건축물 위해성평가
   - 석면건축물 공기질측정

6. **게시판/자료실**
   - 공지사항
   - 질문답변
   - 자유게시판
   - 자료실

7. **로그인/회원**
   - 로그인
   - 회원가입
   - 자료관리

## 🛠️ 설치 및 실행

### 사전 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Firebase 프로젝트 (Auth, Firestore, Storage 활성화)

### 빠른 시작
```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
copy .env.example .env
# .env 파일을 열어 Firebase 설정값을 입력하세요

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 기타 명령어
```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 코드 린팅
npm run lint
```

### 상세 가이드
설치 및 실행에 대한 자세한 내용은 `docs/GETTING_STARTED.md`를 참조하세요.

## 🔥 Firebase 설정

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. 웹 앱 추가 및 설정 정보 복사

### 2. 서비스 활성화
- **Authentication**: Email/Password 활성화
- **Firestore Database**: 프로덕션 모드로 시작
- **Storage**: 파일 업로드용 활성화

### 3. 환경변수 설정
`.env` 파일에 Firebase 설정 추가:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚢 Vercel 배포

### 1. Vercel CLI 설치
```bash
npm i -g vercel
```

### 2. 프로젝트 연결
```bash
vercel
```

### 3. 환경변수 설정
Vercel 대시보드에서 환경변수 추가

### 4. 프로덕션 배포
```bash
vercel --prod
```

### 5. 커스텀 도메인 연결
Vercel 대시보드 > Settings > Domains에서 도메인 추가

## 📱 반응형 브레이크포인트

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary (Blue)**: #0069ff - 메인 브랜드 컬러
- **Secondary (Sky)**: #0ea5e9 - 보조 컬러
- **Accent (Orange)**: #f97316 - 강조 컬러
- **Neutral**: Gray scale

### 타이포그래피
- **Font Family**: Pretendard Variable
- **Display Large**: 72px (4.5rem)
- **Display Medium**: 60px (3.75rem)
- **Display Small**: 48px (3rem)

자세한 내용은 `docs/DESIGN_SYSTEM.md` 참조

## 📄 라이선스

Copyright © 2024 한국환경안전연구소 (KETRI). All rights reserved.

## 👥 개발팀

- **Development**: Vibe Coding Team
- **Design**: Premium UI/UX Standards
- **Client**: 한국환경안전연구소 (KETRI)

## 📚 문서

| 문서 | 설명 |
|-----|------|
| [GETTING_STARTED.md](docs/GETTING_STARTED.md) | 설치 및 실행 가이드 |
| [SITEMAP.md](docs/SITEMAP.md) | 사이트맵 및 정보구조 (IA) |
| [FIREBASE_STRUCTURE.md](docs/FIREBASE_STRUCTURE.md) | Firebase DB 구조 및 Security Rules |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | 디자인 시스템 및 스타일 가이드 |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel 배포 가이드 |
| [PROJECT_COMPLETE.md](docs/PROJECT_COMPLETE.md) | 프로젝트 완료 리포트 |

## 📞 문의

- **Website**: http://www.ketri.co.kr
- **Email**: info@ketri.co.kr
- **Phone**: 02-1234-5678 (예시)

## 🎯 프로젝트 현황

### Phase 1: 프론트엔드 구축 ✅ (완료)
- ✅ 프로젝트 초기 설정
- ✅ 디자인 시스템 구축
- ✅ 공통 컴포넌트 개발 (Header, Footer, Button, Card 등)
- ✅ 주요 페이지 구현 (Home, 서비스 6개, 인증, 관리자)
- ✅ 반응형 디자인 & 다크모드
- ✅ Firebase 구조 설계
- ✅ SEO 최적화
- ✅ 배포 설정 (Vercel)
- ✅ 문서화 (6개 가이드 문서)

### Phase 2: 백엔드 연동 🔜 (예정)
- [ ] Firebase Auth 구현
- [ ] Firestore CRUD
- [ ] 성적서 조회 시스템
- [ ] 견적 요청 폼
- [ ] 게시판 기능
- [ ] 관리자 대시보드

### Phase 3: 배포 & 최적화 🔜 (예정)
- [ ] 프로덕션 배포
- [ ] 도메인 연결
- [ ] 테스트 작성
- [ ] 성능 최적화
- [ ] 최종 QA

---

**Built with ❤️ by Vibe Coding Team**  
**Version:** 1.0.0 (Phase 1 Complete)
