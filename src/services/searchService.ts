import {
  collection,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface SearchResult {
  id: string;
  type: 'notice' | 'qna' | 'resource';
  title: string;
  content?: string;
  excerpt?: string;
  author?: string;
  createdAt: Timestamp;
  category?: string;
  isAnswered?: boolean;
  fileName?: string;
  fileUrl?: string;
}

/**
 * ?�합 검??- 공�??�항, QnA, ?�료???�체 검??
 */
export const searchAll = async (searchTerm: string): Promise<SearchResult[]> => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const term = searchTerm.toLowerCase().trim();
  const results: SearchResult[] = [];

  // 공지사항 검색
  const noticesRef = collection(db, 'notices');
  const noticesSnapshot = await getDocs(noticesRef);

  noticesSnapshot.forEach((doc) => {
    const data = doc.data();
    const titleMatch = data.title?.toLowerCase().includes(term);
    const contentMatch = data.content?.toLowerCase().includes(term);

    if (titleMatch || contentMatch) {
      results.push({
        id: doc.id,
        type: 'notice',
        title: data.title || '',
        content: data.content || '',
        excerpt: data.content ? data.content.substring(0, 150) : '',
        author: data.author || '관리자',
        createdAt: data.createdAt,
        category: data.category || '일반'
      });
    }
  });

  // QnA 검색
  const qnaRef = collection(db, 'qna');
  const qnaSnapshot = await getDocs(qnaRef);

  qnaSnapshot.forEach((doc) => {
    const data = doc.data();
    const titleMatch = data.title?.toLowerCase().includes(term);
    const contentMatch = data.content?.toLowerCase().includes(term);

    if (titleMatch || contentMatch) {
      results.push({
        id: doc.id,
        type: 'qna',
        title: data.title || '',
        content: data.content || '',
        excerpt: data.content ? data.content.substring(0, 150) : '',
        author: data.authorName || '익명',
        createdAt: data.createdAt,
        category: data.category || '일반',
        isAnswered: data.isAnswered || false
      });
    }
  });

  // 자료 검색
  const resourcesRef = collection(db, 'resources');
  const resourcesSnapshot = await getDocs(resourcesRef);

  resourcesSnapshot.forEach((doc) => {
    const data = doc.data();
    const titleMatch = data.title?.toLowerCase().includes(term);
    const descriptionMatch = data.description?.toLowerCase().includes(term);
    const fileNameMatch = data.fileName?.toLowerCase().includes(term);

    if (titleMatch || descriptionMatch || fileNameMatch) {
      results.push({
        id: doc.id,
        type: 'resource',
        title: data.title || '',
        content: data.description || '',
        excerpt: data.description ? data.description.substring(0, 150) : '',
        author: data.uploaderName || '관리자',
        createdAt: data.createdAt,
        category: data.category || '일반',
        fileName: data.fileName,
        fileUrl: data.fileUrl
      });
    }
  });

  // 최신순 정렬
  results.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() || 0;
    const bTime = b.createdAt?.toMillis?.() || 0;
    return bTime - aTime;
  });

  return results;
};

/**
 * ?�?�별 검??
 */
export const searchByType = async (
  searchTerm: string,
  type: 'notice' | 'qna' | 'resource'
): Promise<SearchResult[]> => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const term = searchTerm.toLowerCase().trim();
  const results: SearchResult[] = [];

  const collectionName = type === 'resource' ? 'resources' : type === 'qna' ? 'qna' : 'notices';
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((doc) => {
    const data = doc.data();
    let match = false;

    if (type === 'resource') {
      match =
        data.title?.toLowerCase().includes(term) ||
        data.description?.toLowerCase().includes(term) ||
        data.fileName?.toLowerCase().includes(term);
    } else {
      match =
        data.title?.toLowerCase().includes(term) ||
        data.content?.toLowerCase().includes(term);
    }

    if (match) {
      results.push({
        id: doc.id,
        type,
        title: data.title || '',
        content: data.content || data.description || '',
        excerpt: (data.content || data.description || '').substring(0, 150),
        author: data.author || data.authorName || data.uploaderName || '관리자',
        createdAt: data.createdAt,
        category: data.category || '일반',
        ...(type === 'qna' && { isAnswered: data.isAnswered || false }),
        ...(type === 'resource' && {
          fileName: data.fileName,
          fileUrl: data.fileUrl,
        }),
      });
    }
  });

  // 최신순 정렬
  results.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() || 0;
    const bTime = b.createdAt?.toMillis?.() || 0;
    return bTime - aTime;
  });

  return results;
};

/**
 * 최근 검?�어 ?�??
 */
export const saveRecentSearch = (searchTerm: string) => {
  try {
    const recentSearches = getRecentSearches();
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch (error) {
    // ignore storage errors in cleanup
  }
};

/**
 * 최근 검?�어 조회
 */
export const getRecentSearches = (): string[] => {
  try {
    const searches = localStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    return [];
  }
};

/**
 * 최근 검?�어 ??��
 */
export const clearRecentSearches = () => {
  try {
    localStorage.removeItem('recentSearches');
  } catch (error) {
    // ignore
  }
};

/**
 * ?�정 검?�어 ??��
 */
export const removeRecentSearch = (searchTerm: string) => {
  try {
    const recentSearches = getRecentSearches();
    const updated = recentSearches.filter(s => s !== searchTerm);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch (error) {
    // ignore
  }
};
