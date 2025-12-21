import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel: string;
}

/**
 * Figma Dev Mode 기준 IconButton Component
 * 
 * 정사각형 버튼으로 아이콘만 포함
 * - Small: 40x40px
 * - Medium: 48x48px
 * - Large: 56x56px
 */
const IconButton = ({
  icon,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  ariaLabel,
}: IconButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0";

  const variants = {
    primary:
      "bg-primary-500 text-white border-2 border-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-xs",
    secondary:
      "bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500",
    outline:
      "bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500",
  };

  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
