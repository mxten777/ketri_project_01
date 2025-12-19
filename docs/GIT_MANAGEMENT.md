# Git 버전 관리 가이드

## 📋 기본 원칙

### ✅ 해야 할 것
- **Git으로 모든 버전 관리**: 코드 변경 이력은 Git commit으로 추적
- **의미 있는 커밋 메시지**: 무엇을, 왜 변경했는지 명확히 작성
- **작은 단위로 커밋**: 하나의 기능/수정은 하나의 커밋
- **브랜치 활용**: 새 기능은 별도 브랜치에서 개발

### ❌ 하지 말아야 할 것
- **백업 파일 생성 금지**: `file_old.tsx`, `file_backup.tsx` 등
- **주석으로 코드 보관 금지**: 삭제된 코드는 Git 히스토리에 있음
- **버전 번호 파일명 금지**: `file_v1.tsx`, `file_20241219.tsx` 등
- **docs 중복 금지**: 루트와 docs 폴더에 동일 문서 중복 생성

## 🚫 금지된 파일 패턴

다음 패턴의 파일들은 자동으로 Git에서 제외됩니다 (`.gitignore`):

```
*_backup.*      # file_backup.tsx
*_old.*         # Header_old.tsx
*_bak.*         # config_bak.ts
*_optimized.*   # AdminDashboard_optimized.tsx
*_new.*         # FreeAdmin_new.tsx
*.backup        # data.backup
*.bak           # config.bak
*_copy.*        # component_copy.tsx
*_v[0-9].*      # file_v1.tsx, file_v2.tsx
*_20241219.*    # backup_20241219.tsx
```

## 📁 프로젝트 구조 규칙

### 문서 위치
```
프로젝트루트/
├── README.md              # 프로젝트 개요 (필수)
└── docs/                  # 모든 상세 문서는 여기에
    ├── GETTING_STARTED.md
    ├── DEPLOYMENT.md
    ├── FIREBASE_STRUCTURE.md
    ├── OPTIMIZATION_REPORT.md
    └── GIT_MANAGEMENT.md
```

### ⚠️ 중복 방지
- 루트에는 `README.md`만 유지
- 나머지 모든 문서는 `docs/` 폴더에 통합
- 같은 내용의 문서를 여러 곳에 두지 않기

## 🔄 일반적인 Git 워크플로우

### 1. 새 기능 개발
```bash
# 최신 코드 받기
git pull origin main

# 새 브랜치 생성
git checkout -b feature/new-feature-name

# 작업 후 커밋
git add .
git commit -m "feat: 새 기능 추가"

# 원격 저장소에 푸시
git push origin feature/new-feature-name

# GitHub에서 Pull Request 생성
```

### 2. 버그 수정
```bash
# 버그 수정 브랜치
git checkout -b fix/bug-description

# 수정 후 커밋
git add .
git commit -m "fix: 버그 수정 설명"

# 푸시
git push origin fix/bug-description
```

### 3. 이전 버전으로 되돌리기
```bash
# 파일 단위 되돌리기
git checkout HEAD~1 -- path/to/file.tsx

# 전체 커밋 되돌리기 (주의!)
git revert <commit-hash>

# 특정 시점으로 이동 (로컬만)
git reset --hard <commit-hash>
```

## 📝 커밋 메시지 컨벤션

### 형식
```
<타입>: <제목>

<본문 (선택)>

<푸터 (선택)>
```

### 타입
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 코드
- `chore`: 빌드 설정, 패키지 매니저 등
- `design`: UI 디자인 변경

### 예시
```bash
# 좋은 예
git commit -m "feat: 사용자 알림 기능 추가"
git commit -m "fix: 공지사항 목록 로딩 오류 수정"
git commit -m "refactor: 날짜 포맷팅 유틸 함수로 통합"
git commit -m "docs: API 문서 업데이트"
git commit -m "perf: 이미지 lazy loading 적용"

# 나쁜 예
git commit -m "수정"
git commit -m "버그 픽스"
git commit -m "작업함"
git commit -m "aaa"
```

## 🌿 브랜치 전략

### 주요 브랜치
- `main`: 프로덕션 배포 브랜치 (항상 안정적)
- `develop`: 개발 통합 브랜치
- `feature/*`: 새 기능 개발
- `fix/*`: 버그 수정
- `hotfix/*`: 긴급 수정

