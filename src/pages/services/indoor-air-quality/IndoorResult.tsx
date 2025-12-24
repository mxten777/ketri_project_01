 
const IndoorResult = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">성적서 조회</h1>
            <p className="text-lg text-white/90">
              실내공기질 측정 결과를 온라인으로 조회하고 다운로드할 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card p-8 card-tokenized">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-6">온라인 성적서 조회</h2>
                  
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mb-8">
                    <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">
                      조회 방법
                    </h3>
                    <ol className="space-y-2 text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                      <li>측정 결과서에 기재된 고유번호 준비</li>
                      <li>우측 조회 양식에 정보 입력</li>
                      <li>인증 후 결과 확인</li>
                      <li>PDF 다운로드 또는 출력</li>
                    </ol>
                  </div>

                  <h3 className="text-xl font-bold mb-4">측정 결과서 내용</h3>
                  <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                      <h4 className="font-bold mb-3">1. 시설 정보</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 시설명 및 소재지</li>
                        <li>• 시설 유형 및 용도</li>
                        <li>• 측정 의뢰자 정보</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                      <h4 className="font-bold mb-3">2. 측정 개요</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 측정 일시 및 장소</li>
                        <li>• 측정 지점 및 개소 수</li>
                        <li>• 기상 조건 (온도, 습도)</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                      <h4 className="font-bold mb-3">3. 측정 결과</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 항목별 측정값</li>
                        <li>• 법적 기준치</li>
                        <li>• 적합/부적합 판정</li>
                        <li>• 초과 배수 표시 (부적합 시)</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                      <h4 className="font-bold mb-3">4. 개선 권고사항</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 부적합 항목 원인 분석</li>
                        <li>• 구체적 개선 방안</li>
                        <li>• 재측정 일정 안내</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4">결과서 해석 가이드</h3>
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-primary-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">항목</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">유지기준</th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">평가</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">PM-10</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">100 ㎍/㎥</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-xs">
                            호흡기 질환, 환기 부족 시 초과
                          </td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">CO₂</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1,000 ppm</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-xs">
                            환기 지표, 초과 시 졸음/집중력 저하
                          </td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">HCHO</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">100 ㎍/㎥</td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-xs">
                            신축/리모델링 시 높음, 발암물질
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-neutral-100 dark:bg-neutral-800/50 border-l-4 border-primary-500 p-6 mb-8">
                    <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                      ⚠️ 법적 의무사항
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-200 text-sm mb-2">
                      다중이용시설은 측정 결과를 이용자가 잘 볼 수 있는 장소에 게시해야 합니다.
                    </p>
                    <ul className="space-y-1 text-neutral-700 dark:text-neutral-200 text-sm">
                      <li>• 게시 기한: 측정 후 30일 이내</li>
                      <li>• 게시 위치: 주출입구 또는 게시판</li>
                      <li>• 게시 내용: 측정 결과 요약본</li>
                      <li>• 미게시 시: 100만원 이하 과태료</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold mb-4">재발급 신청</h3>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                      측정 결과서 분실 시 재발급이 가능합니다.
                    </p>
                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <li>
                        <strong>재발급 수수료:</strong> 10,000원 (우편 발송 시 배송비 별도)
                      </li>
                      <li>
                        <strong>신청 방법:</strong> 전화 또는 이메일로 신청
                      </li>
                      <li>
                        <strong>필요 정보:</strong> 시설명, 측정 일자, 의뢰자 정보
                      </li>
                      <li>
                        <strong>발급 기간:</strong> 신청 후 2~3일
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-32 card-tokenized">
                <h3 className="text-xl font-bold mb-4">성적서 조회</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      고유번호
                    </label>
                    <input
                      type="text"
                      placeholder="예: IAQ-2024-0001"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      시설명
                    </label>
                    <input
                      type="text"
                      placeholder="시설명 입력"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      측정 일자
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    조회하기
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-bold mb-3">조회 문의</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">전화</p>
                      <p className="font-semibold">02-1234-5678</p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">이메일</p>
                      <p className="font-semibold">indoor@ketri.co.kr</p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">운영시간</p>
                      <p className="font-semibold">평일 09:00~18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IndoorResult;
