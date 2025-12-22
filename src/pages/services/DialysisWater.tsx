import Button from "../../components/common/Button";

const DialysisWater = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            혈액투석용수 검사
          </h1>
          <p className="text-lg">
            신장학회 가이드라인 및 ISO 13959 기준 준수\n 환자 안전을 위한
            투석용수 36개 항목 전문 검사 서비스
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
                  { label: "업무소개", path: "/dialysis-water/introduction" },
                  { label: "검사의뢰절차", path: "/dialysis-water/procedure" },
                  { label: "검사주기 및 관련기준", path: "/dialysis-water/schedule" },
                  { label: "수질기준 및 실험방법", path: "/dialysis-water/standards" },
                  { label: "채수방법 및 시료채수위치", path: "/dialysis-water/sampling" },
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
              <h2 className="heading-md mb-6" id="overview">투석용수 검사 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 혈액투석용수 전문 검사기관으로 2006년부터
              전국 200여 개 투석센터의 용수검사를 수행해왔습니다. 대한신장학회
              가이드라인, ISO 13959(Concentrates for haemodialysis), ISO
              11663(Quality of dialysis fluid) 등 국제표준에 따른 36개 항목
              검사로 환자 안전과 투석 효율성 향상에 기여하고 있습니다.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">투석용수 중요성</h3>
            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mb-8">
              <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                혈액투석 환자는 일주일에 3회, 회당 약 120L 이상의 투석용수에
                노출됩니다. 연간 약 18,000L 이상의 물이 환자 혈액과 직접
                접촉하므로 용수의 품질은 환자 건강에 직결됩니다.
              </p>
              <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>• 미량의 오염물질도 투석막을 통과하여 환자 혈액에 축적</li>
                <li>
                  • 세균 및 엔도톡신 오염 시 발열 반응 및 패혈증 유발 가능
                </li>
                <li>• 화학적 오염물질은 빈혈, 골질환, 신경독성 유발</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 항목 및 기준</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      구분
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      항목
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      기준값
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={6}
                    >
                      화학물질
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      알루미늄 (Al)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.01 mg/L
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      구리 (Cu)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.1 mg/L
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      아연 (Zn)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.1 mg/L
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      납 (Pb)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.005 mg/L
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      비소 (As)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.005 mg/L
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      기타 중금속 (Cd, Cr, Hg 등)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      각 ≤ 0.001 mg/L
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={2}
                    >
                      미생물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      일반세균
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 200 CFU/mL (표준), ≤ 20 CFU/mL (고순도)
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      엔도톡신 (Endotoxin)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 2 EU/mL (표준), ≤ 0.25 EU/mL (고순도)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td
                      className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold"
                      rowSpan={3}
                    >
                      물리화학적
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      염소/클로라민
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      ≤ 0.5 mg/L (총 염소), ≤ 0.1 mg/L (클로라민)
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      경도 (Ca, Mg)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      CaCO₃ ≤ 100 mg/L
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      pH
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      6.5 ~ 8.5
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 종류</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-400">
                  화학물질 검사
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 중금속 13종 분석 (ICP/MS)</li>
                  <li>• 염소/클로라민 분석</li>
                  <li>• 경도, pH 측정</li>
                  <li>• 소독부산물 분석</li>
                </ul>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-3">
                  검사주기: 연 1회 이상
                </p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-600 dark:text-gray-400">
                  미생물 검사
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 일반세균 배양 검사</li>
                  <li>• 엔도톡신(내독소) 정량분석</li>
                  <li>• 수처리시스템 각 단계별 검사</li>
                  <li>• 배관 및 저장탱크 검사</li>
                </ul>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-3">
                  검사주기: 월 1회 이상 권장
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 프로세스</h3>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    1
                  </div>
                  <p className="font-bold mb-1">검사 신청</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    투석실 담당자 연락
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    2
                  </div>
                  <p className="font-bold mb-1">시료 채취</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    무균 시료채취 방문
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    3
                  </div>
                  <p className="font-bold mb-1">정밀 분석</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    화학/미생물 검사
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    4
                  </div>
                  <p className="font-bold mb-1">성적서 발급</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    7~10일 내 결과 통보
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                  ⚠️ 오염 발생 시 조치사항
                </h4>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• 즉시 투석 중단 및 수처리시스템 점검</li>
                  <li>• 배관 및 탱크 소독 (염소소독 또는 과산화수소)</li>
                  <li>• 필터 교체 및 역삼투압막 점검</li>
                  <li>• 재검사 후 적합 판정 시 사용 재개</li>
                </ul>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h4 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  ✅ 관리 포인트
                </h4>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• 수처리시스템 정기 소독 (주 1회)</li>
                  <li>• 필터 및 RO막 교체 주기 준수</li>
                  <li>• 저장탱크 청소 (분기 1회)</li>
                  <li>• 배관 막힘(dead leg) 제거</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">검사 분석 장비</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">
                    ICP/MS (유도결합플라즈마 질량분석기)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    중금속 초미량 분석 (ppb 수준)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">
                    LAL Test (Limulus Amebocyte Lysate)
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    엔도톡신 정량 분석 (0.01 EU/mL 검출)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">무균작업대 (Clean Bench)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    무균 환경에서 미생물 배양
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">IC (이온크로마토그래피)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    염소/클로라민 정밀 분석
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 섹션 */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-8 mt-8">
              <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
                💬 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 혈액투석용수 검사는 얼마나 자주 해야 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 화학적 오염물질(중금속 등)은 월 1회, 세균 검사(내독소, 일반세균)는 매주 1회 실시해야 합니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 내독소 검사는 왜 중요한가요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 내독소는 세균의 외막 성분으로, 극소량으로도 발열 반응을 일으킵니다. 투석액에 혼입되면 심각한 합병증을 유발할 수 있습니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 검사 비용은 얼마인가요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 화학적 검사(월 1회) 약 60~80만원, 세균 검사(주 1회) 회당 약 15~20만원입니다. 패키지 계약 시 할인 가능합니다.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    Q. 부적합 판정이 나오면 어떻게 하나요?
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    A. 즉시 투석을 중단하고 수처리시스템 점검, 필터 교체, 배관 소독 등을 실시한 후 재검사를 통해 적합 판정을 받아야 합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 비용 안내 */}
            <div className="bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">💰</span>
                검사 비용 안내
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 주기</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">예상 비용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-900">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">화학적 검사 (중금속 등)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">월 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">60만원 ~ 80만원</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">세균 검사 (일반세균)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">주 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">회당 15만원 ~ 20만원</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-900">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">내독소 검사 (LAL test)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">주 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">회당 10만원 ~ 15만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                ※ 연간 계약 시 할인 가능. 긴급 검사는 추가 비용 발생.
              </p>
            </div>

            {/* 신청서 다운로드 */}
            <div className="bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">📥</span>
                신청서 다운로드
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                혈액투석용수 검사 의뢰서를 다운로드하여 작성 후 제출해주세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/documents/dialysis-water-application.pdf"
                  className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-primary-200 dark:border-primary-800"
                >
                  <span className="font-bold">투석용수 검사 의뢰서</span>
                  <span className="text-2xl">📄</span>
                </a>
                <a
                  href="/documents/dialysis-water-management-guide.pdf"
                  className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all border-2 border-primary-200 dark:border-primary-800"
                >
                  <span className="font-bold">수질관리 가이드</span>
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
                    <span className="ml-2 text-sm text-neutral-500">서울 강남구 ○○병원</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                    "5년째 정기 검사를 의뢰하고 있습니다. 신속한 결과 보고와 전문적인 컨설팅으로 
                    수질관리에 큰 도움이 됩니다."
                  </p>
                  <p className="text-xs text-neutral-500">- 김○○ 투석실 수간호사</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 text-xl">★★★★★</div>
                    <span className="ml-2 text-sm text-neutral-500">충북 청주시 ○○의원</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                    "내독소 검사 결과가 부적합으로 나왔을 때, 원인 분석과 대책을 상세히 안내해주셔서 
                    빠르게 개선할 수 있었습니다."
                  </p>
                  <p className="text-xs text-neutral-500">- 이○○ 원장</p>
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

export default DialysisWater;
