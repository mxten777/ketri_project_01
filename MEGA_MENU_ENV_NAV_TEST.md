# 🧪 환경측정 메가메뉴 네비게이션 테스트

## 📋 재현 절차 (고정)

### 1단계: 초기 환경 설정
```
1. 브라우저 개발자 도구 콘솔 오픈
2. 로컬 개발 서버 실행 (npm run dev)
3. 홈페이지(/)에서 시작
```

### 2단계: 50회 반복 테스트 시나리오

각 회차마다 아래 3단계를 수행:

```
A) 홈(/) → 메가메뉴 hover → "작업환경측정" 메인 항목 클릭
   - 기대: /services/industrial-health 로 이동
   - 기대: window.scrollY === 0

B) 메가메뉴 hover → "오시는길" (/about/location#map) 클릭
   - 기대: /about/location 로 이동
   - 기대: #map 위치로 스크롤

C) 메가메뉴 hover → "작업환경측정" 메인 항목 다시 클릭
   - 기대: /services/industrial-health 로 이동
   - 기대: window.scrollY === 0 (항상 최상단)
```

### 3단계: 실패 조건 기록

다음 중 하나라도 발생하면 실패로 기록:
- [ ] navigate() 호출 횟수가 1회가 아님 (2회 이상 또는 0회)
- [ ] 환경측정 페이지 진입 시 scrollY가 0이 아님
- [ ] 클릭이 무시되거나 페이지 전환이 안 됨
- [ ] 메가메뉴가 닫히지 않고 남아있음
- [ ] 콘솔에 에러 발생

---

## 🔍 디버그 로그 체크포인트

### HeaderMegaMenu.tsx - handleNav 함수
```typescript
// [MEGA_NAV] 로그 추가 위치
function handleNav(e: React.MouseEvent, targetHref: string) {
  const scrollBefore = window.scrollY;
  console.log('[MEGA_NAV] Click:', {
    label: e.currentTarget.textContent?.trim(),
    targetHref,
    hasHash: targetHref.includes('#'),
    scrollBefore,
    pathname: location.pathname,
  });
  
  // ... 기존 로직
  
  // navigate 호출 후
  console.log('[MEGA_NAV] Navigate called:', targetHref);
}
```

### IndustrialHealth.tsx - 라우트 진입 보호
```typescript
// [ENV_GUARD] 로그 추가
useLayoutEffect(() => {
  console.log('[ENV_GUARD] Industrial Health mounted:', {
    pathname: location.pathname,
    hash: location.hash,
    scrollY: window.scrollY,
  });
  
  // 스크롤 보호 로직
  
  console.log('[ENV_GUARD] Scroll reset to:', window.scrollY);
}, [location.pathname]);
```

### React Router - 라우트 변경 감지
```typescript
// [ROUTE_EFFECT] App.tsx 또는 라우트 파일에 추가
useEffect(() => {
  console.log('[ROUTE_EFFECT] Route changed:', {
    pathname: location.pathname,
    hash: location.hash,
    scrollY: window.scrollY,
  });
}, [location]);
```

---

## 🐛 예상 원인 분석

### 원인 1: 이중 navigate 호출
- **증상**: navigate()가 같은 클릭에 2회 호출됨
- **근거**: Link 컴포넌트의 기본 동작 + handleNav의 navigate
- **해결**: e.preventDefault() + e.stopPropagation() 확실히 적용

### 원인 2: Scroll Restoration 충돌
- **증상**: 브라우저의 scroll restoration이 이전 위치로 복원
- **근거**: React Router의 기본 scroll restoration과 충돌
- **해결**: 환경측정 라우트에서 useLayoutEffect로 강제 scrollTo(0,0)

### 원인 3: Mega Menu Overlay 전파
- **증상**: 클릭 이벤트가 overlay에 가로채짐
- **근거**: Portal + fixed positioning의 이벤트 버블링
- **해결**: closeMega()를 navigate() 전에 먼저 실행

