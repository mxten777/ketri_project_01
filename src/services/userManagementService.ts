import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { User } from "../types";

export interface UserListOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  roleFilter?: "all" | "admin" | "user";
  statusFilter?: "all" | "active" | "inactive";
  sortBy?: "createdAt" | "lastLoginAt" | "displayName" | "email";
  sortOrder?: "asc" | "desc";
}

export interface UserListResult {
  users: User[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  action:
    | "login"
    | "logout"
    | "profile_update"
    | "password_change"
    | "role_change";
  details?: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

// 사용자 목록 조회 (페이지네이션, 검색, 필터링 지원)
export const getUsers = async (
  options: UserListOptions = {}
): Promise<UserListResult> => {
  try {
    const {
      page = 1,
      pageSize = 20,
      search = "",
      roleFilter = "all",
      statusFilter = "all",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    let q = query(collection(db, "users"));

    // 역할 필터링
    if (roleFilter !== "all") {
      q = query(q, where("role", "==", roleFilter));
    }

    // 상태 필터링
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      q = query(q, where("isActive", "==", isActive));
    }

    // 정렬
    q = query(q, orderBy(sortBy, sortOrder));

    // 페이지네이션을 위한 전체 개수 조회
    const countSnapshot = await getCountFromServer(q);
    const totalCount = countSnapshot.data().count;

    // 페이지네이션 적용
    const offset = (page - 1) * pageSize;
    if (offset > 0) {
      // startAfter를 사용하기 위해 이전 페이지의 마지막 문서를 가져옴
      const prevQuery = query(q, limit(offset));
      const prevSnapshot = await getDocs(prevQuery);
      const lastDoc = prevSnapshot.docs[prevSnapshot.docs.length - 1];

      if (lastDoc) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      } else {
        q = query(q, limit(pageSize));
      }
    } else {
      q = query(q, limit(pageSize));
    }

    const snapshot = await getDocs(q);
    let users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastLoginAt: doc.data().lastLoginAt?.toDate(),
    })) as User[];

    // 클라이언트 사이드 검색 (이메일, 이름으로 검색)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.email.toLowerCase().includes(searchLower) ||
          user.displayName?.toLowerCase().includes(searchLower) ||
          user.name?.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = page * pageSize < totalCount;

    return {
      users,
      totalCount,
      hasMore,
      currentPage: page,
    };
  } catch (error) {
    console.error("사용자 목록 조회 실패:", error);
    throw error;
  }
};

// 특정 사용자 조회
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        lastLoginAt: docSnap.data().lastLoginAt?.toDate(),
      } as User;
    }

    return null;
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    throw error;
  }
};

// 사용자 역할 변경
export const updateUserRole = async (
  userId: string,
  role: "user" | "admin"
): Promise<void> => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      role,
      updatedAt: serverTimestamp(),
    });

    // 활동 로그 기록
    await logUserActivity({
      userId,
      action: "role_change",
      details: `역할이 ${role}로 변경됨`,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("사용자 역할 변경 실패:", error);
    throw error;
  }
};

// 사용자 활성화/비활성화
export const toggleUserStatus = async (
  userId: string,
  isActive: boolean
): Promise<void> => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      isActive,
      updatedAt: serverTimestamp(),
    });

    // 활동 로그 기록
    await logUserActivity({
      userId,
      action: "profile_update",
      details: `계정이 ${isActive ? "활성화" : "비활성화"}됨`,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("사용자 상태 변경 실패:", error);
    throw error;
  }
};

// 사용자 정보 업데이트
export const updateUserInfo = async (
  userId: string,
  updates: Partial<
    Pick<
      User,
      "displayName" | "name" | "phoneNumber" | "department" | "position"
    >
  >
): Promise<void> => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    // 활동 로그 기록
    await logUserActivity({
      userId,
      action: "profile_update",
      details: "프로필 정보가 업데이트됨",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("사용자 정보 업데이트 실패:", error);
    throw error;
  }
};

// 사용자 삭제 (실제로는 비활성화)
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    // 실제 삭제 대신 비활성화
    await toggleUserStatus(userId, false);

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      deletedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("사용자 삭제 실패:", error);
    throw error;
  }
};

