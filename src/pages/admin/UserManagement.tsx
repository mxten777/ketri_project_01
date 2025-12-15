import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  UserMinus,
  Shield,
  ShieldCheck,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Building,
  RefreshCw,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  getUsers,
  getUserStatistics,
  updateUserRole,
  toggleUserStatus,
  updateUserInfo,
  getUserActivities,
  type UserListOptions,
  type UserListResult,
  type UserActivity,
} from "../../services/userManagementService";
import type { User } from "../../types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const UserManagement: React.FC = () => {
  const { user, userData } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);

  // 필터 및 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortBy, setSortBy] = useState<
    "createdAt" | "lastLoginAt" | "displayName" | "email"
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // 관리자 권한 확인
  if (!user || userData?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            접근 권한이 없습니다
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            관리자만 사용자 관리에 접근할 수 있습니다.
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            이전 페이지로
          </Button>
        </Card>
      </div>
    );
  }

  // 데이터 로드
  const loadUsers = async (options?: Partial<UserListOptions>) => {
    try {
      setLoading(true);
      const result = await getUsers({
        page: currentPage,
        pageSize,
        search: searchTerm,
        roleFilter,
        statusFilter,
        sortBy,
        sortOrder,
        ...options,
      });

      setUsers(result.users);
      setTotalCount(result.totalCount);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("사용자 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = await getUserStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error("통계 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadStatistics();
  }, [currentPage, roleFilter, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    // 검색어가 변경되면 첫 페이지로 리셋
    if (searchTerm) {
      setCurrentPage(1);
      const timeoutId = setTimeout(() => {
        loadUsers({ page: 1 });
      }, 500); // 디바운싱
      return () => clearTimeout(timeoutId);
    } else {
      loadUsers();
    }
  }, [searchTerm]);

  // 사용자 역할 변경
  const handleRoleChange = async (
    userId: string,
    newRole: "user" | "admin"
  ) => {
    try {
      await updateUserRole(userId, newRole);
      await loadUsers();
      await loadStatistics();

      // 선택된 사용자 정보 업데이트
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => (prev ? { ...prev, role: newRole } : null));
      }
    } catch (error) {
      console.error("역할 변경 실패:", error);
    }
  };

  // 사용자 상태 변경
  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    try {
      await toggleUserStatus(userId, !currentStatus);
      await loadUsers();
      await loadStatistics();

      // 선택된 사용자 정보 업데이트
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, isActive: !currentStatus } : null
        );
      }
    } catch (error) {
      console.error("상태 변경 실패:", error);
    }
  };

  // 사용자 상세 보기
  const handleUserDetail = async (user: User) => {
    setSelectedUser(user);
    setShowUserDetail(true);

    try {
      const activities = await getUserActivities(user.id, 20);
      setUserActivities(activities);
    } catch (error) {
      console.error("사용자 활동 로드 실패:", error);
    }
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 정렬 변경
  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full">
        <ShieldCheck className="w-3 h-3" />
        관리자
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 rounded-full">
        <Users className="w-3 h-3" />
        사용자
      </span>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
        <CheckCircle className="w-3 h-3" />
        활성
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full">
        <XCircle className="w-3 h-3" />
        비활성
      </span>
    );
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case "login":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "logout":
        return <XCircle className="w-4 h-4 text-gray-600" />;
      case "role_change":
        return <Shield className="w-4 h-4 text-purple-600" />;
      case "profile_update":
        return <Edit className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6 p-6"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            사용자 관리
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            등록된 사용자를 관리하고 권한을 설정하세요
          </p>
        </div>
        <Button
          onClick={() => loadUsers()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          새로고침
        </Button>
      </div>

      {/* 통계 카드 */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {statistics.totalUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                전체 사용자
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {statistics.activeUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                활성 사용자
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {statistics.inactiveUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                비활성 사용자
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {statistics.adminUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                관리자
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {statistics.regularUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                일반 사용자
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {statistics.weeklyNewUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                주간 신규
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-600">
                {statistics.monthlyActiveUsers}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                월간 활성
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* 검색 및 필터 */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 이메일로 검색..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* 역할 필터 */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "admin" | "user")
            }
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="user">일반 사용자</option>
          </select>

          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "inactive")
            }
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>

          {/* 정렬 */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("-") as [
                typeof sortBy,
                typeof sortOrder
              ];
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="createdAt-desc">가입일 최신순</option>
            <option value="createdAt-asc">가입일 오래된순</option>
            <option value="lastLoginAt-desc">최근 로그인순</option>
            <option value="lastLoginAt-asc">로그인 오래된순</option>
            <option value="displayName-asc">이름 오름차순</option>
            <option value="displayName-desc">이름 내림차순</option>
            <option value="email-asc">이메일 오름차순</option>
            <option value="email-desc">이메일 내림차순</option>
          </select>
        </div>
      </Card>

      {/* 사용자 목록 */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      사용자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      역할
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      최근 로그인
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <AnimatePresence>
                    {users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.displayName?.[0] ||
                                  user.email[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-white">
                                {user.displayName || user.name || "이름 없음"}
                              </p>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(user.isActive !== false)}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                          {user.createdAt
                            ? formatDistanceToNow(user.createdAt, {
                                addSuffix: true,
                                locale: ko,
                              })
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                          {user.lastLoginAt
                            ? formatDistanceToNow(user.lastLoginAt, {
                                addSuffix: true,
                                locale: ko,
                              })
                            : "로그인 기록 없음"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleUserDetail(user)}
                              variant="ghost"
                              size="sm"
                              className="p-2"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(
                                  user.id,
                                  e.target.value as "user" | "admin"
                                )
                              }
                              className="text-xs px-2 py-1 border border-neutral-200 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                            >
                              <option value="user">사용자</option>
                              <option value="admin">관리자</option>
                            </select>
                            <Button
                              onClick={() =>
                                handleStatusToggle(
                                  user.id,
                                  user.isActive !== false
                                )
                              }
                              variant="ghost"
                              size="sm"
                              className={`p-2 ${
                                user.isActive !== false
                                  ? "text-red-600 hover:bg-red-50"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                            >
                              {user.isActive !== false ? (
                                <UserMinus className="w-4 h-4" />
                              ) : (
                                <UserPlus className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {totalCount > pageSize && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  총 {totalCount}명 중 {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, totalCount)}명 표시
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {currentPage} / {Math.ceil(totalCount / pageSize)}
                  </span>
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasMore}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* 사용자 상세 모달 */}
      <AnimatePresence>
        {showUserDetail && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUserDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    사용자 상세 정보
                  </h3>
                  <Button
                    onClick={() => setShowUserDetail(false)}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* 기본 정보 */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      {selectedUser.displayName?.[0] ||
                        selectedUser.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      {selectedUser.displayName ||
                        selectedUser.name ||
                        "이름 없음"}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.isActive !== false)}
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h5 className="font-medium text-neutral-900 dark:text-white">
                      연락처 정보
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {selectedUser.email}
                        </span>
                      </div>
                      {selectedUser.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-600 dark:text-neutral-400">
                            {selectedUser.phoneNumber}
                          </span>
                        </div>
                      )}
                      {(selectedUser.department || selectedUser.position) && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-600 dark:text-neutral-400">
                            {[selectedUser.department, selectedUser.position]
                              .filter(Boolean)
                              .join(" - ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium text-neutral-900 dark:text-white">
                      활동 정보
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          가입:{" "}
                          {selectedUser.createdAt
                            ? selectedUser.createdAt.toLocaleDateString("ko-KR")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-600 dark:text-neutral-400">
                          마지막 로그인:{" "}
                          {selectedUser.lastLoginAt
                            ? selectedUser.lastLoginAt.toLocaleDateString(
                                "ko-KR"
                              )
                            : "기록 없음"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 최근 활동 */}
                <div>
                  <h5 className="font-medium text-neutral-900 dark:text-white mb-4">
                    최근 활동
                  </h5>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {userActivities.length > 0 ? (
                      userActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {getActivityIcon(activity.action)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {activity.details || activity.action}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {formatDistanceToNow(activity.timestamp, {
                                addSuffix: true,
                                locale: ko,
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                        활동 기록이 없습니다
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagement;
