import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "산업보건컨설팅", path: "/industrial-health" },
      { label: "먹는물 검사", path: "/water-testing" },
      { label: "혈액특성용수", path: "/dialysis-water" },
      { label: "실내공기질 측정", path: "/indoor-air-quality" },
      { label: "석면조사·분석", path: "/asbestos" },
    ],
    company: [
      { label: "인사말", path: "/about/greeting" },
      { label: "연혁", path: "/about/history" },
      { label: "조직도", path: "/about/organization" },
      { label: "CI소개", path: "/about/ci" },
      { label: "인증서", path: "/about/certificates" },
      { label: "주요장비현황", path: "/about/equipment" },
      { label: "오시는길", path: "/about/location" },
    ],
    support: [
      { label: "공지사항", path: "/board/notices" },
      { label: "질문답변", path: "/board/qna" },
      { label: "자료실", path: "/board/resources" },
      { label: "이용약관", path: "/terms" },
      { label: "개인정보처리방침", path: "/privacy" },
    ],
  };

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-6">
              <img
                src="/images/logo_horizontal_trans.png"
                alt="한국환경안전연구소"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed">
              신뢰할 수 있는 환경안전 전문기관으로
              <br />
              산업보건, 먹는물, 석면, 실내공기질
              <br />
              분야의 전문 서비스를 제공합니다.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-bold mb-4">서비스</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4">연구소 소개</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <div>충북 청주시 서원구 남이면 양동3길 7-30</div>
                  <div className="text-neutral-500 text-xs mt-1">
                    (우) 28805
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:043-237-7624"
                  className="text-sm hover:text-primary-400 transition-colors duration-200"
                >
                  TEL: 043-237-7624~5
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-5 h-5 text-primary-400 flex-shrink-0 text-center text-xs">
                  📠
                </span>
                <span className="text-sm">FAX: 043-237-7826</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:kesri0728@naver.com"
                  className="text-sm hover:text-primary-400 transition-colors duration-200"
                >
                  kesri0728@naver.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-5 h-5 text-primary-400 flex-shrink-0 text-center text-xs">
                  📄
                </span>
                <div className="text-sm">
                  <div>사업자: 317-81-01323</div>
                  <div className="text-neutral-500 text-xs mt-0.5">
                    법인: 150111-0098934
                  </div>
                </div>
              </li>
            </ul>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <Link
                to="/quote-request"
                className="block w-full px-4 py-2 bg-primary-500 text-white text-center text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                견적 문의하기
              </Link>
              <Link
                to="/certificate-lookup"
                className="block w-full px-4 py-2 bg-neutral-800 text-white text-center text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors duration-200"
              >
                성적서 조회
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-500">
              © {currentYear} 한국환경안전연구소 (KESRI). All rights reserved. |
              대표이사: 이정식
            </div>
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.support.slice(-2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-neutral-500 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="text-neutral-600 hover:text-primary-400 transition-colors duration-200 opacity-50 hover:opacity-100"
                title="관리자 전용"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
