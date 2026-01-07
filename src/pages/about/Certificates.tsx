import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { X, Download, AlertCircle } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  issueDate?: string;
  thumbPath: string;
  viewPath: string;
  pdfPath: string;
}

const certificates: Certificate[] = [
  {
    id: "kosha_ms",
    title: "KOSHA-MS 인증",
    issuer: "한국산업안전보건공단",
    description: "안전보건경영시스템 인증",
    thumbPath: "/certificates/thumb/kosha_ms_certificate_thumb.png",
    viewPath: "/certificates/view/kosha_ms_certificate_view-000.png",
    pdfPath: "/certificates/pdf/kosha_ms_certificate.pdf",
  },
  {
    id: "innobiz",
    title: "Inno-Biz 인증",
    issuer: "중소벤처기업부",
    description: "기술혁신형 중소기업 인증",
    thumbPath: "/certificates/thumb/innobiz_certificate_thumb.png",
    viewPath: "/certificates/view/innobiz_certificate_view-000.png",
    pdfPath: "/certificates/pdf/innobiz_certificate.pdf",
  },
  {
    id: "water_quality",
    title: "먹는물 수질검사기관 지정",
    issuer: "환경부",
    description: "먹는물 관리법에 따른 수질검사기관 지정",
    thumbPath: "/certificates/thumb/water_quality_designation_thumb.png",
    viewPath: "/certificates/view/water_quality_designation_view-000.png",
    pdfPath: "/certificates/pdf/water_quality_designation.pdf",
  },
  {
    id: "asbestos",
    title: "석면조사기관 지정",
    issuer: "환경부",
    description: "석면안전관리법에 따른 석면조사기관 지정",
    thumbPath: "/certificates/thumb/asbestos_designation_thumb.png",
    viewPath: "/certificates/view/asbestos_designation_view-000.png",
    pdfPath: "/certificates/pdf/asbestos_designation.pdf",
  },
  {
    id: "asbestos_supervision",
    title: "석면해체·제거 감리업 등록",
    issuer: "환경부",
    description: "석면 해체·제거 작업 감리업 등록",
    thumbPath: "/certificates/thumb/asbestos_supervision_designation_thumb.png",
    viewPath: "/certificates/view/asbestos_supervision_designation_view-000.png",
    pdfPath: "/certificates/pdf/asbestos_supervision_designation.pdf",
  },
  {
    id: "indoor_air",
    title: "실내공기질 측정대행업 등록",
    issuer: "환경부",
    description: "실내공기질 관리법에 따른 측정대행업 등록",
    thumbPath: "/certificates/thumb/indoor_air_quality_agency_thumb.png",
    viewPath: "/certificates/view/indoor_air_quality_agency_view-000.png",
    pdfPath: "/certificates/pdf/indoor_air_quality_agency.pdf",
  },
  {
    id: "work_environment",
    title: "작업환경측정기관 지정",
    issuer: "고용노동부",
    description: "산업안전보건법에 따른 작업환경측정기관 지정",
    thumbPath: "/certificates/thumb/work_environment_measurement_designation_thumb.png",
    viewPath: "/certificates/view/work_environment_measurement_designation_view-000.png",
    pdfPath: "/certificates/pdf/work_environment_measurement_designation.pdf",
  },
  {
    id: "research_lab",
    title: "연구소 인증",
    issuer: "한국산업기술진흥협회",
    description: "기업부설연구소 인증",
    thumbPath: "/certificates/thumb/research_lab_certificate_thumb.png",
    viewPath: "/certificates/view/research_lab_certificate_view-000.png",
    pdfPath: "/certificates/pdf/research_lab_certificate.pdf",
  },
  {
    id: "quality_indoor",
    title: "정도관리 적합 인정 (실내공기)",
    issuer: "국립환경과학원",
    description: "실내공기질 측정 정도관리 적합 인정",
    thumbPath: "/certificates/thumb/quality_control_certificate_indoor_air_thumb.png",
    viewPath: "/certificates/view/quality_control_certificate_indoor_air_view-000.png",
    pdfPath: "/certificates/pdf/quality_control_certificate_indoor_air.pdf",
  },
  {
    id: "quality_water",
    title: "정도관리 적합 확인 (먹는물)",
    issuer: "국립환경과학원",
    description: "먹는물 수질검사 정도관리 적합 확인",
    thumbPath: "/certificates/thumb/quality_control_verification_water_thumb.png",
    viewPath: "/certificates/view/quality_control_verification_water_view-000.png",
    pdfPath: "/certificates/pdf/quality_control_verification_water.pdf",
  },
  {
    id: "business_registration",
    title: "사업자등록증",
    issuer: "국세청",
    description: "법인 사업자등록증",
    thumbPath: "/certificates/thumb/business_registration_color_thumb.png",
    viewPath: "/certificates/view/business_registration_color_view-000.png",
    pdfPath: "/certificates/pdf/business_registration_color.pdf",
  },
];

export default function Certificates() {
  const location = useLocation();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // 이 페이지 진입 시 무조건 top으로 스크롤하여 scroll restoration 방지
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 모달 열릴 때 body scroll 차단
  useEffect(() => {
    if (selectedCertificate) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedCertificate]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCertificate) {
        setSelectedCertificate(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedCertificate]);

  // Focus trap
  useEffect(() => {
    if (!selectedCertificate) return;

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;

    const firstFocusable = modal.querySelector(focusableElements) as HTMLElement;
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusable = focusableContent[focusableContent.length - 1] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

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

    modal.addEventListener("keydown", trapFocus as EventListener);
    return () => modal.removeEventListener("keydown", trapFocus as EventListener);
  }, [selectedCertificate]);

  const handleDownloadPDF = (pdfPath: string, title: string) => {
    window.open(pdfPath, "_blank");
  };

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
              인증서/자격
            </h1>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소가 보유한 공식 인증서 및 자격 현황입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards section: standard section spacing (py-12 ~ py-16) */}
      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
              >
                {/* 썸네일 이미지 */}
                <div
                  className="relative h-48 bg-neutral-100 dark:bg-neutral-700 overflow-hidden cursor-pointer group"
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setImageLoading(true);
                    setImageError(false);
                  }}
                >
                  <img
                    src={cert.thumbPath}
                    alt={`${cert.title} 썸네일`}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
                </div>

                {/* 카드 본문 */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 flex-1">
                    {cert.description}
                  </p>

                  {/* 버튼 영역 */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => {
                        setSelectedCertificate(cert);
                        setImageLoading(true);
                        setImageError(false);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                    >
                      자세히 보기
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPDF(cert.pdfPath, cert.title);
                      }}
                      className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                      aria-label={`${cert.title} PDF 다운로드`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certificate Image Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/70 z-[1050] flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
            role="dialog"
            aria-modal="true"
            aria-label="인증서 이미지 확대 보기"
          >
            {/* 상단 컨트롤 영역 */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
              <div className="text-sm text-white/70 font-medium">
                {selectedCertificate.title}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPDF(selectedCertificate.pdfPath, selectedCertificate.title);
                  }}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="PDF 다운로드"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCertificate(null);
                  }}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="이미지 닫기"
                  autoFocus
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 이미지 컨테이너 */}
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
                    src={selectedCertificate.viewPath}
                    alt={`${selectedCertificate.title} 상세 이미지`}
                    className="w-full h-auto max-h-[80vh] object-contain rounded cursor-pointer"
                    style={{ opacity: imageLoading ? 0 : 1, transition: "opacity 0.2s" }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                    onClick={() => setSelectedCertificate(null)}
                  />
                )}
              </div>
            </motion.div>

            {/* 하단 보조 정보 */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs text-white/50">클릭하여 닫기 · ESC</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
