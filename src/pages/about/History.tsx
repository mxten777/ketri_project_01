import { motion } from 'framer-motion';
import { Calendar, Building, Award, Users } from 'lucide-react';

const History = () => {
  const historyData = [
    {
      year: '2024',
      events: [
        '실내공기질 측정업 확대',
        '디지털 고객서비스 플랫폼 구축',
        'AI 기반 분석 시스템 도입'
      ]
    },
    {
      year: '2023',
      events: [
        '석면 조사·분석 부문 역량 강화',
        '먹는물 검사 서비스 고도화',
        'ISO/IEC 17025 인정범위 확대'
      ]
    },
    {
      year: '2022',
      events: [
        '청주 본원 시설 확장',
        '전문 인력 충원',
        '분석장비 현대화 완료'
      ]
    },
    {
      year: '2021',
      events: [
        '산업보건 서비스 확대',
        '환경 컨설팅 부문 신설',
        '고객 만족도 95% 달성'
      ]
    },
    {
      year: '2020',
      events: [
        '코로나19 대응 방역 서비스',
        '실내공기질 측정업 등록',
        '디지털 검사결과 시스템 도입'
      ]
    },
    {
      year: '2019',
      events: [
        '먹는물 수질검사업 등록',
        'KOLAS 시험기관 인정',
        '연구개발 전담 조직 신설'
      ]
    },
    {
      year: '2018',
      events: [
        '석면 조사기관 지정',
        '전문 분석실 구축',
        '품질관리 시스템 구축'
      ]
    },
    {
      year: '2017',
      events: [
        '한국환경안전연구소 설립',
        '청주 본원 개원',
        '산업보건 서비스 개시'
      ]
    }
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">연혁</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              2017년부터 시작된 한국환경안전연구소의 성장과 발전 과정
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">8</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">설립 년차</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">5</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">주요 사업영역</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">10+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">인증 및 지정</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">25+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">전문 인력</div>
          </div>
        </motion.div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="heading-lg text-center mb-12">연도별 주요 성과</h2>
          
          <div className="space-y-8">
            {historyData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`flex items-start gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Year Badge */}
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{item.year}</span>
                </div>

                {/* Timeline Line */}
                <div className="flex-shrink-0 w-px bg-neutral-200 dark:bg-neutral-700 min-h-full"></div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
                    <ul className="space-y-3">
                      {item.events.map((event, eventIndex) => (
                        <li 
                          key={eventIndex}
                          className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
                        >
                          {index % 2 === 0 ? (
                            <>
                              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                              <span>{event}</span>
                            </>
                          ) : (
                            <>
                              <span>{event}</span>
                              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
            미래를 향한 비전
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            한국환경안전연구소는 지속가능한 환경과 안전한 사회를 만들기 위해 
            끊임없이 연구하고 발전해 나가겠습니다. 
            앞으로도 고객 여러분의 신뢰를 바탕으로 
            <strong> 환경안전 분야의 선도기관</strong>으로 성장하겠습니다.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default History;