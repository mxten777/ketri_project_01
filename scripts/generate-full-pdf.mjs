#!/usr/bin/env node
/**
 * 전체 사이트 통합 PDF 생성
 * /print-all 페이지를 PDF로 변환
 */

import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
  baseUrl: 'http://localhost:3004',
  outputDir: join(__dirname, '../pdf-output'),
  outputFile: '전체사이트_통합문서.pdf',
  
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm',
    },
    displayHeaderFooter: false,
    preferCSSPageSize: false,
  },
  
  waitTime: 8000, // 모든 콘텐츠 로딩 대기
};

async function generateFullPdf() {
  console.log('🚀 전체 사이트 통합 PDF 생성 시작\n');
  
  // 출력 디렉토리 생성
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  
  try {
    const url = `${CONFIG.baseUrl}/print-all`;
    console.log(`📄 페이지 로딩: ${url}`);
    
    // 페이지 열기
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
    
    // 추가 대기 (모든 콘텐츠 로딩)
    console.log('⏳ 콘텐츠 로딩 대기 중...');
    await new Promise(resolve => setTimeout(resolve, CONFIG.waitTime));
    
    // Print CSS 적용
    await page.emulateMediaType('print');
    
    // PDF 생성
    const outputPath = join(CONFIG.outputDir, CONFIG.outputFile);
    console.log('📝 PDF 생성 중...');
    
    await page.pdf({
      path: outputPath,
      ...CONFIG.pdfOptions,
    });
    
    console.log(`\n✅ 생성 완료: ${outputPath}`);
    console.log('\n💡 팁: 브라우저에서 직접 Ctrl+P로도 저장할 수 있습니다.');
    console.log(`   → ${url}`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
  
  // --open 플래그가 있으면 폴더 열기
  if (process.argv.includes('--open')) {
    const { exec } = await import('child_process');
    exec(`explorer "${CONFIG.outputDir}"`);
  }
}

generateFullPdf().catch(error => {
  console.error('❌ 치명적 오류:', error);
  process.exit(1);
});
