import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Pin } from "lucide-react";
import { getNotices, deleteNotice } from "../../services/noticeService";
import { useAuth } from "../../contexts/AuthContext.core";
import { formatDateOnly } from "../../utils/dateUtils";
import type { Notice } from "../../types";
import Button from "../../components/common/Button";

const NoticeAdmin = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { userData } = useAuth();
  const navigate = useNavigate();

  // 관리자 권한 확인 및 데이터 로드
  useEffect(() => {
    if (userData?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchNotices();
  }, [userData, navigate]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getNotices(50);
      setNotices(data);
    } catch (error: unknown) {
      // error logging removed
      const message = error instanceof Error ? error.message : String(error);
      setError(message || "공지사항을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 이 회사소식을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteNotice(id);
      setNotices((prev) => prev.filter((notice) => notice.id !== id));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={fetchNotices}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.18] backdrop-blur-md rounded-3xl shadow-2xl border border-white/25 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              📢 회사소식 관리
            </h2>
            <p className="text-white/85">
              총 {notices.length}개의 소식이 등록되어 있습니다
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/notice/create")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            새 소식 작성
          </Button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="p-6">
            {notices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">등록된 소식이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-slate-700/60 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-primary-400/60 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* 상단 배지 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-500/30 text-blue-200 font-semibold">
                          {notice.category}
                        </span>
                        {notice.isPinned && (
                          <Pin className="w-4 h-4 text-amber-400" />
                        )}
                      </div>

                      {/* 제목 */}
                      <h3
                        className="text-lg font-semibold text-white mb-3 line-clamp-2 hover:text-blue-300 cursor-pointer transition-colors flex-grow"
                        onClick={() => navigate(`/board/notice/${notice.id}`)}
                      >
                        {notice.title}
                      </h3>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-white/70 mb-4 line-clamp-3">
                        {notice.content ? notice.content.replace(/<[^>]*>/g, '').substring(0, 100) : ''}
                      </p>

                      {/* 통계 및 날짜 */}
                      <div className="flex items-center justify-between text-xs text-white/65 mb-4 pb-4 border-b border-white/15">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {notice.views || 0}
                        </span>
                        <span>{formatDateOnly(notice.createdAt.toString())}</span>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex items-center gap-2 mt-auto">
                        <button
                          onClick={() => navigate(`/admin/notice/edit/${notice.id}`)}
                          className="flex-1 py-2.5 px-3 text-blue-200 hover:text-white font-medium hover:bg-blue-500/20 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-blue-400/30 hover:border-blue-400/60"
                        >
                          <Edit className="w-4 h-4" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id!)}
                          className="flex-1 py-2.5 px-3 text-red-200 hover:text-white font-medium hover:bg-red-500/20 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-red-400/30 hover:border-red-400/60"
                        >
                          <Trash2 className="w-4 h-4" />
                          삭제
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
  );
};

export default NoticeAdmin;
