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
import NoticePopup from "../components/common/NoticePopup";
import { getNotices, getPopupNotice } from "../services/noticeService";
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
  const [popupNotice, setPopupNotice] = useState<Notice | null>(null);

  useEffect(() => {
    fetchLatestNotices();
    checkPopupNotice();
  }, []);

  const checkPopupNotice = async () => {
    try {
      const popup = await getPopupNotice();
      
      if (!popup) {
        console.log("[Popup] No active popup notice found");
        return;
      }

      console.log("[Popup] Found popup notice:", popup.id, popup.title);

      // 오늘 하루 보지 않기 체크
      const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const dismissed = localStorage.getItem(`popup_notice_dismissed_${today}`);
      const popupId = popup.id || popup.noticeId || "";
      
      console.log("[Popup] Checking localStorage: today=", today, "dismissed=", dismissed, "popupId=", popupId);
      
      if (dismissed === popupId) {
        console.log("[Popup] Already dismissed today");
        return; // 오늘 이미 닫은 팝업
      }

      console.log("[Popup] Showing popup modal");
      setPopupNotice(popup);
    } catch (error) {
      logError("Failed to load popup notice:", error);
    }
  };

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
      {/* Popup Notice */}
      {popupNotice && (
        <NoticePopup
          notice={popupNotice}
          onClose={() => setPopupNotice(null)}
        />
      )}

      {/* Hero Section - 프리미엄 전문기업 */}
      <section
        data-has-hero
        className="relative z-0 pt-header flex flex-col items-center justify-center overflow-visible"
        style={{
          minHeight: "calc(100vh - var(--app-header-h))",
        }}
      >
        {/* 배경 - 브랜드 블루 그라데이션 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 dark:from-primary-800 dark:via-primary-900 dark:to-secondary-900"></div>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* 메인 메시지 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              신뢰할 수 있는<br />환경·안전 전문기업
            </motion.h1>

            {/* 보조 설명 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed max-w-2xl mx-auto"
            >
              19년 경험으로 검증된 분석·검사 서비스
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:043-237-7824"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto min-w-[220px] h-14 px-8 text-base font-semibold bg-white text-primary-700 hover:bg-white/95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>상담 문의</span>
                </button>
              </motion.a>

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="w-full sm:w-auto"
              >
                <Link to="/about/greeting" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto min-w-[220px] h-14 px-8 text-base font-semibold bg-white/10 text-white hover:bg-white/20 border-2 border-white/40 hover:border-white/60 rounded-xl backdrop-blur-sm transition-all duration-200 inline-flex items-center justify-center gap-2">
                    <span>회사 소개</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
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

      {/* Services Section - 기업형 깔끔한 카드 레이아웃 */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-neutral-900 dark:text-white">
              전문 시험·검사 서비스
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              산업보건부터 환경분야까지, 각 분야 전문가가 제공하는<br className="hidden sm:block" />
              정확하고 신속한 분석 서비스
            </p>
          </motion.div>

          {/* 서비스 카드 그리드 - 3열 고정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon as React.ComponentType<{ className?: string }>;
              return (
                <motion.div
                  key={service.path}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Link to={service.path} className="block group h-full">
                    <div className="relative h-full bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                      
                      {/* 호버 배경 */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}
                      ></div>

                      {/* 아이콘 */}
                      <div className="relative z-10 mb-5">
                        <div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-300`}
                        >
                          <IconComponent className="w-7 h-7" />
                        </div>
                      </div>

                      {/* 타이틀 */}
                      <h3 className="relative z-10 text-xl font-bold mb-3 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* 설명 */}
                      <p className="relative z-10 text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 text-sm">
                        {service.description}
                      </p>

                      {/* 자세히 보기 */}
                      <div className="relative z-10 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                        자세히 보기
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - 신뢰 지표 */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {statsFixed.map((stat, index) => {
              const IconComponent = stat.icon as React.ComponentType<{ className?: string }>;
              const count = statCounts[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-1">
                    {stat.value.includes("+") ? `${count}+` : stat.value.includes("년") ? `${count}년` : count}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - 기업형 3블록 */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              WHY KESRI
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-neutral-900 dark:text-white">
              차별화된 경쟁력
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              19년간의 전문성과 체계적인 품질관리로<br className="hidden sm:block" />
              고객의 신뢰를 얻고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
                품질관리
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                국제적으로 인정받는 품질관리 시스템 운영
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
                신속한 검사
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                최신 장비와 프로세스로 평균 3-5일 내 결과 제공
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
                전문가 컨설팅
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                검사 결과 해석부터 개선방안까지 맞춤형 상담
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notices Section - 리뉴얼 디자인 시스템 적용 */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {notices.slice(0, 3).map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="h-full"
                >
                  <Link to={`/board/notice/${notice.id}`}>
                    <div
                      className={`bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800 rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl h-full flex flex-col group ${
                        notice.isPinned
                          ? "border-primary-300 dark:border-primary-700 shadow-lg shadow-primary-200/50 dark:shadow-primary-900/30"
                          : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700"
                      }`}
                    >
                      {/* 상단 배지 */}
                      <div className="flex items-center gap-2 mb-4">
                        {notice.isPinned && (
                          <span className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold rounded-full">
                            <Pin className="w-3.5 h-3.5" />
                            고정
                          </span>
                        )}
                        <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-full border border-neutral-200 dark:border-neutral-600">
                          {notice.category}
                        </span>
                      </div>

                      {/* 제목 */}
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                        {notice.title}
                      </h3>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {notice.content}
                      </p>

                      {/* 하단 정보 */}
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {notice.author.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDateOnly(notice.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{notice.views || 0} 조회</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Link to="/board/notice">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-neutral-300 dark:border-neutral-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:border-primary-600 transition-all duration-300"
                >
                  전체 공지사항 보기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - 멋지게 개선 */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              검사 진행 과정
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              체계적인 4단계 프로세스로 정확하고 신속한 서비스 제공
            </p>
          </motion.div>

          {/* 2x2 Grid Layout - Centered */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  step: "01",
                  title: "문의 및 상담",
                  description: "전문 상담원이 검사 항목과 일정을 안내해 드립니다.",
                  icon: <MessageCircle className="w-8 h-8" />,
                  color: "from-primary-500 to-primary-600",
                },
                {
                  step: "02",
                  title: "시료 접수",
                  description: "직접 방문 또는 안전한 택배로 시료를 접수합니다.",
                  icon: <Package className="w-8 h-8" />,
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  step: "03",
                  title: "검사 수행",
                  description: "정확하고 신뢰할 수 있는 검사 수행",
                  icon: <Search className="w-8 h-8" />,
                  color: "from-purple-500 to-purple-600",
                },
                {
                  step: "04",
                  title: "결과 발송",
                  description: "공식 성적서와 상세한 해석 자료를 제공합니다.",
                  icon: <FileText className="w-8 h-8" />,
                  color: "from-green-500 to-green-600",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${process.color} rounded-lg flex items-center justify-center text-white shadow-sm`}
                      >
                        {process.icon}
                      </div>
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-bold rounded-lg">
                        {process.step}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {process.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {process.description}
                    </p>
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
