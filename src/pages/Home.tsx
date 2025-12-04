import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  // 주요 서비스 데이터
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: '산업보건컨설팅',
      description: '근골격계 유해요인조사, 화학물질관리 등 산업보건 전문 컨설팅 서비스',
      path: '/industrial-health',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: '먹는물 검사',
      description: '수돗물, 지하수, 먹는샘물 등 다양한 수질검사 서비스 제공',
      path: '/water-testing',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: '혈액특성용수',
      description: '투석용수 검사 전문기관으로 정확하고 신속한 검사 서비스',
      path: '/dialysis-water',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: '실내공기질 측정',
      description: '다중이용시설 실내공기질 측정 및 관리 전문 서비스',
      path: '/indoor-air-quality',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '석면조사·분석',
      description: '석면조사, 위해성평가, 공기질측정 등 종합 석면 관리 서비스',
      path: '/asbestos',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: '게시판/자료실',
      description: '공지사항, 자료실, 질문답변 등 다양한 정보 제공',
      path: '/board',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  // 통계 데이터
  const stats = [
    { icon: <CheckCircle />, value: '15,000+', label: '검사 건수' },
    { icon: <Users />, value: '1,200+', label: '협력 고객사' },
    { icon: <Award />, value: '25+', label: '보유 인증' },
    { icon: <TrendingUp />, value: '98%', label: '고객 만족도' },
  ];

  // 최신 공지사항 (더미 데이터)
  const notices = [
    { id: 1, title: '2024년 설 연휴 휴무 안내', date: '2024-01-20', isImportant: true },
    { id: 2, title: '먹는물 수질검사 항목 추가 안내', date: '2024-01-15', isImportant: false },
    { id: 3, title: '실내공기질 측정 견적 문의 이벤트', date: '2024-01-10', isImportant: false },
    { id: 4, title: '석면조사 분석 서비스 확대', date: '2024-01-05', isImportant: false },
    { id: 5, title: '홈페이지 리뉴얼 안내', date: '2024-01-01', isImportant: true },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
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
              산업보건·먹는물·석면·실내공기질 전문 시험연구기관
              <br className="hidden sm:block" />
              한국환경안전연구소가 함께합니다
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/industrial-health">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  서비스 둘러보기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/board/qna">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
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
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4`}>
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
                <div className="text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-md">최신 공지사항</h2>
            <Link to="/board/notices" className="text-primary-500 hover:text-primary-600 flex items-center">
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
                      <span className="badge badge-danger flex-shrink-0">중요</span>
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
              { title: '성적서 조회', description: '발급받은 성적서를 확인하세요', path: '/certificate-lookup', icon: <FileText /> },
              { title: '견적 요청', description: '검사 견적을 문의하세요', path: '/quote-request', icon: <TrendingUp /> },
              { title: '검사 의뢰', description: '온라인으로 검사를 신청하세요', path: '/request', icon: <CheckCircle /> },
              { title: '문의하기', description: '궁금한 사항을 문의하세요', path: '/board/qna', icon: <Users /> },
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
                <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  무료 견적 받기
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
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
