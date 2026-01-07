# Figma 디자인 표준 적용 프롬프트 가이드

이 가이드는 KETRI 프로젝트의 Figma 디자인 시스템을 다른 React + TypeScript + TailwindCSS 프로젝트에 적용하기 위한 AI 프롬프트 템플릿입니다.

## 🎯 프롬프트 목적

이 프롬프트를 사용하여 새로운 프로젝트에 일관된 디자인 시스템을 구축하고, Figma Dev Mode 기준의 정확한 구현을 보장합니다.

## 📋 필수 준비사항

### 1. 프로젝트 구조 설정
```
your-project/
├── src/
│   ├── styles/
│   │   └── tokens.css
│   ├── config/
│   │   └── themes.ts
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── components/
│   │   ├── ui/          # 제품화된 컴포넌트
│   │   └── common/      # 기존 컴포넌트
│   └── utils/
│       └── cn.ts
├── tailwind.config.js
└── package.json
```

### 2. 의존성 설치
```bash
npm install tailwindcss postcss autoprefixer framer-motion lucide-react clsx tailwind-merge
```

## 🚀 AI 적용 프롬프트 템플릿

### 기본 프롬프트 (프로젝트 초기 설정용)

```
다음 디자인 표준을 React + TypeScript + TailwindCSS 프로젝트에 적용해주세요:

## 디자인 시스템 요구사항

### 1. Color System (Figma 기준)
- Primary: #0083ff (brand-500)
- Neutral: #fafafa ~ #18181b (50-900)
- White: #ffffff
- Dark mode 지원

### 2. Typography Scale
- Display: 4.5rem ~ 3rem (display-lg ~ display-sm)
- Heading: 2.25rem ~ 1.25rem (heading-xl ~ heading-sm)
- Body: 1.125rem ~ 0.875rem (body-lg ~ body-sm)
- Label: 1rem ~ 0.75rem (label-lg ~ label-sm)

### 3. Spacing (8pt Grid)
- 2: 0.5rem (8px)
- 4: 1rem (16px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 12: 3rem (48px)
- 16: 4rem (64px)

### 4. Border Radius
- sm: 0.25rem (4px)
- DEFAULT: 0.5rem (8px)
- md: 0.75rem (12px)
- lg: 1rem (16px)
- xl: 1.5rem (24px)

### 5. Shadow System
- xs: "0px 1px 0px rgba(0, 0, 0, 0.05)"
- sm: "0px 1px 2px rgba(0, 0, 0, 0.05)"
- card: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"

## 구현할 컴포넌트

### Button Component
- Variants: primary, secondary, outline, ghost
- Sizes: sm(48px), md(56px), lg(64px), xl(72px)
- Figma 기준 정확한 padding과 spacing
- Hover/Tap 애니메이션 (framer-motion)

### Hero Component
- Responsive design
- Background image/gradient 지원
- Action buttons
- Dark mode 지원

### 기타 컴포넌트
- Card, Container, Section, Input, Modal 등

## 출력 형식
1. tailwind.config.js 설정
2. tokens.css (CSS Variables)
3. Theme context 및 config
4. 각 컴포넌트 구현 (TypeScript + Tailwind)
5. 사용 예시

모든 값은 Figma Dev Mode 수치를 정확히 따르고, 8pt Grid를 준수해주세요.
```

### 컴포넌트별 세부 프롬프트

#### Button 컴포넌트 적용용

```
다음 Figma 기준으로 Button 컴포넌트를 구현해주세요:

## Figma Dev Mode 기준값
- Height: 64px (lg), 56px (md), 48px (sm)
- Primary: bg-primary-500, text-white, border-2 border-white
- Padding: lg - pl-60px pr-24px py-18px
- Gap: 26px (아이콘 포함 시)
- Shadow: 0px 1px 0px rgba(0,0,0,0.05)
- Hover: scale 1.02, bg-primary-600
- Tap: scale 0.98

TypeScript 인터페이스와 Tailwind 클래스로 정확히 구현해주세요.
```

#### Hero 섹션 적용용

```
다음과 같이 Hero 컴포넌트를 구현해주세요:

## 요구사항
- Responsive: min-h-600px (desktop), min-h-380px (mobile)
- Background: gradient 또는 image
- Content: title, subtitle, description, actions
- Variants: default, centered, split
- Dark mode 지원
- Framer Motion 애니메이션

Figma Dev Mode 기준 padding, typography, spacing을 정확히 따르세요.
```

## 🔧 설정 파일 템플릿

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce1ff',
          200: '#99c3ff',
          300: '#66a5ff',
          400: '#3387ff',
          500: '#0083ff', // 메인
          600: '#0069cc',
          700: '#004f99',
          800: '#002a66',
          900: '#001533',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        white: '#ffffff',
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'xs': '0px 1px 0px rgba(0, 0, 0, 0.05)',
        'sm': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
}
```

### tokens.css

```css
:root {
  /* Colors */
  --color-primary-500: #0083ff;
  --color-primary-600: #0069cc;
  --color-primary-700: #004f99;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-700: #3f3f46;
  --color-neutral-900: #18181b;
  --color-white: #ffffff;

  /* Typography */
  --font-size-display-lg: 4.5rem;
  --font-size-body-lg: 1.125rem;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-4: 1rem;
  --spacing-8: 2rem;
  --spacing-16: 4rem;

  /* Shadows */
  --shadow-xs: 0px 1px 0px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Dark mode */
.dark {
  --color-bg-primary: #18181b;
  --color-text-primary: #fafafa;
}
```

## 📝 사용 팁

1. **Figma Dev Mode 우선**: 모든 수치는 Figma Dev Mode에서 확인한 값을 사용
2. **8pt Grid 준수**: 모든 spacing은 8px 배수
3. **Semantic Naming**: color-bg-primary, color-text-secondary 등 의미있는 이름 사용
4. **CSS Variables**: 모든 디자인 토큰을 CSS 변수로 정의
5. **TypeScript**: 컴포넌트 props 타입 엄격히 정의
6. **Responsive**: 모바일 우선 접근

## 🎨 색상 팔레트

### Primary Colors
- 500: #0083ff (메인)
- 600: #0069cc (hover)
- 700: #004f99 (active)

### Neutral Colors
- 50: #fafafa (배경)
- 100: #f5f5f5 (섹션 배경)
- 700: #3f3f46 (본문 텍스트)
- 900: #18181b (다크 배경)

## 📏 타이포그래피 스케일

| Name | Size | Line Height | Weight | Use Case |
|------|------|-------------|--------|----------|
| display-lg | 4.5rem | 1.1 | 700 | 메인 헤드라인 |
| display-md | 3.75rem | 1.15 | 700 | 섹션 타이틀 |
| heading-xl | 2.25rem | 1.3 | 600 | 페이지 타이틀 |
| body-lg | 1.125rem | 1.6 | 400 | 본문 텍스트 |

이 프롬프트 가이드를 사용하여 다른 프로젝트에 일관된 KETRI 디자인 시스템을 적용하세요!</content>
<parameter name="filePath">c:\ketricoding\ketri_project_01\docs\FIGMA_STANDARD_PROMPT_GUIDE.md