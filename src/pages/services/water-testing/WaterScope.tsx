import Button from "../../../components/common/Button";

const WaterScope = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 대상 및 범위</h1>
            <p className="text-lg text-white/90">
              다양한 먹는물 공급시설의 수질검사 대상과 범위를 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">검사 대상 시설</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">1. 소규모 급수시설</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">대상 시설</h4>
                      <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                        <li>• 지하수를 수원으로 하는 시설</li>
                        <li>• 1일 공급 능력 100톤 미만</li>
                        <li>• 급수인구 500명 미만</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">검사 항목</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        간이검사 16개 항목 또는<br />
                        일반검사 45개 항목
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h3 className="text-xl font-bold mb-4">2. 먹는샘물 제조시설</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">대상 시설</h4>
                      <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                        <li>• 먹는샘물 제조업체</li>
                        <li>• 먹는염지하수 제조업체</li>
                        <li>• 먹는해양심층수 제조업체</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">검사 항목</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        원수 및 제품수<br />
                        60개 항목 (용기류 포함)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">3. 먹는물 공동시설</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">대상 시설</h4>
                      <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                        <li>• 약수터</li>
                        <li>• 샘터</li>
                        <li>• 우물 등 공동시설</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">검사 항목</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        미생물 6개 항목<br />
                        일반항목 13개 항목
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">4. 다중이용시설</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">대상 시설</h4>
                      <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                        <li>• 학교, 병원, 관공서</li>
                        <li>• 대형건물, 아파트</li>
                        <li>• 숙박업소, 목욕장</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">검사 항목</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        간이검사 16개 항목 또는<br />
                        일반검사 45개 항목
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">검사 항목별 범위</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">검사 구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">항목 수</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">주요 항목</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">미생물</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">6개</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        일반세균, 총대장균군, 대장균, 녹농균 등
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">건강상 유해영향 무기물질</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">13개</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        납, 비소, 세레늄, 수은, 시안, 크롬 등
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">건강상 유해영향 유기물질</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">17개</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        페놀, 다이아지논, 파라티온, 카바릴 등
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">소독제 및 소독부산물</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">11개</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        잔류염소, 총트리할로메탄, 클로로포름 등
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold">심미적 영향물질</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">13개</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                        경도, 과망간산칼륨소비량, 냄새, 맛, 색도 등
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  💡 맞춤형 검사 항목 선택
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  시설 특성과 수원의 종류, 용도에 따라 적절한 검사 항목을 선택하실 수 있습니다. 
                  전문가와 상담하여 최적의 검사 항목을 선정해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterScope;
