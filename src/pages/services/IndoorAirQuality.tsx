// No JS-based header offset; anchors handled via CSS :target
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ServiceCta from "../../components/common/ServiceCta";

const IndoorAirQuality = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }
  const location = useLocation();

  // Scroll protection for indoor-air-quality route
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
      targetEl.scrollIntoView({ block: "start", behavior: "auto" });
      
      // Update URL hash without triggering page reload
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            실내공기질 측정
          </h1>
          <p className="text-lg">
            환경부 지정 실내공기질 측정대행업체로서 법정 의무 측정과 실내 환경 개선 컨설팅을 수행합니다.
          </p>
        </div>
      </section>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-2">실내공기질 측정</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
              <nav className="space-y-2">
                {[
                  { label: "실내공기질 측정 개요", href: "#iaq-overview" },
                  { label: "측정 대상 시설", href: "#iaq-target-facilities" },
                  { label: "보유 장비", href: "#iaq-equipment" },
                  { label: "측정 프로세스", href: "#iaq-process" },
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
              <h2 id="iaq-overview" className="heading-md mb-6">실내공기질 측정 개요</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              실내공기질 측정은 실내 공간 이용자의 건강 보호와 쾌적한 환경 조성을 위해 법적으로 요구되는 필수 환경관리 업무입니다.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              당사는 관련 법령과 기준에 따라 신축 상업시 또는 점검 실시를 기반으로 실내공기질 측정을 수행하고, 신뢰도 높은 측정 결과의 공식 보고서를 제공합니다.
            </p>

            <div className="bg-primary-50 dark:bg-neutral-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">업무 범위</h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>• 다중이용시설, 업무시설, 학교 및 교육시설 대상</li>
                <li>• 법정 기준 준수 및 정확 대응 가능</li>
                <li>• 정기·특별 점검 모두 수행</li>
                <li>• 공인 장비 기반 정량 측정 및 결과 해석 제공</li>
              </ul>
            </div>

            <h2 id="iaq-target-facilities" className="heading-md mb-6 mt-12">측정 대상 시설</h2>
            
            {/* 2-1. 다중이용시설 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">2-1. 다중이용시설</h3>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                
                {/* 유지기준 및 권고기준 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-300">유지기준 (연1회측정)</h4>
                    <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                      <li>• 미세먼지(PM10)</li>
                      <li>• 초미세먼지(PM2.5)</li>
                      <li>• 이산화탄소(CO₂)</li>
                      <li>• 일산화탄소(CO)</li>
                      <li>• 폼알데하이드(HCHO)</li>
                      <li>• 총부유세균(TAB)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3 text-purple-800 dark:text-purple-300">권고기준 (2년 1회측정)</h4>
                    <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                      <li>• 이산화질소(NO₂)</li>
                      <li>• 곰팡이(Mold)</li>
                      <li>• 총휘발성유기화합물(TVOC)</li>
                      <li>• 라돈(Rn)</li>
                    </ul>
                  </div>
                </div>

                {/* 측정예시 표 */}
                <div className="mb-6 overflow-x-auto">
                  <h4 className="font-semibold text-lg mb-3">측정예시</h4>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">측정예시</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2019년</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2020년</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2021년</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2022년</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-700 dark:text-neutral-300">
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">측정항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">유지</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">유지 + 권고</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">유지</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">유지 + 권고</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 시설 구분 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">측정시설 구분</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-base mb-2 text-cyan-800 dark:text-cyan-300">상반기 측정시설 (일반시설, 1~6건)</h5>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300">
                        PC방, 실내주차장, 영화상영관, 대규모점포, 장례식장, 복합쇼핑 등 기준규모이상 다중이용시설
                      </p>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                      <h5 className="font-semibold text-base mb-2 text-pink-800 dark:text-pink-300">하반기 측정시설 (민간시설, 7~12건)</h5>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300">
                        어린이집, 노인요양시설, 의료시설, 산후조리원, 키즈카페 등 기준규모이상 민간 다중이용시설
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                    ※ 특정기간별 비성수기시 측정의뢰시 측정수수료를 할인 (상반기 1~3월, 하반기 7~8월)
                  </p>
                </div>

                {/* 유의사항 */}
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded p-4">
                  <h4 className="font-semibold text-base mb-2 text-red-800 dark:text-red-300">유의사항</h4>
                  <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>• 실내공기질 미측정</li>
                    <li>• 실내공기질 교육 미이수</li>
                    <li>• 실내공기질 결과 미게시/미보존</li>
                  </ul>
                  <p className="mt-2 text-base font-bold text-red-700 dark:text-red-400">→ 500만원 이하 과태료</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    ※ 위반회수별 및 위반기관별 발생시 측정업체는 문의 의뢰시설에도 본이에이 입증 수 있으니 측정관련상담에 유의하시기 바랍니다.
                  </p>
                </div>

              </div>
            </div>

            {/* 2-2. 업무시설 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">2-2. 업무시설</h3>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                
                {/* 취지/목적 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">취지/목적</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    이 지침은 「산업안전보건법」제24조에 따라 사무실의료 사무실 공기 오염물질을 관리하기 위한 방법을 정함으로써 
                    사무실 근로자의 쾌적한 업무환경을 조성하고 근로자의 건강을 보호함을 목적으로 한다.
                  </p>
                </div>

                {/* 적용범위 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">적용범위와 오염물질 관리기준</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    이 지침은 사무실 공기오염 방지와 근로자 건강보호가 필요한 사무실 오염물질을 사용 마라치 이하 이상 유지하는 
                    사무소 및 사무실 제단에 적용한다.
                  </p>
                </div>

                {/* 오염물질 관리기준 표 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">오염물질 관리기준</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-emerald-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">오염물질</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">기준치</th>
                        </tr>
                      </thead>
                      <tbody className="text-neutral-700 dark:text-neutral-300">
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">미세먼지(PM-10)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">150 ㎍/㎥ 이하</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">초미세먼지(PM-2.5)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">50 ㎍/㎥ 이하</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">이산화탄소(CO₂)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1,000 ppm 이하</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일산화탄소(CO)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">10 ppm 이하</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">이산화질소(NO₂)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">0.1 ppm 이하</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">폼알데하이드(HCHO)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">100 ㎍/㎥ 이하</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">총휘발성유기화합물(TVOC)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">500 ㎍/㎥ 이하</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">오존(O₃)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">0.06 ppm 이하</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">라돈(Rn)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4.0 pCi/ℓ(148 Bq/㎥) 이하</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">총부유세균</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">800 CFU/㎥ 이하</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">곰팡이</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">500 CFU/㎥ 이하</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      ※ 위 기준은 8시간 시간가중평균농도 기준임
                    </p>
                  </div>
                </div>

                {/* 사무실의 공기관리 */}
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-300">사무실의 공기관리</h4>
                  <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <p>① 사무실은 충분한 신선한 공기로 환기가 이루어져야 하며 먼지 등 오염물질이 외부로부터 유입되지 않도록 해야 한다.</p>
                    <p>② 사업주는 환기시설이나 공기정화시설 등을 통하여 공기 오염물질의 농도를 기준치 이하로 관리하여야 한다.</p>
                    <p>③ 사업주는 오염물질 발생원을 제거하거나 줄이기 위해 노력해야 한다.</p>
                    <p>④ 창문이 개폐 등의 구조로 자연환기가 가능하고 근무자가 상시 실외출입이 가능한 사무실의 경우 환기설비 기준을 적용하지 않을 수 있다.</p>
                  </div>
                </div>

                {/* 사무실 공기관리 실태평가 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">사무실 공기관리 실태평가</h4>
                  <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <p>① 사업주는 근로자가 건강장해를 호소하는 경우 관련 분야 전문가의 지도·조언을 받아 해당 사무실의 공기관리상태를 평가한 후 조치하여야 한다.</p>
                    <p>② 사업주는 전문기관에 의뢰하여 평가할 수 있으며, 이 경우 공기 오염물질의 농도, 환기시설 작동상태, 오염원 관리실태 등을 포함하여야 한다.</p>
                  </div>
                </div>

                {/* 사무실 공기관리 보고 */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">사무실 공기관리 보고</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    사업주는 사무실의 공기관리상황을 평가하고 그 결과에 따라 건강장해 예방을 위한 조치를 추진하여야 한다.
                  </p>
                </div>

              </div>
            </div>

            {/* 2-3. 학교 및 교육시설 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">2-3. 학교 및 교육시설</h3>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl p-6">
                
                {/* 사유 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">사유</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    교실의 신축 증축 또는 대수리 시 학생 및 교직원의 호흡기질환 등 건강장애 발생을 예방하기위한 조치 필수
                  </p>
                </div>

                {/* 대상시설 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">대상시설</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    초중·고 10일 이전 1 지하, 10일 이후 1차 이상의 대안 특별점검 실시<br/>
                    (학기중 시설관리통지 첨부 안내조치으므로 충분 세심)
                  </p>
                </div>

                {/* 측정항목 표 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">측정항목</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-teal-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">항목</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">기준치</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">오염물질 발생원</th>
                        </tr>
                      </thead>
                      <tbody className="text-neutral-700 dark:text-neutral-300">
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">폼알데하이드<br/>(HCHO)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">80μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">목재, 의자·벤치, 가구수선, 바닥재·벽재, 단열재</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">총휘발성유기<br/>화합물(TVOC)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">400μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">실내건축자재, 바닥재·벽재, 접착제류</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">벤젠<br/>(Benzene)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">30μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">흡연(연기), 석유제품·페종료</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">톨루엔<br/>(Toluene)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1000μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">마감용품, 유성도료, 목재에 함유 등</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">에틸벤젠<br/>(Ethylbenzene)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">360μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">접착제 및 도료의 용제, 코팅제</td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">자일렌<br/>(Xylene)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">700μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">유성페인트, 목조제품, 가죽제</td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">스티렌<br/>(Styrene)</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">300μg/m³이하</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">스티로폼 등의 합성수 고무관련물합재 본드</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 중적측정 */}
                <div className="mb-6 bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">중적측정</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    급성증상시 조치조건, 위치면, 수중, 구조 조치사항 안전관리 영상보호 검증 증명시정, 면호 통보 위상
                  </p>
                </div>

                {/* 권장방법 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-300">권장방법</h4>
                  <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">※ 베이크아웃(Bake-out) 방법</p>
                      <p className="mb-2">
                        건축물의 신축이나 개보수 공사 등의 공사 방법 시 실내온도가 상승 모든 노안 지속시간과 미내부패 써의 방전하는 
                        등장실효기관물질(VOC)및 솔전세하이드(HCHO)등 내부수 유험도승등온 방물을쾀 점비료으로 줄어사법 혼거원 
                        화주구시시 새불 제거하는 방법
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">※ 그린시일 측정시설 베이크아웃 방법</p>
                      <ul className="space-y-1 list-decimal list-inside">
                        <li>최근 2시 내지 공공기관 베이크아웃 시설</li>
                        <li>전소시 특수민속/자 계획외의 정기(60도2이상)</li>
                        <li>온순기 위치특 내원조 온(VOC 진산 타지사이션)</li>
                        <li>특금 나저서 다성서 거환 온 정기(60도 이상)</li>
                        <li>실기시 작성기 1-4의 반복</li>
                        <li>특금시 선동시 등중 통불배허의 공기중관리 통불통조 등 평</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <h2 id="iaq-equipment" className="heading-md mb-6 mt-12">보유 장비</h2>
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                당사는 실내공기질 측정 관련 법령 및 시험 기준에 적합한 공인 분석 장비를 보유하고 있으며,
                모든 장비는 정기 교정 및 이력 관리 체계를 통해 측정 신뢰도를 유지합니다.
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">주요 보유 장비(예시)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">가스크로마토그래프 (GC/MS, GC/FID)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    휘발성유기화합물 정밀 분석
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">액체크로마토그래프 (HPLC)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    폼알데하이드 정량 분석
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">열탈착 농축장치 (TD)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    미량 유해물질 농축 및 분리
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">미세먼지·초미세먼지 시료채취기</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    PM10, PM2.5 포집 및 측정
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">CO₂, CO, NOx 자동 측정기</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    가스상 오염물질 연속 측정
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">폼알데하이드, VOCs, 라돈 측정기</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    실내 유해물질 전용 측정
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-1">총부유세균 및 곰팡이 포집 장비</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    미생물 샘플링 및 배양 분석
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <strong>※</strong> 관련 법령 및 시험 기준에 적합한 장비 사용<br/>
                <strong>※</strong> 정기 교정 및 장비 이력 관리 수행
              </p>
            </div>

            <h2 id="iaq-process" className="heading-md mb-6 mt-12">측정 프로세스</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              실내공기질 측정은 다음과 같은 절차로 체계적으로 진행됩니다.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">사전 협의 및 대상 시설 확인</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      시설 유형, 규모, 적용 법정 기준 검토
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">현장 방문 및 측정 수행</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      표준 시험 방법에 따라 항목별 정밀 측정
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">데이터 분석 및 기준 비교</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      법적 유지기준 충족 여부 판단
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">측정 결과 보고서 제공</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      행정 제출 및 내부 관리용 공식 보고서 제공
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">개선 사항 안내 (필요 시)</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      환기, 관리 방법 등 실질적인 개선 방향 제시
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12">
              <ServiceCta message="실내공기질 측정 문의가 필요하신가요?" />
            </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndoorAirQuality;
