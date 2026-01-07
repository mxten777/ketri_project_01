# KETRI 디자인 시스템 & 스타일 가이드

## 🎨 컬러 시스템

### 브랜드 컬러

#### Primary (Blue) - 메인 브랜드 컬러

신뢰성, 전문성, 안정성을 상징하는 블루 계열

```css
primary-50:  #e6f0ff
primary-100: #cce1ff
primary-200: #99c3ff
primary-300: #66a5ff
primary-400: #3387ff
primary-500: #0069ff  /* 메인 */
primary-600: #0054cc
primary-700: #003f99
primary-800: #002a66
primary-900: #001533
```

**사용 예시:**

- 주요 CTA 버튼
- 링크 색상
- 중요 아이콘
- 그라디언트의 시작점

#### Secondary (Sky Blue) - 보조 컬러

활동성, 혁신, 청결을 상징

```css
secondary-50:  #f0f9ff
secondary-100: #e0f2fe
secondary-200: #b9e5fe
secondary-300: #7dd3fc
secondary-400: #38bdf8
secondary-500: #0ea5e9  /* 메인 */
secondary-600: #0284c7
secondary-700: #0369a1
secondary-800: #075985
secondary-900: #0c4a6e
```

**사용 예시:**

- 보조 버튼
- 그라디언트의 끝점
- 강조 배경
- 호버 상태

#### Accent (Orange) - 강조 컬러

주의, 경고, 중요 정보 표시

```css
accent-50:  #fff7ed
accent-100: #ffedd5
accent-200: #fed7aa
accent-300: #fdba74
accent-400: #fb923c
accent-500: #f97316  /* 메인 */
accent-600: #ea580c
accent-700: #c2410c
accent-800: #9a3412
accent-900: #7c2d12
```

**사용 예시:**

- 중요 공지사항 배지
- 알림 표시
- 위험/경고 메시지
- 할인/이벤트 표시

#### Neutral (Gray) - 중립 컬러

텍스트, 배경, 구분선

```css
neutral-50:  #fafafa
neutral-100: #f4f4f5
neutral-200: #e4e4e7
neutral-300: #d4d4d8
neutral-400: #a1a1aa
neutral-500: #71717a
neutral-600: #52525b
neutral-700: #3f3f46
neutral-800: #27272a
neutral-900: #18181b
```

**사용 예시:**

- 본문 텍스트: neutral-700 (라이트) / neutral-200 (다크)
- 보조 텍스트: neutral-500
- 배경: neutral-50 (라이트) / neutral-900 (다크)
- 구분선: neutral-200 / neutral-700

---

### 시맨틱 컬러

```css
/* Success */
success-light: #d1fae5
success:       #10b981
success-dark:  #047857

/* Warning */
warning-light: #fef3c7
warning:       #f59e0b
warning-dark:  #d97706

/* Error */
error-light:   #fee2e2
error:         #ef4444
error-dark:    #dc2626

/* Info */
info-light:    #dbeafe
info:          #3b82f6
info-dark:     #1d4ed8
```

---

## 📝 타이포그래피

### 폰트 패밀리

**Primary Font:** Pretendard Variable

- 한글 전용 최적화
- Variable Font로 다양한 굵기 지원
- 가독성 우수

```css
font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  sans-serif;
```

**CDN:**

```html
<link
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
  rel="stylesheet"
/>
```

---

### 폰트 크기 및 라인 높이

#### Display (영웅 섹션, 주요 타이틀)

```css
display-lg: 72px / 4.5rem
  - line-height: 1.1
  - letter-spacing: -0.02em
  - font-weight: 700

display-md: 60px / 3.75rem
  - line-height: 1.15
  - letter-spacing: -0.02em
  - font-weight: 700

display-sm: 48px / 3rem
  - line-height: 1.2
  - letter-spacing: -0.01em
  - font-weight: 700
```

#### Headings

```css
heading-xl: 40px / 2.5rem (h1)
  - line-height: 1.2
  - font-weight: 700

heading-lg: 32px / 2rem (h2)
  - line-height: 1.3
  - font-weight: 700

heading-md: 24px / 1.5rem (h3)
  - line-height: 1.4
  - font-weight: 600

heading-sm: 20px / 1.25rem (h4)
  - line-height: 1.5
  - font-weight: 600

heading-xs: 18px / 1.125rem (h5)
  - line-height: 1.5
  - font-weight: 600
```

