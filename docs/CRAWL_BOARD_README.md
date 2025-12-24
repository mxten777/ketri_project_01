# 게시판 크롤러 사용법

이 스크립트는 JavaScript 렌더링 페이지에서도 게시판 목록을 렌더링한 후 게시물 링크를 수집하도록 Puppeteer를 사용합니다.

요구사항
- Node.js 18+ (프로젝트 요구사항과 동일)

설치
```bash
cd <repo-root>
npm install puppeteer minimist
```

사용 예시
```bash
# 공지사항 크롤링 (최대 100 페이지)
node scripts/crawl_board.js --base https://www.kesri.co.kr --board /board/notice --out redirects/notice_urls.csv --max 100

# QnA 크롤링
node scripts/crawl_board.js --base https://www.kesri.co.kr --board /board/qna --out redirects/qna_urls.csv --max 100
```

출력
- 지정한 `--out` 경로에 게시물 URL을 한 줄에 하나씩 저장합니다.

다음 단계
1. 생성된 CSV를 확인하여 URL 패턴(예: `/board/notice/123`)을 `redirects/redirects.csv`에 병합하세요.
2. 필요하면 `scripts/convert-redirects.js`를 만들어 Vercel 또는 Nginx 형식의 리디렉션 규칙으로 자동 변환할 수 있습니다.

참고
- 웹서버가 로봇 차단 또는 인증을 요구하면 크롤링이 실패합니다. 이 경우 CMS에서 DB export 또는 사이트 소유자가 제공한 sitemap.xml을 요청하세요.