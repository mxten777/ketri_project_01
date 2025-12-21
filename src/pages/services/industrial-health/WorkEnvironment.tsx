import Button from "../../../components/common/Button";

const WorkEnvironment = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              작업환경측정
            </h1>
            <p className="text-lg text-white/90">
              산업안전보건법에 따른 작업환경측정으로 근로자의 건강을 보호하고
              쾌적한 작업환경을 조성합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="card p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-6">작업환경측정이란?</h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                    작업환경측정은 작업장에서 근로자가 노출되는 유해인자의 농도나
                    강도를 측정하여 근로자의 건강 보호 및 쾌적한 작업환경 조성을
                    위한 산업보건관리의 기본이 되는 제도입니다.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">측정 대상</h3>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-6">
                    <ul className="space-y-2">
                      <li>
                        <strong>• 화학적 인자:</strong> 유기화합물, 금속류, 산 및
                        알칼리류, 가스류 등 190종
                      </li>
                      <li>
                        <strong>• 물리적 인자:</strong> 소음, 진동, 고열, 이상기압,
                        방사선 등
                      </li>
                      <li>
                        <strong>• 분진:</strong> 광물성 분진, 곡물 분진, 면 분진,
                        나무 분진 등
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-4">측정 주기</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary-600 text-white">
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                            측정 대상
                          </th>
                          <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                            측정 주기
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                            특별관리물질 (발암성물질 등)
                          </td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                            6개월마다 1회 이상
                          </td>
                        </tr>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                            일반 유해인자
                          </td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                            6개월마다 1회 이상
                          </td>
                        </tr>
                        <tr className="bg-white dark:bg-neutral-800">
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                            소음 (85dB 이상)
                          </td>
                          <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-primary-600">
                            6개월마다 1회 이상
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-4">측정 절차</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                        1
                      </div>
                      <h4 className="font-bold mb-2">측정 계획 수립</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        대상 유해인자 파악 및 측정 계획 수립
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                        2
                      </div>
                      <h4 className="font-bold mb-2">현장 측정</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        측정 전문가가 현장 방문하여 시료 채취
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                        3
                      </div>
                      <h4 className="font-bold mb-2">정밀 분석</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        KOLAS 인증 실험실에서 정밀 분석
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                        4
                      </div>
                      <h4 className="font-bold mb-2">결과 통보</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        측정 결과 및 개선 방안 제시
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mt-8">
                    <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                      ✅ KOLAS 인증 측정기관
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      한국환경안전연구소는 KOLAS 인증 작업환경측정기관으로
                      정확하고 신뢰할 수 있는 측정 서비스를 제공합니다.
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

export default WorkEnvironment;
