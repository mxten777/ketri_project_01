# 🗺️ Kakao Maps SDK 로딩 실패 진단 및 해결 가이드

## A. 진단 체크리스트

### 1️⃣ Console 에러 확인
브라우저 개발자 도구 (F12) → Console 탭에서 다음 키워드 확인:

#### ✅ 체크할 에러 메시지
```
🔴 "Unauthorized" / "Invalid key" / "App key error"
   → API 키가 잘못되었거나 만료됨

🔴 "Blocked by client" / "Load denied"
   → 브라우저 확장 프로그램(AdBlock 등)이 차단

🔴 "CORS policy" / "Cross-Origin"
   → CORS 설정 문제 (드물음, Kakao는 CORS 허용)

🔴 "CSP" / "Content Security Policy"
   → Vercel/Next.js의 CSP 헤더가 외부 스크립트 차단

🔴 "Failed to load Kakao Maps SDK script"
   → 네트워크 문제 또는 스크립트 URL 오류

🔴 "Kakao Maps object not found"
   → SDK 로드는 됐으나 window.kakao.maps가 없음

🔴 "Kakao Maps loading timeout"
   → 10초 내 로딩 실패 (네트워크 느림)
```

### 2️⃣ Network 탭 확인
개발자 도구 → Network 탭에서 스크립트 로드 상태 확인:

```
✅ 정상: sdk.js → Status: 200 (초록색)
❌ 실패: sdk.js → Status: 403 (빨간색) - API 키 인증 실패
❌ 실패: sdk.js → Status: 404 (빨간색) - URL 오류
❌ 실패: sdk.js → Status: (failed) (빨간색) - 네트워크 차단/CORS
```

**확인 방법:**
1. Network 탭 열기
2. 페이지 새로고침 (Ctrl+R / Cmd+R)
3. 필터에 `kakao` 입력
4. `sdk.js` 파일의 Status Code 확인

### 3️⃣ 환경변수 설정 확인 (Vercel)

#### Vite 프로젝트 환경변수 규칙
```bash
# ❌ 잘못된 형식 (Next.js용)
NEXT_PUBLIC_KAKAO_JS_KEY=xxxxx

# ✅ 올바른 형식 (Vite용)
VITE_KAKAO_JS_KEY=xxxxx
```

#### Vercel 대시보드 설정
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 다음 3가지 환경 모두 설정:
   - ✅ **Production** (프로덕션 배포)
   - ✅ **Preview** (Pull Request 미리보기)
   - ✅ **Development** (로컬 개발 - 선택)

4. 설정 후 **재배포 필수** (Redeploy)

### 4️⃣ Kakao Developers 콘솔 설정

#### 허용 도메인 등록 확인
[Kakao Developers](https://developers.kakao.com/) → 내 애플리케이션 → 앱 설정 → 플랫폼

**등록해야 할 도메인:**
```
✅ localhost:5173          (로컬 개발)
✅ kesri.co.kr             (프로덕션 도메인)
✅ www.kesri.co.kr         (www 서브도메인)
✅ *.vercel.app            (Vercel Preview 배포)
✅ ketri-project-01.vercel.app  (실제 Vercel 도메인)
```

**주의사항:**
- 프로토콜 없이 도메인만 입력 (❌ `https://kesri.co.kr`, ✅ `kesri.co.kr`)
- 포트 번호 포함 (localhost는 `localhost:5173`)
- 와일드카드 지원: `*.vercel.app` 으로 모든 Vercel 미리보기 허용

### 5️⃣ 브라우저 확장 프로그램 확인

**차단 가능성 있는 확장:**
- AdBlock / uBlock Origin
- Privacy Badger
- Ghostery
- 기타 광고/트래커 차단 확장

**테스트 방법:**
1. 시크릿 모드(Incognito) 실행
2. 확장 프로그램 없이 페이지 접속
3. 지도가 표시되면 → 확장 프로그램이 원인

---

## B. 문제별 해결 방법

### 🔧 Case 1: API 키 오류 (403 Forbidden)
```
증상: Network에서 sdk.js가 403 또는 "Unauthorized"
해결:
1. .env 파일 확인: VITE_KAKAO_JS_KEY=xxxxx
2. Vercel 환경변수 재설정
3. Kakao Developers 콘솔에서 키 유효성 확인
4. 재배포 (Vercel Redeploy)
```

### 🔧 Case 2: 도메인 미등록 (Client error)
```
증상: Console에 "Blocked by client" 또는 인증 실패
해결:
1. Kakao Developers → 플랫폼 설정
2. 현재 도메인 등록 (kesri.co.kr, *.vercel.app)
3. 5분 대기 (설정 반영)
4. 페이지 새로고침
```

### 🔧 Case 3: StrictMode 중복 실행
```
증상: 개발 모드에서 지도가 깜빡이거나 에러 발생
해결:
- useEffect에 ref 기반 초기화 방어 로직 추가 (아래 코드 참고)
- 이미 수정된 코드에서는 mapInstanceRef.current로 체크
```

### 🔧 Case 4: CSP (Content Security Policy) 차단
```
증상: Console에 "blocked by CSP" 메시지
해결:
- Vercel의 next.config.js 또는 vercel.json에 CSP 헤더 설정
- dapi.kakao.com 허용 추가

vercel.json 예시:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://dapi.kakao.com;"
        }
      ]
    }
  ]
}
```

---

## C. 개선된 코드 적용 (다음 단계)

개선 사항:
1. ✅ 상세 로깅 추가 (진단용)
2. ✅ StrictMode 안전 처리
3. ✅ 네트워크 타임아웃 처리
4. ✅ Graceful fallback (실패 시 UI 표시)

코드는 별도로 수정됩니다.

---

## D. 배포 전 최종 체크리스트

### ✅ 로컬 환경
- [ ] `.env` 파일에 `VITE_KAKAO_JS_KEY` 설정
- [ ] `npm run dev` 실행 시 지도 정상 표시
- [ ] Console에 에러 없음

### ✅ Vercel 환경
- [ ] Environment Variables에 `VITE_KAKAO_JS_KEY` 설정 (Production + Preview)
- [ ] Kakao Developers에 `*.vercel.app` 도메인 등록
- [ ] 배포 후 Preview URL에서 지도 확인
- [ ] 프로덕션 도메인에서 지도 확인

### ✅ Kakao Developers
- [ ] 앱 키 유효성 확인
- [ ] 플랫폼에 모든 도메인 등록
- [ ] JavaScript 키 사용 (REST API 키 아님)

---

## E. 실시간 디버깅 팁

### Console에서 직접 확인:
```javascript
// 1. 환경변수 확인
console.log('KAKAO_KEY:', import.meta.env.VITE_KAKAO_JS_KEY);

// 2. SDK 로드 여부 확인
console.log('Kakao SDK:', window.kakao);
console.log('Maps:', window.kakao?.maps);

// 3. 스크립트 태그 확인
console.log('Script:', document.querySelector('script[src*="kakao"]'));
```

### Network 탭에서 확인:
1. `sdk.js` 파일의 Response 탭 클릭
2. 에러 메시지 확인 (JSON 형태로 응답)
3. 예시: `{"error": "invalid_key"}` → API 키 오류

---

## F. 긴급 대응 (임시 해결책)

지도 SDK가 계속 실패하는 경우, iframe 기반으로 전환:

```tsx
// Location.tsx에서 임시로 iframe 사용
<iframe
  src={CONTACT_INFO.kakaoMapEmbed}
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

**장점:**
- API 키 불필요
- 도메인 제한 없음
- 100% 안정적

**단점:**
- 커스터마이징 불가
- 스타일 제어 제한
