import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const IndustrialHealth = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to the element with offset for header
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // allow layout to settle
      setTimeout(() => {
        const el = document.getElementById(id);
        const header = document.querySelector("header");
        const headerHeight = header && header instanceof HTMLElement ? header.offsetHeight : 96;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16; // extra padding
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
    }
  }, [location]);

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24 min-h-[280px]">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
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
              <h3 className="font-bold text-lg mb-4">세부 서비스</h3>
              <nav className="space-y-2">
                {[
                  { label: "작업환경측정", href: "#work-environment" },
                  { label: "위험성평가", href: "#risk-assessment" },
                  { label: "근골격계유해요인조사", href: "#musculoskeletal" },
                  { label: "화학물질관리", href: "#chemical-management" },
                  { label: "서비스 프로세스", href: "#service-process" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
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
                      • KOSHA-A-1-2021 작업환경측정 및 시료채취보고서 작성<br />
                      • 노출기준 초과 시 개선조치 및 재측정 지원
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
                      • 화관법 개정(2021.1.16)에 따른 화학물질 위험성평가 의무화<br />
                      • 개인노출평가 및 작업환경노출평가 수행<br />
                      • ECETOC TRA, EASE, Stoffenmanager 등 국제 검증 모델 사용<br />
                      • 리스크 특성비에 따른 위험도 결정 및 관리방안 수립
                    </p>
                  </div>
                  <div id="musculoskeletal" className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400">
                      💪 근골격계 유해요인조사 (의무조사)
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      • 산업안전보건법 제24조 따른 3년 주기 의무조사 (5인 이상 사업장)<br />
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
                      className="p-6 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-neutral-800 rounded-lg border border-primary-100 dark:border-primary-900/30"
                    >
                      <h4 className="font-bold text-primary-600 dark:text-primary-400 mb-2 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">📞 문의 및 상담</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 mb-8 mt-8">
                  <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                    💬 자주 묻는 질문 (FAQ)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                        Q. 작업환경측정은 얼마나 자주 해야 하나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        A. 일반 유해인자는 6개월마다 1회 이상, 특별관리물질(발암성 물질 등)은 3개월마다 1회 이상 측정이 의무입니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                        Q. 중대재해처벌법 대응을 위해 꼭 해야 할 것은?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        A. 안전보건관리체계 구축, 위험성평가 실시, 안전보건 예산 편성, 정기적인 작업환경측정 및 특수건강진단이 필수입니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                        Q. 위험성평가는 어떻게 진행되나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        A. 사업장 현황 조사 → 유해·위험요인 파악 → 위험성 추정 → 위험성 결정 → 감소대책 수립 순으로 진행되며, 약 2~4주 소요됩니다.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                        Q. 비용은 얼마나 드나요?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        A. 사업장 규모와 측정 항목 수에 따라 다릅니다. 작업환경측정은 50~300만원, 위험성평가는 100~500만원 수준입니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 비용 안내 */}
                <div className="bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-8 mb-8">
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

                {/* 신청서 다운로드 */}
                <div className="bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-3xl mr-3">📥</span>
                    신청서 및 자료 다운로드
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    각종 신청서와 안내 자료를 다운로드하여 활용하실 수 있습니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="/documents/work-environment-application.pdf"
                      className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-primary-200 dark:border-primary-800"
                    >
                      <span className="font-bold">작업환경측정 신청서</span>
                      <span className="text-2xl">📄</span>
                    </a>
                    <a
                      href="/documents/risk-assessment-guide.pdf"
                      className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-primary-200 dark:border-primary-800"
                    >
                      <span className="font-bold">위험성평가 가이드</span>
                      <span className="text-2xl">📋</span>
                    </a>
                  </div>
                </div>

                {/* 고객 후기 */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700 high-contrast-review">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-3xl mr-3">⭐</span>
                    고객 후기
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 review-card">
                      <div className="flex items-center mb-3">
                        <div className="text-yellow-500 text-xl">★★★★★</div>
                        <span className="ml-2 text-sm text-neutral-500">충북 청주시 제조업체</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        "중대재해처벌법 시행 후 위험성평가를 의뢰했는데, 체계적인 컨설팅으로 
                        안전관리체계를 완벽하게 구축할 수 있었습니다."
                      </p>
                      <p className="text-xs text-neutral-500">- 김○○ 안전관리자</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 review-card">
                      <div className="flex items-center mb-3">
                        <div className="text-yellow-500 text-xl">★★★★★</div>
                        <span className="ml-2 text-sm text-neutral-500">충북 진천군 화학공장</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        "작업환경측정을 10년째 맡기고 있습니다. 정확한 측정과 개선방안 제시로 
                        항상 적합 판정을 유지하고 있습니다."
                      </p>
                      <p className="text-xs text-neutral-500">- 이○○ 공장장</p>
                    </div>
                  </div>
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
