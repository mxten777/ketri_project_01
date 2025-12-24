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
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { QnA, QnAFormData } from "../types";
import { logDev, logError } from "../utils/logger";

const COLLECTION_NAME = "qna";

// Q&A 목록 조회
export const getQnAs = async (options?: {
  limit?: number;
  status?: "pending" | "answered" | "closed";
}): Promise<QnA[]> => {
  try {
    logDev("Fetching Q&As from Firestore...");

    let q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    if (options?.status) {
      q = query(q, where("status", "==", options.status));
    }

    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    logDev(`Found ${querySnapshot.docs.length} Q&As`);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        content: data.content || "",
        category: data.category || "general",
        status: data.status || "pending",
        isSecret: data.isSecret || false,
        isPinned: data.isPinned || false,
        views: data.views || 0,
        authorId: data.authorId || "",
        authorName: data.authorName || "",
        authorEmail: data.authorEmail || "",
        answerContent: data.answerContent,
        answeredAt: data.answeredAt?.toDate?.(),
        answeredBy: data.answeredBy,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as QnA;
    });
  } catch (error) {
    logError("Error fetching Q&As:", error as Error);
    throw new Error("Q&A 목록을 불러오는데 실패했습니다.");
  }
};

// Q&A 상세 조회
export const getQnAById = async (id: string): Promise<QnA | null> => {
  try {
    logDev(`Fetching Q&A ${id} from Firestore...`);
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      logDev(`Q&A ${id} not found`);
      return null;
    }

    const data = docSnap.data();
    
    // 조회수 증가
    await updateDoc(docRef, {
      views: (data.views || 0) + 1,
    });

    return {
      id: docSnap.id,
      title: data.title || "",
      content: data.content || "",
      category: data.category || "general",
      status: data.status || "pending",
      isSecret: data.isSecret || false,
      isPinned: data.isPinned || false,
      views: (data.views || 0) + 1,
      authorId: data.authorId || "",
      authorName: data.authorName || "",
      authorEmail: data.authorEmail || "",
      answerContent: data.answerContent,
      answeredAt: data.answeredAt?.toDate?.(),
      answeredBy: data.answeredBy,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
    } as QnA;
  } catch (error) {
    logError(`Error fetching Q&A ${id}:`, error as Error);
    throw new Error("Q&A를 불러오는데 실패했습니다.");
  }
};

// Q&A 생성
export const createQnA = async (
  data: QnAFormData,
  userId: string,
  userName: string,
  userEmail: string
): Promise<string> => {
  try {
    logDev("Creating new Q&A in Firestore...");
    const now = Timestamp.now();

    const qnaData = {
      title: data.title,
      content: data.content,
      category: data.category,
      status: "pending" as const,
      isSecret: data.isSecret || false,
      isPinned: false,
      views: 0,
      authorId: userId,
      authorName: userName,
      authorEmail: userEmail,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), qnaData);
    logDev(`Q&A created with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    logError("Error creating Q&A:", error as Error);
    throw new Error("Q&A 작성에 실패했습니다.");
  }
};

// Q&A 수정
export const updateQnA = async (
  id: string,
  data: Partial<QnAFormData>
): Promise<void> => {
  try {
    logDev(`Updating Q&A ${id}...`);
    const docRef = doc(db, COLLECTION_NAME, id);

    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
    logDev(`Q&A ${id} updated successfully`);
  } catch (error) {
    logError(`Error updating Q&A ${id}:`, error as Error);
    throw new Error("Q&A 수정에 실패했습니다.");
  }
};

// Q&A 삭제
export const deleteQnA = async (id: string): Promise<void> => {
  try {
    logDev(`Deleting Q&A ${id}...`);
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    logDev(`Q&A ${id} deleted successfully`);
  } catch (error) {
    logError(`Error deleting Q&A ${id}:`, error as Error);
    throw new Error("Q&A 삭제에 실패했습니다.");
  }
};

// 답변 추가
export const addAnswer = async (
  qnaId: string,
  answerContent: string,
  answeredByIdOrName: string,
  answeredByName?: string
): Promise<void> => {
  try {
    logDev(`Adding answer to Q&A ${qnaId}...`);
    const docRef = doc(db, COLLECTION_NAME, qnaId);

    await updateDoc(docRef, {
      answerContent: answerContent,
      answeredBy: answeredByName || answeredByIdOrName,
      answeredAt: Timestamp.now(),
      status: "answered",
      updatedAt: Timestamp.now(),
    });

    logDev(`Answer added to Q&A ${qnaId} successfully`);
  } catch (error) {
    logError(`Error adding answer to Q&A ${qnaId}:`, error as Error);
    throw new Error("답변 작성에 실패했습니다.");
  }
};
