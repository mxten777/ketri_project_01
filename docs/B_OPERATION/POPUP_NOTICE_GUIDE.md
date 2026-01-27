# 공지사항 팝업 운영 가이드

**최종 업데이트:** 2026-01-27  
**담당:** 프론트엔드 팀  
**목적:** isPopup 기반 단일 팝업 시스템의 운영/유지보수 가이드

---

## 1. 기능 개요

### 핵심 특징
- **단일 팝업**: 최대 1개 공지만 활성화 (운영 단순화)
- **ON/OFF 제어**: 관리자 UI에서 체크박스 하나로 켜고 끄기
- **Home 자동 노출**: 홈페이지 방문 시 팝업 자동 표시
- **오늘 하루 보지 않기**: 사용자가 선택 시 당일 재노출 차단

### 설계 철학
- 날짜 범위(시작/종료) 제거 → ON/OFF만 사용
- Firebase 인덱스 불필요 (메모리 정렬)
- localStorage 기반 개인화 (서버 부담 없음)

---

## 2. 데이터 구조

### Firestore 필드 (`notices` 컬렉션)
```typescript
{
  id: string;
  title: string;              // 팝업 제목
  content: string;            // 본문 (300자까지 미리보기)
  excerpt?: string;           // 요약문
  isPopup: boolean;           // 팝업 활성화 여부 (핵심)
  status: "published" | "draft";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: { uid: string; name: string };
  category: string;
  // 아래 필드는 DB에 남아있지만 더 이상 사용하지 않음
  popupStartAt?: Date;        // (봉인됨)
  popupEndAt?: Date;          // (봉인됨)
  popupOncePerDay?: boolean;  // (봉인됨)
}
```

### 노출 조건
```typescript
isPopup === true
&& status === "published"
&& localStorage에 오늘 날짜 키가 없음
```

---

## 3. localStorage 규칙

### 키 형식
```
popup_notice_dismissed_YYYYMMDD
```

### 값
```
공지 ID (예: "abc123def456")
```

### 예시
```javascript
// 2026-01-27에 "xyz789" 공지를 "오늘 하루 보지 않기" 클릭 시
localStorage.setItem('popup_notice_dismissed_20260127', 'xyz789');

// 다음날(2026-01-28) 접속 시
// 키가 다르므로 (popup_notice_dismissed_20260128) 팝업 다시 표시
```

### 초기화 방법 (테스트용)
```javascript
// 개발자 도구 Console에서
localStorage.removeItem('popup_notice_dismissed_20260127');
// 또는 전체 초기화
localStorage.clear();
```

---

## 4. 단일 팝업 보장 로직

### `disableOtherPopups()` 함수
**위치:** `src/services/noticeService.ts`

**동작 원리:**
1. 관리자가 공지를 `isPopup=true`로 저장 시도
2. 저장 직전에 `disableOtherPopups(currentId)` 호출
3. Firestore에서 `isPopup=true`인 모든 공지 조회
4. currentId를 제외한 모든 공지를 `isPopup=false`로 업데이트
5. 새 공지만 `isPopup=true`로 저장

**코드:**
```typescript
export const disableOtherPopups = async (currentId?: string): Promise<void> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isPopup", "==", true)
  );
  const querySnapshot = await getDocs(q);
  const batch: Promise<void>[] = [];
  
  querySnapshot.docs.forEach((doc) => {
    if (doc.id !== currentId) {
      batch.push(updateDoc(doc.ref, { isPopup: false }));
    }
  });
  
  await Promise.all(batch);
};
```

---

## 5. 관리자 운영 방법

### 위치
`/admin/notice` 또는 공지사항 수정 페이지

### UI
```
[ ] 홈페이지 팝업으로 노출
    체크하면 홈페이지 방문 시 팝업으로 표시됩니다.
    팝업은 최대 1개만 활성화되며, 저장 시 기존 팝업은
    자동으로 비활성화됩니다.
```

### 운영 시나리오

#### A. 새 팝업 등록
1. 공지사항 작성
2. "홈페이지 팝업으로 노출" 체크
3. 저장 → 기존 팝업 자동 OFF

#### B. 팝업 비활성화
1. 현재 팝업 공지 수정
2. "홈페이지 팝업으로 노출" 체크 해제
3. 저장 → 홈페이지에서 팝업 사라짐

