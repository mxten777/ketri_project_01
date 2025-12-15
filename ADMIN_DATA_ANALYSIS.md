# 관리자 페이지 기능 및 데이터 현황 분석

## 📋 관리자 페이지 기능 목록

### 1. **AdminDashboard** (관리자 대시보드)

**경로**: `/admin` 또는 `/admin/dashboard`

**주요 기능**:

- ✅ 전체 통계 카드 (사용자, Q&A, 자료실, 다운로드)
- ✅ 최근 활동 목록
- ✅ 시스템 상태 모니터링
- ✅ 빠른 작업 링크

**데이터 소스**: Firebase Firestore

- `users` 컬렉션
- `qna` 컬렉션
- `resources` 컬렉션
- `notices` 컬렉션

### 2. **UserManagement** (사용자 관리)

**경로**: `/admin/users`

**주요 기능**:

- ✅ 사용자 목록 조회 (페이지네이션)
- ✅ 사용자 검색 (이름, 이메일)
- ✅ 역할 필터링 (관리자/일반)
- ✅ 상태 필터링 (활성/비활성)
- ✅ 사용자 역할 변경
- ✅ 사용자 활성/비활성 토글
- ✅ 사용자 활동 기록 조회

**데이터 소스**: Firebase Firestore

- `users` 컬렉션
- `user_activities` 컬렉션 (활동 기록)

### 3. **QnAAdmin** (Q&A 관리)

**경로**: `/admin/qna`

**주요 기능**:

- ✅ Q&A 목록 조회
- ✅ 답변 상태 필터링 (전체/미답변/답변완료)
- ✅ 답변 상태 토글
- ✅ Q&A 삭제
- ✅ Q&A 상세보기 (새 창)

**데이터 소스**: Firebase Firestore

- `qna` 컬렉션

### 4. **ContentManagement** (컨텐츠 관리)

**경로**: `/admin/content`

**주요 기능**:

- ✅ 컨텐츠 목록 조회
- ✅ 타입별 필터링 (공지/뉴스/이벤트)
- ✅ 상태별 필터링 (발행/임시저장/보관)
- ✅ 컨텐츠 생성/수정/삭제
- ✅ 조회수, 좋아요, 댓글 통계

**데이터 소스**: Firebase Firestore

- `content` 컬렉션

### 5. **ResourceAdmin** (자료실 관리)

**경로**: `/admin/resources`

**주요 기능**:

- ✅ 자료 목록 조회
- ✅ 자료 업로드/수정/삭제
- ✅ 다운로드 통계

**데이터 소스**: Firebase Firestore

- `resources` 컬렉션

---

## 🔍 더미 데이터 현황

### ✅ 더미 데이터가 **있는** 곳

#### 1. **Home.tsx** (홈페이지)

```typescript
// 공지사항 더미 데이터 (5개)
const notices = [
  {
    id: 1,
    title: "2025년 설 연휴 휴무 안내",
    date: "2025-01-20",
    isImportant: true,
  },
  { id: 2, title: "먹는물 수질검사 항목 추가 안내", date: "2025-01-15" },
  { id: 3, title: "실내공기질 측정 견적 문의 이벤트", date: "2025-01-10" },
  { id: 4, title: "석면조사 분석 서비스 확대", date: "2025-01-05" },
  {
    id: 5,
    title: "홈페이지 리뉴얼 완료",
    date: "2024-12-15",
    isImportant: true,
  },
];
```

**위치**: `src/pages/Home.tsx` (83-110줄)
**사용처**: 홈페이지 "공지사항" 섹션

---

### ✅ 더미 데이터가 **없는** 곳 (실제 Firebase 데이터 사용)

#### 1. **AdminDashboard** (관리자 대시보드)

- **statsService.ts**의 `getDashboardStats()` 사용
- Firebase Firestore에서 실시간 데이터 조회
- 데이터 없을 때: 기본값 0 반환 (에러 없음)

```typescript
// 에러 방어 로직 완비
return {
  totalUsers: usersCount.data().count || 0,
  totalQnAs: qnaCount.data().count || 0,
  totalResources: resourcesCount.data().count || 0,
  totalNotices: noticesCount.data().count || 0,
  totalDownloads: totalDownloads || 0,
  // ...
};
```

