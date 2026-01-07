# 재사용 가능한 테마 기반 UI 시스템 - 적용 체크리스트

## ✅ 적용 순서 (10단계)

### 📦 Phase 1: Foundation Setup (1-4)

#### ✅ 1. 패키지 설치
```bash
npm install class-variance-authority clsx tailwind-merge framer-motion @heroicons/react
```

**설치 확인**:
- [ ] class-variance-authority
- [ ] clsx
- [ ] tailwind-merge
- [ ] framer-motion
- [ ] @heroicons/react

---

#### ✅ 2. Design Tokens 생성

**파일**: `src/styles/tokens.css`

**작업**:
- [ ] tokens.css 파일 생성
- [ ] Color tokens 정의 (brand, neutral, system)
- [ ] Typography tokens 정의 (font-size, weight, line-height)
- [ ] Spacing tokens 정의 (8pt Grid)
- [ ] Component tokens 정의 (button, input 높이)
- [ ] Shadow tokens 정의
- [ ] Dark mode variables 정의
- [ ] Industry theme overrides 정의 (5개 업종)

**검증**:
```bash
# 파일 존재 확인
ls src/styles/tokens.css
```

---

#### ✅ 3. Tailwind Config 정리

**파일**: `tailwind.config.js` (기존 파일 백업 후 교체)

**작업**:
- [ ] 기존 tailwind.config.js 백업
- [ ] 새 tailwind.config.js로 교체 (CSS Variable 매핑)
- [ ] colors에 var() 매핑
- [ ] fontSize에 var() 매핑
- [ ] spacing에 var() 매핑
- [ ] borderRadius, boxShadow, zIndex 설정

**검증**:
```bash
# Tailwind 빌드 테스트
npm run build
```

---

#### ✅ 4. Theme System 구현

**파일**: 
- `src/config/themes.ts`
- `src/contexts/ThemeContext.tsx`
- `src/utils/cn.ts`

**작업**:
- [ ] themes.ts 생성 (6개 업종 테마)
- [ ] ThemeContext.tsx 생성 (Provider)
- [ ] cn.ts 생성 (유틸리티)
- [ ] main.tsx에 ThemeProvider 추가
- [ ] index.css에 tokens.css import 추가

**main.tsx 수정**:
```tsx
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/tokens.css";

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

**index.css 수정**:
```css
@import './styles/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**검증**:
```tsx
// 아무 컴포넌트에서 테스트
import { useTheme } from "@/contexts/ThemeContext";
const { theme, setTheme } = useTheme();
console.log(theme); // "default"
```

---

### 🧩 Phase 2: UI Components (5-9)

#### ✅ 5. Container 컴포넌트

**파일**: `src/components/ui/Container.tsx`

**작업**:
- [ ] Container.tsx 생성
- [ ] 5가지 size variant 구현
- [ ] 반응형 padding 구현
- [ ] forwardRef 적용

**테스트**:
```tsx
<Container size="lg">
  <p>Test</p>
</Container>
```

---

#### ✅ 6. Section 컴포넌트

**파일**: `src/components/ui/Section.tsx`

**작업**:
- [ ] Section.tsx 생성
- [ ] 5가지 spacing variant 구현
- [ ] 5가지 variant (default/secondary/tertiary/brand/dark)
- [ ] fullWidth 옵션

**테스트**:
```tsx
<Section spacing="lg" variant="brand">
  <p>Test</p>
</Section>
```

---

#### ✅ 7. Card 컴포넌트

**파일**: `src/components/ui/Card.tsx`

**작업**:
- [ ] Card.tsx 생성
- [ ] 4가지 variant 구현
- [ ] 2가지 hover 효과
- [ ] Subcomponents 구현 (CardHeader, CardTitle, CardContent, CardFooter)

**테스트**:
```tsx
<Card variant="elevated" hover="lift">
  <CardTitle>Title</CardTitle>
  <CardContent>Content</CardContent>
</Card>
```

---

#### ✅ 8. Input 컴포넌트

**파일**: `src/components/ui/Input.tsx`

**작업**:
- [ ] Input.tsx 생성
- [ ] 3가지 size 구현
- [ ] 3가지 variant (default/error/success)
- [ ] label, error, helperText props
- [ ] Focus ring (접근성)
- [ ] Disabled state

**테스트**:
```tsx
<Input
  label="이름"
  placeholder="입력하세요"
  error="에러 메시지"
  required
/>
```

---

#### ✅ 9. Modal 컴포넌트

**파일**: `src/components/ui/Modal.tsx`

**작업**:
- [ ] Modal.tsx 생성
- [ ] Portal 렌더링
- [ ] Backdrop 구현
- [ ] ESC 키 닫기
- [ ] Body scroll lock
- [ ] Focus trap
- [ ] ModalFooter subcomponent

**테스트**:
```tsx
<Modal
  isOpen={true}
  onClose={handleClose}
  title="테스트"
>
  <p>내용</p>
</Modal>
```

---

### 🔗 Phase 3: Integration (10)

#### ✅ 10. 기존 페이지 마이그레이션

**작업**:
- [ ] ui 컴포넌트 index.ts 생성
- [ ] ThemeSystemDemo.tsx 페이지 생성
- [ ] 1개 기존 페이지를 새 컴포넌트로 변환
- [ ] Header에 테마 전환 버튼 추가

