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
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Notice } from "../types";
import { logDev, logError } from "../utils/logger";

const COLLECTION_NAME = "notices";

// 공지사항 목록 조회
export const getNotices = async (
  limitCount: number = 10
): Promise<Notice[]> => {
  try {
    logDev("Fetching notices from Firestore...");

    // 인덱스 없이 작동: createdAt만으로 정렬 후 메모리에서 isPinned 처리
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(limitCount * 2) // 고정글 필터링을 위해 더 많이 가져옴
    );

    // Guard: avoid hanging indefinitely if Firestore doesn't respond
    const timeoutMs = 8000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore request timed out")), timeoutMs)
    );

    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    logDev(`Found ${querySnapshot.docs.length} notices`);

    // 메모리에서 정렬: isPinned 우선, 그 다음 createdAt
    const notices = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          noticeId: doc.id,
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          author: data.author || { uid: "", name: "" },
          category: data.category || "general",
          isPinned: data.isPinned || false,
          isImportant: data.isImportant || false,
          views: data.views || 0,
          viewCount: data.viewCount || 0,
          status: data.status || "published",
          attachments: data.attachments || [],
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Notice;
      })
      .sort((a, b) => {
        // isPinned 먼저 비교
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }
        // 같으면 createdAt으로 비교 (Timestamp와 Date 모두 지원)
        const aTime = a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : a.createdAt?.getTime?.() || 0;
        const bTime = b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : b.createdAt?.getTime?.() || 0;
        return bTime - aTime;
      })
      .slice(0, limitCount); // 원하는 개수만 반환

    return notices;
  } catch (error: any) {
    logError("Error fetching notices:", error);

    // Firebase 에러 메시지를 더 명확하게
    if (error?.code === "permission-denied") {
      throw new Error(
        "데이터베이스 접근 권한이 없습니다. Firestore 규칙을 확인해주세요."
      );
    } else if (error?.code === "unavailable") {
      throw new Error(
        "데이터베이스 연결에 실패했습니다. 네트워크를 확인해주세요."
      );
    } else if (error?.code === "failed-precondition") {
      throw new Error(
        "데이터베이스 인덱스가 필요합니다. Firebase Console을 확인해주세요."
      );
    }

    throw new Error(error?.message || "공지사항을 불러오는데 실패했습니다.");
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
        views: increment(1),
      });

      const data = docSnap.data();
      return {
        id: docSnap.id,
        noticeId: docSnap.id,
        title: data.title || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        author: data.author || { uid: "", name: "" },
        category: data.category || "general",
        isPinned: data.isPinned || false,
        isImportant: data.isImportant || false,
        views: data.views || 0,
        viewCount: data.viewCount || 0,
        status: data.status || "published",
        attachments: data.attachments || [],
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as Notice;
    }

    return null;
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};

// 공�??�항 ?�성
export const createNotice = async (
  noticeData: Omit<Notice, "id" | "createdAt" | "updatedAt" | "views">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...noticeData,
      views: 0,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString(),
    });

    return docRef.id;
  } catch (error) {
    logError("Error creating notice:", error);
    throw error;
  }
};

// 공�??�항 ?�정
export const updateNotice = async (
  id: string,
  noticeData: Partial<Notice>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...noticeData,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    throw error;
  }
};

// 공�??�항 ??��
export const deleteNotice = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    logError("Error deleting notice:", error);
    throw error;
  }
};

// 중요 공�??�항 조회
export const getPinnedNotices = async (): Promise<Notice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("isPinned", "==", true),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        noticeId: doc.id,
        title: data.title || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        author: data.author || { uid: "", name: "" },
        category: data.category || "general",
        isPinned: data.isPinned || false,
        isImportant: data.isImportant || false,
        views: data.views || 0,
        viewCount: data.viewCount || 0,
        status: data.status || "published",
        attachments: data.attachments || [],
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as Notice;
    });
  } catch (error) {
    console.error("Error fetching pinned notices:", error);
    throw error;
  }
};
