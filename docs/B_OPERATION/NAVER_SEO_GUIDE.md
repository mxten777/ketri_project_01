# 네이버 노출(SEO) 작업 가이드

> 작성일: 2026-03-04 / 최종 업데이트: 2026-03-05  
> 대상 도메인: https://www.kesri.co.kr

---

## 1. 완료된 작업

### 1-1. 도메인 통일 수정
기존 파일들에 `kesri.re.kr`, `kesri.co.kr` 등 잘못된 도메인이 혼재되어 있어 `www.kesri.co.kr`로 일괄 수정.

| 파일 | 수정 내용 |
|------|-----------|
| `public/robots.txt` | Sitemap URL을 `https://www.kesri.co.kr/sitemap.xml`로 수정 |
| `public/sitemap.xml` | 전체 URL을 `https://www.kesri.co.kr/...`로 수정 |
| `index.html` | canonical, og:url 등 모든 도메인을 `www.kesri.co.kr`로 수정 |

### 1-2. sitemap.xml 인코딩 오류 수정
- **원인**: 파일이 EUC-KR로 저장되어 있었으나 XML 헤더에 `encoding="UTF-8"` 선언 → 파서 충돌
- **조치**: UTF-8로 파일 재작성, 한글 주석 정상화

### 1-3. 기존 SEO 구성 현황 (최초 작업 전 이미 구성됨)
- `index.html`: Primary Meta Tags, Open Graph, Twitter Card, Schema.org JSON-LD 포함
- `public/robots.txt`: 전체 허용(`Allow: /`) + Sitemap 경로 지정
- `public/sitemap.xml`: 전체 페이지 URL 등록 (홈, 연구소소개, 5대 서비스, 게시판)

### 1-4. 네이버 서치어드바이저 소유 확인 완료 (2026-03-05)
- `index.html`에 `naver-site-verification` 태그 삽입 후 Vercel 배포
- 서치어드바이저 소유 확인 **완료** (코드: `d63ffd80a1bfae9abc2d73f7373228a0c0561336`)

---

## 2. 남은 작업 (필수)

### ~~2-1. 네이버 서치어드바이저 사이트 등록~~ ✅ 완료 (2026-03-05)

### ~~2-2. sitemap.xml 제출~~ ✅ 완료 (2026-03-05)
- 제출 URL: `https://www.kesri.co.kr/sitemap.xml` (26.03.05 14:32:28 등록)

### ~~2-3. 수집 요청~~ ✅ 완료 (2026-03-05)
- `/` 홈, 5대 서비스, `/about`, `/about/location`, `/about/certificates` 등 9개 페이지 등록 (14:36~14:40)

---

## 2-A. 필수 SEO 작업 전체 완료 ✅
소유 확인 → sitemap 제출 → 웹 페이지 수집 요청이 모두 완료되었습니다.  
이제 **1~7일** 내 첫 크롤링, **2~4주** 후 네이버 검색 결과 노출 시작 예정.

---

## 3. 선택 작업 (노출 강화)

| 항목 | 방법 | 효과 |
|------|------|------|
| 네이버 플레이스 등록 | [place.naver.com](https://place.naver.com) | 지역 검색 노출 (충북 청주) |
| 네이버 블로그 운영 | 서비스 관련 정보성 글 작성 | 브랜드 키워드 노출 강화 |
| RSS 피드 등록 | sitemap 외 RSS 파일 생성 후 제출 | 게시판/공지 콘텐츠 색인 |

---

## 3-A. 네이버 플레이스 등록 상세 가이드

### 개요
[place.naver.com](https://place.naver.com)에 업체를 등록하면 **네이버 지도·지역 검색 결과** 상단에 기관 정보가 노출됩니다.  
"청주 환경안전연구소", "충북 석면조사" 등 지역 키워드 검색 시 핀 마커와 함께 표시됩니다.

### 등록 절차

**① 접속 및 로그인**
- [place.naver.com](https://place.naver.com) 접속 → 네이버 계정 로그인

**② 업체 등록**
- **"내 업체 등록"** 또는 **"업체 정보 관리"** 클릭
- 업종 선택: `연구소 / 환경 / 검사기관` 계열

**③ 필수 입력 정보**

| 항목 | 입력 내용 |
|------|-----------|
| 업체명 | 한국환경안전연구소 |
| 업종 | 환경관련 서비스업 |
| 주소 | 충청북도 청주시 (사업자등록증 주소와 동일하게) |
| 전화번호 | 대표 전화번호 |
| 홈페이지 URL | `https://www.kesri.co.kr` |
| 영업시간 | 평일 09:00~18:00 등 |

**④ 소유자 인증**
- 사업자등록번호 입력 또는 전화 인증으로 업체 소유 확인

**⑤ 사진 및 상세정보 등록 (노출 강화)**
- 기관 외관 사진, 장비 사진, 인증서 등 등록
- 상세 설명에 핵심 서비스 키워드 포함:
  - 석면조사·분석, 실내공기질측정, 작업환경측정, 먹는물검사, 혈액투석용수검사

### 등록 후 기대 효과
- 네이버 지도에 **핀 마커** 표시
- "청주 환경조사", "충북 석면조사" 등 지역 검색 노출
- 리뷰·별점 기능으로 신뢰도 향상
- 네이버 검색 결과 **지식그래프(Knowledge Panel)** 에 기관 정보 표시

### 주의사항
- 사업자등록증 주소와 등록 주소가 **반드시 일치**해야 인증 통과
- 홈페이지 URL은 `https://www.kesri.co.kr` 로 통일 (서브도메인 없이)
- 등록 후 검색 반영까지 **1~3일** 소요

---

## 4. 색인 반영 소요 시간

| 단계 | 예상 기간 |
|------|-----------|
| 사이트 등록 + 소유 확인 | 즉시 |
| 첫 크롤링 | 1~7일 |
| 검색 결과 노출 시작 | 2~4주 |
| 브랜드명 검색 상위 노출 안정화 | 1~2개월 |

---

## 5. 현재 index.html SEO 구성 요약

```html
<!-- 기본 메타 -->
<meta name="title" content="한국환경안전연구소 | ..." />
<meta name="description" content="..." />
<meta name="keywords" content="한국환경안전연구소, KESRI, ..." />
<link rel="canonical" href="https://www.kesri.co.kr/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.kesri.co.kr/" />
<meta property="og:image" content="https://www.kesri.co.kr/og-image.jpg" />

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
  { "@type": "Organization", "name": "한국환경안전연구소", ... }
</script>

<!-- 네이버 소유 확인 (2026-03-05 완료) -->
<meta name="naver-site-verification" content="d63ffd80a1bfae9abc2d73f7373228a0c0561336" />
```

---

> **현재 상태**: 필수 SEO 작업 전체 완료. **1~7일** 내 코드 크롤링 시작, **2~4주** 후 검색 노출 예상.  
> 선택 작업(섹션 3): 네이버 플레이스 등록 및 블로그 운영으로 노출 강화 가능
