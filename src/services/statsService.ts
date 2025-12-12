import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getCountFromServer,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types';

// 대시보드 통계 타입 정의
export interface DashboardStats {
  totalUsers: number;
  totalQnAs: number;
  totalResources: number;
  totalNotices: number;
  totalDownloads: number;
  recentQnAs: number;
  recentResources: number;
  recentUsers: number;
  answerRate: number;
}

export interface RecentActivity {
  id: string;
  type: 'qna' | 'resource' | 'user' | 'notice';
  title: string;
  author: string;
  createdAt: Date;
  status?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  recentRegistrations: number;
}

// ?�체 ?�계 조회
export const getStatistics = async () => {
  try {
    // ?�원 ??
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getCountFromServer(usersRef);
    const totalUsers = usersSnapshot.data().count;

    // 공�??�항 ??
    const noticesRef = collection(db, 'notices');
    const noticesSnapshot = await getCountFromServer(noticesRef);
    const totalNotices = noticesSnapshot.data().count;

    // QnA ??
    const qnaRef = collection(db, 'qna');
    const qnaSnapshot = await getCountFromServer(qnaRef);
    const totalQna = qnaSnapshot.data().count;

    // ?�료??�??�운로드 ??
    const resourcesRef = collection(db, 'resources');
    const resourcesSnapshot = await getDocs(resourcesRef);
    const totalDownloads = resourcesSnapshot.docs.reduce(
      (sum, doc) => sum + (doc.data().downloads || 0),
      0
    );

    return {
      totalUsers,
      totalNotices,
      totalQna,
      totalDownloads,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

// 최근 가???�원 조회
export const getRecentUsers = async (limitCount: number = 10) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error fetching recent users:', error);
    throw error;
  }
};

// 최근 공�??�항 조회
export const getRecentNotices = async (limitCount: number = 5) => {
  try {
    const noticesRef = collection(db, 'notices');
    const q = query(noticesRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching recent notices:', error);
    throw error;
  }
};

// 최근 QnA 조회
export const getRecentQnA = async (limitCount: number = 5) => {
  try {
    const qnaRef = collection(db, 'qnas');
    const q = query(qnaRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching recent QnA:', error);
    throw error;
  }
};

// 최근 활동 통합 조회
export const getRecentActivities = async (limitCount: number = 10): Promise<RecentActivity[]> => {
  try {
    const activities: RecentActivity[] = [];

    // 최근 QnA 활동
    const qnasQuery = query(
      collection(db, 'qna'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const qnasSnapshot = await getDocs(qnasQuery);
    qnasSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        type: 'qna',
        title: data.title,
        author: data.authorName || '익명',
        createdAt: data.createdAt instanceof Date ? data.createdAt : (data.createdAt?.toDate?.() || new Date()),
        status: data.status || 'active',
      });
    });

    // 최근 자료 활동
    const resourcesQuery = query(
      collection(db, 'resources'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const resourcesSnapshot = await getDocs(resourcesQuery);
    resourcesSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        type: 'resource',
        title: data.title,
        author: data.authorName || '관리자',
        createdAt: data.createdAt instanceof Date ? data.createdAt : (data.createdAt?.toDate?.() || new Date()),
      });
    });

    // 최근 사용자 가입
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const usersSnapshot = await getDocs(usersQuery);
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        type: 'user',
        title: `${data.displayName || data.email}님이 가입했습니다`,
        author: 'System',
        createdAt: data.createdAt instanceof Date ? data.createdAt : (data.createdAt?.toDate?.() || new Date()),
      });
    });

    // 시간순 정렬 후 제한
    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limitCount);
  } catch (error) {
    console.error('최근 활동 조회 실패:', error);
    return []; // 에러 시 빈 배열 반환
  }
};

// ?�별 가?�자 ?�계 (최근 6개월)
export const getMonthlyUserStats = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    const monthlyData: Record<string, number> = {};
    const now = new Date();
    
    // 최근 6개월 초기??
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = 0;
    }

    // ?�별 카운??
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt) {
        const date = data.createdAt.toDate();
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (monthlyData[key] !== undefined) {
          monthlyData[key]++;
        }
      }
    });

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    }));
  } catch (error) {
    console.error('Error fetching monthly user stats:', error);
    throw error;
  }
};

// 카테고리�?QnA ?�계
export const getQnACategoryStats = async () => {
  try {
    const qnaRef = collection(db, 'qna');
    const snapshot = await getDocs(qnaRef);

    const categoryData: Record<string, number> = {
      general: 0,
      service: 0,
      technical: 0,
      account: 0,
    };

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const category = data.category || 'general';
      if (categoryData[category] !== undefined) {
        categoryData[category]++;
      }
    });

    return Object.entries(categoryData).map(([category, count]) => ({
      category,
      count,
    }));
  } catch (error) {
    console.error('Error fetching QnA category stats:', error);
    throw error;
  }
};