#### Body Text

```css
body-lg: 18px / 1.125rem
  - line-height: 1.75
  - font-weight: 400

body-base: 16px / 1rem (기본)
  - line-height: 1.6
  - font-weight: 400

body-sm: 14px / 0.875rem
  - line-height: 1.5
  - font-weight: 400

body-xs: 12px / 0.75rem
  - line-height: 1.5
  - font-weight: 400
```

#### 폰트 굵기

```css
font-thin:       100
font-extralight: 200
font-light:      300
font-normal:     400
font-medium:     500
font-semibold:   600
font-bold:       700
font-extrabold:  800
font-black:      900
```

---

## 📐 스페이싱 시스템

### 기본 단위: 4px (0.25rem)

```css
0:   0px
1:   4px    (0.25rem)
2:   8px    (0.5rem)
3:   12px   (0.75rem)
4:   16px   (1rem)
5:   20px   (1.25rem)
6:   24px   (1.5rem)
8:   32px   (2rem)
10:  40px   (2.5rem)
12:  48px   (3rem)
16:  64px   (4rem)
20:  80px   (5rem)
24:  96px   (6rem)
32:  128px  (8rem)
```

### 섹션 여백

```css
section-sm:  py-12 lg:py-16  (48-64px)
section-md:  py-16 lg:py-24  (64-96px)
section-lg:  py-20 lg:py-32  (80-128px)
```

---

## 🎯 컴포넌트 스타일

### Buttons

#### Primary Button

```css
.btn-primary {
  background: primary-500
  color: white
  padding: 12px 24px
  border-radius: 8px
  font-weight: 500
  shadow: md

  hover: background primary-600, shadow lg
  active: background primary-700
  focus: ring-2 ring-primary-500 ring-offset-2
}
```

#### Secondary Button

```css
.btn-secondary {
  background: secondary-500
  color: white
  padding: 12px 24px
  border-radius: 8px
  font-weight: 500
  shadow: md

  hover: background secondary-600, shadow lg
}
```

#### Outline Button

```css
.btn-outline {
  background: transparent
  border: 2px solid primary-500
  color: primary-500
  padding: 12px 24px
  border-radius: 8px
  font-weight: 500

  hover: background primary-500, color white
}
```

#### Ghost Button

```css
.btn-ghost {
  background: transparent
  color: neutral-600
  padding: 12px 24px
  border-radius: 8px
  font-weight: 500

  hover: background neutral-100, color neutral-900
}
```

#### Button Sizes

```css
btn-sm:  px-4 py-2 text-sm
btn-md:  px-6 py-3 text-base  (기본)
btn-lg:  px-8 py-4 text-lg
```

---

### Cards

#### Basic Card

```css
.card {
  background: white
  border: 1px solid neutral-100
  border-radius: 16px
  shadow: card (soft shadow)
  padding: 24px

  dark: background neutral-800, border neutral-700
}
```

#### Hoverable Card

```css
.card-hover {
  transition: all 0.3s

  hover:
    - transform translateY(-4px)
    - shadow premium
}
```

---

### Inputs

```css
.input {
  width: 100%
  padding: 12px 16px
  border: 1px solid neutral-300
  border-radius: 8px
  font-size: 16px

  focus:
    - outline none
    - ring-2 ring-primary-500
    - border transparent

  dark: background neutral-800, border neutral-700
}
```

---

### Badges

```css
.badge {
  display: inline-flex
  align-items: center
  padding: 4px 12px
  border-radius: 9999px
  font-size: 14px
  font-weight: 500
}

.badge-primary {
  background: primary-100
  color: primary-800

  dark: background primary-900, color primary-200
}

.badge-success {
  background: green-100
  color: green-800
}

.badge-warning {
  background: yellow-100
  color: yellow-800
}

.badge-danger {
  background: red-100
  color: red-800
}
```

---

## 🌗 다크모드

### 색상 전환 규칙

```css
/* Background */
Light: bg-white, bg-neutral-50
Dark:  bg-neutral-900, bg-black

/* Text */
Light: text-neutral-900, text-neutral-700
Dark:  text-neutral-50, text-neutral-200

/* Borders */
Light: border-neutral-200
Dark:  border-neutral-700

/* Cards */
Light: bg-white, border-neutral-100
Dark:  bg-neutral-800, border-neutral-700
```

