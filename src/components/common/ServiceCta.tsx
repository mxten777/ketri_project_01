import { Phone, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "../../constants/menu";

interface ServiceCtaProps {
  /** CTA 헤드라인 (예: "작업환경 측정 상담이 필요하신가요?") */
  message?: string;
  /** CTA 서브타이틀 (선택) */
  subtitle?: string;
}

// Footer와 동일한 그라데이션 배경 (가독성 최적화)
const CTA_BG = {
  background:
    "linear-gradient(90deg, rgba(0,105,255,1) 0%, rgba(30,64,175,1) 55%, rgba(2,132,199,1) 100%)",
} as const;

const CTA_HL = {
  background:
    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 55%)",
} as const;

/**
 * 서비스 페이지 공통 CTA 섹션
 * - 전화 문의: 모바일에서 바로 통화 연결 (tel:)
 * - 상담 요청: 페이지 최상단으로 스크롤 (전화 정보 노출)
 */
export default function ServiceCta({ message, subtitle }: ServiceCtaProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative rounded-2xl shadow-premium overflow-hidden" style={CTA_BG}>
      {/* Subtle highlights */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={CTA_HL} />
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* High contrast text with refined shadow */}
          <h3 className="text-3xl md:text-4xl font-extrabold mb-5 leading-[1.3] text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.25)]">
            {message || "전문가와 상담이 필요하신가요?"}
          </h3>
          <p className="text-xl md:text-2xl leading-[1.6] font-bold mb-10 text-white [text-shadow:_0_1px_6px_rgba(0,0,0,0.2)]">
            {subtitle || "한국환경안전연구소의 전문 상담원이 신속하고 정확하게 안내해 드립니다."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 전화 문의 CTA - 모바일 즉시 통화 */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-primary-900 text-lg font-extrabold rounded-xl hover:bg-neutral-50 border-2 border-white/40 hover:border-white/60 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 min-w-[240px]"
            >
            <Phone className="w-6 h-6" />
            <span>전화 문의</span>
          </a>

          {/* 상담 요청 CTA - 페이지 상단으로 */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/90 text-primary-900 text-lg font-extrabold rounded-xl hover:bg-white transition-all duration-200 border-2 border-white/50 hover:border-white/70 shadow-lg hover:shadow-xl hover:scale-[1.02] min-w-[240px]"
          >
            <MessageSquare className="w-6 h-6" />
            <span>상담 요청</span>
          </button>
        </div>

        {/* 연락처 정보 */}
        <div className="mt-10 pt-8 border-t border-white/40">
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center text-base">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <span className="font-extrabold text-white">{CONTACT_INFO.phoneRange}</span>
            </div>
            <span className="hidden sm:inline text-white font-bold">|</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">평일 09:00 - 18:00 (주말·공휴일 휴무)</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
