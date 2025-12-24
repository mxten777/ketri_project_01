import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Microscope,
  FlaskConical,
  Thermometer,
  Zap,
  Settings,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Download,
} from "lucide-react";
 

const Equipment = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // 장비 관련 문서
  const equipmentDocuments = [
    {
      title: "분석지원부(먹는물) 분석장비",
      file: "/documents/equipment/분석지원부(먹는물) 분석장비.pdf",
      category: "먹는물",
      icon: FlaskConical,
    },
    {
      title: "장비사진(먹는물 미생물)",
      file: "/documents/equipment/장비사진(먹는물 미생물).pdf",
      category: "미생물",
      icon: Microscope,
    },
    {
      title: "장비사진(작업환경)",
      file: "/documents/equipment/장비사진(작업환경).pdf",
      category: "작업환경",
      icon: Thermometer,
    },
    {
      title: "장비사진-석면",
      file: "/documents/equipment/장비사진-석면.pdf",
      category: "석면",
      icon: Settings,
    },
  ];

  // 분석실별 이미지 데이터
  const labImages: Record<string, Array<{ src: string; alt: string }>> = {
    "3층 기기분석실": Array.from({ length: 5 }, (_, i) => ({
      src: `/images/equipment/instrument-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `기기분석실 ${i + 1}`,
    })),
    무기분석실: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/equipment/inorganic-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `무기분석실 ${i + 1}`,
    })),
    유기분석실: Array.from({ length: 7 }, (_, i) => ({
      src: `/images/equipment/organic-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `유기분석실 ${i + 1}`,
    })),
    미생물실: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/equipment/microbio-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `미생물실 ${i + 1}`,
    })),
    석면실: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/equipment/asbestos-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `석면실 ${i + 1}`,
    })),
    전처리실: Array.from({ length: 9 }, (_, i) => ({
      src: `/images/equipment/pretreat-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `전처리실 ${i + 1}`,
    })),
    시약실: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/equipment/reagent-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `시약실 ${i + 1}`,
    })),
    천칭실: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/equipment/balance-${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `천칭실 ${i + 1}`,
    })),
    시료냉장고: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/equipment/refrigerator-${String(i + 1).padStart(
        2,
        "0"
      )}.jpg`,
      alt: `시료냉장고 ${i + 1}`,
    })),
  };

  const equipmentCategories = [
    {
      name: "분석 장비",
      icon: FlaskConical,
      count: 12,
      color: "bg-blue-500",
      description: "정밀 화학 분석",
    },
    {
      name: "측정 장비",
      icon: Thermometer,
      count: 8,
      color: "bg-green-500",
      description: "환경 측정",
    },
    {
      name: "현미경 장비",
      icon: Microscope,
      count: 5,
      color: "bg-purple-500",
      description: "미세 분석",
    },
    {
      name: "전기 장비",
      icon: Zap,
      count: 6,
      color: "bg-orange-500",
      description: "전기 안전",
    },
  ];

  const equipment = [
    // 석면 분석장비
    {
      category: "석면",
      name: "위상차현미경",
      model: "ECLIPSE E200",
      manufacturer: "Nikon",
      testItems: "공기중 석면시료",
      status: "active",
    },
    {
      category: "석면",
      name: "위상차현미경",
      model: "BA200",
      manufacturer: "MOTIC",
      testItems: "공기중 석면시료",
      status: "active",
    },
    {
      category: "석면",
      name: "편광현미경",
      model: "ECLIPSE CiPOL",
      manufacturer: "Nikon",
      testItems: "석면 고형시료",
      status: "active",
    },
    {
      category: "석면",
      name: "편광현미경",
      model: "BA300 Pol.",
      manufacturer: "MOTIC",
      testItems: "석면 고형시료",
      status: "active",
    },
    {
      category: "석면",
      name: "실체현미경",
      model: "SMZ-143 SERIES",
      manufacturer: "MOTIC",
      testItems: "석면 고형시료 전처리",
      status: "active",
    },
    {
      category: "석면",
      name: "전자저울",
      model: "METTLER AT261",
      manufacturer: "METTLER",
      testItems: "고형시료 전처리",
      status: "active",
    },

    // 먹는물 미생물 분석장비
    {
      category: "먹는물(미생물)",
      name: "광학현미경",
      model: "CHK2-F-GS",
      manufacturer: "OLYMPUS",
      testItems:
        "녹농균, 살모넬라, 쉬겔라, 여시니아균 확인시험 (그람염색 현미경 관찰)",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "고압멸균기",
      model: "SSAC-060H",
      manufacturer: "SSOLKO REA",
      testItems: "배지 제조",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "오븐 제어 배양기",
      model: "HSM-125 2ROOM",
      manufacturer: "SINAN",
      testItems: "미생물 배양",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "저압전 펠트",
      model: "98-20951-00",
      manufacturer: "SPECTR OLINE",
      testItems: "대장균, 녹농균 결과 확인용도",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "저온배양기",
      model: "IMP180",
      manufacturer: "Thermo SCIENTIFIC",
      testItems: "미생물 배양",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "항온진조기",
      model: "Thermo Stable OF-105",
      manufacturer: "DAIHAN Scientific",
      testItems: "초저류 건조",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "멸도독신 분쇄장비",
      model: "ELX808",
      manufacturer: "Charles river",
      testItems: "멸도독신 분석",
      status: "active",
    },
    {
      category: "먹는물(미생물)",
      name: "항온항습 배양기",
      model: "LHS-100CL",
      manufacturer: "NEURON FIT",
      testItems: "미생물 배양",
      status: "active",
    },

    // 먹는물 분석장비
    {
      category: "먹는물",
      name: "ICP-MS (유도결합플라즈마질량분석기)",
      model: "7A",
      manufacturer: "-",
      testItems: "무기물질 분석",
      status: "active",
    },
    {
      category: "먹는물",
      name: "양극 펄스 폴라로그래프",
      model: "Polarograph",
      manufacturer: "METRONIC",
      testItems: "무기물질 분석",
      status: "active",
    },
    {
      category: "먹는물",
      name: "양극 펄스 폴라로그래프",
      model: "POLAROG TRACE",
      manufacturer: "METRONIC",
      testItems: "무기물질 분석",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-MSO, 6890N",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-ECD 7890A",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-ECD 7890A",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-NPD 6890A",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "HPLC(UV) CBM-20A",
      manufacturer: "SHIMADZU",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "UV-VIS Spectrometer",
      manufacturer: "-",
      testItems: "일반항목",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "UV-1800",
      manufacturer: "SHIMADZU",
      testItems: "일반항목",
      status: "active",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피",
      model: "IC",
      manufacturer: "Thermo",
      testItems: "일반항목",
      status: "active",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피",
      model: "IC Compact",
      manufacturer: "METROHM",
      testItems: "일반항목",
      status: "active",
    },
    {
      category: "먹는물",
      name: "유도결합플라즈마",
      model: "ICPS-8100",
      manufacturer: "SHIMADZU",
      testItems: "무기물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "원자흡광광도계",
      model: "AA-7000",
      manufacturer: "SHIMADZU",
      testItems: "무기물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "HPLC Pump LC-20AD",
      manufacturer: "SHIMADZU",
      testItems: "소독제 및 소독부산물",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GCMS-QP2010 Ultra",
      manufacturer: "SHIMADZU",
      testItems: "소독제 및 소독부산물",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC Agilent 7890A",
      manufacturer: "Agilent",
      testItems: "소독제 및 소독부산물",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "ICP-MS Agilent 7A",
      manufacturer: "Agilent",
      testItems: "유해물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "ICP-MS G3272B",
      manufacturer: "Agilent",
      testItems: "유해물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-MS Agilent 6890N",
      manufacturer: "Agilent",
      testItems: "유해물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "HPLC-FLD Agilent 1200",
      manufacturer: "Agilent",
      testItems: "유해물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC/P&T Agilent 7890A",
      manufacturer: "Agilent",
      testItems: "휘발성유기물질",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC-MS G3272B",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "HPLC-MS/MS TSQ8000",
      manufacturer: "Thermo",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "GC Agilent 7890A",
      manufacturer: "Agilent",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "HPLC-MS/MS API4000",
      manufacturer: "AB SCIEX",
      testItems: "잔류농약",
      status: "active",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피",
      model: "IC 1100/AS",
      manufacturer: "Thermo",
      testItems: "할로아세토니트릴",
      status: "active",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피",
      model: "6890",
      manufacturer: "Agilent",
      testItems: "할로케톤",
      status: "active",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피",
      model: "IC",
      manufacturer: "Thermo",
      testItems: "할로아세트산",
      status: "active",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피",
      model: "HPLC Multiskan Spectrum",
      manufacturer: "Thermo",
      testItems: "시험항목",
      status: "active",
    },

    // 작업환경 분석장비
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-FID, FTD)",
      model: "GC-2010",
      manufacturer: "SHIMADZU",
      testItems: "휘발성유기화합물",
      status: "active",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-FID)",
      model: "GC-2010 PLUS",
      manufacturer: "SHIMADZU",
      testItems: "휘발성유기화합물",
      status: "active",
    },
    {
      category: "작업환경",
      name: "이온크로마토그래피(IC)",
      model: "Dionex ICS-1600, Dionex ICS-2100",
      manufacturer: "Thermo Scientific",
      testItems: "음이온 및 6가 크롬 등 분석",
      status: "active",
    },
    {
      category: "작업환경",
      name: "유도결합플라즈마 질량분석기(ICP/MS)",
      model: "G3272B",
      manufacturer: "Agilent Technologies",
      testItems: "중금속 분석",
      status: "active",
    },
    {
      category: "작업환경",
      name: "액체크로마토그래피(HPLC)",
      model: "LC-40A",
      manufacturer: "SHIMADZU",
      testItems: "알데하이드류, 아민류 등",
      status: "active",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-ECD)",
      model: "GC-2010 PLUS",
      manufacturer: "SHIMADZU",
      testItems: "산화에틸렌",
      status: "active",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-FPD)",
      model: "6890N",
      manufacturer: "Agilent Technologies",
      testItems: "이황화탄소, 황산디메틸",
      status: "active",
    },
    {
      category: "작업환경",
      name: "적외선 분광계(FT-IR)",
      model: "Spectrum Two",
      manufacturer: "Perkin Elmer",
      testItems: "석영",
      status: "active",
    },
    {
      category: "작업환경",
      name: "자외선흡광광도계",
      model: "UV-1900i",
      manufacturer: "SHIMADZU",
      testItems: "과산화수소, 알킬니아 등 분석",
      status: "active",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-FID)",
      model: "8890A",
      manufacturer: "Agilent Technologies",
      testItems: "휘발성유기화합물",
      status: "active",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피 (GC-FID)",
      model: "7890A",
      manufacturer: "Agilent Technologies",
      testItems: "휘발성유기화합물",
      status: "active",
    },
    {
      category: "작업환경",
      name: "전자저울(Micro Blance)",
      model: "METTLER AT261",
      manufacturer: "METTLER",
      testItems: "중량 분석",
      status: "active",
    },
    {
      category: "작업환경",
      name: "전자저울(Micro Blance)(10⁻⁵)",
      model: "MT5",
      manufacturer: "METTLER",
      testItems: "극소량의 중량 분석",
      status: "active",
    },
  ];

  const maintenanceSchedule = [
    {
      equipment: "ICP-MS",
      lastMaintenance: "2024.01.15",
      nextMaintenance: "2024.04.15",
    },
    {
      equipment: "GC-MS",
      lastMaintenance: "2024.02.10",
      nextMaintenance: "2024.05.10",
    },
    {
      equipment: "실내공기질 측정기",
      lastMaintenance: "2024.01.25",
      nextMaintenance: "2024.04.25",
    },
    {
      equipment: "편광현미경",
      lastMaintenance: "2024.02.05",
      nextMaintenance: "2024.05.05",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-display-lg mb-6">
              주요장비현황
            </h1>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto">
              정확하고 신뢰할 수 있는 분석을 위한 첨단 장비 현황
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <Section spacing="none" className="pt-10 lg:pt-12">
        <Container>
        {/* Equipment Documents Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">장비 상세 자료</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentDocuments.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedPdf(doc.file)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm mb-1 line-clamp-2">
                        {doc.title}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-xs rounded-full">
                        {doc.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                      <FileText className="w-4 h-4" />
                      <span>PDF</span>
                    </div>
                    <a
                      href={doc.file}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Lab Photos Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">분석실 현황</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(labImages).map(([labName, images], index) => (
              <motion.div
                key={labName}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedCategory(labName);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{labName}</h3>
                    <p className="text-sm opacity-90">
                      {images.length}장의 사진
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipment Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
                <div
                  className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
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

          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">장비명</th>
                    <th className="px-6 py-4 text-left font-bold">모델명</th>
                    <th className="px-6 py-4 text-left font-bold">제조사</th>
                    <th className="px-6 py-4 text-left font-bold">검사항목</th>
                    <th className="px-6 py-4 text-center font-bold">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {equipment.map((item, index) => (
                    <motion.tr
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full mb-1">
                            {item.category}
                          </span>
                          <div className="font-bold text-neutral-900 dark:text-neutral-100">
                            {item.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.model}
                      </td>
                      <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                        {item.manufacturer}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                        {item.testItems}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            가동중
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <div
                  key={item.equipment}
                  className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold mb-1">{item.equipment}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        최근 점검: {item.lastMaintenance}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                        다음 점검
                      </div>
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
              모든 분석장비는 <strong>ISO/IEC 17025</strong> 기준에 따라
              관리되며, 정기적인 교정과 점검을 통해{" "}
              <strong>최고 수준의 분석 정확도</strong>를 유지하고 있습니다.
            </p>
          </div>
        </motion.div>
        </Container>
      </Section>

      {/* Image Gallery Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-6xl w-full">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              {selectedCategory}
            </h2>

            <div className="relative">
              <img
                src={labImages[selectedCategory][currentImageIndex].src}
                alt={labImages[selectedCategory][currentImageIndex].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              {labImages[selectedCategory].length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0
                          ? labImages[selectedCategory].length - 1
                          : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === labImages[selectedCategory].length - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {labImages[selectedCategory].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <p className="text-white text-center mt-4">
              {currentImageIndex + 1} / {labImages[selectedCategory].length}
            </p>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPdf(null)}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-7xl w-full h-[90vh] bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
            <div className="h-full">
              <iframe
                src={selectedPdf}
                className="w-full h-full"
                title="장비 상세 자료"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Equipment;
