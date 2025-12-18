# Firebase 설정 가이드

## 문제 상황
"FirebaseError: Missing or insufficient permissions" 오류가 발생하는 경우

## 해결 방법

### 1. Firebase Console 접속
1. https://console.firebase.google.com/ 접속
2. 프로젝트 선택: **ketri-project-01**

### 2. Firestore Database 보안 규칙 설정

#### 방법 A: 콘솔에서 직접 설정 (권장)
1. 좌측 메뉴에서 **Firestore Database** 클릭
2. 상단 탭에서 **규칙(Rules)** 클릭
3. 현재 프로젝트의 `firestore.rules` 파일 내용을 복사
4. Firebase Console의 규칙 에디터에 붙여넣기
5. **게시(Publish)** 버튼 클릭

#### 방법 B: Firebase CLI 사용 (고급)
```bash
# Firebase CLI 설치 (한 번만)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 초기화 (처음 한 번만)
firebase init firestore

# 규칙 배포
firebase deploy --only firestore:rules
```

### 3. 임시 테스트용 규칙 (개발 중에만 사용)

**⚠️ 주의: 프로덕션 환경에서는 절대 사용하지 마세요!**

임시로 모든 접근을 허용하려면 (테스트 목적):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // 임시! 개발 환경에서만!
    }
  }
}
```

### 4. 관리자 계정 생성

로그인 후 관리자 권한을 부여하려면:

1. Firebase Console → Firestore Database → 데이터 탭
2. `users` 컬렉션 찾기
3. 본인 계정의 문서 찾기 (UID로 검색)
4. `role` 필드를 `admin`으로 수정

또는 수동으로 문서 생성:
- 컬렉션: `users`
- 문서 ID: `본인의 Firebase Auth UID`
- 필드:
  ```
  email: "jngdy@naver.com"
  role: "admin"
  displayName: "관리자"
  createdAt: Timestamp (현재 시간)
  ```

### 5. 환경 변수 확인

`.env` 파일에 다음 내용이 올바르게 설정되어 있는지 확인:

```env
VITE_FIREBASE_API_KEY=AIzaSyBMDGZZVoIxRsirja6dZEVMBfEncu_cudY
VITE_FIREBASE_AUTH_DOMAIN=ketri-project-01.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ketri-project-01
VITE_FIREBASE_STORAGE_BUCKET=ketri-project-01.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=754040513928
VITE_FIREBASE_APP_ID=1:754040513928:web:c6176dce5567fb4a8e063d
VITE_ADMIN_EMAILS=jngdy@naver.com
```

### 6. 개발 서버 재시작

환경 변수나 Firebase 설정을 변경한 후:

```bash
# 개발 서버 중지 (Ctrl+C)
# 개발 서버 재시작
npm run dev
```

## 보안 규칙 설명

현재 `firestore.rules` 파일의 주요 규칙:

- **users**: 모두 읽기 가능, 본인만 수정 가능, 관리자만 삭제 가능
- **notices**: 모두 읽기 가능, 관리자만 작성/수정/삭제
- **qna/free**: 모두 읽기 가능, 로그인 사용자만 작성, 작성자/관리자만 수정/삭제
- **resources**: 모두 읽기 가능, 관리자만 관리
- **quoteRequests**: 본인 것만 읽기 가능, 로그인 사용자만 작성

## 문제 해결

### "Missing or insufficient permissions" 오류가 계속 발생하는 경우:

1. **브라우저 콘솔 확인**
   - F12 → Console 탭
   - 어떤 경로에서 권한 오류가 발생하는지 확인

2. **Firebase Console에서 규칙 확인**
   - Firestore Database → 규칙 탭
   - 마지막 배포 시간 확인
   - 규칙이 제대로 적용되었는지 확인

3. **로그아웃 후 다시 로그인**
   - 캐시 문제일 수 있음

4. **관리자 권한 확인**
   - Firestore Database → 데이터 탭
   - `users/{your-uid}` 문서에서 `role: "admin"` 확인

5. **브라우저 캐시 삭제**
   - Ctrl+Shift+Delete → 캐시 삭제

## 추가 도움말

- Firebase 공식 문서: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Console: https://console.firebase.google.com/
- 문제 지속 시: Firebase 프로젝트 설정 → 사용자 및 권한 확인
