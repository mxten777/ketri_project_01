const IndoorRequest = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">측정 요청</h1>
            <p className="text-lg text-white/90">
              실내공기질 측정 신청부터 결과 수령까지의 전 과정을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">측정 신청 절차</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">측정 신청</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        전화, 팩스, 이메일 또는 온라인으로 측정을 신청합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">필요 정보</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 시설명 및 주소</li>
                          <li>• 시설 유형 (지하역사, 도서관, 대형점포 등)</li>
                          <li>• 측정 면적 (㎡)</li>
                          <li>• 측정 항목 (전체/일부 선택)</li>
                          <li>• 담당자 연락처</li>
                          <li>• 희망 측정 일자</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">측정 계획 수립</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        시설 규모와 특성에 따라 측정 지점과 방법을 결정합니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">측정 지점 선정</h4>
                          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• 1,000㎡당 1개소 이상</li>
                            <li>• 주요 이용 구역 포함</li>
                            <li>• 오염원 주변 고려</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg border border-neutral-300 dark:border-neutral-600">
                          <h4 className="font-semibold text-sm mb-2">측정 시간</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            시설 운영 중 측정<br />
                            (이용자가 가장 많은 시간대)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">현장 측정</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        전문 측정요원이 현장을 방문하여 측정을 실시합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-3">
                        <h4 className="font-semibold text-sm mb-2">측정 방법</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold text-xs mb-1">실시간 측정 항목</p>
                            <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                              <li>• CO₂, CO, PM-10</li>
                              <li>• 온도, 습도</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-xs mb-1">시료 채취 항목</p>
                            <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                              <li>• 폼알데하이드 (HCHO)</li>
                              <li>• 총부유세균</li>
                              <li>• VOCs (선택)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-300">소요 시간</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          측정 지점당 약 30분~1시간<br />
                          (시설 규모에 따라 반나절~1일 소요)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">실험실 분석</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        시료 채취 항목은 실험실에서 정밀 분석을 실시합니다.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-600 text-white">
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석 항목</th>
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석 방법</th>
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">소요 기간</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white dark:bg-neutral-800">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">폼알데하이드</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">HPLC 분석</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3~5일</td>
                            </tr>
                            <tr className="bg-neutral-50 dark:bg-neutral-700">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">총부유세균</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">배양법</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">5~7일</td>
                            </tr>
                            <tr className="bg-white dark:bg-neutral-800">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">VOCs</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">GC/MS 분석</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">5~7일</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">결과 통보</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        측정 결과서를 발급하고 결과를 안내해 드립니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">측정 결과서 포함 내용</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 측정 지점별 상세 결과</li>
                          <li>• 법적 기준 대비 적합/부적합 판정</li>
                          <li>• 측정 당시 환경 조건 (온도, 습도 등)</li>
                          <li>• 부적합 시 개선 권고사항</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">사후관리</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        부적합 판정 시 개선 방안을 제시하고 재측정을 지원합니다.
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-300">부적합 시 조치사항</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 오염원 파악 및 제거 방법 안내</li>
                          <li>• 환기시스템 개선 방안 제시</li>
                          <li>• 개선 후 재측정 실시</li>
                          <li>• 시설 개선 컨설팅 지원</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">측정 비용</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">측정 항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">측정 방법</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">비용 (지점당)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">기본 5개 항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        PM-10, CO₂, CO, HCHO, 총부유세균
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        150,000원~
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">선택 항목 추가</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        VOCs, 라돈, 석면 등
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        별도 문의
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                  💡 측정 비용 안내
                </h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 시설 규모와 측정 지점 수에 따라 비용이 달라질 수 있습니다</li>
                  <li>• 정기 측정 계약 시 할인 혜택 제공</li>
                  <li>• 다수 시설 동시 의뢰 시 할인 가능</li>
                </ul>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">
                  📞 측정 신청 및 문의
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">전화 문의</h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-1">
                      Tel: 02-1234-5678
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      평일 09:00~18:00
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">온라인 문의</h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-1">
                      Email: indoor@ketri.co.kr
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      24시간 접수 가능
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndoorRequest;
