KETRI UI Standard — v1.0 (Freeze)

## 목적 및 범위
- 목적: KETRI에서 이미 검증된 UI/레이아웃 규칙을 문서화하고, 재사용 가능한 스니펫·토큰·QA 체크리스트·AI 적용 프롬프트로 패키징하여 동결(Freeze)한다.
- 범위: 전역 Header(고정), Hero 처리 규칙(Home bleed / Sub header-safe), 관련 CSS 토큰 및 최소 유틸 스니펫.

> 본 문서는 규칙을 새로 발명하는 것이 아니라, KETRI 레포에 이미 구현되어 검증된 규칙을 그대로 고정(v1.0)합니다.

## 페이지 타입 정의
- Home (Bleed Hero)
  - Hero가 상단을 Bleed(extend to viewport top)하도록 허용.
  - Home 전용: Hero에 `pt-header`(Tailwind utility → var(--app-header-h))를 허용해 header 높이를 reserve 한다.
  - 예시: `src/pages/Home.tsx`에서 사용된 패턴.

- Sub Page (Header-Safe)
  - 모든 서브 페이지(About, Services, Board 등)는 `data-has-hero` 속성으로 표시하고, CSS 규칙으로 header 높이만큼 패딩을 확보한다.
  - Hero가 Bleed여야 하는 특별 케이스는 명시적으로 허용/검토 후 예외 처리.

## Freeze 정의 (v1.0)
- Freeze 대상 (절대 고정)
  - CSS 변수 `--app-header-h` (모바일/테블릿/데스크톱 토큰 포함).
  - CSS 규칙: `[data-has-hero]:not(.pt-header) { padding-top: var(--app-header-h); }` (JS offset 금지)
  - `pt-header` 유틸리티(현재 Tailwind preset으로 제공되는 mapping) 사용 패턴 (Home bleed 예외)

- Freeze 허용 (제한적 변경 가능)
  - 헤더 시각적 토큰(색상, 그림자 등)은 디자인 재조정 시 협의 하에 업데이트 가능하나, 레이아웃 토큰(`--app-header-h`)과 동작(패딩/offset 규칙)은 v1.0에서 동결.

- Freeze 금지 (금지 패턴)
  - JS로 header 높이를 계산하여 inline style 또는 script로 offset을 적용하는 패턴.
  - 컴포넌트에서 magic-number(예: padding-top: 84px)로 고정한 값 사용.
  - `data-has-hero`를 적용하고 `pt-header`로 우회하여 의도치않게 padding-top을 생략하는 패턴(명시적 Home bleed 제외).

## 구현 규칙 (실전 적용)
1. Header
   - Header는 fixed이며, 높이 기준은 오직 `--app-header-h` CSS 변수로 정의한다. (참조: `src/index.css` 토큰)
   - Header의 포지셔닝/탑 고정은 컴포넌트 클래스(ex: `fixed inset-x-0 top-0 z-50`)로 처리한다. 레이아웃 높이는 CSS 변수를 따름.

2. Hero
   - Home Hero (bleed): Hero 영역에는 `pt-header`를 사용하여 header 높이를 reserve 할 수 있다.
   - Sub-page Hero: 컴포넌트에 `data-has-hero`를 추가한다. CSS 스니펫이 자동으로 상단 패딩을 적용한다: `[data-has-hero]:not(.pt-header) { padding-top: var(--app-header-h); }`.
   - Hero가 진짜로 bleed여야 하는 경우에만 `data-hero-bleed`를 추가하고, 이 경우 `padding-top: 0`으로 설정한다.

3. 예외/마이그레이션
   - 기존 코드에서 `pt-header` 패턴을 남긴 컴포넌트(특히 `Layout.tsx`의 `main.pt-header`)는 Home 레이아웃에 대한 의도된 사용임을 문서화해야 한다.
   - JS로 offset을 구현한 곳은 CSS 규칙으로 대체해야 한다.

## 금지 패턴 (Anti-patterns)
- Any JS-driven header offset (e.g., measuring header height and applying inline style)
- Magic-number padding-top values in components
- Conditional application of `pt-header` to avoid CSS rule (silently bypassing `[data-has-hero]`)

## 버전 및 변경 규칙
- 현재 문서 버전: v1.0 (Freeze)
- 버전업 절차: 변경이 필요하면 PR 제목/커밋은 `chore: bump ketri-ui-standard vX.Y` 형태로 만들고, 변경 내역은 `ketri-ui-standard.md`에 기록해야 함.

## 프로젝트 적용 절차 (5-step)
1. Scan: 레포에서 `data-has-hero`, `pt-header`, `--app-header-h`, `data-hero-bleed` 사용처를 스캔한다.
2. Patch CSS: `index.css` 또는 전역 tokens에 `--app-header-h`가 없으면 추가(현재 KETRI에는 존재).
3. Replace JS offsets: JS로 계산된 offset 패턴을 찾아 `[data-has-hero]` 규칙으로 대체.
4. QA capture: QA 체크리스트에 따라 캡처 & 실패 기준 확인 (see `qa-checklist.md`).
5. Commit & Lock: 커밋메시지 `fix: apply KETRI UI standard`, PR에 `ketri-ui-standard v1.0` 태그를 추가.

---
Files referenced in this document (examples from repo):
- `src/index.css` (tokens & `[data-has-hero]` rule)
- `src/pages/Home.tsx` (Home bleed + `pt-header` usage)
- `src/components/layout/Layout.tsx` (main.pt-header)