#### C. 팝업 내용 수정
1. 현재 팝업 공지 수정
2. 제목/내용 변경
3. "홈페이지 팝업으로 노출" 체크 유지
4. 저장 → 수정된 내용으로 팝업 표시

---

## 6. QA 체크리스트

### 필수 테스트 (브라우저)

| 항목 | 절차 | 예상 결과 |
|------|------|-----------|
| 팝업 노출 | isPopup=true 저장 → 홈 접속 | 팝업 즉시 표시 |
| 팝업 미노출 | isPopup=false 저장 → 홈 접속 | 팝업 없음 |
| 오늘 하루 보지 않기 | 팝업에서 버튼 클릭 → 새로고침 | 오늘은 안 보임 |
| 다음날 재노출 | 다음날(날짜 변경) 접속 | 팝업 다시 표시 |
| 단일 팝업 | 새 팝업 등록(isPopup=true) | 기존 팝업 isPopup=false |
| 자세히 보기 | 팝업에서 "자세히 보기" 클릭 | NoticeDetail 페이지 이동 |
| ESC 키 | 팝업에서 ESC 누름 | 팝업 닫힘 |
| Overlay 클릭 | 팝업 밖 클릭 | 팝업 닫힘 |

### 모바일 테스트
- iOS Safari, Android Chrome에서 팝업 정상 표시
- 터치로 닫기/자세히 보기 동작 확인

### 라이트모드/다크모드
- 양쪽 모드에서 팝업 배경/텍스트 가독성 확인
- 그라데이션 헤더 색상 대비 검증

### TypeScript
```bash
npm run build
```
- 빌드 에러 없음 확인

---

## 7. 트러블슈팅

### 문제 1: 팝업이 안 떠요
**체크 순서:**
1. Firestore 확인: `isPopup=true`, `status="published"`?
2. Console 로그 확인: `[Popup] Found popup notice: ...` 출력?
3. localStorage 확인: `popup_notice_dismissed_YYYYMMDD` 키가 있나?
   → 있으면 삭제 후 재접속
4. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)

### 문제 2: 팝업이 계속 떠요
**원인:**
- "오늘 하루 보지 않기"가 제대로 저장 안 됨
- localStorage가 차단됨 (시크릿 모드)

**해결:**
```javascript
// Console에서 수동 저장
const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
localStorage.setItem(`popup_notice_dismissed_${today}`, '공지ID');
```

### 문제 3: 팝업이 2개 동시에 떠요
**원인:**
- `disableOtherPopups()`가 실행 안 됨
- Firestore에 `isPopup=true`가 2개 이상

**해결:**
1. Firestore Console 접속
2. `notices` 컬렉션에서 `isPopup=true` 검색
3. 불필요한 공지의 `isPopup`을 수동으로 `false`로 변경

### 문제 4: Firebase 인덱스 에러
**에러 메시지:**
```
The query requires an index. You can create it here: https://...
```

**해결:**
- 현재 코드는 `orderBy` 제거로 인덱스 불필요
- 만약 에러 발생 시: 링크 클릭하여 인덱스 생성

---

## 8. 코드 위치

| 항목 | 파일 경로 |
|------|-----------|
| 팝업 컴포넌트 | `src/components/common/NoticePopup.tsx` |
| 서비스 레이어 | `src/services/noticeService.ts` |
| Home 통합 | `src/pages/Home.tsx` |
| 관리자 폼 | `src/pages/board/NoticeForm.tsx` |
| 타입 정의 | `src/types/index.ts` |

---

## 9. 변경 이력

| 날짜 | 변경 내용 | 담당자 |
|------|-----------|--------|
| 2026-01-27 | 날짜 범위 제거, ON/OFF 단순화 | Frontend Team |
| 2026-01-27 | Firebase 인덱스 불필요하도록 쿼리 최적화 | Frontend Team |
| 2026-01-27 | 팝업 디자인 개선 (max-w-2xl, 그라데이션) | Frontend Team |

---

## 10. 참고 자료

- [Firebase Structure](./FIREBASE_STRUCTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Maintenance Improvements](./MAINTENANCE_IMPROVEMENTS.md)
