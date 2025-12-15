import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  FileText,
  MessageSquare,
  FolderOpen,
  Clock,
  TrendingUp,
  CheckCircle,
  Calendar,
  User,
  Loader2,
} from "lucide-react";
import {
  searchAll,
  searchByType,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches,
  removeRecentSearch,
  SearchResult,
} from "../../services/searchService";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "notice" | "qna" | "resource">(
    "all"
  );
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 타입별 아이콘 및 라벨
  const typeConfig = {
    notice: {
      icon: FileText,
      label: "공지사항",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    qna: {
      icon: MessageSquare,
      label: "Q&A",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    resource: {
      icon: FolderOpen,
      label: "자료실",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  };

  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 최근 검색어 로드
      setRecentSearches(getRecentSearches());
      setShowRecent(true);
      setSearchTerm("");
      setResults([]);
      // 포커스
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    // 검색어 변경 시 자동 검색 (디바운스)
    if (searchTerm.trim().length < 2) {
      setResults([]);
      setShowRecent(true);
      return;
    }

    setShowRecent(false);
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filter]);

  const handleSearch = async () => {
    if (searchTerm.trim().length < 2) {
      return;
    }

    try {
      setLoading(true);
      let searchResults: SearchResult[] = [];

      if (filter === "all") {
        searchResults = await searchAll(searchTerm);
      } else {
        searchResults = await searchByType(searchTerm, filter);
      }

      setResults(searchResults);
    } catch (error) {
      console.error("검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // 최근 검색어 저장
    saveRecentSearch(searchTerm);

    // 페이지 이동
    let path = "";
    if (result.type === "notice") {
      path = `/board/notice/${result.id}`;
    } else if (result.type === "qna") {
      path = `/board/qna/${result.id}`;
    } else if (result.type === "resource") {
      path = `/board/resources`;
    }

    navigate(path);
    onClose();
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    setShowRecent(false);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleRemoveRecent = (term: string) => {
    removeRecentSearch(term);
    setRecentSearches(getRecentSearches());
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-900/50 text-neutral-900 dark:text-white px-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const formatDate = (
    date: Date | { toDate: () => Date } | string | undefined
  ) => {
    if (!date) return "";
    const d =
      typeof date === "object" && "toDate" in date
        ? date.toDate()
        : new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    return d.toLocaleDateString("ko-KR");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>

          {/* Search Input */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="공지사항, Q&A, 자료실 검색..."
                className="w-full pl-12 pr-12 py-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 
                         rounded-xl text-lg text-neutral-900 dark:text-white placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter("notice")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  filter === "notice"
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
              >
                <FileText className="w-4 h-4" />
                공지사항
              </button>
              <button
                onClick={() => setFilter("qna")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  filter === "qna"
                    ? "bg-purple-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Q&A
              </button>
              <button
                onClick={() => setFilter("resource")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  filter === "resource"
                    ? "bg-green-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                자료실
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
              </div>
            ) : showRecent && recentSearches.length > 0 ? (
              /* 최근 검색어 */
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      최근 검색어
                    </h3>
                  </div>
                  <button
                    onClick={handleClearRecent}
                    className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    전체 삭제
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-lg group"
                    >
                      <button
                        onClick={() => handleRecentSearchClick(term)}
                        className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {term}
                      </button>
                      <button
                        onClick={() => handleRemoveRecent(term)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              /* 검색 결과 */
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {results.map((result, index) => {
                  const config = typeConfig[result.type];
                  const Icon = config.icon;

                  return (
                    <motion.button
                      key={`${result.type}-${result.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${config.bgColor}`}
                        >
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-medium ${config.color}`}
                            >
                              {config.label}
                            </span>
                            {result.type === "qna" && result.isAnswered && (
                              <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle className="w-3 h-3" />
                                답변완료
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-1">
                            {highlightText(result.title, searchTerm)}
                          </h3>
                          {result.excerpt && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
                              {highlightText(result.excerpt, searchTerm)}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {result.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(result.createdAt)}
                            </span>
                            {result.category && (
                              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded">
                                {result.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : searchTerm.trim().length >= 2 ? (
              /* 검색 결과 없음 */
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-full mb-4">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-center mb-2">
                  '<span className="font-semibold">{searchTerm}</span>'에 대한
                  검색 결과가 없습니다
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center">
                  다른 검색어를 입력해 보세요
                </p>
              </div>
            ) : (
              /* 검색어 입력 안내 */
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-center mb-2">
                  검색어를 입력하세요
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center">
                  공지사항, Q&A, 자료실을 통합 검색할 수 있습니다
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                총{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {results.length}
                </span>
                개의 검색 결과
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
