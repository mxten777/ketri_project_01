import { Hero, Button, Card, Section } from "@/components/common";
import { ArrowRight, CheckCircle } from "lucide-react";

/**
 * Figma Design System 사용 예시 페이지
 * 
 * 이 파일은 구현된 디자인 시스템 컴포넌트들의 실제 사용 예시를 보여줍니다.
 * 다른 프로젝트나 페이지에서 참고하여 사용하실 수 있습니다.
 */

const DesignSystemExample = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section 예시 */}
      <Hero
        subtitle="Design System"
        title="Figma 기준 디자인 시스템"
        description="React + TypeScript + TailwindCSS로 구현한 확장 가능한 디자인 시스템입니다. 8pt Grid 기반으로 모든 업종에서 재사용 가능합니다."
            primaryAction={{
              label: "시작하기",
              onClick: () => console.log("Primary Action"),
              icon: <ArrowRight className="w-5 h-5" />,
            }}
        secondaryAction={{
          label: "문서 보기",
          onClick: () => console.log("Secondary Action"),
        }}
        variant="centered"
      />

      {/* 2. Button 예시 Section */}
      <Section className="pt-10 lg:pt-12 pb-12 lg:pb-16" spacing="xl">
        <h2 className="text-display-sm font-bold text-center mb-4">
          Button Components
        </h2>
        <p className="text-body-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Figma Dev Mode 기준으로 구현된 버튼 컴포넌트입니다.
          Primary 버튼은 64px 높이, 200px 폭 기준입니다.
        </p>

        <div className="space-y-12">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-heading-md mb-6">Primary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-heading-md mb-6">Secondary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="md">
                Medium
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
              <Button variant="secondary" size="xl">
                Extra Large
              </Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div>
            <h3 className="text-heading-md mb-6">Outline Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">
                Small
              </Button>
              <Button variant="outline" size="md">
                Medium
              </Button>
              <Button variant="outline" size="lg">
                Large
              </Button>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div>
            <h3 className="text-heading-md mb-6">Ghost Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="sm">
                Small
              </Button>
              <Button variant="ghost" size="md">
                Medium
              </Button>
              <Button variant="ghost" size="lg">
                Large
              </Button>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-heading-md mb-6">Buttons with Icons</h3>
            <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  시작하기
                </Button>
              <Button
                variant="secondary"
                size="md"
                  icon={<CheckCircle className="w-5 h-5" />}
              >
                확인
              </Button>
              <Button
                variant="outline"
                size="md"
                  icon={<ArrowRight className="w-5 h-5" />}
              >
                자세히 보기
              </Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-heading-md mb-6">Button States</h3>
            <div className="flex flex-wrap gap-4">
              <Button isLoading size="md">
                Loading...
              </Button>
              <Button disabled size="md">
                Disabled
              </Button>
              <Button fullWidth size="md">
                Full Width Button
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Card 예시 Section */}
      <Section spacing="xl" variant="secondary">
        <h2 className="text-display-sm font-bold text-center mb-4">
          Card Components
        </h2>
        <p className="text-body-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          다양한 variant와 상태를 지원하는 Card 컴포넌트입니다.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Card */}
          <Card>
            <h3 className="text-heading-md mb-3">Default Card</h3>
            <p className="text-body-md text-neutral-600 mb-4">
              기본 카드 스타일입니다. Border와 함께 깔끔한 디자인을 제공합니다.
            </p>
            <Button variant="outline" size="sm">
              자세히 보기
            </Button>
          </Card>

          {/* Elevated Card */}
          <Card variant="elevated">
            <h3 className="text-heading-md mb-3">Elevated Card</h3>
            <p className="text-body-md text-neutral-600 mb-4">
              Shadow가 적용된 카드입니다. 더 강조된 느낌을 줍니다.
            </p>
            <Button variant="outline" size="sm">
              자세히 보기
            </Button>
          </Card>

          {/* Hover Card */}
          <Card variant="elevated" hover>
            <h3 className="text-heading-md mb-3">Hover Card</h3>
            <p className="text-body-md text-neutral-600 mb-4">
              마우스 오버 시 애니메이션 효과가 적용됩니다.
            </p>
            <Button variant="outline" size="sm">
              자세히 보기
            </Button>
          </Card>

          {/* Outlined Card */}
          <Card variant="outlined">
            <h3 className="text-heading-md mb-3">Outlined Card</h3>
            <p className="text-body-md text-neutral-600 mb-4">
              두꺼운 border로 강조된 카드입니다.
            </p>
            <Button variant="outline" size="sm">
              자세히 보기
            </Button>
          </Card>

          {/* Filled Card */}
          <Card variant="filled">
            <h3 className="text-heading-md mb-3">Filled Card</h3>
            <p className="text-body-md text-neutral-600 mb-4">
              배경색이 적용된 카드입니다.
            </p>
            <Button variant="outline" size="sm">
              자세히 보기
            </Button>
          </Card>

          {/* No Padding Card */}
          <Card padding="none" variant="elevated">
            <div className="aspect-video bg-primary-100 rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-heading-md mb-3">Image Card</h3>
              <p className="text-body-md text-neutral-600 mb-4">
                이미지와 함께 사용하는 카드입니다.
              </p>
              <Button variant="outline" size="sm">
                자세히 보기
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* 4. Typography 예시 Section */}
      <Section spacing="xl">
        <h2 className="text-display-sm font-bold text-center mb-12">
          Typography Scale
        </h2>

        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Display */}
          <div>
            <p className="text-label-md text-neutral-500 mb-2">Display Large</p>
            <h1 className="text-display-lg">
              Display Large (72px)
            </h1>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Display Medium</p>
            <h2 className="text-display-md">
              Display Medium (60px)
            </h2>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Display Small</p>
            <h3 className="text-display-sm">
              Display Small (48px)
            </h3>
          </div>

          {/* Heading */}
          <div>
            <p className="text-label-md text-neutral-500 mb-2">Heading XL</p>
            <h4 className="text-heading-xl">
              Heading Extra Large (36px)
            </h4>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Heading Large</p>
            <h5 className="text-heading-lg">
              Heading Large (30px)
            </h5>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Heading Medium</p>
            <h6 className="text-heading-md">
              Heading Medium (24px)
            </h6>
          </div>

          {/* Body */}
          <div>
            <p className="text-label-md text-neutral-500 mb-2">Body Large</p>
            <p className="text-body-lg">
              Body Large (18px) - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Body Medium</p>
            <p className="text-body-md">
              Body Medium (16px) - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>

          <div>
            <p className="text-label-md text-neutral-500 mb-2">Body Small</p>
            <p className="text-body-sm">
              Body Small (14px) - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Colors 예시 Section */}
      <Section spacing="xl" variant="secondary">
        <h2 className="text-display-sm font-bold text-center mb-12">
          Color System
        </h2>

        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Primary/Brand Colors */}
          <div>
            <h3 className="text-heading-md mb-4">Primary (Brand) Colors</h3>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <div className="h-20 bg-primary-100 rounded-lg mb-2" />
                <p className="text-label-sm text-center">100</p>
              </div>
              <div>
                <div className="h-20 bg-primary-300 rounded-lg mb-2" />
                <p className="text-label-sm text-center">300</p>
              </div>
              <div>
                <div className="h-20 bg-primary-500 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">500</p>
              </div>
              <div>
                <div className="h-20 bg-primary-600 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">600</p>
              </div>
              <div>
                <div className="h-20 bg-primary-700 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">700</p>
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="text-heading-md mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <div className="h-20 bg-neutral-100 rounded-lg mb-2" />
                <p className="text-label-sm text-center">100</p>
              </div>
              <div>
                <div className="h-20 bg-neutral-300 rounded-lg mb-2" />
                <p className="text-label-sm text-center">300</p>
              </div>
              <div>
                <div className="h-20 bg-neutral-500 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">500</p>
              </div>
              <div>
                <div className="h-20 bg-neutral-700 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">700</p>
              </div>
              <div>
                <div className="h-20 bg-neutral-900 rounded-lg mb-2" />
                <p className="text-label-sm text-center text-white">900</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Spacing 예시 Section */}
      <Section spacing="xl">
        <h2 className="text-display-sm font-bold text-center mb-4">
          Spacing System
        </h2>
        <p className="text-body-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          8pt Grid 기반 Spacing System (8의 배수)
        </p>

        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary-500" />
            <span className="text-label-md text-neutral-600">8px (0.5rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-primary-500" />
            <span className="text-label-md text-neutral-600">16px (1rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-primary-500" />
            <span className="text-label-md text-neutral-600">24px (1.5rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary-500" />
            <span className="text-label-md text-neutral-600">32px (2rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500" />
            <span className="text-label-md text-neutral-600">48px (3rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-500" />
            <span className="text-label-md text-neutral-600">64px (4rem)</span>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default DesignSystemExample;
