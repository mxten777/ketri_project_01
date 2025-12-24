import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { logError } from "../utils/logger";

export interface ContentItem {
  id?: string;
  title: string;
  content: string;
  type: "announcement" | "news" | "event" | "notice";
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  viewCount: number;
  likes: number;
  comments: number;
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  scheduledPublishAt?: Timestamp;
  seoTitle?: string;
  seoDescription?: string;
  thumbnailUrl?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export interface ContentFilters {
  type?: string;
  category?: string;
  status?: string;
  author?: string;
  featured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface ContentStatistics {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  archivedContent: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  contentByType: Record<string, number>;
  contentByCategory: Record<string, number>;
  recentActivity: {
    date: string;
    action: string;
    contentTitle: string;
    authorName: string;
  }[];
}

class ContentManagementService {
  private collectionName = "content";

  // 컨텐츠 목록 조회 (페이지네이션 및 필터링 지원)
  async getContent(
    filters: ContentFilters = {},
    pageSize: number = 10,
    lastDoc?: QueryDocumentSnapshot
  ): Promise<{
    content: ContentItem[];
    hasMore: boolean;
    lastDocument: QueryDocumentSnapshot | null;
  }> {
    try {
      const contentRef = collection(db, this.collectionName);

      // 쿼리 조건 구성
      const conditions = [];

      if (filters.type && filters.type !== "all") {
        conditions.push(where("type", "==", filters.type));
      }

      if (filters.category && filters.category !== "all") {
        conditions.push(where("category", "==", filters.category));
      }

      if (filters.status && filters.status !== "all") {
        conditions.push(where("status", "==", filters.status));
      }

      if (filters.author && filters.author !== "all") {
        conditions.push(where("authorId", "==", filters.author));
      }

      if (filters.featured !== undefined) {
        conditions.push(where("featured", "==", filters.featured));
      }

      // 정렬 및 페이지네이션 설정
      conditions.push(orderBy("createdAt", "desc"));
      conditions.push(limit(pageSize + 1)); // hasMore 판단을 위해 +1

      if (lastDoc) {
        conditions.push(startAfter(lastDoc));
      }

      const q = query(contentRef, ...conditions);
      const querySnapshot = await getDocs(q);

      const content: ContentItem[] = [];
      const docs = querySnapshot.docs;

      // 결과 처리
      docs.slice(0, pageSize).forEach((doc) => {
        const data = doc.data();
        content.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          publishedAt: data.publishedAt || null,
          scheduledPublishAt: data.scheduledPublishAt || null,
        } as ContentItem);
      });

      // 클라이언트에서 검색어 필터링 (제목, 내용, 태그 검색)
      let filteredContent = content;
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        filteredContent = content.filter(
          (item) =>
            item.title.toLowerCase().includes(searchLower) ||
            item.content.toLowerCase().includes(searchLower) ||
            item.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
            item.category.toLowerCase().includes(searchLower)
        );
      }

      return {
        content: filteredContent,
        hasMore: docs.length > pageSize,
        lastDocument: docs.length > pageSize ? docs[pageSize - 1] : null,
      };
    } catch (error) {
      logError("Error fetching content:", error);
      throw error;
    }
  }

  // 컨텐츠 상세 조회
  async getContentById(id: string): Promise<ContentItem | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          publishedAt: data.publishedAt || null,
          scheduledPublishAt: data.scheduledPublishAt || null,
        } as ContentItem;
      }

      return null;
    } catch (error) {
      logError("Error fetching content by ID:", error);
      throw error;
    }
  }

  // 컨텐츠 생성
  async createContent(
    contentData: Omit<
      ContentItem,
      "id" | "createdAt" | "updatedAt" | "viewCount" | "likes" | "comments"
    >
  ): Promise<string> {
    try {
      const now = Timestamp.now();

      const newContent = {
        ...contentData,
        viewCount: 0,
        likes: 0,
        comments: 0,
        createdAt: now,
        updatedAt: now,
        publishedAt: contentData.status === "published" ? now : null,
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        newContent
      );

      // 활동 로그 추가
      await this.addActivityLog(
        "created",
        contentData.title,
        contentData.author
      );

      return docRef.id;
    } catch (error) {
      logError("Error creating content:", error);
      throw error;
    }
  }

  // 컨텐츠 수정
  async updateContent(
    id: string,
    updates: Partial<ContentItem>
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData: Partial<Record<keyof ContentItem, unknown>> = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // 상태가 published로 변경되면 publishedAt 설정
      if (updates.status === "published" && !updates.publishedAt) {
        updateData.publishedAt = Timestamp.now();
      }

      await updateDoc(docRef, updateData);

      // 활동 로그 추가
      await this.addActivityLog(
        "updated",
        updates.title || "Unknown",
        updates.author || "Unknown"
      );
    } catch (error) {
      logError("Error updating content:", error);
      throw error;
    }
  }

  // 컨텐츠 삭제
  async deleteContent(id: string): Promise<void> {
    try {
      // 컨텐츠 정보 가져오기 (로그용)
      const content = await this.getContentById(id);

      await deleteDoc(doc(db, this.collectionName, id));

      // 활동 로그 추가
      if (content) {
        await this.addActivityLog("deleted", content.title, content.author);
      }
    } catch (error) {
      logError("Error deleting content:", error);
      throw error;
    }
  }

  // 컨텐츠 상태 변경 (일괄 처리)
  async updateContentStatus(
    ids: string[],
    status: "draft" | "published" | "archived"
  ): Promise<void> {
    try {
      const updatePromises = ids.map(async (id) => {
        const docRef = doc(db, this.collectionName, id);
        const updateData: Partial<Record<keyof ContentItem, unknown>> = {
          status,
          updatedAt: Timestamp.now(),
        };

        if (status === "published") {
          updateData.publishedAt = Timestamp.now();
        }

        return updateDoc(docRef, updateData);
      });

      await Promise.all(updatePromises);

      // 활동 로그 추가
      await this.addActivityLog(
        "bulk_status_update",
        `${ids.length} items to ${status}`,
        "Admin"
      );
    } catch (error) {
      logError("Error updating content status:", error);
      throw error;
    }
  }

  // 조회수 증가
  async incrementViewCount(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentViewCount = docSnap.data().viewCount || 0;
        await updateDoc(docRef, {
          viewCount: currentViewCount + 1,
        });
      }
    } catch (error) {
      logError("Error incrementing view count:", error);
      throw error;
    }
  }

  // 좋아요 토글
  async toggleLike(id: string, userId: string): Promise<boolean> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const likedUsers = data.likedUsers || [];
        const isLiked = likedUsers.includes(userId);

        const updatedLikedUsers = isLiked
          ? likedUsers.filter((id: string) => id !== userId)
          : [...likedUsers, userId];

        await updateDoc(docRef, {
          likes: updatedLikedUsers.length,
          likedUsers: updatedLikedUsers,
        });

        return !isLiked;
      }

      return false;
    } catch (error) {
      logError("Error toggling like:", error);
      throw error;
    }
  }

  // 컨텐츠 통계 조회
  async getContentStatistics(): Promise<ContentStatistics> {
    try {
      const contentRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(contentRef);

      let totalContent = 0;
      let publishedContent = 0;
      let draftContent = 0;
      let archivedContent = 0;
      let totalViews = 0;
      let totalLikes = 0;
      let totalComments = 0;
      const contentByType: Record<string, number> = {};
      const contentByCategory: Record<string, number> = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalContent++;

        // 상태별 집계
        if (data.status === "published") publishedContent++;
        else if (data.status === "draft") draftContent++;
        else if (data.status === "archived") archivedContent++;

        // 조회수, 좋아요, 댓글 집계
        totalViews += data.viewCount || 0;
        totalLikes += data.likes || 0;
        totalComments += data.comments || 0;

        // 타입별 집계
        contentByType[data.type] = (contentByType[data.type] || 0) + 1;

        // 카테고리별 집계
        contentByCategory[data.category] =
          (contentByCategory[data.category] || 0) + 1;
      });

      // 최근 활동 가져오기
      const recentActivity = await this.getRecentActivity(10);

      return {
        totalContent,
        publishedContent,
        draftContent,
        archivedContent,
        totalViews,
        totalLikes,
        totalComments,
        contentByType,
        contentByCategory,
        recentActivity,
      };
    } catch (error) {
      logError("Error fetching content statistics:", error);
      throw error;
    }
  }

  // 카테고리 목록 조회
  async getCategories(): Promise<string[]> {
    try {
      const contentRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(contentRef);

      const categories = new Set<string>();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category) {
          categories.add(data.category);
        }
      });

      return Array.from(categories).sort();
    } catch (error) {
      logError("Error fetching categories:", error);
      return [];
    }
  }

  // 인기 태그 조회
  async getPopularTags(
    limit: number = 20
  ): Promise<{ tag: string; count: number }[]> {
    try {
      const contentRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(contentRef);

      const tagCounts: Record<string, number> = {};

      querySnapshot.forEach((doc) => {
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
      logError("Error fetching popular tags:", error);
      return [];
    }
  }

  // 활동 로그 추가
  private async addActivityLog(
    action: string,
    contentTitle: string,
    authorName: string
  ): Promise<void> {
    try {
      await addDoc(collection(db, "content_activity"), {
        action,
        contentTitle,
        authorName,
        timestamp: Timestamp.now(),
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      logError("Error adding activity log:", error);
    }
  }

  // 최근 활동 조회
  private async getRecentActivity(limitCount: number = 10): Promise<
    {
      date: string;
      action: string;
      contentTitle: string;
      authorName: string;
    }[]
  > {
    try {
      const activityRef = collection(db, "content_activity");
      const q = query(
        activityRef,
        orderBy("timestamp", "desc"),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);

      const activities: {
        date: string;
        action: string;
        contentTitle: string;
        authorName: string;
      }[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activities.push({
          date: data.date,
          action: data.action,
          contentTitle: data.contentTitle,
          authorName: data.authorName,
        });
      });

      return activities;
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }
  }
}

export const contentManagementService = new ContentManagementService();
