import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, FileText, TrendingUp } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardStats } from "../../services/statsService";
import Button from "../../components/common/Button";

const AdminDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQnAs: 0,
    totalResources: 0,
    totalNotices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || userData.role !== "admin") {
        return;
      }

      try {
        setLoading(true);
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("대시보드 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  // 관리자 권한 확인
  if (!user || userData?.role !== "admin") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            접근 권한이 없습니다
          </h2>
          <p className="text-gray-300 mb-6">
            관리자만 접근할 수 있는 페이지입니다.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">관리자 대시보드</h1>
        <p className="text-gray-300">시스템 전체 현황을 확인할 수 있습니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-300" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {stats.totalUsers}
              </div>
              <div className="text-sm text-gray-300">전체 사용자</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-purple-300" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {stats.totalQnAs}
              </div>
              <div className="text-sm text-gray-300">Q&A</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-green-300" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {stats.totalResources}
              </div>
              <div className="text-sm text-gray-300">자료실</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-orange-300" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {stats.totalNotices}
              </div>
              <div className="text-sm text-gray-300">공지사항</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 빠른 링크 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">빠른 관리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/notice"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
          >
            <div className="text-white font-medium">공지사항</div>
          </a>
          <a
            href="/admin/qna"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
          >
            <div className="text-white font-medium">Q&A 관리</div>
          </a>
          <a
            href="/admin/free"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
          >
            <div className="text-white font-medium">자유게시판</div>
          </a>
          <a
            href="/admin/resources"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
          >
            <div className="text-white font-medium">자료실 관리</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
