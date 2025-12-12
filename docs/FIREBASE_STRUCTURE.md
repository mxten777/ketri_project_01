# Firebase Database Structure - KETRI 웹사이트

## 🔥 Firestore Collections 구조

### 1. users (사용자)

**컬렉션 경로:** `/users/{userId}`

```json
{
  "uid": "string (Firebase Auth UID)",
  "email": "string",
  "displayName": "string",
  "phoneNumber": "string",
  "companyName": "string (optional)",
  "address": {
    "zipCode": "string",
    "address": "string",
    "detailAddress": "string"
  },
  "role": "string (user | admin)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "lastLoginAt": "timestamp",
  "isActive": "boolean",
  "emailVerified": "boolean",
  "profileImage": "string (Storage URL)",
  "bookmarks": "array<string> (게시글 ID)",
  "preferences": {
    "darkMode": "boolean",
    "notifications": {
      "email": "boolean",
      "sms": "boolean"
    }
  }
}
```

**인덱스:**

- `email` (ASC)
- `role` (ASC) + `createdAt` (DESC)
- `isActive` (ASC) + `createdAt` (DESC)

---

### 2. certificates (성적서)

**컬렉션 경로:** `/certificates/{certificateId}`

```json
{
  "certificateId": "string (자동생성 ID)",
  "certificateNumber": "string (성적서 고유번호, 예: KETRI-2024-001234)",
  "password": "string (해시처리)",
  "userId": "string (의뢰자 UID)",
  "userName": "string",
  "userEmail": "string",
  "userPhone": "string",
  "serviceType": "string (water | dialysis | asbestos | indoor-air)",
  "testItems": "array<object>",
  "sampleInfo": {
    "sampleName": "string",
    "sampleLocation": "string",
    "collectionDate": "timestamp",
    "collectionMethod": "string"
  },
  "testDate": "timestamp",
  "issueDate": "timestamp",
  "expiryDate": "timestamp",
  "pdfUrl": "string (Firebase Storage URL)",
  "status": "string (pending | processing | completed | expired)",
  "results": "array<object>",
  "remarks": "string",
  "inspectorName": "string",
  "inspectorSignature": "string (Storage URL)",
  "isPublic": "boolean",
  "viewCount": "number",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "createdBy": "string (관리자 UID)"
}
```

**testItems 서브컬렉션:**

```json
{
  "itemName": "string (예: 일반세균)",
  "testMethod": "string",
  "result": "string",
  "unit": "string",
  "standard": "string (기준치)",
  "isPass": "boolean"
}
```

**인덱스:**

- `certificateNumber` (ASC) - 고유
- `userId` (ASC) + `createdAt` (DESC)
- `serviceType` (ASC) + `status` (ASC) + `createdAt` (DESC)
- `status` (ASC) + `createdAt` (DESC)

---

### 3. quoteRequests (견적 요청)

**컬렉션 경로:** `/quoteRequests/{requestId}`

```json
{
  "requestId": "string (자동생성)",
  "userId": "string (optional, 비회원 가능)",
  "serviceType": "string (water | dialysis | asbestos | indoor-air | industrial-health)",
  "requesterInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "companyName": "string (optional)",
    "position": "string (optional)"
  },
  "facilityInfo": {
    "facilityType": "string",
    "facilityName": "string",
    "address": "string",
    "area": "number (면적, optional)",
    "buildingYear": "string (optional)"
  },
  "requestDetails": {
    "testItems": "array<string> (선택한 검사 항목)",
    "sampleCount": "number",
    "urgency": "string (normal | urgent)",
    "preferredDate": "timestamp",
    "additionalRequests": "string"
  },
  "status": "string (pending | reviewed | quoted | accepted | rejected | completed)",
  "estimatedCost": "number (optional)",
  "quotePdfUrl": "string (optional)",
  "adminNotes": "string (internal)",
  "assignedTo": "string (관리자 UID)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "respondedAt": "timestamp (optional)",
  "completedAt": "timestamp (optional)"
}
```

**인덱스:**

