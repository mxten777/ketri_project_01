import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Clock,
  ArrowRight,
  MessageCircle,
  Package,
  Search,
  FileText,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { getNotices } from "../services/noticeService";
import type { Notice } from "../types";
import { logError } from "../utils/logger";
import { formatDate } from "../utils/dateUtils";
import { SERVICES, COMPANY_STATS } from "../constants/menu";

// 카운트 업 훅
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

const Home = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  useEffect(() => {
    fetchLatestNotices();
  }, []);

  const fetchLatestNotices = async () => {
    try {
      const data = await getNotices(5);
      setNotices(data);
    } catch (error) {
      logError("Failed to load notices:", error);
    } finally {
      setLoadingNotices(false);
    }
  };

  // 통계 데이터에 아이콘 추가
  const stats = COMPANY_STATS.map((stat, index) => {
    const icons = [CheckCircle, Users, Award, TrendingUp];
    return {
      ...stat,
      icon: icons[index],
    };
  });

  // 각 통계 값의 카운트업 애니메이션 (Hook은 조건부나 반복문 내에서 호출 불가)
  const count0 = useCountUp(parseInt(stats[0]?.value.replace(/[^0-9]/g, "") || "0"), 2000);
  const count1 = useCountUp(parseInt(stats[1]?.value.replace(/[^0-9]/g, "") || "0"), 2000);
  const count2 = useCountUp(parseInt(stats[2]?.value.replace(/[^0-9]/g, "") || "0"), 2000);
  const count3 = useCountUp(parseInt(stats[3]?.value.replace(/[^0-9]/g, "") || "0"), 2000);
  const statCounts = [count0, count1, count2, count3];

  return (
    <main className="overflow-visible">
      {/* Hero Section - 현대적이고 임팩트 있게 개선 */}
      {/* ✅ FIX: header 높이 제외 + 레이어 확정 + 상단 scrim */}
      <section
        data-has-hero
        className="relative z-0 pt-header min-h-[85vh] flex items-center justify-center overflow-hidden min-h-[72px] md:min-h-[80px] lg:min-h-[88px]"
        style={{
          minHeight: "calc(100vh - var(--app-header-h, 84px))",
        }}
      >
        {/* 동적인 배경 그라데이션 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 dark:from-primary-700 dark:via-primary-800 dark:to-blue-900">
          <motion.div
            className="absolute inset-0 z-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1), transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1), transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-0 opacity-10 pointer-events-none transform-gpu will-change-transform"
            style={{ contain: 'paint' }}
            animate={{
              background: [
                "linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)",
                "linear-gradient(135deg, transparent, rgba(255,255,255,0.05), transparent)",
                "linear-gradient(225deg, transparent, rgba(255,255,255,0.05), transparent)",
                "linear-gradient(315deg, transparent, rgba(255,255,255,0.05), transparent)",
                "linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* ✅ 헤더/텍스트 가독성용 상단 scrim (프리미엄 톤) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-header z-0 bg-gradient-to-b from-black/35 to-transparent"
            style={{ height: "var(--app-header-h, 84px)" }}
        />

        {/* 메인 컨텐츠 */}
        {/* ✅ FIX: z-60 -> z-[60] (Tailwind 기본 없음) / py 과다 제거 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            {/* 메인 타이틀 - 글자별 애니메이션 */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                신뢰할 수 있는
              </motion.span>
              <br />
              <motion.span
                className="inline-block px-6 py-3 rounded-2xl text-white font-extrabold bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                환경안전 전문기관
              </motion.span>
            </motion.h1>

            {/* 서브 타이틀 */}
            <motion.p
              className="text-2xl sm:text-3xl mb-8 text-white/90 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              한국환경안전연구소
            </motion.p>

            <motion.p
              className="text-lg text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              산업보건 · 먹는물 · 석면 · 실내공기질 분야의 KOLAS 공인 전문기관으로,
              <br className="hidden sm:block" />
              최고 수준의 분석 서비스를 제공합니다.
            </motion.p>

            {/* CTA 버튼 - 개선된 디자인 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.a
                href="tel:043-237-7824"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[280px] bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  전화 상담: 043-237-7824
                </Button>
              </motion.a>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link to="/about/greeting" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto min-w-[280px] border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm transition-all duration-300"
                  >
                    회사 소개 보기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* 주요 통계 - 카운트 업 애니메이션 추가 */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon as React.ComponentType<{ className?: string }>;
                const count = statCounts[index];
                return (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <IconComponent className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value.includes("+") ? `${count}+` : stat.value.includes("년") ? `${count}년` : count}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 - 개선 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
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

          {/* 5개 서비스 카드 그리드 */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
          >
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon as React.ComponentType<{ className?: string }>;
              return (
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
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      ></div>

                      {/* 아이콘 */}
                      <div className="relative z-10 mb-6">
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        >
                          <IconComponent className="w-8 h-8" />
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
              );
            })}
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

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <Link to="/board/notice">
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary-600 hover:text-white hover:border-primary-600">
                전체 공지사항 보기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - 멋지게 개선 */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 overflow-hidden">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              검사 진행 과정
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              체계적인 4단계 프로세스로 정확하고 신속한 서비스 제공
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-cyan-500 to-green-500 transform -translate-x-1/2"></div>

            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  step: "01",
                  title: "문의 및 상담",
                  description: "전문 상담원이 검사 항목과 일정을 안내해 드립니다.",
                  icon: <MessageCircle className="w-10 h-10" />,
                  color: "from-primary-500 to-primary-600",
                  position: "left",
                },
                {
                  step: "02",
                  title: "시료 접수",
                  description: "직접 방문 또는 안전한 택배로 시료를 접수합니다.",
                  icon: <Package className="w-10 h-10" />,
                  color: "from-cyan-500 to-cyan-600",
                  position: "right",
                },
                {
                  step: "03",
                  title: "검사 수행",
                  description: "KOLAS 인증 장비로 정확하고 신뢰할 수 있는 검사 실시",
                  icon: <Search className="w-10 h-10" />,
                  color: "from-purple-500 to-purple-600",
                  position: "left",
                },
                {
                  step: "04",
                  title: "결과 발송",
                  description: "공식 성적서와 상세한 해석 자료를 제공합니다.",
                  icon: <FileText className="w-10 h-10" />,
                  color: "from-green-500 to-green-600",
                  position: "right",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: process.position === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative flex items-center ${
                    process.position === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:gap-12 gap-6`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group ${
                      process.position === "left" ? "lg:mr-8" : "lg:ml-8"
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${process.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        >
                          {process.icon}
                        </div>
                        <div className="mt-3 text-center">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-md">
                            STEP {process.step}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {process.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{process.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-full shadow-lg border-4 border-white dark:border-neutral-900 z-10">
                    <div className={`w-6 h-6 bg-gradient-to-br ${process.color} rounded-full`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
