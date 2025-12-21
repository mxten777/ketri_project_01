import { Container, Section } from "../../../components/common";
import { FlaskConical, BookOpen, Shield, AlertCircle } from "lucide-react";

const ChemicalManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                화학물질관리
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300">
                사업장 화학물질의 체계적이고 안전한 관리
              </p>
            </div>

            {/* 개요 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
                <FlaskConical className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                화학물질관리란?
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                산업안전보건법에 따라 사업장에서 사용하는 화학물질로 인한 근로자의 건강장해를 예방하고, 
                안전한 작업환경을 조성하기 위한 종합적인 관리 시스템입니다.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  화학물질의 유해성·위험성 파악부터 노출평가, 관리방안 수립까지 체계적으로 지원합니다.
                </p>
              </div>
            </div>

            {/* 관리 대상 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                관리 대상 화학물질
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">금지물질</h3>
                  <p className="text-sm text-red-700 dark:text-red-200">제조·사용이 금지된 12종의 화학물질</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">허가물질</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-200">노동부 장관의 허가를 받아야 하는 11종</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">관리대상 유해물질</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">특별한 관리가 필요한 165종</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">작업환경측정 대상</h3>
                  <p className="text-sm text-green-700 dark:text-green-200">정기적 측정이 필요한 물질</p>
                </div>
              </div>
            </div>

            {/* 서비스 내용 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                서비스 내용
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "화학물질 인벤토리 구축",
                    desc: "사업장에서 사용하는 모든 화학물질의 목록 작성 및 관리",
                    items: ["화학물질 조사 및 목록 작성", "MSDS 수집 및 관리", "화학물질 데이터베이스 구축"]
                  },
                  {
                    title: "유해성·위험성 평가",
                    desc: "화학물질의 유해·위험성 파악 및 평가",
                    items: ["유해성·위험성 조사", "노출 시나리오 작성", "위험성 평가 실시"]
                  },
                  {
                    title: "노출평가 및 측정",
                    desc: "작업자의 화학물질 노출 수준 평가",
                    items: ["개인 노출 측정", "작업환경측정", "생물학적 모니터링"]
                  },
                  {
                    title: "관리방안 수립",
                    desc: "효과적인 화학물질 관리 시스템 구축",
                    items: ["공학적 관리방안", "관리적 관리방안", "개인보호구 선정"]
                  }
                ].map((service, index) => (
                  <div key={index} className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-200 mb-3">{service.desc}</p>
                    <ul className="space-y-1">
                      {service.items.map((item, i) => (
                        <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center space-x-2">
                          <span className="text-primary-600 dark:text-primary-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 법적 의무사항 */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                법적 의무사항
              </h2>
              <ul className="space-y-3">
                {[
                  "물질안전보건자료(MSDS) 작성·비치 및 교육",
                  "화학물질 취급 근로자에 대한 특수건강진단 실시",
                  "관리대상 유해물질 취급 시 국소배기장치 설치",
                  "작업환경측정 실시 (6개월에 1회 이상)",
                  "화학물질 취급·저장 시설의 안전기준 준수",
                  "화학물질 관리자 지정 및 교육",
                  "화학물질 누출·유출 시 비상조치계획 수립"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
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
                화학물질관리에 대한 자세한 문의는 아래로 연락주세요.
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

export default ChemicalManagement;
