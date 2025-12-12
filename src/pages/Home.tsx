import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  Droplets,
  FlaskConical,
  Wind,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Clock,
  MessageCircle,
  Package,
  Search,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const Home = () => {
  // 주요 서비스 데이터
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "산업보건컨설팅",
      description:
        "작업환경측정, 근골격계질환 예방, 화학물질 위해성 평가 등 산업보건 전문 서비스",
      path: "/industrial-health",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "먹는물 검사",
      description: "KOLAS 인증으로 수돗물·지하수·정수기 등 59개 항목 수질검사 서비스",
      path: "/water-testing",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "혈액특성용수",
      description: "투석용수 21개 항목, 전처리용수 15개 항목 검사로 환자 안전 도모",
      path: "/dialysis-water",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "실내공기질 측정",
      description: "PM10, PM2.5, CO₂, 라돈 등 다중이용시설 9개 항목 실내공기질 측정",
      path: "/indoor-air-quality",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "석면조사·분석",
      description: "환경부 지정 석면조사기관으로 정성·정량분석 및 위해성 평가 서비스",
      path: "/asbestos",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "게시판/자료실",
      description: "공지사항, 자료실, 질문답변 등 다양한 정보 제공",
      path: "/board",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // 통계 데이터
  const stats = [
    { icon: <CheckCircle />, value: "8,500+", label: "검사 건수" },
    { icon: <Users />, value: "650+", label: "협력 고객사" },
    { icon: <Award />, value: "12+", label: "보유 인증" },
    { icon: <TrendingUp />, value: "95%", label: "고객 만족도" },
  ];

  // 최신 공지사항 (더미 데이터)
  const notices = [
    {
      id: 1,
      title: "2024년 설 연휴 휴무 안내",
      date: "2024-01-20",
      isImportant: true,
    },
    {
      id: 2,
      title: "먹는물 수질검사 항목 추가 안내",
      date: "2024-01-15",
      isImportant: false,
    },
    {
      id: 3,
      title: "실내공기질 측정 견적 문의 이벤트",
      date: "2024-01-10",
      isImportant: false,
    },
    {
      id: 4,
      title: "석면조사 분석 서비스 확대",
      date: "2024-01-05",
      isImportant: false,
    },
    {
      id: 5,
      title: "홈페이지 리뉴얼 안내",
      date: "2024-01-01",
      isImportant: true,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              신뢰할 수 있는
              <br />
              환경안전 전문기관
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              KOLAS 인증 시험기관으로 2017년부터 축적된 전문성과 신뢰성
              <br className="hidden sm:block" />
              정확하고 신속한 검사 서비스로 고객만족을 실현합니다
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/industrial-health">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-neutral-100"
                >
                  서비스 둘러보기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/board/qna">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  견적 문의하기
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">주요 서비스</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              다양한 분야의 전문 검사 및 컨설팅 서비스를 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={service.path}>
                  <Card hover className="p-6 h-full">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary-500 font-medium">
                      자세히 보기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-white dark:bg-neutral-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">왜 KETRI를 선택해야 할까요?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              7년간의 검증된 전문성과 체계적인 품질관리 시스템으로 고객의 신뢰를 얻고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                KOLAS 공인인증
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                국가공인시험기관으로서 공신력 있는 검사 결과를 제공하며, 
                국제적으로 인정받는 품질관리 시스템을 운영합니다
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                신속한 검사 처리
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                체계적인 검사 프로세스와 최신 장비를 통해 
                평균 3-5일 내 정확한 검사 결과를 제공합니다
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                전문가 컨설팅
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                각 분야별 전문가가 검사 결과 해석부터 개선방안 제시까지 
                맞춤형 컨설팅 서비스를 제공합니다
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-md">최신 공지사항</h2>
            <Link
              to="/board/notices"
              className="text-primary-500 hover:text-primary-600 flex items-center"
            >
              전체보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <Card className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                to={`/board/notices/${notice.id}`}
                className="block p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {notice.isImportant && (
                      <span className="badge badge-danger flex-shrink-0">
                        중요
                      </span>
                    )}
                    <span className="text-neutral-900 dark:text-white truncate">
                      {notice.title}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500 ml-4 flex-shrink-0">
                    {notice.date}
                  </span>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">
                고객의 신뢰를 바탕으로
                <br />성장해온 7년
              </h2>
              <p className="text-lg text-white/90 mb-8">
                2017년 설립 이후 650여 고객사와 함께 성장하며, 
                8,500건 이상의 검사를 성공적으로 수행했습니다. 
                정확하고 신속한 서비스로 95%의 고객 만족도를 달성했습니다.
              </p>
              <Link to="/about/greeting">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  회사 소개 보기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">650+</div>
                <div className="text-white/80">협력 고객사</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">8,500+</div>
                <div className="text-white/80">검사 건수</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80">고객 만족도</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">7년</div>
                <div className="text-white/80">신뢰의 경험</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">검사 진행 과정</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              체계적인 4단계 프로세스로 정확하고 신속한 검사 서비스를 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "문의 및 상담",
                description: "전문 상담원이 검사 항목과 일정을 안내해드립니다",
                icon: <MessageCircle className="w-8 h-8" />
              },
              {
                step: "02", 
                title: "시료 접수",
                description: "직접 방문 또는 택배로 시료를 접수받습니다",
                icon: <Package className="w-8 h-8" />
              },
              {
                step: "03",
                title: "검사 수행",
                description: "KOLAS 인증 장비와 표준절차로 정확한 검사를 실시합니다",
                icon: <Search className="w-8 h-8" />
              },
              {
                step: "04",
                title: "결과 발송",
                description: "검사 완료 후 공식 성적서와 해석 자료를 제공합니다",
                icon: <FileText className="w-8 h-8" />
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                  <div className="text-primary-600 dark:text-primary-400">
                    {process.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                  {process.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {process.description}
                </p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-neutral-300 dark:bg-neutral-600"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">빠른 서비스</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              원하시는 서비스를 바로 이용하세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "성적서 조회",
                description: "발급받은 성적서를 확인하세요",
                path: "/certificate-lookup",
                icon: <FileText />,
              },
              {
                title: "견적 요청",
                description: "검사 견적을 문의하세요",
                path: "/quote-request",
                icon: <TrendingUp />,
              },
              {
                title: "검사 의뢰",
                description: "온라인으로 검사를 신청하세요",
                path: "/request",
                icon: <CheckCircle />,
              },
              {
                title: "문의하기",
                description: "궁금한 사항을 문의하세요",
                path: "/board/qna",
                icon: <Users />,
              },
            ].map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={action.path}>
                  <Card hover className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-2xl mb-4">
                      {action.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              전문적인 환경안전 서비스가 필요하신가요?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              한국환경안전연구소의 전문가가 최적의 솔루션을 제공해드립니다
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/board/qna">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-neutral-100"
                >
                  무료 견적 받기
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  회사 소개 보기
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
