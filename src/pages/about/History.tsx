import { motion } from "framer-motion";
import {
  Calendar,
  Building,
  Award,
  Users,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Section from "../../components/common/Section";
import { Card } from "../../components/ui/Card";
import ServiceCta from "../../components/common/ServiceCta";
 
const History = () => {
  const historyData = [
    {
      year: "2020",
      month: "10",
      events: ["기술유출방지시스템 구축"],
    },
    {
      year: "2019",
      month: "09",
      events: ["신사옥 신축 이전"],
    },
    {
      year: "2019",
      month: "08",
      events: ["국가공인 석면해체작업 감리인 등록(충청북도청)"],
    },
    {
      year: "2016",
      month: "12",
      events: ["안전보건경영시스템(KOSHA-MS)인증(한국산업안전보건공단)"],
    },
    {
      year: "2015",
      month: "10",
      events: ["상호변경 (㈜한국환경안전연구소)"],
    },
    {
      year: "2010",
      month: "12",
      events: [
        "자본금 증자(4억3백)",
        "국가공인 실내공기질측정기관 지정(충청북도청)",
      ],
    },
    {
      year: "2010",
      month: "11",
      events: ["신기술혁신 중소기업(Inno-Biz)인증"],
    },
    {
      year: "2010",
      month: "10",
      events: ["본사 사무동 증축"],
    },
    {
      year: "2010",
      month: "06",
      events: ["자본금 증자(3억9천)"],
    },
    {
      year: "2010",
      month: "02",
      events: ["국가공인 석면조사기관 지정(노동부)"],
    },
    {
      year: "2009",
      month: "12",
      events: ["자본금 증자(2억7천)"],
    },
    {
      year: "2009",
      month: "07",
      events: ["기업부설연구소(R&D Center)설립"],
    },
    {
      year: "2007",
      month: "05",
      events: ["국가공인 작업환경측정기관 지정(노동부)"],
    },
    {
      year: "2007",
      month: "04",
      events: ["국가공인 먹는물수질검사기관 지정(환경부)"],
    },
    {
      year: "2006",
      month: "07",
      events: ["(주)한국환경시험연구소 설립 (2016년 한국환경안전연구소로 상호변경)"],
    },
  ];

  // 연도별로 그룹화
  const groupedByYear = historyData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<string, typeof historyData>);

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="min-h-screen">
      {/* A) Page Title Section */}
      <section data-has-hero className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Journey</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-extrabold">
              한국환경안전연구소의 역사
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium opacity-95">
              2006년부터 시작된 성장과 혁신의 19년
              <br className="hidden sm:inline" />
              신뢰와 전문성으로 함께 걸어온 길
            </p>
          </motion.div>
        </div>
      </section>

      {/* B) 주요 통계 */}
      <Section variant="gradient" spacing="lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card variant="elevated" padding="md" hover="lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                19년
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                설립 년차
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="md" hover="lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                5개
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                주요 사업영역
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="md" hover="lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-1">
                10+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                인증 및 지정
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="md" hover="lift">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mb-1">
                25+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                전문 인력
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* C) 타임라인 형식 연혁 */}
      <Section variant="default" spacing="xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Our Milestones
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
            주요 성과 및 발전 과정
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            한국환경안전연구소의 주요 이정표와 성장의 역사
          </p>
        </div>

        {/* 타임라인 2컬럼 레이아웃 (데스크톱) / 단일 컬럼 (모바일) */}
        <div className="max-w-6xl mx-auto">
          {years.map((year, yearIndex) => (
            <div key={year} className="relative">
              {/* 데스크톱: 2컬럼 레이아웃 */}
              <div className="hidden md:grid md:grid-cols-12 gap-8 mb-12">
                {/* 좌측: 연도 + 타임라인 라인 */}
                <div className="md:col-span-3 relative">
                  <div className="sticky top-24">
                    <div className="text-right pr-8">
                      <div className="inline-block">
                        <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                          {year}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                          {groupedByYear[year].length}개 주요 활동
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 타임라인 세로 라인 */}
                  {yearIndex < years.length - 1 && (
                    <div className="absolute right-0 top-24 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-700 dark:to-transparent"></div>
                  )}
                </div>

                {/* 우측: 연혁 항목들 */}
                <div className="md:col-span-9 space-y-6">
                  {groupedByYear[year].map((item, index) => (
                    <motion.div
                      key={`${item.year}-${item.month}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card variant="elevated" padding="md" hover="lift" className="relative">
                        {/* 연결 포인트 */}
                        <div className="absolute -left-11 top-6 w-8 h-px bg-blue-300 dark:bg-blue-600"></div>
                        <div className="absolute -left-12 top-5 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 ring-4 ring-white dark:ring-neutral-900"></div>

                        {/* 월 표시 */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                              {item.month}월
                            </span>
                          </div>
                        </div>

                        {/* 이벤트 리스트 */}
                        <ul className="space-y-2">
                          {item.events.map((event, eventIndex) => (
                            <li
                              key={eventIndex}
                              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                            >
                              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-base leading-relaxed">
                                {event}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 모바일: 단일 컬럼 */}
              <div className="md:hidden mb-12">
                {/* 연도 헤더 */}
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                    {year}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    {groupedByYear[year].length}개 주요 활동
                  </div>
                </div>

                {/* 연혁 항목들 */}
                <div className="space-y-4 relative pl-8">
                  {/* 세로 타임라인 라인 */}
                  {yearIndex < years.length - 1 && (
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-700 dark:to-transparent"></div>
                  )}

                  {groupedByYear[year].map((item, index) => (
                    <motion.div
                      key={`${item.year}-${item.month}-mobile`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="relative"
                    >
                      {/* 타임라인 포인트 */}
                      <div className="absolute -left-7 top-4 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 ring-2 ring-white dark:ring-neutral-900"></div>

                      <Card variant="elevated" padding="sm" hover="lift">
                        {/* 월 표시 */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                              {item.month}월
                            </span>
                          </div>
                        </div>

                        {/* 이벤트 리스트 */}
                        <ul className="space-y-2">
                          {item.events.map((event, eventIndex) => (
                            <li
                              key={eventIndex}
                              className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed">
                                {event}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* D) 미래 비전 */}
      <Section variant="primary" spacing="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Our Vision
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            미래를 향한 비전
          </h2>

          <p className="text-lg leading-relaxed text-white/95 mb-8">
            한국환경안전연구소는 지속가능한 환경과 안전한 사회를 만들기 위해
            끊임없이 연구하고 발전해 나가겠습니다. 앞으로도 고객 여러분의
            신뢰를 바탕으로{" "}
            <span className="font-bold underline decoration-2 underline-offset-4">
              환경안전 분야의 선도기관
            </span>
            으로 성장하겠습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/20">
              <span className="text-sm font-semibold text-white">
                지속가능성
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/20">
              <span className="text-sm font-semibold text-white">혁신</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/20">
              <span className="text-sm font-semibold text-white">신뢰</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/20">
              <span className="text-sm font-semibold text-white">
                전문성
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* E) 하단 CTA */}
      <Section variant="default" spacing="lg">
        <ServiceCta 
          message="환경안전 전문가와 상담하세요"
          subtitle="한국환경안전연구소의 전문 상담원이 신속하고 정확하게 안내해 드립니다"
        />
      </Section>
    </main>
  );
};

export default History;
