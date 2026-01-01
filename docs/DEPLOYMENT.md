# Vercel 배포 가이드 - KETRI 웹사이트

## 📦 배포 전 체크리스트

### 1. 환경 변수 설정

`.env` 파일에 Firebase 설정 추가:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_SITE_URL=https://ketri.co.kr
```

### 2. 빌드 테스트

로컬에서 프로덕션 빌드 테스트:

```bash
npm run build
npm run preview
```

브라우저에서 `http://localhost:4173` 접속하여 확인

### 3. Git 저장소 준비

```bash
git init
git add .
git commit -m "Initial commit: KETRI website"
git branch -M main
git remote add origin https://github.com/your-username/ketri-website.git
git push -u origin main
```

---

## 🚀 Vercel 배포 방법

### 방법 1: Vercel 대시보드 (추천)

#### Step 1: Vercel 계정 생성

1. [Vercel 웹사이트](https://vercel.com/) 접속
2. "Sign Up" 클릭
3. GitHub 계정으로 로그인

#### Step 2: 프로젝트 Import

1. Vercel 대시보드에서 "Add New..." > "Project" 클릭
2. GitHub 저장소 선택
3. "Import" 클릭

#### Step 3: 프로젝트 설정

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Step 4: 환경 변수 설정

Environment Variables 섹션에서 `.env` 파일의 변수들을 추가:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_SITE_URL`

#### Step 5: 배포

"Deploy" 버튼 클릭

배포 완료 후 `https://your-project.vercel.app` 형태의 URL 생성

---

### 방법 2: Vercel CLI

#### Step 1: CLI 설치

```bash
npm i -g vercel
```

#### Step 2: 로그인

```bash
vercel login
```

#### Step 3: 프로젝트 연결

```bash
cd ketri_project_01
vercel
```

프롬프트에 따라 설정:

- Set up and deploy?: Y
- Which scope?: (계정 선택)
- Link to existing project?: N
- What's your project's name?: ketri-website
- In which directory is your code located?: ./
- Want to override the settings?: N

#### Step 4: 환경 변수 추가

```bash
vercel env add VITE_FIREBASE_API_KEY production
# 프롬프트에 값 입력

# 모든 환경 변수에 대해 반복
```

또는 Vercel 대시보드에서 추가

#### Step 5: 프로덕션 배포

```bash
vercel --prod
```

---

## 🌐 커스텀 도메인 연결

### Step 1: Vercel에서 도메인 추가

1. Vercel 대시보드 > 프로젝트 선택
2. Settings > Domains
3. "Add" 버튼 클릭
4. 도메인 입력 (예: `ketri.co.kr`)

### Step 2: DNS 설정

도메인 제공업체(예: Cafe24, Gabia 등)에서 DNS 레코드 추가:

#### A Record (권장)

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME Record

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서 발급 (24시간 이내)

---

## 🔄 자동 배포 설정

### GitHub 연동 (기본 설정)

Git push 시 자동 배포:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Vercel이 자동으로 감지하여 배포 시작

### 배포 브랜치 설정

특정 브랜치만 배포:

1. Project Settings > Git
2. Production Branch: `main`
3. Branch Deployments: `preview` 브랜치는 미리보기로 배포

---

## 📊 성능 최적화

### 1. 이미지 최적화

Vercel Image Optimization 사용:

```typescript
// next/image 대신 기본 img 태그 + loading="lazy"
<img src="/images/hero.jpg" alt="Hero" loading="lazy" />
```

### 2. 코드 스플리팅

이미 구현됨 (`vite.config.ts`의 `manualChunks` 설정)

### 3. Gzip/Brotli 압축

Vercel이 자동으로 활성화

### 4. CDN 캐싱

정적 파일 캐싱 설정 (`vercel.json`에 이미 포함):

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🔍 SEO 설정

### 1. Meta Tags

`index.html`에 이미 포함됨:

- Title, Description
- Open Graph tags
- Twitter Card

### 2. robots.txt

`public/robots.txt` 생성:

```
User-agent: *
Allow: /

Sitemap: https://ketri.co.kr/sitemap.xml
```

### 3. sitemap.xml

`public/sitemap.xml` 생성:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ketri.co.kr/</loc>
    <lastmod>2024-12-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ketri.co.kr/industrial-health</loc>
    <lastmod>2024-12-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 다른 페이지들 -->
</urlset>
```

### 4. Google Search Console

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 속성 추가 > URL 접두어 > `https://ketri.co.kr`
3. 소유권 확인 (HTML 파일 업로드 또는 메타태그)
4. Sitemap 제출: `https://ketri.co.kr/sitemap.xml`

---

## 📈 모니터링 & 분석

### 1. Vercel Analytics

Vercel 대시보드에서 자동으로 제공:

- 페이지뷰
- Core Web Vitals
- 방문자 수
- 디바이스/브라우저 통계

### 2. Google Analytics

Firebase Analytics 사용 (이미 설정됨):

```typescript
import { analytics } from "@config/firebase";
import { logEvent } from "firebase/analytics";

// 이벤트 로깅
logEvent(analytics, "page_view", {
  page_path: window.location.pathname,
});
```

### 3. 오류 모니터링

개발자 도구 콘솔 또는 Sentry 연동 권장

---

## 🔐 보안 설정

### 1. 환경 변수 보호

- `.env` 파일은 절대 Git에 커밋하지 않음 (`.gitignore`에 포함)
- Vercel 대시보드에서만 설정

### 2. CORS 설정

Firebase Console에서 허용된 도메인 추가:

1. Firebase Console > Authentication > Settings
2. Authorized domains: `ketri.co.kr`, `www.ketri.co.kr`

### 3. Security Headers

`vercel.json`에 이미 포함됨:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

---

## 🐛 트러블슈팅

### 빌드 실패 시

1. 로컬에서 빌드 테스트:

```bash
npm run build
```

2. 에러 메시지 확인 후 수정

3. 환경 변수 확인

### 404 에러 발생 시

`vercel.json`의 rewrites 설정 확인:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 환경 변수가 적용되지 않을 때

1. Vercel 대시보드 > Settings > Environment Variables 확인
2. 변수명이 `VITE_` 접두사로 시작하는지 확인
3. 재배포 필요 (설정 변경 후)

---

## 🔄 재배포 방법

### 자동 재배포 (Git Push)

```bash
git add .
git commit -m "Update"
git push origin main
```

### 수동 재배포

Vercel 대시보드 > Deployments > 마지막 배포 > "Redeploy"

### CLI로 재배포

```bash
vercel --prod
```

---

## 📱 미리보기 배포

PR 생성 시 자동으로 미리보기 배포 생성

또는 브랜치별 미리보기:

```bash
git checkout -b feature/new-page
# 변경사항 커밋
git push origin feature/new-page
```

Vercel이 자동으로 `https://ketri-website-git-feature-new-page.vercel.app` 형태의 미리보기 URL 생성

---

## 🎯 배포 후 체크리스트

- [ ] 모든 페이지 정상 작동 확인
- [ ] 반응형 디자인 테스트 (모바일, 태블릿, 데스크톱)
- [ ] 다크모드 전환 테스트
- [ ] 폼 제출 테스트
- [ ] 이미지 로딩 확인
- [ ] 로그인/회원가입 테스트
- [ ] SEO 메타태그 확인
- [ ] Google Analytics 연동 확인
- [ ] SSL 인증서 확인 (https)
- [ ] 도메인 리다이렉트 확인 (www ↔ non-www)
- [ ] 404 페이지 테스트
- [ ] Core Web Vitals 점수 확인

---

## �️ /ops/ai 상태 바 개선(최종)

### 목적
/ops/ai가 공식 서비스가 아닌 내부 운영자용 AI 보조 도구임을 화면만으로 즉시 인식시키기 위함

### 구성(좌측 정렬)
- **기관 로고 심볼**: `/images/ketri_symbol.png`, 높이 20px(h-5), pointer-events-none, select-none
- **AI 이모지**: 🤖 단일, 클릭 불가
- **메인 문구**: "내부 AI 보조 도구 (운영 전용 · 비공식)"
- **보조 설명**: "본 도구는 내부 운영 참고용이며, AI 결과는 최종 판단이 아닙니다."

### 스타일/규정 준수
- 단색 배경(bg-yellow-50, dark 대응)
- border-b로만 구분
- opacity/blur/backdrop-filter/shadow 미사용
- static position(fixed/sticky 미사용)
- 배지 스타일 제거

### 영향 범위
- /ops/ai 내부 UI만 변경
- 전역 CSS/토큰/기능 로직 변경 없음
- 네트워크 전송/데이터 저장 없음(클립보드 복사만)

---

## �📞 지원

문제 발생 시:

1. [Vercel 문서](https://vercel.com/docs)
2. [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)
3. Vercel Support (Pro 플랜 이상)

---

**배포 성공을 기원합니다! 🚀**
