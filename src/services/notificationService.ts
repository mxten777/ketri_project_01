import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  onSnapshot, 
  Timestamp,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 알림 타입 정의
export interface Notification {
  id?: string;
  recipientId: string; // 수신자 ID
  senderId?: string; // 발신자 ID
  type: 'qna' | 'resource' | 'quote' | 'admin' | 'system' | 'file' | 'user';
  title: string;
  message: string;
  data?: {
    [key: string]: any;
  };
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Timestamp;
  readAt?: Timestamp;
  expiresAt?: Timestamp; // 알림 만료 시간
  actionUrl?: string; // 클릭 시 이동할 URL
}

// 알림 필터 타입
export interface NotificationFilters {
  type?: Notification['type'];
  isRead?: boolean;
  priority?: Notification['priority'];
  startDate?: Date;
  endDate?: Date;
  searchQuery?: string;
}

// 알림 통계 타입
export interface NotificationStats {
  total: number;
  unread: number;
  byType: {
    [key in Notification['type']]: number;
  };
  byPriority: {
    [key in Notification['priority']]: number;
  };
  recent: Notification[];
}

// 실시간 알림 리스너 타입
export type NotificationListener = (notifications: Notification[]) => void;

class NotificationService {
  private collectionName = 'notifications';
  private listeners: Map<string, () => void> = new Map();

  // 알림 생성
  async createNotification(
    notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>
  ): Promise<string> {
    try {
      const notificationData = {
        ...notification,
        isRead: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), notificationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // 다중 알림 생성 (배치)
  async createBulkNotifications(
    notifications: Omit<Notification, 'id' | 'createdAt' | 'isRead'>[]
  ): Promise<void> {
    try {
      const batch = writeBatch(db);
      const timestamp = serverTimestamp();

      notifications.forEach((notification) => {
        const notificationRef = doc(collection(db, this.collectionName));
        batch.set(notificationRef, {
          ...notification,
          isRead: false,
          createdAt: timestamp,
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error creating bulk notifications:', error);
      throw error;
    }
  }

  // 사용자별 알림 조회 (실시간)
  subscribeToUserNotifications(
    userId: string,
    callback: NotificationListener,
    filters?: NotificationFilters
  ): () => void {
    let q = query(
      collection(db, this.collectionName),
      where('recipientId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    // 필터 적용
    if (filters?.type) {
      q = query(q, where('type', '==', filters.type));
    }

    if (filters?.isRead !== undefined) {
      q = query(q, where('isRead', '==', filters.isRead));
    }

    if (filters?.priority) {
      q = query(q, where('priority', '==', filters.priority));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications: Notification[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));

      // 클라이언트 측 필터링 (복합 조건)
      let filteredNotifications = notifications;

      if (filters?.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        filteredNotifications = filteredNotifications.filter(notification =>
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower)
        );
      }

      if (filters?.startDate || filters?.endDate) {
        filteredNotifications = filteredNotifications.filter(notification => {
          const notificationDate = notification.createdAt.toDate();
          
          if (filters.startDate && notificationDate < filters.startDate) {
            return false;
          }
          
          if (filters.endDate && notificationDate > filters.endDate) {
            return false;
          }
          
          return true;
        });
      }

      callback(filteredNotifications);
    });

    // 리스너 저장
    this.listeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  // 알림 읽음 처리
  async markAsRead(notificationId: string): Promise<void> {
    try {
      const notificationRef = doc(db, this.collectionName, notificationId);
      await updateDoc(notificationRef, {
        isRead: true,
        readAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // 모든 알림 읽음 처리
  async markAllAsRead(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('recipientId', '==', userId),
        where('isRead', '==', false)
      );

      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      const timestamp = serverTimestamp();

      snapshot.docs.forEach((doc) => {
        batch.update(doc.ref, {
          isRead: true,
          readAt: timestamp
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // 알림 삭제
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const notificationRef = doc(db, this.collectionName, notificationId);
      await deleteDoc(notificationRef);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  // 사용자의 모든 알림 삭제
  async deleteAllUserNotifications(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('recipientId', '==', userId)
      );

      const snapshot = await getDocs(q);
      const batch = writeBatch(db);

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting all user notifications:', error);
      throw error;
    }
  }

  // 읽은 알림 삭제
  async deleteReadNotifications(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('recipientId', '==', userId),
        where('isRead', '==', true)
      );

      const snapshot = await getDocs(q);
      const batch = writeBatch(db);

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting read notifications:', error);
      throw error;
    }
  }

  // 알림 통계 조회
  async getNotificationStats(userId: string): Promise<NotificationStats> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('recipientId', '==', userId)
      );

      const snapshot = await getDocs(q);
      const notifications: Notification[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));

      // 통계 계산
      const stats: NotificationStats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.isRead).length,
        byType: {
          qna: 0,
          resource: 0,
          quote: 0,
          admin: 0,
          system: 0,
          file: 0,
          user: 0
        },
        byPriority: {
          low: 0,
          normal: 0,
          high: 0,
          urgent: 0
        },
        recent: notifications
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .slice(0, 5)
      };

      // 타입별 통계
      notifications.forEach(notification => {
        stats.byType[notification.type]++;
        stats.byPriority[notification.priority]++;
      });

      return stats;
    } catch (error) {
      console.error('Error getting notification stats:', error);
      throw error;
    }
  }

  // 만료된 알림 정리
  async cleanupExpiredNotifications(): Promise<void> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, this.collectionName),
        where('expiresAt', '<', now)
      );

      const snapshot = await getDocs(q);
      const batch = writeBatch(db);

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error cleaning up expired notifications:', error);
      throw error;
    }
  }

