import Button from "../../../components/common/Button";

const IndoorIntro = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">업무 소개</h1>
            <p className="text-lg text-white/90">
              실내공기질관리법에 따른 법정 측정으로 쾌적한 실내환경을 조성합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">실내공기질 측정</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                실내공기질관리법에 따라 다중이용시설의 실내공기질을 측정하고 관리하는 서비스입니다.
                국민 건강 보호와 쾌적한 실내환경 조성을 위해 과학적이고 체계적인 측정 서비스를 제공합니다.
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-red-900 dark:text-red-300">
                  ⚠️ 실내공기질 관리의 중요성
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  현대인은 하루의 80~90%를 실내에서 생활합니다. 
                  부적절한 환기와 각종 오염물질로 인해 실내공기질이 실외보다 2~5배 나쁠 수 있습니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 실내공기 오염으로 인한 건강 피해 예방</li>
                  <li>• 법정 의무 대상 시설은 정기 측정 필수</li>
                  <li>• 기준 초과 시 과태료 부과 (최대 300만원)</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">측정 대상 시설</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-300">다중이용시설</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm">
                    <li>• 지하역사, 지하도상가</li>
                    <li>• 철도역사 대합실</li>
                    <li>• 여객터미널 대합실</li>
                    <li>• 항만시설 대합실</li>
                    <li>• 도서관, 박물관, 미술관</li>
                    <li>• 대규모 점포, 백화점</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold text-lg mb-3">공동주택 및 신축건축물</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 100세대 이상 공동주택 (입주 전)</li>
                    <li>• 주택법에 따른 오피스텔</li>
                    <li>• 연면적 3,000㎡ 이상 신축 건축물</li>
                    <li>• 다중이용시설 (500㎡ 이상)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">측정 항목</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">측정 항목</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">유지기준</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-semibold" rowSpan={5}>
                        오염물질
                      </td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">미세먼지 (PM-10)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">100 ㎍/㎥ 이하</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">이산화탄소 (CO₂)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">1,000 ppm 이하</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">폼알데하이드 (HCHO)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">100 ㎍/㎥ 이하</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">총부유세균</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">800 CFU/㎥ 이하</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">일산화탄소 (CO)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">10 ppm 이하</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">측정 서비스 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="font-bold mb-2">법정 측정기관</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    환경부 지정 실내공기질 측정기관
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold mb-2">신속한 측정</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    현장 측정 후 7일 이내 결과 통보
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold mb-2">정밀 분석</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    첨단 장비를 이용한 정확한 측정
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">측정 주기</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시설 구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">측정 주기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">지하역사, 지하도상가, 철도역사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">
                        연 2회 이상
                      </td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">도서관, 박물관, 미술관, 대형점포</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">
                        연 1회 이상
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">공동주택 (신축)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">
                        입주 전 1회
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-green-900 dark:text-green-300">
                  ✅ 전문 컨설팅 서비스
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  측정 결과 기준 초과 시 개선 방안을 제시하고 재측정까지 체계적으로 지원합니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 환기시스템 개선 방안 제시</li>
                  <li>• 오염원 파악 및 제거 방법 안내</li>
                  <li>• 실내공기질 개선 컨설팅</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndoorIntro;
