import { Timestamp } from "firebase/firestore";

/**
 * 날짜 포맷 유틸리티 함수들
 */

// 기본 날짜 포맷 (날짜 + 시간)
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 날짜만 포맷 (시간 제외)
export const formatDateOnly = (date: Date | string): string => {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return "";
  }
};

// Firebase Timestamp를 날짜 문자열로 변환
export const formatFirebaseTimestamp = (
  timestamp: { seconds: number; nanoseconds: number } | null | undefined
): string => {
  if (!timestamp) return "";
  try {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    // 24 hours
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else if (diffInMinutes < 10080) {
    // 7 days
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}일 전`;
  } else {
    return formatDate(date);
  }
};

// Firebase Timestamp converter
export const convertTimestamp = (timestamp: Timestamp | Date): Date => {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return timestamp.toDate();
};

// Format file upload date
export const formatUploadDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return formatDate(date);
};
