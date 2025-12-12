import { Routes, Route } from "react-router-dom";

const IndustrialHealth = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              산업보건컨설팅
            </h1>
            <p className="text-lg text-white/90">
              중대재해처벌법 대응부터 작업환경측정, 근골격계 유해요인조사까지
              사업장 안전보건관리체계 구축을 위한 전문 컨설팅 서비스를 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">세부 서비스</h3>
                <nav className="space-y-2">
                  {[
                    {
                      label: "근골격계 유해요인조사",
                      path: "/industrial-health/musculoskeletal",
                    },
                    {
                      label: "화학물질관리",
                      path: "/industrial-health/chemical-management",
                    },
                    {
                      label: "산업보건컨설팅 실적",
                      path: "/industrial-health/portfolio",
                    },
                    {
                      label: "업무소개",
                      path: "/industrial-health/introduction",
                    },
                  ].map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-800 hover:text-primary-600 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="card p-8">
                      <h2 className="heading-md mb-6">산업보건컨설팅 서비스</h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                          한국환경안전연구소는 산업안전보건법 및 중대재해처벌법에 따른 전문 컨설팅
                          서비스를 제공합니다. 2017년부터 650여 사업장의 안전보건 관리체계 구축을 지원하며,
                          사고 예방과 법적 컴플라이언스를 위한 체계적인 솔루션을 제공합니다.
                        </p>

                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8">
                          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">
                            ⚠️ 중대재해처벌법 대응 필수 지원
                          </h3>
                          <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                            2022년 1월 27일 시행된 중대재해처벌법에 따라 5명 이상 사업장은 안전보건 관리체계 구축이 의무화되었습니다.
                          </p>
                          <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                            <li>• 안전보건관리체계 구축 및 이행여부 점검</li>
                            <li>• 위험성평가 실시 및 개선조치 수립</li>
                            <li>• 안전보건 조치비용 예산 편성 및 집행</li>
                          </ul>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          주요 서비스
                        </h3>
                        <div className="grid grid-cols-1 gap-4 mb-8">
                          <div className="border-l-4 border-primary-500 pl-4 py-2">
                            <h4 className="font-bold text-lg mb-2">
                              근골격계 유해요인조사 (의무조사)
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              • 산업안전보건법 제24조 따른 3년 주기 의무조사 (5인 이상 사업장)<br/>
                              • KOSHA-H-30-2020 기법에 따른 과학적 위험도 평가<br/>
                              • 작업장 맞춤형 개선안 및 예방관리프로그램 제공<br/>
                              • 근골격계질환 예방을 위한 교육 및 체조개선 가이드라인
                            </p>
                          </div>
                          <div className="border-l-4 border-secondary-500 pl-4 py-2">
                            <h4 className="font-bold text-lg mb-2">
                              화학물질 노출평가 및 관리 (CRA)
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              • 화관법 개정(2021.1.16)에 따른 화학물질 위험성평가 의무화<br/>
                              • 개인노출평가 및 작업환경노출평가 수행<br/>
                              • ECETOC TRA, EASE, Stoffenmanager 등 국제 검증 모델 사용<br/>
                              • 리스크 특성비에 따른 위험도 결정 및 관리방안 수립
                            </p>
                          </div>
                          <div className="border-l-4 border-accent-500 pl-4 py-2">
                            <h4 className="font-bold text-lg mb-2">
                              작업환경측정 (고용노동부 지정기관)
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              • 산업안전보건법 제125조 따른 6개월마다 의무측정<br/>
                              • 소음, 분진, 유기화합물, 금속류 등 190여종 유해인자 측정<br/>
                              • KOSHA-A-1-2021 작업환경측정 및 시료채취보고서 작성<br/>
                              • 노출기준 초과 시 개선조치 및 재측정 지원
                            </p>
                          </div>
                          <div className="border-l-4 border-primary-500 pl-4 py-2">
                            <h4 className="font-bold text-lg mb-2">
                              안전보건 진단 및 위험성 평가
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400">
                              사업장의 안전보건관리 실태 진단, 위험요인 파악 및
                              개선대책 수립. 중대재해처벌법 대응을 위한 체계적
                              관리체계 구축 지원
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          서비스 프로세스
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
                          {[
                            {
                              step: "1단계",
                              title: "사전조사",
                              desc: "사업장 현황 파악 및 조사 계획 수립",
                            },
                            {
                              step: "2단계",
                              title: "현장조사",
                              desc: "실측 및 데이터 수집, 작업자 면담",
                            },
                            {
                              step: "3단계",
                              title: "분석평가",
                              desc: "수집 데이터 분석 및 유해도 평가",
                            },
                            {
                              step: "4단계",
                              title: "보고서 제출",
                              desc: "개선방안 제시 및 사후관리 지원",
                            },
                          ].map((process) => (
                            <div key={process.step} className="text-center">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                                {process.step}
                              </div>
                              <h4 className="font-bold mb-2">
                                {process.title}
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {process.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          서비스 특징
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                          {[
                            {
                              title: "전문 인력 보유",
                              desc: "산업위생관리기사, 인간공학기사, 대기환경기사 등 다수 보유",
                            },
                            {
                              title: "신속한 처리",
                              desc: "현장조사 후 평균 2주 이내 보고서 제출 및 개선안 제시",
                            },
                            {
                              title: "맞춤형 솔루션",
                              desc: "제조업, 건설업, 서비스업 등 업종별 특성을 고려한 맞춤 컨설팅",
                            },
                            {
                              title: "철저한 사후관리",
                              desc: "개선 사항 이행 지원 및 정기적 모니터링 서비스",
                            },
                            {
                              title: "법적 신뢰성",
                              desc: "고용노동부 지정기관으로서 법적 효력을 갖춘 결과 보고",
                            },
                            {
                              title: "교육 지원",
                              desc: "근로자 안전보건교육 및 관리자 역량강화 교육 제공",
                            },
                          ].map((feature) => (
                            <div
                              key={feature.title}
                              className="p-6 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-neutral-800 rounded-lg border border-primary-100 dark:border-primary-900/30 hover:shadow-lg transition-shadow"
                            >
                              <h4 className="font-bold text-primary-600 dark:text-primary-400 mb-2 text-lg">
                                {feature.title}
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {feature.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mt-8">
                          <h3 className="text-xl font-bold mb-4">
                            문의 및 상담
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            사업장의 안전보건 관리에 대한 전문적인 상담이
                            필요하시면 언제든지 연락 주시기 바랍니다.
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold">전화:</span>
                              <span className="text-primary-600 dark:text-primary-400">
                                061-721-2484
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold">팩스:</span>
                              <span>0505-684-2485</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/musculoskeletal"
                  element={
                    <div className="card p-8">
                      <h2 className="heading-md mb-6">근골격계 유해요인조사</h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                          산업안전보건법 제24조(근골격계부담작업으로 인한
                          건강장해 예방)에 따라 사업주는 근골격계부담작업에 대한
                          유해요인조사를 실시하고 그 결과를 기록·보존해야
                          합니다.
                        </p>

                        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 mb-8">
                          <h3 className="font-bold text-lg mb-2 text-amber-900 dark:text-amber-300">
                            ⚠️ 의무 실시 대상
                          </h3>
                          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                            <li>
                              • 근골격계부담작업이 있는 모든 사업장 (상시근로자
                              5인 이상)
                            </li>
                            <li>• 정기조사: 3년마다 정기적으로 실시</li>
                            <li>
                              • 수시조사: 근골격계질환자 발생 시, 작업환경 변경
                              시
                            </li>
                          </ul>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          조사 대상 작업
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <h4 className="font-bold mb-2">
                              하루 4시간 이상 반복 작업
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              동일한 동작을 분당 2회 이상 반복하는 작업
                            </p>
                          </div>
                          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <h4 className="font-bold mb-2">
                              하루 총 2시간 이상
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              목, 어깨, 팔꿈치, 손목, 손 부위 힘을 가하는 작업
                            </p>
                          </div>
                          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <h4 className="font-bold mb-2">
                              하루 총 2시간 이상
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              머리 위에 손이 있거나 팔꿈치가 어깨 위에 있는
                              상태의 작업
                            </p>
                          </div>
                          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <h4 className="font-bold mb-2">하루 25회 이상</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              10kg 이상 물건을 드는 작업
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          조사 방법 및 절차
                        </h3>
                        <div className="space-y-4 mb-8">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                              1
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">
                                예비조사
                              </h4>
                              <p className="text-neutral-600 dark:text-neutral-400">
                                작업장 현황 파악, 근골격계부담작업 파악,
                                근골격계질환 발생 현황 조사
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                              2
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">
                                근로자 증상 설문조사
                              </h4>
                              <p className="text-neutral-600 dark:text-neutral-400">
                                KOSHA CODE 기반 표준 설문지를 활용한 근골격계
                                증상 파악
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                              3
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">
                                유해요인 평가
                              </h4>
                              <p className="text-neutral-600 dark:text-neutral-400">
                                REBA, RULA, OWAS, NLE 등 인간공학적 평가도구를
                                활용한 정량적 평가
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                              4
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">
                                개선대책 수립
                              </h4>
                              <p className="text-neutral-600 dark:text-neutral-400">
                                공학적 개선방안, 관리적 개선방안, 의학적
                                관리방안 제시
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          주요 평가 도구
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-primary-50 dark:bg-primary-900/20">
                                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left">
                                  평가도구
                                </th>
                                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left">
                                  평가대상
                                </th>
                                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left">
                                  특징
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-bold">
                                  REBA
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  전신 작업자세
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  동적, 정적 자세 모두 평가 가능
                                </td>
                              </tr>
                              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-bold">
                                  RULA
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  상지 작업자세
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  팔, 손목, 목 부위 집중 평가
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-bold">
                                  OWAS
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  작업자세 전체
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  허리, 팔, 다리, 하중 종합 평가
                                </td>
                              </tr>
                              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-bold">
                                  NLE
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  들기 작업
                                </td>
                                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                                  NIOSH 들기 방정식 기반
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mt-8">
                          <h3 className="text-xl font-bold mb-4">
                            왜 한국환경안전연구소인가?
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              ✓ 인간공학기사, 산업위생관리기사 등 전문 자격 보유
                            </li>
                            <li>✓ 1,000개 이상 사업장 조사 경험</li>
                            <li>✓ 현실적이고 실행 가능한 개선방안 제시</li>
                            <li>✓ 개선 후 사후관리 및 재평가 지원</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/chemical-management"
                  element={
                    <div className="card p-8">
                      <h2 className="heading-md mb-6">화학물질관리</h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                          산업안전보건법 및 화학물질관리법에 따른 사업장
                          화학물질의 체계적 관리와 근로자 건강보호를 위한 전문
                          컨설팅 서비스를 제공합니다.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          주요 서비스
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
                            <div className="text-3xl mb-3">🧪</div>
                            <h4 className="font-bold text-lg mb-2">
                              MSDS 작성 및 관리
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              물질안전보건자료 작성, 게시, 교육 지원. GHS 분류
                              및 라벨링 기준 적용
                            </p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20 rounded-xl">
                            <div className="text-3xl mb-3">📊</div>
                            <h4 className="font-bold text-lg mb-2">
                              작업환경측정
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              유기화합물, 중금속, 분진 등 190여 종 유해인자 측정
                              및 분석
                            </p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl">
                            <div className="text-3xl mb-3">🔍</div>
                            <h4 className="font-bold text-lg mb-2">노출평가</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              개인시료채취를 통한 근로자 화학물질 노출 수준 평가
                            </p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl">
                            <div className="text-3xl mb-3">🏭</div>
                            <h4 className="font-bold text-lg mb-2">
                              국소배기장치 성능평가
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              후드, 덕트, 공기정화장치, 배풍기 등 성능 평가 및
                              개선방안 제시
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          화학물질 관리 프로세스
                        </h3>
                        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                                1
                              </div>
                              <p className="font-bold">화학물질 목록 작성</p>
                            </div>
                            <div className="flex items-center justify-center text-2xl text-neutral-400">
                              →
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                                2
                              </div>
                              <p className="font-bold">유해성·위험성 파악</p>
                            </div>
                            <div className="flex items-center justify-center text-2xl text-neutral-400">
                              →
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                                3
                              </div>
                              <p className="font-bold">노출평가</p>
                            </div>
                            <div className="flex items-center justify-center text-2xl text-neutral-400 md:col-start-2">
                              →
                            </div>
                            <div className="text-center md:col-start-3">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                                4
                              </div>
                              <p className="font-bold">위험성 결정</p>
                            </div>
                            <div className="flex items-center justify-center text-2xl text-neutral-400">
                              →
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                                5
                              </div>
                              <p className="font-bold">관리방안 수립</p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">
                          측정 가능 유해인자
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                            <h4 className="font-bold mb-3 text-primary-600 dark:text-primary-400">
                              유기화합물
                            </h4>
                            <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                              <li>• 톨루엔, 크실렌</li>
                              <li>• MEK, 아세톤</li>
                              <li>• 벤젠, 스티렌</li>
                              <li>• IPA, 에탄올</li>
                            </ul>
                          </div>
                          <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                            <h4 className="font-bold mb-3 text-secondary-600 dark:text-secondary-400">
                              중금속
                            </h4>
                            <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                              <li>• 납, 크롬</li>
                              <li>• 니켈, 망간</li>
                              <li>• 카드뮴, 수은</li>
                              <li>• 비소, 베릴륨</li>
                            </ul>
                          </div>
                          <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
                            <h4 className="font-bold mb-3 text-accent-600 dark:text-accent-400">
                              분진 및 기타
                            </h4>
                            <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                              <li>• 총분진, 호흡성분진</li>
                              <li>• 석면, 실리카</li>
                              <li>• 소음, 진동</li>
                              <li>• 일산화탄소, 이산화탄소</li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
                          <h3 className="font-bold text-lg mb-2 text-red-900 dark:text-red-300">
                            ⚠️ 특별관리물질 취급 사업장 의무사항
                          </h3>
                          <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                            발암성, 생식독성 등이 있는 특별관리물질 취급 시:
                          </p>
                          <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                            <li>• 작업환경측정 주기: 6개월에 1회 이상</li>
                            <li>• 특수건강진단 실시 의무</li>
                            <li>• 대체물질 검토 및 대체 노력</li>
                            <li>• 밀폐설비 또는 국소배기장치 설치</li>
                          </ul>
                        </div>

                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
                          <h3 className="text-xl font-bold mb-4">
                            전문적인 분석 장비 보유
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-bold mb-2">
                                GC/FID (가스크로마토그래프)
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                유기화합물 정밀 분석
                              </p>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">
                                ICP/AES (유도결합플라즈마)
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                중금속 초미량 분석
                              </p>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">분광광도계</h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                화학물질 농도 측정
                              </p>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">
                                개인시료채취펌프
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                근로자 개인노출 평가
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustrialHealth;
