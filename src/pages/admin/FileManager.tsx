import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  File,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  Tag,
  Calendar,
  User,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  MoreHorizontal,
  X,
  Check,
  AlertCircle,
  Folder,
  Clock,
} from "lucide-react";
import {
  fileUploadService,
  UploadedFile,
  FileFilters,
  UploadProgress,
} from "../../services/fileUploadService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate, formatRelativeTime } from "../../utils/dateUtils";
import FileUploadModal from "../../components/FileUploadModal";

const FileManager: React.FC = () => {
  const { user, userData } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<
    { tag: string; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [filters, setFilters] = useState<FileFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 드래그 앤 드롭 상태
  const [isDragOver, setIsDragOver] = useState(false);

  // 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 필터 변경 시 데이터 재로드
  useEffect(() => {
    if (!loading) {
      loadFiles();
    }
  }, [filters, searchQuery]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [filesData, statsData, categoriesData, tagsData] =
        await Promise.all([
          fileUploadService.getFiles({ ...filters, searchQuery }),
          fileUploadService.getFileStatistics(),
          fileUploadService.getCategories(),
          fileUploadService.getPopularTags(),
        ]);

      setFiles(filesData.files);
      setHasMore(filesData.hasMore);
      setStatistics(statsData);
      setCategories(categoriesData);
      setPopularTags(tagsData);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const filesData = await fileUploadService.getFiles({
        ...filters,
        searchQuery,
      });
      setFiles(filesData.files);
      setHasMore(filesData.hasMore);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof FileFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
    setCurrentPage(1);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.id!));
    }
  };

  // 파일 업로드 처리
  const handleFileUpload = async (
    uploadFiles: FileList | File[],
    uploadMetadata?: any
  ) => {
    if (!user || !userData) return;

    try {
      setUploading(true);
      setUploadProgress([]);

      const filesArray = Array.from(uploadFiles);
      const metadata = {
        category: uploadMetadata?.category || "general",
        tags: uploadMetadata?.tags || [],
        description: uploadMetadata?.description || "",
        isPublic: uploadMetadata?.isPublic ?? true,
        uploaderInfo: {
          uid: user.uid,
          name: userData.displayName || user.email || "익명",
          email: user.email || "",
        },
      };

      await fileUploadService.uploadMultipleFiles(
        filesArray,
        metadata,
        (progressList) => {
          setUploadProgress(progressList);
        }
      );

      // 업로드 완료 후 목록 새로고침
      await loadFiles();
      await loadInitialData(); // 통계 업데이트
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  };

  // 드래그 앤 드롭 처리
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      const downloadURL = await fileUploadService.downloadFile(fileId);
      window.open(downloadURL, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!user) return;

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await fileUploadService.deleteFile(
          fileId,
          user.uid,
          userData?.role === "admin"
        );
        loadFiles();
        loadInitialData(); // 통계 업데이트
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();

    if (type.includes("image")) return <Image className="w-5 h-5" />;
    if (type.includes("video")) return <Video className="w-5 h-5" />;
    if (type.includes("audio")) return <Music className="w-5 h-5" />;
    if (type.includes("archive") || type.includes("zip"))
      return <Archive className="w-5 h-5" />;

    return <FileText className="w-5 h-5" />;
  };

  const getFileTypeColor = (fileType: string) => {
    const type = fileType.toLowerCase();

    if (type.includes("image")) return "text-blue-600";
    if (type.includes("video")) return "text-red-600";
    if (type.includes("audio")) return "text-green-600";
    if (type.includes("pdf")) return "text-red-500";
    if (type.includes("word") || type.includes("doc")) return "text-blue-500";
    if (type.includes("excel") || type.includes("sheet"))
      return "text-green-500";
    if (type.includes("archive") || type.includes("zip"))
      return "text-yellow-600";

    return "text-gray-600";
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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
                <Upload className="w-8 h-8 text-primary" />
                파일 관리
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                파일을 업로드하고 관리할 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                파일 업로드
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
                    총 파일
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.totalFiles}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <File className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    총 용량
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fileUploadService.formatFileSize(statistics.totalSize)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Folder className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    카테고리
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Object.keys(statistics.filesByCategory).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    최근 업로드
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {statistics.recentUploads.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                  placeholder="파일명, 설명, 태그로 검색..."
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

                {/* File Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    파일 타입
                  </label>
                  <select
                    value={filters.fileType || "all"}
                    onChange={(e) =>
                      handleFilterChange("fileType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value="image">이미지</option>
                    <option value="video">비디오</option>
                    <option value="audio">오디오</option>
                    <option value="application">문서</option>
                    <option value="text">텍스트</option>
                  </select>
                </div>

                {/* Public Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    공개 여부
                  </label>
                  <select
                    value={
                      filters.isPublic === undefined
                        ? "all"
                        : filters.isPublic.toString()
                    }
                    onChange={(e) =>
                      handleFilterChange(
                        "isPublic",
                        e.target.value === "all"
                          ? undefined
                          : e.target.value === "true"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value="true">공개</option>
                    <option value="false">비공개</option>
                  </select>
                </div>

                {/* Uploader Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    업로더
                  </label>
                  <select
                    value={filters.uploadedBy || "all"}
                    onChange={(e) =>
                      handleFilterChange("uploadedBy", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">전체</option>
                    <option value={user?.uid}>내 파일</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Actions */}
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedFiles.length}개 선택됨
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  selectedFiles.forEach((fileId) => {
                    const file = files.find((f) => f.id === fileId);
                    if (file) handleDownload(fileId);
                  });
                }}
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                다운로드
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (
                    window.confirm("선택한 파일들을 정말로 삭제하시겠습니까?")
                  ) {
                    selectedFiles.forEach((fileId) => handleDeleteFile(fileId));
                    setSelectedFiles([]);
                  }
                }}
                className="flex items-center gap-1 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Drag and Drop Overlay */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl text-center">
                <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  파일을 여기에 드롭하세요
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  파일을 놓으면 즉시 업로드됩니다
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Files List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {files.length === 0 ? (
            <div className="text-center py-20">
              <File className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {searchQuery ||
                Object.keys(filters).some(
                  (key) => filters[key as keyof FileFilters]
                )
                  ? "검색 결과가 없습니다."
                  : "업로드된 파일이 없습니다."}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id!)}
                            onChange={() => handleFileSelect(file.id!)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <div className={`${getFileTypeColor(file.fileType)}`}>
                            {getFileIcon(file.fileType)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedFile(file)}
                            className="p-1"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(file.id!)}
                            className="p-1"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          {(file.uploadedBy === user?.uid ||
                            userData?.role === "admin") && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteFile(file.id!)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Preview */}
                      {file.fileType.startsWith("image/") && (
                        <div className="mb-4">
                          <img
                            src={file.downloadURL}
                            alt={file.originalName}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}

                      {/* File Info */}
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                          {file.originalName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {fileUploadService.formatFileSize(file.fileSize)}
                        </p>
                        {file.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                            {file.description}
                          </p>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {file.category}
                          </span>
                          {!file.isPublic && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">
                              비공개
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {file.uploaderName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {file.downloadCount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatRelativeTime(file.createdAt.toDate())}
                          </span>
                        </div>

                        {/* Tags */}
                        {file.tags && file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {file.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {file.tags.length > 2 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{file.tags.length - 2}
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
                            selectedFiles.length === files.length &&
                            files.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        파일명
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        타입
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        크기
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        업로더
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        업로드일
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {files.map((file) => (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id!)}
                            onChange={() => handleFileSelect(file.id!)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`${getFileTypeColor(file.fileType)}`}
                            >
                              {getFileIcon(file.fileType)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {file.originalName}
                              </div>
                              {file.description && (
                                <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                                  {file.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                            {file.fileType.split("/")[1]?.toUpperCase() ||
                              "FILE"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {fileUploadService.formatFileSize(file.fileSize)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {file.uploaderName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(file.createdAt.toDate())}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedFile(file)}
                              className="p-1"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownload(file.id!)}
                              className="p-1"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            {(file.uploadedBy === user?.uid ||
                              userData?.role === "admin") && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteFile(file.id!)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
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

        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && uploadProgress.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  파일 업로드
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setUploading(false)}
                  className="p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {uploadProgress.map((progress, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-900 dark:text-white truncate">
                        {progress.fileName}
                      </span>
                      <div className="flex items-center gap-2">
                        {progress.status === "completed" && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        {progress.status === "error" && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-gray-600 dark:text-gray-400">
                          {Math.round(progress.progress)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          progress.status === "completed"
                            ? "bg-green-500"
                            : progress.status === "error"
                            ? "bg-red-500"
                            : "bg-primary"
                        }`}
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                    {progress.error && (
                      <p className="text-xs text-red-500">{progress.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Detail Modal */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedFile(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl max-h-[80vh] overflow-y-auto w-full"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`${getFileTypeColor(selectedFile.fileType)}`}
                      >
                        {getFileIcon(selectedFile.fileType)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {selectedFile.originalName}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {fileUploadService.formatFileSize(
                            selectedFile.fileSize
                          )}{" "}
                          • {selectedFile.fileType}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedFile(null)}
                      className="p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Preview */}
                  {selectedFile.fileType.startsWith("image/") && (
                    <div className="mb-6">
                      <img
                        src={selectedFile.downloadURL}
                        alt={selectedFile.originalName}
                        className="w-full max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        파일 정보
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            카테고리:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedFile.category}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            공개 여부:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedFile.isPublic ? "공개" : "비공개"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            다운로드 수:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedFile.downloadCount}
                          </span>
                        </div>
                        {selectedFile.metadata.width && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              해상도:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {selectedFile.metadata.width} ×{" "}
                              {selectedFile.metadata.height}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        업로드 정보
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            업로더:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedFile.uploaderName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            업로드일:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formatDate(selectedFile.createdAt.toDate())}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            수정일:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formatDate(selectedFile.updatedAt.toDate())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedFile.description && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        설명
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        {selectedFile.description}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedFile.tags && selectedFile.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        태그
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(selectedFile.id!)}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      다운로드
                    </Button>
                    {(selectedFile.uploadedBy === user?.uid ||
                      userData?.role === "admin") && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleEditFile(file)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          편집
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleDeleteFile(selectedFile.id!);
                            setSelectedFile(null);
                          }}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          삭제
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Modal */}
        <FileUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
          categories={categories}
          isUploading={uploading}
        />

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-400">
            <p className="font-medium mb-1">파일 업로드 안내</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
              <li>파일을 드래그 앤 드롭하거나 업로드 버튼을 사용하세요.</li>
              <li>최대 파일 크기는 100MB입니다.</li>
              <li>비공개 파일은 업로더와 관리자만 접근할 수 있습니다.</li>
              <li>파일 삭제는 영구적이며 복구할 수 없습니다.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileManager;
