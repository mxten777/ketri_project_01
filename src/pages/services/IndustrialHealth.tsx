// No JS-based header offset; anchors handled via CSS :target
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const IndustrialHealth = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }
  const location = useLocation();

  // Scroll protection for industrial-health route
  useLayoutEffect(() => {
    // Force scroll to top only if no hash anchor
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // If hash is present, scroll to target section after render
      const targetId = location.hash.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ block: "start", behavior: "auto" });
        });
      }
    }
  }, [location.pathname, location.hash]);

  // Handle sidebar section navigation with precise scroll control
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      // Use 'auto' behavior for precise positioning without cumulative errors
      // 'smooth' can cause slight position drift over multiple clicks
      targetEl.scrollIntoView({ block: "start", behavior: "auto" });
      
      // Update URL hash without triggering page reload
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24 min-h-[280px]">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            산업보건컨설팅
          </h1>
          <p className="text-lg">
            중대재해처벌법 대응부터 작업환경측정, 근골격계 유해요인조사까지
            사업장 안전보건관리체계 구축을 위한 전문 컨설팅 서비스를 제공합니다
          </p>
        </div>
      </section>

      <Section spacing="none" className="pt-10 lg:pt-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-2">산업보건컨설팅</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
              <nav className="space-y-2">
                {[
                  { label: "작업환경측정", href: "#work-environment" },
                  { label: "위험성평가", href: "#risk-assessment" },
                  { label: "근골격계유해요인조사", href: "#musculoskeletal" },
                  { label: "화학물질관리", href: "#chemical-management" },
                  { label: "서비스 프로세스", href: "#service-process" },
                ].map((item) => {
                  const targetId = item.href.slice(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleSectionClick(e, targetId)}
                      className="block px-4 py-2 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8 card-tokenized">
              <h2 className="heading-md mb-6">산업보건컨설팅 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  한국환경안전연구소는 산업안전보건법 및 중대재해처벌법에 따른 전문 컨설팅 서비스를 제공합니다.
                  2006년부터 650여 사업장의 안전보건 관리체계 구축을 지원하며, 사고 예방과 법적 컴플라이언스를 위한
                  체계적인 솔루션을 제공합니다.
                </p>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">
                    ⚠️ 중대재해처벌법 대응 필수 지원
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                    2022년 1월 27일 시행된 중대재해처벌법에 따라 5명 이상 사업장은 안전보건 관리체계 구축이 의무화되었습니다.
                  </p>
                  <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <li>• 안전보건관리체계 구축 및 이행여부 점검</li>
                    <li>• 위험성평가 실시 및 개선조치 수립</li>
                    <li>• 안전보건 조치비용 예산 편성 및 집행</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">주요 서비스</h3>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div id="work-environment" className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-3 text-orange-700 dark:text-orange-400">
                      🏭 작업환경측정 (고용노동부 지정기관)
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      • 산업안전보건법 제125조 따른 6개월마다 의무측정<br />
                      • 소음, 분진, 유기화합물, 금속류 등 190여종 유해인자 측정<br />
                      • KOSHA-A-1-2021 작업환경측정 및 시료채취보고서 작성
                    </p>
                  </div>
                  <div id="risk-assessment" className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-3 text-red-700 dark:text-red-400">
                      ⚠️ 위험성평가 (중대재해처벌법 대응)
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      • 사업장의 안전보건관리 실태 진단 및 위험요인 파악<br />
                      • 위험성 추정 및 결정, 감소대책 수립<br />
                      • 중대재해처벌법 대응을 위한 체계적 관리체계 구축<br />
                      • 정기 평가 및 개선조치 사후관리
                    </p>
                  </div>
                  <div id="chemical-management" className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-3 text-purple-700 dark:text-purple-400">
                      🧪 화학물질관리 (노출평가 및 CRA)
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      • 화관법 개정(2021.1.16)에 따른 화학물질 위험성평가<br />
                      • 개인노출평가 및 작업환경노출평가 수행<br />
                      • ECETOC TRA, EASE, Stoffenmanager 등 국제 검증 모델 사용<br />
                      • 리스크 특성비에 따른 위험도 결정 및 관리방안 수립
                    </p>
                  </div>
                  <div id="musculoskeletal" className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-neutral-800 dark:to-neutral-800 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400">
                      💪 근골격계 유해요인조사 (의무조사)
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      • 산업안전보건기준에 관한 규칙 제 657조에 따른 3년 주기 의무조사<br />
                      • KOSHA-H-30-2020 기법에 따른 과학적 위험도 평가<br />
                      • 작업장 맞춤형 개선안 및 예방관리프로그램 제공<br />
                      • 근골격계질환 예방을 위한 교육 및 체조개선 가이드라인
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4" id="service-process">서비스 프로세스</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { step: "1단계", title: "사전조사", desc: "사업장 현황 파악 및 조사 계획 수립" },
                    { step: "2단계", title: "현장조사", desc: "실측 및 데이터 수집, 작업자 면담" },
                    { step: "3단계", title: "분석평가", desc: "수집 데이터 분석 및 유해도 평가" },
                    { step: "4단계", title: "보고서 제출", desc: "개선방안 제시 및 사후관리 지원" },
                  ].map((process) => (
                    <div key={process.step} className="text-center">
                      <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                        {process.step}
                      </div>
                      <h4 className="font-bold mb-2">{process.title}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{process.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">한국환경안전연구소의 강점</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "전문 인력", desc: "산업위생관리기사, 인간공학기사 등 전문 자격 보유" },
                    { title: "신속한 처리", desc: "현장조사 후 평균 2주 이내 보고서 제출 및 개선안 제시" },
                    { title: "맞춤형 솔루션", desc: "제조업, 건설업, 서비스업 등 업종별 특성을 고려한 맞춤 컨설팅" },
                    { title: "철저한 사후관리", desc: "개선 사항 이행 지원 및 정기적 모니터링 서비스" },
                    { title: "법적 신뢰성", desc: "고용노동부 지정기관으로서 법적 효력을 갖춘 결과 보고" },
                    { title: "교육 지원", desc: "근로자 안전보건교육 및 관리자 역량강화 교육 제공" },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="p-6 bg-gradient-to-br from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-800 rounded-lg border border-primary-100 dark:border-neutral-700"
                    >
                      <h4 className="font-bold text-primary-600 dark:text-primary-400 mb-2 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary-50 dark:bg-neutral-800 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">📞 문의 및 상담</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    사업장의 안전보건 관리에 대한 전문적인 상담이 필요하시면 언제든지 연락 주시기 바랍니다.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">전화:</span>
                      <span className="text-primary-600 dark:text-primary-400">043.237.7824~5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">팩스:</span>
                      <span>043.237.7626</span>
                    </div>
                  </div>
                </div>

                {/* FAQ 섹션 */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-800 rounded-xl p-8 mb-8 mt-8">
                  <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    💬 자주 묻는 질문 (FAQ)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Q. 작업환경측정은 얼마나 자주 해야 하나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        A. 특별관리물질은 100%초과 시 3개월마다 1회, 일반 화학적인자의 경우 200%초과 시 3개월마다 1회측정이 의무입니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Q. 중대재해처벌법 대응을 위해 꼭 해야 할 것은?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        A. 안전보건관리체계 구축, 위험성평가 실시, 안전보건 예산 편성, 정기적인 작업환경측정 및 특수건강진단이 필수입니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Q. 위험성평가는 어떻게 진행되나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        A. 사업장 현황 조사 → 유해·위험요인 파악 → 위험성 추정 → 위험성 결정 → 감소대책 수립 순으로 진행되며, 약 2~4주 소요됩니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Q. 비용은 얼마나 드나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        A. 사업장 규모와 측정 항목 수에 따라 다릅니다. 작업환경측정은 50~300만원, 위험성평가는 100~500만원 수준입니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 비용 안내 */}
                <div className="bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-3xl mr-3">💰</span>
                    서비스 비용 안내
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">서비스 항목</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">대상 규모</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">예상 비용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white dark:bg-neutral-900">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">작업환경측정</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">소규모 (10인 미만)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">50만원 ~ 100만원</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">작업환경측정</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">중규모 (50인 미만)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">150만원 ~ 300만원</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-900">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">위험성평가</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">전체 사업장</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">100만원 ~ 500만원</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">근골격계조사</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">전체 사업장</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">80만원 ~ 200만원</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                    ※ 사업장 규모, 측정 지점 수, 분석 항목에 따라 비용이 달라질 수 있습니다.
                  </p>
                </div>

                {/* 법 위반 시 과태료 부과기준 */}
                <div className="bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-neutral-900 dark:text-neutral-100">
                    <span className="text-3xl mr-3">⚠️</span>
                    법 위반 시 과태료 부과기준 내용 추가요청
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-neutral-700 dark:bg-neutral-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">위반행위</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">근거 법조문</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">세부내용</th>
                          <th colSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">과태료 금액(만원)</th>
                        </tr>
                        <tr className="bg-neutral-600 dark:bg-neutral-500 text-white">
                          <th colSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-4 py-2"></th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">1회위반</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">2회위반</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">3회위반</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white dark:bg-neutral-900">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업환경측정을 하지않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법제175조 제4항제16호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">노동자 1명당</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">20</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">20</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">50</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업환경측정 시 해당 동분영으로 정한 작업환경측정의 방법을 준수하지 않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법175조 5항제13호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">100</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-900">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">노동자대표가 요구했는데도 노동자대표를 입회시키지 않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법제175조제5항제14호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">결과를 보고하지 않거나 거짓으로 보고한 경우 및 작업환경측정을 한 때</td>
                          <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법제175조 제6항제15호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">보고하지 않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">50</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">150</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">거짓으로 보고한 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-900">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업환경측정의 결과를 해당 작업장 노동자에게 알리지 않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법제175조제5항제15호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">100</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">산업안전보건위원회 또는 노동자대표와 작업환경측정 결과에 대한 개선을 요구했음에도 이에 따르지 않은 경우</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">법제175조제5항제1호</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">100</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">300</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                    ※ 위반 횟수에 따라 과태료가 가중되며, 법규 준수를 위해 정기적인 측정과 관리가 필수입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default IndustrialHealth;
