import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Shield,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const Certificates = () => {
  const certificates = [
    // ISO 인증
    {
      category: "ISO 인증",
      title: "KOSHA-MS 인증서",
      number: "안전보건경영시스템",
      issuer: "한국산업안전보건공단",
      date: "2016",
      validity: "유효",
      scope: "안전보건경영시스템 인증",
      status: "active",
      color: "bg-blue-500",
    },
    {
      category: "ISO 인증",
      title: "기업부설연구소 인증서",
      number: "R&D Center",
      issuer: "한국산업기술진흥협회",
      date: "2009",
      validity: "유효",
      scope: "기업부설연구소 설립",
      status: "active",
      color: "bg-blue-500",
    },
    {
      category: "ISO 인증",
      title: "기술혁신형 중소기업 확인서",
      number: "Inno-Biz",
      issuer: "중소벤처기업부",
      date: "2010",
      validity: "유효",
      scope: "신기술혁신 중소기업 인증",
      status: "active",
      color: "bg-blue-500",
    },

    // 관련 자격 및 등록
    {
      category: "환경부 지정",
      title: "먹는물 지정서",
      number: "먹는물수질검사기관",
      issuer: "환경부",
      date: "2007",
      validity: "유효",
      scope: "먹는물, 지하수, 수돗물 등 수질검사",
      status: "active",
      color: "bg-cyan-500",
    },
    {
      category: "환경부 지정",
      title: "석면 지정서",
      number: "석면조사기관",
      issuer: "노동부",
      date: "2010",
      validity: "유효",
      scope: "석면 함유 조사 및 공기중 석면농도 측정",
      status: "active",
      color: "bg-orange-500",
    },
    {
      category: "환경부 지정",
      title: "석면감리 지정서",
      number: "석면해체작업 감리인",
      issuer: "충청북도청",
      date: "2019",
      validity: "유효",
      scope: "국가공인 석면해체작업 감리",
      status: "active",
      color: "bg-orange-500",
    },
    {
      category: "환경부 등록",
      title: "실내공기질 측정대행업 등록증",
      number: "실내공기질측정기관",
      issuer: "충청북도청",
      date: "2010",
      validity: "유효",
      scope: "다중이용시설 실내공기질 측정",
      status: "active",
      color: "bg-teal-500",
    },
    {
      category: "고용부 지정",
      title: "작업환경측정 지정서",
      number: "작업환경측정기관",
      issuer: "노동부",
      date: "2007",
      validity: "유효",
      scope: "작업환경측정, 건강진단 등",
      status: "active",
      color: "bg-purple-500",
    },
    {
      category: "정도관리",
      title: "정도관리검증서(먹는물)",
      number: "먹는물 정도관리",
      issuer: "환경부",
      date: "매년",
      validity: "유효",
      scope: "먹는물 수질검사 정도관리",
      status: "active",
      color: "bg-green-500",
    },
    {
      category: "정도관리",
      title: "정도관리검증서(실내공기질)",
      number: "실내공기질 정도관리",
      issuer: "환경부",
      date: "매년",
      validity: "유효",
      scope: "실내공기질 측정 정도관리",
      status: "active",
      color: "bg-green-500",
    },
    {
      category: "사업등록",
      title: "사업자등록증",
      number: "317-81-01323",
      issuer: "국세청",
      date: "2006",
      validity: "유효",
      scope: "사업자등록",
      status: "active",
      color: "bg-neutral-500",
    },
  ];

  const categories = [
    { name: "전체", count: certificates.length },
    {
      name: "ISO 인증",
      count: certificates.filter((c) => c.category === "ISO 인증").length,
    },
    {
      name: "환경부 지정",
      count: certificates.filter((c) => c.category === "환경부 지정").length,
    },
    {
      name: "환경부 등록",
      count: certificates.filter((c) => c.category === "환경부 등록").length,
    },
    {
      name: "고용부 지정",
      count: certificates.filter((c) => c.category === "고용부 지정").length,
    },
    {
      name: "정도관리",
      count: certificates.filter((c) => c.category === "정도관리").length,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 lg:py-32">
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
              <BadgeCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Certifications & Accreditations</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              인증 및 자격정보
            </h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              신뢰할 수 있는 전문 기관으로서의 자격과 인증<br className="hidden sm:inline" />
              국가 공인 및 국제 표준 인증 보유
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-16 lg:h-24">
            <path fill="currentColor" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" className="text-neutral-50 dark:text-neutral-950"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom -mt-16 lg:-mt-24 relative z-20">
        {/* Overview Stats - Premium Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-16"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-neutral-200 dark:border-neutral-700 text-center group cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {category.count}
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {category.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-5 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Our Certifications</span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            보유 인증 및 자격
          </h2>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            각 분야별 전문성을 인정받은 공인 인증서 목록
          </p>
        </div>

        {/* Certificates Grid - Premium Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-200 dark:border-neutral-700"
            >
              {/* Certificate Header - Gradient Banner */}
              <div className={`${cert.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10 flex items-start justify-between text-white">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 border border-white/30">
                      <Shield className="w-3 h-3" />
                      {cert.category}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2 leading-tight">{cert.title}</h3>
                    <p className="text-sm opacity-90 font-medium">{cert.number}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    <Award className="w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Issuer */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        발급기관
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-white">{cert.issuer}</div>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                          발급일
                        </div>
                        <div className="font-semibold text-neutral-900 dark:text-white text-sm">{cert.date}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                          유효기간
                        </div>
                        <div className="font-semibold text-neutral-900 dark:text-white text-sm">{cert.validity}</div>
                      </div>
                    </div>
                  </div>

                  {/* Scope */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        인정범위
                      </div>
                      <div className="font-medium text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {cert.scope}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      유효
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      title="다운로드"
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      className="p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      title="상세보기"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Process - Premium Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-5 py-2 rounded-full mb-6">
              <BadgeCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Process</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              인증 획득 과정
            </h2>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              체계적인 관리 프로세스를 통한 인증 취득 및 유지
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "1",
                title: "신청 및 준비",
                desc: "인증 요구사항 분석 및 문서 준비",
                color: "from-blue-500 to-blue-600",
                icon: "📋"
              },
              {
                step: "2",
                title: "심사 진행",
                desc: "전문 심사원에 의한 현장 심사",
                color: "from-green-500 to-green-600",
                icon: "🔍"
              },
              {
                step: "3",
                title: "검토 및 승인",
                desc: "심사 결과 검토 및 인증 승인",
                color: "from-orange-500 to-orange-600",
                icon: "✓"
              },
              {
                step: "4",
                title: "인증서 발급",
                desc: "최종 인증서 발급 및 사후관리",
                color: "from-purple-500 to-purple-600",
                icon: "🏆"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full">
                  {/* Step Number Badge */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="text-3xl mb-3 text-center">{item.icon}</div>
                  
                  {/* Content */}
                  <h3 className="font-bold text-lg mb-2 text-center text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="text-neutral-300 dark:text-neutral-600">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section - Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
              <Award className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-semibold">Contact Us</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              인증 관련 문의
            </h3>
            
            <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8 leading-relaxed">
              인증서 확인이나 관련 문의사항이 있으시면<br className="hidden sm:inline" />
              언제든지 연락해 주세요
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
              <a 
                href="tel:043-237-7624"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 border border-white/20 group"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-xl">📞</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/70 mb-1">전화</div>
                    <div className="text-sm sm:text-base font-bold">043-237-7624~5</div>
                  </div>
                </div>
              </a>

              <a 
                href="mailto:kesri0728@naver.com"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 border border-white/20 group"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-xl">✉️</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/70 mb-1">이메일</div>
                    <div className="text-xs sm:text-sm font-bold break-all">kesri0728@naver.com</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Certificates;
