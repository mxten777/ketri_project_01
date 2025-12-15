import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
  iconAnimation?: boolean;
}

/**
 * 관리자 통계 카드 컴포넌트
 * - Glassmorphism 효과
 * - 애니메이션 지원
 * - 커스텀 그라데이션
 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  delay = 0,
  iconAnimation = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`${gradient} backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={iconAnimation ? { scale: 1.1, rotate: 10 } : {}}
          className={`w-14 h-14 ${
            gradient.replace("from-", "bg-").replace("to-", "").split(" ")[0]
          }/30 rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <div>
          <div className="text-3xl font-bold text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          <div className="text-sm text-gray-300 mt-1">{title}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
