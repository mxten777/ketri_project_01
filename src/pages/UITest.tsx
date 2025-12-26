import { useState } from "react";
import { Container, Section, Card, CardHeader, CardTitle, CardContent, CardFooter, Input, Modal, ModalFooter } from "@/components/ui";
import { Button } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext.core";
import type { ThemeType } from "@/config/themes";
import { ArrowRight as ArrowRightIcon } from "lucide-react";

/**
 * UI Test Page - 새로운 컴포넌트 시스템 테스트
 */
 
const UITest = () => {
  const { theme, setTheme, isDark, toggleDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="min-h-screen bg-[var(--color-bg-secondary)]">
      {/* Header with Theme Controls */}
      <Section spacing="sm" variant="default">
        <Container size="xl">
          <div className="flex items-center justify-between">
            <h1 className="text-heading-lg font-bold">UI Components Test</h1>
            <div className="flex gap-3">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as unknown as ThemeType)}
                className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]"
              >
                <option value="default">환경/분석</option>
                <option value="healthcare">의료</option>
                <option value="finance">금융</option>
                <option value="education">교육</option>
                <option value="food">식품</option>
                <option value="technology">기술</option>
              </select>
              <button
                onClick={toggleDark}
                className="px-4 py-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section spacing="lg" variant="brand" data-has-hero>
        <Container size="lg">
          <h2 className="text-display-sm font-bold mb-4">Hello World!</h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] mb-6 max-w-2xl">
            새로운 UI 컴포넌트 시스템이 적용되었습니다. 
            Container, Section, Card, Input, Modal 컴포넌트를 사용하고 있습니다.
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              icon={<ArrowRightIcon className="w-5 h-5" />}
              onClick={() => setIsModalOpen(true)}
            >
              Modal 열기
            </Button>
            <Button variant="secondary" size="lg">
              Secondary Button
            </Button>
          </div>
        </Container>
      </Section>

      {/* Cards Grid */}
      <Section className="pt-10 lg:pt-12 pb-12 lg:pb-16" spacing="lg">
        <Container size="xl">
          <h3 className="text-heading-md font-bold mb-6">Card Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-md text-[var(--color-text-tertiary)]">
                  기본 카드 스타일입니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" hover="lift">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-md text-[var(--color-text-tertiary)]">
                  Shadow와 hover 효과가 적용되었습니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="outlined" hover="glow">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-md text-[var(--color-text-tertiary)]">
                  테두리 스타일입니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Input Section */}
      <Section spacing="lg" variant="secondary">
        <Container size="lg">
          <h3 className="text-heading-md font-bold mb-6">Input Components</h3>
          <div className="max-w-2xl space-y-6">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Focus ring이 표시됩니다"
            />
            <Input
              label="이메일"
              type="email"
              placeholder="email@example.com"
              required
            />
            <Input
              label="에러 상태"
              placeholder="에러 예시"
              error="올바른 값을 입력해주세요"
              variant="error"
            />
            <Input
              label="비활성화"
              placeholder="비활성화 상태"
              disabled
            />
          </div>
        </Container>
      </Section>

      {/* Button States */}
      <Section spacing="lg">
        <Container size="xl">
          <h3 className="text-heading-md font-bold mb-6">Button States</h3>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large (Primary)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </Container>
      </Section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="테스트 Modal"
        description="새로운 Modal 컴포넌트입니다"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-body-md">
            이 Modal은 다음 기능을 포함합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-body-sm text-[var(--color-text-tertiary)]">
            <li>Portal 렌더링</li>
            <li>ESC 키로 닫기</li>
            <li>Backdrop 클릭으로 닫기</li>
            <li>Body scroll lock</li>
            <li>Focus trap</li>
            <li>Framer Motion 애니메이션</li>
          </ul>
          <Input
            label="테스트 입력"
            placeholder="Modal 내부 Input"
          />
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            취소
          </Button>
          <Button onClick={() => {
            alert("확인 클릭!");
            setIsModalOpen(false);
          }}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default UITest;
