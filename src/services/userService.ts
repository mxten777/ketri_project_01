import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { deleteUser as deleteAuthUser } from 'firebase/auth';
import { db } from '../config/firebase';
import type { User } from '../types';

// 전체 회원 목록 조회
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 역할별 회원 조회
export const getUsersByRole = async (role: 'user' | 'admin'): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('role', '==', role),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error fetching users by role:', error);
    throw error;
  }
};

// 회원 역할 변경
export const updateUserRole = async (
  userId: string,
  newRole: 'user' | 'admin'
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: newRole,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// 회원 정보 업데이트
export const updateUserInfo = async (
  userId: string,
  data: Partial<User>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// 회원 삭제 (Firestore only - Auth 삭제는 사용자 본인만 가능)
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// 이메일로 회원 검색
export const searchUsersByEmail = async (email: string): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '>=', email), where('email', '<=', email + '\uf8ff'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error searching users by email:', error);
    throw error;
  }
};

// 이름으로 회원 검색
export const searchUsersByName = async (name: string): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', name),
      where('displayName', '<=', name + '\uf8ff')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error searching users by name:', error);
    throw error;
  }
};

// 회원 통계
export const getUserStats = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    const total = snapshot.size;
    const adminCount = snapshot.docs.filter(
      (doc) => doc.data().role === 'admin'
    ).length;
    const userCount = total - adminCount;

    return {
      total,
      adminCount,
      userCount,
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};
