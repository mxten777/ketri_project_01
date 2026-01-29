import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Building,
  Award,
  Droplets,
  Wind,
  Shield,
  Briefcase,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import ServiceCta from "@/components/common/ServiceCta";

const Organization = () => {
  const certifications = [
    { title: "ISO/IEC 17025", type: "국제표준" },
    { title: "먹는물 수질검사업", type: "환경부 등록" },
    { title: "실내공기질 측정업", type: "환경부 등록" },
    { title: "석면 조사기관", type: "환경부 지정" },
    { title: "산업보건 서비스", type: "고용부 인정" },
  ];

  const departments = [
    {
      name: "경영지원팀",
      icon: Building,
      color: "blue",
      teams: ["인사", "경리", "총무(안내)"],
    },
    {
      name: "분석지원부",
      icon: Users,
      color: "indigo",
      teams: ["먹는물 분석", "실내공기질 분석", "석면 분석", "작업환경측정 분석"],
    },
    {
      name: "먹는물팀",
      icon: Droplets,
      color: "cyan",
      teams: ["먹는물 검사"],
    },
    {
      name: "작업환경 측정팀",
      icon: Shield,
      color: "green",
      teams: ["작업환경 측정"],
    },
    {
      name: "생활환경팀",
      icon: Wind,
      color: "orange",
      teams: ["실내공기질 측정", "석면 조사"],
    },
    {
      name: "R&D Center",
      icon: Award,
      color: "purple",
      teams: ["R&D 팀"],
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Section variant="brand" spacing="xl" className="text-neutral-900 dark:text-white bg-gradient-to-br from-blue-600 to-blue-700">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">조직도</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            전문성과 효율성을 바탕으로 한 체계적인 조직 구성
          </p>
        </motion.div>
      </Section>

      <Section spacing="lg" className="py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
            조직 현황
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-10">
            체계적인 조직 운영을 통한 전문 서비스 제공
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="text-center">
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">28</div>
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">총 직원 수</div>
            </Card>

            <Card className="text-center">
              <Building className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">5</div>
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">부서</div>
            </Card>

            <Card className="text-center">
              <UserCheck className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">85<span className="text-2xl">%</span></div>
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">전문인력 비율</div>
            </Card>

            <Card className="text-center">
              <Award className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">15<span className="text-2xl">+</span></div>
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">보유 자격증</div>
            </Card>
          </div>
        </motion.div>
      </Section>

      <Section spacing="lg" className="bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-neutral-900 dark:text-neutral-50">
            조직 구성도
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-center mb-12">
            각 부서의 전문성을 바탕으로 최상의 서비스를 제공합니다
          </p>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col items-center gap-6">
              <Card className="w-full max-w-md text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">대표 이사</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">총괄 경영</p>
              </Card>

              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-600"></div>

              <Card className="w-full max-w-sm text-center border-t-2 border-blue-500">
                <Users className="w-10 h-10 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">이사회</h3>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              const colorClasses = {
                blue: "border-blue-400 dark:border-blue-600",
                indigo: "border-indigo-400 dark:border-indigo-600",
                cyan: "border-cyan-400 dark:border-cyan-600",
                green: "border-green-400 dark:border-green-600",
                orange: "border-orange-400 dark:border-orange-600",
                purple: "border-purple-400 dark:border-purple-600",
              };
              const iconColorClasses = {
                blue: "text-blue-500 dark:text-blue-400",
                indigo: "text-indigo-500 dark:text-indigo-400",
                cyan: "text-cyan-500 dark:text-cyan-400",
                green: "text-green-500 dark:text-green-400",
                orange: "text-orange-500 dark:text-orange-400",
                purple: "text-purple-500 dark:text-purple-400",
              };
              const bgColorClasses = {
                blue: "bg-neutral-50 dark:bg-neutral-800/50",
                indigo: "bg-neutral-50 dark:bg-neutral-800/50",
                cyan: "bg-neutral-50 dark:bg-neutral-800/50",
                green: "bg-neutral-50 dark:bg-neutral-800/50",
                orange: "bg-neutral-50 dark:bg-neutral-800/50",
                purple: "bg-neutral-50 dark:bg-neutral-800/50",
              };

              return (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className={`border-t-2 ${colorClasses[dept.color as keyof typeof colorClasses]} hover:shadow-lg transition-shadow duration-300`}>
                    <Icon className={`w-10 h-10 mx-auto mb-4 ${iconColorClasses[dept.color as keyof typeof iconColorClasses]}`} />
                    <h3 className="text-lg font-bold text-center mb-4 text-neutral-900 dark:text-neutral-50">
                      {dept.name}
                    </h3>
                    <div className="space-y-2">
                      {dept.teams.map((team) => (
                        <div
                          key={team}
                          className={`text-sm text-center py-2 rounded-lg font-medium ${bgColorClasses[dept.color as keyof typeof bgColorClasses]} text-neutral-700 dark:text-neutral-300`}
                        >
                          {team}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Section>

      <Section spacing="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-neutral-900 dark:text-neutral-50">
            보유 인증 및 지정
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-center mb-12">
            공신력 있는 인증으로 검증된 전문성
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="border-l-2 border-blue-400 dark:border-blue-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-3 text-neutral-900 dark:text-neutral-50">
                        {cert.title}
                      </h4>
                      <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium">
                        {cert.type}
                      </span>
                    </div>
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      <ServiceCta message="조직에 대해 더 궁금하신가요?" subtitle="전문 인력과 체계적인 조직 구성으로 최상의 서비스를 제공합니다" />
    </main>
  );
};

export default Organization;
