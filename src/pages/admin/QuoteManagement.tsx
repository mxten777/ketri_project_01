import { useEffect, useState, createElement } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Filter,
  Search,
  Eye,
  Trash2,
  X,
  Calendar,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  getAllQuotes,
  updateQuoteStatus,
  deleteQuote,
  getQuoteStats,
} from "../../services/quoteService";
import type { QuoteRequest } from "../../types";

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    completed: 0,
    rejected: 0,
  });

  // Service type 한글 매핑
  const serviceTypeMap: Record<string, string> = {
    "industrial-health": "산업보건컨설팅",
    "water-testing": "먹는물 검사",
    "dialysis-water": "혈액투석용수 검사",
    "indoor-air": "실내공기질 측정",
    asbestos: "석면조사·분석",
    other: "기타 서비스",
  };

  // Status 한글 매핑
  const statusMap: Record<string, { label: string; color: string; icon: any }> =
    {
      pending: {
        label: "접수 대기",
        color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
        icon: Clock,
      },
      reviewed: {
        label: "검토 중",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
        icon: Eye,
      },
      completed: {
        label: "처리 완료",
        color: "text-green-600 bg-green-50 dark:bg-green-900/20",
        icon: CheckCircle,
      },
      rejected: {
        label: "반려",
        color: "text-red-600 bg-red-50 dark:bg-red-900/20",
        icon: XCircle,
      },
    };

  useEffect(() => {
    loadQuotes();
    loadStats();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter]);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const data = await getAllQuotes();
      setQuotes(data);
    } catch (error) {
      console.error("견적 목록 로드 실패:", error);
      alert("견적 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getQuoteStats();
      setStats(data);
    } catch (error) {
      console.error("통계 로드 실패:", error);
    }
  };

  const filterQuotes = () => {
    let filtered = [...quotes];

    // 상태 필터
    if (statusFilter !== "all") {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    // 검색어 필터
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.companyName?.toLowerCase().includes(term) ||
          q.contactPerson?.toLowerCase().includes(term) ||
          q.email?.toLowerCase().includes(term) ||
          q.phone?.includes(term)
      );
    }

    setFilteredQuotes(filtered);
  };

  const handleStatusChange = async (quoteId: string, newStatus: string) => {
    if (
      !confirm(
        `견적 상태를 '${statusMap[newStatus]?.label}'(으)로 변경하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      await updateQuoteStatus(quoteId, newStatus as QuoteRequest["status"]);
      await loadQuotes();
      await loadStats();
      alert("상태가 변경되었습니다.");

      // 상세 모달이 열려있으면 새로고침
      if (selectedQuote && selectedQuote.id === quoteId) {
        const updated = quotes.find((q) => q.id === quoteId);
        if (updated) {
          setSelectedQuote({
            ...updated,
            status: newStatus as QuoteRequest["status"],
          });
        }
      }
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (quoteId: string) => {
    if (deleteConfirm !== quoteId) {
      setDeleteConfirm(quoteId);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      await deleteQuote(quoteId);
      await loadQuotes();
      await loadStats();
      setDeleteConfirm(null);
      setShowDetailModal(false);
      alert("견적이 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("견적 삭제에 실패했습니다.");
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "-";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("ko-KR");
  };

  const openDetailModal = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedQuote(null);
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          견적 요청 관리
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          고객 견적 요청을 관리하고 상태를 업데이트합니다
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
              <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            전체
          </p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            {stats.total}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            접수 대기
          </p>
          <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            검토 중
          </p>
          <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            처리 완료
          </p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            반려
          </p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="회사명, 담당자, 이메일, 연락처로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg 
                       bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg 
                       bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[180px]"
            >
              <option value="all">전체 상태</option>
              <option value="pending">접수 대기</option>
              <option value="reviewed">검토 중</option>
              <option value="completed">처리 완료</option>
              <option value="rejected">반려</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          총 {filteredQuotes.length}건의 견적 요청
        </div>
      </div>

      {/* Quote List */}
      <div className="space-y-4">
        {filteredQuotes.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-12 shadow-sm border border-neutral-200 dark:border-neutral-700 text-center">
            <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">
              {searchTerm || statusFilter !== "all"
                ? "검색 조건에 맞는 견적 요청이 없습니다."
                : "아직 견적 요청이 없습니다."}
            </p>
          </div>
        ) : (
          filteredQuotes.map((quote, index) => {
            const StatusIcon = statusMap[quote.status].icon;
            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 
                         hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                            {quote.companyName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusMap[quote.status].color
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusMap[quote.status].label}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          {serviceTypeMap[quote.serviceType] ||
                            quote.serviceType}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {quote.contactPerson}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {quote.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(quote.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Status Change */}
                    <select
                      value={quote.status}
                      onChange={(e) =>
                        handleStatusChange(quote.id!, e.target.value)
                      }
                      className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg 
                               bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="pending">접수 대기</option>
                      <option value="reviewed">검토 중</option>
                      <option value="completed">처리 완료</option>
                      <option value="rejected">반려</option>
                    </select>

                    {/* View Detail */}
                    <button
                      onClick={() => openDetailModal(quote)}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg 
                               transition-colors flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap"
                    >
                      <Eye className="w-4 h-4" />
                      상세보기
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(quote.id!)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap
                                ${
                                  deleteConfirm === quote.id
                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                    : "bg-neutral-100 dark:bg-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-600 dark:text-neutral-400 hover:text-red-600"
                                }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleteConfirm === quote.id ? "확인" : "삭제"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedQuote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                견적 요청 상세
              </h2>
              <button
                onClick={closeDetailModal}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                    statusMap[selectedQuote.status].color
                  }`}
                >
                  {createElement(statusMap[selectedQuote.status].icon, {
                    className: "w-4 h-4",
                  })}
                  {statusMap[selectedQuote.status].label}
                </span>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  서비스 종류
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-neutral-900 dark:text-white font-medium">
                    {serviceTypeMap[selectedQuote.serviceType] ||
                      selectedQuote.serviceType}
                  </span>
                </div>
              </div>

              {/* Company Info */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  회사명
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-900 dark:text-white">
                    {selectedQuote.companyName}
                  </span>
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  담당자
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <User className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-900 dark:text-white">
                    {selectedQuote.contactPerson}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    연락처
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <Phone className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-neutral-900 dark:text-white">
                      {selectedQuote.phone}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    이메일
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-neutral-900 dark:text-white text-sm">
                      {selectedQuote.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  위치
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-900 dark:text-white">
                    {selectedQuote.location}
                  </span>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  희망 일정
                </label>
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-900 dark:text-white">
                    {selectedQuote.preferredDate}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  상세 요청사항
                </label>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  <p className="text-neutral-900 dark:text-white whitespace-pre-wrap">
                    {selectedQuote.details || "없음"}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    요청 일시
                  </p>
                  <p className="text-neutral-900 dark:text-white font-medium">
                    {formatDate(selectedQuote.createdAt)}
                  </p>
                </div>
                {selectedQuote.updatedAt && (
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      최종 수정
                    </p>
                    <p className="text-neutral-900 dark:text-white font-medium">
                      {formatDate(selectedQuote.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 flex flex-col sm:flex-row gap-3">
              <select
                value={selectedQuote.status}
                onChange={(e) => {
                  handleStatusChange(selectedQuote.id!, e.target.value);
                }}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg 
                         bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="pending">접수 대기</option>
                <option value="reviewed">검토 중</option>
                <option value="completed">처리 완료</option>
                <option value="rejected">반려</option>
              </select>
              <button
                onClick={() => handleDelete(selectedQuote.id!)}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium
                          ${
                            deleteConfirm === selectedQuote.id
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-neutral-100 dark:bg-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-600 dark:text-neutral-400 hover:text-red-600"
                          }`}
              >
                <Trash2 className="w-4 h-4" />
                {deleteConfirm === selectedQuote.id ? "삭제 확인" : "삭제"}
              </button>
              <button
                onClick={closeDetailModal}
                className="px-6 py-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 
                         text-neutral-900 dark:text-white rounded-lg transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuoteManagement;
