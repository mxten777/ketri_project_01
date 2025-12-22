import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const NaraPurchase: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">나라장터 관리</h1>
        <p className="text-gray-300">나라장터 입찰 및 계약 정보를 관리합니다.</p>
      </div>

      {/* 빈 컨텐츠 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center"
      >
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-bold text-white mb-2">준비 중입니다</h2>
        <p className="text-gray-400">나라장터 관리 기능이 곧 추가될 예정입니다.</p>
      </motion.div>
    </div>
  );
};

export default NaraPurchase;
