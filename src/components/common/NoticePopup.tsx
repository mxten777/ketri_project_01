import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
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

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Gradient */}
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full mb-3">
                      <span className="text-xs font-medium text-white uppercase tracking-wider">
                        공지사항
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {notice.title}
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-2 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
                    aria-label="닫기"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                    {notice.excerpt || notice.content.substring(0, 300)}
                    {notice.content.length > 300 && "..."}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    onClick={handleViewDetail}
                    className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    자세히 보기
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleClose}
                      className="h-11 rounded-xl font-medium"
                    >
                      닫기
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={handleDontShowToday}
                      className="h-11 rounded-xl font-medium"
                    >
                      오늘 하루 보지 않기
                    </Button>
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
