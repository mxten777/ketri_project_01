import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  MessageSquare,
  Download,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  getStatistics,
  getRecentUsers,
  getRecentNotices,
  getRecentQnA,
  getMonthlyUserStats,
  getAnswerRate,
} from '../../services/statsService';
import type { User } from '../../types';

interface Statistics {
  totalUsers: number;
  totalNotices: number;
  totalQna: number;
  totalDownloads: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

interface AnswerRateData {
  total: number;
  answered: number;
  rate: number;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Statistics>({
    totalUsers: 0,
    totalNotices: 0,
    totalQna: 0,
    totalDownloads: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentNotices, setRecentNotices] = useState<any[]>([]);
  const [recentQnA, setRecentQnA] = useState<any[]>([]);
  const [monthlyUsers, setMonthlyUsers] = useState<MonthlyData[]>([]);
  const [answerRate, setAnswerRate] = useState<AnswerRateData>({
    total: 0,
    answered: 0,
    rate: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 병렬로 모든 데이터 가져오기
      const [
        statsData,
        usersData,
        noticesData,
        qnaData,
        monthlyData,
        answerRateData,
      ] = await Promise.all([
        getStatistics(),
        getRecentUsers(5),
        getRecentNotices(5),
        getRecentQnA(5),
        getMonthlyUserStats(),
        getAnswerRate(),
      ]);

      setStats(statsData);
      setRecentUsers(usersData);
      setRecentNotices(noticesData);
      setRecentQnA(qnaData);
      setMonthlyUsers(monthlyData);
      setAnswerRate(answerRateData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getMaxCount = () => {
    return Math.max(...monthlyUsers.map((data) => data.count), 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            관리자 대시보드
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            웹사이트 전체 현황을 한눈에 확인하세요
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">총 회원 수</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalNotices.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">공지사항</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => window.location.href = '/admin/qna'}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {answerRate.rate}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalQna.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">QnA 관리</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => window.location.href = '/admin/resources'}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Download className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalDownloads.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">자료실 관리</p>
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              월별 가입자 추이 (최근 6개월)
            </h2>
          </div>
          <div className="space-y-4">
            {monthlyUsers.map((data, index) => (
              <div key={data.month} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">
                  {data.month}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(data.count / getMaxCount()) * 100}%`,
                    }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full flex items-center justify-end pr-3"
                  >
                    {data.count > 0 && (
                      <span className="text-sm font-bold text-white">
                        {data.count}명
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                최근 가입 회원
              </h2>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  등록된 회원이 없습니다.
                </p>
              ) : (
                recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.displayName || '이름 없음'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {user.role === 'admin' ? '관리자' : '회원'}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                최근 게시물
              </h2>
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {/* Recent Notices */}
              {recentNotices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {notice.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      공지사항 · {formatDate(notice.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              {/* Recent QnA */}
              {recentQnA.slice(0, 2).map((qna) => (
                <div
                  key={qna.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                    <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {qna.title}
                      </p>
                      {qna.isAnswered ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      QnA · {formatDate(qna.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
