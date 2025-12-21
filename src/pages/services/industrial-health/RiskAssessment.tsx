import Button from "../../../components/common/Button";

const RiskAssessment = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">위험성평가</h1>
            <p className="text-lg text-white/90">
              중대재해처벌법 대응을 위한 체계적인 위험성평가로 안전한
              사업장을 만듭니다
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
                  <h2 className="text-2xl font-bold mb-6">위험성평가란?</h2>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                    위험성평가는 사업장의 유해·위험요인을 파악하고 해당
                    유해·위험요인에 의한 부상 또는 질병의 발생 가능성(빈도)과
                    중대성(강도)을 추정·결정하고 감소대책을 수립하여 실행하는
                    일련의 과정입니다.
                  </p>

                  <div className="bg-primary-50 dark:bg-primary-900/40 border-l-4 border-primary-500 dark:border-primary-400 p-6 mb-8 dark:shadow-xl">
                    <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-50">
                      ⚠️ 중대재해처벌법 (2022.01.27 시행)
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-100 mb-2 font-medium">
                      상시근로자 5인 이상 사업장은 위험성평가를 실시하고
                      안전보건관리체계를 구축해야 합니다.
                    </p>
                    <ul className="space-y-1 text-neutral-700 dark:text-neutral-100 text-sm font-medium">
                      <li>• 사업주 및 경영책임자 처벌 대상</li>
                      <li>• 1년 이상의 징역 또는 10억원 이하의 벌금</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-4">위험성평가 절차</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          1
                        </span>
                        사전준비
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 ml-11">
                        평가 대상 선정, 평가팀 구성, 자료 수집
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          2
                        </span>
                        유해·위험요인 파악
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 ml-11">
                        작업공정, 작업내용, 설비·기계 등의 유해·위험요인 확인
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          3
                        </span>
                        위험성 추정
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 ml-11">
                        부상 또는 질병으로 이어질 수 있는 가능성과 중대성의 크기
                        추정
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          4
                        </span>
                        위험성 결정
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 ml-11">
                        추정한 위험성이 허용 가능한 위험성인지 여부 판단
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                          5
                        </span>
                        위험성 감소대책 수립 및 실행
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 ml-11">
                        허용 불가능한 위험성에 대한 감소대책 마련 및 시행
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-4">평가 방법</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3">정성적 평가</h4>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>• 체크리스트법</li>
                        <li>• What-If 기법</li>
                        <li>• 위험과 운전분석(HAZOP)</li>
                        <li>• 작업안전분석(JSA)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3">정량적 평가</h4>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>• 빈도-강도 행렬법</li>
                        <li>• 위험도 산출법</li>
                        <li>• 사고예상 질문분석(WHAT-IF)</li>
                        <li>• 결함수 분석(FTA)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mt-8">
                    <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                      ✅ 전문 컨설팅 서비스
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                      한국환경안전연구소는 산업안전보건 전문가가 현장 맞춤형
                      위험성평가를 실시합니다.
                    </p>
                    <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                      <li>• 중대재해처벌법 대응 컨설팅</li>
                      <li>• 안전보건관리체계 구축 지원</li>
                      <li>• 위험성평가 교육 및 실습</li>
                    </ul>
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

export default RiskAssessment;
