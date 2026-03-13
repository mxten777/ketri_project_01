// No JS-based header offset; anchors handled via CSS :target

import ServiceCta from "../../../components/common/ServiceCta";

const WorkEnvironment = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">작업환경측정</h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            산업안전보건법에 의한 작업환경측정 전문기관으로 정밀한 측정 장비와 전문 인력을 통해 정확한 작업환경측정 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 sticky top-24 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">작업환경측정</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
                <nav className="space-y-1">
                  {[
                    { label: "측정 개요", href: "#overview" },
                    { label: "측정 대상", href: "#target" },
                    { label: "측정 주기", href: "#schedule" },
                    { label: "서비스 절차", href: "#procedure" },
                    { label: "기관 현황", href: "#status" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 rounded-lg text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-neutral-700 dark:text-neutral-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* 측정 개요 */}
              <section id="overview" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">작업환경측정 서비스</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  작업환경측정은 작업장 내 유해인자를 파악하고 근로자의 건강을 보호하기 위한 필수적인 절차입니다. 
                  한국환경안전연구소는 정밀한 측정 장비와 전문 인력을 통해 정확한 작업환경측정 서비스를 제공합니다.
                </p>
              </section>

              {/* 측정 대상 */}
              <section id="target" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">측정 대상</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50">화학적 인자</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">유기화합물, 금속류, 산·알카리류, 가스류 등</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50">물리적 인자</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">소음, 진동, 온열, 조명, 방사선 등</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50">분진</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">광물성 분진, 금속 분진, 유기 분진 등</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50">생물학적 인자</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">바이러스, 곰팡이, 세균 등</p>
                  </div>
                </div>
              </section>

              {/* 측정 주기 */}
              <section id="schedule" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">측정 주기</h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">정기측정: 6개월에 1회 이상</h3>
                        <p className="text-neutral-600 dark:text-neutral-300">작업환경측정 대상 유해인자가 있는 작업장</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">수시측정</h3>
                        <p className="text-neutral-600 dark:text-neutral-300">작업환경 변경 시, 직업병 발생 시 등</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 서비스 절차 */}
              <section id="procedure" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">서비스 절차</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  작업환경측정은 다음과 같은 절차로 체계적으로 진행됩니다.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "측정 의뢰 및 상담", desc: "고객사의 작업환경 및 유해인자 파악" },
                    { title: "현장 방문 및 예비조사", desc: "작업장 현황 및 측정 지점 확인" },
                    { title: "측정 계획 수립", desc: "측정 항목 및 방법 결정" },
                    { title: "현장 측정 실시", desc: "전문 장비를 이용한 정밀 측정" },
                    { title: "시료 분석", desc: "실험실 분석 및 데이터 처리" },
                    { title: "결과 평가 및 보고서 작성", desc: "법적 기준 대비 평가 및 보고서 제출" },
                    { title: "개선 대책 제시", desc: "필요 시 작업환경 개선방안 제안" },
                  ].map((step, index) => (
                    <div key={index} className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">{step.title}</h3>
                          <p className="text-neutral-600 dark:text-neutral-300">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 기관 현황 */}
              <section id="status" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">기관 현황</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                  본 연구소는 작업환경측정 수행기관으로 지정되어 있으며,
                  정기적인 기관 평가 및 정도관리를 통해 측정 결과의 신뢰성을 유지하고 있습니다.
                </p>

                {/* ① 작업환경측정 기관 지정 현황 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                    작업환경측정 기관 지정 현황
                  </h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    본 연구소는 산업안전보건법에 따라 작업환경측정 수행기관으로 지정되어 있으며,
                    지정 범위 및 수행 지역 변경 사항을 관련 절차에 따라 관리하고 있습니다.
                  </p>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 space-y-3 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">수행기관 지정:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">작업환경측정 수행기관</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">지정 범위:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">법정 작업환경측정</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">지정 변경 사항:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">소재지 변경 및 지정 한계 변경 반영</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                    📎 원본 보기: <a href="/documents/work-environment-designation.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">작업환경측정 기관 지정서 (PDF)</a>
                  </p>
                </div>

                {/* ② 작업환경측정 기관 평가 결과 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                    작업환경측정 기관 평가 결과
                  </h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    고용노동부 주관 작업환경측정 수행기관 평가에서
                    관련 기준을 충족하여 적합 판정을 받았습니다.
                  </p>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 space-y-3 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">평가 연도:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">2024년</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">평가 주체:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">고용노동부</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">평가 결과:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">적합</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                    📎 원본 보기: <a href="/documents/work-environment-evaluation-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">작업환경측정 기관평가 통보서 (PDF)</a>
                  </p>
                </div>

                {/* ③ 정도관리(숙련도 평가) 수행 현황 */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                    정도관리(숙련도 평가) 수행 현황
                  </h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    측정 결과의 정확성과 재현성 확보를 위해
                    정기적인 정도관리(숙련도 평가)에 참여하고 있습니다.
                  </p>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 space-y-3 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">수행 시기:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">2025년 상반기</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">대상:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">작업환경측정 분석 항목</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50 min-w-[140px]">목적:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">분석 정확도 및 신뢰성 검증</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                    📎 원본 보기: <a href="/documents/work-environment-qc-2025-h1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">2025년 상반기 정도관리 결과 (PDF)</a>
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8">
            <ServiceCta
              message="작업환경측정 문의가 필요하신가요?"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkEnvironment;