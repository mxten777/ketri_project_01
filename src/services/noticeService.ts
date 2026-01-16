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

    const startMs = Date.now();

    // 인덱스 없이 작동: createdAt만으로 정렬 후 메모리에서 isPinned 처리
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(limitCount * 2) // 고정글 필터링을 위해 더 많이 가져옴
    );

    // queryShape intentionally not stored to avoid unused-var; logging below uses explicit shape

    // Guard: avoid hanging indefinitely if Firestore doesn't respond
    const timeoutMs = 8000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore request timed out")), timeoutMs)
    );

    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    const elapsedMs = Date.now() - startMs;
    logDev(`Found ${querySnapshot.docs.length} notices (elapsed ${elapsedMs}ms)`);

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
        const aCreated = a.createdAt as unknown as { seconds?: number; getTime?: () => number };
        const bCreated = b.createdAt as unknown as { seconds?: number; getTime?: () => number };
        const aTime = aCreated?.seconds ? aCreated.seconds * 1000 : aCreated?.getTime?.() || 0;
        const bTime = bCreated?.seconds ? bCreated.seconds * 1000 : bCreated?.getTime?.() || 0;
        return bTime - aTime;
      })
      .slice(0, limitCount); // 원하는 개수만 반환

    // 캐시 저장 (직렬화: Date -> ISO)
    try {
      const serializable = notices.map((n) => ({
        ...n,
        createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : n.createdAt,
        updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : n.updatedAt,
      } as unknown as Notice));
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          "notices_cache",
          JSON.stringify({ ts: Date.now(), data: serializable })
        );
      }
    } catch (cacheErr) {
      logDev("Failed to write notices cache:", cacheErr);
    }

    return notices;
  } catch (error: unknown) {
    // Structured diagnostic log (safe for production)
    const e = error as { code?: string; message?: string } | undefined;
    const elapsedMs = undefined as number | undefined;

    try {
      console.error({
        operation: "notice-fetch",
        code: e?.code,
        message: e?.message || String(error),
        query: {
          collection: COLLECTION_NAME,
          orderBy: ["createdAt desc"],
          limit: limitCount * 2,
        },
        isOnline: typeof navigator !== "undefined" ? navigator.onLine : null,
        elapsedMs: elapsedMs > 0 ? elapsedMs : undefined,
      });
    } catch (logErr) {
      // swallow logging errors
      logError("Failed to emit structured notice-fetch log:", logErr);
    }

    // 캐시 폴백: 마지막 성공 데이터를 5분 TTL로 사용
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("notices_cache") : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { ts: number; data: Notice[] };
        if (parsed && Date.now() - parsed.ts < 5 * 60 * 1000) {
          logDev("Serving notices from cache (within TTL)");
          // deserialize createdAt (if stored as ISO)
          const deserialized = parsed.data.map((n) => ({
            ...n,
            createdAt: typeof n.createdAt === "string" ? new Date(n.createdAt) : n.createdAt,
            updatedAt: typeof n.updatedAt === "string" ? new Date(n.updatedAt) : n.updatedAt,
          }));
          return deserialized;
        }
      }
    } catch (cacheErr) {
      logDev("Cache read failed:", cacheErr);
    }

    // Firebase 에러 메시지를 더 명확하게
    if (e?.code === "permission-denied") {
      throw new Error(
        "데이터베이스 접근 권한이 없습니다. Firestore 규칙을 확인해주세요."
      );
    } else if (e?.code === "unavailable") {
      throw new Error(
        "데이터베이스 연결에 실패했습니다. 네트워크를 확인해주세요."
      );
    } else if (e?.code === "failed-precondition") {
      throw new Error(
        "데이터베이스 인덱스가 필요합니다. Firebase Console을 확인해주세요."
      );
    }

    throw new Error(e?.message || "공지사항을 불러오는데 실패했습니다.");
  }
};

// 공지사항 상세 조회
export const getNoticeById = async (id: string): Promise<Notice | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 조회수 증가
      await updateDoc(docRef, {
        views: increment(1),
      });

      const data = docSnap.data();
      
      // 날짜 변환 함수
      const convertToDate = (dateValue: unknown): Date => {
        if (!dateValue) return new Date();
        if (dateValue instanceof Date) return dateValue;
        if (typeof dateValue === 'string') return new Date(dateValue);
        if (typeof dateValue === 'object' && 'toDate' in dateValue && typeof (dateValue as any).toDate === 'function') {
          return (dateValue as any).toDate();
        }
        return new Date();
      };
      
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
        createdAt: convertToDate(data.createdAt),
        updatedAt: convertToDate(data.updatedAt),
      } as Notice;
    }

    return null;
  } catch (error) {
    logError("Error fetching notice:", error);
    return null;
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
    // createdAt 제외하고 업데이트 (원본 작성일 유지)
    const { createdAt, ...updateData } = noticeData;
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
  } catch (error) {
    logError("Error updating notice:", error);
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
    const startMs = Date.now();
    const querySnapshot = await getDocs(q);
    const elapsedMs = Date.now() - startMs;
    logDev(`Found ${querySnapshot.docs.length} pinned notices (elapsed ${elapsedMs}ms)`);

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
    const e = error as { code?: string; message?: string } | undefined;
    try {
      console.error({
        operation: "pinned-notices-fetch",
        code: e?.code,
        message: e?.message || String(error),
        query: { collection: COLLECTION_NAME, where: ["isPinned==true"], orderBy: ["createdAt desc"] },
        isOnline: typeof navigator !== "undefined" ? navigator.onLine : null,
      });
    } catch (logErr) {
      logError("Failed to emit structured pinned-notices log:", logErr);
    }

    logError("Error fetching pinned notices:", error);
    throw error;
  }
};
