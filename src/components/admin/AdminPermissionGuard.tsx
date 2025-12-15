import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AdminPermissionGuardProps {
  children: React.ReactNode;
}

/**
 * 관리자 권한 체크 컴포넌트
 * - 관리자가 아닌 경우 접근 차단 화면 표시
 * - 일관된 권한 체크 로직
 */
const AdminPermissionGuard: React.FC<AdminPermissionGuardProps> = ({
  children,
}) => {
  const { user, userData } = useAuth();

  if (!user || userData?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-pink-600/10 to-red-600/10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md mx-auto border border-white/20"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-24 h-24 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-500/30"
          >
            <Shield className="w-12 h-12 text-red-400" />
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-4">
            접근 권한이 없습니다
          </h3>
          <p className="text-gray-300 mb-8 leading-relaxed">
            관리자 권한이 필요한 페이지입니다.
            <br />
            적절한 권한으로 다시 로그인해주세요.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-200"
          >
            이전 페이지로 돌아가기
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminPermissionGuard;
