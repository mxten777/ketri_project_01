# 한국환경안전연구소 (KETRI) 웹사이트 - 설치 및 실행 가이드

## 🚀 빠른 시작

### 1. 저장소 클론 (또는 프로젝트 폴더로 이동)

```bash
cd c:\ketricoding\ketri_project_01
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사:

```bash
copy .env.example .env
```

`.env` 파일을 열어 Firebase 설정 값 입력:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 📦 프로젝트 구조

```
ketri_project_01/
├── docs/                    # 프로젝트 문서
│   ├── SITEMAP.md          # 사이트맵 및 IA
│   ├── FIREBASE_STRUCTURE.md # Firebase DB 구조
│   ├── DESIGN_SYSTEM.md    # 디자인 시스템 가이드
│   └── DEPLOYMENT.md       # 배포 가이드
│
├── public/                  # 정적 파일
│   ├── favicon.svg
│   └── (이미지 파일들)
│
├── src/                     # 소스 코드
│   ├── components/         # React 컴포넌트
│   │   ├── common/        # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ScrollToTop.tsx
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── features/      # 기능별 컴포넌트
│   │
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── services/      # 서비스 페이지
│   │   │   ├── IndustrialHealth.tsx
│   │   │   ├── WaterTesting.tsx
│   │   │   ├── DialysisWater.tsx
│   │   │   ├── IndoorAirQuality.tsx
│   │   │   └── Asbestos.tsx
│   │   ├── board/         # 게시판 페이지
│   │   │   └── Board.tsx
│   │   ├── auth/          # 인증 페이지
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── admin/         # 관리자 페이지
│   │   │   └── Dashboard.tsx
│   │   └── MyPage.tsx
│   │
│   ├── config/             # 설정 파일
│   │   └── firebase.ts    # Firebase 초기화
│   │
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   │
│   ├── hooks/              # 커스텀 훅 (추후 추가)
│   ├── utils/              # 유틸리티 함수 (추후 추가)
│   ├── store/              # 상태 관리 (추후 추가)
│   │
│   ├── App.tsx            # 메인 App 컴포넌트
│   ├── main.tsx           # 엔트리 포인트
│   └── index.css          # 글로벌 스타일
│
├── .env.example            # 환경 변수 예제
├── .gitignore
├── index.html              # HTML 템플릿
├── package.json            # 의존성 및 스크립트
├── vite.config.ts          # Vite 설정
├── tailwind.config.js      # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
├── vercel.json             # Vercel 배포 설정
└── README.md               # 프로젝트 개요
```

---

## 🛠️ 사용 가능한 스크립트

### 개발 서버

```bash
npm run dev
```

- 개발 모드로 실행
- 핫 리로드 지원
- 포트: 3000

### 프로덕션 빌드

```bash
npm run build
```

- TypeScript 컴파일
- 프로덕션 최적화 빌드
- 출력 디렉토리: `dist/`

### 빌드 미리보기

```bash
npm run preview
```

- 빌드된 파일을 로컬에서 미리보기
- 포트: 4173

### 린팅

```bash
npm run lint
```

- ESLint로 코드 검사

---

## 🔥 Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력: `ketri-website`
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### 2. 웹 앱 추가

1. Firebase Console > 프로젝트 설정
2. "앱 추가" > "웹" 선택
3. 앱 닉네임: `KETRI Website`
4. Firebase Hosting 설정 (선택사항)
5. 구성 정보 복사 → `.env` 파일에 붙여넣기

### 3. Authentication 활성화

1. Firebase Console > Authentication
2. "시작하기" 클릭
3. "Sign-in method" 탭
4. "이메일/비밀번호" 활성화

### 4. Firestore Database 생성

1. Firebase Console > Firestore Database
2. "데이터베이스 만들기" 클릭
3. 프로덕션 모드로 시작
4. 위치 선택: `asia-northeast3 (Seoul)`

**보안 규칙 설정:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 기본적으로 모든 읽기/쓰기 거부
    match /{document=**} {
      allow read, write: if false;
    }

    // 공지사항은 모두 읽기 가능
    match /notices/{noticeId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. Storage 설정

1. Firebase Console > Storage
2. "시작하기" 클릭
3. 보안 규칙 설정 (프로덕션 모드)
4. 위치 선택: `asia-northeast3`

---

## 🎨 디자인 시스템

자세한 내용은 `docs/DESIGN_SYSTEM.md` 참조

### 주요 색상

- Primary: `#0069ff` (블루)
- Secondary: `#0ea5e9` (스카이 블루)
- Accent: `#f97316` (오렌지)

