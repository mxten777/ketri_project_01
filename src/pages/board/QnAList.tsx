import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  Lock,
  Pin,
  Eye,
} from "lucide-react";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext.core";
import { getQnAs } from "../../services/qnaService";
import type { QnA } from "../../types";

const QnAList = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [qnaList, setQnAList] = useState<QnA[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "views">("latest");

  const categories = [
    { value: "all", label: "전체" },
    { value: "general", label: "일반문의" },
    { value: "service", label: "서비스문의" },
    { value: "technical", label: "기술문의" },
    { value: "account", label: "계정문의" },
    { value: "complaint", label: "불만신고" },
  ];

  useEffect(() => {
    fetchQnAList();
  }, []);

  const fetchQnAList = async () => {
    try {
      setLoading(true);
      const data = await getQnAs();
      setQnAList(data);
    } catch (error) {
      // error logging removed
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 QnA 목록
  const filteredQnAs = qnaList.filter((qna) => {
    const matchesSearch =
      qna.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qna.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || qna.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || qna.status === selectedStatus;

    // 비밀글 필터링 (작성자 본인과 관리자만 볼 수 있음)
    const canViewSecret =
      !qna.isSecret || qna.authorId === user?.uid || userData?.role === "admin";

    return matchesSearch && matchesCategory && matchesStatus && canViewSecret;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            답변대기
          </span>
        );
      case "answered":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            답변완료
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            종료
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return "";
    try {
      const tsObj = timestamp as unknown;
      let date: Date;
      if (tsObj && typeof ((tsObj as { toDate?: unknown }).toDate) === "function") {
        date = ((tsObj as { toDate: () => Date }).toDate)();
      } else {
        date = new Date(String(timestamp));
      }
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
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/20">
      <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
        <div className="container mx-auto px-4">
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
                <h1 className="text-4xl font-bold mb-4">❓ QnA 게시판</h1>
                <p className="text-xl opacity-90">
                  궁금한 점이 있으시면 언제든 질문해 주세요
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => {}}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all px-6 py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  질문 등록하기
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 카테고리 필터 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 상태 필터 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  상태
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">전체</option>
                  <option value="pending">답변대기</option>
                  <option value="answered">답변완료</option>
                  <option value="closed">종료</option>
                </select>
              </div>

              {/* 정렬 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  정렬
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "latest" | "oldest" | "views")
                  }
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="views">조회수순</option>
                </select>
              </div>

              {/* 검색 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  검색
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="제목으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 게시글 목록 - 그리드 카드 레이아웃 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {loading ? (
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-premium border border-white/20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 animate-pulse"></div>
                </div>
                <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
                  로딩 중...
                </p>
              </div>
            ) : filteredQnAs.length === 0 ? (
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-premium border border-white/20">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  질문이 없습니다
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  처음 질문을 남겨보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredQnAs.map((qna, index) => (
                    <motion.div
                      key={qna.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => {}}
                      className="cursor-pointer group"
                    >
                      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 h-full shadow-premium border border-white/50 dark:border-neutral-700/50 hover:shadow-2xl hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 flex flex-col">
                        {/* 상단 배지 및 상태 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {qna.isPinned && (
                              <Pin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                            )}
                            {qna.isSecret && (
                              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            )}
                            <span className="px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                              {getCategoryLabel(qna.category)}
                            </span>
                          </div>
                          {getStatusBadge(qna.status)}
                        </div>

                        {/* 제목 */}
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 flex-grow">
                          {qna.title}
                        </h3>

                        {/* 내용 미리보기 */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                          {qna.content.replace(/<[^>]*>/g, '')}
                        </p>

                        {/* 답변 미리보기 */}
                        {qna.status === "answered" && qna.answerContent && (
                          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-xs font-medium text-green-800 dark:text-green-400">
                                관리자 답변
                              </span>
                            </div>
                            <p className="text-xs text-green-700 dark:text-green-300 line-clamp-2">
                              {qna.answerContent}
                            </p>
                          </div>
                        )}

                        {/* 하단 정보 */}
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                            <span className="font-medium">{qna.authorName}</span>
                            <span>{formatDate(qna.createdAt)}</span>
                          </div>
                          {qna.views && qna.views > 0 && (
                            <div className="flex items-center gap-1 text-xs text-neutral-400">
                              <Eye className="w-3 h-3" />
                              <span>{qna.views} 조회</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* 로그인 안내 */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-l-4 border-blue-500 shadow-premium"
            >
              <p className="text-neutral-700 dark:text-neutral-300">
                💡 질문을 등록하시려면{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  로그인
                </button>
                이 필요합니다.
              </p>
            </motion.div>
          )}
        </motion.div>
        </div>
      </section>
    </main>
  );
};

export default QnAList;
