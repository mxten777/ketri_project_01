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
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPermissionGuard from "../../components/admin/AdminPermissionGuard";
import StatsCard from "../../components/admin/StatsCard";
import { useAuth } from "../../contexts/AuthContext";
import { getQnAs, deleteQna, toggleAnswered } from "../../services/qnaService";
import type { QnA } from "../../types";

const QnAAdmin = () => {
  const { userData } = useAuth();
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
    if (!userData || userData.role !== "admin") return;
    fetchQnAs();
  }, [userData, fetchQnAs]);

  const handleToggleAnswered = async (qnaId: string, isAnswered: boolean) => {
    try {
      await toggleAnswered(qnaId, !isAnswered);
      fetchQnAs();
    } catch (error) {
      console.error("Error toggling answered status:", error);
      alert("답변 상태 변경에 실패했습니다.");
    }
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteQna(qnaId);
      fetchQnAs();
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting QnA:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatDate = (
    timestamp: { seconds: number; nanoseconds: number } | Date | null
  ) => {
    if (!timestamp) return "";
    const date =
      timestamp instanceof Date
        ? timestamp
        : new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const answeredCount = qnas.filter((q) => q.answeredAt).length;
  const pendingCount = qnas.filter((q) => !q.answeredAt).length;

  return (
    <AdminPermissionGuard>
      <AdminLayout
        title="Q&A 관리"
        description="고객 문의사항을 관리하고 답변할 수 있습니다"
        actions={
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
        }
      >
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="전체 문의"
            value={qnas.length}
            icon={MessageSquare}
            gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/20"
            delay={0.1}
          />
          <StatsCard
            title="미답변"
            value={pendingCount}
            icon={Clock}
            gradient="bg-gradient-to-br from-orange-500/20 to-orange-600/20"
            delay={0.15}
          />
          <StatsCard
            title="답변완료"
            value={answeredCount}
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-green-500/20 to-green-600/20"
            delay={0.2}
          />
        </div>

        {/* Q&A 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300">로딩 중...</p>
          </div>
        ) : qnas.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-300">문의가 없습니다.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-white">
                      제목
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-white">
                      작성자
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-white">
                      카테고리
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-white">
                      상태
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-white">
                      조회수
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-white">
                      작성일
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-white">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
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
                          {formatDate(qna.createdAt)}
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
          </motion.div>
        )}
      </AdminLayout>
    </AdminPermissionGuard>
  );
};

export default QnAAdmin;
