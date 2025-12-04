import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getCountFromServer,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types';

// 전체 통계 조회
export const getStatistics = async () => {
  try {
    // 회원 수
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getCountFromServer(usersRef);
    const totalUsers = usersSnapshot.data().count;

    // 공지사항 수
    const noticesRef = collection(db, 'notices');
    const noticesSnapshot = await getCountFromServer(noticesRef);
    const totalNotices = noticesSnapshot.data().count;

    // QnA 수
    const qnaRef = collection(db, 'qna');
    const qnaSnapshot = await getCountFromServer(qnaRef);
    const totalQna = qnaSnapshot.data().count;

    // 자료실 총 다운로드 수
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

// 최근 가입 회원 조회
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

// 최근 공지사항 조회
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
    const qnaRef = collection(db, 'qna');
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

// 월별 가입자 통계 (최근 6개월)
export const getMonthlyUserStats = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    const monthlyData: Record<string, number> = {};
    const now = new Date();
    
    // 최근 6개월 초기화
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = 0;
    }

    // 월별 카운트
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

// 카테고리별 QnA 통계
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

// 답변 완료율 통계
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

// 인기 자료 Top 5
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
