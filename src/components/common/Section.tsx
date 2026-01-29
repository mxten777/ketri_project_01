import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "dark" | "gradient";
  spacing?: "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
}

/**
 * 기업형 Section Component
 * 
 * 8pt Grid 기반 Spacing:
 * - Small: py-16 (128px)
 * - Medium: py-20 (160px)
 * - Large: py-24 (192px)
 * - Extra Large: py-32 (256px)
 * 
 * 기업형 배경 Variants:
 * - default: 깔끔한 화이트
 * - primary: 은은한 블루 그라데이션
 * - secondary: 중립적 회색
 * - dark: 다크 모드 최적화
 * - gradient: 부드러운 그라데이션
 */
const Section = ({
  children,
  variant = "default",
  spacing = "lg",
  className = "",
  id,
}: SectionProps) => {
  const variants = {
    default: "bg-white dark:bg-neutral-900",
    primary: "bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-neutral-900",
    secondary: "bg-neutral-50 dark:bg-neutral-800",
    dark: "bg-neutral-900 dark:bg-neutral-950 text-white",
    gradient: "bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900",
  };

  const spacings = {
    sm: "py-16", // 128px
    md: "py-20", // 160px
    lg: "py-24", // 192px
    xl: "py-32", // 256px
  };

  return (
    <section
      id={id}
      className={`${variants[variant]} ${spacings[spacing]} ${className}`}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
};

export default Section;
