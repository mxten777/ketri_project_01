import { Phone, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "../../constants/menu";

interface ServiceCtaProps {
  /** 추가 커스텀 메시지 (선택) */
  message?: string;
}

/**
 * 서비스 페이지 공통 CTA 섹션
 * - 전화 문의: 모바일에서 바로 통화 연결 (tel:)
 * - 상담 요청: 페이지 최상단으로 스크롤 (전화 정보 노출)
 */
export default function ServiceCta({ message }: ServiceCtaProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 rounded-2xl p-8 md:p-12 text-white shadow-premium">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {message || "전문가와 상담이 필요하신가요?"}
        </h3>
        <p className="text-lg opacity-90 mb-8">
          한국환경안전연구소의 전문 상담원이 신속하고 정확하게 안내해 드립니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 전화 문의 CTA - 모바일 즉시 통화 */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 min-w-[200px]"
          >
            <Phone className="w-5 h-5" />
            <span>전화 문의</span>
          </a>

          {/* 상담 요청 CTA - 페이지 상단으로 */}
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-200 border-2 border-white/30 hover:border-white/50 min-w-[200px]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>상담 요청</span>
          </button>
        </div>

        {/* 연락처 정보 */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{CONTACT_INFO.phoneRange}</span>
            </div>
            <span className="hidden sm:inline text-white/50">|</span>
            <div className="flex items-center gap-2">
              <span>평일 09:00 - 18:00 (주말·공휴일 휴무)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
