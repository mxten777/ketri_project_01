import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Notice } from '../types';

const COLLECTION_NAME = 'notices';

// 공�??�항 목록 조회
export const getNotices = async (limitCount: number = 10): Promise<Notice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('isPinned', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        noticeId: doc.id,
        title: data.title || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        author: data.author || { uid: '', name: '' },
        category: data.category || 'general',
        isPinned: data.isPinned || false,
        isImportant: data.isImportant || false,
        views: data.views || 0,
        viewCount: data.viewCount || 0,
        status: data.status || 'published',
        attachments: data.attachments || [],
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as Notice;
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;
  }
};

// 공�??�항 ?�세 조회
export const getNoticeById = async (id: string): Promise<Notice | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // 조회??증�?
      await updateDoc(docRef, {
        views: increment(1)
      });
      
      const data = docSnap.data();
      return {
        id: docSnap.id,
        noticeId: docSnap.id,
        title: data.title || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        author: data.author || { uid: '', name: '' },
        category: data.category || 'general',
        isPinned: data.isPinned || false,
        isImportant: data.isImportant || false,
        views: data.views || 0,
        viewCount: data.viewCount || 0,
        status: data.status || 'published',
        attachments: data.attachments || [],
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as Notice;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching notice:', error);
    throw error;
  }
};

// 공�??�항 ?�성
export const createNotice = async (noticeData: Omit<Notice, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...noticeData,
      views: 0,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating notice:', error);
    throw error;
  }
};

// 공�??�항 ?�정
export const updateNotice = async (id: string, noticeData: Partial<Notice>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...noticeData,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error updating notice:', error);
    throw error;
  }
};

// 공�??�항 ??��
export const deleteNotice = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting notice:', error);
    throw error;
  }
};

// 중요 공�??�항 조회
export const getPinnedNotices = async (): Promise<Notice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPinned', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        noticeId: doc.id,
        title: data.title || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        author: data.author || { uid: '', name: '' },
        category: data.category || 'general',
        isPinned: data.isPinned || false,
        isImportant: data.isImportant || false,
        views: data.views || 0,
        viewCount: data.viewCount || 0,
        status: data.status || 'published',
        attachments: data.attachments || [],
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as Notice;
    });
  } catch (error) {
    console.error('Error fetching pinned notices:', error);
    throw error;
  }
};
