import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  Award,
  Shield,
  Microscope,
  TrendingUp,
  Users,
  ChevronDown,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

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
      { period: "2006.7 - 현재", position: "(주)한국환경시험연구소" },
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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden bg-primary-600 dark:bg-primary-700 text-white py-20 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/company/KakaoTalk_20251216_093557685.jpg"
            alt="한국환경안전연구소 전경"
            className="w-full h-full object-cover opacity-40"
          />
          {/* 단순하고 강한 오버레이 */}
          <div className="absolute inset-0 bg-primary-600 dark:bg-primary-700"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/40"
            >
              <Shield className="w-5 h-5" />
              <span className="label-md font-semibold">CEO Message</span>
            </motion.div>

            <h1 className="text-display-lg md:text-display-lg lg:text-display-lg mb-6 font-bold">
              대표이사 인사말
            </h1>
            <p className="text-body-lg max-w-3xl mx-auto font-medium">
              한국환경안전연구소를 찾아주신 여러분께
              <br className="hidden sm:inline" />
              진심으로 감사드립니다
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-16 lg:h-24"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              className="text-neutral-50 dark:text-neutral-950"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content - Premium Layout */}
      <section className="section container-custom -mt-16 lg:-mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* CEO Profile Card - Premium Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden lg:sticky lg:top-24">
              {/* Decorative Header */}
              <div className="h-24 sm:h-32 bg-primary-600 dark:bg-primary-700 relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 -mt-12 sm:-mt-16 relative z-10">
                {/* CEO Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-neutral-800">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 text-primary-600 dark:text-primary-400" />
                </div>

                {/* CEO Info */}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-heading-md text-neutral-900 dark:text-white mb-2">
                    이정식
                  </h3>
                  <p className="text-body-lg font-medium text-primary-600 dark:text-primary-400 mb-1">
                    대표이사
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    한국환경안전연구소
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mb-6"></div>

                {/* Stats/Info */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      전문성
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                    <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      신뢰성
                    </div>
                  </div>
                </div>

                {/* Career Button */}
                <button
                  onClick={() => setShowCareer(!showCareer)}
                  className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl text-base font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>학력 및 경력 보기</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showCareer ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Career Details - Collapsible */}
                <AnimatePresence>
                  {showCareer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 space-y-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {/* Education */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h4 className="font-bold text-blue-900 dark:text-blue-300">
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
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
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
            </div>
          </motion.div>

          {/* CEO Message - Premium Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-8 lg:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Opening */}
                <div className="mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="text-heading-sm leading-relaxed text-neutral-900 dark:text-white">
                    안녕하십니까.
                    <br />
                    주식회사 한국환경안전연구소 대표이사{" "}
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      이정식
                    </span>
                    입니다.
                  </p>
                </div>

                {/* Main Content */}
                <div className="space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <p className="text-body-lg">
                    저희 한국환경안전연구소는 국민의 건강과 직결된 유해 환경에
                    대한 명확한 평가를 통해 인체 및 생태 영향을 예측·감시하고,
                    환경성 질환으로부터 국민의 건강을 보호하고자 설립된 환경
                    전문 기관입니다. 설립 이래 환경과 보건 분야 전반에 걸친
                    시험·분석과 측정 서비스를 통해 사회적 책임을 성실히 수행해
                    왔습니다.
                  </p>

                  <p className="text-body-md">
                    먹는물 수질검사, 실내공기질·작업환경 측정, 석면 조사·분석 등
                    다양한 환경 요소는 작은 오차 하나로도 큰 영향을 미칠 수
                    있습니다. 저희 연구소는 이러한 중요성을 깊이 인식하고, 국내
                    최고 수준의 기술력과 전문 인력을 기반으로 정확하고 신뢰할 수
                    있는 분석 결과를 제공하는 데 역량을 집중하고 있습니다.
                  </p>

                  <p className="text-body-md">
                    또한 단순한 측정과 분석에 그치지 않고, 지속적인 기술 개발과
                    체계적인 기술지원을 통해 고객이 필요로 하는 최적의 해결책을
                    제시하는 파트너가 되고자 합니다. 모든 업무 과정에서 공정성과
                    객관성을 최우선 가치로 삼아, 고객과 사회로부터 신뢰받는
                    기관으로 자리매김하고 있습니다.
                  </p>

                  <p className="text-body-md">
                    앞으로도 한국환경안전연구소는 환경 안전 분야의 전문
                    기관으로서 책임을 다하며, 더욱 체계적이고 선도적인 환경측정
                    및 분석 서비스를 제공함으로써, 고객 신뢰와 사회적 가치
                    실현을 위해 끊임없이 노력할 것입니다.
                  </p>

                  <p className="text-body-md">
                    여러분의 성원과 관심에 진심으로 감사드리며, 변함없는 신뢰로
                    보답하겠습니다.
                  </p>
                </div>

                {/* Closing */}
                <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-heading-sm text-neutral-900 dark:text-white mb-8">
                    감사합니다.
                  </p>

                  <div className="text-right">
                    <p className="text-body-lg font-bold text-neutral-900 dark:text-white">
                      주식회사 한국환경안전연구소
                    </p>
                    <p className="text-heading-sm text-primary-600 dark:text-primary-400 mt-2">
                      대표이사 이정식
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section - Premium Cards */}
      <section className="section container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-5 py-2 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="label-md text-primary-600 dark:text-primary-400">
              Core Values
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-heading-xl text-neutral-900 dark:text-white mb-4"
          >
            우리의 핵심 가치
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            한국환경안전연구소가 추구하는 가치와 비전
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {/* Value Card 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-700 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                신뢰성
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                정확하고 투명한 검사와 분석으로 고객의 신뢰를 최우선으로 합니다
              </p>
            </div>
          </motion.div>

          {/* Value Card 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-700 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-heading-md text-neutral-900 dark:text-white mb-4">
                전문성
              </h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                19년간의 축적된 경험과 최신 기술로 최고의 서비스를 제공합니다
              </p>
            </div>
          </motion.div>

          {/* Value Card 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-700 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-heading-md text-neutral-900 dark:text-white mb-4">
                정확성
              </h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                KOLAS 인증 기관으로서 정밀하고 신뢰할 수 있는 분석을 제공합니다
              </p>
            </div>
          </motion.div>

          {/* Value Card 4 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-700 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-heading-md text-neutral-900 dark:text-white mb-4">
                혁신성
              </h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                지속적인 연구개발로 환경안전 분야의 미래를 선도합니다
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 lg:py-32 bg-primary-600 dark:bg-primary-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
              <Users className="w-4 h-4" />
              <span className="label-md">Our Commitment</span>
            </div>

            <h2 className="text-heading-xl mb-8">
              고객과 사회를 향한 약속
            </h2>

            <p className="text-body-lg opacity-90 mb-12">
              한국환경안전연구소는 환경과 안전 분야의 전문 기관으로서
              <br className="hidden sm:inline" />
              사회적 책임을 다하며, 고객 여러분과 함께 더 나은 미래를
              만들어갑니다
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                <div className="text-4xl lg:text-5xl font-bold mb-2">650+</div>
                <div className="text-white/80">협력 고객사</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  8,500+
                </div>
                <div className="text-white/80">검사 건수</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                <div className="text-4xl lg:text-5xl font-bold mb-2">19년</div>
                <div className="text-white/80">신뢰의 역사</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Greeting;
