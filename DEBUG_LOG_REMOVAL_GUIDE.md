# 디버그 로그 제거 가이드

## 🧹 제거할 파일 및 라인

### 1. HeaderMegaMenu.tsx
**파일**: `src/components/layout/HeaderMegaMenu.tsx`

**제거할 라인들**:
```typescript
// L104-112: 클릭 로그
const scrollBefore = window.scrollY;
const label = e.currentTarget.textContent?.trim() || '';

console.log('[MEGA_NAV] Click:', {
  label,
  targetHref,
  hasHash: targetHref.includes('#'),
  scrollBefore,
  pathname: location.pathname,
  hash: location.hash,
});

// L120: closeMega 로그
console.log('[MEGA_NAV] Menu closed');

// L125: navigate 로그 (microtask)
console.log('[MEGA_NAV] Navigate called (microtask):', targetHref);

// L131: scrollTo 로그
console.log('[MEGA_NAV] Scroll forced to top');

// L136: navigate 로그 (timeout)
console.log('[MEGA_NAV] Navigate called (timeout):', targetHref);

// L141: scrollTo 로그 (timeout)
console.log('[MEGA_NAV] Scroll forced to top');
```

**정리된 최종 코드**:
```typescript
function handleNav(e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, targetHref: string) {
  e.preventDefault();
  e.stopPropagation();

  const hasHash = targetHref.includes('#');

  // Step 1: Close mega menu first to prevent overlay/portal interaction
  closeMega();

  // Step 2: Navigate after microtask to ensure clean state
  if (typeof queueMicrotask === "function") {
    queueMicrotask(() => {
      navigate(targetHref);
      
      // Step 3: Force scroll to top for non-hash routes only
      if (!hasHash) {
        window.scrollTo(0, 0);
      }
    });
  } else {
    setTimeout(() => {
      navigate(targetHref);
      if (!hasHash) {
        window.scrollTo(0, 0);
      }
    }, 0);
  }
}
```

---

### 2. IndustrialHealth.tsx
**파일**: `src/pages/services/IndustrialHealth.tsx`

**제거할 라인들**:
```typescript
// L11-17: ENV_GUARD 마운트 로그
console.log('[ENV_GUARD] Industrial Health mounted:', {
  pathname: location.pathname,
  hash: location.hash,
  scrollBefore: window.scrollY,
});

// L21: ENV_GUARD 스크롤 리셋 로그
console.log('[ENV_GUARD] Scroll reset to:', window.scrollY);

// L23: ENV_GUARD hash 스킵 로그
console.log('[ENV_GUARD] Hash anchor present, skip scroll reset');

// L27-33: ROUTE_EFFECT 전체 블록
useEffect(() => {
  console.log('[ROUTE_EFFECT] Route effect triggered:', {
    pathname: location.pathname,
    hash: location.hash,
    scrollY: window.scrollY,
  });
}, [location.pathname, location.hash]);
```

**정리된 최종 코드**:
```typescript
// No JS-based header offset; anchors handled via CSS :target
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const IndustrialHealth = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }
  const location = useLocation();

  // Scroll protection for industrial-health route
  useLayoutEffect(() => {
    // Force scroll to top only if no hash anchor
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    // ... 기존 코드
```

---

## ✅ 제거 확인 체크리스트

### 1단계: 로그 검색
```bash
# HeaderMegaMenu
git grep -n "console.log\('\[MEGA_NAV\]" src/components/layout/HeaderMegaMenu.tsx

# IndustrialHealth
git grep -n "console.log\('\[ENV_GUARD\]" src/pages/services/IndustrialHealth.tsx
git grep -n "console.log\('\[ROUTE_EFFECT\]" src/pages/services/IndustrialHealth.tsx
```

**기대 결과**: 모두 "No matches found" 또는 빈 결과

### 2단계: 빌드 테스트
```bash
npm run build
```

**기대 결과**: 빌드 성공, 에러 없음

### 3단계: 런타임 테스트
```bash
npm run dev
# 브라우저에서 작업환경측정 메뉴 3-5회 클릭
# 개발자 도구 콘솔에서 [MEGA_NAV], [ENV_GUARD], [ROUTE_EFFECT] 로그 없음 확인
```

### 4단계: 기능 테스트
- [ ] 작업환경측정 메뉴 클릭 → scrollY === 0 확인
- [ ] 다른 페이지 → 작업환경측정 재진입 → scrollY === 0 확인
- [ ] 작업환경측정#work-environment (hash) → 해당 섹션으로 스크롤 확인
- [ ] 다른 메뉴들 정상 동작 확인

---

## 🚀 커밋 준비

모든 체크리스트 완료 후:

```bash
git add src/components/layout/HeaderMegaMenu.tsx
git add src/pages/services/IndustrialHealth.tsx
git commit -m "fix: 작업환경측정 메가메뉴 반복 클릭 시 스크롤 위치 오류 수정

문제:
- 작업환경측정 메뉴 재진입 시 scrollY가 0으로 고정되지 않음
- 이전 페이지 스크롤 위치가 복원되는 현상

원인:
1. 브라우저 scroll restoration과 React Router 충돌
2. navigate 타이밍 사이에 scroll restoration 실행

해결:
1. IndustrialHealth.tsx에 useLayoutEffect 스크롤 보호 추가
   - 컴포넌트 마운트 시 즉시 scrollTo(0, 0) 강제 실행
   - hash anchor 있는 경우는 보호 로직 생략
2. 기존 HeaderMegaMenu의 navigate 로직 유지
   - closeMega() → navigate() → scrollTo() 순서 보장

테스트:
- 50회 반복 테스트 준비 완료
- 수동 테스트: 재진입 시 scrollY=0 확인

수정 파일:
- src/pages/services/IndustrialHealth.tsx"
```

---

## 📌 주의사항

1. **import 문 정리**: `useEffect`를 사용하지 않으므로 import에서 제거
2. **주석 유지**: `// Scroll protection for industrial-health route` 등 설명 주석은 유지
3. **기능 동작**: 디버그 로그만 제거, 기능 로직은 변경 금지

---

**작성일**: 2026-01-08
