import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  increment,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { FreePost } from "../types";

const FREE_COLLECTION = "freePosts";

// 게시글 목록 조회
export const getFreePosts = async (
  category?: string
): Promise<FreePost[]> => {
  try {
    let q = query(
      collection(db, FREE_COLLECTION),
      orderBy("createdAt", "desc")
    );

    if (category) {
      q = query(
        collection(db, FREE_COLLECTION),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FreePost[];
  } catch (error) {
    console.error("자유게시판 목록 조회 오류:", error);
    throw error;
  }
};

// 게시글 상세 조회
export const getFreePost = async (id: string): Promise<FreePost> => {
  try {
    const docRef = doc(db, FREE_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as FreePost;
  } catch (error) {
    console.error("자유게시판 상세 조회 오류:", error);
    throw error;
  }
};

// 게시글 작성
export const createFreePost = async (
  postData: Omit<FreePost, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, FREE_COLLECTION), {
      ...postData,
      views: 0,
      likes: 0,
      comments: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("자유게시판 작성 오류:", error);
    throw error;
  }
};

// 게시글 수정
export const updateFreePost = async (
  id: string,
  postData: Partial<FreePost>
): Promise<void> => {
  try {
    const docRef = doc(db, FREE_COLLECTION, id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("자유게시판 수정 오류:", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteFreePost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, FREE_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("자유게시판 삭제 오류:", error);
    throw error;
  }
};

// 조회수 증가
export const incrementFreePostViews = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, FREE_COLLECTION, id);
    await updateDoc(docRef, {
      views: increment(1),
    });
  } catch (error) {
    console.error("조회수 증가 오류:", error);
    throw error;
  }
};

// 좋아요 증가
export const incrementFreePostLikes = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, FREE_COLLECTION, id);
    await updateDoc(docRef, {
      likes: increment(1),
    });
  } catch (error) {
    console.error("좋아요 증가 오류:", error);
    throw error;
  }
};
