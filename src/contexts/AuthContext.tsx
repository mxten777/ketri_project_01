import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext.core";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { User } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore?�서 ?�용???�이??가?�오�?
  const fetchUserData = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // ?�원가??
  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Firebase Auth 프로필 업데이트
    await updateProfile(user, { displayName });

    // 환경변수에서 관리자 이메일 목록 가져오기
    const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || "";
    const adminEmails = adminEmailsEnv
      .split(",")
      .map((email: string) => email.trim());
    const isAdmin = adminEmails.includes(user.email || "");

    // Firestore에 저장할 사용자 데이터
    const newUser: User = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role: isAdmin ? "admin" : "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      emailVerified: user.emailVerified,
      bookmarks: [],
      preferences: {
        darkMode: false,
        notifications: {
          email: true,
          sms: false,
        },
      },
    };

    await setDoc(doc(db, "users", user.uid), newUser);
    setUserData(newUser);
  };

  // 로그??
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const data = await fetchUserData(userCredential.user.uid);
    setUserData(data);
  };

  // 로그?�웃
  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // ?�로???�데?�트
  const updateUserProfile = async (displayName: string) => {
    if (!currentUser) throw new Error("No user logged in");

    await updateProfile(currentUser, { displayName });
    await updateDoc(doc(db, "users", currentUser.uid), {
      displayName,
      updatedAt: new Date().toISOString(),
    });

    const data = await fetchUserData(currentUser.uid);
    setUserData(data);
  };

  // 비�?번호 변�?
  const changePassword = async (newPassword: string) => {
    if (!currentUser) throw new Error("No user logged in");
    await updatePassword(currentUser, newPassword);
  };

  // 비�?번호 ?�설???�메???�송
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // ?�원 ?�퇴
  const deleteAccount = async () => {
    if (!currentUser) throw new Error("No user logged in");
    await deleteUser(currentUser);
    setUserData(null);
  };

  // ?�용???�이???�로고침
  const refreshUserData = async () => {
    if (!currentUser) return;
    const data = await fetchUserData(currentUser.uid);
    setUserData(data);
  };

  // ?�증 ?�태 리스??
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    user: currentUser, // alias for compatibility
    userData,
    loading,
    isAdmin: userData?.role === "admin",
    signup,
    login,
    logout,
    updateUserProfile,
    changePassword,
    resetPassword,
    deleteAccount,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
