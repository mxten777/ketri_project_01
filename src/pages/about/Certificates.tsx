import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  Calendar,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      category: "KOLAS 인정",
      title: "KOLAS 시험기관 인정서",
      number: "KT-###",
      issuer: "한국인정기구 (KOLAS)",
      date: "2024.03.15",
      validity: "2027.03.14",
      scope: "환경시험, 산업보건 시험",
      status: "active",
      color: "bg-blue-500",
    },
    {
      category: "ISO 인증",
      title: "ISO/IEC 17025 인증서",
      number: "ISO-###",
      issuer: "국제표준화기구 (ISO)",
      date: "2023.11.20",
      validity: "2026.11.19",
      scope: "시험 및 교정 실험실 역량 인정",
      status: "active",
      color: "bg-green-500",
    },
    {
      category: "환경부 등록",
      title: "먹는물 수질검사업 등록증",
      number: "환경부-###",
      issuer: "환경부",
      date: "2023.08.10",
      validity: "무기한",
      scope: "먹는물, 지하수, 수돗물 등 수질검사",
      status: "active",
      color: "bg-cyan-500",
    },
    {
      category: "환경부 등록",
      title: "실내공기질 측정업 등록증",
      number: "환경부-###",
      issuer: "환경부",
      date: "2023.06.05",
      validity: "무기한",
      scope: "다중이용시설 실내공기질 측정",
      status: "active",
      color: "bg-teal-500",
    },
    {
      category: "환경부 지정",
      title: "석면 조사기관 지정서",
      number: "환경부-###",
      issuer: "환경부",
      date: "2022.12.20",
      validity: "2025.12.19",
      scope: "석면 함유 조사 및 공기중 석면농도 측정",
      status: "active",
      color: "bg-orange-500",
    },
    {
      category: "고용부 인정",
      title: "산업보건 서비스기관 인정서",
      number: "고용부-###",
      issuer: "고용노동부",
      date: "2022.09.15",
      validity: "2025.09.14",
      scope: "작업환경측정, 건강진단 등",
      status: "active",
      color: "bg-purple-500",
    },
    {
      category: "품질인증",
      title: "품질경영시스템 인증서",
      number: "QMS-###",
      issuer: "한국품질재단",
      date: "2023.04.10",
      validity: "2026.04.09",
      scope: "ISO 9001:2015 품질경영시스템",
      status: "active",
      color: "bg-indigo-500",
    },
    {
      category: "환경인증",
      title: "환경경영시스템 인증서",
      number: "EMS-###",
      issuer: "한국환경공단",
      date: "2023.02.28",
      validity: "2026.02.27",
      scope: "ISO 14001:2015 환경경영시스템",
      status: "active",
      color: "bg-emerald-500",
    },
  ];

  const categories = [
    { name: "전체", count: certificates.length },
    {
      name: "KOLAS 인정",
      count: certificates.filter((c) => c.category === "KOLAS 인정").length,
    },
    {
      name: "ISO 인증",
      count: certificates.filter((c) => c.category === "ISO 인증").length,
    },
    {
      name: "환경부 등록",
      count: certificates.filter((c) => c.category === "환경부 등록").length,
    },
    {
      name: "기타",
      count: certificates.filter(
        (c) => !["KOLAS 인정", "ISO 인증", "환경부 등록"].includes(c.category)
      ).length,
    },
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">인증서</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소가 보유한 각종 인증서와 등록증
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {category.count}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {category.name}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Certificate Header */}
              <div className={`${cert.color} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3">
                      {cert.category}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                    <p className="text-sm opacity-90">{cert.number}</p>
                  </div>
                  <Award className="w-8 h-8 opacity-80" />
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-neutral-400" />
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        발급기관
                      </div>
                      <div className="font-medium">{cert.issuer}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          발급일
                        </div>
                        <div className="font-medium">{cert.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          유효기간
                        </div>
                        <div className="font-medium">{cert.validity}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        인정범위
                      </div>
                      <div className="font-medium text-sm">{cert.scope}</div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      유효
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-primary-500 transition-colors">
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-primary-500 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="heading-lg text-center mb-12">인증 획득 과정</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1
                </span>
              </div>
              <h3 className="font-bold mb-2">신청 및 준비</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                인증 요구사항 분석 및 문서 준비
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  2
                </span>
              </div>
              <h3 className="font-bold mb-2">심사 진행</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                전문 심사원에 의한 현장 심사
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  3
                </span>
              </div>
              <h3 className="font-bold mb-2">검토 및 승인</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                심사 결과 검토 및 인증 승인
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  4
                </span>
              </div>
              <h3 className="font-bold mb-2">인증서 발급</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                최종 인증서 발급 및 사후관리
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">인증 관련 문의</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            인증서 확인이나 관련 문의사항이 있으시면 언제든지 연락해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white dark:bg-neutral-800 px-6 py-3 rounded-xl">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                전화
              </span>
              <div className="font-bold">043.237.7624~5</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 px-6 py-3 rounded-xl">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                팩스
              </span>
              <div className="font-bold">043.237.7626</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Certificates;
