import { useState, useEffect } from "react";
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
import { getNotices } from "../services/noticeService";
import type { Notice } from "../types";

const Home = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  useEffect(() => {
    fetchLatestNotices();
  }, []);

  const fetchLatestNotices = async () => {
    try {
      const data = await getNotices(5); // 최신 5개만 가져오기
      setNotices(data);
    } catch (error) {
      console.error("Failed to load notices:", error);
    } finally {
      setLoadingNotices(false);
    }
  };

  const formatDate = (timestamp: any) => {
    try {
      let date: Date;
      if (timestamp?.toDate) {
        date = timestamp.toDate();
      } else if (timestamp?.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        return '날짜 없음';
      }
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      return '날짜 없음';
    }
  };

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
      description:
        "KOLAS 인증으로 수돗물·지하수·정수기 등 59개 항목 수질검사 서비스",
      path: "/water-testing",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "혈액특성용수",
      description:
        "투석용수 21개 항목, 전처리용수 15개 항목 검사로 환자 안전 도모",
      path: "/dialysis-water",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "실내공기질 측정",
      description:
        "PM10, PM2.5, CO₂, 라돈 등 다중이용시설 9개 항목 실내공기질 측정",
      path: "/indoor-air-quality",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "석면조사·분석",
      description:
        "환경부 지정 석면조사기관으로 정성·정량분석 및 위해성 평가 서비스",
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
    { icon: <CheckCircle />, value: "19년", label: "신뢰의 경험" },
    { icon: <Users />, value: "650+", label: "협력 고객사" },
    { icon: <Award />, value: "11+", label: "보유 인증" },
    { icon: <TrendingUp />, value: "KOLAS", label: "공인 인증기관" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Figma Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary-600 dark:bg-primary-700 overflow-hidden">
        {/* 기하학적 패턴 배경 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            {/* 메인 타이틀 */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              신뢰할 수 있는
              <br />
              <span className="text-white drop-shadow-lg">환경안전 전문기관</span>
            </motion.h1>

            {/* 서브 타이틀 */}
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl mb-12 text-white/95 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              한국환경안전연구소
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/about/greeting">
                <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                  회사 소개
                </button>
              </Link>
              <Link to="/quote-request">
                <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                  견적 문의
                </button>
              </Link>
            </motion.div>

            {/* 통계 배지 */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <div className="text-white/80 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 하단 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section - 6개 카드 레이아웃 */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              주요 서비스
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              한국환경안전연구소가 제공하는
              <br className="hidden sm:block" />
              전문적이고 신뢰할 수 있는 서비스입니다
            </p>
          </motion.div>

          {/* 6개 서비스 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={service.path} className="block group">
                  <div className="relative h-full bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                    {/* 호버 시 배경 그라데이션 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* 아이콘 */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {service.icon}
                      </div>
                    </div>

                    {/* 타이틀 */}
                    <h3 className="relative z-10 text-2xl font-bold mb-4 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* 설명 */}
                    <p className="relative z-10 text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* 자세히 보기 링크 */}
                    <div className="relative z-10 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      자세히 보기
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* 장식 요소 */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              왜 KESRI를 선택해야 할까요?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              19년간의 검증된 전문성과 체계적인 품질관리 시스템으로
              <br className="hidden sm:block" />
              고객의 신뢰를 얻고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-500 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                KOLAS 공인인증
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                국가공인시험기관으로서 공신력 있는 검사 결과를 제공하며,
                국제적으로 인정받는 품질관리 시스템을 운영합니다
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-500 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                신속한 검사 처리
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                체계적인 검사 프로세스와 최신 장비를 통해 평균 3-5일 내 정확한
                검사 결과를 제공합니다
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-500 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                전문가 컨설팅
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                각 분야별 전문가가 검사 결과 해석부터 개선방안 제시까지 맞춤형
                컨설팅 서비스를 제공합니다
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="section bg-gray-50 dark:bg-gray-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              최신 공지사항
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              한국환경안전연구소의 새로운 소식과 중요한 공지사항을 확인하세요
            </p>
          </motion.div>

          {loadingNotices ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notices.slice(0, 5).map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link to={`/board/notice/${notice.id}`}>
                    <Card hover className="p-6 h-full flex flex-col shadow-md hover:shadow-xl bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-[#0069FF] rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {notice.isPinned && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              중요
                            </span>
                          )}
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {formatDate(notice.createdAt)}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 line-clamp-2 leading-relaxed">
                        {notice.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-auto flex items-center hover:text-[#0069FF] transition-colors">
                        자세히 보기
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/board/notice">
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:border-gray-500 dark:text-white dark:hover:bg-primary-600">
                전체 공지사항 보기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="section bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                고객의 신뢰를 바탕으로
                <br />
                성장해온 19년
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
                2006년 설립 이후 650여 고객사와 함께 성장하며, 8,500건 이상의
                검사를 성공적으로 수행했습니다. 정확하고 신속한 서비스로 95%의
                고객 만족도를 달성했습니다.
              </p>
              <Link to="/about/greeting">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0069FF] dark:hover:bg-neutral-100 transition-all duration-300 font-bold shadow-lg"
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
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-3">650+</div>
                <div className="text-base text-white/90">협력 고객사</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-3">8,500+</div>
                <div className="text-base text-white/90">검사 건수</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-3">95%</div>
                <div className="text-base text-white/90">고객 만족도</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-3">19년</div>
                <div className="text-base text-white/90">신뢰의 경험</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white dark:bg-gray-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              검사 진행 과정
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              체계적인 4단계 프로세스로 정확하고 신속한 검사 서비스를 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "문의 및 상담",
                description: "전문 상담원이 검사 항목과 일정을 안내해드립니다",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "bg-[#0069FF]",
              },
              {
                step: "02",
                title: "시료 접수",
                description: "직접 방문 또는 택배로 시료를 접수받습니다",
                icon: <Package className="w-8 h-8" />,
                color: "bg-cyan-500",
              },
              {
                step: "03",
                title: "검사 수행",
                description:
                  "KOLAS 인증 장비와 표준절차로 정확한 검사를 실시합니다",
                icon: <Search className="w-8 h-8" />,
                color: "bg-purple-500",
              },
              {
                step: "04",
                title: "결과 발송",
                description:
                  "검사 완료 후 공식 성적서와 해석 자료를 제공합니다",
                icon: <FileText className="w-8 h-8" />,
                color: "bg-green-500",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="relative mb-6">
                  <div className={`${process.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg`}>
                    {process.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  {process.title}
                </h3>
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
      <section className="section bg-gray-50 dark:bg-gray-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
              빠른 서비스
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              원하시는 서비스를 바로 이용하세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "공지사항",
                description: "최신 소식을 확인하세요",
                path: "/board/notices",
                icon: <FileText className="w-8 h-8" />,
                color: "bg-[#0069FF]",
              },
              {
                title: "견적 요청",
                description: "검사 견적을 문의하세요",
                path: "/quote-request",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "bg-cyan-500",
              },
              {
                title: "서비스 소개",
                description: "검사 서비스를 확인하세요",
                path: "/industrial-health",
                icon: <CheckCircle className="w-8 h-8" />,
                color: "bg-purple-500",
              },
              {
                title: "질문답변",
                description: "궁금한 사항을 문의하세요",
                path: "/board/qna",
                icon: <Users className="w-8 h-8" />,
                color: "bg-green-500",
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
                  <Card hover className="p-8 text-center h-full flex flex-col items-center shadow-md hover:shadow-xl bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                    <div className={`${action.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
      <section className="section bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              전문적인 환경안전 서비스가 필요하신가요?
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed">
              한국환경안전연구소의 전문가가 최적의 솔루션을 제공해드립니다
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/quote-request" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[#0069FF] hover:bg-neutral-100 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold"
                >
                  무료 견적 받기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about/greeting" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#0069FF] dark:hover:bg-neutral-100 transition-all duration-300 font-bold"
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
