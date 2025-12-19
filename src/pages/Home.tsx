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
import { logError } from "../utils/logger";

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
      logError("Failed to load notices:", error);
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
      {/* Hero Section - 간결하고 임팩트 있게 */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 dark:from-primary-700 dark:via-primary-800 dark:to-blue-900 overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            {/* 메인 타이틀 */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              신뢰할 수 있는
              <br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                환경안전 전문기관
              </span>
            </motion.h1>

            {/* 서브 타이틀 */}
            <motion.p
              className="text-2xl sm:text-3xl mb-8 text-white/90 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              한국환경안전연구소
            </motion.p>

            <motion.p
              className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              산업보건 · 먹는물 · 석면 · 실내공기질 분야의 KOLAS 공인 전문기관
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link to="/quote-request">
                <button className="px-10 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-blue-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                  무료 견적 문의
                </button>
              </Link>
              <Link to="/industrial-health">
                <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                  서비스 안내
                </button>
              </Link>
            </motion.div>

            {/* 주요 통계 - 간결하게 */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
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

      {/* Why Choose Us Section - 간결하게 3개로 */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              KESRI를 선택하는 이유
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              19년간의 전문성과 체계적인 품질관리로 고객의 신뢰를 얻고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                KOLAS 공인인증
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                국가공인시험기관으로서 국제적으로 인정받는 품질관리 시스템 운영
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                신속한 검사
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                체계적인 프로세스와 최신 장비로 평균 3-5일 내 정확한 결과 제공
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                전문가 컨설팅
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                검사 결과 해석부터 개선방안 제시까지 맞춤형 컨설팅 서비스
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notices Section - 간결하게 */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              최신 공지사항
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              새로운 소식과 중요한 공지사항을 확인하세요
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {notices.slice(0, 5).map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link to={`/board/notice/${notice.id}`}>
                    <Card hover className="p-6 h-full flex flex-col bg-white dark:bg-neutral-700 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
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
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 line-clamp-2">
                        {notice.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-auto flex items-center hover:text-primary-600 transition-colors">
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
            className="text-center"
          >
            <Link to="/board/notice">
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary-600 hover:text-white hover:border-primary-600">
                전체 공지사항 보기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - 간결하게 */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              검사 진행 과정
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              체계적인 4단계 프로세스로 정확하고 신속한 서비스 제공
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "문의 및 상담",
                description: "전문 상담원이 검사 항목과 일정을 안내",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "bg-primary-600",
              },
              {
                step: "02",
                title: "시료 접수",
                description: "직접 방문 또는 택배로 시료 접수",
                icon: <Package className="w-8 h-8" />,
                color: "bg-cyan-500",
              },
              {
                step: "03",
                title: "검사 수행",
                description: "KOLAS 인증 장비로 정확한 검사 실시",
                icon: <Search className="w-8 h-8" />,
                color: "bg-purple-500",
              },
              {
                step: "04",
                title: "결과 발송",
                description: "공식 성적서와 해석 자료 제공",
                icon: <FileText className="w-8 h-8" />,
                color: "bg-green-500",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
                <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
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

      {/* CTA Section - 간결하게 */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-700 dark:from-primary-700 dark:to-blue-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              전문적인 환경안전 서비스가 필요하신가요?
            </h2>
            <p className="text-lg text-white/90 mb-10">
              한국환경안전연구소의 전문가가 최적의 솔루션을 제공해드립니다
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/quote-request" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-neutral-100 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold"
                >
                  무료 견적 받기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about/greeting" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300 font-bold"
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
