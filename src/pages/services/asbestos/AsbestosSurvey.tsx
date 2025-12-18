const AsbestosSurvey = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">석면 조사 분석</h1>
            <p className="text-lg text-white/90">
              건축물 석면 함유 여부를 정밀하게 조사하고 분석합니다
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">석면 조사 분석</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                석면안전관리법에 따라 건축물의 석면 함유 여부를 정밀 조사하고 분석하는 서비스입니다.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">⚠️ 석면 조사 의무 대상</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 연면적 50㎡ 이상 건축물 해체·제거 시 (2023년부터)</li>
                  <li>• 학교, 어린이집, 의료기관 등 (면적 무관)</li>
                  <li>• 1급 발암물질로 조사 필수</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">조사 대상 자재</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold mb-3 text-primary-700 dark:text-primary-300">주요 조사 대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• 슬레이트 지붕재</li>
                    <li>• 석면 시멘트 벽체, 천장재</li>
                    <li>• 내화 피복재</li>
                    <li>• 단열재</li>
                    <li>• 바닥 타일</li>
                    <li>• 배관 보온재</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold mb-3">분석 방법</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>• <strong>편광현미경법 (PLM):</strong> 석면 종류 및 함량 분석</li>
                    <li>• <strong>위상차현미경법 (PCM):</strong> 섬유 계수</li>
                    <li>• <strong>투과전자현미경법 (TEM):</strong> 미량 석면 분석</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">조사 절차</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">현장 조사</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">건축물 도면 검토 및 석면 의심 자재 파악</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">시료 채취</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">의심 자재별 대표 시료 채취 (균질 구역당 3개 이상)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">실험실 분석</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">편광현미경으로 석면 함유 여부 및 종류, 함량 분석</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-gray-500">
                  <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold">보고서 작성</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">석면 지도 작성, 석면 건축자재 목록, 관리 방안 제시</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">✅ 환경부 지정 석면조사기관</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  한국환경안전연구소는 환경부 지정 석면조사기관으로 정확하고 신뢰할 수 있는 조사 서비스를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsbestosSurvey;
