import { useState } from "react";
import ServiceCta from "../../../components/common/ServiceCta";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const AnalysisService = () => {
  const [showAnalysisItems, setShowAnalysisItems] = useState(false);

  const analysisItems = [
    "아크릴아미드(Acrylamide)",
    "무수초산(Acetic anhydride)",
    "니트로메탄(Nitromethane)",
    "산화에틸렌(Ethylene Oxide)",
    "이황화탄소(Carbon disulfide)",
    "황산디메틸(Dimethyl sulfate)",
    "다환방향족탄화수소(PAHs)",
    "프탈릭언하이드라이드(Phthalic anhydride)",
    "1,6-헥사메틸렌디이소시아네이트(1,6-Hexamethylene Diisocyanate)",
    "디에탄올아민(Diethanolamine)",
    "디에틸렌트리아민(Diethylenetriamine)",
    "디하이드록시벤젠(Dihydroybenzene)",
    "말레산언하이드라이드(무수말레산)(Maleicanhydride)",
    "메틸렌디(비스)페닐디이소시아네이트(4,4'-Methylenedi(bis)phenyldiisocyanate)",
    "아세트알데히드(Acetaldehyde)",
    "아크릴산(Acrylic acid)",
    "에탄올아민(Ethanolamine)",
    "톨루엔-2,4-디이소시아네이트(Toluene-2,4-diisocyanate)",
    "톨루엔-2,6-디이소시아네이트(Toluene-2,6-diisocyanate)",
    "트리클로로아세트산(Trichloro acetic acid)",
    "포름알데히드(Formaldehyde)",
    "석영(산화규소)(Crystalline quatz)",
    "크리스토발라이트(Cristobalite)",
    "수은(Mercury)",
    "삼수소화비소(Arsine)",
    "셀레늄(Selenium)",
    "안티몬(Antimony)",
    "비소(Arsenic)",
    "인듐(Indium)",
    "6가크롬(Chromium(Ⅵ)compounds)",
    "개미산(Formicacid)",
    "불소(Fluorine)",
    "불화수소(Hydrogenfluoride)",
    "브롬화수소(Hydrogenbromide)",
    "아황산가스(Sulfurdioxide)",
    "염화수소(hydrogen chloride)",
    "오존(Ozone)",
    "요오드(iodine)",
    "이산화질소(Nitrogendioxide)",
    "인산(Phosphoric acid)",
    "일산화질소(Nitricoxide)",
    "질산(nitric acid)",
    "황산(Sulfuric acid)",
    "황화수소(Hydrogensulfide)",
    "과산화수소(Hydrogen peroxide)",
    "시안화나트륨(Sodium cyanide)",
    "시안화수소(Hydrogen cyanide)",
    "시안화칼륨(Potassium cyanide)",
    "시안화칼슘(Calcium cyanide)",
    "암모니아(Ammonia)",
    "포스핀(Phosphine)",
    "1,1,2-트리클로로에탄(1,1,2-Trichloroethane)",
    "1,1-디클로로-1-플루오로에탄(1,1-Dichloro-1-fluoroethane)",
    "1,2-디클로로에탄(1,2-Dichloroethane)",
    "1,2-디클로로에틸렌(1,2-Dichloroethylene)",
    "1,2-디클로로프로판(1,2-dichloropropane)",
    "1,2-에폭시프로판(1,2-Epoxypropane)",
    "1,3-부타디엔(1,3-Butadiene)",
    "1,4-디옥산(1,4-Dioxane,Diethyldioxide)",
    "1-브로모프로판(1-Bromopropane)",
    "2-메톡시에탄올(2-Methoxyethanol)",
    "2-메톡시에틸아세테이트(2-Methoxyethylacetate)",
    "2-부톡시에탄올(2-Butoxyethanol,EGBE)",
    "2-브로모프로판(2-Bromopropane)",
    "2-에톡시에탄올(2-Ethoxyethanol,EGEE)",
    "2-에톡시에틸아세테이트(2-Ethoxyethylacetate)",
    "이소아밀 아세테이트(Isoamyl acetate)",
    "N,N-디메틸아세트아미드(N,N-Dimethylacetamide)",
    "n-부틸알코올(1-부탄올)(n-Butyl alcohol)",
    "o-디클로로벤젠(o-Dichlorobenzene)",
    "sec-부틸알코올(sec-부탄올)(sec-Butyl alcohol)",
    "디메틸아닐린(Dimethylaniline)",
    "디메틸포름아미드(Dimethylformamide)",
    "디에틸에테르(Diethylether)",
    "디이소부틸케톤(Diisobutylketone)",
    "디클로로메탄(Dichloromethane)",
    "메틸 n-부틸케톤(Methyln-butylketone)",
    "메틸 n-아밀케톤(Methyln-amylketone)",
    "메틸시클로헥산(Methylcyclohexane)",
    "메틸알코올(Methylalcohol)",
    "메틸에틸케톤(Methylethylketone)",
    "메틸이소부틸케톤(Methylisobutylketone)",
    "메틸클로로포름(Methylchloroform)",
    "벤젠(Benzene)",
    "비닐아세테이트(Vinylacetate)",
    "스토다드솔벤트(Stoddard solvent)",
    "스티렌(Styrene)",
    "시클로헥사논(Cyclohexanone)",
    "시클로헥사놀(Cyclohexanol)",
    "시클로헥산(Cyclohexane)",
    "아닐린(Aniline)",
    "아세토니트릴(Acetonitrile)",
    "아세톤(Acetone)",
    "아크릴로니트릴(Acrylonitrile)",
    "알릴글리시딜에테르(Allyl glycidyl ether)",
    "에틸렌글리콜(Ethyleneglycol)",
    "에틸렌글리콜모노부틸아세테이트(Ethyleneglycolmonobutylacetate)",
    "에틸벤젠(Ethylbenzene)",
    "에틸아크릴레이트(Ethylacrylate)",
    "에피클로로하이드린(Epichlorohydrin)",
    "염화비닐(Vinyl chloride)",
    "이소부틸알코올(Isobutyl alcohol)",
    "이소아밀알코올(Isoamyl alcohol)",
    "이소프로필알코올(Isopropyl alcohol)",
    "초산(Acetic acid)",
    "초산메틸(Methyl acetate)",
    "초산부틸(n-Butylacetate)",
    "초산에틸(Ethylacetate)",
    "초산이소부틸(Isobutyl acetate)",
    "초산이소프로필(Isopropyl acetate)",
    "초산프로필(n-Propylacetate)",
    "크레졸(Cresol)",
    "크실렌(오르토,메타,파라이성체)(Xylene,o,m,p-isomers)",
    "클로로벤젠(Chlorobenzene)",
    "테트라하이드로푸란(Tetrahydrofuran)",
    "톨루엔(Toluene)",
    "트리에틸아민(Triethylamine)",
    "트리클로로메탄(Trichloromethane)",
    "트리클로로에틸렌(Trichloroethylene)",
    "퍼클로로에틸렌(Perchloroethylene)",
    "페놀(Phenol)",
    "피리딘(Pyridine)",
    "헥산(Hexane,n-Hexane)",
    "헵탄(Heptane,n-Heptane)",
    "구리(Copper)",
    "납(Lead)",
    "니켈(Nickel)",
    "망간(Manganese)",
    "바륨(Barium)",
    "베릴륨(Beryllium)",
    "산화마그네슘(Magnesium oxide)",
    "산화아연(Zinc oxide)",
    "산화철(Iron oxide)",
    "알루미늄(Aluminum)",
    "은(Silver)",
    "이산화티타늄(Titanium dioxide)",
    "주석(Tin)",
    "지르코늄(Zirconium)",
    "카드뮴(Cadmium)",
    "칼슘(Calcium)",
    "코발트(Cobalt)",
    "크롬(Chromium)",
    "텅스텐(Tungsten)",
    "수산화나트륨(Sodium hydroxide)",
    "수산화칼륨(Potassium hydroxide)",
    "석면(Asbestos)"
  ];

  const handleDownload = () => {
    // CSV 형식으로 데이터 생성
    const csvContent = "연번,물질명\n" + 
      analysisItems.map((item, index) => `${index + 1},${item}`).join("\n");
    
    // UTF-8 BOM 추가 (엑셀에서 한글 깨짐 방지)
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "분석수행물질리스트_146개항목.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">분석 수탁 서비스</h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            다년간의 경험과 축적된 노하우를 바탕으로 정확하고 신뢰성 있는 분석수탁 서비스를 제공합니다.
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
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">분석 수탁 서비스</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center">
                      <span className="text-3xl mr-3">🔬</span>
                      전문성과 신뢰성
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      ◆ 다년간의 경험과 축적된 노하우를 바탕으로 정확하고 신뢰성 있는 분석수탁 서비스를 제공합니다.
                    </p>
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start text-neutral-700 dark:text-neutral-300">
                      <span className="mr-3 mt-1 text-purple-600 dark:text-purple-400">-</span>
                      <span>매년 자율정도관리 전 항목 적합</span>
                    </li>
                    <li className="flex items-start text-neutral-700 dark:text-neutral-300">
                      <span className="mr-3 mt-1 text-purple-600 dark:text-purple-400">-</span>
                      <span>현재 20여 개의 기관과 수탁 계약 체결하여 업무 수행</span>
                    </li>
                    <li className="flex items-start text-neutral-700 dark:text-neutral-300">
                      <span className="mr-3 mt-1 text-purple-600 dark:text-purple-400">-</span>
                      <span>기본 장비 외 GC-MS, ICP-MS, LC-MS/MS, FT-IR 등 분석 장비 다수 보유</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 수탁 항목 */}
              <section id="items" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">수탁 항목</h2>
                
                {/* 분석항목 리스트 버튼들 */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                  {/* 토글 버튼 */}
                  <button
                    onClick={() => setShowAnalysisItems(!showAnalysisItems)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span className="text-lg">📋 분석수행 물질 전체 리스트 보기</span>
                    {showAnalysisItems ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </button>

                  {/* 다운로드 버튼 */}
                  <button
                    onClick={handleDownload}
                    className="sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <Download className="w-6 h-6" />
                    <span className="text-lg">리스트 다운로드</span>
                  </button>
                </div>

                {/* 분석항목 전체 리스트 테이블 */}
                {showAnalysisItems && (
                  <div className="mb-8 overflow-hidden rounded-xl border-2 border-purple-200 dark:border-purple-800 animate-fadeIn">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 border-b-2 border-purple-200 dark:border-purple-800">
                      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <span className="text-2xl">🔬</span>
                        분석수행 물질 리스트 (총 146개 항목)
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        💡 분석수행 물질 외에도 별도 협의 후 분석 가능합니다.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-neutral-800">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          "아크릴아미드(Acrylamide)",
                          "무수초산(Acetic anhydride)",
                          "니트로메탄(Nitromethane)",
                          "산화에틸렌(Ethylene Oxide)",
                          "이황화탄소(Carbon disulfide)",
                          "황산디메틸(Dimethyl sulfate)",
                          "다환방향족탄화수소(PAHs)",
                          "프탈릭언하이드라이드(Phthalic anhydride)",
                          "1,6-헥사메틸렌디이소시아네이트(1,6-Hexamethylene Diisocyanate)",
                          "디에탄올아민(Diethanolamine)",
                          "디에틸렌트리아민(Diethylenetriamine)",
                          "디하이드록시벤젠(Dihydroybenzene)",
                          "말레산언하이드라이드(무수말레산)(Maleicanhydride)",
                          "메틸렌디(비스)페닐디이소시아네이트(4,4'-Methylenedi(bis)phenyldiisocyanate)",
                          "아세트알데히드(Acetaldehyde)",
                          "아크릴산(Acrylic acid)",
                          "에탄올아민(Ethanolamine)",
                          "톨루엔-2,4-디이소시아네이트(Toluene-2,4-diisocyanate)",
                          "톨루엔-2,6-디이소시아네이트(Toluene-2,6-diisocyanate)",
                          "트리클로로아세트산(Trichloro acetic acid)",
                          "포름알데히드(Formaldehyde)",
                          "석영(산화규소)(Crystalline quatz)",
                          "크리스토발라이트(Cristobalite)",
                          "수은(Mercury)",
                          "삼수소화비소(Arsine)",
                          "셀레늄(Selenium)",
                          "안티몬(Antimony)",
                          "비소(Arsenic)",
                          "인듐(Indium)",
                          "6가크롬(Chromium(Ⅵ)compounds)",
                          "개미산(Formicacid)",
                          "불소(Fluorine)",
                          "불화수소(Hydrogenfluoride)",
                          "브롬화수소(Hydrogenbromide)",
                          "아황산가스(Sulfurdioxide)",
                          "염화수소(hydrogen chloride)",
                          "오존(Ozone)",
                          "요오드(iodine)",
                          "이산화질소(Nitrogendioxide)",
                          "인산(Phosphoric acid)",
                          "일산화질소(Nitricoxide)",
                          "질산(nitric acid)",
                          "황산(Sulfuric acid)",
                          "황화수소(Hydrogensulfide)",
                          "과산화수소(Hydrogen peroxide)",
                          "시안화나트륨(Sodium cyanide)",
                          "시안화수소(Hydrogen cyanide)",
                          "시안화칼륨(Potassium cyanide)",
                          "시안화칼슘(Calcium cyanide)",
                          "암모니아(Ammonia)",
                          "포스핀(Phosphine)",
                          "1,1,2-트리클로로에탄(1,1,2-Trichloroethane)",
                          "1,1-디클로로-1-플루오로에탄(1,1-Dichloro-1-fluoroethane)",
                          "1,2-디클로로에탄(1,2-Dichloroethane)",
                          "1,2-디클로로에틸렌(1,2-Dichloroethylene)",
                          "1,2-디클로로프로판(1,2-dichloropropane)",
                          "1,2-에폭시프로판(1,2-Epoxypropane)",
                          "1,3-부타디엔(1,3-Butadiene)",
                          "1,4-디옥산(1,4-Dioxane,Diethyldioxide)",
                          "1-브로모프로판(1-Bromopropane)",
                          "2-메톡시에탄올(2-Methoxyethanol)",
                          "2-메톡시에틸아세테이트(2-Methoxyethylacetate)",
                          "2-부톡시에탄올(2-Butoxyethanol,EGBE)",
                          "2-브로모프로판(2-Bromopropane)",
                          "2-에톡시에탄올(2-Ethoxyethanol,EGEE)",
                          "2-에톡시에틸아세테이트(2-Ethoxyethylacetate)",
                          "이소아밀 아세테이트(Isoamyl acetate)",
                          "N,N-디메틸아세트아미드(N,N-Dimethylacetamide)",
                          "n-부틸알코올(1-부탄올)(n-Butyl alcohol)",
                          "o-디클로로벤젠(o-Dichlorobenzene)",
                          "sec-부틸알코올(sec-부탄올)(sec-Butyl alcohol)",
                          "디메틸아닐린(Dimethylaniline)",
                          "디메틸포름아미드(Dimethylformamide)",
                          "디에틸에테르(Diethylether)",
                          "디이소부틸케톤(Diisobutylketone)",
                          "디클로로메탄(Dichloromethane)",
                          "메틸 n-부틸케톤(Methyln-butylketone)",
                          "메틸 n-아밀케톤(Methyln-amylketone)",
                          "메틸시클로헥산(Methylcyclohexane)",
                          "메틸알코올(Methylalcohol)",
                          "메틸에틸케톤(Methylethylketone)",
                          "메틸이소부틸케톤(Methylisobutylketone)",
                          "메틸클로로포름(Methylchloroform)",
                          "벤젠(Benzene)",
                          "비닐아세테이트(Vinylacetate)",
                          "스토다드솔벤트(Stoddard solvent)",
                          "스티렌(Styrene)",
                          "시클로헥사논(Cyclohexanone)",
                          "시클로헥사놀(Cyclohexanol)",
                          "시클로헥산(Cyclohexane)",
                          "아닐린(Aniline)",
                          "아세토니트릴(Acetonitrile)",
                          "아세톤(Acetone)",
                          "아크릴로니트릴(Acrylonitrile)",
                          "알릴글리시딜에테르(Allyl glycidyl ether)",
                          "에틸렌글리콜(Ethyleneglycol)",
                          "에틸렌글리콜모노부틸아세테이트(Ethyleneglycolmonobutylacetate)",
                          "에틸벤젠(Ethylbenzene)",
                          "에틸아크릴레이트(Ethylacrylate)",
                          "에피클로로하이드린(Epichlorohydrin)",
                          "염화비닐(Vinyl chloride)",
                          "이소부틸알코올(Isobutyl alcohol)",
                          "이소아밀알코올(Isoamyl alcohol)",
                          "이소프로필알코올(Isopropyl alcohol)",
                          "초산(Acetic acid)",
                          "초산메틸(Methyl acetate)",
                          "초산부틸(n-Butylacetate)",
                          "초산에틸(Ethylacetate)",
                          "초산이소부틸(Isobutyl acetate)",
                          "초산이소프로필(Isopropyl acetate)",
                          "초산프로필(n-Propylacetate)",
                          "크레졸(Cresol)",
                          "크실렌(오르토,메타,파라이성체)(Xylene,o,m,p-isomers)",
                          "클로로벤젠(Chlorobenzene)",
                          "테트라하이드로푸란(Tetrahydrofuran)",
                          "톨루엔(Toluene)",
                          "트리에틸아민(Triethylamine)",
                          "트리클로로메탄(Trichloromethane)",
                          "트리클로로에틸렌(Trichloroethylene)",
                          "퍼클로로에틸렌(Perchloroethylene)",
                          "페놀(Phenol)",
                          "피리딘(Pyridine)",
                          "헥산(Hexane,n-Hexane)",
                          "헵탄(Heptane,n-Heptane)",
                          "구리(Copper)",
                          "납(Lead)",
                          "니켈(Nickel)",
                          "망간(Manganese)",
                          "바륨(Barium)",
                          "베릴륨(Beryllium)",
                          "산화마그네슘(Magnesium oxide)",
                          "산화아연(Zinc oxide)",
                          "산화철(Iron oxide)",
                          "알루미늄(Aluminum)",
                          "은(Silver)",
                          "이산화티타늄(Titanium dioxide)",
                          "주석(Tin)",
                          "지르코늄(Zirconium)",
                          "카드뮴(Cadmium)",
                          "칼슘(Calcium)",
                          "코발트(Cobalt)",
                          "크롬(Chromium)",
                          "텅스텐(Tungsten)",
                          "수산화나트륨(Sodium hydroxide)",
                          "수산화칼륨(Potassium hydroxide)",
                          "석면(Asbestos)"
                        ].map((item, index) => (
                          <div 
                            key={index} 
                            className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-3 border border-neutral-200 dark:border-neutral-600 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-200 group"
                          >
                            <div className="flex items-start gap-2">
                              <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                                {index + 1}
                              </span>
                              <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-tight flex-1">
                                {item}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
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
