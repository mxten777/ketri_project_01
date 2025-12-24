 
const WaterIntro = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">업무 소개</h1>
            <p className="text-lg text-white/90">
              안전한 먹는물 공급을 위한 과학적이고 체계적인 수질검사 서비스를 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">먹는물 수질검사</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                먹는물관리법에 따라 국민 건강 보호를 위해 안전하고 깨끗한 먹는물을 공급하기 위한 수질검사 서비스입니다.
                KOLAS 인증 수질검사기관으로서 정확하고 신뢰할 수 있는 검사 결과를 제공합니다.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">검사 항목</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">미생물</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-200 text-sm">
                    <li>• 일반세균</li>
                    <li>• 총대장균군</li>
                    <li>• 대장균 또는 분원성대장균군</li>
                    <li>• 녹농균</li>
                    <li>• 살모넬라</li>
                    <li>• 쉬겔라</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">건강상 유해영향 무기물질</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 납, 비소, 세레늄, 수은</li>
                    <li>• 시안, 크롬, 암모니아성 질소</li>
                    <li>• 질산성 질소, 카드뮴</li>
                    <li>• 보론, 브롬산염</li>
                  </ul>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h4 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">건강상 유해영향 유기물질</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-200 text-sm">
                    <li>• 페놀, 다이아지논, 파라티온</li>
                    <li>• 페니트로티온, 카바릴</li>
                    <li>• 1,1,1-트리클로로에탄</li>
                    <li>• 테트라클로로에틸렌</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">검사 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="font-bold text-lg mb-2">KOLAS 인증</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    국제적으로 공인된 KOLAS 인증 시험기관으로서 정확한 검사 결과를 제공합니다
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-lg mb-2">신속한 처리</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    시료 접수 후 5~7일 이내 검사 결과 제공 (항목에 따라 상이)
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold text-lg mb-2">정확한 분석</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    첨단 분석장비와 숙련된 전문인력의 정밀 검사
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-bold text-lg mb-2">맞춤형 서비스</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    고객의 요구사항에 맞는 검사 항목 및 주기 설정
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  ✅ 관련 법령
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  먹는물관리법 제43조(먹는물등의 검사), 시행규칙 제36조(먹는물등의 수질검사 등)에 따라 
                  정기적인 수질검사를 실시해야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterIntro;
