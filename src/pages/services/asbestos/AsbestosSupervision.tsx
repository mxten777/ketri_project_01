 
const AsbestosSupervision = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 해체 감리</h1>
            <p className="text-lg text-white/90">
              석면 해체·제거 작업 전 과정을 전문적으로 감리합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 해체 감리</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                석면 해체·제거 작업이 관련 법규에 따라 안전하게 진행되도록 전 과정을 감독·관리하는 서비스입니다.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">⚠️ 감리 의무 대상</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 석면 해체·제거 면적 500㎡ 이상 (2024년부터 300㎡로 강화)</li>
                  <li>• 학교, 유치원, 어린이집 등 (면적 무관)</li>
                  <li>• 의료기관, 노인요양시설 등</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">감리 업무 내용</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    작업 계획 검토
                  </h4>
                  <ul className="ml-9 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 석면 해체·제거 계획서 검토</li>
                    <li>• 작업 방법 및 안전조치 적정성 확인</li>
                    <li>• 작업자 보호구 및 장비 확인</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    사전 준비 단계 감리
                  </h4>
                  <ul className="ml-9 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 작업 구역 밀폐 상태 확인</li>
                    <li>• 음압 시설 설치 및 작동 확인</li>
                    <li>• 경고 표지 설치 확인</li>
                    <li>• 배경농도 측정 입회</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    작업 중 감리
                  </h4>
                  <ul className="ml-9 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 습식 작업 준수 여부 확인</li>
                    <li>• 작업자 보호구 착용 상태 확인</li>
                    <li>• 실시간 석면 농도 모니터링</li>
                    <li>• 폐기물 처리 과정 감독</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                    작업 완료 후 감리
                  </h4>
                  <ul className="ml-9 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 잔재물 제거 확인</li>
                    <li>• 청소 및 정화 작업 확인</li>
                    <li>• 최종 석면 농도 측정 입회</li>
                    <li>• 작업 완료 확인서 발급</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">감리 보고서</h3>
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mb-8">
                <h4 className="font-bold mb-3 text-primary-900 dark:text-primary-300">보고서 포함 내용</h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>• 일일 감리 일지</li>
                  <li>• 작업 전·중·후 사진 자료</li>
                  <li>• 석면 농도 측정 결과</li>
                  <li>• 시정 조치 사항 및 결과</li>
                  <li>• 최종 작업 완료 확인서</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">감리 주기</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업 규모</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">감리 주기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">500㎡ 미만</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">주 1회 이상</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">500~1,000㎡</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">주 2회 이상</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">1,000㎡ 이상</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">상주 감리</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 전문 감리 서비스</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  환경부 지정 석면조사기관의 전문 감리원이 작업 전 과정을 철저히 감독하여 
                  안전한 석면 해체·제거를 보장합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsbestosSupervision;
