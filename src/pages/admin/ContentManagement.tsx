import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  Edit,
  Trash2,
  Archive,
  Star,
  Tag,
  User,
  Clock,
  Globe,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  Download,
  Upload,
} from "lucide-react";
import {
  contentManagementService,
  ContentItem,
  ContentFilters,
  ContentStatistics,
} from "../../services/contentManagementService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { formatDate, formatRelativeTime } from "../../utils/dateUtils";

const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [statistics, setStatistics] = useState<ContentStatistics | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<
    { tag: string; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ContentFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedContentItem, setSelectedContentItem] =
    useState<ContentItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 필터 변경 시 데이터 재로드
  useEffect(() => {
    if (!loading) {
      loadContent();
    }
  }, [filters, searchQuery]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [contentData, statsData, categoriesData, tagsData] =
        await Promise.all([
          contentManagementService.getContent({ ...filters, searchQuery }),
          contentManagementService.getContentStatistics(),
          contentManagementService.getCategories(),
          contentManagementService.getPopularTags(),
        ]);

      setContent(contentData.content);
      setHasMore(contentData.hasMore);
      setStatistics(statsData);
      setCategories(categoriesData);
      setPopularTags(tagsData);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadContent = async () => {
    try {
      const contentData = await contentManagementService.getContent({
        ...filters,
        searchQuery,
      });
      setContent(contentData.content);
      setHasMore(contentData.hasMore);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading content:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof ContentFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
    setCurrentPage(1);
  };

  const handleContentSelect = (contentId: string) => {
    setSelectedContent((prev) =>
      prev.includes(contentId)
        ? prev.filter((id) => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContent.length === content.length) {
      setSelectedContent([]);
    } else {
      setSelectedContent(content.map((item) => item.id!));
    }
  };

  const handleBulkStatusUpdate = async (
    status: "draft" | "published" | "archived"
  ) => {
    if (selectedContent.length === 0) return;

    try {
      await contentManagementService.updateContentStatus(
        selectedContent,
        status
      );
      setSelectedContent([]);
      loadContent();
      loadInitialData(); // 통계 업데이트
    } catch (error) {
      console.error("Error updating content status:", error);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      await contentManagementService.deleteContent(contentId);
      loadContent();
      loadInitialData(); // 통계 업데이트
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleEditContent = (id: string, item: ContentItem) => {
    setSelectedContentItem(item);
    setShowCreateModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "발행됨";
      case "draft":
        return "임시저장";
      case "archived":
        return "보관됨";
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "announcement":
        return "공지사항";
      case "news":
        return "뉴스";
      case "event":
        return "이벤트";
      case "notice":
        return "알림";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                컨텐츠 관리
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                웹사이트의 모든 컨텐츠를 관리하고 편집할 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />새 컨텐츠
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="flex items-center gap-2"
              >
                {viewMode === "grid" ? "목록" : "그리드"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    총 컨텐츠
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.totalContent}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    발행된 컨텐츠
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.publishedContent}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    총 조회수
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    총 좋아요
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.totalLikes.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="제목, 내용, 태그로 검색..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              필터
            </Button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    컨텐츠 유형
                  </label>
                  <select
                    value={filters.type || "all"}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value="announcement">공지사항</option>
                    <option value="news">뉴스</option>
                    <option value="event">이벤트</option>
                    <option value="notice">알림</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    카테고리
                  </label>
                  <select
                    value={filters.category || "all"}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    상태
                  </label>
                  <select
                    value={filters.status || "all"}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value="published">발행됨</option>
                    <option value="draft">임시저장</option>
                    <option value="archived">보관됨</option>
                  </select>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    추천 여부
                  </label>
                  <select
                    value={
                      filters.featured === undefined
                        ? "all"
                        : filters.featured.toString()
                    }
                    onChange={(e) =>
                      handleFilterChange(
                        "featured",
                        e.target.value === "all"
                          ? undefined
                          : e.target.value === "true"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value="true">추천</option>
                    <option value="false">일반</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Actions */}
          {selectedContent.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedContent.length}개 선택됨
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate("published")}
                className="flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                발행
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate("draft")}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                임시저장
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate("archived")}
                className="flex items-center gap-1"
              >
                <Archive className="w-4 h-4" />
                보관
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Content List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {content.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {searchQuery ||
                Object.keys(filters).some(
                  (key) => filters[key as keyof ContentFilters]
                )
                  ? "검색 결과가 없습니다."
                  : "등록된 컨텐츠가 없습니다."}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedContent.includes(item.id!)}
                            onChange={() => handleContentSelect(item.id!)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                          {item.featured && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedContentItem(item)}
                            className="p-1"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditContent(item.id!, item)}
                            className="p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteContent(item.id!)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Thumbnail */}
                      {item.thumbnailUrl && (
                        <div className="mb-4">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {item.content.replace(/<[^>]*>/g, "")}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.type === "announcement"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : item.type === "news"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : item.type === "event"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}
                          >
                            {getTypeText(item.type)}
                          </span>
                          <span>{item.category}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {item.viewCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {item.comments}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(item.createdAt.toDate())}
                          </span>
                          {item.publishedAt && (
                            <span>
                              발행: {formatDate(item.publishedAt.toDate())}
                            </span>
                          )}
                        </div>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedContent.length === content.length &&
                            content.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        제목
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        유형
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        작성자
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        통계
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        작성일
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {content.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedContent.includes(item.id!)}
                            onChange={() => handleContentSelect(item.id!)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {item.featured && (
                              <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                {item.title}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                {item.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.type === "announcement"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : item.type === "news"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : item.type === "event"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}
                          >
                            {getTypeText(item.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {item.author}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {item.viewCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {item.comments}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(item.createdAt.toDate())}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedContentItem(item)}
                              className="p-1"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                /* TODO: 편집 */
                              }}
                              className="p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteContent(item.id!)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Content Detail Modal */}
        <AnimatePresence>
          {selectedContentItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedContentItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl max-h-[80vh] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            selectedContentItem.status
                          )}`}
                        >
                          {getStatusText(selectedContentItem.status)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded text-sm ${
                            selectedContentItem.type === "announcement"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : selectedContentItem.type === "news"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : selectedContentItem.type === "event"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {getTypeText(selectedContentItem.type)}
                        </span>
                        {selectedContentItem.featured && (
                          <Star className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedContentItem.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {selectedContentItem.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedContentItem.createdAt.toDate())}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {selectedContentItem.category}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedContentItem(null)}
                      className="p-2"
                    >
                      ×
                    </Button>
                  </div>

                  {/* Thumbnail */}
                  {selectedContentItem.thumbnailUrl && (
                    <div className="mb-6">
                      <img
                        src={selectedContentItem.thumbnailUrl}
                        alt={selectedContentItem.title}
                        className="w-full max-h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="mb-6">
                    <div
                      className="prose prose-gray dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: selectedContentItem.content,
                      }}
                    />
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">조회수</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedContentItem.viewCount}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">좋아요</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedContentItem.likes}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">댓글</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedContentItem.comments}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedContentItem.tags &&
                    selectedContentItem.tags.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          태그
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedContentItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Attachments */}
                  {selectedContentItem.attachments &&
                    selectedContentItem.attachments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          첨부파일
                        </h4>
                        <div className="space-y-2">
                          {selectedContentItem.attachments.map(
                            (file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {file.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    window.open(file.url, "_blank")
                                  }
                                  className="flex items-center gap-1"
                                >
                                  <Download className="w-4 h-4" />
                                  다운로드
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        /* TODO: 편집 */
                      }}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      편집
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleDeleteContent(selectedContentItem.id!)
                      }
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      삭제
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-400">
            <p className="font-medium mb-1">컨텐츠 관리 안내</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
              <li>발행된 컨텐츠는 웹사이트에 즉시 노출됩니다.</li>
              <li>임시저장된 컨텐츠는 작성자만 확인할 수 있습니다.</li>
              <li>
                보관된 컨텐츠는 웹사이트에 노출되지 않으며 관리자만 확인
                가능합니다.
              </li>
              <li>컨텐츠 삭제는 영구적이며 복구할 수 없습니다.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContentManagement;
