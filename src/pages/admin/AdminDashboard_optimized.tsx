import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  FileText,
  Download,
  Activity,
  RefreshCw,
  Bell,
  Filter,
  ChevronRight,
  Cpu,
  Zap,
  Database,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPermissionGuard from "../../components/admin/AdminPermissionGuard";
import StatsCard from "../../components/admin/StatsCard";
import AdminButton from "../../components/admin/AdminButton";
import {
  getDashboardStats,
  getRecentActivities,
  type DashboardStats,
  type RecentActivity,
} from "../../services/statsService";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardStats, recentActivities] = await Promise.all([
        getDashboardStats(),
        getRecentActivities(8),
      ]);
      setStats(dashboardStats);
      setActivities(recentActivities);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const quickActions = [
    {
      title: "사용자 관리",
      description: "회원 정보 및 권한 관리",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      path: "/admin/users",
    },
    {
      title: "컨텐츠 관리",
      description: "공지사항 및 페이지 관리",
      icon: FileText,
      color: "from-green-500 to-green-600",
      path: "/admin/content",
    },
    {
      title: "Q&A 관리",
      description: "문의사항 답변 및 관리",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      path: "/admin/qna",
    },
    {
      title: "파일 관리",
      description: "업로드 파일 및 자료실",
      icon: Database,
      color: "from-orange-500 to-orange-600",
      path: "/admin/files",
    },
  ];

  const systemHealth = [
    { label: "서버 상태", status: "정상", color: "green" },
    { label: "데이터베이스", status: "정상", color: "green" },
    { label: "스토리지", status: "양호", color: "yellow" },
    { label: "보안", status: "안전", color: "green" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6 shadow-lg shadow-purple-500/50"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-medium text-lg"
          >
            관리자 대시보드를 불러오는 중...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminPermissionGuard>
      <AdminLayout
        title="관리자 대시보드"
        description="시스템 통계 및 최근 활동을 확인하세요"
        actions={
          <>
            <AdminButton
              icon={RefreshCw}
              onClick={handleRefresh}
              disabled={refreshing}
              variant="secondary"
            >
              새로고침
            </AdminButton>
            <AdminButton icon={Bell} variant="primary">
              알림
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-yellow-400 rounded-full ml-1"
              ></motion.div>
            </AdminButton>
          </>
        }
      >
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="전체 사용자"
            value={stats?.totalUsers || 0}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/20"
            delay={0}
          />
          <StatsCard
            title="Q&A 문의"
            value={stats?.totalQnAs || 0}
            icon={MessageSquare}
            gradient="bg-gradient-to-br from-green-500/20 to-green-600/20"
            delay={0.1}
          />
          <StatsCard
            title="자료실"
            value={stats?.totalResources || 0}
            icon={FileText}
            gradient="bg-gradient-to-br from-purple-500/20 to-purple-600/20"
            delay={0.2}
          />
          <StatsCard
            title="다운로드"
            value={stats?.totalDownloads || 0}
            icon={Download}
            gradient="bg-gradient-to-br from-orange-500/20 to-red-500/20"
            delay={0.3}
          />
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 최근 활동 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">최근 활동</h3>
                  </div>
                  <AdminButton variant="ghost" icon={Filter}>
                    필터
                  </AdminButton>
                </div>
              </div>

              <div className="p-6">
                {activities.length > 0 ? (
                  <div className="space-y-2">
                    {activities.slice(0, 6).map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 group cursor-pointer border border-white/10"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-300">
                            {activity.author} •{" "}
                            {formatDistanceToNow(activity.createdAt, {
                              addSuffix: true,
                              locale: ko,
                            })}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">최근 활동이 없습니다</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 시스템 상태 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Cpu className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">시스템 상태</h3>
              </div>
              <div className="space-y-3">
                {systemHealth.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-sm font-medium text-gray-200">
                      {item.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={
                          item.color === "green" ? { scale: [1, 1.2, 1] } : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${
                          item.color === "green"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      ></motion.div>
                      <span
                        className={`text-xs font-medium ${
                          item.color === "green"
                            ? "text-green-300"
                            : "text-yellow-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 빠른 작업 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">빠른 작업</h3>
              </div>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (window.location.href = action.path)}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-left group border border-white/10"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${action.color} shadow-lg`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">
                        {action.title}
                      </div>
                      <div className="text-xs text-gray-300">
                        {action.description}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AdminLayout>
    </AdminPermissionGuard>
  );
};

export default AdminDashboard;
