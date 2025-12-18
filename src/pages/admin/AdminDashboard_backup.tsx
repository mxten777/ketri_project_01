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
      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 group cursor-pointer border border-white/10"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 10 }}
        className={`p-2 rounded-lg ${bg} group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon className={`w-4 h-4 ${color}`} />
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${bg} ${color}`}
          >
            {label}
          </span>
        </div>
        <p className="text-sm font-medium text-white truncate mt-1">
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
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            접근 권한이 없습니다
          </h2>
          <p className="text-gray-300 mb-6">
            관리자만 접근할 수 있는 페이지입니다.
          </p>
          <button
            onClick={() => window.location.href = "/"}
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
      {/* 대시보드 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PremiumStatsCard
          title="전체 사용자"
          value={stats.totalUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md border-blue-400/30"
          delay={0}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
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
      title: "공지사항 관리",
      description: "공지사항 작성 및 관리",
      icon: Bell,
      color: "from-blue-500 to-blue-600",
      path: "/admin/notices",
    },
    {
      title: "질문답변 관리",
      description: "Q&A 게시글 관리",
      icon: MessageSquare,
      color: "from-indigo-500 to-indigo-600",
      path: "/admin/qna",
    },
    {
      title: "자유게시판 관리",
      description: "자유 게시글 관리",
      icon: FileText,
      color: "from-green-500 to-green-600",
      path: "/admin/free",
    },
    {
      title: "자료실 관리",
      description: "파일 및 자료 관리",
      icon: Database,
      color: "from-orange-500 to-orange-600",
      path: "/admin/resources",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 애니메이션 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

      {/* 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* 배경 패턴 */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
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
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-1">
                  관리자 대시보드
                </h1>
                <p className="text-gray-300">
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
              className="flex items-center space-x-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              <RefreshCw
                className={`w-5 h-5 text-white ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              <span className="text-sm font-medium text-white">새로고침</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">알림</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-yellow-400 rounded-full"
              ></motion.div>
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
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Activity className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">최근 활동</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
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
                    <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">최근 활동이 없습니다</p>
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
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Cpu className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white">시스템 상태</h3>
                </div>

                <div className="space-y-4">
                  {systemHealth.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 border border-white/10"
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
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.color === "green"
                              ? "bg-green-400 shadow-lg shadow-green-400/50"
                              : item.color === "yellow"
                              ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                              : "bg-red-400 shadow-lg shadow-red-400/50"
                          }`}
                        ></motion.div>
                        <span
                          className={`text-xs font-medium ${
                            item.color === "green"
                              ? "text-green-300"
                              : item.color === "yellow"
                              ? "text-yellow-300"
                              : "text-red-300"
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
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white">빠른 작업</h3>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = action.path)}
                      className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 text-left group border border-white/10"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2.5 rounded-lg bg-gradient-to-br ${action.color} shadow-lg`}
                      >
                        <action.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">
                          {action.title}
                        </div>
                        <div className="text-xs text-gray-300">
                          {action.description}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
