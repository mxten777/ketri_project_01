# 재사용 가능한 테마 기반 UI 시스템 - 구현 가이드

## 📁 권장 폴더 구조

```
ketri_project_01/
├── src/
│   ├── styles/
│   │   └── tokens.css              # ✅ Design Tokens (Single Source)
│   ├── config/
│   │   └── themes.ts               # ✅ Theme Configuration
│   ├── contexts/
│   │   └── ThemeContext.tsx        # ✅ Theme Provider
│   ├── components/
│   │   ├── ui/                     # ✅ 제품화된 UI 컴포넌트
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   └── common/                 # 기존 컴포넌트
│   │       ├── Button.tsx
│   │       ├── Hero.tsx
│   │       └── ...
│   ├── utils/
│   │   └── cn.ts                   # ✅ Class merge utility
│   └── pages/
│       └── ThemeSystemDemo.tsx     # ✅ 사용 예시 페이지
├── tailwind.config.new.js          # ✅ CSS Variables 매핑
└── package.json
```

---

## 🎨 1. Design Tokens (Single Source of Truth)

### tokens.css 구조

```css
:root {
  /* Color Tokens */
  --color-brand-500: #0083ff;
  --color-neutral-500: #737373;
  
  /* Typography Tokens */
  --font-size-body-md: 1rem;
  --font-weight-semibold: 600;
  
  /* Spacing Tokens - 8pt Grid */
  --spacing-4: 1rem;
  --spacing-8: 2rem;
  
  /* Component Tokens */
  --button-height-lg: 4rem;
  --input-height-md: 3rem;
  
  /* Shadow Tokens */
  --shadow-md: 0px 4px 6px rgba(0, 0, 0, 0.07);
}

/* Dark Mode Override */
.dark {
  --color-bg-primary: #171717;
}

/* Industry Theme Override */
[data-theme="healthcare"] {
  --color-brand-500: #10b981;
}
```

**핵심 원칙**:
- ✅ 모든 디자인 값은 CSS Variable로 정의
- ✅ Figma Dev Mode 수치 그대로 적용
- ✅ 8pt Grid 철저히 준수
- ✅ Semantic naming (color-bg-primary, color-text-secondary)

---

## ⚙️ 2. Tailwind Config (Variable Mapping)

### tailwind.config.js 구조

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
        },
        primary: {
          500: "var(--color-brand-500)", // alias
        },
      },
      fontSize: {
        "body-md": [
          "var(--font-size-body-md)",
          { lineHeight: "var(--line-height-relaxed)" },
        ],
      },
      spacing: {
        4: "var(--spacing-4)",
        8: "var(--spacing-8)",
      },
    },
  },
};
```

**핵심 원칙**:
- ✅ tokens.css의 변수를 Tailwind에 매핑
- ✅ 하드코딩된 값 제거
- ✅ 변수 중심 설정

---

## 🧩 3. UI 컴포넌트 제품화

### 3.1 Container

```tsx
<Container size="lg">
  {/* 1024px 기준, 반응형 padding */}
</Container>
```

**특징**:
- 5가지 size (sm/md/lg/xl/full)
- 반응형 padding (px-4 sm:px-6 lg:px-8)
- 3구간 대응 (1440/1024/375)

### 3.2 Section

```tsx
<Section spacing="lg" variant="secondary">
  {/* 8pt Grid 기반 padding */}
</Section>
```

**특징**:
- 5가지 spacing (sm/md/lg/xl/2xl)
- 5가지 variant (default/secondary/tertiary/brand/dark)
- 자동 Container wrap (fullWidth 옵션)

### 3.3 Card

```tsx
<Card variant="elevated" hover="lift" padding="md">
  <CardHeader>
    <CardTitle>제목</CardTitle>
  </CardHeader>
  <CardContent>내용</CardContent>
  <CardFooter>푸터</CardFooter>
</Card>
```

**특징**:
- 4가지 variant (default/elevated/outlined/filled)
- 2가지 hover (lift/glow)
- 4가지 padding (none/sm/md/lg)
- Subcomponents (Header, Title, Content, Footer)

### 3.4 Input

```tsx
<Input
  label="이름"
  placeholder="입력하세요"
  error="에러 메시지"
  helperText="도움말"
  required
