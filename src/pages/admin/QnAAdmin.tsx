import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  MessageSquare,
  Eye,
  User,
  Calendar,
  Filter,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getQnAs, deleteQna, toggleAnswered } from "../../services/qnaService";
import type { QnA } from "../../types";

const QnAAdmin = () => {
  const { user, userData, isAdmin } = useAuth();
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "answered" | "pending">("all");

  const fetchQnAs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQnAs();

      let filteredData = data;
      if (filter === "answered") {
        filteredData = data.filter((qna) => qna.answeredAt);
      } else if (filter === "pending") {
        filteredData = data.filter((qna) => !qna.answeredAt);
      }

      setQnas(filteredData);
    } catch (error) {
      console.error("Error fetching QnAs:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      return;
    }
    fetchQnAs();
  }, [userData, fetchQnAs]);

  const handleToggleAnswered = async (qnaId: string, hasAnswer: boolean) => {
    try {
      await toggleAnswered(qnaId, !hasAnswer);
      fetchQnAs(); // 목록 새로고침
    } catch (error) {
      console.error("Error toggling answered status:", error);
      alert("답변 상태 변경에 실패했습니다.");
    }
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteQna(qnaId);
      fetchQnAs(); // 목록 새로고침
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting QnA:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatDate = (
    timestamp: { seconds: number; nanoseconds: number } | null
  ) => {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user || !isAdmin) {
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
            <MessageSquare className="w-12 h-12 text-red-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">
            접근 권한이 없습니다
          </h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            관리자만 접근할 수 있는 페이지입니다.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 애니메이션 배경 */}
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto p-6 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              QnA 관리
            </h1>
            <p className="text-gray-300 mt-1">
              고객 문의사항을 관리하고 답변할 수 있습니다.
            </p>
          </div>

          {/* 필터 */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-300" />
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "answered" | "pending")
              }
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-slate-800">
                전체
              </option>
              <option value="pending" className="bg-slate-800">
                미답변
              </option>
              <option value="answered" className="bg-slate-800">
                답변완료
              </option>
            </select>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center shadow-lg"
              >
                <MessageSquare className="w-7 h-7 text-blue-300" />
              </motion.div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.length}
                </div>
                <div className="text-sm text-gray-300">전체 문의</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 bg-orange-500/30 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Clock className="w-7 h-7 text-orange-300" />
              </motion.div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.filter((q) => !q.answeredAt).length}
                </div>
                <div className="text-sm text-gray-300">미답변</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg"
              >
                <CheckCircle className="w-7 h-7 text-green-300" />
              </motion.div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.filter((q) => q.answeredAt).length}
                </div>
                <div className="text-sm text-gray-300">답변완료</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QnA 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              로딩 중...
            </p>
          </div>
        ) : qnas.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">
              문의가 없습니다.
            </p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">제목</th>
                    <th className="text-left py-4 px-6 font-semibold">
                      작성자
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">
                      카테고리
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      상태
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      조회수
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">
                      작성일
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {qnas.map((qna) => (
                    <tr
                      key={qna.id}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1 mb-1 text-white">
                              {qna.title}
                            </h3>
                            {qna.isSecret && (
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                                비밀글
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-200">
                            {qna.authorName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                          {qna.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() =>
                            handleToggleAnswered(qna.id, !!qna.answeredAt)
                          }
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            qna.answeredAt
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200"
                          }`}
                        >
                          {qna.answeredAt ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              답변완료
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              미답변
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-200">
                            {qna.views || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <Calendar className="w-4 h-4" />
                          {qna.createdAt instanceof Date
                            ? formatDate({
                                seconds: qna.createdAt.getTime() / 1000,
                                nanoseconds: 0,
                              })
                            : formatDate(
                                qna.createdAt as {
                                  seconds: number;
                                  nanoseconds: number;
                                }
                              )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() =>
                              window.open(`/board/qna/${qna.id}`, "_blank")
                            }
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                            title="상세보기"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQnA(qna.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QnAAdmin;
