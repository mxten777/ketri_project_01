import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { User } from '@/types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  user: FirebaseUser | null; // alias for compatibility
  userData: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore에서 사용자 데이터 가져오기
  const fetchUserData = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // 회원가입
  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firebase Auth 프로필 업데이트
    await updateProfile(user, { displayName });

    // 특정 이메일은 자동으로 관리자 권한 부여
    const adminEmails = ['jngdy@naver.com'];
    const isAdmin = adminEmails.includes(user.email || '');

    // Firestore에 사용자 데이터 저장
    const newUser: User = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role: isAdmin ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', user.uid), newUser);
    setUserData(newUser);
  };

  // 로그인
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const data = await fetchUserData(userCredential.user.uid);
    setUserData(data);
  };

  // 로그아웃
  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // 프로필 업데이트
  const updateUserProfile = async (displayName: string) => {
    if (!currentUser) throw new Error('No user logged in');

    await updateProfile(currentUser, { displayName });
    await updateDoc(doc(db, 'users', currentUser.uid), {
      displayName,
      updatedAt: new Date().toISOString(),
    });

    const data = await fetchUserData(currentUser.uid);
    setUserData(data);
  };

  // 비밀번호 변경
  const changePassword = async (newPassword: string) => {
    if (!currentUser) throw new Error('No user logged in');
    await updatePassword(currentUser, newPassword);
  };

  // 비밀번호 재설정 이메일 전송
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // 회원 탈퇴
  const deleteAccount = async () => {
    if (!currentUser) throw new Error('No user logged in');
    await deleteUser(currentUser);
    setUserData(null);
  };

  // 사용자 데이터 새로고침
  const refreshUserData = async () => {
    if (!currentUser) return;
    const data = await fetchUserData(currentUser.uid);
    setUserData(data);
  };

  // 인증 상태 리스너
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
