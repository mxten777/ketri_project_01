const DialysisStandard = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              수질 기준 및 분석방법
            </h1>
            <p className="text-lg text-white/90">
              혈액투석용수의 상세한 수질 기준과 분석 방법을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">분석 방법</h2>
              
              <h3 className="text-xl font-bold mb-4">화학적 분석</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석 항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석 방법</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">장비</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검출한계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">중금속 (Al, Cu, Zn, Pb, As 등)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">ICP-MS</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">유도결합플라즈마 질량분석기</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">0.001 mg/L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">이온 (Ca, Mg, Na, K, Cl, SO4 등)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">IC</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">이온크로마토그래피</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">0.01 mg/L</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">불소 (F)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">IC 또는 ISE</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">이온선택성 전극법</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">0.01 mg/L</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">미생물학적 분석</h3>
              <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold text-lg mb-3">일반세균 검사</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-2">분석 방법: 평판배양법</p>
                      <ol className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                        <li>시료 1mL를 R2A 한천배지에 접종</li>
                        <li>22~28°C에서 5~7일간 배양</li>
                        <li>콜로니 계수 (CFU/mL)</li>
                      </ol>
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                      <p className="font-semibold text-sm mb-1">판정 기준</p>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 표준 투석액: 100 CFU/mL 이하</li>
                        <li>• 초순수 투석액: 0.1 CFU/mL 이하</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold text-lg mb-3">내독소 검사 (Endotoxin)</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-2">분석 방법: LAL (Limulus Amebocyte Lysate) 시험</p>
                      <ol className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                        <li>시료와 LAL 시약 혼합</li>
                        <li>37°C에서 10분간 반응</li>
                        <li>발색 반응 측정 (흡광도법)</li>
                      </ol>
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                      <p className="font-semibold text-sm mb-1">판정 기준</p>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 표준 투석액: 0.25 EU/mL 이하</li>
                        <li>• 초순수 투석액: 0.03 EU/mL 이하</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">품질 관리</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">
                    내부 정도관리 (IQC)
                  </h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 표준물질을 이용한 일일 정도관리</li>
                    <li>• 검량선 작성 및 검증</li>
                    <li>• 바탕시험 및 회수율 시험</li>
                    <li>• 정도관리도 작성 및 관리</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h3 className="font-bold text-lg mb-3">외부 정도관리 (EQC)</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 환경부 숙련도 시험 참여</li>
                    <li>• 대한신장학회 정도관리 참여</li>
                    <li>• KOLAS 인증 유지 관리</li>
                    <li>• 분기별 외부 검증 실시</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">장비 교정 및 유지관리</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">장비명</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">교정 주기</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">유지관리 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">ICP-MS</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일일 감도 점검, 주간 청소</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">IC</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">컬럼 교체, 펌프 점검</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">전자저울</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6개월 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">표준분동 교정</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">배양기</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6개월 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">온도 센서 교정</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  ✅ KOLAS 인증 시험기관
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  한국환경안전연구소는 한국인정기구(KOLAS)로부터 인정받은 시험기관으로 
                  국제 기준(ISO/IEC 17025)에 따라 운영되고 있습니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 인정 분야: 혈액투석용수 화학적/미생물학적 분석</li>
                  <li>• 정기 사후심사: 연 1회</li>
                  <li>• 숙련도 시험: 분기 1회 참여</li>
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                  📋 참고 기준
                </h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 대한신장학회 "혈액투석 적정성 평가 지침"</li>
                  <li>• AAMI (Association for the Advancement of Medical Instrumentation) Standards</li>
                  <li>• ISO 11663: Quality of dialysis fluid</li>
                  <li>• European Pharmacopoeia: Water for diluting haemodialysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DialysisStandard;
