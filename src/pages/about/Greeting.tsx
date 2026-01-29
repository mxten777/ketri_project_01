import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  Award,
  Shield,
  Microscope,
  TrendingUp,
  ChevronDown,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Section from "../../components/common/Section";
import { Card } from "../../components/ui/Card";
import ServiceCta from "../../components/common/ServiceCta";

const Greeting = () => {
  const [showCareer, setShowCareer] = useState(false);

  const careerData = {
    education: [
      { year: "1994.2.23", degree: "충북대학교 공과대학 환경공학과 졸업" },
      {
        year: "1994.3.02",
        degree: "충북대학교 대학원 환경공학과 석사과정 입학",
      },
      {
        year: "1996.2.23",
        degree: "충북대학교 대학원 환경공학과 석사과정 졸업",
      },
      {
        year: "1997.8.25",
        degree: "충북대학교 대학원 환경공학과 박사과정 입학",
      },
      {
        year: "2006.2.23",
        degree: "충북대학교 대학원 환경공학과 박사과정 졸업",
      },
    ],
    teaching: [
      { period: "1997.3 - 1997.8", position: "충청대학 환경공업과" },
      { period: "2000.3 - 2002.8", position: "충북과학대학 환경생명과학과" },
      { period: "2002.2 - 2002.8", position: "충주대학교 환경공학과" },
      {
        period: "2004.3 - 2005.2",
        position: "충주대학교 환경공학과 겸임교교수",
      },
    ],
    career: [
      { period: "1995.8 - 1996.3", position: "원자력연구소 환경시스템해석실" },
      {
        period: "1997.1 - 1999.12",
        position: "에너지기술연구소 에너지환경연구부",
      },
      {
        period: "2001.2 - 2006.2",
        position: "고려대학교 보건대학 보건과학연구소",
      },
      { period: "2006.7 - 2016.8", position: "(구)한국환경시험연구소" },
      { period: "2016.9 - 현재", position: "(주)한국환경안전연구소" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="min-h-screen">
      {/* A) Page Title Section */}
      <section data-has-hero className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">CEO Message</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-extrabold">
              대표이사 인사말
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium opacity-95">
              한국환경안전연구소를 찾아주신 여러분께
              <br className="hidden sm:inline" />
              진심으로 감사드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* B) 대표 인사말 카드 (강조) */}
      <Section variant="gradient" spacing="xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* CEO Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" padding="none" className="overflow-hidden lg:sticky lg:top-24">
              {/* Decorative Header */}
              <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-700 relative">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Profile Content */}
              <div className="px-6 lg:px-8 pb-8 -mt-12 relative z-10">
                {/* CEO Image */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-neutral-900">
                  <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>

                {/* CEO Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    이정식
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    대표이사
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    한국환경안전연구소
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-700 mb-6"></div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      전문성
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                    <Award className="w-6 h-6 text-neutral-600 dark:text-neutral-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      신뢰성
                    </div>
                  </div>
                </div>

                {/* Career Button */}
                <button
                  onClick={() => setShowCareer(!showCareer)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>학력 및 경력 보기</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showCareer ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Career Details */}
                <AnimatePresence>
                  {showCareer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 space-y-6 max-h-96 overflow-y-auto pr-2">
                        {/* Education */}
                        <div className="bg-blue-50 dark:bg-neutral-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h4 className="font-bold text-blue-900 dark:text-neutral-100">
                              학력
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {careerData.education.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-3 text-sm items-start"
                              >
                                <span className="text-blue-600 dark:text-blue-400 font-medium flex-shrink-0 w-20 text-right">
                                  {item.year}
                                </span>
                                <span className="text-neutral-700 dark:text-neutral-300 break-keep flex-1">
                                  {item.degree}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Teaching */}
                        <div className="bg-green-50 dark:bg-neutral-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <h4 className="font-bold text-green-900 dark:text-green-300">
                              강의 경력
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {careerData.teaching.map((item, index) => (
                              <div key={index} className="flex gap-3 text-sm">
                                <span className="text-green-600 dark:text-green-400 font-medium whitespace-nowrap">
                                  {item.period}
                                </span>
                                <span className="text-neutral-700 dark:text-neutral-300">
                                  {item.position}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Career */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <h4 className="font-bold text-purple-900 dark:text-purple-300">
                              기타 경력
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {careerData.career.map((item, index) => (
                              <div key={index} className="flex gap-3 text-sm">
                                <span className="text-purple-600 dark:text-purple-400 font-medium whitespace-nowrap">
                                  {item.period}
                                </span>
                                <span className="text-neutral-700 dark:text-neutral-300">
                                  {item.position}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* CEO Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card variant="elevated" padding="lg">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Opening */}
                <div className="mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="text-xl leading-relaxed text-neutral-900 dark:text-white">
                    안녕하십니까.
                    <br />
                    주식회사 한국환경안전연구소 대표이사{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      이정식
                    </span>
                    입니다.
                  </p>
                </div>

                {/* Main Content */}
                <div className="space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <p className="text-base">
                    저희 한국환경안전연구소는 국민의 건강과 직결된 유해 환경에
                    대한 명확한 평가를 통해 인체 및 생태 영향을 예측·감시하고,
                    환경성 질환으로부터 국민의 건강을 보호하고자 설립된 환경
                    전문 기관입니다. 설립 이래 환경과 보건 분야 전반에 걸친
                    시험·분석과 측정 서비스를 통해 사회적 책임을 성실히 수행해
                    왔습니다.
                  </p>

                  <p className="text-base">
                    먹는물 수질검사, 실내공기질·작업환경 측정, 석면 조사·분석 등
                    다양한 환경 요소는 작은 오차 하나로도 큰 영향을 미칠 수
                    있습니다. 저희 연구소는 이러한 중요성을 깊이 인식하고, 국내
                    최고 수준의 기술력과 전문 인력을 기반으로 정확하고 신뢰할 수
                    있는 분석 결과를 제공하는 데 역량을 집중하고 있습니다.
                  </p>

                  <p className="text-base">
                    또한 단순한 측정과 분석에 그치지 않고, 지속적인 기술 개발과
                    체계적인 기술지원을 통해 고객이 필요로 하는 최적의 해결책을
                    제시하는 파트너가 되고자 합니다. 모든 업무 과정에서 공정성과
                    객관성을 최우선 가치로 삼아, 고객과 사회로부터 신뢰받는
                    기관으로 자리매김하고 있습니다.
                  </p>

                  <p className="text-base">
                    앞으로도 한국환경안전연구소는 환경 안전 분야의 전문
                    기관으로서 책임을 다하며, 더욱 체계적이고 선도적인 환경측정
                    및 분석 서비스를 제공함으로써, 고객 신뢰와 사회적 가치
                    실현을 위해 끊임없이 노력할 것입니다.
                  </p>

                  <p className="text-base">
                    여러분의 성원과 관심에 진심으로 감사드리며, 변함없는 신뢰로
                    보답하겠습니다.
                  </p>
                </div>

                {/* Closing */}
                <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xl text-neutral-900 dark:text-white mb-8">
                    감사합니다.
                  </p>

                  <div className="text-right">
                    <p className="text-base font-bold text-neutral-900 dark:text-white">
                      주식회사 한국환경안전연구소
                    </p>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-bold mt-2">
                      대표이사 이정식
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* C) 핵심 가치 3가지 카드 */}
      <Section variant="default" spacing="xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Core Values
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
            우리의 핵심 가치
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            한국환경안전연구소가 추구하는 가치와 비전
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* 신뢰성 */}
          <Card variant="elevated" padding="lg" hover="lift">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                신뢰성
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                정확하고 신뢰할 수 있는 분석 결과를 제공하는 데 역량을 집중하고 있습니다
              </p>
            </div>
          </Card>

          {/* 전문성 */}
          <Card variant="elevated" padding="lg" hover="lift">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                전문성
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                국내 최고 수준의 기술력과 전문 인력을 기반으로 환경측정 및 분석 서비스를 제공합니다
              </p>
            </div>
          </Card>

          {/* 책임감 */}
          <Card variant="elevated" padding="lg" hover="lift">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                책임감
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                환경 안전 분야의 전문 기관으로서 책임을 다하며 사회적 가치 실현을 위해 노력합니다
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* D) 기관 신뢰 요소 블록 */}
      <Section variant="primary" spacing="xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-8">
            고객과 사회를 향한 약속
          </h2>

          <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-12 leading-relaxed">
            모든 업무 과정에서 공정성과 객관성을 최우선 가치로 삼아,
            <br className="hidden sm:inline" />
            고객과 사회로부터 신뢰받는 기관으로 자리매김하고 있습니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-base font-bold text-neutral-900 dark:text-white">지정기관</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">공인 지정기관</p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-base font-bold text-neutral-900 dark:text-white">평가기관</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">전문 평가기관</p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-base font-bold text-neutral-900 dark:text-white">정도관리</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">체계적 관리</p>
            </div>
          </div>
        </div>
      </Section>

      {/* E) 하단 CTA */}
      <Section variant="default" spacing="lg">
        <ServiceCta 
          message="전문가 상담이 필요하신가요?"
          subtitle="한국환경안전연구소의 전문 상담원이 신속하고 정확하게 안내해 드립니다"
        />
      </Section>
    </main>
  );
};

export default Greeting;
