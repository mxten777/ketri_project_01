/**
 * 환경측정 페이지 내부 섹션 스크롤 50회 반복 테스트
 * 
 * 사용법:
 * 1. 로컬 개발 서버 실행 (npm run dev)
 * 2. 브라우저에서 http://localhost:5173/services/industrial-health 접속
 * 3. 개발자 도구 콘솔에서 이 스크립트 복사 후 실행
 */

(async function serviceSectionScrollTest() {
  console.log('🧪 환경측정 페이지 섹션 스크롤 테스트 시작');
  console.log('━'.repeat(60));

  const results = {
    total: 50,
    passed: 0,
    failed: 0,
    errors: [],
  };

  const sections = [
    { label: '작업환경측정', id: 'work-environment' },
    { label: '위험성평가', id: 'risk-assessment' },
    { label: '근골격계유해요인조사', id: 'musculoskeletal' },
    { label: '화학물질관리', id: 'chemical-management' },
    { label: '서비스 프로세스', id: 'service-process' },
  ];

  // 테스트 헬퍼 함수
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const getHeaderHeight = () => {
    const header = document.getElementById('site-header');
    return header ? header.offsetHeight : 80;
  };

  const clickSidebarLink = async (sectionId) => {
    const sidebar = document.querySelector('aside nav');
    if (!sidebar) {
      throw new Error('사이드바를 찾을 수 없음');
    }

    const link = sidebar.querySelector(`a[href="#${sectionId}"]`);
    if (!link) {
      throw new Error(`섹션 링크를 찾을 수 없음: #${sectionId}`);
    }

    console.log(`🖱️ Clicking: ${link.textContent?.trim()} (#${sectionId})`);
    link.click();
    
    // 스크롤 애니메이션 완료 대기
    await wait(600);
  };

  const checkSectionPosition = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      throw new Error(`섹션 element를 찾을 수 없음: #${sectionId}`);
    }

    const rect = element.getBoundingClientRect();
    const headerHeight = getHeaderHeight();
    
    // 섹션이 헤더 바로 아래에 위치해야 함 (±10px 허용 오차)
    const expectedTop = headerHeight;
    const actualTop = rect.top;
    const tolerance = 10;

    console.log(`📏 Position check:`, {
      sectionId,
      expectedTop: `${expectedTop}px`,
      actualTop: `${actualTop.toFixed(2)}px`,
      diff: `${(actualTop - expectedTop).toFixed(2)}px`,
      headerHeight: `${headerHeight}px`,
      scrollY: window.scrollY,
    });

    if (Math.abs(actualTop - expectedTop) > tolerance) {
      return {
        success: false,
        error: `위치 오차 초과: expected ~${expectedTop}px, actual ${actualTop.toFixed(2)}px (diff: ${(actualTop - expectedTop).toFixed(2)}px)`,
        actualTop,
        expectedTop,
      };
    }

    // 섹션이 화면에 보이는지 확인
    const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;
    if (!isVisible) {
      return {
        success: false,
        error: `섹션이 화면 밖에 있음: top=${rect.top}px`,
        actualTop,
        expectedTop,
      };
    }

    return { success: true, actualTop, expectedTop };
  };

  // 페이지 최상단으로 스크롤
  const scrollToTop = async () => {
    window.scrollTo(0, 0);
    await wait(300);
  };

  // 테스트 반복
  for (let i = 1; i <= results.total; i++) {
    console.group(`\n🔄 테스트 ${i}/${results.total}`);
    
    try {
      // 매 10회마다 최상단으로 리셋
      if (i % 10 === 1) {
        console.log('🔝 페이지 최상단으로 리셋');
        await scrollToTop();
      }

      // 랜덤 섹션 선택 (다양한 패턴 테스트)
      const section = sections[i % sections.length];
      
      console.log(`테스트 ${i}: ${section.label} (#${section.id})`);
      
      // 섹션 클릭
      await clickSidebarLink(section.id);
      
      // 위치 확인
      const positionCheck = checkSectionPosition(section.id);
      
      if (!positionCheck.success) {
        throw new Error(positionCheck.error);
      }
      
      console.log(`✅ 테스트 ${i} 성공: ${section.label} 정확한 위치로 이동`);
      results.passed++;
      
    } catch (error) {
      results.failed++;
      results.errors.push({
        iteration: i,
        section: sections[i % sections.length],
        error: error.message,
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
      console.log(`  ${idx + 1}. 반복 ${err.iteration} (${err.section.label}): ${err.error}`);
      console.log(`     - scrollY: ${err.scrollY}`);
    });
    
    if (results.errors.length > 5) {
      console.log(`  ... 외 ${results.errors.length - 5}건`);
    }
  }
  
  console.log('━'.repeat(60));
  
  // 최상단으로 복귀
  await scrollToTop();
  
  return results;
})();