#### 2. **UserManagement** (사용자 관리)

- **userManagementService.ts**의 `getUsers()` 사용
- Firebase에서 실시간 조회
- 데이터 없을 때: 빈 배열 반환

#### 3. **QnAAdmin** (Q&A 관리)

- **qnaService.ts**의 `getQnAs()` 사용
- Firebase에서 실시간 조회
- 데이터 없을 때: 빈 배열 반환, "문의가 없습니다" 메시지 표시

#### 4. **최근 활동** (Recent Activities)

- **statsService.ts**의 `getRecentActivities()` 사용
- QnA, 자료실, 사용자 가입을 통합 조회
- 에러 시: 빈 배열 반환 (페이지 오류 없음)

```typescript
catch (error) {
  console.error("최근 활동 조회 실패:", error);
  return []; // 에러 시 빈 배열 반환
}
```

---

## ⚠️ 데이터 없을 때 오류 체크 결과

### ✅ **오류 없음** - 모든 페이지가 안전하게 처리

| 페이지                | 데이터 없을 때 동작                     | 오류 가능성 |
| --------------------- | --------------------------------------- | ----------- |
| **AdminDashboard**    | 통계 0으로 표시, "최근 활동이 없습니다" | ✅ 없음     |
| **UserManagement**    | "사용자가 없습니다" 메시지              | ✅ 없음     |
| **QnAAdmin**          | "문의가 없습니다" 메시지                | ✅ 없음     |
| **ResourceAdmin**     | 빈 목록 표시                            | ✅ 없음     |
| **ContentManagement** | 빈 목록 표시                            | ✅ 없음     |

### 🛡️ 에러 방어 메커니즘

1. **Try-Catch 블록**: 모든 데이터 조회에 에러 처리
2. **기본값 반환**: 에러 발생 시 빈 배열/0 반환
3. **옵셔널 체이닝**: `data?.field || 0` 패턴 사용
4. **조건부 렌더링**: 데이터 여부에 따라 UI 분기

```typescript
// 예시: getDashboardStats
try {
  // 데이터 조회
} catch {
  // 에러 시 기본값 반환
  return {
    totalUsers: 0,
    totalQnAs: 0,
    // ...
  };
}
```

---

## 🚀 실제 데이터 적용 준비사항

### 1. **더미 데이터 제거 필요**

#### Home.tsx 수정 필요

```typescript
// 현재: 하드코딩된 더미 데이터
const notices = [
  /* 더미 데이터 */
];

// 변경: Firebase에서 실시간 조회
useEffect(() => {
  const fetchNotices = async () => {
    const noticesData = await getRecentNotices(5);
    setNotices(noticesData);
  };
  fetchNotices();
}, []);
```

### 2. **Firebase 컬렉션 확인**

실제 운영을 위해 다음 컬렉션이 필요합니다:

```
Firestore Database
├── users           ✅ (사용자 정보)
├── qna             ✅ (Q&A)
├── resources       ✅ (자료실)
├── notices         ✅ (공지사항)
├── content         ⚠️ (컨텐츠 관리용 - 필요시 생성)
└── user_activities ⚠️ (사용자 활동 기록 - 필요시 생성)
```

### 3. **초기 데이터 없을 때 UX**

현재 모든 페이지는 데이터가 없어도 정상 작동하지만, 더 나은 UX를 위해:

- ✅ 빈 상태 메시지 표시 중
- ✅ 로딩 스피너 구현됨
- ✅ 에러 메시지 처리됨
- 💡 추천: "데이터 추가" 버튼 추가

---

## 📊 요약

### ✅ 안전성

- **모든 관리자 페이지**: 데이터 없을 때 오류 없음
- **에러 처리**: 완벽하게 구현됨
- **사용자 경험**: 빈 상태 메시지로 처리

### ⚠️ 작업 필요

1. **Home.tsx**: 더미 공지사항 → Firebase 연동 (5개 항목)
2. **선택사항**: `content`, `user_activities` 컬렉션 추가

### ✅ 실제 데이터 준비 완료

- Firebase 설정 완료
- 모든 서비스 함수 구현 완료
- 에러 방어 로직 완비

**결론**: 더미 데이터는 Home.tsx에만 있으며, 이것만 수정하면 100% 실제 데이터로 전환 가능합니다!
