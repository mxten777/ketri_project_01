// No JS-based header offset; anchors handled via CSS :target

const IndoorAirQuality = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            실내공기질 측정 및 개선
          </h1>
          <p className="text-lg">
            환경부 지정 실내공기질 측정대행업체\n 실내공기질 관리법에 따른 9개
            항목 측정 및 개선방안 제시
          </p>
        </div>
      </section>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-4">세부 서비스</h3>
              <nav className="space-y-2">
                {[
                  { label: "업무 소개", href: "#introduction" },
                  { label: "측정 대상시설", href: "#facilities" },
                  { label: "측정 항목 및 기준", href: "#standards" },
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
              <h2 id="introduction" className="heading-md mb-6">실내공기질 측정 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 환경부 지정 실내공기질 측정대행업체(등록번호:
              2017-001)로 2006년부터 500여 개 시설의 실내공기질 측정을
              수행해왔습니다. 실내공기질 관리법에 따른 9개 항목 측정과 더불어
              개선방안 제시, 후속 관리까지 포괄적인 서비스를 제공합니다.
            </p>

            <h3 id="facilities" className="text-2xl font-bold mt-8 mb-4">측정 대상 시설</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏫</div>
                <h4 className="font-bold text-lg mb-2">교육시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 어린이집 (430㎡ 이상)</li>
                  <li>• 유치원 (430㎡ 이상)</li>
                  <li>• 초·중·고등학교</li>
                  <li>• 학원 (연면적 1,000㎡ 이상)</li>
                </ul>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="font-bold text-lg mb-2">의료시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 종합병원</li>
                  <li>• 병원 (입원실 100개 이상)</li>
                  <li>• 산후조리원</li>
                  <li>• 노인요양시설</li>
                </ul>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏢</div>
                <h4 className="font-bold text-lg mb-2">다중이용시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 대형마트 (3,000㎡ 이상)</li>
                  <li>• 지하역사, 지하도상가</li>
                  <li>• 철도역사, 공항시설</li>
                  <li>• 도서관, 박물관, 미술관</li>
                </ul>
              </div>
            </div>

            <h3 id="standards" className="text-2xl font-bold mt-8 mb-4">
              측정 항목 및 유지기준
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      오염물질
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      단위
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      유지기준
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      권고기준
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      미세먼지 (PM10)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      μg/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      100 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      50 이하
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      초미세먼지 (PM2.5)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      μg/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      50 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      25 이하
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      이산화탄소 (CO₂)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ppm
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      1,000 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      폼알데하이드 (HCHO)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      μg/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      100 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      총부유세균
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      CFU/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      800 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      일산화탄소 (CO)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ppm
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">
                      10 이하
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      총휘발성유기화합물 (TVOC)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      μg/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-blue-600">
                      500 이하
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">
                      라돈 (Rn)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      Bq/m³
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      -
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-blue-600">
                      148 이하
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 주기</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-green-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
                  신축 건물
                </h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>
                    <strong>사용승인 전:</strong> 의무 측정
                  </li>
                  <li>
                    <strong>사용승인 후:</strong> 연 1회 이상
                  </li>
                  <li>
                    <strong>리모델링 시:</strong> 공사 후 즉시 측정
                  </li>
                </ul>
              </div>
              <div className="border-2 border-emerald-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-emerald-600 dark:text-emerald-400">
                  기존 건물
                </h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>
                    <strong>지하역사, 철도역사:</strong> 반기 1회
                  </li>
                  <li>
                    <strong>의료시설, 어린이시설:</strong> 연 1회
                  </li>
                  <li>
                    <strong>기타 다중이용시설:</strong> 연 1회
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 프로세스</h3>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    1
                  </div>
                  <h4 className="font-bold mb-1">측정 계획 수립</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    시설 현황 파악
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    2
                  </div>
                  <h4 className="font-bold mb-1">현장 측정</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    전문장비로 측정
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    3
                  </div>
                  <h4 className="font-bold mb-1">시료 분석</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    실험실 정밀분석
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    4
                  </div>
                  <h4 className="font-bold mb-1">결과 보고</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    개선방안 제시
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">공기질 개선 방안</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-bold text-lg mb-3">🌬️ 환기 개선</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 기계환기장치 설치 및 관리</li>
                  <li>• 자연환기 시간 확보 (1일 3회, 회당 10분)</li>
                  <li>• 공조시스템 필터 정기 교체</li>
                  <li>• 외부공기 도입량 증대</li>
                </ul>
              </div>
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <h4 className="font-bold text-lg mb-3">🧹 오염원 관리</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 저방출 자재 사용 (친환경 마크)</li>
                  <li>• 실내흡연 금지 철저</li>
                  <li>• 청소 및 먼지 제거</li>
                  <li>• 습도 관리 (30~60%)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-2 text-red-900 dark:text-red-300">
                ⚠️ 기준 초과 시 조치사항
              </h3>
              <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>• 즉시 환기 및 오염원 제거</li>
                <li>• 30일 이내 개선 후 재측정</li>
                <li>• 개선계획 수립 및 이행</li>
                <li>• 이용자에게 측정결과 공개 (게시)</li>
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">전문 측정 장비 보유</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">광산란법 측정기 (DustTrak)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    PM10, PM2.5 실시간 측정
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">NDIR CO₂ 측정기</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    이산화탄소 연속 측정
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    HPLC (고성능액체크로마토그래피)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    폼알데하이드 정밀 분석
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">GC/MS (가스크로마토그래프)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    TVOC 성분 분석
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 섹션 */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-8 mt-8">
              <h3 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">
                💬 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 실내공기질 측정은 언제 해야 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 신축·리모델링 후 사용 전, 그리고 법적으로 다중이용시설은 연 1회, 지하역사·철도역사는 반기 1회 측정이 의무입니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 측정 시간은 얼마나 걸리나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 현장 측정은 1~2시간(측정 지점 수에 따라 상이), 시료 분석 후 결과 보고서는 3~5일 이내에 발급됩니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 비용은 얼마인가요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 다중이용시설 기본(3항목) 약 30~50만원, 지하역사(10항목) 약 100~150만원입니다. 
                    측정 지점 수와 항목에 따라 변동됩니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 부적합 시 어떻게 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 환기 시스템 개선, 오염원 제거, 공기청정기 설치 등의 개선 조치를 실시하고, 
                    재측정을 통해 적합 판정을 받아야 합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 비용 안내 */}
            <div className="bg-white dark:bg-neutral-800 border-2 border-green-200 dark:border-green-800 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">💰</span>
                측정 비용 안내
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">시설 구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">측정 항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">예상 비용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-900">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">다중이용시설 (기본)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">PM10, CO₂, HCHO (3개)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">30만원 ~ 50만원</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">다중이용시설 (전체)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">6개 항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">60만원 ~ 90만원</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-900">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">지하역사·철도역사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">10개 항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">100만원 ~ 150만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                ※ 측정 지점 수와 시설 규모에 따라 비용 변동 가능.
              </p>
            </div>

            {/* 신청서 다운로드 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">📥</span>
                신청서 다운로드
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                실내공기질 측정 의뢰서를 다운로드하여 작성 후 제출해주세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/documents/indoor-air-application.pdf"
                  className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-green-200 dark:border-green-800"
                >
                  <span className="font-bold">실내공기질 측정 의뢰서</span>
                  <span className="text-2xl">📄</span>
                </a>
                <a
                  href="/documents/indoor-air-improvement-guide.pdf"
                  className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-green-200 dark:border-green-800"
                >
                  <span className="font-bold">공기질 개선 가이드</span>
                  <span className="text-2xl">📋</span>
                </a>
              </div>
            </div>

            {/* 고객 후기 */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">⭐</span>
                고객 후기
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 text-xl">★★★★★</div>
                    <span className="ml-2 text-sm text-neutral-500">서울 강남구 ○○어린이집</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                    "신축 건물이라 걱정이 많았는데, 전문적인 측정과 개선 방안 덕분에 
                    안심하고 아이들을 맞이할 수 있었습니다."
                  </p>
                  <p className="text-xs text-neutral-500">- 박○○ 원장</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 text-xl">★★★★★</div>
                    <span className="ml-2 text-sm text-neutral-500">충북 청주시 ○○피트니스센터</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                    "연 1회 정기 측정을 의뢰하고 있습니다. 신속한 결과 보고와 
                    개선 컨설팅으로 항상 적합 판정을 유지하고 있습니다."
                  </p>
                  <p className="text-xs text-neutral-500">- 최○○ 관리자</p>
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

export default IndoorAirQuality;
