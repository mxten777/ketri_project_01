import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Figma Dev Mode 기준 Card Component
 * 
 * 기준값:
 * - Border Radius: 16px (rounded-lg)
 * - Padding: 24px (p-6) - Medium
 * - Shadow: card shadow or soft shadow
 * - Border: 1px (outlined variant)
 */
const Card = ({
  children,
  variant = "default",
  padding = "md",
  hover = false,
  className = "",
  onClick,
}: CardProps) => {
  const baseStyles = "rounded-lg transition-all duration-200";

  const variants = {
    default: "bg-white border border-neutral-200",
    elevated: "bg-white shadow-card hover:shadow-md",
    outlined: "bg-transparent border-2 border-neutral-300",
    filled: "bg-neutral-50 border border-neutral-200",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4", // 16px
    md: "p-6", // 24px
    lg: "p-8", // 32px
  };

  const hoverStyles = hover
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
