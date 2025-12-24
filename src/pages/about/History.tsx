import { motion } from "framer-motion";
import {
  Calendar,
  Building,
  Award,
  Users,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
 
const History = () => {
  const historyData = [
    {
      year: "2020",
      month: "10",
      events: ["기술유출방지시스템 구축"],
    },
    {
      year: "2019",
      month: "09",
      events: ["신사옥 신축 이전"],
    },
    {
      year: "2019",
      month: "08",
      events: ["국가공인 석면해체작업 감리인 등록(충청북도청)"],
    },
    {
      year: "2016",
      month: "12",
      events: ["안전보건경영시스템(KOSHA-MS)인증(한국산업안전보건공단)"],
    },
    {
      year: "2015",
      month: "10",
      events: ["상호변경 ((유)한국환경안전연구소)"],
    },
    {
      year: "2010",
      month: "12",
      events: [
        "자본금 증자(4억3백)",
        "국가공인 실내공기질측정기관 지정(충청북도청)",
      ],
    },
    {
      year: "2010",
      month: "11",
      events: ["신기술혁신 중소기업(Inno-Biz)인증"],
    },
    {
      year: "2010",
      month: "10",
      events: ["본사 사무동 증축"],
    },
    {
      year: "2010",
      month: "06",
      events: ["자본금 증자(3억9천)"],
    },
    {
      year: "2010",
      month: "02",
      events: ["국가공인 석면조사기관 지정(노동부)"],
    },
    {
      year: "2009",
      month: "12",
      events: ["자본금 증자(2억7천)"],
    },
    {
      year: "2009",
      month: "07",
      events: ["기업부설연구소(R&D Center)설립"],
    },
    {
      year: "2007",
      month: "05",
      events: ["국가공인 작업환경측정기관 지정(노동부)"],
    },
    {
      year: "2007",
      month: "04",
      events: ["국가공인 먹는물수질검사기관 지정(환경부)"],
    },
    {
      year: "2006",
      month: "07",
      events: ["(주)한국환경시험연구소 설립"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-700">
      {/* Hero Section - Premium Design */}
      <section data-has-hero className="relative overflow-hidden bg-primary-600 dark:bg-primary-700 text-white py-20 lg:py-32">
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="label-md">Our Journey</span>
            </motion.div>

            <h1 className="text-display-lg mb-6">
              한국환경안전연구소의 역사
            </h1>
            <p className="text-body-lg opacity-90 max-w-3xl mx-auto">
              2006년부터 시작된 성장과 혁신의 19년
              <br className="hidden sm:inline" />
              신뢰와 전문성으로 함께 걸어온 길
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

      {/* Stats Section - Premium Cards */}
      <section className="pt-10 lg:pt-12 pb-12 lg:pb-16 container-custom relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="text-display-sm text-primary-600 dark:text-primary-400 mb-1 text-center">
              19년
            </div>
            <div className="label-md text-neutral-600 dark:text-neutral-400 text-center">
              설립 년차
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="w-14 h-14 bg-primary-500 dark:bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-7 h-7 text-white" />
            </div>
            <div className="text-display-sm text-primary-600 dark:text-primary-400 mb-1 text-center">
              5개
            </div>
            <div className="label-md text-neutral-600 dark:text-neutral-400 text-center">
              주요 사업영역
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="text-display-sm text-success-500 mb-1 text-center">
              10+
            </div>
            <div className="label-md text-neutral-600 dark:text-neutral-400 text-center">
              인증 및 지정
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="text-display-sm text-warning-500 mb-1 text-center">
              25+
            </div>
            <div className="label-md text-neutral-600 dark:text-neutral-400 text-center">
              전문 인력
            </div>
          </motion.div>
        </motion.div>

        {/* History Timeline - Vertical Modern Design */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-5 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="label-md text-primary-600 dark:text-primary-400">
                Our Milestones
              </span>
            </motion.div>

            <h2 className="text-heading-xl text-neutral-900 dark:text-white mb-4">
              주요 성과 및 발전 과정
            </h2>

            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              한국환경안전연구소의 주요 이정표와 성장의 역사
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-500 dark:bg-primary-600 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-12">
              {historyData.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.month}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side */}
                    {index % 2 === 0 ? (
                      <>
                        <div className="text-right pr-12">
                          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 inline-block">
                            <ul className="space-y-3 text-left">
                              {item.events.map((event, eventIndex) => (
                                <li
                                  key={eventIndex}
                                  className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-body-sm">
                                    {event}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Center Year Badge */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-24 bg-primary-600 dark:bg-primary-700 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-white dark:border-neutral-900">
                          <span className="text-white font-bold text-body-lg">
                            {item.year}
                          </span>
                          <span className="text-white text-xs opacity-80">
                            {item.month}월
                          </span>
                        </div>

                        {/* Right Side - Empty */}
                        <div></div>
                      </>
                    ) : (
                      <>
                        {/* Left Side - Empty */}
                        <div></div>

                        {/* Center Year Badge */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-24 bg-primary-600 dark:bg-primary-700 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-white dark:border-neutral-900">
                          <span className="text-white font-bold text-lg">
                            {item.year}
                          </span>
                          <span className="text-white text-xs opacity-80">
                            {item.month}월
                          </span>
                        </div>

                        {/* Right Side */}
                        <div className="pl-12">
                          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 inline-block">
                            <ul className="space-y-3 text-left">
                              {item.events.map((event, eventIndex) => (
                                <li
                                  key={eventIndex}
                                  className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-body-sm">
                                    {event}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden flex gap-4">
                    {/* Year Badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 dark:bg-primary-700 rounded-xl shadow-lg flex flex-col items-center justify-center">
                      <span className="text-white font-bold label-md">
                        {item.year}
                      </span>
                      <span className="text-white text-xs opacity-80">
                        {item.month}월
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700">
                        <ul className="space-y-3">
                          {item.events.map((event, eventIndex) => (
                            <li
                              key={eventIndex}
                              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-body-sm">
                                {event}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Section - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-primary-600 dark:bg-primary-700 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-semibold">
                Our Vision
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
              미래를 향한 비전
            </h3>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed opacity-90 mb-6 sm:mb-8">
              한국환경안전연구소는 지속가능한 환경과 안전한 사회를 만들기 위해
              끊임없이 연구하고 발전해 나가겠습니다. 앞으로도 고객 여러분의
              신뢰를 바탕으로{" "}
              <span className="font-bold underline decoration-2 underline-offset-4">
                환경안전 분야의 선도기관
              </span>
              으로 성장하겠습니다.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-white/20">
                <span className="text-sm sm:text-base font-semibold">
                  지속가능성
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-white/20">
                <span className="text-sm sm:text-base font-semibold">혁신</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-white/20">
                <span className="text-sm sm:text-base font-semibold">신뢰</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-white/20">
                <span className="text-sm sm:text-base font-semibold">
                  전문성
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default History;