// 사용자 활동 로그 기록
export const logUserActivity = async (
  activity: Omit<UserActivity, "id">
): Promise<void> => {
  try {
    const activityRef = collection(db, "userActivities");
    await addDoc(activityRef, {
      ...activity,
      timestamp: Timestamp.fromDate(activity.timestamp),
    });
  } catch (error) {
    console.error("사용자 활동 로그 기록 실패:", error);
    // 활동 로그 실패는 전체 작업을 실패시키지 않음
  }
};

// 사용자 활동 로그 조회
export const getUserActivities = async (
  userId?: string,
  limit_count: number = 50
): Promise<UserActivity[]> => {
  try {
    let q = query(
      collection(db, "userActivities"),
      orderBy("timestamp", "desc"),
      limit(limit_count)
    );

    if (userId) {
      q = query(
        collection(db, "userActivities"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(limit_count)
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as UserActivity[];
  } catch (error) {
    console.error("사용자 활동 로그 조회 실패:", error);
    throw error;
  }
};

// 최근 로그인한 사용자들
export const getRecentlyActiveUsers = async (
  days: number = 30
): Promise<User[]> => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const q = query(
      collection(db, "users"),
      where("lastLoginAt", ">=", Timestamp.fromDate(cutoffDate)),
      orderBy("lastLoginAt", "desc"),
      limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastLoginAt: doc.data().lastLoginAt?.toDate(),
    })) as User[];
  } catch (error) {
    console.error("최근 활성 사용자 조회 실패:", error);
    throw error;
  }
};

// 사용자 통계
export const getUserStatistics = async () => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 전체 사용자 수
    const totalUsersQuery = query(collection(db, "users"));
    const totalUsersSnapshot = await getCountFromServer(totalUsersQuery);
    const totalUsers = totalUsersSnapshot.data().count;

    // 활성 사용자 수
    const activeUsersQuery = query(
      collection(db, "users"),
      where("isActive", "==", true)
    );
    const activeUsersSnapshot = await getCountFromServer(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.data().count;

    // 관리자 수
    const adminUsersQuery = query(
      collection(db, "users"),
      where("role", "==", "admin")
    );
    const adminUsersSnapshot = await getCountFromServer(adminUsersQuery);
    const adminUsers = adminUsersSnapshot.data().count;

    // 최근 1주일 신규 가입자
    const weeklyNewUsersQuery = query(
      collection(db, "users"),
      where("createdAt", ">=", Timestamp.fromDate(oneWeekAgo))
    );
    const weeklyNewUsersSnapshot = await getCountFromServer(
      weeklyNewUsersQuery
    );
    const weeklyNewUsers = weeklyNewUsersSnapshot.data().count;

    // 최근 1개월 활성 사용자
    const monthlyActiveUsersQuery = query(
      collection(db, "users"),
      where("lastLoginAt", ">=", Timestamp.fromDate(oneMonthAgo))
    );
    const monthlyActiveUsersSnapshot = await getCountFromServer(
      monthlyActiveUsersQuery
    );
    const monthlyActiveUsers = monthlyActiveUsersSnapshot.data().count;

    return {
      totalUsers,
      activeUsers,
      adminUsers,
      weeklyNewUsers,
      monthlyActiveUsers,
      inactiveUsers: totalUsers - activeUsers,
      regularUsers: totalUsers - adminUsers,
    };
  } catch (error) {
    console.error("사용자 통계 조회 실패:", error);
    throw error;
  }
};

// 사용자 검색 (자동완성용)
export const searchUsers = async (
  searchTerm: string,
  limit_count: number = 10
): Promise<User[]> => {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    // 이메일로 검색
    const emailQuery = query(
      collection(db, "users"),
      where("email", ">=", searchTerm),
      where("email", "<=", searchTerm + "\uf8ff"),
      limit(limit_count)
    );

    const emailSnapshot = await getDocs(emailQuery);
    const users = emailSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastLoginAt: doc.data().lastLoginAt?.toDate(),
    })) as User[];

    // 중복 제거하고 이름으로도 필터링
    const searchLower = searchTerm.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchLower) ||
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.name?.toLowerCase().includes(searchLower)
    );

    return filteredUsers.slice(0, limit_count);
  } catch (error) {
    console.error("사용자 검색 실패:", error);
    throw error;
  }
};
