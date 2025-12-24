 
const DialysisIntro = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">업무 소개</h1>
            <p className="text-lg text-white/90">
              투석 환자의 생명과 직결된 혈액투석용수의 안전성을 보장합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">혈액투석용수 수질검사</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                혈액투석용수는 투석 환자의 생명과 직결되어 있어 일반 먹는물보다 훨씬 엄격한 
                수질 기준을 적용합니다. 한국환경안전연구소는 대한신장학회 인증 검사기관으로서 
                정확하고 신뢰할 수 있는 투석용수 검사 서비스를 제공합니다.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-300">
                  ⚠️ 투석용수 수질관리의 중요성
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  혈액투석 환자는 주 3회, 1회당 약 120~150리터의 물이 직접 혈액과 접촉합니다.
                </p>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                  <li>• 연간 약 18,000~23,000리터 사용 (일반인 음용량의 40배)</li>
                  <li>• 부적합한 수질 사용 시 심각한 합병증 발생</li>
                  <li>• 철저한 수질관리로 투석 환자 건강 보호</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">검사 항목</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">화학적 오염물질</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• <strong>칼슘(Ca):</strong> 2 mg/L 이하</li>
                    <li>• <strong>마그네슘(Mg):</strong> 2 mg/L 이하</li>
                    <li>• <strong>나트륨(Na):</strong> 50 mg/L 이하</li>
                    <li>• <strong>칼륨(K):</strong> 2 mg/L 이하</li>
                    <li>• <strong>불소(F):</strong> 0.2 mg/L 이하</li>
                    <li>• <strong>염소(Cl):</strong> 0.5 mg/L 이하</li>
                    <li>• <strong>질산염(NO3):</strong> 2 mg/L 이하</li>
                    <li>• <strong>황산염(SO4):</strong> 50 mg/L 이하</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h4 className="font-bold text-lg mb-3">중금속</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• <strong>알루미늄(Al):</strong> 0.01 mg/L 이하</li>
                    <li>• <strong>구리(Cu):</strong> 0.1 mg/L 이하</li>
                    <li>• <strong>아연(Zn):</strong> 0.1 mg/L 이하</li>
                    <li>• <strong>비소(As):</strong> 0.005 mg/L 이하</li>
                    <li>• <strong>납(Pb):</strong> 0.005 mg/L 이하</li>
                    <li>• <strong>은(Ag):</strong> 0.005 mg/L 이하</li>
                    <li>• <strong>바륨(Ba):</strong> 0.1 mg/L 이하</li>
                    <li>• <strong>카드뮴(Cd):</strong> 0.001 mg/L 이하</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mb-8">
                <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">미생물학적 기준</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">표준투석액</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 일반세균: 100 CFU/mL 이하</li>
                      <li>• 내독소: 0.25 EU/mL 이하</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">초순수 투석액</p>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 일반세균: 0.1 CFU/mL 이하</li>
                      <li>• 내독소: 0.03 EU/mL 이하</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">검사 서비스 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">🏥</div>
                  <h4 className="font-bold mb-2">대한신장학회 인증</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    공식 인증 검사기관
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold mb-2">신속한 결과</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    7일 이내 검사 완료
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500 text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold mb-2">정밀 분석</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    ICP-MS 등 첨단장비
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  ✅ 정기 검사 관리 서비스
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                  정기 검사 일정 관리, 검사 전 채수 교육, 부적합 시 원인 분석 및 개선 방안 제시 등
                  투석실 수질관리를 위한 전문 컨설팅 서비스를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DialysisIntro;
