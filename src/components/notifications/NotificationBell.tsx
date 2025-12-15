import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  X,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Settings,
  MessageCircle,
  FileText,
  Upload,
  UserPlus,
  Shield,
  Activity,
  ExternalLink,
} from "lucide-react";
import { useNotifications } from "../../contexts/NotificationContext";
import { Notification } from "../../services/notificationService";
import Button from "../common/Button";

import { formatRelativeTime } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

interface NotificationBellProps {
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  className = "",
}) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteReadNotifications,
    filters,
    setFilters,
    soundEnabled,
    setSoundEnabled,
    showDesktopNotifications,
    setShowDesktopNotifications,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowSettings(false);
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 알림 타입별 아이콘
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "qna":
        return <MessageCircle className="w-4 h-4" />;
      case "resource":
        return <FileText className="w-4 h-4" />;
      case "quote":
        return <FileText className="w-4 h-4" />;
      case "file":
        return <Upload className="w-4 h-4" />;
      case "user":
        return <UserPlus className="w-4 h-4" />;
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "system":
        return <Activity className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  // 우선순위별 색상
  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "normal":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "low":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // 알림 클릭 처리
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id!);
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setIsOpen(false);
    }
  };

  // 필터 변경
  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters({
      ...filters,
      [key]: value === "all" ? undefined : value,
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-6 h-6 animate-pulse" />
        ) : (
          <Bell className="w-6 h-6" />
        )}

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-96 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  알림
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-1"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-xs"
                  >
                    <CheckCheck className="w-3 h-3" />
                    모두 읽음
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={deleteReadNotifications}
                  className="flex items-center gap-1 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  읽은 알림 삭제
                </Button>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={filters.type || "all"}
                        onChange={(e) =>
                          handleFilterChange("type", e.target.value)
                        }
                        className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">모든 타입</option>
                        <option value="qna">QnA</option>
                        <option value="resource">자료실</option>
                        <option value="quote">견적</option>
                        <option value="file">파일</option>
                        <option value="user">사용자</option>
                        <option value="admin">관리자</option>
                        <option value="system">시스템</option>
                      </select>

                      <select
                        value={
                          filters.isRead === undefined
                            ? "all"
                            : filters.isRead.toString()
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            "isRead",
                            e.target.value === "all"
                              ? undefined
                              : e.target.value === "true"
                          )
                        }
                        className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">전체</option>
                        <option value="false">미읽음</option>
                        <option value="true">읽음</option>
                      </select>
                    </div>

                    <select
                      value={filters.priority || "all"}
                      onChange={(e) =>
                        handleFilterChange("priority", e.target.value)
                      }
                      className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">모든 우선순위</option>
                      <option value="urgent">긴급</option>
                      <option value="high">높음</option>
                      <option value="normal">보통</option>
                      <option value="low">낮음</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Settings */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        알림음 재생
                      </span>
                      <input
                        type="checkbox"
                        checked={soundEnabled}
                        onChange={(e) => setSoundEnabled(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        데스크톱 알림
                      </span>
                      <input
                        type="checkbox"
                        checked={showDesktopNotifications}
                        onChange={(e) =>
                          setShowDesktopNotifications(e.target.checked)
                        }
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    알림을 불러오는 중...
                  </p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    새로운 알림이 없습니다.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        !notification.isRead
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div
                          className="flex-1 min-w-0"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4
                                className={`text-sm font-medium ${
                                  !notification.isRead
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                )}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {notification.message}
                              </p>

                              {/* Time and Priority */}
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {formatRelativeTime(
                                    notification.createdAt.toDate()
                                  )}
                                </span>

                                {notification.priority !== "normal" && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      notification.priority === "urgent"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : notification.priority === "high"
                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                                    }`}
                                  >
                                    {notification.priority === "urgent"
                                      ? "긴급"
                                      : notification.priority === "high"
                                      ? "높음"
                                      : "낮음"}
                                  </span>
                                )}

                                {notification.actionUrl && (
                                  <ExternalLink className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id!);
                                  }}
                                  className="p-1"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id!);
                                }}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/notifications");
                    setIsOpen(false);
                  }}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  모든 알림 보기
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
