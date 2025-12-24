import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

/**
 * Figma Dev Mode 기준 Container Component
 * 
 * Max Width:
 * - Small: 640px (sm)
 * - Medium: 768px (md)
 * - Large: 1024px (lg)
 * - Extra Large: 1280px (xl) - Default
 * - Full: 100%
 */
const Container = ({
  children,
  size = "xl",
  className = "",
}: ContainerProps) => {
  const sizes = {
    sm: "max-w-screen-sm", // 640px
    md: "max-w-screen-md", // 768px
    lg: "max-w-screen-lg", // 1024px
    xl: "max-w-7xl", // 1280px
    full: "max-w-full",
  };

  return (
    <div className={`container mx-auto px-6 lg:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