### 브랜치 명명 규칙
```
feature/user-notification    # 기능
fix/notice-loading-error     # 버그
hotfix/security-patch        # 긴급 수정
refactor/date-utils          # 리팩토링
```

## 🔍 코드 히스토리 확인

### 파일 변경 이력
```bash
# 특정 파일의 변경 이력
git log --follow path/to/file.tsx

# 파일의 각 줄이 언제 수정되었는지
git blame path/to/file.tsx

# 특정 시점의 파일 내용 보기
git show <commit-hash>:path/to/file.tsx
```

### 삭제된 코드 찾기
```bash
# 삭제된 파일 검색
git log --all --full-history -- "**/deleted-file.tsx"

# 특정 코드가 삭제된 커밋 찾기
git log -S "함수이름" --source --all

# 이전 버전의 코드 복원
git checkout <commit-hash> -- path/to/file.tsx
```

## 🛠️ 유용한 Git 명령어

### 상태 확인
```bash
# 현재 상태
git status

# 변경 사항 확인
git diff

# 커밋 히스토리
git log --oneline --graph --all
```

### 실수 복구
```bash
# 스테이징 취소
git reset HEAD <file>

# 마지막 커밋 수정
git commit --amend

# 로컬 변경사항 버리기
git checkout -- <file>

# 모든 로컬 변경 취소
git reset --hard HEAD
```

### 브랜치 관리
```bash
# 브랜치 목록
git branch -a

# 브랜치 삭제
git branch -d feature/old-feature

# 원격 브랜치 삭제
git push origin --delete feature/old-feature

# 브랜치 이름 변경
git branch -m old-name new-name
```

## 📊 프로젝트 정리 체크리스트

### 매월 1일
- [ ] 불필요한 브랜치 정리
- [ ] 병합된 브랜치 삭제
- [ ] docs 폴더 정리 및 업데이트

### 새 기능 추가 전
- [ ] 최신 코드 pull 받기
- [ ] 새 브랜치 생성
- [ ] 기존 백업 파일 없는지 확인

### 코드 리뷰 전
- [ ] 백업 파일 생성 안 했는지 확인
- [ ] 주석 처리된 코드 삭제
- [ ] console.log 제거
- [ ] 의미 있는 커밋 메시지 작성

## 🎯 현재 프로젝트 상태 (2024-12-19)

### ✅ 완료된 정리
- 레거시 파일 6개 삭제 (87KB)
- 중복 문서 3개 제거
- .gitignore 강화 (백업 파일 자동 제외)

### 📂 문서 구조
```
docs/
├── GETTING_STARTED.md        # 시작 가이드
├── DEPLOYMENT.md              # 배포 가이드
├── FIREBASE_STRUCTURE.md      # Firebase 구조
├── DESIGN_SYSTEM.md           # 디자인 시스템
├── FILE_TREE.md              # 파일 구조
├── OPTIMIZATION_REPORT.md     # 최적화 보고서
├── MAINTENANCE_IMPROVEMENTS.md # 유지보수 개선
├── PROJECT_COMPLETE.md        # 프로젝트 완료 보고
├── PROJECT_FINAL_REPORT.md    # 최종 보고서
└── GIT_MANAGEMENT.md          # Git 관리 가이드 (이 문서)
```

## 🚨 긴급 상황 대처

### 잘못된 커밋을 푸시한 경우
```bash
# 마지막 커밋 취소 (로컬)
git reset HEAD~1

# 원격에서도 취소 (주의: 팀원과 협의 필요)
git push -f origin branch-name
```

### 실수로 main에 직접 커밋한 경우
```bash
# 새 브랜치 생성하여 커밋 옮기기
git branch feature/temp-branch
git reset HEAD~1 --hard
git checkout feature/temp-branch
```

### 병합 충돌 해결
```bash
# 충돌 파일 확인
git status

# 파일 수동 수정 후
git add <resolved-file>
git commit

# 병합 취소
git merge --abort
```

## 📚 추가 학습 자료

- [Pro Git Book (한글)](https://git-scm.com/book/ko/v2)
- [GitHub Docs](https://docs.github.com/ko)
- [Git 브랜치 전략](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/ko/)

---

**마지막 업데이트**: 2024년 12월 19일  
**관리 원칙**: Git만으로 버전 관리, 이중 보관 금지  
**다음 점검**: 2025년 1월 1일
