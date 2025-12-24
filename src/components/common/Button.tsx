import { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Figma Dev Mode 기준 Button Component
 * 
 * Primary Button 기준값:
 * - Height: 64px (h-16)
 * - Width: 200px (w-[200px]) or auto
 * - Padding: Top 18px, Bottom 18px, Left 60px, Right 24px
 * - Gap: 26px (아이콘 포함 시)
 * - Border: 2px
 * - Shadow: 0px 1px 0px rgba(0,0,0,0.05)
 */
const Button = ({
  variant = "primary",
  size = "lg",
  isLoading = false,
  icon,
  children,
  className = "",
  disabled,
  type = "button",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  // Base styles - 공통
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  // Variant styles - Figma Dev Mode 기준
  const variants = {
    primary:
      "bg-primary-500 text-white border-2 border-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-xs font-semibold",
    secondary:
      "bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 font-semibold",
    outline:
      "bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 font-medium",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500 font-medium",
  };

  // Size styles - Figma Dev Mode 기준
  const sizes = {
    // Small: 48px height
    sm: "h-12 px-6 py-3 text-label-md gap-3",
    // Medium: 56px height
    md: "h-14 px-8 py-4 text-label-lg gap-4",
    // Large (Primary 기준): 64px height - 중앙 정렬을 위해 좌우 패딩 동일하게
    lg: "h-16 px-8 py-[18px] text-body-lg gap-4",
    // Extra Large: 72px height
    xl: "h-18 px-10 py-5 text-heading-sm gap-5",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          처리중...
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
