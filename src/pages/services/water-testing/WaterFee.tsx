 
const WaterFee = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 주기 및 수수료</h1>
            <p className="text-lg text-white/90">
              시설 유형별 수질검사 주기와 검사 수수료를 안내합니다
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
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">시설 구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 유형</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 주기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold" rowSpan={2}>
                        소규모 급수시설
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">간이검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        6개월마다 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">일반검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        1년마다 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold" rowSpan={2}>
                        먹는샘물 제조시설
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">원수검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        1년마다 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">제품수검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        월 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        먹는물 공동시설
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">간이검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        1년마다 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        다중이용시설
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">간이검사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        6개월마다 1회 이상
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2">⚠️ 검사 주기 준수 의무</h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  먹는물관리법 제43조에 따라 정기적인 수질검사를 실시하지 않을 경우 
                  500만원 이하의 과태료가 부과될 수 있습니다.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">검사 수수료</h2>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 종류</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">항목 수</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 비용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        미생물 검사
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        6개 항목
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        80,000원~
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        간이검사
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        16개 항목
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        150,000원~
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        일반검사
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        45개 항목
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        350,000원~
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        먹는샘물 전항목
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        60개 항목
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        450,000원~
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">
                        개별 항목 추가
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                        항목당
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                        10,000원~
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">
                    💰 할인 혜택
                  </h3>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• 연간 계약 시: 10~15% 할인</li>
                    <li>• 다수 시설 동시 의뢰: 5~10% 할인</li>
                    <li>• 정기 검사 계약: 특별 할인</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h3 className="font-bold text-lg mb-3">📋 포함 사항</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 시료 채취 (현장 방문)</li>
                    <li>• 실험실 정밀 분석</li>
                    <li>• 시험성적서 발급</li>
                    <li>• 부적합 시 재검사 1회 무료</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  📞 견적 문의
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                  시설 규모와 검사 항목에 따라 비용이 달라질 수 있습니다. 
                  정확한 견적은 전화 또는 온라인 문의를 통해 안내해 드립니다.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">전화:</span>
                    <span className="ml-2 font-bold">02-1234-5678</span>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">이메일:</span>
                    <span className="ml-2 font-bold">water@ketri.co.kr</span>
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

export default WaterFee;
