import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pin, Eye, Calendar, User } from "lucide-react";
import { getNotices } from "../../services/noticeService";
import type { Notice } from "../../types";

const NoticeList = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = useCallback(async () => {
    // Prevent duplicate concurrent requests
    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getNotices(20);
      setNotices(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "공지사항을 불러오는데 실패했습니다.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const formatDate = (timestamp: unknown) => {
    try {
      let date: Date | null = null;
      const ts = timestamp as unknown;

      if (ts && typeof (ts as { toDate?: unknown }).toDate === "function") {
        date = (ts as { toDate: () => Date }).toDate();
      } else if (ts && typeof (ts as { seconds?: unknown }).seconds === "number") {
        date = new Date((ts as { seconds: number }).seconds * 1000);
      } else if (typeof ts === "string") {
        date = new Date(ts);
      } else if (ts instanceof Date) {
        date = ts;
      }

      if (!date) return "날짜 없음";

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "날짜 오류";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800 mb-4">⚠️ {error}</p>
          <button
            onClick={fetchNotices}
            disabled={loading}
            className={`px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div data-has-hero className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 mb-8 text-white shadow-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4">📢 최신 공지사항</h1>
              <p className="text-xl opacity-90">
                한국환경안전연구소의 새로운 소식과 중요한 공지사항을 확인하세요
              </p>
            </motion.div>
          </div>

          {/* Notice List - 첫 Section 간격 적용 */}
          <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {notices.length === 0 ? (
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-premium border border-white/20">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Pin className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  등록된 공지사항이 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Link to={`/board/notice/${notice.id}`}>
                      <div
                        className={`bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-premium border transition-all duration-300 hover:shadow-2xl h-full flex flex-col group ${
                          notice.isPinned
                            ? "border-primary-300 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-primary-200/50"
                            : "border-white/50 dark:border-neutral-700/50 hover:border-primary-300"
                        }`}
                      >
                        {/* 상단 배지 */}
                        <div className="flex items-center gap-2 mb-4">
                          {notice.isPinned && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full shadow-sm">
                              <Pin className="w-3 h-3" />
                              고정
                            </span>
                          )}
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                            {notice.category}
                          </span>
                        </div>

                        {/* 제목 */}
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 flex-grow">
                          {notice.title}
                        </h2>

                        {/* 내용 미리보기 */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                          {notice.content.replace(/<[^>]*>/g, '')}
                        </p>

                        {/* 하단 정보 */}
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {notice.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(notice.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-neutral-400">
                            <Eye className="w-3 h-3" />
                            <span>{notice.views || 0} 조회</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default NoticeList;
