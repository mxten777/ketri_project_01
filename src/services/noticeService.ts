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

// 세션 내 중복 조회수 방지 (React StrictMode의 useEffect 2회 실행 대응)
const viewedNoticeIds = new Set<string>();

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
        
        // Firestore Timestamp를 Date로 변환
        let createdAt: Date;
        let updatedAt: Date;
        
        if (data.createdAt?.toDate) {
          createdAt = data.createdAt.toDate();
        } else if (data.createdAt?.seconds) {
          createdAt = new Date(data.createdAt.seconds * 1000);
        } else if (typeof data.createdAt === 'string') {
          const parsed = new Date(data.createdAt);
          if (!isNaN(parsed.getTime())) {
            createdAt = parsed;
          } else {
            console.error(`Notice ${doc.id} has invalid date string:`, data.createdAt);
            createdAt = new Date(); // 현재 시간으로 폴백
          }
        } else {
          console.error(`Notice ${doc.id} has invalid createdAt:`, data.createdAt);
          createdAt = new Date(); // 현재 시간으로 폴백
        }
        
        if (data.updatedAt?.toDate) {
          updatedAt = data.updatedAt.toDate();
        } else if (data.updatedAt?.seconds) {
          updatedAt = new Date(data.updatedAt.seconds * 1000);
        } else if (typeof data.updatedAt === 'string') {
          const parsed = new Date(data.updatedAt);
          if (!isNaN(parsed.getTime())) {
            updatedAt = parsed;
          } else {
            updatedAt = createdAt;
          }
        } else {
          updatedAt = createdAt; // updatedAt이 없으면 createdAt 사용
        }
        
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
          createdAt,
          updatedAt,
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
      // 조회수 증가 (세션 내 중복 방지)
      if (!viewedNoticeIds.has(id)) {
        viewedNoticeIds.add(id);
        await updateDoc(docRef, {
          views: increment(1),
        });
      }

      const data = docSnap.data();
      
      // 날짜 변환 함수
      const convertToDate = (dateValue: unknown, fieldName: string): Date => {
        if (!dateValue) {
          console.warn(`${id}: ${fieldName} is null/undefined`);
          return new Date();
        }
        
        // Firestore Timestamp with toDate method
        if (typeof dateValue === 'object' && 'toDate' in dateValue && typeof (dateValue as any).toDate === 'function') {
          return (dateValue as any).toDate();
        }
        
        // Firestore Timestamp serialized (seconds field)
        if (typeof dateValue === 'object' && 'seconds' in dateValue && typeof (dateValue as any).seconds === 'number') {
          return new Date((dateValue as any).seconds * 1000);
        }
        
        // Date object
        if (dateValue instanceof Date) {
          if (isNaN(dateValue.getTime())) {
            console.error(`${id}: ${fieldName} is Invalid Date`);
            return new Date();
          }
          return dateValue;
        }
        
        // ISO string
        if (typeof dateValue === 'string') {
          const parsed = new Date(dateValue);
          if (!isNaN(parsed.getTime())) {
            return parsed;
          }
          console.error(`${id}: ${fieldName} invalid string: ${dateValue}`);
          return new Date();
        }
        
        console.error(`${id}: ${fieldName} unknown format:`, dateValue);
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
        createdAt: convertToDate(data.createdAt, 'createdAt'),
        updatedAt: convertToDate(data.updatedAt, 'updatedAt'),
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
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
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
      updatedAt: Timestamp.now(),
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
      
      // 날짜 변환
      let createdAt: Date;
      let updatedAt: Date;
      
      if (data.createdAt?.toDate) {
        createdAt = data.createdAt.toDate();
      } else if (data.createdAt?.seconds) {
        createdAt = new Date(data.createdAt.seconds * 1000);
      } else {
        console.error(`Pinned notice ${doc.id} has invalid createdAt:`, data.createdAt);
        createdAt = new Date();
      }
      
      if (data.updatedAt?.toDate) {
        updatedAt = data.updatedAt.toDate();
      } else if (data.updatedAt?.seconds) {
        updatedAt = new Date(data.updatedAt.seconds * 1000);
      } else {
        updatedAt = createdAt;
      }
      
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
        createdAt,
        updatedAt,
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

// 팝업 공지사항 조회 (최대 1개, isPopup=true만 체크)
export const getPopupNotice = async (): Promise<Notice | null> => {
  try {
    // orderBy 제거하여 인덱스 불필요하게 만듦
    const q = query(
      collection(db, COLLECTION_NAME),
      where("isPopup", "==", true),
      limit(10) // 여유있게 가져와서 메모리 정렬
    );
    
    const querySnapshot = await getDocs(q);
    logDev(`Found ${querySnapshot.docs.length} popup notices with isPopup=true`);
    
    if (querySnapshot.empty) {
      logDev("No active popup notice found");
      return null;
    }
    
    // status가 published인 공지만 필터링하고 날짜순 정렬
    const publishedNotices = querySnapshot.docs
      .map(doc => ({ doc, data: doc.data() }))
      .filter(({ data }) => data.status === "published")
      .sort((a, b) => {
        const aTime = a.data.createdAt?.seconds || 0;
        const bTime = b.data.createdAt?.seconds || 0;
        return bTime - aTime; // 최신순
      });
    
    if (publishedNotices.length === 0) {
      logDev("No published popup notice found after filtering");
      return null;
    }
    
    const { doc, data } = publishedNotices[0];
    
    // 날짜 변환
    let createdAt: Date;
    let updatedAt: Date;
    
    if (data.createdAt?.toDate) {
      createdAt = data.createdAt.toDate();
    } else if (data.createdAt?.seconds) {
      createdAt = new Date(data.createdAt.seconds * 1000);
    } else {
      createdAt = new Date();
    }
    
    if (data.updatedAt?.toDate) {
      updatedAt = data.updatedAt.toDate();
    } else if (data.updatedAt?.seconds) {
      updatedAt = new Date(data.updatedAt.seconds * 1000);
    } else {
      updatedAt = createdAt;
    }
    
    logDev(`Returning popup notice: ${doc.id} - ${data.title}`);
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
      createdAt,
      updatedAt,
      isPopup: data.isPopup || false,
    } as Notice;
  } catch (error) {
    logError("Error fetching popup notice:", error);
    return null; // 에러 시 조용히 null 반환 (팝업은 선택적 기능)
  }
};

// 다른 팝업 공지 비활성화 (저장 시 자동 호출)
export const disableOtherPopups = async (currentId?: string): Promise<void> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("isPopup", "==", true)
    );
    
    const querySnapshot = await getDocs(q);
    const batch: Promise<void>[] = [];
    
    querySnapshot.docs.forEach((doc) => {
      if (doc.id !== currentId) {
        batch.push(
          updateDoc(doc.ref, { isPopup: false })
        );
      }
    });
    
    await Promise.all(batch);
    logDev(`Disabled ${batch.length} other popup notices`);
  } catch (error) {
    logError("Error disabling other popups:", error);
    throw error;
  }
};
