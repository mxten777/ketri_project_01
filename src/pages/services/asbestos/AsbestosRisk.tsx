import Button from "../../../components/common/Button";

const AsbestosRisk = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 위해성 평가</h1>
            <p className="text-lg text-white/90">
              건축물 내 석면의 위해 정도를 과학적으로 평가합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 위해성 평가</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                건축물에 남아있는 석면 건축자재의 손상 정도와 노출 가능성을 평가하여 
                관리 우선순위와 적절한 조치 방법을 제시합니다.
              </p>

              <h3 className="text-xl font-bold mb-4">평가 목적</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold mb-3 text-primary-700 dark:text-primary-300">효율적 관리</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    석면 건축자재의 위해 정도에 따라 우선순위를 정하여 
                    제한된 예산으로 효율적인 석면 관리 가능
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">안전 확보</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    위해도가 높은 석면 자재를 우선적으로 제거하여 
                    건물 이용자의 안전을 확보
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">평가 항목</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">1. 물리적 상태 평가</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• <strong>손상 정도:</strong> 석면 자재의 파손, 균열, 탈락 정도</li>
                    <li>• <strong>결합력:</strong> 석면 섬유의 결합 상태 (분무재 &gt; 보온재 &gt; 시멘트판)</li>
                    <li>• <strong>접근성:</strong> 사람의 접촉 가능성</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">2. 노출 가능성 평가</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• <strong>활동 수준:</strong> 해당 구역의 이용 빈도</li>
                    <li>• <strong>이용자 수:</strong> 노출 대상 인원</li>
                    <li>• <strong>환기 상태:</strong> 공기 순환 정도</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <h4 className="font-bold mb-3">3. 석면 종류 및 함량</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• <strong>석면 종류:</strong> 백석면 &lt; 갈석면 &lt; 청석면 (독성 순)</li>
                    <li>• <strong>함량:</strong> 석면 함유율</li>
                    <li>• <strong>양:</strong> 석면 자재의 총량</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">위해성 등급</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">등급</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">위해도</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">권장 조치</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-red-600">A</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">매우 높음</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        즉시 제거 또는 사용 중단
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-orange-600">B</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">높음</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        1년 이내 제거 권장, 정기 점검 강화
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-yellow-600">C</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">보통</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        밀봉 또는 피복, 연 1회 점검
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">D</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">낮음</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        현 상태 유지, 정기 점검
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">평가 결과 활용</h3>
              <div className="space-y-3 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 석면 관리 계획 수립</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    위해도 등급에 따라 제거, 밀봉, 피복 등 적절한 관리 방안 선택
                  </p>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 예산 편성</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    우선순위에 따른 단계별 예산 계획 수립
                  </p>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 정기 점검 계획</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    위해도에 따른 점검 주기 설정 (고위해: 분기 1회, 저위해: 연 1회)
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">💡 학교 석면 관리</h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  학교의 경우 위해성 평가 결과를 바탕으로 "석면 안전관리 인증"을 받을 수 있으며,
                  학부모와 학생들에게 안전한 교육 환경임을 보여줄 수 있습니다.
                </p>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 과학적 평가 시스템</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  EPA(미국 환경보호청) 및 HSE(영국 산업안전보건청) 평가 기준을 적용하여 
                  객관적이고 과학적인 위해성 평가를 실시합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsbestosRisk;
