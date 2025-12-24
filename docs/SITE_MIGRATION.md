# 사이트 이전 및 SEO 산출물

작성일: 2025-12-24

이 문서는 https://www.kesri.co.kr 사이트를 기준으로 리뉴얼·사이트 이전 시 필요한 산출물을 정리한 Markdown 문서입니다.

---

## 1) 사이트맵용 URL 목록

- https://www.kesri.co.kr/
- https://www.kesri.co.kr/about/greeting
- https://www.kesri.co.kr/about/history
- https://www.kesri.co.kr/about/location
- https://www.kesri.co.kr/about/organization
- https://www.kesri.co.kr/about/equipment
- https://www.kesri.co.kr/about/certificates
- https://www.kesri.co.kr/services/industrial-health
- https://www.kesri.co.kr/services/water-testing
- https://www.kesri.co.kr/services/asbestos
- https://www.kesri.co.kr/services/asbestos/air
- https://www.kesri.co.kr/services/asbestos/concentration
- https://www.kesri.co.kr/services/asbestos/dispersion
- https://www.kesri.co.kr/services/asbestos/risk
- https://www.kesri.co.kr/services/asbestos/supervision
- https://www.kesri.co.kr/services/asbestos/survey
- https://www.kesri.co.kr/services/dialysis-water
- https://www.kesri.co.kr/services/dialysis-water/intro
- https://www.kesri.co.kr/services/dialysis-water/cycle
- https://www.kesri.co.kr/services/dialysis-water/sampling
- https://www.kesri.co.kr/services/dialysis-water/request
- https://www.kesri.co.kr/services/dialysis-water/standard
- https://www.kesri.co.kr/services/indoor-air-quality
- https://www.kesri.co.kr/services/indoor-air-quality/intro
- https://www.kesri.co.kr/services/indoor-air-quality/request
- https://www.kesri.co.kr/services/indoor-air-quality/result
- https://www.kesri.co.kr/services/water-testing/intro
- https://www.kesri.co.kr/services/water-testing/process
- https://www.kesri.co.kr/services/water-testing/scope
- https://www.kesri.co.kr/services/water-testing/fees
- https://www.kesri.co.kr/board/notice
- https://www.kesri.co.kr/board/notice/{id}  *(공지 상세 — 마이그레이션 시 모든 포스트를 개별 URL로 포함)*
- https://www.kesri.co.kr/board/qna
- https://www.kesri.co.kr/board/qna/{id}
- https://www.kesri.co.kr/board/free-list
- https://www.kesri.co.kr/contact
- https://www.kesri.co.kr/terms
- https://www.kesri.co.kr/privacy
- https://www.kesri.co.kr/admin/login  *(robots 차단 권장)*

> 메모: 게시판/블로그/공지의 모든 항목은 개별 URL로 sitemap에 포함해야 합니다. 자동 추출 스크립트 사용 권장.

---

## 2) 메뉴 ↔ URL 매핑표

| 메뉴 (상위) | 하위 메뉴 | URL |
|---|---:|---|
| 홈 | — | https://www.kesri.co.kr/ |
| 회사소개 | 인사말 | https://www.kesri.co.kr/about/greeting |
|  | 연혁 | https://www.kesri.co.kr/about/history |
|  | 조직/인증 | https://www.kesri.co.kr/about/organization |
|  | 장비 | https://www.kesri.co.kr/about/equipment |
|  | 인증서 | https://www.kesri.co.kr/about/certificates |
|  | 오시는 길 | https://www.kesri.co.kr/about/location |
| 서비스 | 산업보건 | https://www.kesri.co.kr/services/industrial-health |
|  | 먹는물(수질검사) | https://www.kesri.co.kr/services/water-testing |
|  | 석면 | https://www.kesri.co.kr/services/asbestos |
|  | 석면 - 공기 | https://www.kesri.co.kr/services/asbestos/air |
|  | 석면 - 농도 | https://www.kesri.co.kr/services/asbestos/concentration |
|  | 석면 - 확산 | https://www.kesri.co.kr/services/asbestos/dispersion |
|  | 석면 - 리스크 | https://www.kesri.co.kr/services/asbestos/risk |
|  | 석면 - 감독 | https://www.kesri.co.kr/services/asbestos/supervision |
|  | 석면 - 조사 | https://www.kesri.co.kr/services/asbestos/survey |
|  | 실내공기질 | https://www.kesri.co.kr/services/indoor-air-quality |
|  | 투석용수 | https://www.kesri.co.kr/services/dialysis-water |
| 자료/공지 | 공지사항 | https://www.kesri.co.kr/board/notice |
|  | Q&A | https://www.kesri.co.kr/board/qna |
| 정책 | 이용약관 | https://www.kesri.co.kr/terms |
|  | 개인정보처리방침 | https://www.kesri.co.kr/privacy |
| 고객지원 | 문의 | https://www.kesri.co.kr/contact |
| 관리자 | Admin 로그인 | https://www.kesri.co.kr/admin/login *(크롤러 차단)* |