**ui/index.ts**:
```tsx
export { Container } from "./Container";
export { Section } from "./Section";
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./Card";
export { Input } from "./Input";
export { Modal, ModalFooter } from "./Modal";
```

**마이그레이션 예시**:
```tsx
// Before
<div className="max-w-7xl mx-auto px-6">
  <div className="bg-white p-6 rounded-lg">
    Content
  </div>
</div>

// After
<Container size="xl">
  <Card>
    <CardContent>Content</CardContent>
  </Card>
</Container>
```

---

## 🧪 검증 체크리스트

### 기능 검증
- [ ] 테마 전환 동작 (6개 업종)
- [ ] 다크 모드 토글
- [ ] 반응형 3구간 확인 (1440/1024/375)
- [ ] Button 모든 state 확인 (hover/focus/active/disabled)
- [ ] Input focus ring 확인
- [ ] Modal ESC/Backdrop 닫기
- [ ] Card hover 애니메이션

### 접근성 검증
- [ ] Keyboard navigation (Tab)
- [ ] Focus ring 표시
- [ ] aria-label 적용
- [ ] Screen reader 테스트 (선택)

### 반응형 검증
- [ ] Desktop (1440px): 3-4 column grid
- [ ] Tablet (1024px): 2-3 column grid
- [ ] Mobile (375px): 1 column, 작은 폰트

### 성능 검증
- [ ] CSS Variable 적용 확인 (DevTools)
- [ ] 테마 전환 속도 (<100ms)
- [ ] Build 성공 확인

---

## 📁 완성된 파일 구조

```
ketri_project_01/
├── src/
│   ├── styles/
│   │   └── tokens.css                    ✅
│   ├── config/
│   │   └── themes.ts                     ✅
│   ├── contexts/
│   │   ├── ThemeContext.tsx              ✅
│   │   ├── AuthContext.tsx               (기존)
│   │   └── NotificationContext.tsx       (기존)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Container.tsx             ✅
│   │   │   ├── Section.tsx               ✅
│   │   │   ├── Card.tsx                  ✅
│   │   │   ├── Input.tsx                 ✅
│   │   │   ├── Modal.tsx                 ✅
│   │   │   └── index.ts                  ✅
│   │   └── common/
│   │       ├── Button.tsx                (기존)
│   │       └── ...
│   ├── utils/
│   │   └── cn.ts                         ✅
│   ├── pages/
│   │   └── ThemeSystemDemo.tsx           ✅
│   └── main.tsx                          (수정)
├── tailwind.config.js                    ✅ (교체)
├── docs/
│   ├── THEME_SYSTEM_GUIDE.md             ✅
│   └── THEME_CHECKLIST.md                ✅ (이 파일)
└── package.json                          (의존성 추가)
```

---

## 🚨 주의사항

### 1. Tailwind Config 교체 시
```bash
# 기존 파일 백업
cp tailwind.config.js tailwind.config.backup.js

# 새 파일로 교체
cp tailwind.config.new.js tailwind.config.js
```

### 2. CSS Import 순서
```css
/* index.css - 반드시 이 순서 */
@import './styles/tokens.css';  /* 1. tokens 먼저 */
@tailwind base;                 /* 2. base */
@tailwind components;           /* 3. components */
@tailwind utilities;            /* 4. utilities */
```

### 3. TypeScript Path Alias
```json
// tsconfig.json에 확인
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4. Framer Motion Import
```tsx
// ✅ 올바른 import
import { motion, AnimatePresence } from "framer-motion";

// ❌ 잘못된 import
import motion from "framer-motion";
```

---

## 🎯 완료 후 확인사항

### 필수 확인
1. [ ] `npm run dev` 정상 실행
2. [ ] `npm run build` 성공
3. [ ] 브라우저 Console 에러 없음
4. [ ] /theme-demo 페이지 접근 가능
5. [ ] 테마 전환 동작

### 선택 확인
6. [ ] Lighthouse 접근성 점수 90+ (선택)
7. [ ] TypeScript 에러 없음
8. [ ] ESLint warning 최소화

---

## 📞 문제 해결

### 문제 1: CSS Variable이 적용되지 않음
**원인**: tokens.css import 누락  
**해결**: index.css에 `@import './styles/tokens.css';` 추가

### 문제 2: cn is not defined
**원인**: cn 유틸리티 import 누락  
**해결**: `import { cn } from "@/utils/cn";` 추가

### 문제 3: useTheme is not a function
**원인**: ThemeProvider 미적용  
**해결**: main.tsx에 ThemeProvider 추가

### 문제 4: class-variance-authority 에러
**원인**: 패키지 미설치  
**해결**: `npm install class-variance-authority` 실행

---

## 🎓 다음 단계

체크리스트 완료 후:

1. **추가 컴포넌트 개발**
   - Dropdown, Select
   - Tabs, Accordion
   - Toast, Alert
   - Badge, Tag

2. **테마 커스터마이징**
   - 회사 브랜드 색상 적용
   - 커스텀 폰트 추가
   - 애니메이션 조정

3. **성능 최적화**
   - React.memo 적용
   - Code splitting
   - Image optimization

4. **문서화**
   - Storybook 추가 (선택)
   - 컴포넌트 API 문서
   - 사용 가이드 작성

---

**체크리스트 완료를 축하합니다! 🎉**

모든 항목을 완료하면 재사용 가능한 테마 기반 UI 시스템이 구축됩니다.
