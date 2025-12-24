import { Container, Section } from "../../../components/common";
import { AlertTriangle, Shield, FileCheck, Users } from "lucide-react";

const RiskAssessment = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                위험성평가
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300">
                산업재해 예방을 위한 체계적인 위험성평가 컨설팅
              </p>
            </div>

            {/* 개요 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                위험성평가란?
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                위험성평가는 사업장 내 유해·위험요인을 파악하고, 해당 유해·위험요인에 의한 부상 또는 질병의 발생 가능성(빈도)과 
                중대성(강도)을 추정·결정하고, 감소대책을 수립하여 실행하는 일련의 과정을 말합니다.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                산업안전보건법 제36조에 따라 사업주는 건설물, 기계·기구·설비, 원재료, 가스, 증기, 분진, 
                근로자의 작업행동 또는 그 밖의 업무로 인한 유해·위험요인을 찾아내어 부상 및 질병으로 이어질 수 있는 
                위험성의 크기가 허용 가능한 범위인지를 평가하여야 하고, 그 결과에 따라 관리 방안을 수립·시행하여야 합니다.
              </p>
            </div>

            {/* 평가 절차 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <FileCheck className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                위험성평가 절차
              </h2>
              <div className="space-y-3">
                {[
                  { title: "1단계: 사전준비", desc: "평가대상 선정, 평가팀 구성, 자료수집" },
                  { title: "2단계: 유해·위험요인 파악", desc: "작업공정별 유해·위험요인 확인 및 기록" },
                  { title: "3단계: 위험성 추정", desc: "가능성과 중대성을 고려한 위험성 추정" },
                  { title: "4단계: 위험성 결정", desc: "허용 가능 여부 판단 및 우선순위 결정" },
                  { title: "5단계: 위험성 감소대책 수립 및 실행", desc: "개선대책 수립 및 시행" },
                  { title: "6단계: 기록 및 유지관리", desc: "평가결과 문서화 및 지속적 관리" }
                ].map((step, index) => (
                  <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-200">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 평가 방법 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                평가 방법
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">빈도-강도법</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">발생 가능성과 중대성의 곱으로 위험성 추정</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">체크리스트법</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">표준화된 체크리스트를 활용한 평가</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">위험성 매트릭스법</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">매트릭스를 이용한 시각적 평가</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">KRAS법</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">한국형 위험성 평가 기법</p>
                </div>
              </div>
            </div>

            {/* 컨설팅 내용 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                컨설팅 내용
              </h2>
              <ul className="space-y-3">
                {[
                  "위험성평가 계획 수립 지원",
                  "평가팀 구성 및 교육",
                  "유해·위험요인 파악 지원",
                  "위험성 추정 및 결정 지원",
                  "감소대책 수립 및 실행 지원",
                  "위험성평가 결과보고서 작성",
                  "정기 및 수시 평가 지원"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-200 rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 문의 */}
            <div className="mt-8 text-center">
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                위험성평가 컨설팅에 대한 자세한 문의는 아래로 연락주세요.
              </p>
              <a
                href="tel:043-237-7824"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-xl transition-colors font-medium"
              >
                📞 043-237-7824
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default RiskAssessment;
