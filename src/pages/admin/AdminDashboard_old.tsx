import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  getDashboardStats, 
  getRecentActivities, 
  getUserStats,
  getMonthlyActivityStats,
  type DashboardStats,
  type RecentActivity,
  type UserStats 
} from '../../services/statsService';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const AdminDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  // 관리자 권한 확인
  if (!user || userData?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            접근 권한이 없습니다
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            관리자만 대시보드에 접근할 수 있습니다.
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            이전 페이지로
          </Button>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          dashboardStats,
          userStatsData,
          recentActivities,
          monthlyStats,
        ] = await Promise.all([
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
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'qna':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'resource':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'user':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'notice':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'qna':
        return 'QnA';
      case 'resource':
        return '자료';
      case 'user':
        return '사용자';
      case 'notice':
        return '공지';
      default:
        return '활동';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <motion.div
          className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {error}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            다시 시도
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 p-6"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            관리자 대시보드
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            시스템 전체 현황과 최근 활동을 확인하세요
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Clock className="w-4 h-4" />
          마지막 업데이트: {new Date().toLocaleString('ko-KR')}
        </div>
      </div>

      {/* 주요 통계 카드 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    총 사용자
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    +{stats.recentUsers} (7일)
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    QnA 게시글
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {stats.totalQnAs.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    +{stats.recentQnAs} (7일)
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    자료실 파일
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {stats.totalResources.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3" />
                    +{stats.recentResources} (7일)
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    총 다운로드
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {stats.totalDownloads.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center gap-1 mt-2">
                    <BarChart3 className="w-3 h-3" />
                    답변율 {stats.answerRate}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 사용자 상세 통계 */}
        {userStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  사용자 현황
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">전체 사용자</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {userStats.totalUsers.toLocaleString()}명
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">활성 사용자 (30일)</span>
                  <span className="font-semibold text-green-600">
                    {userStats.activeUsers.toLocaleString()}명
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">관리자</span>
                  <span className="font-semibold text-blue-600">
                    {userStats.adminUsers.toLocaleString()}명
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">신규 가입 (30일)</span>
                  <span className="font-semibold text-purple-600">
                    {userStats.recentRegistrations.toLocaleString()}명
                  </span>
                </div>
              </div>

              {userStats.totalUsers > 0 && (
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">활성화율</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* 최근 활동 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                최근 활동
              </h3>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase">
                          {getActivityTypeLabel(activity.type)}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500">
                          {formatDistanceToNow(activity.createdAt, { 
                            addSuffix: true,
                            locale: ko 
                          })}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        작성자: {activity.author}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-500 dark:text-neutral-400">
                    최근 활동이 없습니다
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 월별 활동 차트 영역 - 추후 차트 라이브러리 추가 시 구현 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              월별 활동 통계
            </h3>
          </div>
          
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">
              차트 라이브러리 연동 예정
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-500">
              Chart.js 또는 Recharts를 사용하여 시각화 구현
            </p>
          </div>
        </Card>
      </motion.div>

      {/* 빠른 작업 링크 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            빠른 작업
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => window.open('/admin/users', '_blank')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-sm">사용자 관리</span>
            </Button>
            
            <Button
              onClick={() => window.open('/board/qnas', '_blank')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <MessageSquare className="w-6 h-6 text-green-600" />
              <span className="text-sm">QnA 관리</span>
            </Button>
            
            <Button
              onClick={() => window.open('/board/resources', '_blank')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <FileText className="w-6 h-6 text-purple-600" />
              <span className="text-sm">자료실 관리</span>
            </Button>
            
            <Button
              onClick={() => window.open('/admin/content', '_blank')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-sm">컨텐츠 관리</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Button
              onClick={() => window.open('/admin/settings', '_blank')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="text-sm">시스템 설정</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;