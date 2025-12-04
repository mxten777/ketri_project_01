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

// Í≥µÏ??¨Ìï≠ Î™©Î°ù Ï°∞Ìöå
export const getNotices = async (limitCount: number = 10): Promise<Notice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('isPinned', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;
  }
};

// Í≥µÏ??¨Ìï≠ ?ÅÏÑ∏ Ï°∞Ìöå
export const getNoticeById = async (id: string): Promise<Notice | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Ï°∞Ìöå??Ï¶ùÍ?
      await updateDoc(docRef, {
        views: increment(1)
      });
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching notice:', error);
    throw error;
  }
};

// Í≥µÏ??¨Ìï≠ ?ëÏÑ±
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

// Í≥µÏ??¨Ìï≠ ?òÏ†ï
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

// Í≥µÏ??¨Ìï≠ ??†ú
export const deleteNotice = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting notice:', error);
    throw error;
  }
};

// Ï§ëÏöî Í≥µÏ??¨Ìï≠ Ï°∞Ìöå
export const getPinnedNotices = async (): Promise<Notice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPinned', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching pinned notices:', error);
    throw error;
  }
};
