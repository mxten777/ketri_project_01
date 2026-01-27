import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Microscope,
  FlaskConical,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Inbox,
  AlertCircle,
} from "lucide-react";
 

const Equipment = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedEquipmentImage, setSelectedEquipmentImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // 모달 열릴 때 body scroll 차단 - 기존 값 저장 및 복원
  useEffect(() => {
    if (selectedEquipmentImage) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedEquipmentImage]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEquipmentImage) {
        setSelectedEquipmentImage(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedEquipmentImage]);

  // Focus trap - 모달 내부에서만 포커스 순환
  useEffect(() => {
    if (!selectedEquipmentImage) return;

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;

    const firstFocusable = modal.querySelector(focusableElements) as HTMLElement;
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusable = focusableContent[focusableContent.length - 1] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    modal.addEventListener('keydown', trapFocus as EventListener);
    return () => modal.removeEventListener('keydown', trapFocus as EventListener);
  }, [selectedEquipmentImage]);

  // 분석실별 이미지 데이터
  const labImages: Record<string, Array<{ src: string; alt: string }>> = {
    "기기분석실": Array.from({ length: 8 }, (_, i) => ({
      src: `/images/equipment/instrument_analysis_lab_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `기기분석실 ${i + 1}`,
    })),
    전처리실: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/equipment/sample_preparation_lab_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `전처리실 ${i + 1}`,
    })),
    미생물실: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/equipment/microbiology_lab_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `미생물실 ${i + 1}`,
    })),
    석면실: Array.from({ length: 1 }, (_, i) => ({
      src: `/images/equipment/asbestos_lab_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `석면실 ${i + 1}`,
    })),
    천칭실: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/equipment/balance_room_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `천칭실 ${i + 1}`,
    })),
    먹는물시료냉장고: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/equipment/drinking_water_sample_fridge_${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `먹는물시료냉장고 ${i + 1}`,
    })),
  };

  const equipment = [
    {
      category: "먹는물",
      name: "가스크로마토그래피-질량분석기(GC-MSD)",
      model: "7890B-5977A",
      manufacturer: "Agilent",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_01/equip_001.jpeg",
    },
    {
      category: "먹는물",
      name: "퍼지앤트랩(Purge & Trap)",
      model: "AQUATek 100",
      manufacturer: "TELEDYNE TEKMAR",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_01/equip_002.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-질량분석기/헤드스페이스(GC-MSD/Headspace)",
      model: "6890N-5975 / CombiPAL",
      manufacturer: "Agilent / CTC Analytics",
      testItems: "지오스민",
      image: "/images/equipment/images_01/equip_003.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-질량분석기(GC-MSD)",
      model: "6890N / 5975",
      manufacturer: "Agilent",
      testItems: "1,4-다이옥산",
      image: "/images/equipment/images_01/equip_004.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-질량분석기/헤드스페이스(GC-MSD/Headspace)",
      model: "6890N-5975 / CombiPAL",
      manufacturer: "Agilent / CTC Analytics",
      testItems: "포름알데히드",
      image: "/images/equipment/images_01/equip_005.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-질량분석기(GC-MSD)",
      model: "2010PLUS / QP2010",
      manufacturer: "SHIMADZU",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_01/equip_006.jpeg",
    },
    {
      category: "먹는물",
      name: "유도결합플라즈마-질량분석기(ICP-MS)",
      model: "iCAP RQ",
      manufacturer: "Thermo",
      testItems: "중금속",
      image: "/images/equipment/images_01/equip_007.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-전자포획검출기(GC-ECD)",
      model: "6890N",
      manufacturer: "Agilent",
      testItems: "할로아세틱에시드",
      image: "/images/equipment/images_01/equip_008.jpeg",
    },
    {
      category: "먹는물",
      name: "가스크로마토그래피-질소인검출기(GC-NPD)",
      model: "6890N",
      manufacturer: "Agilent",
      testItems: "유기인계농약, 카바릴",
      image: "/images/equipment/images_01/equip_009.jpeg",
    },
    {
      category: "먹는물",
      name: "액체크로마토그래피-텐덤질량분석기(LC-MS/MS)",
      model: "6495 LC/TQ",
      manufacturer: "Agilent",
      testItems: "마이크로시스틴, 과불화합물",
      image: "/images/equipment/images_01/equip_010.jpeg",
    },
    {
      category: "먹는물",
      name: "고성능액체크로마토그래피(HPLC)",
      model: "e2695",
      manufacturer: "WATERS",
      testItems: "카바릴",
      image: "/images/equipment/images_01/equip_011.jpeg",
    },
    {
      category: "먹는물",
      name: "수질자동분석기",
      model: "FUTRA3",
      manufacturer: "Alliance",
      testItems: "시안, 페놀, 세제",
      image: "/images/equipment/images_01/equip_012.jpeg",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피(IC)",
      model: "Dionex Aquion",
      manufacturer: "Thermo",
      testItems: "음이온",
      image: "/images/equipment/images_01/equip_013.jpeg",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피(IC)",
      model: "881 Compact IC Pro",
      manufacturer: "Metrohm",
      testItems: "음이온",
      image: "/images/equipment/images_01/equip_014.jpeg",
    },
    {
      category: "먹는물",
      name: "이온크로마토그래피(IC)",
      model: "ICS-1100",
      manufacturer: "Thermo",
      testItems: "브롬산염",
      image: "/images/equipment/images_01/equip_015.jpeg",
    },
    {
      category: "먹는물",
      name: "수은분석기(Mercury Analyzer)",
      model: "FIMS400",
      manufacturer: "PerkinElmer",
      testItems: "수은",
      image: "/images/equipment/images_01/equip_016.jpeg",
    },
    {
      category: "먹는물",
      name: "가시선-자외선 분광광도계(UV-Vis)",
      model: "UV-1900i",
      manufacturer: "SHIMADZU",
      testItems: "암모니아성질소",
      image: "/images/equipment/images_01/equip_017.jpeg",
    },
    {
      category: "먹는물",
      name: "액체섬광계수기(LCS)",
      model: "300SL",
      manufacturer: "HIDEX",
      testItems: "라돈",
      image: "/images/equipment/images_01/equip_018.jpeg",
    },
    {
      category: "먹는물",
      name: "유도결합플라즈마-분광분석기(ICP-OES)",
      model: "iCAP 7000",
      manufacturer: "Thermo",
      testItems: "중금속",
      image: "/images/equipment/images_01/equip_019.jpeg",
    },
    {
      category: "먹는물",
      name: "총유기탄소 분석기(TOC Analyzer)",
      model: "TOC-L / ASI-L",
      manufacturer: "SHIMADZU",
      testItems: "총유기탄소",
      image: "/images/equipment/images_01/equip_020.jpeg",
    },
    {
      category: "먹는물",
      name: "마이크로웨이브(Microwave)",
      model: "Multiwave 3000",
      manufacturer: "Anton Paar",
      testItems: "시료 전처리",
      image: "/images/equipment/images_01/equip_021.jpeg",
    },
    {
      category: "먹는물",
      name: "항온항습배양기",
      model: "LHS-100CL",
      manufacturer: "NEURONFIT",
      testItems: "미생물",
      image: "/images/equipment/images_01/equip_022.jpeg",
    },
    {
      category: "먹는물",
      name: "배양기",
      model: "HSM-125 2ROOM",
      manufacturer: "SINAN",
      testItems: "미생물",
      image: "/images/equipment/images_01/equip_023.jpeg",
    },
    {
      category: "먹는물",
      name: "배양기",
      model: "IMP180",
      manufacturer: "Thermo",
      testItems: "미생물",
      image: "/images/equipment/images_01/equip_024.jpeg",
    },
    {
      category: "먹는물",
      name: "고압멸균기(Autoclave)",
      model: "SSAC-060H",
      manufacturer: "SSOLKOREA",
      testItems: "배지 제조",
      image: "/images/equipment/images_01/equip_025.jpeg",
    },
    {
      category: "먹는물",
      name: "내독소 분석기(Endotoxin Analyzer)",
      model: "ELx808",
      manufacturer: "Charles River",
      testItems: "엔도톡신",
      image: "/images/equipment/images_01/equip_026.jpeg",
    },
    {
      category: "먹는물",
      name: "광학현미경",
      model: "CHK2-F-GS",
      manufacturer: "OLYMPUS",
      testItems: "녹농균, 살모넬라, 쉬겔라, 여시니아균",
      image: "/images/equipment/images_01/equip_027.jpeg",
    },
    {
      category: "먹는물",
      name: "무균작업대(Clean Bench)",
      model: "HB-402VL-O",
      manufacturer: "한백과학",
      testItems: "미생물",
      image: "/images/equipment/images_01/equip_028.jpeg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-FID)",
      model: "8890A",
      manufacturer: "Agilent",
      testItems: "유기화합물",
      image: "/images/equipment/images_02/split2_equip_001.jpg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-FID)",
      model: "7890A",
      manufacturer: "Agilent",
      testItems: "유기화합물",
      image: "/images/equipment/images_02/split2_equip_002.jpg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-FPD)",
      model: "6890N",
      manufacturer: "Agilent",
      testItems: "이황화탄소, 황산디메틸",
      image: "/images/equipment/images_02/split2_equip_003.jpg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-ECD)",
      model: "GC-2010 PLUS",
      manufacturer: "SHIMADZU",
      testItems: "산화에틸렌",
      image: "/images/equipment/images_02/split2_equip_004.jpg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-FID)",
      model: "GC-2010",
      manufacturer: "SHIMADZU",
      testItems: "유기화합물",
      image: "/images/equipment/images_02/split2_equip_005.jpg",
    },
    {
      category: "작업환경",
      name: "가스크로마토그래피(GC-FID)",
      model: "GC-2010 PLUS",
      manufacturer: "SHIMADZU",
      testItems: "유기화합물",
      image: "/images/equipment/images_02/split2_equip_006.jpg",
    },
    {
      category: "작업환경",
      name: "유도결합플라즈마-질량분석기(ICP-MS)",
      model: "G3272B",
      manufacturer: "Agilent",
      testItems: "중금속",
      image: "/images/equipment/images_02/split2_equip_007.jpg",
    },
    {
      category: "작업환경",
      name: "고성능액체크로마토그래피(HPLC)",
      model: "LC-40A",
      manufacturer: "SHIMADZU",
      testItems: "알데하이드류, 아민류",
      image: "/images/equipment/images_02/split2_equip_008.jpg",
    },
    {
      category: "작업환경",
      name: "이온크로마토그래피(IC)",
      model: "DIONEX IC",
      manufacturer: "Thermo",
      testItems: "음이온",
      image: "/images/equipment/images_02/split2_equip_009.jpg",
    },
    {
      category: "작업환경",
      name: "적외선 분광계(FT-IR)",
      model: "Spectrum Two",
      manufacturer: "PerkinElmer",
      testItems: "석영",
      image: "/images/equipment/images_02/split2_equip_010.jpg",
    },
    {
      category: "작업환경",
      name: "고성능액체크로마토그래피(HPLC)",
      model: "Waters 1525",
      manufacturer: "WATERS",
      testItems: "6가크롬",
      image: "/images/equipment/images_02/split2_equip_011.jpg",
    },
    {
      category: "작업환경",
      name: "자외선분광광도계(UV)",
      model: "UV-1900i",
      manufacturer: "SHIMADZU",
      testItems: "과산화수소, 암모니아",
      image: "/images/equipment/images_02/split2_equip_012.jpg",
    },
    {
      category: "작업환경",
      name: "전자저울",
      model: "MT5",
      manufacturer: "Mettler Toledo",
      testItems: "극소량",
      image: "/images/equipment/images_02/split2_equip_013.jpg",
    },
    {
      category: "작업환경",
      name: "전자저울",
      model: "AT261",
      manufacturer: "Mettler Toledo",
      testItems: "중량",
      image: "/images/equipment/images_02/split2_equip_014.jpg",
    },
    {
      category: "실내공기질",
      name: "가스크로마토그래피-질량분석기(GC-MSD)",
      model: "Clarus 680",
      manufacturer: "PerkinElmer",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_03/split3_equip_001.jpg",
    },
    {
      category: "실내공기질",
      name: "열탈착장치(TD)",
      model: "TurboMatrix 650",
      manufacturer: "PerkinElmer",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_03/split3_equip_002.jpg",
    },
    {
      category: "실내공기질",
      name: "가스크로마토그래피(GC-FID)",
      model: "GC-2010",
      manufacturer: "SHIMADZU",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_03/split3_equip_003.jpg",
    },
    {
      category: "실내공기질",
      name: "열탈착장치(TD)",
      model: "TurboMatrix 350",
      manufacturer: "PerkinElmer",
      testItems: "휘발성유기화합물",
      image: "/images/equipment/images_03/split3_equip_004.jpg",
    },
    {
      category: "실내공기질",
      name: "고성능액체크로마토그래피(HPLC)",
      model: "LC-20A",
      manufacturer: "SHIMADZU",
      testItems: "폼알데하이드",
      image: "/images/equipment/images_03/split3_equip_005.jpg",
    },
    {
      category: "실내공기질",
      name: "라돈 분석기(AlphaTrack Detector)",
      model: "44345 / DCW20",
      manufacturer: "CELESTRON",
      testItems: "라돈",
      image: "/images/equipment/images_03/split3_equip_006.jpg",
    },
    {
      category: "실내공기질",
      name: "위상차현미경",
      model: "CX31 RBSF",
      manufacturer: "OLYMPUS",
      testItems: "석면",
      image: "/images/equipment/images_03/split3_equip_007.jpg",
    },
    {
      category: "실내공기질",
      name: "배양기",
      model: "LBI-150E",
      manufacturer: "LabTech",
      testItems: "부유세균",
      image: "/images/equipment/images_03/split3_equip_008.jpg",
    },
    {
      category: "실내공기질",
      name: "전자저울",
      model: "BM5D",
      manufacturer: "AND",
      testItems: "미세먼지",
      image: "/images/equipment/images_03/split3_equip_009.jpg",
    },
    {
      category: "실내공기질",
      name: "배양기",
      model: "LIB-300M",
      manufacturer: "LabTech",
      testItems: "부유세균",
      image: "/images/equipment/images_03/split3_equip_010.jpg",
    },
    {
      category: "실내공기질",
      name: "자동 습도조절 데시케이터",
      model: "OH-3S",
      manufacturer: "AS ONE",
      testItems: "미세먼지",
      image: "/images/equipment/images_03/split3_equip_011.jpg",
    },
    {
      category: "석면",
      name: "위상차현미경",
      model: "ECLIPSE E200",
      manufacturer: "Nikon",
      testItems: "공기중 석면",
      image: "/images/equipment/images_04/01_phase_contrast_microscope_eclipse_e200_nikon.jpg",
    },
    {
      category: "석면",
      name: "위상차현미경",
      model: "BA200",
      manufacturer: "MOTIC",
      testItems: "공기중 석면",
      image: "/images/equipment/images_04/02_phase_contrast_microscope_ba200_motic.jpg",
    },
    {
      category: "석면",
      name: "편광현미경",
      model: "ECLIPSE CiPOL",
      manufacturer: "Nikon",
      testItems: "고형 석면",
      image: "/images/equipment/images_04/03_polarization_microscope_eclipse_cipol_nikon.jpg",
    },
    {
      category: "석면",
      name: "편광현미경",
      model: "BA300 Pol",
      manufacturer: "MOTIC",
      testItems: "고형 석면",
      image: "/images/equipment/images_04/04_polarization_microscope_plm_ba300_pol_motic.jpg",
    },
    {
      category: "석면",
      name: "실체현미경",
      model: "SMZ-143",
      manufacturer: "MOTIC",
      testItems: "고형 석면",
      image: "/images/equipment/images_04/05_stereo_microscope_smz_143_series_motic.jpg",
    },
    {
      category: "석면",
      name: "아세톤 기화기",
      model: "800101",
      manufacturer: "Quick Fix",
      testItems: "공기중 석면",
      image: "/images/equipment/images_04/06_acetone_vaporizer_800101_quick_fix.jpg",
    },
    {
      category: "석면",
      name: "전기로",
      model: "LEF-105S-1",
      manufacturer: "LabTech",
      testItems: "고형 석면",
      image: "/images/equipment/images_04/07_muffle_furnace_lef_105s_1_labtech.jpg",
    },
    {
      category: "석면",
      name: "전자저울",
      model: "AT261",
      manufacturer: "Mettler Toledo",
      testItems: "고형 석면",
      image: "/images/equipment/images_04/08_microbalance_at261_mettler_toledo.jpg",
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
                    <th className="px-6 py-4 text-center font-bold">이미지</th>
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
                          <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-neutral-800 text-primary-600 dark:text-primary-400 text-xs rounded-full mb-1">
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
                        <div className="flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              setSelectedEquipmentImage(item.image);
                              setImageLoading(true);
                              setImageError(false);
                            }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Maintenance Schedule removed from public pages */}

        {/* 품질관리 프로세스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-10"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="heading-lg mb-3">품질관리 프로세스</h2>
            <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-6">
              의뢰 접수부터 분석, 결과 보고까지 표준 절차에 따라 투명하게 진행합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Step 01 - 접수 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-neutral-500 dark:text-neutral-400">01</span>
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <Inbox className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">접수</h3>
                <p className="text-body-md text-neutral-700 dark:text-neutral-300 mb-2">의뢰 내용을 확인하고 시료/방법/일정을 확정합니다.</p>
                <p className="text-body-sm text-neutral-500 dark:text-neutral-400">필요 시 사전 상담 및 범위 조정</p>
              </div>

              {/* Step 02 - 분석 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-neutral-500 dark:text-neutral-400">02</span>
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">분석</h3>
                <p className="text-body-md text-neutral-700 dark:text-neutral-300 mb-2">공인 절차 및 내부 QC 기준에 따라 분석을 수행합니다.</p>
                <p className="text-body-sm text-neutral-500 dark:text-neutral-400">장비 점검·검량·블랭크/표준물질 확인</p>
              </div>

              {/* Step 03 - 보고 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-neutral-500 dark:text-neutral-400">03</span>
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">보고</h3>
                <p className="text-body-md text-neutral-700 dark:text-neutral-300 mb-2">결과를 검토 후 보고서로 제공하고 이력 관리합니다.</p>
                <p className="text-body-sm text-neutral-500 dark:text-neutral-400">결과 해석 지원 및 재분석 안내</p>
              </div>
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
          <h2 className="heading-lg mb-6">품질관리 시스템</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">정기 교정</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                국가표준기관 인정 교정으로 측정 정확도 보장
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">정도관리</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                표준물질을 이용한 정기적인 분석 정도관리
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-100">숙련도시험</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
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

      {/* Equipment Image Modal - 고급 뷰어 */}
      <AnimatePresence>
        {selectedEquipmentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/70 z-[1050] flex items-center justify-center p-4"
            onClick={() => setSelectedEquipmentImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="장비 이미지 확대 보기"
          >
            {/* 상단 컨트롤 영역 */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
              <div className="text-sm text-white/70 font-medium">
                장비 이미지 보기
              </div>
              <div className="flex items-center gap-2">
                {/* 접근성 테스트용 숨김 요소 - 향후 기능 추가 시 실제 버튼으로 전환 가능 */}
                <button
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-20 focus:bg-white/10 focus:text-white focus:px-3 focus:py-2 focus:rounded-lg"
                  aria-label="테스트용 포커스 요소"
                  tabIndex={0}
                >
                  Focus Test
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEquipmentImage(null);
                  }}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="이미지 닫기"
                  autoFocus
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 이미지 컨테이너 - 뷰어 프레임 */}
            {/* 
              [클릭 닫기 정책]
              1. backdrop(최외곽 div) 클릭 → 닫기
              2. 이미지 컨테이너(프레임) 클릭 → stopPropagation으로 닫기 방지
              3. 이미지 자체 클릭 → 닫기 (향후 확대 기능 추가 시 이 이벤트만 조정)
            */}
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-neutral-800/40 backdrop-blur-sm rounded-lg p-3 shadow-2xl">
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                
                {imageError ? (
                  <div className="flex flex-col items-center justify-center py-24 text-white/60">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <p className="text-sm">이미지를 불러올 수 없습니다</p>
                  </div>
                ) : (
                  <img
                    src={selectedEquipmentImage}
                    alt="장비 이미지"
                    className="w-full h-auto max-h-[80vh] object-contain rounded cursor-pointer"
                    style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.2s' }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                    onClick={() => setSelectedEquipmentImage(null)}
                  />
                )}
              </div>
            </motion.div>

            {/* 하단 보조 정보 */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs text-white/50">
                클릭하여 닫기 · ESC
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Equipment;
