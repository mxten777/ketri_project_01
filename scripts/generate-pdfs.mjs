#!/usr/bin/env node
/**
 * PDF 생성 자동화 스크립트
 * 
 * 기능:
 * - sitemap.xml에서 모든 URL 읽기
 * - 각 페이지를 Puppeteer로 열어서 PDF 생성
 * - 헤더/푸터 제거된 깔끔한 PDF
 * - print.css 자동 적용
 * 
 * 사용법:
 *   npm run pdf:all              # 전체 페이지 PDF 생성
 *   npm run pdf:all -- --open    # 생성 후 폴더 열기
 */

import puppeteer from 'puppeteer';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ========== 설정 ==========
const CONFIG = {
  // 개발 서버 URL (로컬 테스트)
  baseUrl: 'http://localhost:3004',
  
  // 프로덕션 URL (배포 후 사용)
  // baseUrl: 'https://kesri.re.kr',
  
  // 출력 디렉토리
  outputDir: join(__dirname, '../pdf-output'),
  
  // sitemap 경로
  sitemapPath: join(__dirname, '../public/sitemap.xml'),
  
  // PDF 옵션
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5cm',
      right: '0.5cm',
      bottom: '0.5cm',
      left: '0.5cm',
    },
    // 페이지 범위 자동 조정
    preferCSSPageSize: false,
    // 배경 그래픽 출력
    displayHeaderFooter: false,
  },
  
  // 페이지 로딩 대기 시간 (밀리초)
  waitTime: 5000, // 충분한 로딩 시간 확보
};

// ========== URL 파싱 ==========
function parseUrlsFromSitemap(xmlContent) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

// ========== URL을 파일명으로 변환 (한글) ==========
function urlToFilename(url) {
  const urlObj = new URL(url);
  let path = urlObj.pathname;
  
  // URL 경로를 한글 파일명으로 매핑
  const pathToKorean = {
    '/': '홈페이지',
    '/about': '연구소소개',
    '/about/greeting': '인사말',
    '/about/history': '연혁',
    '/about/organization': '조직도',
    '/about/equipment': '보유장비',
    '/about/certificates': '인증서_자격현황',
    '/about/ci': 'CI소개',
    '/about/location': '오시는길',
    '/services/industrial-health': '작업환경측정',
    '/services/water-testing': '먹는물검사',
    '/services/dialysis-water': '혈액투석용수검사',
    '/services/indoor-air-quality': '실내공기질측정',
    '/services/asbestos': '석면조사분석',
    '/board/notice': '공지사항',
    '/print-all': '전체사이트_통합문서',
  };
  
  const koreanName = pathToKorean[path] || path.replace(/^\//, '').replace(/\//g, '_');
  return `${koreanName}.pdf`;
}

// ========== 단일 페이지 PDF 생성 ==========
async function generatePdf(browser, url, outputPath) {
  console.log(`📄 생성 중: ${url}`);
  
  const page = await browser.newPage();
  
  try {
    // 페이지 열기
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    
    // 추가 대기 (동적 콘텐츠 로딩)
    await new Promise(resolve => setTimeout(resolve, CONFIG.waitTime));
    
    // print CSS 에뮬레이션
    await page.emulateMediaType('print');
    
    // PDF 생성
    await page.pdf({
      path: outputPath,
      ...CONFIG.pdfOptions,
    });
    
    console.log(`✅ 완료: ${outputPath}`);
    return { success: true, url, outputPath };
    
  } catch (error) {
    console.error(`❌ 실패: ${url}`);
    console.error(`   오류: ${error.message}`);
    return { success: false, url, error: error.message };
    
  } finally {
    await page.close();
  }
}

// ========== 메인 실행 ==========
async function main() {
  console.log('🚀 PDF 생성 자동화 시작\n');
  
  // 출력 디렉토리 생성
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // sitemap.xml 읽기
  console.log('📖 sitemap.xml 읽는 중...');
  const sitemapContent = readFileSync(CONFIG.sitemapPath, 'utf-8');
  const urls = parseUrlsFromSitemap(sitemapContent);
  
  console.log(`📋 총 ${urls.length}개 페이지 발견\n`);
  
  // Puppeteer 브라우저 시작
  console.log('🌐 브라우저 시작 중...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const results = [];
  
  // 각 URL을 로컬 URL로 변환하고 PDF 생성
  for (const url of urls) {
    const urlObj = new URL(url);
    const localUrl = `${CONFIG.baseUrl}${urlObj.pathname}`;
    const filename = urlToFilename(url);
    const outputPath = join(CONFIG.outputDir, filename);
    
    const result = await generatePdf(browser, localUrl, outputPath);
    results.push(result);
  }
  
  await browser.close();
  
  // 결과 요약
  console.log('\n' + '='.repeat(60));
  console.log('📊 생성 결과 요약');
  console.log('='.repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${failCount}개`);
  console.log(`📁 출력 위치: ${CONFIG.outputDir}`);
  
  if (failCount > 0) {
    console.log('\n실패한 페이지:');
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`  - ${r.url}: ${r.error}`));
  }
  
  console.log('\n✨ 완료!');
  
  // --open 플래그가 있으면 폴더 열기
  if (process.argv.includes('--open')) {
    const { exec } = await import('child_process');
    exec(`explorer "${CONFIG.outputDir}"`);
  }
}

// ========== 에러 핸들링 ==========
main().catch(error => {
  console.error('❌ 치명적 오류:', error);
  process.exit(1);
});
