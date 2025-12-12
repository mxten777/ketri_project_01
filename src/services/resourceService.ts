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
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Resource } from '../types';

const resourcesCollection = collection(db, 'resources');

// 자료실 목록 조회 (카테고리 필터 옵션)
export const getResources = async (category?: string): Promise<Resource[]> => {
  try {
    let q = query(resourcesCollection, orderBy('createdAt', 'desc'));
    
    if (category && category !== 'all') {
      q = query(resourcesCollection, where('category', '==', category), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// 자료 상세 조회 + 조회수 증가
export const getResourceById = async (id: string): Promise<Resource | null> => {
  try {
    const docRef = doc(db, 'resources', id);
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
    } as Resource;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

// 파일 업로드 (Firebase Storage)
export const uploadFile = async (file: File, category: string): Promise<{ fileUrl: string; fileName: string; fileSize: number; fileType: string }> => {
  try {
    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('파일 크기는 10MB를 초과할 수 없습니다.');
    }

    // 허용된 파일 형식 확인
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-zip-compressed',
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('지원하지 않는 파일 형식입니다.');
    }

    // 파일명 생성 (timestamp + 원본 파일명)
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${timestamp}_${safeFileName}`;
    
    // Storage 참조 생성
    const storageRef = ref(storage, `resources/${category}/${fileName}`);
    
    // 파일 업로드
    await uploadBytes(storageRef, file);
    
    // 다운로드 URL 가져오기
    const fileUrl = await getDownloadURL(storageRef);
    
    return {
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// 자료 등록
export const createResource = async (resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt' | 'downloads' | 'views'>): Promise<string> => {
  try {
    const docRef = await addDoc(resourcesCollection, {
      ...resourceData,
      downloads: 0,
      views: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

// 자료 수정
export const updateResource = async (id: string, resourceData: Partial<Resource>): Promise<void> => {
  try {
    const docRef = doc(db, 'resources', id);
    await updateDoc(docRef, {
      ...resourceData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

// 자료 삭제 (파일도 함께 삭제)
export const deleteResource = async (id: string, fileUrl: string): Promise<void> => {
  try {
    // Firestore 문서 삭제
    const docRef = doc(db, 'resources', id);
    await deleteDoc(docRef);

    // Storage 파일 삭제
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (storageError) {
      console.warn('파일 삭제 실패 (이미 삭제되었거나 존재하지 않을 수 있음):', storageError);
    }
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};

// 다운로드 카운트 증가
export const incrementDownloadCount = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'resources', id);
    await updateDoc(docRef, {
      downloads: increment(1),
    });
  } catch (error) {
    console.error('Error incrementing download count:', error);
    throw error;
  }
};



// 파일 다운로드
export const downloadFile = async (fileUrl: string, fileName: string, resourceId: string): Promise<void> => {
  try {
    // 다운로드 카운트 증가
    await incrementDownloadCount(resourceId);

    // 파일 다운로드
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};
