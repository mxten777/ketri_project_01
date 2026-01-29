import { Phone, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "../../constants/menu";

interface ServiceCtaProps {
  /** CTA 헤드라인 (예: "작업환경 측정 상담이 필요하신가요?") */
  message?: string;
  /** CTA 서브타이틀 (선택) */
  subtitle?: string;
}

// 기업형 블루 그라데이션 배경
const CTA_BG = {
  background:
    "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
} as const;

/**
 * 기업형 서비스 CTA 섹션
 * - 전화 문의: 모바일에서 바로 통화 연결 (tel:)
 * - 상담 요청: 페이지 최상단으로 스크롤
 * - 기업형 디자인: 깔끔한 레이아웃, 명확한 위계
 */
export default function ServiceCta({ message, subtitle }: ServiceCtaProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative rounded-2xl shadow-2xl overflow-hidden" style={CTA_BG}>
      {/* 미세 텍스처 오버레이 */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 p-10 md:p-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 타이틀 - 기업형 타이포그래피 */}
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-white">
            {message || "전문가 상담이 필요하신가요?"}
          </h3>
          <p className="text-lg md:text-xl leading-relaxed font-medium mb-10 text-white/95">
            {subtitle || "한국환경안전연구소의 전문 상담원이 신속하고 정확하게 안내해 드립니다"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* 전화 문의 CTA - Primary */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-700 text-base font-bold rounded-xl hover:bg-blue-50 border-2 border-white/30 hover:border-white/60 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 min-w-[240px]"
            >
            <Phone className="w-5 h-5" />
            <span>전화 문의</span>
          </a>

          {/* 상담 요청 CTA - Secondary */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-bold rounded-xl hover:bg-white/20 transition-all duration-200 border-2 border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl hover:scale-[1.02] min-w-[240px]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>상담 요청</span>
          </button>
        </div>

        {/* 연락처 정보 - 기업형 간결함 */}
        <div className="mt-10 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white/90" />
              <span className="font-bold text-white">{CONTACT_INFO.phoneRange}</span>
            </div>
            <span className="hidden sm:inline text-white/60 font-medium">|</span>
            <div className="text-white/90 font-medium">
              평일 09:00 - 18:00 (주말·공휴일 휴무)
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
