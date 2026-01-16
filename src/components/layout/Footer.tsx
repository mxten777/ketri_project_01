import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "../ui";

const CTA_BG = {
  background:
    "linear-gradient(90deg, rgba(0,105,255,1) 0%, rgba(30,64,175,1) 55%, rgba(2,132,199,1) 100%)",
} as const;

const CTA_HL = {
  background:
    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 55%)",
} as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  // 서비스 페이지에서는 Footer CTA를 숨김 (서비스 페이지에 자체 ServiceCta가 있음)
  const showCta = !location.pathname.startsWith('/services/');

  return (
    <footer
      className={[
        // ✅ 라이트/다크 가독성 확정 (site-footer가 덮어써도 !로 이김)
        "relative isolate overflow-hidden",
        "!bg-white !text-neutral-900",
        "dark:!bg-neutral-950 dark:!text-neutral-100",
        "site-footer",
      ].join(" ")}
    >
      {/* ================= CTA SECTION (서비스 페이지 제외) ================= */}
      {showCta && (
        <div className="relative">
          {/* Base gradient */}
          <div className="absolute inset-0 -z-10 pointer-events-none" style={CTA_BG} />
          {/* Subtle highlights */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-60" style={CTA_HL} />
          {/* Subtle overlay for text contrast */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
          {/* Bottom fade for smooth transition to footer */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent -z-10 pointer-events-none" />

        <div className="relative z-10">
          <Container size="xl">
            <div className="text-center text-white py-16 md:py-20 px-6">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight leading-[1.3] [text-shadow:_0_2px_8px_rgba(0,0,0,0.25)]">
                전문적인 환경안전 서비스가 필요하신가요?
              </h3>
              <p className="text-xl md:text-2xl mb-12 text-white tracking-wide leading-[1.6] font-bold [text-shadow:_0_1px_6px_rgba(0,0,0,0.2)]">
                전문 상담원이 친절하게 안내해드립니다
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-2xl mx-auto">
                <a
                  href="tel:043-237-7824"
                  className={[
                    "group inline-flex items-center gap-3 h-16 rounded-xl font-extrabold text-lg",
                    "text-primary-900 dark:text-primary-900 bg-white hover:bg-neutral-50",
                    "border-2 border-white/60 hover:border-white/80",
                    "shadow-[0_10px_28px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    "px-10 w-full sm:w-auto min-w-[240px] justify-center",
                  ].join(" ")}
                >
                  <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>전화 상담: 043-237-7824</span>
                </a>

                <a
                  href="mailto:kesri0728@naver.com"
                  className={[
                    "group inline-flex items-center gap-3 h-16 rounded-xl font-extrabold text-lg",
                    "text-white bg-white/25 hover:bg-white/35",
                    "border-2 border-white/70 hover:border-white/90",
                    "shadow-[0_10px_28px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    "px-10 w-full sm:w-auto min-w-[240px] justify-center backdrop-blur-md",
                  ].join(" ")}
                >
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>이메일 문의</span>
                </a>
              </div>
            </div>
          </Container>
        </div>

          {/* Subtle divider for footer transition */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />
        </div>
      )}

      {/* ================= MAIN FOOTER ================= */}
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <img
                src="/images/logo_horizontal_trans.png"
                alt="한국환경안전연구소"
                className="h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
              (주)한국환경안전연구소
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">대표이사: 이정식</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              사업자등록번호: 317-81-01323
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              법인등록번호: 150111-0098934
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-white">
              연락처
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-300 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:043-237-7824"
                    className="text-neutral-950 dark:text-neutral-100 hover:text-primary-800 dark:hover:text-primary-200 transition-colors font-semibold text-base block"
                  >
                    043-237-7824~5
                  </a>
                  <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                    FAX: 043-237-7826
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-300 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:kesri0728@naver.com"
                  className="text-neutral-950 dark:text-neutral-200 hover:text-primary-800 dark:hover:text-primary-200 transition-colors font-medium"
                >
                  kesri0728@naver.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-600 dark:text-primary-300 flex-shrink-0 mt-0.5" />
                <div className="text-neutral-800 dark:text-neutral-200">
                  <div>평일 09:00 - 18:00</div>
                  <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                    토·일·공휴일 휴무
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-white">
              오시는 길
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-300 flex-shrink-0 mt-0.5" />
              <div className="text-neutral-800 dark:text-neutral-200 text-sm">
                <p className="mb-2">충북 청주시 서원구 남이면</p>
                <p className="mb-2">양촌 3길 7-30 (28805)</p>
                <Link
                  to="/about/location#map"
                  className="inline-block mt-2 text-primary-800 dark:text-primary-200 hover:text-primary-900 dark:hover:text-primary-100 font-semibold transition-colors"
                >
                  지도 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ================= BOTTOM FOOTER ================= */}
<div className="border-t border-neutral-200 dark:border-neutral-800">
  <Container size="xl" className="py-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 text-sm">
      <div className="text-neutral-800 dark:text-neutral-400">
        © {currentYear} 한국환경안전연구소. All rights reserved.
      </div>

      <div className="flex items-center gap-4 text-neutral-800 dark:text-neutral-400">
        <span className="text-neutral-800 dark:text-neutral-400 opacity-80">이용약관</span>
        <span className="text-neutral-400 dark:text-neutral-600">|</span>
        <span className="text-neutral-800 dark:text-neutral-400 opacity-80">개인정보처리방침</span>
        <span className="text-neutral-400 dark:text-neutral-600">|</span>
        <span className="text-neutral-700 dark:text-neutral-500 opacity-80" title="관리자">Admin</span>
      </div>
    </div>
  </Container>
</div>

    </footer>
  );
};

export default Footer;