// ?��? ?�료???�계
export const getAnswerRate = async () => {
  try {
    const qnaRef = collection(db, 'qna');
    const snapshot = await getDocs(qnaRef);
    
    const total = snapshot.size;
    const answered = snapshot.docs.filter(
      (doc) => doc.data().isAnswered === true
    ).length;

    return {
      total,
      answered,
      rate: total > 0 ? Math.round((answered / total) * 100) : 0,
    };
  } catch (error) {
    console.error('Error fetching answer rate:', error);
    throw error;
  }
};

// ?�기 ?�료 Top 5
export const getPopularResources = async (limitCount: number = 5) => {
  try {
    const resourcesRef = collection(db, 'resources');
    const q = query(resourcesRef, orderBy('downloads', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching popular resources:', error);
    throw error;
  }
};

// 사용자 통계 조회
export const getUserStats = async (): Promise<UserStats> => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 전체 사용자 수
    const totalUsersQuery = query(collection(db, 'users'));
    const totalUsersSnapshot = await getCountFromServer(totalUsersQuery);
    const totalUsers = totalUsersSnapshot.data().count;

    // 활성 사용자 수 (30일 내 로그인)
    const activeUsersQuery = query(
      collection(db, 'users'),
      where('lastLoginAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
    );
    const activeUsersSnapshot = await getCountFromServer(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.data().count;

    // 관리자 사용자 수
    const adminUsersQuery = query(
      collection(db, 'users'),
      where('role', '==', 'admin')
    );
    const adminUsersSnapshot = await getCountFromServer(adminUsersQuery);
    const adminUsers = adminUsersSnapshot.data().count;

    // 최근 30일 가입자 수
    const recentRegistrationsQuery = query(
      collection(db, 'users'),
      where('createdAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
    );
    const recentRegistrationsSnapshot = await getCountFromServer(recentRegistrationsQuery);
    const recentRegistrations = recentRegistrationsSnapshot.data().count;

    return {
      totalUsers,
      activeUsers,
      adminUsers,
      recentRegistrations,
    };
  } catch (error) {
    console.error('사용자 통계 조회 실패:', error);
    throw error;
  }
};

// 월별 활동 통계 (차트용)
export const getMonthlyActivityStats = async (months: number = 6) => {
  try {
    const now = new Date();
    const monthlyData = [];

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      // QnA 통계
      const qnasQuery = query(
        collection(db, 'qnas'),
        where('createdAt', '>=', Timestamp.fromDate(monthStart)),
        where('createdAt', '<=', Timestamp.fromDate(monthEnd))
      );
      const qnasSnapshot = await getCountFromServer(qnasQuery);

      // 자료 통계
      const resourcesQuery = query(
        collection(db, 'resources'),
        where('createdAt', '>=', Timestamp.fromDate(monthStart)),
        where('createdAt', '<=', Timestamp.fromDate(monthEnd))
      );
      const resourcesSnapshot = await getCountFromServer(resourcesQuery);

      // 사용자 가입 통계
      const usersQuery = query(
        collection(db, 'users'),
        where('createdAt', '>=', Timestamp.fromDate(monthStart)),
        where('createdAt', '<=', Timestamp.fromDate(monthEnd))
      );
      const usersSnapshot = await getCountFromServer(usersQuery);

      monthlyData.push({
        month: monthStart.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'short' 
        }),
        qnas: qnasSnapshot.data().count,
        resources: resourcesSnapshot.data().count,
        users: usersSnapshot.data().count,
      });
    }

    return monthlyData;
  } catch (error) {
    console.error('월별 통계 조회 실패:', error);
    throw error;
  }
};

// 대시보드 통계 조회
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // 기본값으로 초기화
    const defaultStats = {
      totalUsers: 0,
      totalQnAs: 0,
      totalResources: 0,
      totalNotices: 0,
      totalDownloads: 0,
      activeUsers: 0,
      recentRegistrations: 0
    };

    try {
      const [usersCount, qnaCount, resourcesCount, noticesCount] = await Promise.all([
        getCountFromServer(collection(db, 'users')).catch(() => ({ data: () => ({ count: 0 }) })),
        getCountFromServer(collection(db, 'qna')).catch(() => ({ data: () => ({ count: 0 }) })),
        getCountFromServer(collection(db, 'resources')).catch(() => ({ data: () => ({ count: 0 }) })),
        getCountFromServer(collection(db, 'notices')).catch(() => ({ data: () => ({ count: 0 }) }))
      ]);

      let totalDownloads = 0;
      try {
        const resourcesSnapshot = await getDocs(collection(db, 'resources'));
        totalDownloads = resourcesSnapshot.docs.reduce(
          (sum, doc) => sum + (doc.data().downloads || 0), 0
        );
      } catch {
        totalDownloads = 0;
      }

      return {
        totalUsers: usersCount.data().count || 0,
        totalQnAs: qnaCount.data().count || 0,
        totalResources: resourcesCount.data().count || 0,
        totalNotices: noticesCount.data().count || 0,
        totalDownloads,
        activeUsers: usersCount.data().count || 0,
        recentRegistrations: 0
      };
    } catch {
      return defaultStats;
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      totalQnAs: 0,
      totalResources: 0,
      totalNotices: 0,
      totalDownloads: 0,
      activeUsers: 0,
      recentRegistrations: 0
    };
  }
};


