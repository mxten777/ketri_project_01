import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardStats } from "../../services/statsService";

const AdminDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState({
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
        <p className="text-gray-300">공지사항을 관리합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          {/* 배경 패턴 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-blue-100 text-sm font-medium mb-2 uppercase tracking-wide">
                Total Notices
              </div>
              <div className="text-6xl font-black text-white mb-1 leading-none">
                {stats.totalNotices}
              </div>
              <div className="text-lg text-blue-50 font-medium">공지사항</div>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Bell className="w-10 h-10 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 빠른 링크 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">공지사항 관리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="p-5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl bg-opacity-20 transition-all border border-blue-400/30 flex flex-col items-center text-center gap-3"
          >
            <Bell className="w-10 h-10 text-blue-300" />
            <div>
              <div className="text-white font-bold text-lg whitespace-nowrap">공지사항 목록</div>
              <div className="text-gray-300 text-sm mt-1">전체 공지 확인</div>
            </div>
          </div>
          <a
            className="p-5 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl bg-opacity-20 transition-all border border-green-400/30 flex flex-col items-center text-center gap-3"
          >
            <Plus className="w-10 h-10 text-green-300" />
            <div>
              <div className="text-white font-bold text-lg whitespace-nowrap">새 공지 작성</div>
              <div className="text-gray-300 text-sm mt-1">공지 등록</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
