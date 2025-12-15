import { motion } from "framer-motion";
import { Users, UserCheck, Building, Award } from "lucide-react";

const Organization = () => {
  const departments = [
    {
      name: "대표이사",
      description: "전체 경영 총괄",
      members: 1,
      color: "bg-purple-500",
    },
    {
      name: "경영관리팀",
      description: "경영기획, 인사, 재무, 총무",
      members: 3,
      color: "bg-blue-500",
    },
    {
      name: "영업팀",
      description: "고객관리, 수주, 마케팅",
      members: 4,
      color: "bg-green-500",
    },
    {
      name: "기술연구팀",
      description: "연구개발, 기술지원, 품질관리",
      members: 8,
      color: "bg-orange-500",
    },
    {
      name: "분석팀",
      description: "시료분석, 현장조사, 측정업무",
      members: 12,
      color: "bg-red-500",
    },
  ];

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
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
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
          <h2 className="heading-lg mb-8">조직 현황</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                28
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                총 직원 수
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
              <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                부서
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
              <UserCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                85%
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                전문인력 비율
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                15+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
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
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12">조직 구성</h3>

          {/* CEO Level */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg">
              <div className="font-bold text-lg">대표이사</div>
              <div className="text-sm opacity-90">CEO</div>
            </div>
          </div>

          {/* Departments Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.slice(1).map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft border-t-4 border-primary-500"
              >
                <div
                  className={`w-4 h-4 ${dept.color} rounded-full mx-auto mb-4`}
                ></div>
                <h4 className="font-bold text-lg mb-2">{dept.name}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  {dept.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Users size={16} className="text-primary-500" />
                  <span className="font-medium">{dept.members}명</span>
                </div>
              </motion.div>
            ))}
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
          className="text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
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
