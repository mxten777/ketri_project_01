# SEO 마이그레이션 실행 계획서

작성일: 2025-12-24
대상사이트(예): https://www.kesri.co.kr (이전: www.ketri.co.kr)

요약
- 목적: 리뉴얼·도메인 이전 시 검색엔진 트래픽 손실 최소화 및 가시성 향상
- 산출물: 기술감사 리포트, 키워드 매핑, `sitemap.xml`, `robots.txt`, 301 리디렉션 맵(CSV), 온페이지 수정 리스트, 구조화 데이터(JSON-LD), 검수 체크리스트

---

## 단계별 수행계획 (순차)

1) 기술 SEO 감사 (T0)
- 목적: 크롤링 가능한 전체 URL 식별, 크리티컬 이슈(404, 불필요 차단, duplicate meta) 파악
- 방법/툴: Screaming Frog / Sitebulb / Chrome Lighthouse(팀별), PageSpeed Insights
- 산출물: `audit/technical-audit.md` (요약), `audit/crawl-report.csv`
- 소요(예): 1일
- 체크리스트 예:
  - robots.txt, sitemap.xml 존재 여부 확인
  - HTTP 상태 코드(200/301/404/500) 점검
  - 중복 title/description, missing H1
  - 이미지 alt, lazy loading 확인

2) 기존 URL 수집 및 301 리디렉션 맵 작성 (T1)
- 목적: 모든 운영중인 URL → 신규 URL(또는 동일 도메인 내부 변경) 매핑(301)
- 입력: 크롤링 결과 + CMS(게시판) DB export 또는 sitemap.xml
- 산출물: `redirects/redirects.csv` (header: `old_url,new_url,notes`)
- 샘플 행: `https://www.ketri.co.kr/old-page,https://www.kesri.co.kr/new-page,service page`
- 소요: 게시물 수에 따라 1일–1주

3) sitemap.xml 및 robots.txt 생성 (T2)
- 목적: 검색엔진에 새 구조 전달, 크롤러 행동 제어
- 산출물: `public/sitemap.xml`, `public/robots.txt` (템플릿 제공)
- 권장: 빌드/배포 단계에서 동적 생성(게시글 자동 포함)
- 예제 명령:

```bash
# 빌드 시 자동 생성(예시)
node scripts/generate-sitemap.js
```

4) 키워드 리서치 및 페이지 매핑 (T3)
- 목적: 주요 서비스·랜딩 페이지에 맞는 키워드 배치로 검색 유입 최적화
- 방법: 키워드 툴(네이버 키워드 플래너/Google Keyword Planner, Ahrefs, SEMrush), 경쟁사 분석
- 산출물: `seo/keyword-mapping.xlsx` (columns: page, primary_kw, secondary_kw, intent)
- 소요: 2–5일 (서비스 면수에 따라)

5) 온페이지 SEO 및 구조화 데이터 적용 (T4)
- 목적: title/description/H1/OG/canonical 및 JSON-LD 적용
- 산출물: `seo/onpage-tasks.md` (파일별 수정사항), JSON-LD 템플릿
- 예: `Organization` JSON-LD, `Service` 스키마 템플릿

6) 성능 최적화 (T5)
- 목적: Core Web Vitals 개선(LCP, FID/INP, CLS)
- 조치: 이미지 최적화(WebP/AVIF), 지연 로딩, 코드 스플리팅, 서버 응답시간 개선, CDN
- 산출물: `performance/report.md`

7) 추적·검증 설정 (T6)
- 목적: GSC, Naver Webmaster, GA4, GTag, Uptime 모니터링 설정
- 산출물: `tracking/setup-guide.md` (소유권 확인, 사이트맵 제출, G-Tag 설치 가이드)

8) 마이그레이션 전 최종 체크 및 배포(PO)
- 항목: robots/sitemap 배포, 301 적용 확인(무한루프/체인 없음), SSL, 메타/OG 확인
- 산출물: `handoff/production-checklist.md`
- 모니터링: 4주 집중(인덱싱·트래픽·에러)

---

## 산출물 템플릿(예)

### 1) `redirects/redirects.csv` (CSV 템플릿)
old_url,new_url,notes
https://www.ketri.co.kr/about/greeting,https://www.kesri.co.kr/about/greeting,company greeting

### 2) `public/robots.txt` (권장 기본)
```
User-agent: *
Disallow: /admin/
Sitemap: https://www.kesri.co.kr/sitemap.xml
```

### 3) `public/sitemap.xml` (초안 형식)
- (앞서 생성한 `sitemap.xml` 초안 예시를 사용)

### 4) JSON-LD 예제 (Organization)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "한국환경안전연구소",
  "url": "https://www.kesri.co.kr",
  "logo": "https://www.kesri.co.kr/images/logo_horizontal_trans.png",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+82-43-237-7824",
    "contactType": "customer service"
  }],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "청주시",
    "addressRegion": "충북",
    "streetAddress": "남이면 양촌 3길 7-30"
  }
}
```

---

## 권장 일정(예, 핵심 페이지 우선)
- 주 0: 기술 감사 + 기존 URL 수집
- 주 1: 리디렉션 맵 확정 및 robots/sitemap 준비
- 주 2: 온페이지 적용(상위 10개 페이지 우선) + JSON-LD 적용
- 주 3: 배포 및 GSC/Naver 제출, 모니터링 시작
- 주 4–8: 모니터링·보정·추가 페이지 적용

---

## 검수 체크리스트 (배포 직전)
- [ ] `public/sitemap.xml` 배포 및 GSC 제출
- [ ] `robots.txt` 확인(크롤러 차단 목록 적절)
- [ ] 301 리디렉션 맵(샘플 + 랜덤 체킹 통과)
- [ ] SSL 적용(HTTPS 강제 리디렉션)
- [ ] 메타/OG/Canonical 정상 적용
- [ ] 구조화 데이터 오류 없음(Google Rich Results Test)
- [ ] GA4/GSC/Naver 태그 및 이벤트 정상 동작

---

## 전달물 형식 및 권장 커뮤니케이션
- 문서: Markdown (`docs/`), CSV(redirects), XML(sitemap), XLSX(keyword mapping)
- 인수인계: 기술담당자와 함께 1시간 검수 회의(화면 공유)
- 긴급 대응: 배포 후 72시간 내 1:1 커뮤니케이션 라인 확보

---

문서 저장 위치: `docs/SEO_MIGRATION_PLAN.md`

원하시면 다음 작업부터 제가 바로 실행하겠습니다:
- (A) 기술감사(크롤링) 실행 및 리포트 생성
- (B) 기존 사이트 자동 크롤링하여 `redirects/redirects.csv` 초안 생성
- (C) `public/sitemap.xml` 파일 생성 및 커밋

원하시는 첫 작업을 말씀해 주세요.
