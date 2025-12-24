 
const Portfolio = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              산업보건컨설팅 실적
            </h1>
            <p className="text-lg text-white/90">
              2006년부터 현재까지 다양한 업종의 사업장에서 축적한 산업보건 전문 컨설팅 경험을 소개합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">주요 실적 현황</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl text-center border border-primary-100 dark:border-primary-800">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-300 mb-2">1,200+</div>
                  <p className="text-neutral-600 dark:text-neutral-200">작업환경측정</p>
                </div>
                <div className="bg-secondary-50 dark:bg-secondary-900/30 p-6 rounded-xl text-center border border-secondary-100 dark:border-secondary-800">
                  <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-300 mb-2">450+</div>
                  <p className="text-neutral-600 dark:text-neutral-200">근골격계 유해요인조사</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 p-6 rounded-xl text-center border border-orange-100 dark:border-orange-800">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-300 mb-2">300+</div>
                  <p className="text-neutral-600 dark:text-neutral-200">화학물질관리</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl text-center border border-green-100 dark:border-green-800">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-300 mb-2">180+</div>
                  <p className="text-neutral-600 dark:text-neutral-200">중대재해 대응 컨설팅</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-12 mb-6">업종별 주요 실적</h3>
              
              <div className="space-y-6 mb-12">
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4 text-primary-600 dark:text-primary-300">제조업</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <li>• 자동차 부품 제조업 - 작업환경측정 및 근골격계 조사 (연 4회, 2018~현재)</li>
                      <li>• 전자부품 제조업 - 화학물질관리 및 작업환경측정 (연 2회, 2019~현재)</li>
                      <li>• 금속가공업 - 소음·분진 작업환경측정 (연 2회, 2020~현재)</li>
                      <li>• 식품가공업 - 근골격계 유해요인조사 및 개선 (2021)</li>
                    </ul>
                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <li>• 화학제품 제조업 - 화학물질 위험성평가 및 관리 (2022)</li>
                      <li>• 섬유제품 제조업 - 작업환경측정 및 개선 컨설팅 (2020~현재)</li>
                      <li>• 플라스틱 제조업 - 유해인자 측정 및 국소배기장치 설치 (2019)</li>
                      <li>• 인쇄업 - 유기용제 작업환경측정 및 관리방안 (2021~현재)</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4 text-secondary-600 dark:text-secondary-300">건설업</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <li>• 대형건설현장 - 석면 해체·제거 감리 및 작업환경측정 (2018~현재)</li>
                    <li>• 리모델링 현장 - 석면조사 및 비산정도 측정 (연 30건 이상)</li>
                    <li>• 도로건설 - 소음·진동 측정 및 관리방안 (2020~2022)</li>
                    <li>• 건축물 해체공사 - 석면농도측정 및 안전관리 (2019~현재)</li>
                  </ul>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4 text-orange-600 dark:text-orange-300">서비스업</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <li>• 물류센터 - 근골격계 유해요인조사 및 개선 (2021~현재)</li>
                    <li>• 콜센터 - VDT 작업 근골격계 조사 및 교육 (2020)</li>
                    <li>• 요양병원 - 근골격계 조사 및 작업환경 개선 컨설팅 (2022)</li>
                    <li>• 유통업 - 반복작업 근골격계 유해요인 평가 (2021)</li>
                  </ul>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4 text-green-600 dark:text-green-300">공공기관</h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <li>• 충청북도 공공기관 - 건축물 석면조사 및 위해성평가 (2020~현재)</li>
                    <li>• 청주시 공공시설 - 실내공기질 측정 및 개선 (연 20개소)</li>
                    <li>• 교육청 산하 학교 - 석면건축물 관리 및 공기질측정 (2019~현재)</li>
                    <li>• 국가기관 청사 - 작업환경측정 및 안전관리 컨설팅 (2021~현재)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-12 mb-6">주요 컨설팅 사례</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">01</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">자동차 부품 제조업체 - 근골격계질환 예방 프로그램</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>과제:</strong> 반복작업으로 인한 근골격계질환자 다수 발생
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>솔루션:</strong> 전 공정 근골격계 유해요인조사 실시, 작업대 높이 조정, 보조기구 도입, 작업순환제 도입, 스트레칭 프로그램 운영
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                        <strong>결과:</strong> 근골격계 증상호소율 65% → 28% 감소, 생산성 12% 향상
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-500 text-white rounded-full flex items-center justify-center font-bold">02</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">화학제품 제조업체 - 화학물질관리 시스템 구축</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>과제:</strong> 중대재해처벌법 대응을 위한 화학물질 체계적 관리 필요
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>솔루션:</strong> 화학물질 목록 DB 구축, MSDS 통합관리 시스템 도입, 국소배기장치 설치, 작업환경측정 및 개선, 근로자 교육 프로그램 운영
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                        <strong>결과:</strong> 전 화학물질 노출기준 준수, 안전보건관리체계 인증 획득
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">03</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">물류센터 - 작업환경 개선 프로젝트</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>과제:</strong> 중량물 취급 및 반복작업으로 인한 근골격계 부담 과다
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                        <strong>솔루션:</strong> 작업분석 및 인간공학적 평가, 리프터 및 컨베이어 시스템 도입, 작업표준 개선, 2인 1조 작업방식 도입
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                        <strong>결과:</strong> 근골격계질환 발생률 70% 감소, 작업효율 18% 향상
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500 p-6 rounded-xl border border-primary-100 dark:border-primary-800">
                <h4 className="font-bold text-lg mb-3 flex items-center text-neutral-900 dark:text-white">
                  <span className="text-2xl mr-2">🏆</span>
                  신뢰받는 산업보건 파트너
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                  한국환경안전연구소는 다양한 업종과 규모의 사업장에서 축적한 풍부한 경험을 바탕으로 
                  실질적이고 효과적인 산업보건 솔루션을 제공합니다.
                </p>
                <p className="text-neutral-700 dark:text-neutral-200">
                  법적 의무사항 준수는 물론, 사업장의 특성을 고려한 맞춤형 컨설팅으로 
                  근로자 건강 보호와 생산성 향상이라는 두 가지 목표를 동시에 달성하도록 지원합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
