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
import { formatFirebaseTimestamp } from "../../utils/dateUtils";
import type { QnA } from "../../types";

import Button from "../../components/common/Button";

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
      console.error("QnA 조회 실패:", error);
      alert("QnA 목록을 불러오는데 실패했습니다.");
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
      // 목록 새로고침
      await fetchQnAs();
    } catch (error) {
      console.error("답변 상태 변경 실패:", error);
      alert("답변 상태 변경에 실패했습니다.");
    }
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteQna(qnaId);
      setQnas((prev) => prev.filter((qna) => qna.id !== qnaId));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("QnA 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!user || !isAdmin) {
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
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              QnA 관리
            </h2>
            <p className="text-gray-300">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-blue-300" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.length}
                </div>
                <div className="text-sm text-gray-300">전체 문의</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500/30 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-orange-300" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.filter((q) => !q.answeredAt).length}
                </div>
                <div className="text-sm text-gray-300">미답변</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-300" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {qnas.filter((q) => q.answeredAt).length}
                </div>
                <div className="text-sm text-gray-300">답변완료</div>
              </div>
            </div>
          </div>
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
                            ? formatFirebaseTimestamp({
                                seconds: qna.createdAt.getTime() / 1000,
                                nanoseconds: 0,
                              })
                            : formatFirebaseTimestamp(
                                qna.createdAt as {
                                  seconds: number;
                                  nanoseconds: number;
                                }
                              )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              window.open(`/board/qna/${qna.id}`, "_blank")
                            }
                            className="px-3 py-1.5 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-all duration-200 flex items-center gap-1"
                            title="답변하기"
                          >
                            <MessageSquare className="w-4 h-4" />
                            답변
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
