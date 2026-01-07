# Phase-1: Header & Hero Stabilization — Header-safe / Token-first Report

## 작업 개요
이 문서는 Phase-1 작업(헤더 침범/클리핑 문제 해소 및 Hero 컴포넌트의 token-first 전환)에 대한 공식 기술 보고서이다. 본 단계의 목적은 디자인-퍼스트 원칙에 따라 헤더와 히어로 계열 컴포넌트의 레이아웃 안정성을 확보하고, 이후 Phase-2(메가메뉴) 작업을 진행하기 위한 기준을 확정하는 것이다.

## 문제 상황 (As-Is)
- 초기 로드 시 일부 페이지에서 헤더가 Hero 영역 위로 오버랩되어 시각적 충돌 및 클릭 불가 현상이 발생함.
- 코드베이스에 헤더 높이를 런타임에서 측정해 CSS 커스텀 프로퍼티를 세팅하는 로직(ResizeObserver/마운트 측정)이 존재하여 타이밍/렌더링에 따라 레이아웃 불안정성 유발.
- Hero 계열 컴포넌트 일부가 뷰포트 기준의 fixed/절대 위치, 음수 마진, 인라인 포지셔닝 등으로 normal flow를 깨고 있어 재현성 있는 헤더 침범을 초래함.

## 해결 원칙 (To-Be 설계 기준)
- Design-first / Token-first: Figma 토큰(타입스케일 및 spacing)만 사용하고 임의 픽셀값·JS 측정 금지.
- 헤더 높이 단일 토큰화: CSS 토큰 `--app-header-h`을 단일 소스 오브 트루스로 사용한다.
- Layout by normal flow: Hero와 페이지 콘텐츠는 normal flow에 머물며 stacking은 CSS z-index와 token 기반 padding으로 제어한다.
- 금지사항: 음수 마진, viewport 기준의 fixed/top-0/inset-*, ResizeObserver 또는 마운트 시 토큰 세팅/측정 로직, 임시 땜질 코드는 전면 금지.

## 주요 작업 내용 (What Was Done)
1. 헤더 높이 토큰 단일화
   - `--app-header-h`을 전역 토큰으로 확정하고, 헤더 컴포넌트 및 관련 스타일에서 해당 토큰을 사용하도록 정리.
   - 런타임에서 토큰을 세팅하던 모든 JS 측정/세팅 로직을 제거(see `Layout.tsx` 관련 제거 커밋).

2. Fixed header + route padding 구조 확립
   - 헤더는 고정(fixed)으로 화면 상단에 고정하되, 라우트 컨테이너 및 섹션은 `pt-header`(token 기반 top padding)를 적용하여 헤더가 콘텐츠를 가리지 않도록 보장.

3. Hero 계열 컴포넌트의 normal flow 전환
   - 대상 파일 패턴: `Hero.tsx`, `*Hero.tsx`, `*HeaderHero*.tsx`을 한정해 검색 및 수정(페이지/라우트 파일은 수정 대상에서 제외).
   - 각 대상에 대해 다음 규정을 적용하여 위반 요소를 제거:
     - 최상위 컨테이너를 `relative z-0`으로 고정하여 flow를 보장.
     - 배경/장식 레이어는 섹션 범위로 제한: `absolute inset-0 z-0`로 스코프화.
     - 인라인 포지셔닝(예: style 속성의 position/zIndex) 제거 후 `relative z-10` 같은 클래스 기반 stacking 적용.
     - 음수 마진(`-mt-*`) 및 `-translate-y-*` 제거.
   - 변경 파일 예: `src/components/common/Hero.tsx`에서 `relative z-0` 추가, 배경·그라데이션을 `absolute inset-0 z-0`로 명확화, 타이틀 인라인 포지셔닝을 `relative z-10` 클래스로 대체.
   - `src/components/layout/HeaderHero.tsx`는 이미 token-first 패턴이 적용되어 있었으며 정상으로 확인되어 유지.

