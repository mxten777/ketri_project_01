import { ReactNode } from "react";
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
  const variants = {
    default: "text-left",
    centered: "text-center items-center",
    split: "grid lg:grid-cols-2 gap-12 items-center",
  };

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
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className={`flex flex-col ${variants[variant]}`}>
          <div className={variant === "split" ? "" : "max-w-3xl"}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-primary-500 font-semibold text-label-lg mb-4 uppercase tracking-wider">
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h1
              className={`font-bold mb-6 ${
                backgroundImage ? "text-white" : "text-neutral-900"
              } text-display-sm lg:text-display-md`}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                className={`text-body-lg mb-8 ${
                  backgroundImage ? "text-neutral-200" : "text-neutral-600"
                } max-w-2xl`}
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
