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
  Pin,
  User,
  Calendar,
  Eye,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { getNotices } from "../services/noticeService";
import type { Notice } from "../types";
import { logError } from "../utils/logger";
import { formatDateOnly } from "../utils/dateUtils";
import { SERVICES, COMPANY_STATS } from "../constants/menu";
import { NOTICE_HERO_COPY } from "../constants/copy";

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

  // 통계 데이터에 아이콘 추가 및 검증(생성 단계에서 대체)
  const icons = [CheckCircle, Users, Award, TrendingUp];
  const statsWithIcons = COMPANY_STATS.map((stat, index) => ({ ...stat, icon: icons[index] }));

  const normalizeNum = (v: unknown) => {
    const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  };

  const statsFixed = statsWithIcons.map((s) => {
    const isAuthBody = String(s.label ?? "").includes("공인");
    const n = normalizeNum(s.value);
    if (isAuthBody && (n === 0 || Number.isNaN(n))) {
      return { ...s, value: "24+", label: "시험 항목" };
    }
    return s;
  });

  // 각 통계 값의 카운트업 애니메이션 (Hook은 조건부나 반복문 내에서 호출 불가)
  const count0 = useCountUp(parseInt((statsFixed[0]?.value ?? "").toString().replace(/[^0-9]/g, "") || "0", 10), 2000);
  const count1 = useCountUp(parseInt((statsFixed[1]?.value ?? "").toString().replace(/[^0-9]/g, "") || "0", 10), 2000);
  const count2 = useCountUp(parseInt((statsFixed[2]?.value ?? "").toString().replace(/[^0-9]/g, "") || "0", 10), 2000);
  const count3 = useCountUp(parseInt((statsFixed[3]?.value ?? "").toString().replace(/[^0-9]/g, "") || "0", 10), 2000);
  const statCounts = [count0, count1, count2, count3];

  return (
    <main className="overflow-visible">
      {/* Hero Section - 현대적이고 임팩트 있게 개선 */}
      {/* ✅ FIX: header 높이 제외 + 레이어 확정 + 상단 scrim */}
      <section
        data-has-hero
        className="relative z-0 pt-header flex flex-col items-center justify-start md:justify-center overflow-visible pb-16 sm:pb-20"
        style={{
          minHeight: "calc(100vh - var(--app-header-h))",
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
          className="pointer-events-none absolute inset-x-0 top-header z-0 bg-gradient-to-b from-black/20 to-transparent"
            style={{ height: "var(--app-header-h, 84px)" }}
        />

        {/* 메인 컨텐츠 + Stats: 모바일은 세로 스택, md 이상은 좌(A)/우(B) 가로 분할 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24">
          <div className="flex flex-col items-center gap-10 md:gap-14 lg:gap-16">
            {/* A: Hero top (왼쪽 영역, md 이상에서 확장) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white max-w-6xl mx-auto md:mx-0 md:flex-1"
            >
              {/* 상단 문구 - 더 절제되고 보조적으로 */}
              <motion.span
                className="inline-block text-sm md:text-base tracking-wider font-medium text-white/75 mb-6 md:mb-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                기준으로 선택되는 신뢰
              </motion.span>

              {/* 메인 타이틀 - pill 배경을 더 은은하게 */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  className="relative z-10 mt-4 md:mt-6 inline-block px-8 sm:px-10 md:px-12 lg:px-14 py-3 md:py-4 rounded-2xl text-white font-extrabold bg-white/8 backdrop-blur-md border border-white/15 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  한국환경안전연구소
                </motion.span>
              </motion.h1>

              {/* 서브 텍스트 - 줄간격과 자간 개선 */}
              <motion.p
                className="hidden sm:block text-lg md:text-xl text-white/80 mb-12 md:mb-14 max-w-3xl mx-auto leading-[1.75] tracking-wide font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                산업보건 · 먹는물 · 석면 · 실내공기질 분야에서 최고 수준의 분석 서비스를
                <br className="hidden sm:block" />
                제공합니다.
              </motion.p>

              {/* CTA 버튼 - 덜 강조, 더 정돈된 느낌 */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-5 mb-16 md:mb-20 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.a
                  href="tel:043-237-7824"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-w-[220px] md:min-w-[240px] h-12 md:h-14 text-base md:text-lg font-semibold bg-white/40 border border-white/70 text-white hover:bg-white/50 backdrop-blur-sm transition-all duration-200 shadow-md"
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

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link to="/about/greeting" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto min-w-[220px] md:min-w-[240px] h-12 md:h-14 text-base md:text-lg font-semibold border border-white/60 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-200"
                    >
                      회사 소개 보기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* B: Stats (오른쪽 영역) - 모바일 중앙 정렬, lg에서 4열 고정 */}
            <div className="w-full mx-auto md:w-auto lg:max-w-[900px] mt-8 md:mt-0">
              <div className="overflow-x-auto md:overflow-visible">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mx-auto gap-5 md:gap-6 w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  {statsFixed.map((stat, index) => {
                    const IconComponent = stat.icon as React.ComponentType<{ className?: string }>;
                    const count = statCounts[index];
                    return (
                      <motion.div
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-7 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center justify-center mb-4">
                          <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white/80 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                          {stat.value.includes("+") ? `${count}+` : stat.value.includes("년") ? `${count}년` : count}
                        </div>
                        <div className="text-base md:text-lg text-white/85 font-medium">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
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
                품질관리
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                국제적으로 인정받는 품질관리 시스템 운영
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
              {NOTICE_HERO_COPY.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {NOTICE_HERO_COPY.subtitle}
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
              {notices.slice(0, 3).map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link to={`/board/notice/${notice.id}`}>
                    <div
                      className={`bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-premium border transition-all duration-300 hover:shadow-2xl h-full flex flex-col group ${
                        notice.isPinned
                          ? "border-primary-300 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-primary-200/50"
                          : "border-white/50 dark:border-neutral-700/50 hover:border-primary-300"
                      }`}
                    >
                      {/* 상단 배지 */}
                      <div className="flex items-center gap-2 mb-4">
                        {notice.isPinned && (
                          <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full shadow-sm">
                            <Pin className="w-3 h-3" />
                            고정
                          </span>
                        )}
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                          {notice.category}
                        </span>
                      </div>

                      {/* 제목 */}
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 flex-grow">
                        {notice.title}
                      </h2>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                        {notice.content}
                      </p>

                      {/* 하단 정보 */}
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {notice.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateOnly(notice.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-400">
                          <Eye className="w-3 h-3" />
                          <span>{notice.views || 0} 조회</span>
                        </div>
                      </div>
                    </div>
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

            <div className="space-y-12 lg:space-y-24">
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
                  description: "정확하고 신뢰할 수 있는 검사 수행",
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
