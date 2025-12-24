import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { themes, ThemeType } from "@/config/themes";
import { Container, Section, Card, CardHeader, CardTitle, CardContent, Input, Modal, ModalFooter } from "@/components/ui";
import { Button } from "@/components/common";

/**
 * Theme System Demo Page
 * 업종별 테마 적용 및 UI 컴포넌트 시연
 */


const ThemeSystemDemo = () => {
  const { theme, setTheme, isDark, toggleDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputError) setInputError("");
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setInputError("이름을 입력해주세요");
      return;
    }
    alert(`입력된 값: ${inputValue}`);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-secondary)]">
      {/* Header */}
      <header className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] sticky top-0 z-sticky">
        <Container size="xl">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-heading-md font-bold text-brand-500">
              Theme System
            </h1>
            <button
              onClick={toggleDark}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <Section spacing="xl" variant="brand" data-has-hero>
        <div className="text-center">
          <h2 className="text-display-md font-bold mb-6">
            재사용 가능한 테마 시스템
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            업종별 테마를 선택하면 브랜드 색상, 폰트, 간격이 자동으로 변경됩니다.
            <br />
            8pt Grid 기반 + CSS Variables + Tailwind 조합으로 구현되었습니다.
          </p>
          <div className="flex justify-center">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              Modal 열기
            </Button>
          </div>
        </div>
      </Section>

      {/* Theme Selector */}
      <Section className="pt-10 lg:pt-12 pb-12 lg:pb-16" spacing="lg">
        <h3 className="text-heading-lg font-bold text-center mb-8">
          업종별 테마 선택
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(themes).map((t) => (
            <Card
              key={t.id}
              variant={theme === t.id ? "elevated" : "outlined"}
              hover="glow"
              onClick={() => handleThemeChange(t.id)}
              className={theme === t.id ? "border-brand-500" : ""}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t.name}</CardTitle>
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-[var(--color-text-tertiary)]">
                  {t.description}
                </p>
                <div className="mt-4 space-y-2 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-tertiary)]">폰트:</span>
                    <span className="font-medium">{t.fontFamily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-tertiary)]">라운딩:</span>
                    <span className="font-medium">{t.borderRadius}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-tertiary)]">간격:</span>
                    <span className="font-medium">{t.spacing}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Button States */}
      <Section spacing="lg" variant="secondary">
        <h3 className="text-heading-lg font-bold text-center mb-8">
          Button States (상태값 강제)
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large (Primary)</Button>
          <Button size="xl">Extra Large</Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </Section>

      {/* Input States */}
      <Section spacing="lg">
        <h3 className="text-heading-lg font-bold text-center mb-8">
          Input States (Focus Ring + Error)
        </h3>
        <div className="max-w-2xl mx-auto space-y-6">
          <Input
            label="일반 Input"
            placeholder="포커스 시 ring 확인"
            helperText="Focus 상태에서 접근성 ring이 표시됩니다"
          />
          <Input
            label="필수 Input"
            placeholder="필수 입력 필드"
            required
          />
          <Input
            label="에러 Input"
            placeholder="에러 상태"
            error="올바른 값을 입력해주세요"
            variant="error"
          />
          <Input
            label="Success Input"
            placeholder="성공 상태"
            variant="success"
          />
          <Input
            label="비활성화 Input"
            placeholder="비활성화 상태"
            disabled
          />
        </div>
      </Section>

      {/* Card Variants */}
      <Section spacing="lg" variant="tertiary">
        <h3 className="text-heading-lg font-bold text-center mb-8">
          Card Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="default">
            <CardTitle>Default</CardTitle>
            <CardContent className="mt-4">
              <p className="text-body-sm">기본 카드 스타일</p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardTitle>Elevated</CardTitle>
            <CardContent className="mt-4">
              <p className="text-body-sm">그림자가 있는 카드</p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardTitle>Outlined</CardTitle>
            <CardContent className="mt-4">
              <p className="text-body-sm">테두리만 있는 카드</p>
            </CardContent>
          </Card>

          <Card variant="filled">
            <CardTitle>Filled</CardTitle>
            <CardContent className="mt-4">
              <p className="text-body-sm">배경색이 있는 카드</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h4 className="text-heading-sm font-semibold mb-4 text-center">
            Hover Effects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card variant="elevated" hover="lift">
              <CardTitle>Lift on Hover</CardTitle>
              <CardContent className="mt-4">
                <p className="text-body-sm">
                  마우스를 올리면 위로 올라갑니다
                </p>
              </CardContent>
            </Card>

            <Card variant="default" hover="glow">
              <CardTitle>Glow on Hover</CardTitle>
              <CardContent className="mt-4">
                <p className="text-body-sm">
                  마우스를 올리면 테두리가 빛납니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Responsive Container */}
      <Section spacing="lg">
        <h3 className="text-heading-lg font-bold text-center mb-8">
          반응형 Container (1440/1024/375)
        </h3>
        <div className="space-y-4">
          <Container size="sm">
            <Card variant="filled">
              <p className="text-body-sm">Container SM (640px)</p>
            </Card>
          </Container>
          <Container size="md">
            <Card variant="filled">
              <p className="text-body-sm">Container MD (768px)</p>
            </Card>
          </Container>
          <Container size="lg">
            <Card variant="filled">
              <p className="text-body-sm">Container LG (1024px) - 기준</p>
            </Card>
          </Container>
          <Container size="xl">
            <Card variant="filled">
              <p className="text-body-sm">Container XL (1280px)</p>
            </Card>
          </Container>
        </div>
      </Section>

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Example"
        description="접근성과 상태 관리가 적용된 Modal입니다"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="이름"
            placeholder="이름을 입력하세요"
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            required
          />
          <p className="text-body-sm text-[var(--color-text-tertiary)]">
            • ESC 키로 닫기
            <br />
            • Backdrop 클릭으로 닫기
            <br />
            • Focus trap 적용
            <br />• Body scroll lock
          </p>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit}>확인</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default ThemeSystemDemo;
