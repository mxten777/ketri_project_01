import { Link } from "react-router-dom";

export default function HeaderGlobal() {
  return (
    <div className="hidden md:flex items-center justify-end h-10">
      <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-300">
        <Link to="/about/location" className="hover:text-primary-700 dark:hover:text-primary-200 transition-colors">
          오시는 길
        </Link>
        <span className="text-neutral-300 dark:text-neutral-700">|</span>
        <a href="tel:043-237-7824" className="hover:text-primary-700 dark:hover:text-primary-200 transition-colors">
          📞 043-237-7824
        </a>
        <span className="text-neutral-300 dark:text-neutral-700">|</span>
        <a href="mailto:contact@ketri.re.kr" className="hover:text-primary-700 dark:hover:text-primary-200 transition-colors">
          이메일 문의
        </a>
      </div>
    </div>
  );
}
