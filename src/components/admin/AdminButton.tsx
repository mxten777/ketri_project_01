import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AdminButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}

/**
 * 관리자 페이지용 버튼 컴포넌트
 * - 일관된 스타일
 * - 애니메이션 효과
 * - 여러 variant 지원
 */
const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  variant = "secondary",
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
    secondary:
      "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20",
    ghost: "bg-transparent hover:bg-white/5 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg transition-all duration-200 ${
        variants[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-sm font-medium">{children}</span>
    </motion.button>
  );
};

export default AdminButton;
