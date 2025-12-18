const ChemicalManagement = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              화학물질관리
            </h1>
            <p className="text-lg text-white/90">
              산업안전보건법 및 화학물질관리법에 따른 화학물질 취급시설의 체계적인 관리로 안전한 작업환경을 조성합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">화학물질관리란?</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                산업현장에서 사용되는 화학물질로 인한 건강장해 및 화재·폭발 등의 사고를 예방하기 위하여 
                화학물질의 유해성·위험성을 파악하고 적절한 관리방안을 마련하는 종합적인 안전보건관리 활동입니다.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">주요 서비스</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">
                    화학물질 위험성평가
                  </h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 취급 화학물질 목록 작성</li>
                    <li>• 유해성·위험성 분류</li>
                    <li>• 노출 시나리오 작성</li>
                    <li>• 위험성 추정 및 결정</li>
                    <li>• 위험성 감소대책 수립</li>
                  </ul>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">
                    MSDS(물질안전보건자료) 관리
                  </h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• MSDS 작성 및 제공</li>
                    <li>• MSDS 게시 및 교육자료 제작</li>
                    <li>• 화학물질 취급근로자 교육</li>
                    <li>• 경고표시 및 그림문자 부착</li>
                  </ul>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">
                    작업환경관리
                  </h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 국소배기장치 설치 및 성능검사</li>
                    <li>• 작업환경측정 실시</li>
                    <li>• 개인보호구 지급 및 착용관리</li>
                    <li>• 특수건강진단 실시</li>
                  </ul>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">
                    화학물질 취급시설 관리
                  </h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 보관시설 적정성 검토</li>
                    <li>• 환기시설 설계 및 개선</li>
                    <li>• 누출감지 및 경보설비 점검</li>
                    <li>• 비상대응 매뉴얼 작성</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">화학물질 관리 대상</h3>
              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 mb-8 rounded-xl">
                <h4 className="font-semibold mb-3">관리대상 유해물질 (산업안전보건법)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm">유기화합물</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 톨루엔, 크실렌, 노말헥산</li>
                      <li>• 메틸에틸케톤, 아세톤</li>
                      <li>• 벤젠, 스티렌, DMF 등</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm">금속류</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 납, 수은, 크롬</li>
                      <li>• 카드뮴, 망간, 니켈</li>
                      <li>• 알루미늄 분진 등</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm">산 및 알칼리류</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 황산, 질산, 염산</li>
                      <li>• 수산화나트륨, 암모니아</li>
                      <li>• 인산 등</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-sm">가스류</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 일산화탄소, 황화수소</li>
                      <li>• 염소, 포스겐</li>
                      <li>• 암모니아, 이산화황 등</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">화학물질관리 절차</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-2">화학물질 목록 작성 및 유해성 확인</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">사업장에서 사용하는 모든 화학물질의 MSDS 확보 및 분류</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-2">노출평가 실시</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">작업환경측정을 통한 근로자 노출수준 파악</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-2">위험성 결정 및 관리방안 수립</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">위험도에 따른 우선순위 설정 및 개선대책 마련</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-bold mb-2">개선조치 시행 및 효과 확인</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">공학적 대책 시행 후 재측정을 통한 효과 검증</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-bold mb-2">근로자 교육 및 지속적 모니터링</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">정기적인 교육 실시 및 관리상태 점검</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">법적 의무사항</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-left">구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-left">내용</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-left">주기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">작업환경측정</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">유해인자 노출수준 측정</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">6개월 1회 이상</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">특수건강진단</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">화학물질 취급자 건강진단</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">6개월~2년 1회</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">MSDS 게시</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">물질안전보건자료 비치·게시</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">상시</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">근로자 교육</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">화학물질 취급 안전교육</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">신규·변경 시</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-secondary-50 dark:bg-secondary-900/20 border-l-4 border-secondary-500 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 flex items-center">
                  <span className="text-2xl mr-2">⚗️</span>
                  전문적이고 체계적인 화학물질관리
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300">
                  한국환경안전연구소는 20년 이상의 현장 경험을 바탕으로 사업장의 특성에 맞는 
                  맞춤형 화학물질관리 솔루션을 제공합니다. 법적 의무사항 준수는 물론, 
                  실질적인 위험 감소를 위한 실행 가능한 개선방안을 제시합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChemicalManagement;