### 구현 방법

```typescript
// Toggle Dark Mode
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark ? "true" : "false");
};
```

---

## 🎭 애니메이션

### 전환 효과

```css
transition-fast:    150ms
transition-base:    200ms
transition-medium:  300ms
transition-slow:    500ms
```

### 기본 애니메이션

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide Up */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Float */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

---

## 📱 반응형 브레이크포인트

```css
/* Tailwind 기본 브레이크포인트 */
sm:   640px   /* Mobile Landscape */
md:   768px   /* Tablet */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large Desktop */
2xl:  1536px  /* Extra Large Desktop */
```

### 레이아웃 가이드

#### Mobile (< 640px)

- 단일 컬럼 레이아웃
- 최소 터치 타겟: 44x44px
- 폰트 크기 조정 (16px 기본)

#### Tablet (640px - 1024px)

- 2컬럼 레이아웃 가능
- 사이드바 토글 메뉴
- 카드 그리드: 2열

#### Desktop (> 1024px)

- 멀티 컬럼 레이아웃
- 고정 네비게이션
- 카드 그리드: 3-4열

---

## 🖼️ 이미지 가이드라인

### 이미지 비율

```
Hero Banner:     16:9 (1920x1080)
Service Card:    4:3 (800x600)
Thumbnail:       1:1 (400x400)
Wide Banner:     21:9 (2100x900)
```

### 최적화

- **포맷:** WebP (지원), JPEG (fallback)
- **크기:**
  - Hero: 최대 500KB
  - Card: 최대 200KB
  - Thumbnail: 최대 100KB
- **Lazy Loading:** 뷰포트 밖 이미지는 지연 로딩

---

## 🎨 아이콘

**라이브러리:** Lucide React

**크기:**

- xs: 16x16px (w-4 h-4)
- sm: 20x20px (w-5 h-5)
- md: 24x24px (w-6 h-6)
- lg: 32x32px (w-8 h-8)
- xl: 40x40px (w-10 h-10)

**색상:**

- Primary Actions: primary-500
- Secondary: neutral-500
- Danger: red-500
- Success: green-500

---

## ♿ 접근성 (Accessibility)

### WCAG 2.1 AA 준수

#### 색상 대비

```
일반 텍스트 (본문):        4.5:1 이상
큰 텍스트 (18px+ or Bold): 3:1 이상
UI 컴포넌트:               3:1 이상
```

#### 키보드 네비게이션

- 모든 인터랙티브 요소 Tab 접근 가능
- Focus 상태 명확하게 표시
- Skip to content 링크 제공

#### ARIA 레이블

```html
<button aria-label="메뉴 열기">
  <nav aria-label="주요 네비게이션">
    <img alt="한국환경안전연구소 로고" />
  </nav>
</button>
```

---

## 📏 레이아웃 그리드

### Container

```css
.container-custom {
  max-width: 1280px (xl)
  margin: 0 auto
  padding: 0 16px (sm)
  padding: 0 24px (md+)
}
```

### Grid System

```css
/* 기본 그리드 */
.grid {
  display: grid
  gap: 24px
}

/* 2 컬럼 */
.grid-cols-2 { grid-template-columns: repeat(2, 1fr) }

/* 3 컬럼 */
.grid-cols-3 { grid-template-columns: repeat(3, 1fr) }

/* 4 컬럼 */
.grid-cols-4 { grid-template-columns: repeat(4, 1fr) }

/* 반응형 */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## 🎬 모션 원칙

### Framer Motion 사용

```typescript
// 페이드 인
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>

// 슬라이드 업
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>

// 지연 애니메이션
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
/>
```

---

## 🔤 작성 가이드라인

### 톤 & 매너

- **전문적이지만 친근하게**
- **명확하고 간결하게**
- **존댓말 사용** (고객 대상)

### 버튼 텍스트

- ✅ 좋은 예: "견적 문의하기", "자세히 보기", "서비스 신청"
- ❌ 나쁜 예: "클릭", "여기", "더보기"

### 오류 메시지

- ✅ 좋은 예: "이메일 주소를 확인해주세요"
- ❌ 나쁜 예: "오류 발생"

---

이 디자인 시스템은 KETRI 웹사이트의 일관된 UI/UX를 유지하고,
개발 효율성을 높이기 위한 가이드라인입니다.
