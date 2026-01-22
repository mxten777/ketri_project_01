# 🔧 환경변수 및 도메인 설정 가이드

## 1️⃣ 로컬 개발 환경 설정

### .env 파일 생성
프로젝트 루트에 `.env` 파일이 있는지 확인하고, 다음 설정을 추가:

```bash
# Kakao Maps Configuration
VITE_KAKAO_JS_KEY=your_kakao_javascript_key_here
```

**주의사항:**
- ✅ `VITE_` 접두사 필수 (Vite 프로젝트)
- ❌ `NEXT_PUBLIC_` 사용 금지 (Next.js용)
- ❌ 따옴표 없이 값만 입력
- ❌ 공백 없이 입력

**예시:**
```bash
✅ VITE_KAKAO_JS_KEY=e3244b2d8b7e9f66909412c34a7017c6
❌ VITE_KAKAO_JS_KEY="e3244b2d8b7e9f66909412c34a7017c6"
❌ VITE_KAKAO_JS_KEY = e3244b2d8b7e9f66909412c34a7017c6
```

### 개발 서버 재시작
`.env` 파일 변경 후 **반드시 재시작**:

```bash
# 개발 서버 중지 (Ctrl+C)
# 다시 시작
npm run dev
```

### 확인 방법
브라우저 Console에서 확인:

```javascript
console.log(import.meta.env.VITE_KAKAO_JS_KEY);
// 출력: "e3244b2d8b7e9f66909412c34a7017c6"
// undefined가 나오면 설정 오류
```

---

## 2️⃣ Vercel 배포 환경 설정

### A. 환경변수 등록

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트 선택 (`ketri-project-01`)

2. **Settings → Environment Variables**
   - 좌측 메뉴에서 "Settings" 클릭
   - "Environment Variables" 탭 선택

3. **변수 추가**
   ```
   Name:  VITE_KAKAO_JS_KEY
   Value: e3244b2d8b7e9f66909412c34a7017c6
   
   Environment 선택:
   ✅ Production
   ✅ Preview
   ☐ Development (선택사항)
   ```

4. **Save 클릭**

### B. 재배포 (중요!)

환경변수 추가/변경 후 **반드시 재배포**:

**방법 1: Vercel 대시보드**
- Deployments 탭
- 최근 배포 선택
- 우측 메뉴 (⋯) → "Redeploy"

**방법 2: Git Push**
```bash
git commit --allow-empty -m "chore: trigger redeploy for env vars"
git push
```

**방법 3: Vercel CLI**
```bash
vercel --prod
```

### C. 배포 확인

1. **Production URL 접속**
   - https://kesri.co.kr/about/location

2. **Console 확인 (F12)**
   ```
   ✅ [KakaoMaps] 🚀 Loading initiated...
   ✅ [KakaoMaps] ✅ Maps API initialized successfully
   ✅ [Location] 🗺️ Map instance created successfully
   
   ❌ [Location] ❌ VITE_KAKAO_JS_KEY is missing
   → 환경변수 미설정 또는 재배포 안 함
   ```

3. **Network 탭 확인**
   - `sdk.js` 파일 검색
   - Status: **200** (정상) / **403** (API 키 오류)

---

## 3️⃣ Kakao Developers 콘솔 설정

### A. 플랫폼 등록

1. **Kakao Developers 접속**
   - https://developers.kakao.com/
   - 로그인 → "내 애플리케이션"

2. **앱 선택 또는 생성**
   - 기존 앱 선택 또는 "애플리케이션 추가하기"

3. **플랫폼 설정**
   - 좌측 메뉴: "앱 설정" → "플랫폼"
   - "Web 플랫폼 등록" 클릭

4. **도메인 등록**
   다음 도메인들을 **모두** 등록:

   ```
   ✅ localhost:5173
   ✅ kesri.co.kr
   ✅ www.kesri.co.kr
   ✅ ketri-project-01.vercel.app
   ✅ *.vercel.app
   ```

   **입력 형식:**
   - ❌ `https://kesri.co.kr` (프로토콜 제외)
   - ✅ `kesri.co.kr` (도메인만)
   - ✅ `localhost:5173` (포트 포함)

### B. JavaScript 키 확인

1. **앱 설정 → 앱 키**
   - "JavaScript 키" 복사
   - ❌ REST API 키가 아님!

