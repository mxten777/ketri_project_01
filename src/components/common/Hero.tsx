import { ReactNode, useEffect } from "react";
import Button from "./Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  variant?: "default" | "centered" | "split";
  className?: string;
}

/**
 * Figma Dev Mode 기준 Hero Component
 * 
 * 기준값:
 * - Min Height: 600px (Desktop)
 * - Padding: py-20 ~ py-32
 * - Title: display-md ~ display-lg
 * - Subtitle: heading-lg
 * - Description: body-lg
 */
const Hero = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  variant = "default",
  className = "",
}: HeroProps) => {
  // DEBUG: expose quick render info for dev tools
  try {
    // safe-guard in non-browser environments
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    // eslint-disable-next-line no-console
    console.debug('DEBUG: Hero render', { title, subtitle, backgroundImage: !!backgroundImage, variant, isDark });
  } catch (e) {
    /* noop */
  }

  const variants = {
    default: "text-left",
    centered: "text-center items-center",
    split: "grid lg:grid-cols-2 gap-12 items-center",
  };

  // 모바일 반응형: 타이틀 폰트 크기/줄바꿈/패딩 조정
  // Tailwind: text-4xl md:text-6xl lg:text-7xl 등으로 조정

  // Dev-only: previously had an interactive on-screen debug panel; removed for safety.
  // If you need the debug panel back, reintroduce a smaller, well-scoped implementation.
  useEffect(() => {
    // no-op in this build
    return () => {};
  }, []);

  return (
    <section
      className={`relative min-h-[600px] py-20 lg:py-32 overflow-hidden ${className}`}
    >
      {/* Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70 dark:from-neutral-900/95 dark:to-neutral-900/90" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className={`flex flex-col ${variants[variant]}`}>
          <div className={variant === "split" ? "" : "max-w-3xl"}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-primary-400 dark:text-primary-300 font-semibold text-label-lg mb-4 uppercase tracking-wider">
                {subtitle}
              </p>
            )}

            {/* Title - high contrast for dark mode */}
            <h1
              className={`font-bold mb-6 ${
                backgroundImage ? "text-white" : "text-neutral-900 dark:text-neutral-100"
              } text-display-sm lg:text-display-md leading-[1.8]`} 
            >
              <span
                data-debug="hero-title"
                className="hero-title-scrim"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  lineHeight: '1.8'
                }}
              >
                {title}
              </span>
            </h1>

            {/* Description */}
            {description && (
              <p
                className={`text-body-lg mb-8 ${
                  backgroundImage ? "text-neutral-100 dark:text-neutral-200" : "text-neutral-600 dark:text-neutral-300"
                } max-w-2xl px-4 py-2 rounded-md`}
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {description}
              </p>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4">
                {primaryAction && (
                  <Button
                    size="xl"
                    onClick={primaryAction.onClick}
                    icon={primaryAction.icon}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Split variant 오른쪽 공간 (이미지 등) */}
          {variant === "split" && <div className="hidden lg:block" />}
        </div>
      </div>
    </section>
  );
};

export default Hero;
