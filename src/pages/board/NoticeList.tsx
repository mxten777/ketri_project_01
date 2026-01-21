import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pin, Eye, Calendar, User, Home } from "lucide-react";
import { getNotices } from "../../services/noticeService";
import type { Notice } from "../../types";
import { NOTICE_HERO_COPY } from "../../constants/copy";

const NoticeList = () => {
  const navigate = useNavigate();
  
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // 페이지 진입 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const formatDate = (timestamp: unknown) => {
    try {
      let date: Date | null = null;
      const ts = timestamp as unknown;

      // Firestore Timestamp 객체 (toDate 메서드 있음)
      if (ts && typeof (ts as { toDate?: unknown }).toDate === "function") {
        date = (ts as { toDate: () => Date }).toDate();
      } 
      // Firestore Timestamp 직렬화된 형태 (seconds 필드)
      else if (ts && typeof (ts as { seconds?: unknown }).seconds === "number") {
        date = new Date((ts as { seconds: number }).seconds * 1000);
      } 
      // ISO 문자열
      else if (typeof ts === "string") {
        date = new Date(ts);
      } 
      // Date 객체
      else if (ts instanceof Date) {
        date = ts;
      }
      // null이나 undefined
      else if (!ts) {
        console.warn("formatDate: timestamp is null or undefined");
        return "날짜 없음";
      }
      // 알 수 없는 형식
      else {
        console.error("formatDate: Unknown timestamp format:", ts);
        return "날짜 없음";
      }

      // date가 생성되지 않았거나 Invalid Date인 경우
      if (!date || isNaN(date.getTime())) {
        console.error("formatDate: Invalid date created from:", ts);
        return "날짜 없음";
      }

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      console.error("Date formatting error:", error, "for timestamp:", timestamp);
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
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-neutral-900">
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
              <h1 className="text-4xl font-bold mb-4">{NOTICE_HERO_COPY.title}</h1>
              <p className="text-xl opacity-90">
                {NOTICE_HERO_COPY.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Header: 배지 + 홈 버튼 */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-between gap-4">
              {/* 좌: 전체 공지사항 배지 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full text-sm">
                <Pin className="w-4 h-4" />
                전체 공지사항 · 총 {notices.length}건
              </div>

              {/* 우: 홈으로 버튼 */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 font-medium rounded-full text-sm border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-neutral-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                홈으로
              </button>
            </div>
          </div>

          {/* Notice List */}
          <section className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {notices.length === 0 ? (
                <div className="bg-white/80 dark:bg-neutral-800 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20 dark:border-neutral-700">
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Pin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    등록된 공지사항이 없습니다.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {notices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                    <Link to={`/board/notice/${notice.id}`}>
                      <div
                        className={`bg-white/90 dark:bg-neutral-800 backdrop-blur-sm rounded-2xl p-6 shadow-premium border transition-all duration-300 hover:shadow-2xl h-full flex flex-col group ${
                          notice.isPinned
                            ? "border-primary-300 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-primary-200/50"
                            : "border-white/50 dark:border-neutral-700 hover:border-primary-300"
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
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-3">
                          {notice.content}
                        </p>

                        {/* 하단 정보 */}
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-600 mt-auto">
                          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-300 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {notice.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(notice.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-300">
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