---

## 3) sitemap.xml 초안

아래는 기본 sitemap.xml 초안입니다. 실제 마이그레이션 전후로 `lastmod`와 동적 게시물 URL을 자동 생성해 반영하세요.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.kesri.co.kr/</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/about/greeting</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/about/history</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/about/location</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- 서비스 주요 페이지 -->
  <url>
    <loc>https://www.kesri.co.kr/services/industrial-health</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/services/water-testing</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/services/asbestos</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 게시판 및 정책 -->
  <url>
    <loc>https://www.kesri.co.kr/board/notice</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/terms</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://www.kesri.co.kr/privacy</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- 관리자(robots에 차단 권장) -->
  <url>
    <loc>https://www.kesri.co.kr/admin/login</loc>
    <lastmod>2025-12-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.1</priority>
  </url>
</urlset>
```

> 권장: 게시판/공지 각각의 포스트 URL을 빌드 과정에서 자동으로 나열해 sitemap을 완성하세요.

---

## 4) 고객사 전달용 안내 문구 (복사·붙여넣기 가능)

### 제목
사이트 리뉴얼 관련 SEO·사이트 이전 안내 (한국환경안전연구소)

### 본문
안녕하세요, (담당자명)님.

한국환경안전연구소 웹사이트 리뉴얼 및 사이트 이전 관련하여 아래 사항을 안내드립니다. 서비스 중단을 최소화하고 검색엔진 영향을 줄이기 위해 아래 항목을 확인해 주십시오.

1) 이전 범위
- 도메인: https://www.kesri.co.kr (변경없음) 또는 신규 도메인 적용 시 별도 협의
- 이전 대상: 홈페이지, 회사소개, 서비스, 공지사항(전체), 정책 페이지 등

2) 제공 산출물
- 사이트맵용 URL 목록 (전체 페이지)
- 메뉴 ↔ URL 매핑표
- sitemap.xml 초안 (검색엔진 제출용)
- 기존 URL → 신규 URL 301 리디렉션 맵(필수)

3) 필수 작업
- 모든 기존 URL에 대해 301 리디렉션 설정(중요)
- sitemap.xml 및 robots.txt 공개 후 Google Search Console, Naver Webmaster에 사이트맵 제출
- 페이지별 메타(title, description), H1, canonical 태그 확인
- 구조화된 데이터(JSON-LD) 적용 권장
- 모바일·속도 성능 테스트 및 문제 해결

4) 배포 후 검수(권장)
- 2주간 인덱싱·트래픽 모니터링
- 301 리디렉션 정상동작 점검
- 주요 랜딩 페이지 클릭·콘텐츠 확인

5) 연락처
- 기술 담당: (이름) / (전화) / (이메일)

감사합니다.

---

## 추가 옵션
- CSV/Excel로 URL 목록 추출을 원하시면 알려주세요.
- `public/sitemap.xml` 파일을 리포지토리에 추가(자동 생성 스크립트 포함)해 드릴 수 있습니다.

---

문서 저장 위치: `docs/SITE_MIGRATION.md`

원하시면 이 파일을 분리(예: `sitemap.xml`, `urls.csv`)하거나, 게시판 포스트까지 크롤링해 전체 URL을 확장해 드리겠습니다.