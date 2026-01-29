import ServiceCta from "../../../components/common/ServiceCta";

const AsbestosSurvey = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 조사 분석</h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            건축물 석면 함유 여부를 정밀하게 조사하고 분석합니다
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
                <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">석면 조사 분석</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
                <nav className="space-y-1">
                  {[
                    { label: "조사 개요", href: "#overview" },
                    { label: "의무 대상", href: "#requirement" },
                    { label: "조사 대상 자재", href: "#materials" },
                    { label: "조사 절차", href: "#procedure" },
                    { label: "기관 지정", href: "#certification" },
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
              {/* 조사 개요 */}
              <section id="overview" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">석면 조사 분석</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  석면안전관리법에 따라 건축물의 석면 함유 여부를 정밀 조사하고 분석하는 서비스입니다.
                </p>
              </section>

              {/* 의무 대상 */}
              <section id="requirement" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">⚠️ 석면 조사 의무 대상</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>연면적 50㎡ 이상 건축물 해체·제거 시 (2023년부터)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>학교, 어린이집, 의료기관 등 (면적 무관)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>1급 발암물질로 조사 필수</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 조사 대상 자재 */}
              <section id="materials" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">조사 대상 자재</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600">
                    <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">주요 조사 대상</h3>
                    <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>슬레이트 지붕재</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>석면 시멘트 벽체, 천장재</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>내화 피복재</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>단열재</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>바닥 타일</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>배관 보온재</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600">
                    <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">분석 방법</h3>
                    <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                      <li>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-50">편광현미경법 (PLM):</span><br />
                        <span className="text-sm">석면 종류 및 함량 분석</span>
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-50">위상차현미경법 (PCM):</span><br />
                        <span className="text-sm">섬유 계수</span>
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-50">투과전자현미경법 (TEM):</span><br />
                        <span className="text-sm">미량 석면 분석</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 조사 절차 */}
              <section id="procedure" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">조사 절차</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  석면 조사는 다음과 같은 절차로 체계적으로 진행됩니다.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "현장 조사", desc: "건축물 도면 검토 및 석면 의심 자재 파악" },
                    { title: "시료 채취", desc: "의심 자재별 대표 시료 채취 (균질 구역당 3개 이상)" },
                    { title: "실험실 분석", desc: "편광현미경으로 석면 함유 여부 및 종류, 함량 분석" },
                    { title: "보고서 작성", desc: "석면 지도 작성, 석면 건축자재 목록, 관리 방안 제시" },
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

              {/* 기관 지정 */}
              <section id="certification" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">✅ 고용노동부 지정 석면조사기관</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    한국환경안전연구소는 고용노동부 지정 석면조사기관으로 정확하고 신뢰할 수 있는 조사 서비스를 제공합니다.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8">
            <ServiceCta
              message="석면 조사 분석 문의가 필요하신가요?"
              phoneNumber="043-237-7824"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AsbestosSurvey;
