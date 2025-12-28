import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import QUICK_JUMP_SERVICES, { QuickJumpItem } from "../../constants/quickJump";
import { HeaderContext } from "../layout/HeaderContext";

function nextTick(fn: () => void) {
  if (typeof queueMicrotask === "function") queueMicrotask(fn);
  else setTimeout(fn, 0);
}

export default function QuickJumpSearch({ mobile = false }: { mobile?: boolean }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const ctx = useContext(HeaderContext);
  const [isOpenLocal, setIsOpenLocal] = useState(false);
  const [results, setResults] = useState<QuickJumpItem[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listId = mobile ? "quickjump-listbox-mobile" : "quickjump-listbox";
  const scrollPosRef = useRef<number>(0);

  const isOpen = ctx?.isSearchOpen ?? isOpenLocal;

  // === Single Source of Truth for closing ===
  // Only allowed reasons: 'select', 'outside', 'explicitClose'
  // NEVER allowed during input events: onChange, onInput, composition, focus, blur
  const closeSearchWithReason = (reason: 'select' | 'outside' | 'explicitClose') => {
    const setter = ctx?.setIsSearchOpen ?? setIsOpenLocal;
    setter(false); // Hide results panel
    setFocused(null);
    // Mobile + outside: Keep value (user can continue typing), only hide results
    // All other cases: Clear value completely
    if (!mobile || reason !== 'outside') {
      setValue("");
    }
  };

  // Search results calculation - ONLY opens, NEVER closes
  useEffect(() => {
    const qTrim = value.trim();
    // Do not show suggestions for inputs shorter than 2 characters
    if (qTrim.length < 2) {
      setResults([]);
      setFocused(null);
      // DO NOT close here - just clear results
      // User is still typing, search mode must persist
      return;
    }

    const q = qTrim.toLowerCase();
    const matched = QUICK_JUMP_SERVICES.filter((s) => {
      if (s.label.toLowerCase().includes(q)) return true;
      return s.keywords.some((k) => k.toLowerCase().includes(q));
    }).slice(0, 5);

    setResults(matched);
    // Open search if there are results - this effect ONLY opens, never closes
    const setter = ctx?.setIsSearchOpen ?? setIsOpenLocal;
    setter(true);
    setFocused(matched.length > 0 ? 0 : null);
  }, [value]);

  const handleSelect = (item: QuickJumpItem) => {
    // 1. Navigate FIRST - React Router updates history synchronously
    navigate(item.path);
    
    // 2. Then clean up state - ONLY through single entry point with 'select' reason
    closeSearchWithReason('select');
    ctx?.setOpenDropdown?.(null);

    // 3. Mobile: close mobile menu overlay AFTER navigation
    if (mobile && ctx?.setIsMobileMenuOpen) {
      ctx.setIsMobileMenuOpen(false);
    }

    // 4. Handle hash scroll after navigation completes
    if (item.path.includes("#")) {
      const hash = item.path.split("#")[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ block: "start" });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isOpen = ctx?.isSearchOpen ?? isOpenLocal;
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => {
        if (f === null) return results.length > 0 ? 0 : null;
        return Math.min(results.length - 1, f + 1);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => {
        if (f === null) return results.length > 0 ? results.length - 1 : null;
        return Math.max(0, f - 1);
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focused !== null && results[focused]) {
        handleSelect(results[focused]);
      } else if (results.length === 1) {
        handleSelect(results[0]);
      } else if (results.length > 0) {
        // If no item is focused but results exist, select the first one
        handleSelect(results[0]);
      }
    } else if (e.key === "Escape") {
      closeSearchWithReason('explicitClose');
    }
  };

  // outside-click handling using pointerdown (unified for mouse/touch)
  useEffect(() => {
    const isOpen = ctx?.isSearchOpen ?? isOpenLocal;
    const handlePointerDown = (e: PointerEvent) => {
      const root = containerRef.current;
      const input = inputRef.current;
      const target = e.target as Node | null;

      // PROTECTION 1: Event started inside the search container - NEVER close
      if (target && root && root.contains(target)) return;

      // PROTECTION 2: Target is the search toggle button - NEVER close
      // (prevents pointerdown from closing before click handler opens)
      if (target instanceof Element && target.closest('[data-search-toggle]')) return;

      // PROTECTION 3 (CRITICAL): Target is a search result item or result list - NEVER close
      // Check for data-search-result attribute OR any element inside results listbox
      if (target instanceof Element) {
        const isResultItem = target.closest('[data-search-result]');
        const isResultList = target.closest(`#${listId}`);
        if (isResultItem || isResultList) return;
      }

      // PROTECTION 4: User is typing - input has focus or non-empty value
      // This prevents premature close during active search session
      if (input && (document.activeElement === input || value.trim().length > 0)) {
        // User is actively searching - do NOT close on accidental outside taps
        return;
      }

      // Only if ALL protections pass: treat as outside click
      closeSearchWithReason('outside');
    };

    if (isOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
    }
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx?.isSearchOpen, isOpenLocal]);

  // when opening search, ensure mega menu closed
  const openSearch = () => {
    ctx?.setOpenDropdown?.(null);
    const setter = ctx?.setIsSearchOpen ?? setIsOpenLocal;
    setter(true);
    nextTick(() => {
      inputRef.current?.focus();
      // Mobile: store scroll position before focus to prevent jump
      if (mobile && typeof window !== 'undefined') {
        scrollPosRef.current = window.scrollY;
      }
    });
  };

  // Mobile: stabilize scroll position on focus/blur
  useEffect(() => {
    if (!mobile || typeof window === 'undefined') return;

    const input = inputRef.current;
    if (!input) return;

    const handleFocus = () => {
      // Save current position when focus starts
      scrollPosRef.current = window.scrollY;
      
      // Restore position after browser's automatic scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - scrollPosRef.current) > 50) {
            window.scrollTo(0, scrollPosRef.current);
          }
        });
      });
    };

    const handleBlur = () => {
      // Gentle return to saved position on blur
      if (scrollPosRef.current > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollPosRef.current, behavior: 'smooth' });
        });
      }
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, [mobile, isOpen]);

  return (
    <div className={mobile ? "w-full px-6 py-3" : "relative"}>
      {/* Toggle button: Desktop (open search) | Mobile (focus input or clear) */}
      <button
        aria-label="검색"
        type="button"
        data-search-toggle="true"
        className={mobile ? "hidden" : "p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5"}
        onClick={(e) => {
          e.preventDefault();
          if (mobile) {
            // Mobile: focus input or clear value if already has text
            if (value.trim()) {
              setValue("");
              setResults([]);
            }
            inputRef.current?.focus();
          } else {
            // Desktop: toggle search panel
            openSearch();
          }
        }}
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Mobile: always show input | Desktop: show when isOpen */}
      {(mobile || isOpen) && (
        <div ref={containerRef} className={mobile ? "w-full" : "absolute right-0 mt-2 w-[320px]"}>
          <div className="relative">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => {
                // INPUT EVENT PATH - NEVER closes search
                // Only updates value, which triggers search results update
                setValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                // Mobile: focus activates results panel (if value exists)
                // Desktop: already handled by openSearch()
                if (mobile && value.trim().length >= 2) {
                  const setter = ctx?.setIsSearchOpen ?? setIsOpenLocal;
                  setter(true);
                }
              }}
              // Focus/blur do NOT trigger close - they are protected by:
              // 1. containerRef.contains() check in outside-click handler
              // 2. Explicit typing-in-progress protection (see outside-click logic)
              // blur should not close — outside clicks handled via pointerdown
              aria-label="서비스 빠른검색"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-activedescendant={focused !== null && results[focused] ? `quickjump-option-${focused}` : undefined}
              className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
              autoComplete="off"
            />

            {/* Results panel visibility:
                Mobile: value >= 2 chars AND isOpen (outside-click hides panel but keeps value)
                Desktop: isOpen only */}
            {(mobile ? (value.trim().length >= 2 && isOpen) : isOpen) && (
              <ul
                id={listId}
                role="listbox"
                className="mt-1 max-h-48 overflow-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm"
              >
                {results.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-neutral-500">검색 결과 없음</li>
                ) : (
                  results.map((r, idx) => {
                    let touchStartY = 0;
                    let isTouchMove = false;

                    return (
                      <li
                        key={r.path}
                        id={`quickjump-option-${idx}`}
                        role="option"
                        aria-selected={focused === idx}
                        data-search-result="true"
                        className={`px-3 py-2 cursor-pointer text-sm ${focused === idx ? "bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300" : "text-neutral-900 dark:text-neutral-200"}`}
                        onTouchStart={(e) => {
                          // Record initial touch position to detect scroll gesture
                          touchStartY = e.touches[0].clientY;
                          isTouchMove = false;
                        }}
                        onTouchMove={(e) => {
                          // Detect scroll gesture - if user moves >10px, it's scroll not tap
                          const touchMoveY = e.touches[0].clientY;
                          if (Math.abs(touchMoveY - touchStartY) > 10) {
                            isTouchMove = true;
                          }
                        }}
                        onClick={(e) => {
                          // Prevent if it was a scroll gesture, not a tap
                          if (isTouchMove) return;

                          // Prevent default and stop propagation to prevent any interference
                          e.preventDefault();
                          e.stopPropagation();

                          // Execute navigation - this is the SINGLE execution point
                          handleSelect(r);
                        }}
                      >
                        {r.label}
                      </li>
                    );
                  })
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