### Tailwind 유틸리티 클래스

```css
.btn-primary      /* 프라이머리 버튼 */
/* 프라이머리 버튼 */
/* 프라이머리 버튼 */
/* 프라이머리 버튼 */
.btn-secondary    /* 세컨더리 버튼 */
.btn-outline      /* 아웃라인 버튼 */
.card             /* 카드 컴포넌트 */
.input            /* 입력 필드 */
.badge; /* 배지 */
```

---

## 📱 반응형 개발

### 브레이크포인트

```
sm:  640px   (모바일 가로)
md:  768px   (태블릿)
lg:  1024px  (데스크톱)
xl:  1280px  (큰 데스크톱)
2xl: 1536px  (매우 큰 화면)
```

### 예제

```tsx
<div
  className="
  grid 
  grid-cols-1      /* 모바일: 1열 */
  md:grid-cols-2   /* 태블릿: 2열 */
  lg:grid-cols-3   /* 데스크톱: 3열 */
  gap-6
"
>
  {/* 카드들 */}
</div>
```

---

## 🧪 개발 팁

### 1. 다크모드 테스트

브라우저 DevTools > Console:

```javascript
document.documentElement.classList.toggle("dark");
```

### 2. Hot Reload 문제 시

```bash
# 개발 서버 재시작
Ctrl + C
npm run dev
```

### 3. TypeScript 에러 해결

```bash
# 타입 체크
npx tsc --noEmit
```

### 4. Tailwind 클래스 자동완성

VSCode Extensions:

- Tailwind CSS IntelliSense
- PostCSS Language Support

---

## 🐛 문제 해결

### 포트 3000이 이미 사용 중일 때

`vite.config.ts` 수정:

```typescript
export default defineConfig({
  server: {
    port: 3001, // 다른 포트로 변경
  },
});
```

### 환경 변수가 인식되지 않을 때

1. `.env` 파일이 루트 디렉토리에 있는지 확인
2. 변수명이 `VITE_` 접두사로 시작하는지 확인
3. 개발 서버 재시작

### Firebase 연결 오류

1. `.env` 파일의 Firebase 설정 확인
2. Firebase Console에서 프로젝트 설정 재확인
3. 네트워크 연결 확인

---

## 📚 추가 리소스

### 공식 문서

- [Vite 문서](https://vitejs.dev/)
- [React 문서](https://react.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Firebase 문서](https://firebase.google.com/docs)
- [Framer Motion 문서](https://www.framer.com/motion/)

### 커뮤니티

- [React 한국어 커뮤니티](https://react.dev/community)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)

---

## ✅ 다음 단계

1. **콘텐츠 추가**

   - 서비스 페이지 상세 내용 작성
   - 이미지 및 미디어 추가
   - 실제 데이터 연동

2. **기능 구현**

   - 성적서 조회 시스템
   - 견적 요청 폼
   - 게시판 CRUD
   - 관리자 대시보드

3. **SEO 최적화**

   - 메타태그 세부 조정
   - Sitemap 생성
   - Google Search Console 연동

4. **테스트**

   - 단위 테스트 작성
   - E2E 테스트
   - 브라우저 호환성 테스트

5. **배포**
   - Vercel 배포 (`docs/DEPLOYMENT.md` 참조)
   - 도메인 연결
   - SSL 인증서 확인

---

**개발 행운을 빕니다! 💪**
