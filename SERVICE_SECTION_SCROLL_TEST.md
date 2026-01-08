# 🧪 환경측정 페이지 내부 섹션 스크롤 테스트

## 📋 재현 절차 (고정)

### 1단계: 초기 환경 설정
```
1. 브라우저 개발자 도구 콘솔 오픈
2. 로컬 개발 서버 실행 (npm run dev)
3. /services/industrial-health 페이지 접속
4. 페이지가 완전히 로드될 때까지 대기
```

### 2단계: 50회 반복 테스트 시나리오

각 회차마다 아래 순서로 섹션 이동:

```
A) 세부 서비스 → "작업환경측정" 클릭
   - 기대: #work-environment 섹션이 화면 상단에 정확히 위치
   - 기대: 섹션 제목이 헤더에 가려지지 않음

B) 세부 서비스 → "근골격계유해요인조사" 클릭
   - 기대: #musculoskeletal 섹션이 화면 상단에 정확히 위치
   - 기대: 섹션 제목이 헤더에 가려지지 않음

C) 세부 서비스 → "위험성평가" 클릭
   - 기대: #risk-assessment 섹션이 화면 상단에 정확히 위치
   - 기대: 섹션 제목이 헤더에 가려지지 않음

D) 세부 서비스 → "화학물질관리" 클릭
   - 기대: #chemical-management 섹션이 화면 상단에 정확히 위치
   - 기대: 섹션 제목이 헤더에 가려지지 않음

E) 세부 서비스 → "서비스 프로세스" 클릭
   - 기대: #service-process 섹션이 화면 상단에 정확히 위치
   - 기대: 섹션 제목이 헤더에 가려지지 않음
```

### 3단계: 실패 조건 기록

다음 중 하나라도 발생하면 실패로 기록:
- [ ] 섹션이 화면 중간에 멈춤 (상단이 아님)
- [ ] 섹션 제목이 fixed header에 가려짐
- [ ] 클릭할수록 위치 오차가 누적됨
- [ ] 스크롤 애니메이션 중 중간에 멈춤
- [ ] 클릭이 무시되거나 이동하지 않음

---

## 🔍 디버그 로그 체크포인트

### IndustrialHealth.tsx - 사이드바 클릭 핸들러
```typescript
// [SERVICE_NAV] 로그 추가 위치
const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  const scrollBefore = window.scrollY;
  console.log('[SERVICE_NAV] Sidebar click:', {
    targetId,
    scrollBefore,
    headerHeight: getComputedStyle(document.documentElement).getPropertyValue('--app-header-h'),
  });
  
  // preventDefault + scrollIntoView 로직
  
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();
    console.log('[SERVICE_NAV] Target element position:', {
      top: rect.top,
      scrollYAfter: window.scrollY,
      actualTop: rect.top + window.scrollY,
    });
  }
};
```

---

## 🐛 예상 원인 분석

### 원인 1: CSS :target과 브라우저 smooth scroll 충돌
- **증상**: 브라우저의 기본 smooth scroll이 정확한 위치를 못 찾음
- **근거**: CSS scroll-margin-top은 설정되어 있으나 smooth scroll 시 부정확
- **해결**: preventDefault + scrollIntoView({ block: "start" }) 직접 제어

### 원인 2: Dynamic content로 인한 layout shift
- **증상**: 섹션 높이가 렌더 중 변경되어 스크롤 위치 틀어짐
- **근거**: 카드 안의 콘텐츠가 로드되면서 높이 변화
- **해결**: requestAnimationFrame으로 렌더 완료 후 스크롤

### 원인 3: Fixed header 높이 계산 불일치
- **증상**: scroll-margin-top이 실제 헤더 높이와 맞지 않음
- **근거**: CSS variable과 실제 rendered 높이 차이
- **해결**: JS에서 직접 header.offsetHeight 계산

---

## ✅ 수정 전 체크리스트

- [ ] 현재 코드에서 50회 테스트 실행 (실패 횟수 기록)
- [ ] 디버그 로그 추가
- [ ] 실패 케이스 로그 5줄 확보
- [ ] 원인 1~2개로 확정

---

## ✅ 수정 후 체크리스트

- [ ] 사이드바 링크 클릭 핸들러 추가 (preventDefault + scrollIntoView)
- [ ] 50회 테스트 실행 (실패 0회 확인)
- [ ] 회귀 테스트: 메가메뉴 통한 페이지 진입 후 섹션 이동
- [ ] 회귀 테스트: 새로고침 후 hash anchor 직접 접속 (#work-environment)
- [ ] 회귀 테스트: 모바일 해상도
- [ ] 디버그 로그 제거

---

## 📊 테스트 결과 기록

### 수정 전
```
총 50회 테스트 (5개 섹션 × 10회)
실패: ___회
주요 실패 유형:
- 섹션이 중간에 멈춤: __회
- 헤더에 가려짐: __회
- 위치 오차 누적: __회
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
1. IndustrialHealth.tsx의 `console.log('[SERVICE_NAV]', ...)`
2. 핸들러 함수 내의 모든 임시 로그

제거 확인 명령:
```bash
git grep -n "console.log\('\[SERVICE_NAV\]"
# 위 명령이 "No matches" 반환해야 함
```

---

## 🔄 회귀 테스트 시나리오

### 시나리오 1: 메가메뉴 진입 후 섹션 이동
```
1. 홈 → 메가메뉴 → "작업환경측정" (메인)
2. 사이드바 → "근골격계유해요인조사"
3. 사이드바 → "위험성평가"
(각 이동 시 정확한 위치로 스크롤되는지 확인)
```

### 시나리오 2: Hash anchor 직접 접속
```
1. 브라우저 주소창에 직접 입력:
   /services/industrial-health#work-environment
2. 페이지 로드 시 해당 섹션이 정확한 위치에 표시되는지 확인
3. 다른 섹션 클릭 시 정상 동작 확인
```

### 시나리오 3: 새로고침 후 섹션 이동
```
1. 페이지 중간 스크롤 위치에서 F5 새로고침
2. 사이드바로 섹션 이동
3. 정확한 위치로 이동하는지 확인
```

### 시나리오 4: 모바일 해상도
```
1. 브라우저를 모바일 해상도(375px)로 변경
2. 동일한 섹션 이동 테스트 (10회)
3. 모바일에서도 정확한 위치로 이동하는지 확인
```

---

## 📝 최종 보고 템플릿

```markdown
## 🐛 Bug Fix: 환경측정 페이지 내부 섹션 스크롤 위치 오류

### 문제
- 세부 서비스 사이드바 메뉴 클릭 시 섹션이 정확한 위치로 이동하지 않음
- 섹션 제목이 fixed header에 가려지거나 중간에 멈춤

### 원인
1. [확정된 원인 1]
2. [확정된 원인 2]

### 해결
1. IndustrialHealth.tsx (L[라인번호])
   - onClick 핸들러로 preventDefault + scrollIntoView 직접 제어
   - block: "start" 옵션으로 정확한 위치 보장
   
2. [추가 수정 사항이 있다면]

### 테스트
- 50회 반복 테스트: 실패 0회 (100%)
- 회귀 테스트: 메가메뉴 진입, hash anchor, 새로고침, 모바일 모두 정상

### 수정 파일
- src/pages/services/IndustrialHealth.tsx
```

---

**작성일**: 2026-01-08  
**대상 라우트**: /services/industrial-health  
**섹션**: 작업환경측정, 위험성평가, 근골격계유해요인조사, 화학물질관리, 서비스 프로세스
