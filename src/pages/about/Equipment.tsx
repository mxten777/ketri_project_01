import { motion } from 'framer-motion';
import { Microscope, FlaskConical, Thermometer, Zap, Settings, Calendar } from 'lucide-react';

const Equipment = () => {
  const equipmentCategories = [
    {
      name: '분석 장비',
      icon: FlaskConical,
      count: 12,
      color: 'bg-blue-500',
      description: '정밀 화학 분석'
    },
    {
      name: '측정 장비',
      icon: Thermometer,
      count: 8,
      color: 'bg-green-500',
      description: '환경 측정'
    },
    {
      name: '현미경 장비',
      icon: Microscope,
      count: 5,
      color: 'bg-purple-500',
      description: '미세 분석'
    },
    {
      name: '전기 장비',
      icon: Zap,
      count: 6,
      color: 'bg-orange-500',
      description: '전기 안전'
    }
  ];

  const equipment = [
    {
      category: '분석 장비',
      name: 'ICP-MS (유도결합플라즈마 질량분석기)',
      model: 'Agilent 7700x',
      year: '2023',
      purpose: '중금속, 미량원소 정밀분석',
      specifications: [
        '검출한계: ng/L 수준',
        '동시 다원소 분석 가능',
        '높은 정확도 및 재현성'
      ],
      applications: '먹는물, 폐수, 토양 중 중금속 분석',
      status: 'active'
    },
    {
      category: '분석 장비',
      name: 'GC-MS (가스크로마토그래피-질량분석기)',
      model: 'Shimadzu GCMS-QP2020 NX',
      year: '2023',
      purpose: '휘발성 유기화합물 분석',
      specifications: [
        '고감도 질량분석',
        '넓은 질량범위',
        '자동 시료주입 시스템'
      ],
      applications: '실내공기질, 산업보건 VOCs 분석',
      status: 'active'
    },
    {
      category: '분석 장비',
      name: 'HPLC (고성능 액체크로마토그래피)',
      model: 'Waters Alliance e2695',
      year: '2022',
      purpose: '비휘발성 유기화합물 분석',
      specifications: [
        '고분해능 분리능',
        'UV/VIS 검출기',
        '자동 시료 처리'
      ],
      applications: '농약, 의약품, 환경호르몬 분석',
      status: 'active'
    },
    {
      category: '분석 장비',
      name: 'IC (이온크로마토그래피)',
      model: 'Metrohm 883 Basic IC plus',
      year: '2022',
      purpose: '이온성 물질 분석',
      specifications: [
        '음이온/양이온 동시분석',
        '높은 선택성',
        '자동화 시스템'
      ],
      applications: '먹는물 이온 성분, 대기오염물질 분석',
      status: 'active'
    },
    {
      category: '측정 장비',
      name: '실내공기질 측정기',
      model: 'TSI VelociCalc 9565-X',
      year: '2023',
      purpose: '실내공기질 현장측정',
      specifications: [
        'CO₂, CO, PM2.5/PM10 측정',
        '온습도, 풍속 측정',
        '실시간 데이터 로깅'
      ],
      applications: '다중이용시설 실내공기질 측정',
      status: 'active'
    },
    {
      category: '측정 장비',
      name: '작업환경 측정기',
      model: 'SKC AirCheck Touch',
      year: '2022',
      purpose: '작업환경 유해인자 측정',
      specifications: [
        '개인시료채취 펌프',
        '정밀 유량제어',
        '장시간 연속측정'
      ],
      applications: '산업보건 작업환경측정',
      status: 'active'
    },
    {
      category: '측정 장비',
      name: '소음측정기',
      model: 'Brüel & Kjær 2250',
      year: '2023',
      purpose: '소음도 정밀측정',
      specifications: [
        'Class 1 정확도',
        '1/3 옥타브 분석',
        '통계 분석 기능'
      ],
      applications: '산업보건, 환경소음 측정',
      status: 'active'
    },
    {
      category: '현미경 장비',
      name: '편광현미경',
      model: 'Olympus BX53P',
      year: '2022',
      purpose: '석면 섬유 식별',
      specifications: [
        '편광 및 위상차 관찰',
        '고배율 대물렌즈',
        '디지털 카메라 연결'
      ],
      applications: '석면 정성분석, 광물 식별',
      status: 'active'
    },
    {
      category: '현미경 장비',
      name: '전자현미경',
      model: 'JEOL JSM-IT100',
      year: '2023',
      purpose: '미세구조 관찰',
      specifications: [
        '고분해능 SEM 이미지',
        'EDS 성분 분석',
        '3D 이미지 구성'
      ],
      applications: '나노물질, 미세입자 분석',
      status: 'active'
    },
    {
      category: '전기 장비',
      name: '절연저항측정기',
      model: 'Fluke 1550C',
      year: '2023',
      purpose: '전기 절연성능 측정',
      specifications: [
        '최대 5000V 시험전압',
        '고정확도 측정',
        '데이터 저장 기능'
      ],
      applications: '전기설비 안전진단',
      status: 'active'
    },
    {
      category: '전기 장비',
      name: '접지저항측정기',
      model: 'Fluke 1625-2',
      year: '2022',
      purpose: '접지시스템 측정',
      specifications: [
        '3극/4극 측정법',
        '무전극 측정 가능',
        '자동 주파수 선택'
      ],
      applications: '전기설비 접지상태 확인',
      status: 'active'
    }
  ];

  const maintenanceSchedule = [
    { equipment: 'ICP-MS', lastMaintenance: '2024.01.15', nextMaintenance: '2024.04.15' },
    { equipment: 'GC-MS', lastMaintenance: '2024.02.10', nextMaintenance: '2024.05.10' },
    { equipment: '실내공기질 측정기', lastMaintenance: '2024.01.25', nextMaintenance: '2024.04.25' },
    { equipment: '편광현미경', lastMaintenance: '2024.02.05', nextMaintenance: '2024.05.05' }
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">주요장비현황</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              정확하고 신뢰할 수 있는 분석을 위한 첨단 장비 현황
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Equipment Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {equipmentCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft text-center"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {category.count}대
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Equipment Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">장비 상세 정보</h2>
          
          <div className="space-y-8">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden"
              >
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Basic Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                          <p className="text-neutral-600 dark:text-neutral-400 mb-1">{item.model}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-500">도입연도: {item.year}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 dark:text-green-400">가동중</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-2">용도</h4>
                        <p className="text-neutral-700 dark:text-neutral-300">{item.purpose}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-3">주요 사양</h4>
                        <ul className="space-y-2">
                          {item.specifications.map((spec, specIndex) => (
                            <li key={specIndex} className="flex items-center gap-3 text-sm">
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold mb-2">적용 분야</h4>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm">{item.applications}</p>
                      </div>
                    </div>

                    {/* Equipment Image Placeholder */}
                    <div className="lg:col-span-1">
                      <div className="bg-neutral-100 dark:bg-neutral-700 rounded-xl h-48 lg:h-full flex items-center justify-center">
                        <div className="text-center">
                          <Settings className="w-16 h-16 text-neutral-400 mx-auto mb-2" />
                          <p className="text-neutral-500 text-sm">장비 이미지</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Maintenance Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">정기점검 일정</h2>
          
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary-500" />
                <h3 className="text-lg font-bold">2024년 점검 계획</h3>
              </div>
            </div>
            
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {maintenanceSchedule.map((item) => (
                <div key={item.equipment} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold mb-1">{item.equipment}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        최근 점검: {item.lastMaintenance}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">다음 점검</div>
                      <div className="font-bold text-primary-600 dark:text-primary-400">
                        {item.nextMaintenance}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quality Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">품질관리 시스템</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-2">정기 교정</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                국가표준기관 인정 교정으로 측정 정확도 보장
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">정도관리</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                표준물질을 이용한 정기적인 분석 정도관리
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold mb-3">숙련도시험</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                국제 숙련도시험 참여로 분석능력 검증
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-xl">
            <p className="text-neutral-600 dark:text-neutral-300">
              모든 분석장비는 <strong>ISO/IEC 17025</strong> 기준에 따라 관리되며, 
              정기적인 교정과 점검을 통해 <strong>최고 수준의 분석 정확도</strong>를 유지하고 있습니다.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Equipment;