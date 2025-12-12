import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  listAll,
  getMetadata
} from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { storage, db } from '../config/firebase';

export interface UploadedFile {
  id?: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  category: string;
  tags: string[];
  description?: string;
  downloadURL: string;
  storagePath: string;
  uploadedBy: string;
  uploaderName: string;
  uploaderEmail: string;
  isPublic: boolean;
  downloadCount: number;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    pages?: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt?: Timestamp;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error' | 'paused';
  error?: string;
  downloadURL?: string;
}

export interface FileFilters {
  category?: string;
  fileType?: string;
  uploadedBy?: string;
  tags?: string[];
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
  isPublic?: boolean;
}

class FileUploadService {
  private collectionName = 'uploaded_files';

  // 파일 업로드
  async uploadFile(
    file: File,
    metadata: {
      category: string;
      tags?: string[];
      description?: string;
      isPublic?: boolean;
      uploaderInfo: {
        uid: string;
        name: string;
        email: string;
      };
    },
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;
    const storagePath = `uploads/${metadata.category}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
          if (onProgress) {
            onProgress({
              fileName: file.name,
              progress,
              status: 'uploading'
            });
          }
        },
        (error) => {
          console.error('Upload error:', error);
          if (onProgress) {
            onProgress({
              fileName: file.name,
              progress: 0,
              status: 'error',
              error: error.message
            });
          }
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Firestore에 파일 정보 저장
            const fileData: Omit<UploadedFile, 'id'> = {
              fileName,
              originalName: file.name,
              fileSize: file.size,
              fileType: file.type,
              category: metadata.category,
              tags: metadata.tags || [],
              description: metadata.description || '',
              downloadURL,
              storagePath,
              uploadedBy: metadata.uploaderInfo.uid,
              uploaderName: metadata.uploaderInfo.name,
              uploaderEmail: metadata.uploaderInfo.email,
              isPublic: metadata.isPublic ?? true,
              downloadCount: 0,
              metadata: await this.extractFileMetadata(file),
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now()
            };

            const docRef = await addDoc(collection(db, this.collectionName), fileData);
            
            if (onProgress) {
              onProgress({
                fileName: file.name,
                progress: 100,
                status: 'completed',
                downloadURL
              });
            }

            resolve(docRef.id);
          } catch (error) {
            console.error('Error saving file metadata:', error);
            reject(error);
          }
        }
      );
    });
  }

  // 여러 파일 업로드
  async uploadMultipleFiles(
    files: File[],
    metadata: {
      category: string;
      tags?: string[];
      description?: string;
      isPublic?: boolean;
      uploaderInfo: {
        uid: string;
        name: string;
        email: string;
      };
    },
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<string[]> {
    const progressMap = new Map<string, UploadProgress>();
    const uploadPromises = files.map(file => 
      this.uploadFile(file, metadata, (progress) => {
        progressMap.set(file.name, progress);
        if (onProgress) {
          onProgress(Array.from(progressMap.values()));
        }
      })
    );

    return Promise.all(uploadPromises);
  }

  // 파일 목록 조회
  async getFiles(
    filters: FileFilters = {},
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot
  ): Promise<{
    files: UploadedFile[];
    hasMore: boolean;
    lastDocument: QueryDocumentSnapshot | null;
  }> {
    try {
      const filesRef = collection(db, this.collectionName);
      
      const conditions = [];
      
      if (filters.category && filters.category !== 'all') {
        conditions.push(where('category', '==', filters.category));
      }
      
      if (filters.fileType && filters.fileType !== 'all') {
        conditions.push(where('fileType', '==', filters.fileType));
      }
      
      if (filters.uploadedBy) {
        conditions.push(where('uploadedBy', '==', filters.uploadedBy));
      }
      
      if (filters.isPublic !== undefined) {
        conditions.push(where('isPublic', '==', filters.isPublic));
      }

      conditions.push(orderBy('createdAt', 'desc'));
      conditions.push(limit(pageSize + 1));
      
      if (lastDoc) {
        conditions.push(startAfter(lastDoc));
      }

      const q = query(filesRef, ...conditions);
      const querySnapshot = await getDocs(q);
      
      const files: UploadedFile[] = [];
      const docs = querySnapshot.docs;
      
      docs.slice(0, pageSize).forEach(doc => {
        const data = doc.data();
        files.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          expiresAt: data.expiresAt || null
        } as UploadedFile);
      });

      // 클라이언트 필터링
      let filteredFiles = files;
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        filteredFiles = files.filter(file =>
          file.originalName.toLowerCase().includes(searchLower) ||
          file.description?.toLowerCase().includes(searchLower) ||
          file.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      return {
        files: filteredFiles,
        hasMore: docs.length > pageSize,
        lastDocument: docs.length > pageSize ? docs[pageSize - 1] : null
      };
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  // 파일 상세 조회
  async getFileById(id: string): Promise<UploadedFile | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDocs(query(collection(db, this.collectionName), where('__name__', '==', id)));
      
      if (!docSnap.empty) {
        const data = docSnap.docs[0].data();
        return {
          id: docSnap.docs[0].id,
          ...data,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          expiresAt: data.expiresAt || null
        } as UploadedFile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching file by ID:', error);
      throw error;
    }
  }

  // 파일 다운로드 (다운로드 수 증가)
  async downloadFile(id: string): Promise<string> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDocs(query(collection(db, this.collectionName), where('__name__', '==', id)));
      
      if (!docSnap.empty) {
        const data = docSnap.docs[0].data();
        
        // 다운로드 수 증가
        await updateDoc(docRef, {
          downloadCount: (data.downloadCount || 0) + 1,
          updatedAt: Timestamp.now()
        });
        
        return data.downloadURL;
      }
      
      throw new Error('File not found');
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  // 파일 삭제
  async deleteFile(id: string, userId: string, isAdmin: boolean = false): Promise<void> {
    try {
      const docSnap = await getDocs(query(collection(db, this.collectionName), where('__name__', '==', id)));
      
      if (!docSnap.empty) {
        const data = docSnap.docs[0].data();
        
        // 권한 확인
        if (data.uploadedBy !== userId && !isAdmin) {
          throw new Error('삭제 권한이 없습니다.');
        }

        // Storage에서 파일 삭제
        const storageRef = ref(storage, data.storagePath);
        await deleteObject(storageRef);

        // Firestore에서 메타데이터 삭제
        await deleteDoc(doc(db, this.collectionName, id));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // 파일 정보 업데이트
  async updateFileInfo(
    id: string, 
    updates: Partial<Pick<UploadedFile, 'description' | 'tags' | 'category' | 'isPublic'>>,
    userId: string,
    isAdmin: boolean = false
  ): Promise<void> {
    try {
      const docSnap = await getDocs(query(collection(db, this.collectionName), where('__name__', '==', id)));
      
      if (!docSnap.empty) {
        const data = docSnap.docs[0].data();
        
        // 권한 확인
        if (data.uploadedBy !== userId && !isAdmin) {
          throw new Error('수정 권한이 없습니다.');
        }

        await updateDoc(doc(db, this.collectionName, id), {
          ...updates,
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error updating file info:', error);
      throw error;
    }
  }

  // 파일 카테고리 목록 조회
  async getCategories(): Promise<string[]> {
    try {
      const filesRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(filesRef);
      
      const categories = new Set<string>();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.category) {
          categories.add(data.category);
        }
      });
      
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // 인기 태그 조회
  async getPopularTags(limit: number = 20): Promise<{ tag: string; count: number }[]> {
    try {
      const filesRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(filesRef);
      
      const tagCounts: Record<string, number> = {};
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
      
      return Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular tags:', error);
      return [];
    }
  }

  // 파일 통계 조회
  async getFileStatistics(): Promise<{
    totalFiles: number;
    totalSize: number;
    filesByCategory: Record<string, number>;
    filesByType: Record<string, number>;
    topUploaders: { name: string; count: number }[];
    recentUploads: { fileName: string; uploadedAt: string; uploaderName: string }[];
  }> {
    try {
      const filesRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(filesRef);
      
      let totalFiles = 0;
      let totalSize = 0;
      const filesByCategory: Record<string, number> = {};
      const filesByType: Record<string, number> = {};
      const uploaderCounts: Record<string, number> = {};
      const recentUploads: { fileName: string; uploadedAt: string; uploaderName: string }[] = [];
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        totalFiles++;
        totalSize += data.fileSize || 0;
        
        // 카테고리별 집계
        filesByCategory[data.category] = (filesByCategory[data.category] || 0) + 1;
        
        // 파일 타입별 집계
        const fileType = data.fileType.split('/')[0] || 'other';
        filesByType[fileType] = (filesByType[fileType] || 0) + 1;
        
        // 업로더별 집계
        uploaderCounts[data.uploaderName] = (uploaderCounts[data.uploaderName] || 0) + 1;
        
        // 최근 업로드 (최대 10개)
        if (recentUploads.length < 10) {
          recentUploads.push({
            fileName: data.originalName,
            uploadedAt: data.createdAt.toDate().toISOString(),
            uploaderName: data.uploaderName
          });
        }
      });
      
      const topUploaders = Object.entries(uploaderCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      return {
        totalFiles,
        totalSize,
        filesByCategory,
        filesByType,
        topUploaders,
        recentUploads: recentUploads.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )
      };
    } catch (error) {
      console.error('Error fetching file statistics:', error);
      throw error;
    }
  }

  // 파일 메타데이터 추출 (이미지, 비디오 등)
  private async extractFileMetadata(file: File): Promise<{
    width?: number;
    height?: number;
    duration?: number;
    pages?: number;
  }> {
    const metadata: any = {};

    if (file.type.startsWith('image/')) {
      try {
        const dimensions = await this.getImageDimensions(file);
        metadata.width = dimensions.width;
        metadata.height = dimensions.height;
      } catch (error) {
        console.warn('Could not extract image dimensions:', error);
      }
    }

    if (file.type.startsWith('video/')) {
      try {
        const duration = await this.getVideoDuration(file);
        metadata.duration = duration;
      } catch (error) {
        console.warn('Could not extract video duration:', error);
      }
    }

    return metadata;
  }

  // 이미지 크기 추출
  private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // 비디오 길이 추출
  private getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  }

  // 파일 타입 아이콘 반환
  getFileTypeIcon(fileType: string): string {
    const type = fileType.toLowerCase();
    
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📋';
    if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return '🗜️';
    if (type.includes('text')) return '📃';
    
    return '📁';
  }

  // 파일 크기 포맷
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileUploadService = new FileUploadService();