/>
```

**특징**:
- 3가지 size (sm/md/lg)
- 3가지 variant (default/error/success)
- 상태별 스타일 강제 (hover/focus/disabled)
- 접근성 (label, aria-*, required)

### 3.5 Modal

```tsx
<Modal
  isOpen={true}
  onClose={handleClose}
  title="제목"
  size="md"
>
  <p>내용</p>
  <ModalFooter>
    <Button>확인</Button>
  </ModalFooter>
</Modal>
```

**특징**:
- Portal 기반 렌더링
- ESC 키 / Backdrop 클릭 닫기
- Body scroll lock
- Focus trap
- Z-index 관리 (modal-backdrop: 1040, modal: 1050)
- 5가지 size (sm/md/lg/xl/full)

---

## 🎯 4. 상태값 규칙 코드화

### 모든 컴포넌트 공통 규칙

```tsx
const componentVariants = cva([
  // Base
  "transition-all duration-base",
  
  // Hover
  "hover:bg-[var(--color-bg-secondary)]",
  
  // Focus (접근성)
  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
  
  // Active
  "active:scale-95",
  
  // Disabled
  "disabled:opacity-50 disabled:cursor-not-allowed",
]);
```

**강제 규칙**:
1. ✅ **Hover**: 모든 interactive 요소
2. ✅ **Focus**: 접근성 ring (2px, offset 2px)
3. ✅ **Active**: Scale 또는 색상 변화
4. ✅ **Disabled**: opacity 50% + cursor-not-allowed
5. ✅ **Transition**: duration-base (200ms)

---

## 📱 5. 반응형 3구간 대응

### Breakpoint 정의

```javascript
// tailwind.config.js
screens: {
  sm: "640px",   // Mobile Large
  md: "768px",   // Tablet
  lg: "1024px",  // Desktop (기준)
  xl: "1280px",  // Desktop Large
}
```

### 3구간 테스트 포인트

1. **1440px** (Desktop Large)
   - Container: max-w-7xl (1280px)
   - Padding: px-8
   - Grid: 3~4 columns

2. **1024px** (Desktop 기준)
   - Container: max-w-container-lg (1024px)
   - Padding: px-6 lg:px-8
   - Grid: 2~3 columns

3. **375px** (Mobile)
   - Container: full width
   - Padding: px-4
   - Grid: 1 column
   - Font size 축소

### 반응형 패턴

```tsx
// Typography
<h1 className="text-display-sm md:text-display-md lg:text-display-lg">

// Spacing
<Section spacing="sm" className="md:py-16 lg:py-20">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Hide/Show
<div className="hidden lg:block">
```

---

## 🎨 6. 업종별 테마 적용

### 6.1 Theme Configuration

```typescript
// config/themes.ts
export const themes = {
  default: {
    primaryColor: "#0083ff",
    fontFamily: "Pretendard",
  },
  healthcare: {
    primaryColor: "#10b981",
    fontFamily: "Pretendard",
  },
};
```

### 6.2 Theme Provider

```tsx
// main.tsx
import { ThemeProvider } from "@/contexts/ThemeContext";

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

### 6.3 Theme 사용

```tsx
// 컴포넌트 내부
import { useTheme } from "@/contexts/ThemeContext";

const MyComponent = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme("healthcare")}>
      Healthcare 테마로 변경
    </button>
  );
};
```

### 6.4 data-theme 방식

```html
<!-- HTML -->
<html data-theme="healthcare">
```

```css
/* tokens.css */
[data-theme="healthcare"] {
  --color-brand-500: #10b981;
}
```

**장점**:
- ✅ 런타임 즉시 변경
- ✅ CSS만으로 테마 전환
- ✅ JavaScript 번들 크기 증가 없음
- ✅ SSR 호환

---

## 📦 7. 필수 패키지 설치

```bash
npm install class-variance-authority clsx tailwind-merge
npm install framer-motion
npm install @heroicons/react
```

### 패키지 역할

- **class-variance-authority**: Variant 기반 컴포넌트
- **clsx**: 조건부 클래스 병합
- **tailwind-merge**: Tailwind 클래스 충돌 해결
- **framer-motion**: 애니메이션
- **@heroicons/react**: 아이콘

