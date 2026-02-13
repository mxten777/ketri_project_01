import { useState } from "react";
import ServiceCta from "../../../components/common/ServiceCta";
import { ChevronDown, ChevronUp } from "lucide-react";

const AnalysisService = () => {
  const [showAnalysisItems, setShowAnalysisItems] = useState(false);

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
                
                {/* 분석항목 리스트 토글 버튼 */}
                <div className="mb-8">
                  <button
                    onClick={() => setShowAnalysisItems(!showAnalysisItems)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span className="text-lg">📋 분석수행 물질 전체 리스트 보기</span>
                    {showAnalysisItems ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* 분석항목 전체 리스트 테이블 */}
                {showAnalysisItems && (
                  <div className="mb-8 overflow-hidden rounded-xl border-2 border-purple-200 dark:border-purple-800 animate-fadeIn">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 border-b-2 border-purple-200 dark:border-purple-800">
                      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <span className="text-2xl">🔬</span>
                        분석수행 물질 리스트 (총 144개 항목)
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        💡 분석수행 물질 외에도 별도 협의 후 분석 가능합니다.
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-purple-100 dark:bg-purple-900/30 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left font-bold text-purple-900 dark:text-purple-300 border-b-2 border-purple-300 dark:border-purple-700">No</th>
                            <th className="px-4 py-3 text-left font-bold text-purple-900 dark:text-purple-300 border-b-2 border-purple-300 dark:border-purple-700">물질명</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                          {[
                            "대사항목들(Aldehydes)",
                            "포름알데히드(Formaldehyde)",
                            "아세트알데히드(Acetaldehyde)",
                            "프로피온알데히드(Propane Oxide)",
                            "뷰티르알데히드(Butyraldehyde)",
                            "발레르알데히드(Valeraldehyde)",
                            "대페놀항목들(2-Alyin)",
                            "1,2-프로필렌 글리콜 디나이트레이트(1,2-Propylene glycol dinitrate)",
                            "1,3-뷰타디엔(1,3-Butadiene)",
                            "나이트로글리세린(Nitroglycerin)",
                            "디에틸렌글리콜(diethylene glycol)",
                            "메틸알코올(methanol)",
                            "메틸이소뷰틸케톤(Methyl isobutyl ketone)",
                            "벤조[a]피렌(Benzo[a]pyrene)",
                            "아세톤(Acetone)",
                            "아크릴로나이트릴(Acrylonitrile)",
                            "아크릴산 에틸(Ethyl acrylate)",
                            "사이클로헥사논(Cyclohexanone)",
                            "석유 에테르(Petroleum ether)",
                            "스티렌(Styrene)",
                            "시멘트(시맨틸1-2)(Formamide: 1-2 chromanol)",
                            "이소프로필알코올(Isopropylacohol acid)",
                            "이소아밀알코올(Isoamylalcohol)",
                            "에틸렌글리콜(Ethylene glycol)",
                            "위탄수(Organic)",
                            "오산화(O-Phenylene)",
                            "톨루엔-2,4-디이소시아네이트(Toluene-2,4-diisocyanate)",
                            "톨루엔-2,6-디이소시아네이트(Toluene-2,6-diisocyanate)",
                            "톨루엔(Toluene)",
                            "트리클로로에틸렌(Trichloroethylene)",
                            "아세탈류(Pherols)",
                            "o-크레졸(o-Cresol)",
                            "p-크레졸(p-Cresol)",
                            "페놀(Phenol)",
                            "노말헥산(n-Hexane)",
                            "디메틸포름아마이드(Dimethylformamide)",
                            "메틸에틸케톤(Methylethyl ketone)",
                            "아세트산 에틸(Ethylacetate)",
                            "메틸클로로포름(Methylchloroform)",
                            "사염화탄소(Carbon tetrachloride)",
                            "클로로포름(Chloroform)",
                            "1,1,2,2-테트라클로로에탄(1,1,2,2-tetrachloroethane)",
                            "1,2-디클로로에탄(1,2-dichloroethane)",
                            "1,2-디클로로프로판(1,2-dichloropropane)",
                            "사산화이황(Dimethylsulfate)",
                            "이황화이탄소(Carbon disulfate)",
                            "에틸렌옥사이드(Ethylene oxide)",
                            "아크로레인(Acrolein)",
                            "벤젠(Benzene)",
                            "디클로로플루오르메탄(Dichlorodifluoromethane)",
                            "산화칼슘(Calcium carbide)",
                            "아연브산(Bromoide carbide)",
                            "브롬화메틸(Methyl bromide)",
                            "1,2-스테록사이데이트(1,2-Epoxybutalene acid)",
                            "1,4-디옥산(1,4-dioxane)",
                            "사이클로헥산(Cyclohexane)",
                            "에틸렌글리콜디나이트레이트(Ethylene glycol dinitrate)",
                            "사이클로헥센(Cyclohexene)",
                            "1,1,2-트리클로로에탄(1,1,2-trichloroethane)",
                            "에틸렌디아민(Ethylenediamine)",
                            "수산화시아네이트(N,N-Dimethylacetamide)",
                            "1,2-디클로로벤젠(1,2-Dichlorobenzene)",
                            "에틸렌아민(Ethylethanolamine)",
                            "1,4-디클로로-2-프로판(1,4-dichlorophenone)"
                          ].map((item, index) => (
                            <tr key={index} className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                              <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">{index + 1}</td>
                              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{item}</td>
                            </tr>
                          ))}
                          {/* 계속... (62번부터) */}
                          {[
                            "헥사메틸렌 디이소시아네이트(Hexamethylene diisocyanate)",
                            "나이트로메탄(Nitromethane)",
                            "과산화수소(Hydrogen peroxide)",
                            "질산(Nitric acid)",
                            "벤조니트릴(Benzonitrile)",
                            "산화규소(Quartz)",
                            "산화규소(Cristobalite)",
                            "이산화이염소(Dichlorosilane)",
                            "플루오르화수소(Hydrogen fluoride)",
                            "삼염화인(Phosphorus trichloride)",
                            "이산화염소(Chlorine dioxide)",
                            "산화아연(Zinc oxide)",
                            "삼산화황(Sulfur trioxide)",
                            "삼산화알루미늄(aluminum)",
                            "크롬 및 그 화합물(Chromium-VI compounds)",
                            "망간 및 그 화합물(Manganese, as Mn)",
                            "니켈 및 그 화합물(Nickel inorganic solubles)",
                            "카드뮴 및 그 화합물(Cadmium, as Cd)",
                            "납 및 그 무기화합물(Lead, as Pb)",
                            "철분진(Iron Oxide)",
                            "구리분진(Copper Dusts and mists as Cu)",
                            "수은(Mercury)",
                            "알루미늄분진(Aluminum, welding fumes)",
                            "카드뮴흄(Cadmium fume)",
                            "비소(Arsenic)",
                            "2-에톡시에탄올(2-Ethoxyethanol)",
                            "2-메톡시에탄올(2-Methoxyethanol)",
                            "2-부톡시에탄올(2-Butoxyethanol)",
                            "노말부탄올(n-Butanol)",
                            "시클로헥산올(Cyclohexanol)",
                            "노말프로필알코올(n-Propylalcohol)",
                            "메틸-n-뷰틸케톤(Methyl-n-butyl ketone)",
                            "크실렌(Xylene, o,isomer)",
                            "에틸(Ethylene)",
                            "톨루엔(Toluene)",
                            "벤젠(Benzene)",
                            "무수초산(Acetic anhydride)",
                            "초산(Acetic acid)",
                            "과산화(Peroxyacetyl)",
                            "유효물(Maleic acid)",
                            "포름산(Formic acid)",
                            "황산(Sulfuric acid)",
                            "황산디메틸(Dimethyl sulfate)",
                            "무수프탈산(Phthalic anhydride)",
                            "오존(Ozone)",
                            "이산화질소(Nitrogen dioxide)",
                            "이산화황(Sulfur dioxide)",
                            "암모니아(Ammonia)",
                            "6가크롬(Chromium-VI compounds)",
                            "염화수소(Hydrochloric acid)",
                            "트리에틸아민(Triethylamine)",
                            "인산(Phosphoric acid)",
                            "황화수소(Hydrogen sulfide)",
                            "요오드(Iodine)",
                            "안티몬(Antimony)",
                            "비소(Arsine)",
                            "에탄올아민속(Ethanolamines)",
                            "석면(Asbestos)",
                            "나이트로벤젠(Nitrobenzene)",
                            "할로겐(Manganese)",
                            "아세토니트릴(Acetonitrile)",
                            "엠티부틸아세테이트(Ethyl glycol)",
                            "메틸에틸케톡심(Methyl ethyl ketoxime)",
                            "아세트산페녹시에틸(Phenoxyethyl acetate)",
                            "2-메틸헵탄올(2-Methylheptane)",
                            "테트라클로로에틸렌(Tetrachloroethylene)",
                            "N,N-디메틸포름아마이드(N,N-Dimethylformamide)",
                            "메탄올(Methanol)",
                            "N-메틸-2-피롤리돈(N-Methyl-2-pyrrolidone)",
                            "디메틸벤젠(Xylene-mixture)",
                            "알파프에틸렌(Alpha-Ethylene)",
                            "비닐아세테이트(Vinyl acetate)",
                            "에틸벤젠(Ethylbenzene)",
                            "인듐(Indium)",
                            "클로로벤젠(Chlorobenzene)",
                            "1,1,1-트리클로로에탄(1,1,1-Trichloroethane)",
                            "메틸클로라이드(Methyl chloride)",
                            "염소(Chlorine)",
                            "멜라민(Melamine)",
                            "브롬(Bromine)",
                            "불화수소(Hydrogen fluoride)",
                            "질화이트리움헥사플루오라이드(Yttrium hexafluoride)",
                            "퍼클로로에틸렌(Perchloroethylene)",
                            "에틸클로로폼(Ethyl chloroform)",
                            "에티렌클로로히드린(Ethylene chlorohydrin)",
                            "브로모포름(Bromoform)",
                            "몰리브덴(Molybdenum)",
                            "아연(Zinc)"
                          ].map((item, index) => (
                            <tr key={index + 62} className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                              <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">{index + 62}</td>
                              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{item}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
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