- `userId` (ASC) + `createdAt` (DESC)
- `status` (ASC) + `createdAt` (DESC)
- `serviceType` (ASC) + `status` (ASC)
- `assignedTo` (ASC) + `status` (ASC)

---

### 4. notices (공지사항)

**컬렉션 경로:** `/notices/{noticeId}`

```json
{
  "noticeId": "string",
  "title": "string",
  "content": "string (HTML)",
  "excerpt": "string (요약, 150자)",
  "category": "string (general | service | system | event)",
  "isImportant": "boolean",
  "isPinned": "boolean",
  "author": {
    "uid": "string",
    "name": "string"
  },
  "attachments": "array<object>",
  "viewCount": "number",
  "status": "string (draft | published | archived)",
  "publishedAt": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "tags": "array<string>"
}
```

**attachments 구조:**

```json
{
  "fileName": "string",
  "fileSize": "number (bytes)",
  "fileType": "string (mime type)",
  "downloadUrl": "string (Storage URL)",
  "uploadedAt": "timestamp"
}
```

**인덱스:**

- `status` (ASC) + `isPinned` (DESC) + `publishedAt` (DESC)
- `category` (ASC) + `publishedAt` (DESC)

---

### 5. qna (질문답변)

**컬렉션 경로:** `/qna/{qnaId}`

