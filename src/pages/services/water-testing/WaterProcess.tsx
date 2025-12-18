const WaterProcess = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 신청 절차</h1>
            <p className="text-lg text-white/90">
              수질검사 신청부터 결과 수령까지 전 과정을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">검사 신청 절차</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">검사 신청</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        전화, 팩스, 이메일 또는 온라인을 통해 검사를 신청합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">필요 정보</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 시설명 및 소재지</li>
                          <li>• 시설 유형 (급수시설, 샘물, 공동시설 등)</li>
                          <li>• 희망 검사 항목 (간이/일반/전항목)</li>
                          <li>• 담당자 연락처</li>
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
                      <h3 className="font-bold text-lg mb-2">방문 일정 협의</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        시료 채취를 위한 현장 방문 일정을 조율합니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">방문 전 준비사항</h4>
                          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• 수도꼭지 사전 세척</li>
                            <li>• 저수조 청소일자 확인</li>
                            <li>• 채수 위치 파악</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg border border-neutral-300 dark:border-neutral-600">
                          <h4 className="font-semibold text-sm mb-2">소요 시간</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            일반적으로 30분~1시간 소요<br />
                            (시설 규모에 따라 상이)
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
                      <h3 className="font-bold text-lg mb-2">시료 채취</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        전문 채수요원이 현장을 방문하여 시료를 채취합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">채취 절차</h4>
                        <ol className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                          <li>채수 지점 확인 및 기록</li>
                          <li>수도꼭지 소독 후 3~5분간 방류</li>
                          <li>멸균 용기에 시료 채취</li>
                          <li>현장 측정 항목 측정 (pH, 온도, 잔류염소 등)</li>
                          <li>시료 보냉 및 실험실 이송 (4시간 이내)</li>
                        </ol>
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
                        KOLAS 인증 실험실에서 정밀 분석을 실시합니다.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-600 text-white">
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사 항목</th>
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">소요 기간</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-neutral-50 dark:bg-neutral-700">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">미생물</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3~5일</td>
                            </tr>
                            <tr className="bg-white dark:bg-neutral-800">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">간이검사</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">5~7일</td>
                            </tr>
                            <tr className="bg-neutral-50 dark:bg-neutral-700">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">일반검사</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">7~10일</td>
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
                        시험성적서를 발급하고 결과를 안내해 드립니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">📧</div>
                          <h4 className="font-semibold text-sm mb-1">이메일</h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            PDF 파일 전송
                          </p>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">📠</div>
                          <h4 className="font-semibold text-sm mb-1">팩스</h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            즉시 전송
                          </p>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">📮</div>
                          <h4 className="font-semibold text-sm mb-1">우편</h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            원본 발송
                          </p>
                        </div>
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
                        부적합 판정 시 개선 방안을 안내하고 재검사를 지원합니다.
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-300">부적합 시 조치사항</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 원인 분석 및 개선 방안 제시</li>
                          <li>• 수질 개선 조치 후 재검사 (1회 무료)</li>
                          <li>• 관할 지자체 신고 안내</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mt-8">
                <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">
                  📞 검사 신청 및 문의
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
                      Email: water@ketri.co.kr
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

export default WaterProcess;
