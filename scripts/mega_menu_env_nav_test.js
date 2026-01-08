/**
 * 환경측정 메가메뉴 네비게이션 50회 반복 테스트
 * 
 * 사용법:
 * 1. 로컬 개발 서버 실행 (npm run dev)
 * 2. 브라우저에서 http://localhost:5173 접속
 * 3. 개발자 도구 콘솔에서 이 스크립트 복사 후 실행
 */

(async function megaMenuEnvNavTest() {
  console.log('🧪 환경측정 메가메뉴 네비게이션 테스트 시작');
  console.log('━'.repeat(60));

  const results = {
    total: 50,
    passed: 0,
    failed: 0,
    errors: [],
  };

  // 테스트 헬퍼 함수
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const clickMegaMenuItem = async (label, targetPath) => {
    // 메뉴 트리거 찾기 (desktop nav의 링크들)
    const navLinks = document.querySelectorAll('#site-header nav a, #site-header nav button');
    let clicked = false;
    
    for (const navLink of navLinks) {
      const text = navLink.textContent?.trim() || '';
      if (text === label || (label === '작업환경측정' && text.includes('작업환경'))) {
        // Hover 시뮬레이션
        navLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await wait(300); // 메뉴 열리는 시간 대기
        
        // 메가메뉴에서 항목 찾기
        const megaPanel = document.querySelector('[data-mega-hoverzone="true"]');
        if (megaPanel) {
          const links = megaPanel.querySelectorAll('a');
          for (const link of links) {
            const href = link.getAttribute('href');
            const linkText = link.textContent?.trim() || '';
            
            // 정확한 경로 또는 텍스트 매칭
            if (href === targetPath || 
                (targetPath && href?.startsWith(targetPath.split('#')[0])) ||
                (label === linkText)) {
              console.log(`🖱️ Clicking: ${linkText} (${href})`);
              link.click();
              clicked = true;
              await wait(400); // 네비게이션 대기
              break;
            }
          }
        }
        break;
      }
    }
    
    return clicked;
  };

  const checkScroll = (expected, tolerance = 5) => {
    const actual = window.scrollY;
    return Math.abs(actual - expected) <= tolerance;
  };

  // 홈으로 돌아가기
  const goHome = async () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      await wait(200);
    }
  };

  // 테스트 반복
  for (let i = 1; i <= results.total; i++) {
    console.group(`\n🔄 테스트 ${i}/${results.total}`);
    
    try {
      // A) 홈 → 환경측정
      console.log('A) 홈 → 작업환경측정');
      await goHome();
      const step1 = await clickMegaMenuItem('작업환경측정', '/services/industrial-health');
      
      if (!step1) {
        throw new Error('작업환경측정 메뉴를 찾을 수 없음');
      }
      
      await wait(500);
      
      if (window.location.pathname !== '/services/industrial-health') {
        throw new Error(`경로 오류: ${window.location.pathname} (expected: /services/industrial-health)`);
      }
      
      if (!checkScroll(0)) {
        throw new Error(`스크롤 오류: scrollY=${window.scrollY} (expected: 0)`);
      }
      
      console.log('✅ A 통과: 환경측정 진입 성공, scrollY=0');

      // B) 환경측정 → 오시는길#map
      console.log('B) 작업환경측정 → 오시는길#map');
      const step2 = await clickMegaMenuItem('오시는길', '/about/location#map');
      
      if (!step2) {
        throw new Error('오시는길 메뉴를 찾을 수 없음');
      }
      
      await wait(500);
      
      if (!window.location.pathname.includes('/about/location')) {
        throw new Error(`경로 오류: ${window.location.pathname} (expected: /about/location)`);
      }
      
      console.log('✅ B 통과: 오시는길 진입 성공');

      // C) 오시는길 → 환경측정 (다시)
      console.log('C) 오시는길 → 작업환경측정 (재진입)');
      const step3 = await clickMegaMenuItem('작업환경측정', '/services/industrial-health');
      
      if (!step3) {
        throw new Error('작업환경측정 메뉴를 찾을 수 없음 (재진입)');
      }
      
      await wait(500);
      
      if (window.location.pathname !== '/services/industrial-health') {
        throw new Error(`경로 오류: ${window.location.pathname} (expected: /services/industrial-health)`);
      }
      
      if (!checkScroll(0)) {
        throw new Error(`스크롤 오류 (재진입): scrollY=${window.scrollY} (expected: 0)`);
      }
      
      console.log('✅ C 통과: 환경측정 재진입 성공, scrollY=0');
      
      results.passed++;
      console.log(`✅ 테스트 ${i} 성공`);
      
    } catch (error) {
      results.failed++;
      results.errors.push({
        iteration: i,
        error: error.message,
        pathname: window.location.pathname,
        scrollY: window.scrollY,
      });
      console.error(`❌ 테스트 ${i} 실패:`, error.message);
    }
    
    console.groupEnd();
    
    // 다음 테스트 전 짧은 휴식
    await wait(100);
  }

  // 최종 결과 출력
  console.log('\n');
  console.log('━'.repeat(60));
  console.log('📊 테스트 결과');
  console.log('━'.repeat(60));
  console.log(`총 테스트: ${results.total}회`);
  console.log(`✅ 성공: ${results.passed}회`);
  console.log(`❌ 실패: ${results.failed}회`);
  console.log(`성공률: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  if (results.errors.length > 0) {
    console.log('\n🐛 실패 케이스:');
    results.errors.slice(0, 5).forEach((err, idx) => {
      console.log(`  ${idx + 1}. 반복 ${err.iteration}: ${err.error}`);
      console.log(`     - pathname: ${err.pathname}`);
      console.log(`     - scrollY: ${err.scrollY}`);
    });
    
    if (results.errors.length > 5) {
      console.log(`  ... 외 ${results.errors.length - 5}건`);
    }
  }
  
  console.log('━'.repeat(60));
  
  // 홈으로 복귀
  await goHome();
  
  return results;
})();