4. 측정 로직(ResizeObserver 등) 제거 이유
   - 런타임 측정 방식은 페이지 로드 타이밍에 따라 CSS 토큰 값이 늦게 반영되어 깜박이거나 헤더 오버랩을 유발함.
   - Figma 기반 디자인 토큰을 단일 소스로 삼음으로써 예측 가능한 렌더링을 보장하고 JS 의존성을 제거하기 위함.

5. 코드 품질 및 커밋
   - 변경 사항은 소규모, 목적 중심 패치로 적용되었으며 관련 파일들만 수정.
   - 모든 변경사항은 해당 목적을 설명하는 명확한 커밋 메시지로 커밋되어 기록됨.

## 결과 (Result)
- 레이아웃 안정성: 헤더 침범/클리핑의 근본 원인(측정 기반 토큰 세팅, viewport 기반 장식, flow 깨뜨림)을 제거하여 헤더-히어로 간의 충돌 가능성을 제거함.
- UI 규칙 확립: token-first header-safe 패턴이 프로젝트 표준으로 자리잡음(헤더 단일 토큰 + 섹션 단위 padding + normal flow 유지).
- 배포 상태: Phase-1 변경사항은 레포에 커밋되어 적용되었고, 실서비스 배포 절차가 완료됨.

## 린트/품질 상태
- `npm run lint -- --max-warnings=0` 기준에서 ESLint 규칙 위반은 없음.
- 단, 개발 환경의 TypeScript 버전에 대한 정보성 경고가 출력됨: `@typescript-eslint` 파서는 공식적으로 TS >=4.7.4 <5.6.0을 권장하나 현재 프로젝트에서 TS 5.9.3을 사용 중임. 이는 정보성 경고이며 규칙 위반은 아님.

## 기준 커밋 정보
- 주요 커밋(요약):
  - `fix: remove initial blank screen by eliminating render gating` — `src/contexts/AuthContext.tsx` (렌더 게이팅 제거)
  - `fix: correct useAuth import to AuthContext.core` — `src/components/common/ProtectedRoute.tsx` (잘못된 import 수정)
  - `fix: pin header to fixed top with token height` — `src/components/layout/Header.legacy.tsx` (헤더 고정 및 token 사용)
  - `fix: apply pt-header at route container to prevent header overlap` — `src/components/layout/Layout.tsx` (라우트 컨테이너에 헤더 패딩 적용)
  - `fix: make header height token css-only` — (런타임 측정 로직 제거)
  - `fix: align all hero components to token-first header-safe pattern` — `src/components/common/Hero.tsx` 등 (Hero 계열 normal flow 전환)
- 변경 파일 예시:
  - `src/components/common/Hero.tsx` (최상위 `relative z-0`, 배경·그라데이션 scope화, 타이틀 `relative z-10` 적용)
  - `src/components/layout/HeaderHero.tsx` (token-first 패턴, `relative z-0` 보유)
  - `src/components/layout/Layout.tsx` (ResizeObserver/런타임 측정 제거, `pt-header` 적용)

## 다음 단계 안내 (Phase-2 예고)
- 목표: Phase-2에서는 메가메뉴(Mega Menu) 컴포넌트를 token-first 규격에 맞춰 구현하고, 메뉴 포털(anchor/portal)과 헤더 간의 stacking/접근성(ARIA) 문제를 다룬다.
- 전제: Phase-1에서 확립한 `--app-header-h`, `pt-header`, normal flow 규칙을 준수해야 하며, 메가메뉴는 viewport-fixed 포지셔닝을 사용하지 않고 포털 사용 시에도 header-safe stacking을 보장해야 한다.
- 권고: Phase-2 작업 전, 본 문서를 기준으로 코드 리뷰 체크리스트를 만들 것을 권장한다(헤더 토큰 사용, flow 보장, 음수 마진 금지, JS 측정 금지).

---

제안 커밋 메시지:

`fix: align all hero components to token-first header-safe pattern`
