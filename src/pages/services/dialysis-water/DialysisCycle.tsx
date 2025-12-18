const DialysisCycle = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 주기 및 기준</h1>
            <p className="text-lg text-white/90">
              혈액투석용수의 정기 검사 주기와 수질 기준을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">검사 주기</h2>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 주기</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        화학적 오염물질 (전항목)
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        1년 1회 이상
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        대한신장학회 권장사항
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        미생물 (일반세균)
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        3개월 1회 이상
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        필수 검사
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        내독소 (Endotoxin)
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        3개월 1회 이상
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        필수 검사
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        알루미늄 (Al)
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        6개월 1회 이상
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        중요 관리 항목
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                  ⚠️ 검사 주기 권장사항
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-2">
                  대한신장학회 혈액투석 적정성 평가 기준에 따라 정기적인 수질검사를 실시해야 합니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 신규 투석실: 가동 전 전항목 검사 필수</li>
                  <li>• 정수장치 교체 후: 재검사 필요</li>
                  <li>• 부적합 판정 시: 개선 후 즉시 재검사</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">수질 기준</h2>
              
              <h3 className="text-xl font-bold mb-4">화학적 오염물질 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">기준치</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">참고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">칼슘 (Ca)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">2 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 100 mg/L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">마그네슘 (Mg)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">2 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 50 mg/L</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">나트륨 (Na)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">50 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 200 mg/L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">칼륨 (K)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">2 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">-</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">불소 (F)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.2 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 1.5 mg/L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">염소 (Cl)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.5 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">잔류염소 제거 필수</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">질산염 (NO3)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">2 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 44.3 mg/L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">황산염 (SO4)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">50 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반 먹는물: 200 mg/L</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">중금속 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">기준치</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">독성</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">알루미늄 (Al)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.01 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">치매, 골질환</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">구리 (Cu)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.1 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">용혈, 간손상</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">아연 (Zn)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.1 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">빈혈, 구토</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">비소 (As)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.005 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">발암성, 신경독성</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">납 (Pb)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.005 mg/L 이하</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">빈혈, 신경독성</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">미생물학적 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">투석액 종류</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">일반세균</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">내독소</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        표준 투석액
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        100 CFU/mL 이하
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        0.25 EU/mL 이하
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        초순수 투석액<br />
                        <span className="text-sm font-normal">(Ultra-pure)</span>
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        0.1 CFU/mL 이하
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        0.03 EU/mL 이하
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  💡 수질 기준의 의미
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  투석용수의 수질 기준은 일반 먹는물보다 10~100배 이상 엄격합니다. 
                  투석 환자는 일주일에 약 300~450리터의 물이 직접 혈액과 접촉하므로 
                  미량의 오염물질도 축적되어 심각한 건강 문제를 일으킬 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DialysisCycle;
