# Figma Design System Implementation Guide

## 개요
본 문서는 Figma Dev Mode 기준으로 디자인 시스템을 React + TypeScript + TailwindCSS로 정확히 구현한 가이드입니다.

## 1. Tailwind Config (tailwind.config.js)

### Color System
```javascript
// KERSI_Color / Primary Colors / Light Blue
brand: {
  500: "#0083ff", // Primary Light Blue
  600: "#0069cc", // Hover
  700: "#004f99", // Active
}

// KERSI/System/Neutral
neutral: {
  50: "#fafafa",
  100: "#f5f5f5",
  // ... 등등
}

// KERSI/System/Solid White
white: "#ffffff"
```

### Typography Scale
```javascript
fontSize: {
  // Display
  "display-lg": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
  "display-md": ["3.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
  "display-sm": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
  
  // Heading
  "heading-xl": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
  "heading-lg": ["1.875rem", { lineHeight: "1.35", fontWeight: "600" }],
  "heading-md": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
  "heading-sm": ["1.25rem", { lineHeight: "1.5", fontWeight: "500" }],
  
  // Body
  "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
  "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
  "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
  
  // Label
  "label-lg": ["1rem", { lineHeight: "1.5", fontWeight: "500" }],
  "label-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
  "label-sm": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
}
```

### 8pt Grid System
```javascript
spacing: {
  2: "0.5rem",   // 8px
  4: "1rem",     // 16px
  6: "1.5rem",   // 24px
  8: "2rem",     // 32px
  12: "3rem",    // 48px
  16: "4rem",    // 64px
  20: "5rem",    // 80px
  24: "6rem",    // 96px
}
```

### Border Radius
```javascript
borderRadius: {
  sm: "0.25rem",   // 4px
  DEFAULT: "0.5rem", // 8px
  md: "0.75rem",   // 12px
  lg: "1rem",      // 16px
  xl: "1.5rem",    // 24px
  "2xl": "2rem",   // 32px
}
```

### Shadow System
```javascript
boxShadow: {
  xs: "0px 1px 0px rgba(0, 0, 0, 0.05)", // Figma Primary Button shadow
  sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07)",
}
```

---

## 2. Primary Button Component

