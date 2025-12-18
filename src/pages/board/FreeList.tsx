import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MessageSquare,
  Heart,
  Eye,
  Pin,
} from "lucide-react";
import Button from "../../components/common/Button";
import { getFreePosts } from "../../services/freeService";
import type { FreePost } from "../../types";

const FreeList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FreePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "전체" },
    { value: "general", label: "자유" },
    { value: "tip", label: "팁" },
    { value: "review", label: "후기" },
    { value: "question", label: "질문" },
    { value: "discussion", label: "토론" },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getFreePosts();
      setPosts(data);
    } catch (error) {
      console.error("게시글 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white shadow-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-start"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4">💬 자유게시판</h1>
                <p className="text-xl opacity-90">
                  자유롭게 의견을 나누는 공간입니다
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => navigate("/board/free/new")}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all px-6 py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  게시글 등록하기
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* 필터 및 검색 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-premium border border-white/20 dark:border-neutral-700/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  검색
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="제목 또는 내용으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 게시글 목록 - 그리드 카드 레이아웃 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-premium">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  게시글이 없습니다
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/board/free/${post.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-premium border border-white/20 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                      {/* 카테고리 & 핀 */}
                      <div className="flex items-center gap-2 mb-3">
                        {post.isPinned && (
                          <Pin className="w-4 h-4 text-primary-500" />
                        )}
                        <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white font-medium shadow-sm">
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>

                      {/* 제목 */}
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 flex-1">
                        {post.content.replace(/<[^>]*>/g, '')}
                      </p>

                      {/* 하단 정보 */}
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                          <span className="font-medium">{post.authorName}</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreeList;
