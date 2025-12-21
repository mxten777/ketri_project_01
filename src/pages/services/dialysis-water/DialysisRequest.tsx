import Button from "../../../components/common/Button";

const DialysisRequest = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 의뢰 절차</h1>
            <p className="text-lg text-white/90">
              혈액투석용수 수질검사 의뢰부터 결과 수령까지의 전 과정을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">검사 의뢰 절차</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">검사 신청</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        전화, 팩스, 이메일 또는 온라인으로 검사를 신청합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">필요 정보</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• 병원명 및 투석실 소재지</li>
                          <li>• 투석기계 대수 및 제조사</li>
                          <li>• 정수시스템 종류 (R.O 여부)</li>
                          <li>• 검사 항목 (화학적/미생물학적)</li>
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
                      <h3 className="font-bold text-lg mb-2">채수 용기 발송</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        검사 신청 후 멸균된 채수 용기와 채수 설명서를 발송해 드립니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">화학적 검사용</h4>
                          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• 1L 플라스틱 용기</li>
                            <li>• 보냉백 포함</li>
                          </ul>
                        </div>
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">미생물 검사용</h4>
                          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>• 멸균 용기 (120mL)</li>
                            <li>• 아이스팩 동봉</li>
                          </ul>
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
                        동봉된 채수 설명서에 따라 시료를 채취합니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-3">
                        <h4 className="font-semibold text-sm mb-2">채수 시 주의사항</h4>
                        <ol className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                          <li>투석 직전 또는 투석 중 채취</li>
                          <li>투석기 혈액회로 연결 전 채취</li>
                          <li>수도꼭지를 알코올 솜으로 소독 후 채취</li>
                          <li>5분 이상 방류 후 채취</li>
                          <li>용기 입구가 오염되지 않도록 주의</li>
                        </ol>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-4">
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-300">⚠️ 중요</h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          미생물 검사 시료는 반드시 냉장(4℃) 상태로 24시간 이내 실험실에 도착해야 합니다.
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
                      <h3 className="font-bold text-lg mb-2">시료 발송</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        채취한 시료를 실험실로 발송합니다.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg border border-neutral-300 dark:border-neutral-600">
                          <h4 className="font-semibold text-sm mb-2">방문 수거</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            수도권 지역: 전문 채수요원 방문<br />
                            (예약 필요)
                          </p>
                        </div>
                        <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg border border-neutral-300 dark:border-neutral-600">
                          <h4 className="font-semibold text-sm mb-2">택배 발송</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            전국: 택배 이용 가능<br />
                            (아이스팩과 함께 보냉 포장)
                          </p>
                        </div>
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
                      <h3 className="font-bold text-lg mb-2">실험실 분석</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        첨단 분석장비로 정밀 분석을 실시합니다.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-600 text-white">
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사 종류</th>
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석 방법</th>
                              <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">소요 기간</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white dark:bg-neutral-800">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">화학적 검사</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">ICP-MS, IC</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">5~7일</td>
                            </tr>
                            <tr className="bg-neutral-50 dark:bg-neutral-700">
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">미생물 검사</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">배양법, LAL</td>
                              <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">7~10일</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border-l-4 border-gray-500 dark:border-gray-400">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-600 dark:bg-gray-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">결과 통보</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mb-3">
                        시험성적서를 발급하고 결과를 안내해 드립니다.
                      </p>
                      <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                        <h4 className="font-semibold text-sm mb-2 text-neutral-900 dark:text-white">시험성적서 포함 내용</h4>
                        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-200">
                          <li>• 각 항목별 측정값 및 기준치</li>
                          <li>• 적합/부적합 판정</li>
                          <li>• 부적합 시 초과 항목 및 배수 표시</li>
                          <li>• 개선 방안 제시 (부적합 시)</li>
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
                      Email: dialysis@ketri.co.kr
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

export default DialysisRequest;
