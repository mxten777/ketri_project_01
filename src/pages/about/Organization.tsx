import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Building,
  Award,
  Droplets,
  Wind,
  Shield,
} from "lucide-react";

const Organization = () => {
  const certifications = [
    { title: "KOLAS 시험기관 인정", type: "국가공인" },
    { title: "ISO/IEC 17025", type: "국제표준" },
    { title: "먹는물 수질검사업", type: "환경부 등록" },
    { title: "실내공기질 측정업", type: "환경부 등록" },
    { title: "석면 조사기관", type: "환경부 지정" },
    { title: "산업보건 서비스", type: "고용부 인정" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">조직도</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              전문성과 효율성을 바탕으로 한 체계적인 조직 구성
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Organization Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6 sm:mb-8">조직 현황</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-soft">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary-500 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                28
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                총 직원 수
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-soft">
              <Building className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                5
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                부서
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-soft">
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">
                85%
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                전문인력 비율
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-soft">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1 sm:mb-2">
                15+
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                보유 자격증
              </div>
            </div>
          </div>
        </motion.div>

        {/* Organization Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">
            조직 구성도
          </h3>

          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-soft">
            <div className="relative max-w-6xl mx-auto">
              {/* CEO Level */}
              <div className="flex flex-col items-center mb-0">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-premium"
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-center">
                    대표 이사
                  </div>
                </motion.div>

                {/* Main vertical line from CEO */}
                <div className="w-1 h-12 sm:h-16 lg:h-20 bg-blue-500"></div>
              </div>

              {/* Board Level with Center Line */}
              <div
                className="relative flex justify-center mb-0"
                style={{ height: "100px" }}
              >
                {/* Center vertical line continues */}
                <div className="w-1 h-full bg-blue-500 z-10"></div>

                {/* Board - positioned to the left with connecting line */}
                <div
                  className="absolute flex items-center"
                  style={{ left: "200px", right: "50%", top: "0px" }}
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg text-center ml-4 lg:ml-12"
                    style={{ minWidth: "140px" }}
                  >
                    <div className="text-base lg:text-lg font-bold">이사회</div>
                  </motion.div>
                  <div className="flex-1 h-1 bg-blue-500"></div>
                </div>
              </div>

              {/* Horizontal line for departments */}
              <div className="w-full h-1 bg-blue-500 mb-0"></div>

              {/* 6 Departments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mt-0">
                {/* 경영지원팀 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  {/* Connection Line Up */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-purple-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
                      <Building className="w-5 h-5" />
                      경영지원팀
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg font-medium">
                        인사
                      </div>
                      <div className="text-sm text-center py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg font-medium">
                        경리
                      </div>
                      <div className="text-sm text-center py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg font-medium">
                        총무(안내)
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 분석지원부 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      분석지원부
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium">
                        먹는물 분석
                      </div>
                      <div className="text-sm text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium">
                        실내공기질 분석
                      </div>
                      <div className="text-sm text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium">
                        석면 분석
                      </div>
                      <div className="text-sm text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium">
                        작업환경측정 분석
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 먹는물팀 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-cyan-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-2">
                      <Droplets className="w-5 h-5" />
                      먹는물팀
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg font-medium">
                        먹는물 검사
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 작업환경 측정팀 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-green-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      <span className="flex flex-col leading-tight">
                        <span>작업환경</span>
                        <span>측정팀</span>
                      </span>
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-green-50 dark:bg-green-900/20 rounded-lg font-medium">
                        작업환경 측정
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 생활환경팀 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-orange-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
                      <Wind className="w-5 h-5" />
                      생활환경팀
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg font-medium">
                        실내공기질 측정
                      </div>
                      <div className="text-sm text-center py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg font-medium">
                        석면 조사
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* R&D Center */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-500"></div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-lg border-t-4 border-pink-500 hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h4 className="font-bold text-center mb-4 text-lg text-pink-600 dark:text-pink-400 flex items-center justify-center gap-2">
                      <Award className="w-5 h-5" />
                      R&D Center
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-center py-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg font-medium">
                        R&D 팀
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            보유 인증 및 지정
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{cert.title}</h4>
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                      {cert.type}
                    </span>
                  </div>
                  <Award className="w-6 h-6 text-primary-500 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">문의하기</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-bold mb-2">주소</h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                충북 청주시 서원구 남이면 양동3길 7-30
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">전화</h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                043.237.7624~5
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">팩스</h4>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                043.237.7626
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Organization;