```json
{
  "qnaId": "string",
  "title": "string",
  "content": "string",
  "category": "string (general | service | technical | account)",
  "userId": "string",
  "userName": "string",
  "userEmail": "string",
  "isPrivate": "boolean",
  "status": "string (waiting | answered | closed)",
  "answer": {
    "content": "string (HTML)",
    "answeredBy": "string (관리자 UID)",
    "answeredByName": "string",
    "answeredAt": "timestamp"
  },
  "viewCount": "number",
  "attachments": "array<object>",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**인덱스:**

- `userId` (ASC) + `createdAt` (DESC)
- `status` (ASC) + `createdAt` (DESC)
- `category` (ASC) + `status` (ASC)

---

### 6. freeBoard (자유게시판)

**컬렉션 경로:** `/freeBoard/{postId}`

```json
{
  "postId": "string",
  "title": "string",
  "content": "string (HTML)",
  "userId": "string",
  "userName": "string",
  "viewCount": "number",
  "likeCount": "number",
  "commentCount": "number",
  "attachments": "array<object>",
  "tags": "array<string>",
  "status": "string (published | deleted | reported)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**서브컬렉션: comments**

**컬렉션 경로:** `/freeBoard/{postId}/comments/{commentId}`

```json
{
  "commentId": "string",
  "userId": "string",
  "userName": "string",
  "content": "string",
  "parentCommentId": "string (optional, 대댓글)",
  "likeCount": "number",
  "isDeleted": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**인덱스:**

- `userId` (ASC) + `createdAt` (DESC)
- `status` (ASC) + `createdAt` (DESC)
- `createdAt` (DESC)

---

### 7. resources (자료실)

**컬렉션 경로:** `/resources/{resourceId}`

```json
{
  "resourceId": "string",
  "title": "string",
  "description": "string",
  "category": "string (regulation | form | technical | education)",
  "subcategory": "string",
  "fileInfo": {
    "fileName": "string",
    "fileSize": "number",
    "fileType": "string",
    "downloadUrl": "string"
  },
  "thumbnailUrl": "string (optional)",
  "uploadedBy": {
    "uid": "string",
    "name": "string"
  },
  "downloadCount": "number",
  "viewCount": "number",
  "tags": "array<string>",
  "isPublic": "boolean",
  "requiredRole": "string (optional, user | admin)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**인덱스:**

- `category` (ASC) + `createdAt` (DESC)
- `isPublic` (ASC) + `downloadCount` (DESC)

---

### 8. services (서비스 콘텐츠)

**컬렉션 경로:** `/services/{serviceId}`

```json
{
  "serviceId": "string (예: industrial-health-musculoskeletal)",
  "serviceName": "string",
  "serviceCategory": "string (industrial-health | water | dialysis | asbestos | indoor-air)",
  "title": "string",
  "content": "string (HTML)",
  "featuredImage": "string (Storage URL)",
  "gallery": "array<string> (이미지 URLs)",
  "overview": "string",
  "keyPoints": "array<string>",
  "process": "array<object>",
  "relatedServices": "array<string> (serviceId)",
  "documents": "array<object>",
  "faqs": "array<object>",
  "seoMeta": {
    "title": "string",
    "description": "string",
    "keywords": "array<string>"
  },
  "isPublished": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "updatedBy": "string (관리자 UID)"
}
```

**process 구조:**

```json
{
  "step": "number",
  "title": "string",
  "description": "string",
  "icon": "string"
}
```

**faqs 구조:**

```json
{
  "question": "string",
  "answer": "string"
}
```

---

### 9. statistics (통계)

**컬렉션 경로:** `/statistics/{date}` (예: 2024-12-04)

```json
{
  "date": "string (YYYY-MM-DD)",
  "pageViews": {
    "home": "number",
    "services": "map<string, number>",
    "board": "map<string, number>",
    "total": "number"
  },
  "uniqueVisitors": "number",
  "newUsers": "number",
  "quoteRequests": {
    "total": "number",
    "byServiceType": "map<string, number>"
  },
  "certificatesIssued": "number",
  "searchKeywords": "map<string, number>",
  "topPages": "array<object>",
  "deviceStats": {
    "mobile": "number",
    "tablet": "number",
    "desktop": "number"
  },
  "createdAt": "timestamp"
}
```

---

### 10. siteConfig (사이트 설정)

**컬렉션 경로:** `/siteConfig/general`

```json
{
  "siteName": "string",
  "siteUrl": "string",
  "logo": {
    "light": "string (Storage URL)",
    "dark": "string (Storage URL)"
  },
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "fax": "string",
    "address": {
      "zipCode": "string",
      "address": "string",
      "detailAddress": "string"
    },
    "kakaoTalkId": "string (optional)"
  },
  "businessInfo": {
    "registrationNumber": "string",
    "representativeName": "string",
    "certifications": "array<object>"
  },
  "socialMedia": {
    "facebook": "string (URL)",
    "instagram": "string (URL)",
    "youtube": "string (URL)",
    "blog": "string (URL)"
  },
  "maintenance": {
    "isActive": "boolean",
    "message": "string",
    "startTime": "timestamp",
    "endTime": "timestamp"
  },
  "features": {
    "darkMode": "boolean",
    "search": "boolean",
    "socialLogin": "boolean"
  },
  "updatedAt": "timestamp",
  "updatedBy": "string"
}
```

---

### 11. activityLogs (활동 로그)

**컬렉션 경로:** `/activityLogs/{logId}`

```json
{
  "logId": "string",
  "userId": "string",
  "userName": "string",
  "action": "string (login | logout | create | update | delete | download)",
  "target": "string (certificate | notice | user | etc)",
  "targetId": "string",
  "details": "string",
  "ipAddress": "string",
  "userAgent": "string",
  "timestamp": "timestamp"
}
```

**인덱스:**

- `userId` (ASC) + `timestamp` (DESC)
- `action` (ASC) + `timestamp` (DESC)

---

## 🔐 Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper Functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }

    // Certificates Collection
    match /certificates/{certificateId} {
      allow read: if isAdmin() ||
                     (isSignedIn() && resource.data.userId == request.auth.uid);
      allow create: if isAdmin();
      allow update, delete: if isAdmin();
    }

    // Quote Requests Collection
    match /quoteRequests/{requestId} {
      allow read: if isAdmin() ||
                     (isSignedIn() && resource.data.userId == request.auth.uid);
      allow create: if true; // 비회원도 가능
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // Notices Collection
    match /notices/{noticeId} {
      allow read: if resource.data.status == 'published';
      allow create, update, delete: if isAdmin();
    }

    // QnA Collection
    match /qna/{qnaId} {
      allow read: if isAdmin() ||
                     (isSignedIn() && resource.data.userId == request.auth.uid) ||
                     (resource.data.isPrivate == false);
      allow create: if isSignedIn();
      allow update: if isAdmin() || isOwner(resource.data.userId);
      allow delete: if isAdmin();
    }

    // Free Board Collection
    match /freeBoard/{postId} {
      allow read: if resource.data.status == 'published';
      allow create: if isSignedIn();
      allow update, delete: if isAdmin() || isOwner(resource.data.userId);

      match /comments/{commentId} {
        allow read: if true;
        allow create: if isSignedIn();
        allow update, delete: if isAdmin() || isOwner(resource.data.userId);
      }
    }

    // Resources Collection
    match /resources/{resourceId} {
      allow read: if resource.data.isPublic == true || isSignedIn();
      allow create, update, delete: if isAdmin();
    }

    // Services Collection
    match /services/{serviceId} {
      allow read: if resource.data.isPublished == true || isAdmin();
      allow create, update, delete: if isAdmin();
    }

    // Statistics Collection
    match /statistics/{date} {
      allow read: if isAdmin();
      allow create, update: if isAdmin();
    }

    // Site Config Collection
    match /siteConfig/{configId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Activity Logs Collection
    match /activityLogs/{logId} {
      allow read: if isAdmin();
      allow create: if isSignedIn();
      allow update, delete: if false; // 로그는 수정/삭제 불가
    }
  }
}
```

---

## 💾 Firebase Storage 구조

```
/storage
├── /users
│   └── /{userId}
│       └── /profile
│           └── profile.jpg
│
├── /certificates
│   └── /{certificateId}
│       ├── certificate.pdf
│       └── attachments/
│           └── file1.pdf
│
├── /notices
│   └── /{noticeId}
│       └── attachments/
│           └── file.pdf
│
├── /qna
│   └── /{qnaId}
│       └── attachments/
│
├── /freeBoard
│   └── /{postId}
│       └── images/
│           └── image1.jpg
│
├── /resources
│   └── /{resourceId}
│       ├── file.pdf
│       └── thumbnail.jpg
│
├── /services
│   └── /{serviceId}
│       ├── featured.jpg
│       └── gallery/
│           ├── image1.jpg
│           └── image2.jpg
│
└── /site
    ├── /logo
    │   ├── logo-light.svg
    │   └── logo-dark.svg
    ├── /hero
    │   └── hero-bg.jpg
    └── /icons
        └── favicon.svg
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return request.auth != null &&
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // User Profile Images
    match /users/{userId}/profile/{fileName} {
      allow read: if true;
      allow write: if isSignedIn() && request.auth.uid == userId;
    }

    // Certificates
    match /certificates/{certificateId}/{allPaths=**} {
      allow read: if isAdmin() || isSignedIn();
      allow write: if isAdmin();
    }

    // Notices, QnA, Free Board
    match /{collection}/{documentId}/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin() || isSignedIn();
    }

    // Resources
    match /resources/{resourceId}/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Site Assets
    match /site/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 🔍 Firestore 쿼리 예제

### 1. 최신 공지사항 5개 가져오기

```typescript
const noticesQuery = query(
  collection(db, "notices"),
  where("status", "==", "published"),
  orderBy("isPinned", "desc"),
  orderBy("publishedAt", "desc"),
  limit(5)
);
```

### 2. 사용자의 성적서 조회

```typescript
const certificatesQuery = query(
  collection(db, "certificates"),
  where("userId", "==", userId),
  orderBy("createdAt", "desc")
);
```

### 3. 미답변 질문 목록

```typescript
const unansweredQnaQuery = query(
  collection(db, "qna"),
  where("status", "==", "waiting"),
  orderBy("createdAt", "asc")
);
```

### 4. 서비스별 견적 요청 통계

```typescript
const quoteStatsQuery = query(
  collection(db, "quoteRequests"),
  where("serviceType", "==", "water"),
  where("createdAt", ">=", startDate),
  where("createdAt", "<=", endDate)
);
```

---

이 구조는 KETRI 웹사이트의 모든 데이터를 효율적으로 관리하고,
확장 가능하며, 보안이 강화된 Firebase 데이터베이스 설계입니다.
