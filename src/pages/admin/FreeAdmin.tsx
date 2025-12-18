import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Heart } from "lucide-react";
import { getFreePosts, deleteFreePost } from "../../services/freeService";
import { useAuth } from "../../contexts/AuthContext";
import type { FreePost } from "../../types";

const FreeAdmin = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [posts, setPosts] = useState<FreePost[]>([]);
  const [loading, setLoading] = useState(true);

  // 관리자 권한 확인 및 데이터 로드
  useEffect(() => {
    if (userData?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchPosts();
  }, [userData, navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log("FreeAdmin: Fetching posts...");
      const data = await getFreePosts();
      console.log("FreeAdmin: Received posts:", data);
      setPosts(data.slice(0, 50)); // 최근 50개만
    } catch (error: any) {
      console.error("게시글 조회 실패:", error);
      alert(`게시글을 불러오는데 실패했습니다.\n${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteFreePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatDate = (timestamp: { toDate?: () => Date } | Date | null | undefined): string => {
    if (!timestamp) return "";
    try {
      const date = typeof timestamp === 'object' && 'toDate' in timestamp && timestamp.toDate ? timestamp.toDate() : new Date(timestamp as Date);
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    } catch (error) {
      return "";
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      general: "자유",
      tip: "팁",
      review: "후기",
      question: "질문",
      discussion: "토론",
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              💬 자유게시판 관리
            </h2>
              <p className="text-gray-300">
                총 {posts.length}개의 게시글이 등록되어 있습니다
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">등록된 게시글이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-primary-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* 카테고리 */}
                    <div className="mb-3">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 font-medium">
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3
                      className="text-lg font-bold text-white mb-3 line-clamp-2 hover:text-blue-400 cursor-pointer transition-colors flex-grow"
                      onClick={() => navigate(`/board/free/${post.id}`)}
                    >
                      {post.title}
                    </h3>

                    {/* 내용 미리보기 */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                    </p>

                    {/* 통계 */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-white/10">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes || 0}
                      </span>
                    </div>

                    {/* 작성자 및 날짜 */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{post.authorName}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => navigate(`/board/free/edit/${post.id}`)}
                        className="flex-1 p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(post.id!)}
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
  );
};

export default FreeAdmin;
