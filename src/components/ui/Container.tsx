import { ReactNode, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Container Component
 * 반응형 컨테이너 - 3구간(1440/1024/375) 대응
 */

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-container-sm px-4 sm:px-6",           // 640px
      md: "max-w-container-md px-4 sm:px-6",           // 768px
      lg: "max-w-container-lg px-6 lg:px-8",           // 1024px - 기준
      xl: "max-w-container-xl px-6 lg:px-8",           // 1280px
      "2xl": "max-w-container-2xl px-6 lg:px-8",       // 1536px
      full: "max-w-full px-4 sm:px-6 lg:px-8",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
  as?: "div" | "section" | "article" | "main";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Component = "div", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
