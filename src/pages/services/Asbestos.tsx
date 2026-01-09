 
// No JS-based header offset; anchors handled via CSS :target
import { useNavigate } from "react-router-dom";

const Asbestos = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            석면조사 및 분석
          </h1>
          <p className="text-lg">
            고용노동부 지정 석면조사기관으로 석면안전관리법에 따른 전문적이고 체계적인 석면 안전관리 서비스
          </p>
        </div>
      </section>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-2">석면조사·분석</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
              <nav className="space-y-2">
                {[
                  { label: "석면조사분석", href: "#survey" },
                  { label: "석면농도측정", href: "#concentration" },
                  { label: "석면비산정도측정", href: "#dispersion" },
                  { label: "석면해체제거감리", href: "#supervision" },
                  { label: "석면건축물 위해성평가", href: "#risk-assessment" },
                  { label: "석면건축물 공기질측정", href: "#air-quality" },
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
              <h2 id="survey" className="heading-md mb-6">석면조사·분석 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 고용노동부 지정 석면조사기관으로 2006년부터 1,200여 건의 석면조사 및 3,000여 건의
              석면분석을 수행해왔습니다. 석면안전관리법, 산업안전보건법 등 관련 법령에 따른 전문적이고 체계적인 석면
              안전관리 서비스를 제공합니다.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                ● 석면조사(산업안전보건법-고용노동부) - 산업안전보건법 제119조
              </h3>
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mt-4">
                <h4 className="font-bold text-base mb-2 flex items-center text-gray-900 dark:text-gray-300">
                  <span className="text-green-600 dark:text-green-400 mr-2">📋</span>
                  석면조사
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  해당건축물이나 설비에 석면이 함유되어 있는지의 여부, 함유된 석면의 종류 및 함유량, 함유 제품의 위치 및 면적을 
                  파악하기 위한 조사로서 일정규모 이상의 건축물 또는 설비를 철거 · 해체하고자 하려는 자는 지정 석면조사기관을 통해 
                  석면조사를 실시 한 후 그 결과를 기록 · 보존하여야 함
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-300">
                ● 석면조사대상(산업안전보건법-고용노동부) - 산업안전보건법 제119조
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  과태료 : 기관석면조사대상 5천만원 이하 / 일반석면조사대상 300만원 이하
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-base mb-3 text-primary-600 dark:text-primary-400">기관석면조사대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>• <strong>일반건축물(주택 제외):</strong> 연면적 합계가 50㎡ 이상이면서, 그 건축물의 철거·해체하려는 부분의 면적 합계가 50㎡ 이상</li>
                    <li>• <strong>주택:</strong> 연면적 합계가 200㎡ 이상이면서, 그 주택의 철거·해체하려는 부분의 면적 합계가 200㎡ 이상</li>
                    <li>• <strong>설비:</strong> 단열재, 보온재, 내화피복재 등을 사용한 면적의 합이 15㎡ 이상 또는 그 부피의 합이 1㎥ 이상</li>
                    <li>• <strong>파이프:</strong> 길이의 합이 80m 이상이면서, 그 파이프의 철거·해체하려는 부분의 보온재로 사용된 길이의 합이 80m 이상</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-bold text-base mb-3 text-gray-600 dark:text-gray-400">일반석면조사대상</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">기관석면조사 대상 이외의 건축물 및 설비</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-300">
                ● 석면조사대상(석면안전관리법-기후에너지환경부) - 석면안전관리법 제21조
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  과태료 : 2천만원 이하
                </p>
              </div>

              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• 연면적이 500㎡ 이상인 건축물</li>
                <li>• 국회, 법원, 헌법재판소 등 중앙행정기관 및 그 소속 기관과 지방자치단체가 소유 및 사용하는 건축물</li>
                <li>• 공공기관이 사용하는 건축물</li>
                <li>• 특별법에 따라 설립된 특수법인이 소유 및 사용하는 건축물</li>
                <li>• 지방공기업법에 따른 지방공사 및 지방공단이 소유 및 사용하는 건축물</li>
                <li>• 영유아 보육법에 따른 어린이집, 유아교육법에 따른 유치원, 초중등교육법에 따른 학교, 고등교육법에 따른 학교 및 아동복지법에 따른 지역아동센터</li>
                <li>• 불특정 다수인이 사용하는 다중이용시설 건축물 (지하역사, 지하도상가, 철도역사 대합실 등)</li>
                <li>• 문화 및 집회시설, 의료시설, 노유자시설</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">주요 서비스</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏢</div>
                <h4 id="survey-building" className="font-bold text-lg mb-2">건축물 석면조사</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 철거·해체 전 석면 함유 여부 조사</li>
                  <li>• 리모델링 전 석면조사</li>
                  <li>• 건축물 석면지도 작성</li>
                  <li>• 석면 함유자재 위치 및 상태 평가</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="text-4xl mb-3">🔬</div>
                <h4 id="analysis" className="font-bold text-lg mb-2">석면 정성·정량분석</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 건축자재 석면 함유 여부 분석 (PLM)</li>
                  <li>• 석면 함유량 정량분석 (XRD, TEM)</li>
                  <li>• 6종 석면 종류 판별 (백석면, 청석면 등)</li>
                  <li>• 분석성적서 발급 (공식 인정기관)</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="text-4xl mb-3">🌬️</div>
                <span id="air-quality" />
                <h4 id="concentration" className="font-bold text-lg mb-2">
                  공기 중 석면농도 측정
                </h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 작업장 석면농도 측정 (개인시료, 지역시료)</li>
                  <li>• 석면해체·제거 작업 후 청정도 평가</li>
                  <li>• 학교, 어린이집 석면농도 측정</li>
                  <li>• 위상차현미경(PCM), 전자현미경(TEM) 분석</li>
                </ul>
              </div>
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="text-4xl mb-3">📋</div>
                <h4 id="risk-assessment" className="font-bold text-lg mb-2">위해성평가 및 컨설팅</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 석면 함유 건축물 위해성평가</li>
                  <li>• 석면관리계획 수립</li>
                  <li>• 안전한 해체·제거 공법 제안</li>
                  <li>• 석면안전관리법 법규 자문</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">석면조사 의무 대상</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      대상
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      규모
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      철거·해체 건축물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      연면적 50㎡ 이상
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      2009년 이전 건축물
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      리모델링 건축물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      바닥면적 50㎡ 이상
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      천장, 벽체 등 해체 시
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      학교, 어린이집
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      전체
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      3년마다 정기조사
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      공공건축물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      연면적 500㎡ 이상
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      서울시 조례 (지자체별 상이)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              석면 함유 가능 자재
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-primary-600 dark:text-primary-400">
                  외장재
                </h4>
                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• 슬레이트 (지붕재)</li>
                  <li>• 석면시멘트 외벽패널</li>
                  <li>• 벽돌 줄눈재</li>
                  <li>• 방화문 충진재</li>
                </ul>
              </div>
              <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-gray-600 dark:text-gray-400">
                  내장재
                </h4>
                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• 천장텍스 (뿜칠재)</li>
                  <li>• 석면 함유 벽지</li>
                  <li>• 비닐 타일</li>
                  <li>• 단열재, 보온재</li>
                </ul>
              </div>
              <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-gray-600 dark:text-gray-400">
                  설비재
                </h4>
                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• 배관 보온재</li>
                  <li>• 보일러 단열재</li>
                  <li>• 가스켓, 패킹</li>
                  <li>• 브레이크 라이닝</li>
                </ul>
              </div>
            </div>

            <h3 id="supervision" className="text-2xl font-bold mt-8 mb-4">석면조사 프로세스</h3>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    1
                  </div>
                  <p className="font-bold mb-1">현장조사</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    건축물 육안조사
                  </p>
                </div>
                <div className="flex items-center justify-center text-2xl text-neutral-400">
                  →
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    2
                  </div>
                  <p className="font-bold mb-1">시료채취</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    의심자재 샘플링
                  </p>
                </div>
                <div className="flex items-center justify-center text-2xl text-neutral-400">
                  →
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    3
                  </div>
                  <p className="font-bold mb-1">실험실 분석</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    PLM, XRD 분석
                  </p>
                </div>
                <div className="flex items-center justify-center text-2xl text-neutral-400 md:col-start-2">
                  →
                </div>
                <div className="text-center md:col-start-3">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    4
                  </div>
                  <p className="font-bold mb-1">결과보고서</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    조사결과서 발급
                  </p>
                </div>
                <div className="flex items-center justify-center text-2xl text-neutral-400">
                  →
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    5
                  </div>
                  <p className="font-bold mb-1">관리계획 수립</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    해체방안 제시
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">분석 방법</h3>
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
              <h4 className="font-bold text-lg mb-4">석면조사 및 공기중 석면농도 분석</h4>
              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h5 className="font-bold mb-2 text-primary-600 dark:text-primary-400">PLM (편광현미경)</h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">석면조사(고형) 정성, 정량분석</p>
                  <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <li>• 석면 함유여부 및 함유량 판정</li>
                    <li>• 석면 종류 구분</li>
                    <li>• 분석 기간: 1~2일</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <h5 className="font-bold mb-2 text-gray-600 dark:text-gray-400">PCM (위상차현미경)</h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">공기중 석면농도 분석</p>
                  <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <li>• 공기중 석면 농도 분석 (개/CC)</li>
                    <li>• 분석기간: 2~3일</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 석면 비산정도 측정 섹션 (앵커) */}
            <div className="mt-8 mb-8">
              <h3 id="dispersion" className="text-2xl font-bold mb-4">석면 비산정도 측정</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                작업 중 발생하는 석면 비산 정도를 평가하기 위한 측정 및 분석을 수행합니다. 작업 전·중·후의 공기 시료를 채취하여 비산 특성 및 제어 필요성을 판단합니다.
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                ✅ 석면조사 결과의 활용
              </h3>
              <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>• 철거·해체·리모델링 신고 시 필수 첨부서류</li>
                <li>• 석면해체·제거 계획 수립 자료</li>
                <li>• 석면 안전관리대장 작성 근거</li>
                <li>• 건축물 매매 시 석면 정보 제공</li>
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">전문 분석 장비 보유</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">
                    PLM (Polarized Light Microscopy)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    석면 정성분석 표준 장비
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">XRD (X-Ray Diffraction)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    석면 정량분석 장비
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    PCM (Phase Contrast Microscopy)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    공기 중 석면농도 측정
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    TEM (Transmission Electron Microscopy)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    초고배율 석면섬유 분석
                  </p>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigate('/about/introduction#equipment')}
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <span>전체 보유장비 보기</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* FAQ 섹션 */}
            <div className="bg-gradient-to-r from-primary-50 to-orange-50 dark:from-primary-900/20 dark:to-orange-900/20 rounded-xl p-8 mb-8 mt-8">
              <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                💬 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 석면 조사는 언제 해야 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 2009년 이전 건축물의 철거·해체 전, 리모델링 전, 그리고 석면 함유 의심 시 반드시 조사해야 합니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 조사 비용은 얼마인가요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 건축물 면적과 시료 수에 따라 다릅니다. 일반 주택(3~5개 시료) 약 50~80만원, 
                    중대형 건물(10개 이상) 100~200만원입니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 석면이 검출되면 어떻게 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 석면해체·제거 전문업체를 통해 안전하게 제거해야 합니다. 
                    비산 방지 조치 없이 임의 해체 시 과태료가 부과됩니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 조사 기간은 얼마나 걸리나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 현장 조사 1일, 시료 분석 3~5일로 총 5~7일 정도 소요됩니다. 
                    긴급 조사도 가능합니다(추가 비용).
                  </p>
                </div>
              </div>
            </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Asbestos;
