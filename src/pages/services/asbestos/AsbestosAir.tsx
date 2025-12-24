 
const AsbestosAir = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section data-has-hero className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              석면 건축물 공기질 측정
            </h1>
            <p className="text-lg text-white/90">
              석면 건축자재가 있는 건물의 실내 공기질을 정기적으로 측정합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 건축물 공기질 측정</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                석면 건축자재가 사용된 건축물의 실내 공기 중 석면 섬유 농도를 정기적으로 측정하여 
                건물 이용자의 안전을 확인하고 관리하는 서비스입니다.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">⚠️ 측정 의무 대상</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 석면 건축자재가 사용된 학교 및 어린이집 (연 1회 이상)</li>
                  <li>• 석면 관리 대상 공공기관 건축물</li>
                  <li>• 석면 건축자재 손상 시설</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 대상 건축물</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold mb-3 text-primary-700 dark:text-primary-300">필수 측정 대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 건축자재 사용 학교</li>
                    <li>• 어린이집, 유치원</li>
                    <li>• 국공립 의료기관</li>
                    <li>• 연면적 500㎡ 이상 공공건축물</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">권장 측정 대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 노후 건축물 (준공 30년 이상)</li>
                    <li>• 석면 자재 손상 건물</li>
                    <li>• 리모델링 예정 건물</li>
                    <li>• 다중이용시설</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 위치 선정</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">기본 측정 위치</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 건축자재가 사용된 주요 공간 (교실, 강당, 사무실 등)</li>
                    <li>• 이용 빈도가 높은 공간</li>
                    <li>• 석면 자재 손상이 의심되는 구역</li>
                  </ul>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">측정 지점 수</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    • 학교: 건물당 최소 3개소 (교실 2, 강당 1)<br />
                    • 일반 건축물: 1,000㎡당 1개소 이상
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 방법 및 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">분석 방법</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">기준</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">채취 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        <strong>PCM</strong> (위상차현미경법)
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">
                        0.01 개/cc 이하
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        4시간 이상
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 절차</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">현장 조사</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      석면 건축자재 위치 파악, 측정 지점 선정
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">시료 채취</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      공기 펌프로 4시간 이상 공기 중 섬유 포집
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">실험실 분석</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      위상차현미경으로 석면 섬유 계수 및 농도 산출
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-900 p-4 rounded-lg border-l-4 border-gray-500 dark:border-gray-400">
                  <div className="w-8 h-8 bg-gray-600 dark:bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">결과 통보</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      측정 결과서 발급, 기준 초과 시 개선 방안 제시
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">기준 초과 시 조치</h3>
              <div className="space-y-3 mb-8">
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">1단계: 원인 파악</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    석면 자재 손상 여부 확인, 환기 상태 점검
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">2단계: 긴급 조치</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    해당 구역 사용 제한, 환기 강화, 손상 부위 응급 처치
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">3단계: 개선 조치</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    석면 제거, 밀봉, 피복 등 적절한 조치 실시
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4단계: 재측정</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    개선 조치 완료 후 공기질 재측정으로 안전 확인
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  💡 학교 석면 농도 측정
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  학교는 교육부 지침에 따라 연 1회 이상 석면 농도를 측정하고 그 결과를 학부모에게 공개해야 합니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 측정 시기: 학기 중 (학생 재학 시)</li>
                  <li>• 결과 공개: 학교 홈페이지 게시</li>
                  <li>• 기준 초과 시: 교육청 보고 및 즉시 조치</li>
                </ul>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 정기 측정 관리 서비스</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  연간 정기 측정 계약을 통해 측정 일정 관리, 결과 분석, 개선 방안 제시 등 
                  석면 건축물의 체계적인 공기질 관리를 지원합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AsbestosAir;
