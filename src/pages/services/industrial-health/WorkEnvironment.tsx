import { Container, Section } from "../../../components/common";
import { Building2, ClipboardCheck, FileText, Calendar } from "lucide-react";

const WorkEnvironment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                작업환경측정
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300">
                산업안전보건법에 의한 작업환경측정 전문기관
              </p>
            </div>

            {/* 개요 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
                <Building2 className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                개요
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                작업환경측정은 작업장 내 유해인자를 파악하고 근로자의 건강을 보호하기 위한 필수적인 절차입니다. 
                한국환경안전연구소는 정밀한 측정 장비와 전문 인력을 통해 정확한 작업환경측정 서비스를 제공합니다.
              </p>
            </div>

            {/* 측정 대상 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <ClipboardCheck className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                측정 대상
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">화학적 인자</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">유기화합물, 금속류, 산·알카리류, 가스류 등</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">물리적 인자</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">소음, 진동, 온열, 조명, 방사선 등</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">분진</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">광물성 분진, 금속 분진, 유기 분진 등</p>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-100 dark:border-primary-800">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">생물학적 인자</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200">바이러스, 곰팡이, 세균 등</p>
                </div>
              </div>
            </div>

            {/* 측정 주기 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                측정 주기
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">정기측정: 6개월에 1회 이상</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">작업환경측정 대상 유해인자가 있는 작업장</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">수시측정</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">작업환경 변경 시, 직업병 발생 시 등</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 서비스 절차 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                서비스 절차
              </h2>
              <div className="space-y-3">
                {[
                  "측정 의뢰 및 상담",
                  "현장 방문 및 예비조사",
                  "측정 계획 수립",
                  "현장 측정 실시",
                  "시료 분석",
                  "결과 평가 및 보고서 작성",
                  "개선 대책 제시"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-200 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 문의 */}
            <div className="mt-8 text-center">
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                작업환경측정에 대한 자세한 문의는 아래로 연락주세요.
              </p>
              <a
                href="tel:043-237-7624"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-xl transition-colors font-medium"
              >
                📞 043-237-7624
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default WorkEnvironment;