  // 특정 타입의 알림 조회
  async getNotificationsByType(
    userId: string,
    type: Notification['type'],
    limitCount: number = 20
  ): Promise<Notification[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('recipientId', '==', userId),
        where('type', '==', type),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
    } catch (error) {
      console.error('Error getting notifications by type:', error);
      throw error;
    }
  }

  // 미읽은 알림 수 조회 (실시간)
  subscribeToUnreadCount(
    userId: string,
    callback: (count: number) => void
  ): () => void {
    const q = query(
      collection(db, this.collectionName),
      where('recipientId', '==', userId),
      where('isRead', '==', false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      callback(snapshot.size);
    });

    return unsubscribe;
  }

  // 리스너 정리
  unsubscribeAll(): void {
    this.listeners.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.listeners.clear();
  }

  // 시스템 알림 생성 헬퍼
  async createSystemNotification(
    recipientId: string,
    title: string,
    message: string,
    data?: any
  ): Promise<string> {
    return this.createNotification({
      recipientId,
      type: 'system',
      title,
      message,
      data,
      priority: 'normal'
    });
  }

  // QnA 알림 생성 헬퍼
  async createQnANotification(
    recipientId: string,
    title: string,
    message: string,
    qnaId: string,
    senderId?: string
  ): Promise<string> {
    return this.createNotification({
      recipientId,
      senderId,
      type: 'qna',
      title,
      message,
      data: { qnaId },
      priority: 'normal',
      actionUrl: `/board/qna/${qnaId}`
    });
  }

  // 견적 요청 알림 생성 헬퍼
  async createQuoteNotification(
    recipientId: string,
    title: string,
    message: string,
    quoteId: string,
    senderId?: string
  ): Promise<string> {
    return this.createNotification({
      recipientId,
      senderId,
      type: 'quote',
      title,
      message,
      data: { quoteId },
      priority: 'high',
      actionUrl: `/admin/quotes/${quoteId}`
    });
  }

  // 파일 업로드 알림 생성 헬퍼
  async createFileNotification(
    recipientId: string,
    title: string,
    message: string,
    fileId: string,
    senderId?: string
  ): Promise<string> {
    return this.createNotification({
      recipientId,
      senderId,
      type: 'file',
      title,
      message,
      data: { fileId },
      priority: 'normal',
      actionUrl: `/admin/files`
    });
  }

  // 관리자 알림 생성 헬퍼 (모든 관리자에게)
  async createAdminNotification(
    title: string,
    message: string,
    data?: any,
    priority: Notification['priority'] = 'high'
  ): Promise<void> {
    // 관리자 목록 조회 로직은 별도 구현 필요
    // 현재는 예시로 하드코딩
    const adminIds = ['admin1', 'admin2']; // 실제로는 사용자 서비스에서 관리자 목록을 조회

    const notifications = adminIds.map(adminId => ({
      recipientId: adminId,
      type: 'admin' as const,
      title,
      message,
      data,
      priority
    }));

    await this.createBulkNotifications(notifications);
  }
}

export const notificationService = new NotificationService();
export default notificationService;