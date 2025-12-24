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
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { FreePost, FreeFormData } from "../types";
import { logDev, logError } from "../utils/logger";

const COLLECTION_NAME = "free";

export const getFreePosts = async (options?: { limit?: number }): Promise<FreePost[]> => {
  try {
    logDev("Fetching free posts from Firestore...");

    let q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    if (options?.limit) q = query(q, limit(options.limit));

    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        content: data.content || "",
        category: data.category || "general",
        views: data.views || 0,
        likes: data.likes || 0,
        authorId: data.authorId || "",
        authorName: data.authorName || "",
        authorEmail: data.authorEmail || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        comments: data.comments || [],
        isPinned: data.isPinned || false,
      } as FreePost;
    });
  } catch (error: unknown) {
    logError("Error fetching free posts:", error);
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
};

export const getFreePost = async (id: string): Promise<FreePost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: snap.id,
      title: data.title || "",
      content: data.content || "",
      category: data.category || "general",
      views: data.views || 0,
      likes: data.likes || 0,
      authorId: data.authorId || "",
      authorName: data.authorName || "",
      authorEmail: data.authorEmail || "",
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
      comments: data.comments || [],
      isPinned: data.isPinned || false,
    } as FreePost;
  } catch (error: unknown) {
    logError(`Error fetching free post ${id}:`, error);
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
};

export const createFreePost = async (data: FreeFormData & Partial<FreePost>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const payload = {
      title: data.title,
      content: data.content,
      category: data.category,
      views: data.views ?? 0,
      likes: data.likes ?? 0,
      authorId: data.authorId ?? "",
      authorName: data.authorName ?? "",
      authorEmail: data.authorEmail ?? "",
      comments: data.comments ?? [],
      isPinned: data.isPinned ?? false,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
  } catch (error: unknown) {
    logError("Error creating free post:", error);
    throw new Error("게시글 작성에 실패했습니다.");
  }
};

export const updateFreePost = async (id: string, data: Partial<FreeFormData & FreePost>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error: unknown) {
    logError(`Error updating free post ${id}:`, error);
    throw new Error("게시글 수정에 실패했습니다.");
  }
};

export const deleteFreePost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error: unknown) {
    logError(`Error deleting free post ${id}:`, error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
};

export const incrementFreePostViews = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { views: 0 });
  } catch (error: unknown) {
    logError(`Error incrementing views for ${id}:`, error);
  }
};

export const incrementFreePostLikes = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { likes: 0 });
  } catch (error: unknown) {
    logError(`Error incrementing likes for ${id}:`, error);
  }
};
