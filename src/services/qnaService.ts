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
  increment,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { QnA, Comment } from '../types';

const qnaCollection = collection(db, 'qna');

// QnA 목록 조회 (카테고리 필터 옵션)
export const getQnAs = async (category?: string): Promise<QnA[]> => {
  try {
    let q = query(qnaCollection, orderBy('createdAt', 'desc'));
    
    if (category && category !== 'all') {
      q = query(qnaCollection, where('category', '==', category), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as QnA[];
  } catch (error) {
    console.error('Error fetching QnAs:', error);
    throw error;
  }
};

// QnA 상세 조회 + 조회수 증가
export const getQnaById = async (id: string): Promise<QnA | null> => {
  try {
    const docRef = doc(db, 'qna', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    // 조회수 증가
    await updateDoc(docRef, {
      views: increment(1),
    });

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as QnA;
  } catch (error) {
    console.error('Error fetching QnA:', error);
    throw error;
  }
};

// QnA 작성
export const createQna = async (qnaData: Omit<QnA, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'comments'>): Promise<string> => {
  try {
    const docRef = await addDoc(qnaCollection, {
      ...qnaData,
      views: 0,
      comments: [],
      isAnswered: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating QnA:', error);
    throw error;
  }
};

// QnA 수정
export const updateQna = async (id: string, qnaData: Partial<QnA>): Promise<void> => {
  try {
    const docRef = doc(db, 'qna', id);
    await updateDoc(docRef, {
      ...qnaData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating QnA:', error);
    throw error;
  }
};

// QnA 삭제
export const deleteQna = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'qna', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting QnA:', error);
    throw error;
  }
};

// 댓글 추가
export const addComment = async (qnaId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<void> => {
  try {
    const docRef = doc(db, 'qna', qnaId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('QnA not found');
    }

    const qna = docSnap.data() as QnA;
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: Timestamp.now(),
    };

    const updatedComments = [...(qna.comments || []), newComment];

    await updateDoc(docRef, {
      comments: updatedComments,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (qnaId: string, commentId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'qna', qnaId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('QnA not found');
    }

    const qna = docSnap.data() as QnA;
    const updatedComments = qna.comments?.filter(c => c.id !== commentId) || [];

    await updateDoc(docRef, {
      comments: updatedComments,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// 답변 완료 상태 변경 (관리자 전용)
export const toggleAnswered = async (qnaId: string, isAnswered: boolean): Promise<void> => {
  try {
    const docRef = doc(db, 'qna', qnaId);
    await updateDoc(docRef, {
      isAnswered,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error toggling answered status:', error);
    throw error;
  }
};
