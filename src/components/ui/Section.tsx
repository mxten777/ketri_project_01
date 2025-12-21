import { ReactNode, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Section Component
 * 페이지 섹션 - 8pt Grid 기반 spacing
 */

const sectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-[var(--color-bg-primary)]",
      secondary: "bg-[var(--color-bg-secondary)]",
      tertiary: "bg-[var(--color-bg-tertiary)]",
      brand: "bg-brand-50",
      dark: "bg-neutral-900 text-white",
    },
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-12",      // 64px ~ 96px
      md: "py-12 md:py-16",     // 96px ~ 128px
      lg: "py-16 md:py-20",     // 128px ~ 160px
      xl: "py-20 md:py-24",     // 160px ~ 192px
      "2xl": "py-24 md:py-32",  // 192px ~ 256px
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "lg",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: ReactNode;
  as?: "section" | "div" | "article";
  fullWidth?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant,
      spacing,
      as: Component = "section",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ variant, spacing }), className)}
        {...props}
      >
        {fullWidth ? children : <div className="container mx-auto px-6 lg:px-8">{children}</div>}
      </Component>
    );
  }
);

Section.displayName = "Section";
