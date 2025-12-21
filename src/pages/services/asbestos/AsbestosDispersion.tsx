import Button from "../../../components/common/Button";

const AsbestosDispersion = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 비산 측정</h1>
            <p className="text-lg text-white/90">
              석면 해체·제거 작업 시 석면 비산 정도를 측정합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 비산 측정</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                석면 해체·제거 작업 중 석면이 주변으로 비산되는 것을 방지하기 위해 실시간으로 농도를 측정합니다.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">⚠️ 비산 측정 의무</h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  석면 해체·제거 작업 시 작업장 경계 및 주변 지역의 석면 비산 정도를 측정해야 합니다.
                </p>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 시기</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-2">1. 작업 전 (배경농도)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    해체·제거 작업 시작 전 주변 석면 농도를 측정하여 기준값으로 활용
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-2">2. 작업 중 (실시간 모니터링)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    작업 진행 중 실시간으로 석면 비산 정도를 감시하여 기준 초과 시 즉시 작업 중단
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <h4 className="font-bold mb-2">3. 작업 후 (최종 확인)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    작업 완료 후 잔류 석면 확인, 정화 작업 필요 여부 판단
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">측정 위치</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold mb-3 text-primary-700 dark:text-primary-300">작업장 내부</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 해체·제거 작업 지점</li>
                    <li>• 작업자 호흡기 위치</li>
                    <li>• 작업장 경계 (음압실 내부)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">작업장 주변</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 작업장 경계 외부</li>
                    <li>• 주요 통행로</li>
                    <li>• 인근 주거 지역</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">비산 기준</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">측정 위치</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">기준</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">조치사항</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업장 내부</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">
                        0.01 개/cc 이하
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        초과 시 즉시 작업 중단
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업장 외부</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold">
                        배경농도 수준
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-sm">
                        비산 방지 조치 강화
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mb-4">비산 방지 대책</h3>
              <div className="space-y-3 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 밀폐 및 음압 유지</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    작업 구역을 비닐 등으로 완전히 밀폐하고 음압기를 설치하여 석면이 외부로 비산되지 않도록 관리
                  </p>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 습식 작업</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    석면 자재에 물을 충분히 적셔 석면 섬유가 공기 중으로 날리지 않도록 습식으로 작업
                  </p>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 실시간 모니터링</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    연속 모니터링 장비로 실시간 석면 농도를 감시하여 기준 초과 시 즉시 작업 중단
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 실시간 모니터링 서비스</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  작업 중 24시간 실시간 모니터링을 제공하여 석면 비산을 철저히 관리하고 
                  주변 주민의 안전을 보장합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsbestosDispersion;
