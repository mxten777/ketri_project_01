import { useEffect, useState, useCallback, useRef } from "react";
import { X, Calendar, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Notice } from "../../types";
import Button from "./Button";

interface NoticePopupProps {
  notice: Notice;
  onClose: () => void;
}

const NoticePopup = ({ notice, onClose }: NoticePopupProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 220);
  }, [onClose]);

  const handleDontShowToday = useCallback(() => {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const noticeId = notice.id || notice.noticeId || "";
    if (noticeId) {
      localStorage.setItem(`popup_notice_dismissed_${today}`, noticeId);
    }
    handleClose();
  }, [notice.id, notice.noticeId, handleClose]);

  const handleViewDetail = useCallback(() => {
    const noticeId = notice.id || notice.noticeId || "";
    if (noticeId) {
      navigate(`/board/notice/${noticeId}`);
    }
    handleClose();
  }, [notice.id, notice.noticeId, navigate, handleClose]);

  // Format date
  const formatDate = (timestamp: unknown) => {
    try {
      let date: Date | null = null;
      const ts = timestamp as unknown;

      if (ts && typeof (ts as { toDate?: unknown }).toDate === "function") {
        date = (ts as { toDate: () => Date }).toDate();
      } else if (ts && typeof (ts as { seconds?: unknown }).seconds === "number") {
        date = new Date((ts as { seconds: number }).seconds * 1000);
      } else if (typeof ts === "string") {
        date = new Date(ts);
      } else if (ts instanceof Date) {
        date = ts;
      }

      if (!date || isNaN(date.getTime())) return "";

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    // Initial focus
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay - Maximum Dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container - Compact Alert */}
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-popup-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[540px] max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto shadow-[0_20px_60px_-8px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_-8px_rgba(0,0,0,0.9)] rounded-2xl ring-1 ring-black/10 dark:ring-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Solid Brand Gradient */}
              <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-primary-600 via-primary-600 to-secondary-600 dark:from-primary-700 dark:via-primary-700 dark:to-secondary-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Category Chip - Solid White */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full mb-3 shadow-sm">
                      <Bell className="w-3 h-3 text-primary-600" />
                      <span className="text-[11px] font-semibold text-primary-700 tracking-wide uppercase">
                        {notice.category || "공지사항"}
                      </span>
                    </div>
                    
                    {/* Title - Clear Contrast */}
                    <h2 
                      id="notice-popup-title"
                      className="text-[22px] font-bold text-white leading-snug mb-2.5 break-words"
                    >
                      {notice.title}
                    </h2>

                    {/* Meta Info - Subtle on Brand */}
                    <div className="flex items-center gap-2.5 text-[11px] text-white/80 font-medium">
                      {formatDate(notice.createdAt) && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 opacity-70" />
                          <span>{formatDate(notice.createdAt)}</span>
                        </div>
                      )}
                      {notice.author?.name && (
                        <>
                          <span className="opacity-40">·</span>
                          <span className="opacity-80">{notice.author.name}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Close Button - Solid White */}
                  <button
                    ref={closeButtonRef}
                    onClick={handleClose}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white hover:bg-neutral-50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white group"
                    aria-label="닫기"
                  >
                    <X className="w-4.5 h-4.5 text-primary-600 group-hover:text-primary-700 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Body - Clean White */}
              <div className="flex-1 overflow-y-auto px-6 py-5 bg-white dark:bg-[#0f172a] scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-[15px] leading-[1.65] text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words m-0">
                    {notice.excerpt || notice.content.substring(0, 300)}
                    {notice.content.length > 300 && "..."}
                  </p>
                </div>
              </div>

              {/* Footer - Compact Actions */}
              <div className="px-6 py-4 bg-white dark:bg-[#0f172a] border-t border-neutral-200 dark:border-neutral-700">
                <div className="space-y-2.5">
                  {/* Primary CTA */}
                  <motion.button
                    ref={primaryButtonRef}
                    onClick={handleViewDetail}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold text-[14px] rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                  >
                    자세히 보기
                  </motion.button>

                  {/* Secondary Actions Row */}
                  <div className="flex items-center justify-between gap-3">
                    <button 
                      onClick={handleClose}
                      className="flex-1 h-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-[13px] rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
                    >
                      닫기
                    </button>
                    <button 
                      onClick={handleDontShowToday}
                      className="flex-1 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-medium text-[13px] rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1"
                    >
                      오늘 하루 보지 않기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NoticePopup;
