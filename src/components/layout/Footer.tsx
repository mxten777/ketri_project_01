import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "../ui";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      {/* Contact CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 py-12">
        <Container size="xl">
          <div className="text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              전문적인 환경안전 서비스가 필요하신가요?
            </h3>
            <p className="text-lg mb-8 text-white/90">
              전문 상담원이 친절하게 안내해드립니다
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:043-237-7624"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                전화 상담: 043-237-7624
              </a>
              <a
                href="mailto:kesri0728@naver.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                이메일 문의
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <img
                src="/images/logo_horizontal_trans.png"
                alt="한국환경안전연구소"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              (사)한국환경안전연구소
            </p>
            <p className="text-sm text-neutral-400">
              대표이사: 이정식
            </p>
            <p className="text-sm text-neutral-400">
              사업자등록번호: 317-81-01323
            </p>
            <p className="text-sm text-neutral-400">
              법인등록번호: 150111-0098934
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg mb-4">연락처</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:043-237-7624"
                    className="text-neutral-200 hover:text-primary-400 transition-smooth font-medium text-base block"
                  >
                    043-237-7624~5
                  </a>
                  <span className="text-neutral-500 text-xs">FAX: 043-237-7826</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:kesri0728@naver.com"
                  className="text-neutral-200 hover:text-primary-400 transition-smooth"
                >
                  kesri0728@naver.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-neutral-300">
                  <div>평일 09:00 - 18:00</div>
                  <div className="text-neutral-500 text-xs">토·일·공휴일 휴무</div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg mb-4">오시는 길</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div className="text-neutral-300 text-sm">
                <p className="mb-2">충북 청주시 서원구 남이면</p>
                <p className="mb-2">양동3길 7-30 (28805)</p>
                <Link
                  to="/about/location"
                  className="inline-block mt-2 text-primary-400 hover:text-primary-300 font-medium"
                >
                  지도 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <Container size="xl" className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 text-sm">
            <div className="text-neutral-400">
              © {currentYear} 한국환경안전연구소. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/terms"
                className="text-neutral-400 hover:text-brand-400 transition-smooth"
              >
                이용약관
              </Link>
              <span className="text-neutral-700">|</span>
              <Link
                to="/privacy"
                className="text-neutral-400 hover:text-brand-400 transition-smooth"
              >
                개인정보처리방침
              </Link>
              <span className="text-neutral-700">|</span>
              <Link
                to="/admin/login"
                className="text-neutral-500 hover:text-brand-400 transition-smooth"
                title="관리자"
              >
                Admin
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
