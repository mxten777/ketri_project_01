import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "dark";
  spacing?: "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
}

/**
 * Figma Dev Mode 기준 Section Component
 * 
 * 8pt Grid 기반 Spacing:
 * - Small: py-12 (96px)
 * - Medium: py-16 (128px)
 * - Large: py-20 (160px)
 * - Extra Large: py-24 (192px)
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
    primary: "bg-primary-50 dark:bg-primary-900/10",
    secondary: "bg-neutral-50 dark:bg-neutral-800",
    dark: "bg-neutral-900 dark:bg-neutral-950 text-white",
  };

  const spacings = {
    sm: "py-12", // 96px
    md: "py-16", // 128px
    lg: "py-20", // 160px
    xl: "py-24", // 192px
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