### 원인 4: Hash 링크 혼재
- **증상**: hash 링크와 non-hash 링크의 스크롤 처리가 다름
- **근거**: hash는 브라우저 기본 동작, non-hash는 수동 제어
- **해결**: hasHash 분기로 스크롤 처리 분리

---

## ✅ 수정 전 체크리스트

- [ ] 현재 코드에서 50회 테스트 실행 (실패 횟수 기록)
- [ ] 디버그 로그 추가 (3개 위치)
- [ ] 실패 케이스 로그 3줄 확보
- [ ] 원인 1~2개로 확정

---

## ✅ 수정 후 체크리스트

- [ ] HeaderMegaMenu handleNav 수정 (navigate 1회 보장)
- [ ] IndustrialHealth.tsx 스크롤 보호 추가
- [ ] 50회 테스트 실행 (실패 0회 확인)
- [ ] 회귀 테스트: PC 해상도
- [ ] 회귀 테스트: 모바일 해상도
- [ ] 회귀 테스트: 다른 메뉴 항목 (먹는물 검사, 석면 등)
- [ ] 회귀 테스트: 새로고침 후 동작
- [ ] 디버그 로그 제거

---

## 📊 테스트 결과 기록

### 수정 전
```
총 50회 테스트
실패: ___회
성공률: ___%
```

### 수정 후
```
총 50회 테스트
실패: 0회
성공률: 100%
```

---

## 🧹 디버그 로그 제거 가이드

커밋 전 반드시 제거할 항목:
1. HeaderMegaMenu.tsx의 `console.log('[MEGA_NAV]', ...)`
2. IndustrialHealth.tsx의 `console.log('[ENV_GUARD]', ...)`
3. App.tsx 또는 라우트의 `console.log('[ROUTE_EFFECT]', ...)`

제거 확인 명령:
```bash
# 로그가 남아있는지 확인
git grep -n "console.log\('\[MEGA_NAV\]"
git grep -n "console.log\('\[ENV_GUARD\]"
git grep -n "console.log\('\[ROUTE_EFFECT\]"
```

---

## 📝 최종 PR 코멘트 템플릿

```markdown
## 🐛 Bug Fix: 환경측정 메가메뉴 반복 클릭 시 스크롤 위치 오류

### 문제
- "작업환경측정" 메가메뉴 반복 클릭 시 scrollY가 0으로 초기화되지 않음
- 이전 스크롤 위치로 돌아가거나 의도하지 않은 위치로 이동

### 원인
1. **이중 navigate 호출**: [구체적 근거]
2. **Scroll Restoration 충돌**: [구체적 근거]

### 해결
1. `HeaderMegaMenu.tsx` (L100-127)
   - closeMega() → navigate() 순서 보장
   - e.preventDefault() + e.stopPropagation() 강화
   
2. `IndustrialHealth.tsx` (L1-20)
   - useLayoutEffect 스크롤 보호 장치 추가
   - 환경측정 라우트 진입 시 항상 scrollTo(0,0)

### 테스트
- 50회 반복 테스트: 실패 0회 (100%)
- 회귀 테스트: 다른 메뉴, hash 링크, 모바일 모두 정상

### 수정 파일
- `src/components/layout/HeaderMegaMenu.tsx`
- `src/pages/services/IndustrialHealth.tsx`
```

---

## 🔄 회귀 테스트 시나리오

### 시나리오 1: 다른 서비스 메뉴
```
- 먹는물 검사 → 환경측정 → 먹는물 검사 (10회)
- 석면조사분석 → 환경측정 → 석면조사분석 (10회)
```

### 시나리오 2: Hash 링크
```
- 환경측정 → 오시는길#map → 환경측정 (10회)
- 환경측정 → 인증서 → 환경측정 (10회)
```

### 시나리오 3: 새로고침
```
- 환경측정 진입 → F5 새로고침 → 스크롤 확인 (5회)
```

### 시나리오 4: 모바일
```
- 모바일 해상도(375px)로 동일 테스트 (10회)
```
