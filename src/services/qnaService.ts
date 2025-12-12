import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { QnA, QnAFormData } from "../types";

const QNA_COLLECTION = "qna";

// QnA 목록 조회
export const getQnAList = async (): Promise<QnA[]> => {
  try {
    const q = query(
      collection(db, QNA_COLLECTION),
      orderBy("isPinned", "desc"),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const qnaList: QnA[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      qnaList.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status || "pending",
        isSecret: data.isSecret || false,
        isPinned: data.isPinned || false,
        views: data.views || 0,
        authorId: data.authorId,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        answeredAt: data.answeredAt?.toDate(),
        answeredBy: data.answeredBy,
        answerContent: data.answerContent,
      });
    });

    return qnaList;
  } catch (error) {
    console.error("Error getting QnA list:", error);
    throw new Error("QnA 목록을 불러오는데 실패했습니다.");
  }
};

// QnA 상세 조회 (조회수 증가)
export const getQnAById = async (id: string): Promise<QnA | null> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    // 조회수 증가
    await updateDoc(docRef, {
      views: increment(1),
    });

    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      content: data.content,
      category: data.category,
      status: data.status || "pending",
      isSecret: data.isSecret || false,
      isPinned: data.isPinned || false,
      views: (data.views || 0) + 1, // 즉시 반영
      authorId: data.authorId,
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      answeredAt: data.answeredAt?.toDate(),
      answeredBy: data.answeredBy,
      answerContent: data.answerContent,
    };
  } catch (error) {
    console.error("Error getting QnA:", error);
    throw new Error("QnA를 불러오는데 실패했습니다.");
  }
};

// 새 QnA 작성
export const createQnA = async (
  qnaData: QnAFormData,
  userId: string,
  userName: string,
  userEmail: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, QNA_COLLECTION), {
      title: qnaData.title,
      content: qnaData.content,
      category: qnaData.category,
      status: "pending",
      isSecret: qnaData.isSecret || false,
      isPinned: false,
      views: 0,
      authorId: userId,
      authorName: userName,
      authorEmail: userEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating QnA:", error);
    throw new Error("QnA 작성에 실패했습니다.");
  }
};

// QnA 수정
export const updateQnA = async (
  id: string,
  qnaData: Partial<QnAFormData>
): Promise<void> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, id);
    await updateDoc(docRef, {
      ...qnaData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating QnA:", error);
    throw new Error("QnA 수정에 실패했습니다.");
  }
};

// QnA 삭제
export const deleteQnA = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, QNA_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting QnA:", error);
    throw new Error("QnA 삭제에 실패했습니다.");
  }
};

// 관리자 답변 작성
export const addAnswer = async (
  qnaId: string,
  answerContent: string,
  adminId: string,
  adminName: string
): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    // QnA 문서 업데이트
    const qnaRef = doc(db, QNA_COLLECTION, qnaId);
    batch.update(qnaRef, {
      status: "answered",
      answerContent: answerContent,
      answeredBy: adminName,
      answeredAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
  } catch (error) {
    console.error("Error adding answer:", error);
    throw new Error("답변 작성에 실패했습니다.");
  }
};

// 관리자 답변 수정
export const updateAnswer = async (
  qnaId: string,
  answerContent: string
): Promise<void> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, qnaId);
    await updateDoc(docRef, {
      answerContent: answerContent,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating answer:", error);
    throw new Error("답변 수정에 실패했습니다.");
  }
};

// 관리자 답변 삭제
export const deleteAnswer = async (qnaId: string): Promise<void> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, qnaId);
    await updateDoc(docRef, {
      status: "pending",
      answerContent: null,
      answeredBy: null,
      answeredAt: null,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw new Error("답변 삭제에 실패했습니다.");
  }
};

// QnA 상태 변경 (관리자용)
export const updateQnAStatus = async (
  id: string,
  status: "pending" | "answered" | "closed"
): Promise<void> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, id);
    await updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating QnA status:", error);
    throw new Error("QnA 상태 변경에 실패했습니다.");
  }
};

// QnA 핀 고정/해제 (관리자용)
export const toggleQnAPin = async (id: string, isPinned: boolean): Promise<void> => {
  try {
    const docRef = doc(db, QNA_COLLECTION, id);
    await updateDoc(docRef, {
      isPinned: isPinned,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error toggling QnA pin:", error);
    throw new Error("QnA 핀 고정 변경에 실패했습니다.");
  }
};

// 내가 작성한 QnA 조회
export const getMyQnAList = async (userId: string): Promise<QnA[]> => {
  try {
    const q = query(
      collection(db, QNA_COLLECTION),
      where("authorId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const qnaList: QnA[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      qnaList.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status || "pending",
        isSecret: data.isSecret || false,
        isPinned: data.isPinned || false,
        views: data.views || 0,
        authorId: data.authorId,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        answeredAt: data.answeredAt?.toDate(),
        answeredBy: data.answeredBy,
        answerContent: data.answerContent,
      });
    });

    return qnaList;
  } catch (error) {
    console.error("Error getting my QnA list:", error);
    throw new Error("내 QnA 목록을 불러오는데 실패했습니다.");
  }
};

// QnA 카테고리별 조회
export const getQnAByCategory = async (category: string): Promise<QnA[]> => {
  try {
    const q = query(
      collection(db, QNA_COLLECTION),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const qnaList: QnA[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      qnaList.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status || "pending",
        isSecret: data.isSecret || false,
        isPinned: data.isPinned || false,
        views: data.views || 0,
        authorId: data.authorId,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        answeredAt: data.answeredAt?.toDate(),
        answeredBy: data.answeredBy,
        answerContent: data.answerContent,
      });
    });

    return qnaList;
  } catch (error) {
    console.error("Error getting QnA by category:", error);
    throw new Error("카테고리별 QnA 목록을 불러오는데 실패했습니다.");
  }
};