### Figma Dev Mode 기준값
- **Height**: 64px (h-16)
- **Width**: 200px (w-[200px]) 또는 auto
- **Padding**: Top 18px, Bottom 18px, Left 60px, Right 24px
- **Gap**: 26px (아이콘 포함 시)
- **Border**: 2px
- **Border Color**: white (#ffffff)
- **Background**: primary-500 (#0083ff)
- **Text Color**: white (#ffffff)
- **Shadow**: 0px 1px 0px rgba(0,0,0,0.05)
- **Font Weight**: Semibold (600)

### 컴포넌트 코드
```tsx
// src/components/common/Button.tsx
import { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  variant = "primary",
  size = "lg",
  isLoading = false,
  icon,
  children,
  className = "",
  disabled,
  type = "button",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  const variants = {
    primary:
      "bg-primary-500 text-white border-2 border-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-xs font-semibold",
    secondary:
      "bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 font-semibold",
    outline:
      "bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 font-medium",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500 font-medium",
  };

  const sizes = {
    sm: "h-12 px-6 py-3 text-label-md gap-3",        // 48px
    md: "h-14 px-8 py-4 text-label-lg gap-4",        // 56px
    lg: "h-16 pl-[60px] pr-6 py-[18px] text-body-lg gap-[26px]", // 64px - Figma 기준
    xl: "h-18 pl-16 pr-8 py-5 text-heading-sm gap-6", // 72px
  };

  const widthStyles = fullWidth ? "w-full" : size === "lg" ? "w-[200px]" : "w-auto";

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          처리중...
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
```

---

## 3. 사용 예시

### 기본 사용법
```tsx
import Button from "@/components/common/Button";

// Primary Button (Figma 기준)
<Button onClick={handleClick}>
  문의하기
</Button>

// 아이콘 포함
<Button icon={<ArrowRightIcon />} onClick={handleClick}>
  시작하기
</Button>

// Secondary Variant
<Button variant="secondary" onClick={handleClick}>
  자세히 보기
</Button>

// Outline Variant
<Button variant="outline" size="md" onClick={handleClick}>
  취소
</Button>

// Full Width
<Button fullWidth onClick={handleClick}>
  제출하기
</Button>

// Loading State
<Button isLoading onClick={handleClick}>
  저장 중...
</Button>

// Disabled
<Button disabled onClick={handleClick}>
  비활성화
</Button>
```

### Hero Section 예시
```tsx
import Hero from "@/components/common/Hero";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

<Hero
  subtitle="전문 분석 서비스"
  title="정확하고 빠른 환경 분석"
  description="20년 경력의 전문가들이 최첨단 장비로 정밀 분석을 제공합니다."
  primaryAction={{
    label: "견적 요청",
    onClick: () => navigate("/quote"),
    icon: <ArrowRightIcon className="w-5 h-5" />,
  }}
  secondaryAction={{
    label: "서비스 소개",
    onClick: () => navigate("/services"),
  }}
  backgroundImage="/images/hero-bg.jpg"
/>
```

### Card + Button 조합
```tsx
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

<Card variant="elevated" hover>
  <h3 className="text-heading-md mb-4">석면 분석</h3>
  <p className="text-body-md text-neutral-600 mb-6">
    건축물 석면 함유 여부를 정밀 분석합니다.
  </p>
  <Button variant="outline" size="md">
    자세히 보기
  </Button>
</Card>
```

### Section 사용 예시
```tsx
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

<Section spacing="xl" variant="primary">
  <Container size="lg">
    <h2 className="text-display-sm font-bold text-center mb-12">
      주요 서비스
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
    <div className="flex justify-center mt-12">
      <Button>
        모든 서비스 보기
      </Button>
    </div>
  </Container>
</Section>
```

---

## 4. 다른 업종에서도 재사용 가능한 구조

### 설계 원칙

#### 4.1 컴포넌트 분리 전략
```
src/
  components/
    common/          # 범용 컴포넌트 (업종 무관)
      Button.tsx
      Card.tsx
      Hero.tsx
      Section.tsx
      Container.tsx
      IconButton.tsx
    domain/          # 도메인 특화 컴포넌트
      ServiceCard.tsx
      AnalysisForm.tsx
```

#### 4.2 색상 시스템 재사용
```javascript
// tailwind.config.js에서 brand 네임스페이스 활용
colors: {
  brand: {
    // 업종별로 이 값만 변경
    500: "#0083ff", // 현재 업종: Light Blue
    // 다른 업종 예시:
    // 500: "#10b981", // 의료: Green
    // 500: "#f59e0b", // 식품: Amber
  },
  primary: {
    // brand를 참조하도록 alias 설정 가능
    500: "var(--color-brand-500)",
  }
}
```

#### 4.3 CSS Variables 활용 (선택)
```css
/* index.css */
:root {
  /* Brand Colors - 업종별 변경 */
  --color-brand-50: #e6f3ff;
  --color-brand-500: #0083ff;
  --color-brand-600: #0069cc;
  --color-brand-700: #004f99;
  
  /* Neutral System - 공통 */
  --color-neutral-50: #fafafa;
  --color-neutral-900: #171717;
  
  /* Spacing - 8pt Grid */
  --spacing-unit: 8px;
}
```

#### 4.4 타이포그래피 확장
```javascript
// 업종별 폰트 추가 예시
fontFamily: {
  sans: ["Pretendard", "Inter", "system-ui"],
  // 업종별 브랜드 폰트
  brand: ["Montserrat", "Pretendard", "sans-serif"], // 글로벌 업종
  // display: ["Noto Serif KR", "serif"], // 전통 업종
}
```

#### 4.5 컴포넌트 Props 확장 패턴
```tsx
// 기본 Button은 유지하고, 도메인 특화 버튼 확장
interface ServiceButtonProps extends ButtonProps {
  serviceType?: "asbestos" | "water" | "air";
}

const ServiceButton = ({ serviceType, ...props }: ServiceButtonProps) => {
  const icons = {
    asbestos: <AsbestosIcon />,
    water: <WaterIcon />,
    air: <AirIcon />,
  };
  
  return (
    <Button
      icon={serviceType ? icons[serviceType] : undefined}
      {...props}
    />
  );
};
```

### 업종 전환 체크리스트

1. **색상 변경** (30분)
   - [ ] `tailwind.config.js`의 `brand` 색상 수정
   - [ ] Primary 색상 hover/active 상태 조정

2. **타이포그래피 조정** (20분)
   - [ ] 폰트 패밀리 변경 (필요 시)
   - [ ] 사이즈 스케일 미세 조정 (필요 시)

3. **컴포넌트 커스터마이징** (1-2시간)
   - [ ] Button 사이즈/패딩 조정 (필요 시)
   - [ ] Card 스타일 변형 추가 (필요 시)
   - [ ] Hero 레이아웃 변경 (필요 시)

4. **도메인 컴포넌트 개발** (2-4시간)
   - [ ] 업종 특화 카드 컴포넌트
   - [ ] 업종 특화 폼 컴포넌트
   - [ ] 업종 특화 아이콘셋

### 추천 확장 구조
```
src/
  themes/
    default.ts       # 기본 테마
    healthcare.ts    # 의료 업종
    finance.ts       # 금융 업종
    education.ts     # 교육 업종
  
  components/
    common/          # 범용 (변경 없음)
    domain/          # 업종별 (새로 작성)
```

---

## 5. Hover / Disabled 상태 가이드

### Hover States
```tsx
// Primary Button
hover:bg-primary-600  // 500 → 600 (한 단계 어둡게)

// Secondary Button
hover:bg-primary-50   // 배경 50 (매우 연하게)

// Outline Button
hover:bg-primary-50   // 배경만 추가
hover:text-primary-600 // 텍스트 더 진하게 (선택)
```

### Active States
```tsx
// Primary Button
active:bg-primary-700  // 600 → 700 (두 단계 어둡게)

// Secondary Button
active:bg-primary-100  // 50 → 100 (조금 더 진하게)
```

### Disabled States
```tsx
// 모든 버튼 공통
disabled:opacity-50
disabled:cursor-not-allowed
```

### Focus States (접근성)
```tsx
focus:outline-none
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2
```

---

## 6. 반응형 대응

### Breakpoints (Tailwind 기본)
```javascript
screens: {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
```

### Button 반응형 예시
```tsx
// Desktop: lg size (64px)
// Mobile: md size (56px)
<Button 
  size="md"
  className="lg:h-16 lg:pl-[60px] lg:text-body-lg"
>
  문의하기
</Button>
```

### Hero 반응형 예시
```tsx
<h1 className="text-display-sm lg:text-display-md">
  {/* Mobile: 48px, Desktop: 60px */}
</h1>
```

### Grid 반응형 예시
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

---

## 7. 마이그레이션 가이드

### 기존 코드 → 새 디자인 시스템

#### Before
```tsx
<button className="bg-blue-500 text-white px-6 py-3 rounded">
  클릭
</button>
```

#### After
```tsx
<Button>
  클릭
</Button>
```

#### Before
```tsx
<div className="bg-white shadow p-6 rounded">
  Content
</div>
```

#### After
```tsx
<Card>
  Content
</Card>
```

#### Before
```tsx
<section className="py-20">
  <div className="container mx-auto px-4">
    Content
  </div>
</section>
```

#### After
```tsx
<Section>
  Content
</Section>
```

---

## 8. 추가 컴포넌트

### IconButton
```tsx
<IconButton
  icon={<HeartIcon />}
  variant="primary"
  size="md"
  ariaLabel="좋아요"
  onClick={handleLike}
/>
```

### Container
```tsx
<Container size="lg">
  {/* 최대 1024px 폭 */}
</Container>
```

---

## 참고사항

- 모든 px 값은 Figma Dev Mode 수치 우선
- 8pt Grid System 기반 (8의 배수)
- Pretendard 폰트 사용
- Primary Color: Light Blue (#0083ff)
- 색상 명칭: `brand` 또는 `primary` 사용
- 접근성: focus, aria-label 등 필수 적용
- 애니메이션: Framer Motion 활용 (선택)

---

## 문의 및 개선

디자인 시스템 관련 문의나 개선 사항은 프로젝트 이슈로 등록해주세요.
