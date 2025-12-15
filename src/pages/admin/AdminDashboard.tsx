import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MessageSquare,
  FileText,
  Download,
  TrendingUp,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Globe,
  Cpu,
  Eye,
  Bell,
  Settings,
  RefreshCw,
  Filter,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Layers,
  Database,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import {
  getDashboardStats,
  getRecentActivities,
  getUserStats,
  getMonthlyActivityStats,
  type DashboardStats,
  type RecentActivity,
  type UserStats,
} from "../../services/statsService";
import { useAuth } from "../../contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

// 프리미엄 통계 카드 컴포넌트
const PremiumStatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  gradient,
  delay = 0,
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: "up" | "down";
  trendValue?: string;
  gradient: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    className="group"
  >
    <div
      className={`relative p-6 rounded-2xl ${gradient} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>

      <div className="relative z-10">
        {/* 상단 */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend === "up"
                  ? "bg-green-500/20 text-green-100"
                  : "bg-red-500/20 text-red-100"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* 값 */}
        <div className="mb-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-bold text-white"
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </motion.div>
        </div>

        {/* 제목 */}
        <div className="text-white/80 font-medium">{title}</div>
      </div>
    </div>
  </motion.div>
);

// 프리미엄 활동 카드 컴포넌트
const PremiumActivityCard = ({
  activity,
  index,
}: {
  activity: RecentActivity;
  index: number;
}) => {
  const getActivityDetails = (type: string) => {
    switch (type) {
      case "qna":
        return {
          icon: MessageSquare,
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-900/20",
          label: "Q&A",
        };
      case "resource":
        return {
          icon: FileText,
          color: "text-green-500",
          bg: "bg-green-50 dark:bg-green-900/20",
          label: "자료실",
        };
      case "user":
        return {
          icon: Users,
          color: "text-purple-500",
          bg: "bg-purple-50 dark:bg-purple-900/20",
          label: "사용자",
        };
      default:
        return {
          icon: Activity,
          color: "text-gray-500",
          bg: "bg-gray-50 dark:bg-gray-900/20",
          label: "일반",
        };
    }
  };

  const { icon: Icon, color, bg, label } = getActivityDetails(activity.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer"
    >
      <div
        className={`p-2 rounded-lg ${bg} group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon className={`w-4 h-4 ${color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${bg} ${color}`}
          >
            {label}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate mt-1">
          {activity.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {activity.author} •{" "}
          {formatDistanceToNow(activity.createdAt, {
            addSuffix: true,
            locale: ko,
          })}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </motion.div>
  );
};

const AdminDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  // 관리자 권한 확인
  if (!user || userData?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            접근 권한이 없습니다
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            관리자 권한이 필요한 페이지입니다.
            <br />
            적절한 권한으로 다시 로그인해주세요.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl"
          >
            이전 페이지로 돌아가기
          </Button>
        </motion.div>
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashboardStats, userStatsData, recentActivities, monthlyStats] =
          await Promise.all([
            getDashboardStats(),
            getUserStats(),
            getRecentActivities(8),
            getMonthlyActivityStats(6),
          ]);

        setStats(dashboardStats);
        setUserStats(userStatsData);
        setActivities(recentActivities);
        setMonthlyData(monthlyStats);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            관리자 대시보드를 불러오는 중...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 배경 패턴 */}
      <div
        className="fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      <div className="relative z-10 p-6 space-y-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  관리자 대시보드
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  안녕하세요, {userData?.displayName || user?.email}님 👋
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <RefreshCw
                className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                새로고침
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">알림</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumStatsCard
            title="전체 사용자"
            value={stats?.totalUsers || 0}
            icon={Users}
            trend="up"
            trendValue="+12%"
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            delay={0}
          />
          <PremiumStatsCard
            title="Q&A 문의"
            value={stats?.totalQnAs || 0}
            icon={MessageSquare}
            trend="up"
            trendValue="+8%"
            gradient="bg-gradient-to-br from-green-500 to-green-600"
            delay={0.1}
          />
          <PremiumStatsCard
            title="자료실"
            value={stats?.totalResources || 0}
            icon={FileText}
            trend="up"
            trendValue="+5%"
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            delay={0.2}
          />
          <PremiumStatsCard
            title="다운로드"
            value={stats?.totalDownloads || 0}
            icon={Download}
            trend="up"
            trendValue="+24%"
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
            delay={0.3}
          />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 최근 활동 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      최근 활동
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    필터
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {activities.length > 0 ? (
                  <div className="space-y-2">
                    {activities.slice(0, 6).map((activity, index) => (
                      <PremiumActivityCard
                        key={activity.id}
                        activity={activity}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      최근 활동이 없습니다
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-8">
            {/* 시스템 상태 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Cpu className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    시스템 상태
                  </h3>
                </div>

                <div className="space-y-4">
                  {systemHealth.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.color === "green"
                              ? "bg-green-500"
                              : item.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          } ${item.color === "green" ? "animate-pulse" : ""}`}
                        ></div>
                        <span
                          className={`text-xs font-medium ${
                            item.color === "green"
                              ? "text-green-600"
                              : item.color === "yellow"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 빠른 작업 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    빠른 작업
                  </h3>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = action.path)}
                      className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 text-left group"
                    >
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}
                      >
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {action.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {action.description}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
