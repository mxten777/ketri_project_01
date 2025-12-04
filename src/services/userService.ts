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

// ?„ì²´ ?Œì› ëª©ë¡ ì¡°íšŒ
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

// ??• ë³??Œì› ì¡°íšŒ
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

// ?Œì› ??•  ë³€ê²?
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

// ?Œì› ?•ë³´ ?…ë°?´íŠ¸
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

// ?Œì› ?? œ (Firestore only - Auth ?? œ???¬ìš©??ë³¸ì¸ë§?ê°€??
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// ?´ë©”?¼ë¡œ ?Œì› ê²€??
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

// ?´ë¦„?¼ë¡œ ?Œì› ê²€??
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

// ?Œì› ?µê³„
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
