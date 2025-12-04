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
 * ?µÌï© Í≤Ä??- Í≥µÏ??¨Ìï≠, QnA, ?êÎ£å???ÑÏ≤¥ Í≤Ä??
 */
export const searchAll = async (searchTerm: string): Promise<SearchResult[]> => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const term = searchTerm.toLowerCase().trim();
  const results: SearchResult[] = [];

  try {
    // Í≥µÏ??¨Ìï≠ Í≤Ä??
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
          author: data.author || 'Í¥ÄÎ¶¨Ïûê',
          createdAt: data.createdAt,
          category: data.category || '?ºÎ∞ò'
        });
      }
    });

    // QnA Í≤Ä??
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
          author: data.authorName || '?µÎ™Ö',
          createdAt: data.createdAt,
          category: data.category || '?ºÎ∞ò',
          isAnswered: data.isAnswered || false
        });
      }
    });

    // ?êÎ£å??Í≤Ä??
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
          author: data.uploaderName || 'Í¥ÄÎ¶¨Ïûê',
          createdAt: data.createdAt,
          category: data.category || '?ºÎ∞ò',
          fileName: data.fileName,
          fileUrl: data.fileUrl
        });
      }
    });

    // ÏµúÏã†?úÏúºÎ°??ïÎ†¨
    results.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    return results;
  } catch (error) {
    console.error('?µÌï© Í≤Ä???§Ìå®:', error);
    throw error;
  }
};

/**
 * ?Ä?ÖÎ≥Ñ Í≤Ä??
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

  try {
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
          author: data.author || data.authorName || data.uploaderName || 'Í¥ÄÎ¶¨Ïûê',
          createdAt: data.createdAt,
          category: data.category || '?ºÎ∞ò',
          ...(type === 'qna' && { isAnswered: data.isAnswered || false }),
          ...(type === 'resource' && { 
            fileName: data.fileName,
            fileUrl: data.fileUrl
          })
        });
      }
    });

    // ÏµúÏã†???ïÎ†¨
    results.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    return results;
  } catch (error) {
    console.error(`${type} Í≤Ä???§Ìå®:`, error);
    throw error;
  }
};

/**
 * ÏµúÍ∑º Í≤Ä?âÏñ¥ ?Ä??
 */
export const saveRecentSearch = (searchTerm: string) => {
  try {
    const recentSearches = getRecentSearches();
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch (error) {
    console.error('ÏµúÍ∑º Í≤Ä?âÏñ¥ ?Ä???§Ìå®:', error);
  }
};

/**
 * ÏµúÍ∑º Í≤Ä?âÏñ¥ Ï°∞Ìöå
 */
export const getRecentSearches = (): string[] => {
  try {
    const searches = localStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('ÏµúÍ∑º Í≤Ä?âÏñ¥ Ï°∞Ìöå ?§Ìå®:', error);
    return [];
  }
};

/**
 * ÏµúÍ∑º Í≤Ä?âÏñ¥ ??†ú
 */
export const clearRecentSearches = () => {
  try {
    localStorage.removeItem('recentSearches');
  } catch (error) {
    console.error('ÏµúÍ∑º Í≤Ä?âÏñ¥ ??†ú ?§Ìå®:', error);
  }
};

/**
 * ?πÏ†ï Í≤Ä?âÏñ¥ ??†ú
 */
export const removeRecentSearch = (searchTerm: string) => {
  try {
    const recentSearches = getRecentSearches();
    const updated = recentSearches.filter(s => s !== searchTerm);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch (error) {
    console.error('Í≤Ä?âÏñ¥ ??†ú ?§Ìå®:', error);
  }
};
