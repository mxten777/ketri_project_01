// No JS-based header offset; anchors handled via CSS :target
import ServiceCta from "../../components/common/ServiceCta";
import { getMenuItemsByPath } from "../../constants/menu";

const DialysisWater = () => {
  const menuItems = getMenuItemsByPath("/services/dialysis-water");
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">혈액투석용수 검사</h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            대한신장학회 감염관리 지침 및 ISO 23500/건강보험심사평가원 기준에 근거하여 환자 안전을 최우선으로 한 혈액투석용수 27개 항목 검사 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 sticky top-24 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">혈액투석용수</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const hash = item.path.includes('#') ? `#${item.path.split('#')[1]}` : item.path;
                    return (
                      <a
                        key={hash}
                        href={hash}
                        className="block px-4 py-3 rounded-lg text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-neutral-700 dark:text-neutral-300"
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* 서비스 개요 */}
              <section id="introduction" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">투석용수 검사 서비스</h2>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  한국환경안전연구소는 혈액투석용수 전문 검사기관으로 2006년부터
                  전국 200여 개 투석센터의 용수검사를 수행해왔습니다. 대한신장학회
                  감염관리 지침, ISO 23500/건강보험심사평가원 27개 항목 기준에 근거하여
                  환자 안전과 투석 효율성 향상에 기여하고 있습니다.
                </p>

                <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">투석용수 중요성</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
                    환자는 혈액투석 치료 중 매주 300~600리터의 물에 노출될 수 있습니다. 감염성 질환의 매개체로서 투석용수에 대한 감염이 증가되면서 투석용수에 대한 적절한 관리 지침을 반드시 필요합니다.
                  </p>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>미량의 오염물질도 투석막을 통과하여 환자 혈액에 축적</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>세균 및 엔도톡신 오염 시 발열 반응 및 패혈증 유발 가능</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>화학적 오염물질은 빈혈, 골질환, 신경독성 유발</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 검사 대상 및 기준 */}
              <section id="standards" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">검사 대상 및 기준</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    혈액투석 환자는 1회 치료 시 수백 리터의 투석용수에 노출되며, 투석막을 통해 미량의 화학물질도 체내로 유입될 수 있습니다. 이에 따라 혈액투석용수는 일반 음용수보다 훨씬 엄격한 화학미세물질 관리 기준이 요구되며, 국제 기준(AAMI, ISO 23500)에 따라 정기적인 수질 검사가 필요합니다.
                  </p>
                </div>

                <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">검사 주기</h3>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 border border-neutral-200 dark:border-neutral-600">
                  <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>세균 배양 검사: 월 1회</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>내독소 검사: 분기별 1회</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>시스템 변화가 있는 경우 검사 결과 안정 시까지 주 1회 검사</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>화학적 검사: 연 1회</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 검사 항목 */}
              <section id="items" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">혈액투석용수 화학미세물질 검사 항목 및 기준</h2>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                          구분
                        </th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                          항목
                        </th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                          기준값 (mg/L)
                        </th>
                      </tr>
                    </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={25}
                    >
                      화학미세물질
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      알루미늄 (Al)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.01
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      안티몬 (Sb)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.006
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      비소 (As)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.005
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      바륨 (Ba)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      카드뮴 (Cd)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.001
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      칼슘 (Ca)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 2
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      크롬 (Cr)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.014
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      구리 (Cu)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      불소 (F⁻)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.2
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      납 (Pb)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.005
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      마그네슘 (Mg)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 4
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      망간 (Mn)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.002
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      수은 (Hg)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.0002
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      질산염 (NO₃⁻)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 2
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      아질산염 (NO₂⁻)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      셀레늄 (Se)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.09
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      은 (Ag)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.005
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      나트륨 (Na)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 70
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      황산염 (SO₄²⁻)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 100
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      아연 (Zn)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      잔류염소
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      클로라민
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      총유기탄소 (TOC)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.5
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      실리카 (SiO₂)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 2
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      철 (Fe)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.1
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={2}
                    >
                      미생물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      일반세균
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      &lt; 100 CFU/mL
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      엔도톡신 (Endotoxin)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      &lt; 0.25 EU/mL
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={2}
                    >
                      물리화학적
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      염소/클로라민
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      ≤ 0.5 mg/L (유리염소), ≤ 0.1 mg/L (클로라민)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      pH
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-right">
                      6.5 ~ 8.5
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4">
                ※ 본 기준은 AAMI 및 ISO 23500(혈액투석 및 관련 치료용 수질 기준)을 근거로 하여 적용됩니다.
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-50">검사 종류</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-700/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600">
                  <h4 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
                    화학미세물질 검사
                  </h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    대한신장학회 감염관리 지침 및 건강보험심사평가원의 혈액투석 적정성 평가 기준에 따라 화학미세물질 검사를 권고하고 있으며, 안티몬(Antimony), 베릴륨(Beryllium), 탈륨(Thallium) 검사는 권고하며 염소(Chlorine, Cl)와 클로라민(Chloramine)의 합인 total chlorine 수치로 검사하기를 권고하고 있다.
                  </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600">
                  <h4 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
                    미생물 검사
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>일반세균 배양 검사</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>엔도톡신(내독소) 정량분석</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>수처리시스템 각 단계별 검사</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>배관 및 저장탱크 검사</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 검사 절차 */}
            <section id="procedure" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">검사 프로세스</h2>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                혈액투석용수 검사는 다음과 같은 절차로 체계적으로 진행됩니다.
              </p>
              <div className="space-y-4">
                {[
                  { title: "검사 신청", desc: "투석실 담당자 연락" },
                  { title: "시료 채취", desc: "무균 시료채취 방문" },
                  { title: "정밀 분석", desc: "화학미세물질 검사/미생물 검사" },
                  { title: "성적서 발급", desc: "7~10일 내 결과 통보" },
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

              <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-50">검사 분석 장비</h3>
              <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 border border-neutral-200 dark:border-neutral-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-50">
                      ICP/MS (유도결합플라즈마 질량분석기)
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      중금속 초미량 분석 (ppb 수준)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-50">
                      LAL Test (Limulus Amebocyte Lysate)
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      &gt;0.05EU/mL 검출
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-50">무균작업대 (Clean Bench)</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      무균 환경에서 미생물 배양
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-neutral-50">IC (이온크로마토그래피)</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      불소, 질산성질소
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 관리 기준 */}
            <section id="management" className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">결과 제공 및 관리 기준</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-blue-900 dark:text-blue-300">
                    ⚠️ 오염 발생 시 조치사항
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>즉시 투석 중단 및 수처리시스템 점검</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>배관 및 탱크 소독 (염소소독 또는 과산화수소)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>필터 교체 및 역삼투압막 점검</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>재검사 후 적합 판정 시 사용 재개</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-blue-900 dark:text-blue-300">
                    ✅ 관리 포인트
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>수처리시스템 정기 소독 (주 1회)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>필터 및 RO막 교체 주기 준수</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>저장탱크 청소 (분기 1회)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span>배관 막힘(dead leg) 제거</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">💬 자주 묻는 질문</h3>
              <div className="space-y-4">
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 border border-neutral-200 dark:border-neutral-600">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
                    Q. 혈액투석용수 검사는 얼마나 자주 해야 하나요?
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                    A. 검사 주기는 다음과 같습니다:
                  </p>
                  <ul className="text-neutral-700 dark:text-neutral-300 list-disc list-inside space-y-1 ml-4">
                    <li>세균배양검사: 월 1회</li>
                    <li>내독소 검사: 분기별 1회</li>
                    <li>시스템의 변화가 있는 경우: 검사 결과 안정시까지 주 1회</li>
                    <li>화학적 검사: 연 1회</li>
                  </ul>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 border border-neutral-200 dark:border-neutral-600">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
                    Q. 내독소 검사는 왜 중요한가요?
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    A. 내독소는 세균의 외막 성분으로, 극소량으로도 발열 반응을 일으킵니다. 투석액에 혼입되면 심각한 합병증을 유발할 수 있습니다.
                  </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-6 border border-neutral-200 dark:border-neutral-600">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
                    Q. 부적합 판정이 나오면 어떻게 하나요?
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    A. 즉시 투석을 중단하고 수처리시스템 점검, 필터 교체, 배관 소독 등을 실시한 후 재검사를 통해 적합 판정을 받아야 합니다.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8">
          <ServiceCta message="혈액투석용수 검사 문의가 필요하신가요?" />
        </div>
      </div>
    </div>
  </main>
  );
};

export default DialysisWater;
