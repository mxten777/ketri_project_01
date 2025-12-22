/**
 * 서비스 카드 컴포넌트
 * 홈 페이지에서 사용되는 서비스 소개 카드
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
  index: number;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  path,
  color,
  index,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={path} className="block group">
        <div className="relative h-full bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 dark:border-neutral-700 overflow-hidden">
          {/* 호버 시 배경 그라데이션 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* 아이콘 */}
          <div className="relative z-10 mb-6">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
            >
              <Icon className="w-8 h-8" />
            </div>
          </div>

          {/* 타이틀 */}
          <h3 className="relative z-10 text-2xl font-bold mb-4 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>

          {/* 설명 */}
          <p className="relative z-10 text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            {description}
          </p>

          {/* 자세히 보기 링크 */}
          <div className="relative z-10 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
            자세히 보기
            <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          {/* 장식 요소 */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
