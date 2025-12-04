import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { QuoteRequest } from '../types';

const quotesCollection = collection(db, 'quotes');

// 견적 요청 목록 조회 (관리자용)
export const getAllQuotes = async (): Promise<QuoteRequest[]> => {
  try {
    const q = query(quotesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as QuoteRequest[];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

// 상태별 견적 요청 조회
export const getQuotesByStatus = async (
  status: 'pending' | 'reviewed' | 'completed' | 'rejected'
): Promise<QuoteRequest[]> => {
  try {
    const q = query(
      quotesCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as QuoteRequest[];
  } catch (error) {
    console.error('Error fetching quotes by status:', error);
    throw error;
  }
};

// 사용자별 견적 요청 조회
export const getQuotesByUser = async (userId: string): Promise<QuoteRequest[]> => {
  try {
    const q = query(
      quotesCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as QuoteRequest[];
  } catch (error) {
    console.error('Error fetching user quotes:', error);
    throw error;
  }
};

// 견적 요청 상세 조회
export const getQuoteById = async (id: string): Promise<QuoteRequest | null> => {
  try {
    const docRef = doc(db, 'quotes', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as QuoteRequest;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

// 견적 요청 생성
export const createQuote = async (
  quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> => {
  try {
    const docRef = await addDoc(quotesCollection, {
      ...quoteData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

// 견적 요청 상태 업데이트
export const updateQuoteStatus = async (
  id: string,
  status: 'pending' | 'reviewed' | 'completed' | 'rejected',
  adminNote?: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'quotes', id);
    await updateDoc(docRef, {
      status,
      ...(adminNote && { adminNote }),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating quote status:', error);
    throw error;
  }
};

// 견적 요청 삭제
export const deleteQuote = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'quotes', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

// 견적 요청 통계
export const getQuoteStats = async () => {
  try {
    const snapshot = await getDocs(quotesCollection);
    
    const stats = {
      total: snapshot.size,
      pending: 0,
      reviewed: 0,
      completed: 0,
      rejected: 0,
    };

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const status = data.status as string;
      if (status in stats) {
        stats[status as keyof typeof stats]++;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error fetching quote stats:', error);
    throw error;
  }
};

// 서비스 타입별 견적 요청 수
export const getQuotesByService = async () => {
  try {
    const snapshot = await getDocs(quotesCollection);
    
    const serviceStats: Record<string, number> = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const serviceType = data.serviceType as string;
      serviceStats[serviceType] = (serviceStats[serviceType] || 0) + 1;
    });

    return serviceStats;
  } catch (error) {
    console.error('Error fetching quotes by service:', error);
    throw error;
  }
};