---

## ✅ 8. 적용 체크리스트 (10개)

### Phase 1: Foundation
- [ ] 1. **tokens.css 생성** - 모든 디자인 토큰 정의
- [ ] 2. **tailwind.config.js 정리** - CSS Variable 매핑
- [ ] 3. **themes.ts 작성** - 업종별 테마 설정
- [ ] 4. **ThemeProvider 적용** - main.tsx에 추가

### Phase 2: Component Migration
- [ ] 5. **Container 구현** - 반응형 컨테이너
- [ ] 6. **Section 구현** - 8pt Grid spacing
- [ ] 7. **Card 구현** - Variant + Hover states
- [ ] 8. **Input 구현** - Focus ring + Error handling
- [ ] 9. **Modal 구현** - Portal + Accessibility

### Phase 3: Integration
- [ ] 10. **기존 페이지 마이그레이션** - 새 컴포넌트로 교체

---

## 🚀 9. 사용 예시

### 기본 페이지 구조

```tsx
import { Container, Section, Card, Input, Modal } from "@/components/ui";
import { Button } from "@/components/common";

const MyPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section spacing="xl" variant="brand">
        <Container size="lg">
          <h1 className="text-display-md">제목</h1>
          <Button size="lg">시작하기</Button>
        </Container>
      </Section>

      {/* Content Section */}
      <Section spacing="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="elevated" hover="lift">
            <CardTitle>카드 제목</CardTitle>
            <CardContent>내용</CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
};
```

### 테마 전환

```tsx
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="default">환경/분석</option>
      <option value="healthcare">의료</option>
      <option value="finance">금융</option>
    </select>
  );
};
```

---

## 🔄 10. 기존 코드 마이그레이션

### Before (기존)

```tsx
<div className="max-w-7xl mx-auto px-6 py-20">
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-2xl font-bold">제목</h3>
    <input className="w-full px-4 py-3 border rounded" />
  </div>
</div>
```

### After (새 시스템)

```tsx
<Section spacing="lg">
  <Container size="xl">
    <Card variant="elevated">
      <CardTitle>제목</CardTitle>
      <CardContent>
        <Input placeholder="입력하세요" />
      </CardContent>
    </Card>
  </Container>
</Section>
```

**이점**:
- ✅ 테마 자동 적용
- ✅ 상태 규칙 강제
- ✅ 접근성 내장
- ✅ 일관된 spacing

---

## 📊 11. 성능 최적화

### CSS Variables의 장점

1. **런타임 변경 가능** - JS 없이 CSS만으로 테마 전환
2. **번들 크기 감소** - 중복 CSS 제거
3. **캐싱 효율** - 정적 CSS 캐싱 가능
4. **SSR 호환** - 서버 렌더링 지원

### 권장 사항

```tsx
// ✅ Good: CSS Variable 사용
<div className="bg-[var(--color-brand-500)]">

// ❌ Bad: 직접 색상 하드코딩
<div className="bg-[#0083ff]">
```

---

## 🎓 12. 추가 확장 가이드

### 새 컴포넌트 추가 시

1. **tokens.css에 토큰 추가**
```css
--component-height: 2.5rem;
```

2. **Variant 정의**
```tsx
const componentVariants = cva("base-styles", {
  variants: { size: { sm: "", md: "", lg: "" } }
});
```

3. **상태 규칙 적용**
```tsx
"hover:... focus:... active:... disabled:..."
```

4. **반응형 대응**
```tsx
"text-sm md:text-base lg:text-lg"
```

### 새 테마 추가 시

1. **tokens.css에 테마 추가**
```css
[data-theme="new-industry"] {
  --color-brand-500: #custom-color;
}
```

2. **themes.ts에 등록**
```typescript
export const themes = {
  // ...
  "new-industry": { ... },
};
```

---

## 📚 참고 자료

- [Class Variance Authority](https://cva.style/)
- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Framer Motion](https://www.framer.com/motion/)
- [8pt Grid System](https://spec.fm/specifics/8-pt-grid)

---

**구현 완료! 🎉**

모든 작업이 완료되었습니다. ThemeSystemDemo.tsx 페이지에서 전체 시스템을 확인할 수 있습니다.
