import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Modal Component
 * 상태값 규칙 강제 + 접근성 + Z-index 관리
 */

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
  closeOnEscape = true,
}: ModalProps) => {
  // Escape 키 처리
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full m-4",
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-modal-backdrop"
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-modal overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "relative w-full bg-[var(--color-bg-primary)] rounded-lg shadow-2xl",
                  sizes[size]
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                aria-describedby={description ? "modal-description" : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                {(title || showClose) && (
                  <div className="flex items-start justify-between p-6 border-b border-[var(--color-border)]">
                    <div className="flex-1">
                      {title && (
                        <h2
                          id="modal-title"
                          className="text-heading-lg font-semibold text-[var(--color-text-primary)]"
                        >
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p
                          id="modal-description"
                          className="mt-2 text-body-md text-[var(--color-text-tertiary)]"
                        >
                          {description}
                        </p>
                      )}
                    </div>
                    {showClose && (
                      <button
                        onClick={onClose}
                        className={cn(
                          "ml-4 rounded-lg p-2 text-[var(--color-text-tertiary)]",
                          "hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
                          "focus:outline-none focus:ring-2 focus:ring-brand-500",
                          "transition-colors duration-base"
                        )}
                        aria-label="닫기"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">{children}</div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

/**
 * ModalFooter Component
 */
export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)]",
        className
      )}
    >
      {children}
    </div>
  );
};
