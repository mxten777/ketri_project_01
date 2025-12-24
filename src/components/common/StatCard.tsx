/**
 * 통계 카드 컴포넌트
 * 홈 페이지 히어로 섹션의 통계 표시용
 */
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
}

const StatCard = ({ value, label, index }: StatCardProps) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.05 }}
    >
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </motion.div>
  );
};

export default StatCard;
