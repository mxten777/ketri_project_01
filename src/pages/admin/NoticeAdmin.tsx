import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Pin } from "lucide-react";
import { getNotices, deleteNotice } from "../../services/noticeService";
import { useAuth } from "../../contexts/AuthContext";
import type { Notice } from "../../types";
import Button from "../../components/common/Button";

const NoticeAdmin = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  // 관리자 권한 확인
  if (userData?.role !== "admin") {
    navigate("/");
    return null;
  }

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getNotices(50);
      setNotices(data);
    } catch (error) {
      console.error("Error loading notices:", error);
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
      setNotices(notices.filter((notice) => notice.id !== id));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  📢 회사소식 관리
                </h1>
                <p className="text-gray-300">
                  총 {notices.length}개의 소식이 등록되어 있습니다
                </p>
              </div>
              <Button
                onClick={() => navigate("/admin/notice/create")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
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
                    className="bg-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-primary-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* 상단 배지 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 font-medium">
                          {notice.category}
                        </span>
                        {notice.isPinned && (
                          <Pin className="w-4 h-4 text-amber-400" />
                        )}
                      </div>

                      {/* 제목 */}
                      <h3
                        className="text-lg font-bold text-white mb-3 line-clamp-2 hover:text-blue-400 cursor-pointer transition-colors flex-grow"
                        onClick={() => navigate(`/board/notice/${notice.id}`)}
                      >
                        {notice.title}
                      </h3>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {notice.content ? notice.content.replace(/<[^>]*>/g, '').substring(0, 100) : ''}
                      </p>

                      {/* 통계 및 날짜 */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-white/10">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {notice.views || 0}
                        </span>
                        <span>{formatDate(notice.createdAt.toString())}</span>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex items-center gap-2 mt-auto">
                        <button
                          onClick={() => navigate(`/admin/notice/edit/${notice.id}`)}
                          className="flex-1 p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id!)}
                          className="flex-1 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
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
      </div>
    </div>
  );
};

export default NoticeAdmin;
