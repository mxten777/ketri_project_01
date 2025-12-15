import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  notificationService,
  Notification,
  NotificationFilters,
  NotificationStats,
} from "../services/notificationService";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  stats: NotificationStats | null;
  isLoading: boolean;
  error: string | null;

  // 알림 조회 및 필터링
  loadNotifications: (filters?: NotificationFilters) => Promise<void>;
  refreshNotifications: () => Promise<void>;

  // 알림 상태 변경
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  deleteAllNotifications: () => Promise<void>;
  deleteReadNotifications: () => Promise<void>;

  // 알림 생성 (관리자용)
  createNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => Promise<string>;

  // 필터 및 설정
  filters: NotificationFilters;
  setFilters: (filters: NotificationFilters) => void;
  clearFilters: () => void;

  // 실시간 업데이트 제어
  enableRealtime: boolean;
  setEnableRealtime: (enabled: boolean) => void;

  // 알림 소리 및 설정
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  showDesktopNotifications: boolean;
  setShowDesktopNotifications: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { user, userData } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<NotificationFilters>({});
  const [enableRealtime, setEnableRealtime] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDesktopNotifications, setShowDesktopNotifications] =
    useState(true);

  // 실시간 알림 리스너
  useEffect(() => {
    if (!user || !enableRealtime) return;

    let unsubscribeNotifications: (() => void) | undefined;
    let unsubscribeUnreadCount: (() => void) | undefined;

    try {
      setIsLoading(true);

      // 알림 목록 구독
      unsubscribeNotifications =
        notificationService.subscribeToUserNotifications(
          user.uid,
          (newNotifications) => {
            setNotifications((prev) => {
              // 새로운 알림 감지 및 알림음/데스크톱 알림 처리
              const newNotificationIds = newNotifications
                .filter((n) => !prev.find((p) => p.id === n.id))
                .map((n) => n.id);

              if (newNotificationIds.length > 0) {
                handleNewNotifications(
                  newNotifications.filter((n) =>
                    newNotificationIds.includes(n.id!)
                  )
                );
              }

              return newNotifications;
            });
            setError(null);
            setIsLoading(false);
          },
          filters
        );

      // 미읽은 알림 수 구독
      unsubscribeUnreadCount = notificationService.subscribeToUnreadCount(
        user.uid,
        setUnreadCount
      );

      // 통계 로드
      loadStats();
    } catch (err) {
      console.error("Error setting up notification listeners:", err);
      setError("알림을 불러오는데 실패했습니다.");
      setIsLoading(false);
    }

    return () => {
      unsubscribeNotifications?.();
      unsubscribeUnreadCount?.();
    };
  }, [user, enableRealtime, filters]);

  // 새로운 알림 처리 (소리, 데스크톱 알림)
  const handleNewNotifications = useCallback(
    (newNotifications: Notification[]) => {
      newNotifications.forEach((notification) => {
        // 알림음 재생
        if (soundEnabled) {
          playNotificationSound(notification.priority);
        }

        // 데스크톱 알림 표시
        if (showDesktopNotifications && "Notification" in window) {
          if (Notification.permission === "granted") {
            showDesktopNotification(notification);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                showDesktopNotification(notification);
              }
            });
          }
        }
      });
    },
    [soundEnabled, showDesktopNotifications]
  );

  // 알림음 재생
  const playNotificationSound = (priority: Notification["priority"]) => {
    try {
      const audio = new Audio();

      switch (priority) {
        case "urgent":
          audio.src = "/sounds/urgent.wav";
          break;
        case "high":
          audio.src = "/sounds/high.wav";
          break;
        default:
          audio.src = "/sounds/normal.wav";
          break;
      }

      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (err) {
      // Notification sound error silently handled
    }
  };

  // 데스크톱 알림 표시
  const showDesktopNotification = (notification: Notification) => {
    try {
      const desktopNotification = new Notification(notification.title, {
        body: notification.message,
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        tag: notification.id,
        requireInteraction: notification.priority === "urgent",
        silent: false,
      });

      desktopNotification.onclick = () => {
        window.focus();
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl;
        }
        desktopNotification.close();
      };

      // 자동 닫기 (긴급하지 않은 경우)
      if (notification.priority !== "urgent") {
        setTimeout(() => {
          desktopNotification.close();
        }, 5000);
      }
    } catch (err) {
      // Desktop notification error silently handled
    }
  };

  // 통계 로드
  const loadStats = useCallback(async () => {
    if (!user) return;

    try {
      const statsData = await notificationService.getNotificationStats(
        user.uid
      );
      setStats(statsData);
    } catch (err) {
      console.error("Error loading notification stats:", err);
    }
  }, [user]);

  // 알림 목록 수동 로드
  const loadNotifications = useCallback(
    async (newFilters?: NotificationFilters) => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        if (newFilters) {
          setFilters(newFilters);
        }

        // 실시간이 비활성화된 경우에만 수동 로드
        if (!enableRealtime) {
          // 여기에 수동 로드 로직 구현 (필요시)
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
        setError("알림을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [user, enableRealtime]
  );

  // 알림 새로고침
  const refreshNotifications = useCallback(async () => {
    await loadNotifications(filters);
    await loadStats();
  }, [loadNotifications, filters, loadStats]);

  // 알림 읽음 처리
  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await notificationService.markAsRead(notificationId);

        // 로컬 상태 업데이트 (실시간이 비활성화된 경우)
        if (!enableRealtime) {
          setNotifications((prev) =>
            prev.map((notification) =>
              notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
            )
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (err) {
        console.error("Error marking notification as read:", err);
        setError("알림 처리에 실패했습니다.");
      }
    },
    [enableRealtime]
  );

  // 모든 알림 읽음 처리
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      await notificationService.markAllAsRead(user.uid);

      if (!enableRealtime) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
      setError("알림 처리에 실패했습니다.");
    }
  }, [user, enableRealtime]);

  // 알림 삭제
  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await notificationService.deleteNotification(notificationId);

        if (!enableRealtime) {
          setNotifications((prev) =>
            prev.filter((notification) => notification.id !== notificationId)
          );
        }
      } catch (err) {
        console.error("Error deleting notification:", err);
        setError("알림 삭제에 실패했습니다.");
      }
    },
    [enableRealtime]
  );

  // 모든 알림 삭제
  const deleteAllNotifications = useCallback(async () => {
    if (!user) return;

    try {
      await notificationService.deleteAllUserNotifications(user.uid);

      if (!enableRealtime) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Error deleting all notifications:", err);
      setError("알림 삭제에 실패했습니다.");
    }
  }, [user, enableRealtime]);

  // 읽은 알림 삭제
  const deleteReadNotifications = useCallback(async () => {
    if (!user) return;

    try {
      await notificationService.deleteReadNotifications(user.uid);

      if (!enableRealtime) {
        setNotifications((prev) =>
          prev.filter((notification) => !notification.isRead)
        );
      }
    } catch (err) {
      console.error("Error deleting read notifications:", err);
      setError("알림 삭제에 실패했습니다.");
    }
  }, [user, enableRealtime]);

  // 알림 생성 (관리자용)
  const createNotification = useCallback(
    async (
      notification: Omit<Notification, "id" | "createdAt" | "isRead">
    ): Promise<string> => {
      try {
        return await notificationService.createNotification(notification);
      } catch (err) {
        console.error("Error creating notification:", err);
        setError("알림 생성에 실패했습니다.");
        throw err;
      }
    },
    []
  );

  // 필터 초기화
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // 데스크톱 알림 권한 요청 (초기화 시)
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // 페이지 가시성 변경 시 알림 정리
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        // 페이지가 다시 보일 때 만료된 알림 정리
        notificationService.cleanupExpiredNotifications().catch(console.error);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    stats,
    isLoading,
    error,

    loadNotifications,
    refreshNotifications,

    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    deleteReadNotifications,

    createNotification,

    filters,
    setFilters,
    clearFilters,

    enableRealtime,
    setEnableRealtime,

    soundEnabled,
    setSoundEnabled,
    showDesktopNotifications,
    setShowDesktopNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for using notification context
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationContext;
