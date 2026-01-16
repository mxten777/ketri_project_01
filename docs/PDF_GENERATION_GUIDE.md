# PDF 자동 생성 가이드

## 🎯 개요
sitemap.xml의 모든 페이지를 자동으로 PDF로 변환하는 스크립트입니다.

## 📋 사전 준비

### 1. 개발 서버 실행 필수
PDF 생성 전에 반드시 개발 서버를 먼저 실행해야 합니다:

```powershell
npm run dev
```

서버가 `http://localhost:3004`에서 실행되는지 확인하세요.

### 2. 별도 터미널에서 PDF 생성

**기본 실행** (PDF만 생성):
```powershell
npm run pdf:all
```

**생성 후 폴더 자동 열기**:
```powershell
npm run pdf:all:open
```

## 📁 출력 위치
생성된 PDF는 `pdf-output/` 폴더에 저장됩니다:

```
pdf-output/
  ├── home.pdf
  ├── about.pdf
  ├── about_greeting.pdf
  ├── about_history.pdf
  ├── services_industrial-health.pdf
  └── ...
```

## ⚙️ 설정 변경

`scripts/generate-pdfs.mjs` 파일에서 설정을 수정할 수 있습니다:

```javascript
const CONFIG = {
  // 로컬 개발
  baseUrl: 'http://localhost:3004',
  
  // 프로덕션 (배포 후 사용)
  // baseUrl: 'https://kesri.re.kr',
  
  // 출력 디렉토리
  outputDir: join(__dirname, '../pdf-output'),
  
  // PDF 여백
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.8cm',
      right: '0.8cm',
      bottom: '0.8cm',
      left: '0.8cm',
    },
  },
  
  // 페이지 로딩 대기 시간 (ms)
  waitTime: 2000,
};
```

## 🔧 문제 해결

### 에러: "net::ERR_CONNECTION_REFUSED"
**원인**: 개발 서버가 실행되지 않음  
**해결**: `npm run dev`로 서버 먼저 시작

### 특정 페이지가 빈 PDF로 생성됨
**원인**: 페이지 로딩 시간 부족  
**해결**: `CONFIG.waitTime`을 늘림 (예: 3000)

### 스타일이 적용되지 않음
**원인**: print.css 미적용  
**확인**: 브라우저에서 Ctrl+P로 수동 테스트

### Admin 페이지가 포함 안 됨
**원인**: sitemap.xml에 Admin URL 없음  
**해결**: Admin은 별도 스크립트 필요 (인증 때문)

## 🚀 실행 예시

```powershell
# 터미널 1: 개발 서버
PS C:\ketricoding\ketri_project_01> npm run dev

# 터미널 2: PDF 생성
PS C:\ketricoding\ketri_project_01> npm run pdf:all

🚀 PDF 생성 자동화 시작

📖 sitemap.xml 읽는 중...
📋 총 15개 페이지 발견

🌐 브라우저 시작 중...

📄 생성 중: http://localhost:3004/
✅ 완료: C:\ketricoding\ketri_project_01\pdf-output\home.pdf

📄 생성 중: http://localhost:3004/about
✅ 완료: C:\ketricoding\ketri_project_01\pdf-output\about.pdf

...

============================================================
📊 생성 결과 요약
============================================================
✅ 성공: 15개
❌ 실패: 0개
📁 출력 위치: C:\ketricoding\ketri_project_01\pdf-output

✨ 완료!
```

## 📝 프로덕션 배포 후

배포 후에는 `generate-pdfs.mjs`에서 baseUrl 변경:

```javascript
// 주석 처리
// baseUrl: 'http://localhost:3004',

// 주석 해제
baseUrl: 'https://kesri.re.kr',
```

그러면 배포된 사이트에서 직접 PDF 생성이 가능합니다.

## 🎨 PDF 스타일 수정

PDF 스타일은 `src/styles/print.css`에서 수정합니다.
수정 후 개발 서버를 재시작하고 PDF를 다시 생성하세요.
