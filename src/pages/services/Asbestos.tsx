const Asbestos = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            석면조사 및 분석
          </h1>
          <p className="text-lg">
            환경부 지정 석면조사기관\n 석면안전관리법에 따른 전문적이고 체계적인
            석면 안전관리 서비스
          </p>
        </div>
      </div>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32">
              <h3 className="font-bold text-lg mb-4">세부 서비스</h3>
              <nav className="space-y-2">
                {[
                  { label: "석면조사분석", path: "/asbestos/survey" },
                  { label: "석면농도측정", path: "/asbestos/concentration" },
                  { label: "석면비산정도측정", path: "/asbestos/dispersion" },
                  { label: "석면해체제거감리", path: "/asbestos/supervision" },
                  { label: "석면건축물 위해성평가", path: "/asbestos/risk-assessment" },
                  { label: "석면건축물 공기질측정", path: "/asbestos/air-quality" },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
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
            <div className="card p-8">
              <h2 className="heading-md mb-6" id="overview">석면조사·분석 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 환경부 지정 석면조사기관(등록번호:
              2017-AB-001)으로 2006년부터 1,200여 건의 석면조사 및 3,000여 건의
              석면분석을 수행해왔습니다. 석면안전관리법, 산업안전보건법,
              환경정책기본법 등 관련 법령에 따른 전문적이고 체계적인 석면
              안전관리 서비스를 제공합니다.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                ⚠️ 석면이란?
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                석면(Asbestos)은 천연 광물질 섬유로, 내열성·내구성이 뛰어나
                1970~1990년대 건축자재로 광범위하게 사용되었습니다. 그러나 흡입
                시 폐암, 악성중피종, 석면폐증 등을 유발하는 1급 발암물질로
                2009년부터 제조·사용이 전면 금지되었습니다.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">주요 서비스</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏢</div>
                <h4 className="font-bold text-lg mb-2">건축물 석면조사</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 철거·해체 전 석면 함유 여부 조사</li>
                  <li>• 리모델링 전 석면조사</li>
                  <li>• 건축물 석면지도 작성</li>
                  <li>• 석면 함유자재 위치 및 상태 평가</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="text-4xl mb-3">🔬</div>
                <h4 className="font-bold text-lg mb-2">석면 정성·정량분석</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 건축자재 석면 함유 여부 분석 (PLM)</li>
                  <li>• 석면 함유량 정량분석 (XRD, TEM)</li>
                  <li>• 6종 석면 종류 판별 (백석면, 청석면 등)</li>
                  <li>• 분석성적서 발급 (공식 인정기관)</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="text-4xl mb-3">🌬️</div>
                <h4 className="font-bold text-lg mb-2">
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
                <h4 className="font-bold text-lg mb-2">위해성평가 및 컨설팅</h4>
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

            <h3 className="text-2xl font-bold mt-8 mb-4">석면조사 프로세스</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border-2 border-primary-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-400">
                  PLM (편광현미경)
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  가장 기본적인 석면 정성분석 방법
                </p>
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 석면 함유 여부 판정</li>
                  <li>• 석면 종류 구분</li>
                  <li>• 분석시간: 1~2일</li>
                </ul>
              </div>
              <div className="border-2 border-gray-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-600 dark:text-gray-400">
                  XRD (X선회절분석)
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  석면 함유량 정량분석
                </p>
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 석면 함유량 % 측정</li>
                  <li>• 고정밀 정량분석</li>
                  <li>• 분석시간: 3~5일</li>
                </ul>
              </div>
              <div className="border-2 border-gray-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-600 dark:text-gray-400">
                  TEM (투과전자현미경)
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  공기 중 석면섬유 계수
                </p>
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 초미량 석면 검출</li>
                  <li>• 석면농도 측정 (개/cc)</li>
                  <li>• 분석시간: 7~10일</li>
                </ul>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asbestos;
