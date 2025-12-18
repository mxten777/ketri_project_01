const AsbestosConcentration = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 농도 측정</h1>
            <p className="text-lg text-white/90">
              실내 공기 중 석면 섬유 농도를 정밀 측정합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 농도 측정</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                건축물 실내 공기 중 석면 섬유 농도를 측정하여 근로자 및 거주자의 건강을 보호합니다.
              </p>

              <h3 className="text-xl font-bold mb-4">측정 대상</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold mb-3 text-primary-700 dark:text-primary-300">정기 측정 대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 건축자재 사용 건축물</li>
                    <li>• 학교, 어린이집 등 다중이용시설</li>
                    <li>• 석면 관리 대상 사업장</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">수시 측정 대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 해체·제거 작업장</li>
                    <li>• 석면 손상 시설</li>
                    <li>• 석면 노출 의심 현장</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">분석 방법</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">분석 방법</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">적용 대상</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검출한계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        <strong>PCM</strong><br />
                        <span className="text-sm">위상차현미경법</span>
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        작업환경 측정<br />일반 실내 공기질
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        0.01 개/cc
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        <strong>TEM</strong><br />
                        <span className="text-sm">투과전자현미경법</span>
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        학교 등 다중이용시설<br />초미량 석면 분석
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        0.001 개/cc
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">농도 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">기준</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">작업환경 노출기준</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.1 개/cc</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">8시간 TWA</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">다중이용시설</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold">0.01 개/cc</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">학교, 어린이집 등</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 절차</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">측정 계획</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">측정 지점 선정, 측정 시간 결정</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">시료 채취</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">공기 펌프로 일정 시간 공기 포집 (일반적으로 2~8시간)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">현미경 분석</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">필터를 현미경으로 분석하여 석면 섬유 계수</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold">농도 산출</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">공기량과 섬유 개수로 농도 계산 (개/cc)</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 고정밀 분석</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  PCM과 TEM을 모두 보유하여 일반 농도부터 초미량 석면까지 정밀 분석 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsbestosConcentration;