2. **키 형식 확인**
   ```
   ✅ e3244b2d8b7e9f66909412c34a7017c6 (32자 영숫자)
   ❌ KakaoAK1234567890abcdef (REST API 키 형식)
   ```

### C. 설정 반영 시간

- 도메인 등록 후 **5분** 대기
- 즉시 반영되지 않을 수 있음
- 5분 후 페이지 새로고침

---

## 4️⃣ 도메인별 체크리스트

### ✅ 로컬 개발 (localhost:5173)

- [ ] `.env` 파일에 `VITE_KAKAO_JS_KEY` 설정
- [ ] Kakao Developers에 `localhost:5173` 등록
- [ ] 개발 서버 재시작 (`npm run dev`)
- [ ] 브라우저에서 지도 확인
- [ ] Console에 에러 없음

### ✅ Vercel Preview (*.vercel.app)

- [ ] Vercel 환경변수에 `Preview` 체크
- [ ] Kakao Developers에 `*.vercel.app` 등록
- [ ] PR 생성 또는 브랜치 푸시로 Preview 배포
- [ ] Preview URL에서 지도 확인
- [ ] Console 로그 확인

### ✅ Production (kesri.co.kr)

- [ ] Vercel 환경변수에 `Production` 체크
- [ ] Kakao Developers에 `kesri.co.kr` + `www.kesri.co.kr` 등록
- [ ] main 브랜치에 머지 또는 `vercel --prod` 실행
- [ ] 프로덕션 도메인에서 지도 확인
- [ ] 모바일에서도 테스트

---

## 5️⃣ 문제 해결 (Troubleshooting)

### 🔴 "VITE_KAKAO_JS_KEY is missing"

**원인:**
- .env 파일 없음 또는 오타
- Vercel 환경변수 미설정
- 개발 서버 재시작 안 함

**해결:**
1. `.env` 파일 확인 (`VITE_` 접두사 확인)
2. Vercel 대시보드에서 환경변수 확인
3. 개발 서버/배포 재시작

### 🔴 Network 403 Forbidden

**원인:**
- API 키가 잘못됨
- 도메인이 Kakao에 등록되지 않음

**해결:**
1. Kakao Developers에서 **JavaScript 키** 재확인
2. 현재 접속 도메인을 플랫폼에 등록
3. 5분 대기 후 재시도

### 🔴 "window.kakao.maps not found"

**원인:**
- SDK 로드는 됐지만 초기화 실패
- API 키 인증 실패

**해결:**
1. Console에서 `window.kakao` 확인
2. Network 탭에서 SDK Status Code 확인
3. Kakao Developers에서 키 유효성 확인

### 🔴 "blocked by client"

**원인:**
- AdBlock, Privacy Badger 등 확장 프로그램
- 회사/학교 방화벽

**해결:**
1. 시크릿 모드(Incognito)에서 테스트
2. 확장 프로그램 비활성화
3. 모바일에서 테스트

---

## 6️⃣ 최종 검증 스크립트

브라우저 Console에 복사/붙여넣기:

```javascript
// 🧪 Kakao Maps 설정 검증 스크립트
console.log('=== Kakao Maps 설정 검증 ===');
console.log('1️⃣ 환경변수:', import.meta.env.VITE_KAKAO_JS_KEY ? '✅ 설정됨' : '❌ 없음');
console.log('2️⃣ SDK 로드:', window.kakao ? '✅' : '❌');
console.log('3️⃣ Maps API:', window.kakao?.maps ? '✅' : '❌');
console.log('4️⃣ 스크립트 태그:', document.querySelector('script[src*="kakao"]') ? '✅' : '❌');
console.log('5️⃣ 현재 도메인:', window.location.hostname);
console.log('===========================');
```

**예상 출력 (정상):**
```
=== Kakao Maps 설정 검증 ===
1️⃣ 환경변수: ✅ 설정됨
2️⃣ SDK 로드: ✅
3️⃣ Maps API: ✅
4️⃣ 스크립트 태그: ✅
5️⃣ 현재 도메인: kesri.co.kr
===========================
```

---

## 7️⃣ 긴급 연락처

**Kakao Developers 고객센터:**
- https://devtalk.kakao.com/
- 카카오톡 플러스친구: @카카오데벨로퍼스

**Vercel 지원:**
- https://vercel.com/support
- Discord: https://vercel.com/discord
