import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "../ui";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      {/* Main Footer */}
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
              (사)한국환경안전연구소 | 대표이사: 이정식
            </p>
            <p className="text-sm text-neutral-400">
              사업자등록번호: 317-81-01323 | 법인등록번호: 150111-0098934
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">연락처</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-300">
                  충북 청주시 서원구 남이면 양동3길 7-30 (28805)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a
                  href="tel:043-237-7624"
                  className="text-neutral-300 hover:text-brand-400 transition-smooth"
                >
                  043-237-7624~5
                </a>
                <span className="text-neutral-500">|</span>
                <span className="text-neutral-400">FAX: 043-237-7826</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a
                  href="mailto:kesri0728@naver.com"
                  className="text-neutral-300 hover:text-brand-400 transition-smooth"
                >
                  kesri0728@naver.com
                </a>
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
