import ServiceCta from "../../../components/common/ServiceCta";

const AnalysisService = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">분석 수탁 서비스</h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            다년간의 경험과 축적된 노하우를 바탕으로 정확하고 신뢰성 있는 분석수탁 서비스를 제공합니다
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
                <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">분석 수탁 서비스</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 내용</p>
                <nav className="space-y-1">
                  {[
                    { label: "서비스 개요", href: "#overview" },
                    { label: "주요 역량", href: "#capabilities" },
                    { label: "수탁 항목", href: "#items" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 rounded-lg text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-neutral-700 dark:text-neutral-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* 서비스 개요 */}
              <section id="overview" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">분석 수탁 서비스 개요</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                    한국환경안전연구소는 다년간의 경험과 축적된 노하우를 바탕으로 
                    정확하고 신뢰성 있는 분석 수탁 서비스를 제공합니다. 
                    작업환경측정기관 및 연구기관을 대상으로 전문적인 분석 서비스를 통해 
                    고객의 업무 효율성을 향상시키고 있습니다.
                  </p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center">
                      <span className="text-3xl mr-3">🔬</span>
                      전문성과 신뢰성
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                      최신 분석 장비와 숙련된 전문 인력을 통해 정확하고 신속한 분석 결과를 제공합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 주요 역량 */}
              <section id="capabilities" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">주요 역량</h2>
                
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-3">✅</span>
                      <h3 className="font-bold text-lg text-green-700 dark:text-green-400">자율정도관리</h3>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      매년 자율정도관리 전 항목 적합 인정
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-3">🤝</span>
                      <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400">수탁 계약</h3>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      현재 20여 개의 기관과 수탁 계약 체결하여 업무 수행
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-start">
                    <span className="text-4xl mr-4 mt-1">🔧</span>
                    <div>
                      <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-3">첨단 분석 장비</h3>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        기본 장비 외 <strong>GC-MS, ICP-MS, LC-MS/MS, FT-IR</strong> 등 분석 장비 다수 보유
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 수탁 항목 */}
              <section id="items" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">수탁 항목</h2>
                
                <div className="space-y-4">
                  {/* 금속류 */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                      금속류
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["아르신", "안티몬", "비소", "인듐"].map((item) => (
                        <span key={item} className="px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 무기화합물 */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                      무기화합물
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["산화규소(석영, 크리스토발라이트)", "질산", "황산", "염화수소", "인산", "황화수소", "개미산", "요오드", "이산화황", "오존"].map((item) => (
                        <span key={item} className="px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 유기화합물 */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      유기화합물
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["포름알데히드", "아세트알데히드", "TDI(2,4-TDI, 2,6-TDI)", "HDI", "에탄올아민", "산화에틸렌", "이황화탄소", "황산디메틸", "무수초산", "1,3-부타디엔"].map((item) => (
                        <span key={item} className="px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 기타 */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-600">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                      <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                      기타 항목
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["과산화수소", "암모니아", "수은", "석면"].map((item) => (
                        <span key={item} className="px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border-2 border-amber-200 dark:border-amber-800">
                  <p className="text-neutral-700 dark:text-neutral-300 flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <span>
                      <strong className="text-amber-700 dark:text-amber-400">분석수행 물질 외에도</strong> 별도 협의 후 분석 가능합니다. 
                      문의 사항이 있으시면 언제든지 연락 주시기 바랍니다.
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8">
            <ServiceCta
              message="분석 수탁 서비스 문의가 필요하신가요?"
              phoneNumber="043-237-7824"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnalysisService;
