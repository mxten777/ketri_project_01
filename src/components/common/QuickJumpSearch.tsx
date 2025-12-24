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
  const ctx = useContext(HeaderContext);

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<QuickJumpItem[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listId = mobile ? "quickjump-listbox-mobile" : "quickjump-listbox";

  useEffect(() => {
    const qTrim = value.trim();
    // Do not show suggestions for inputs shorter than 2 characters
    if (qTrim.length < 2) {
      setResults([]);
      setIsOpen(false);
      setFocused(null);
      return;
    }

    const q = qTrim.toLowerCase();
    const matched = QUICK_JUMP_SERVICES.filter((s) => {
      if (s.label.toLowerCase().includes(q)) return true;
      return s.keywords.some((k) => k.toLowerCase().includes(q));
    }).slice(0, 5);

    setResults(matched);
    setIsOpen(true);
    setFocused(matched.length > 0 ? 0 : null);
  }, [value]);

  const closeSearch = () => {
    setIsOpen(false);
    setFocused(null);
    setValue("");
  };

  const handleSelect = (item: QuickJumpItem) => {
    // close mega menu immediately to avoid simultaneous UI
    ctx?.setOpenDropdown?.(null);

    // navigate
    navigate(item.path);

    // if there's a hash, ensure scroll after navigation
    if (item.path.includes("#")) {
      const hash = item.path.split("#")[1];
      nextTick(() => {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ block: "start" });
        }, 50);
      });
    }

    closeSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  // close on blur, but delay to next tick to avoid click being swallowed
  const handleBlur = () => {
    nextTick(() => {
      setIsOpen(false);
    });
  };

  // when opening search, ensure mega menu closed
  const openSearch = () => {
    ctx?.setOpenDropdown?.(null);
    setIsOpen(true);
    nextTick(() => inputRef.current?.focus());
  };

  return (
    <div className={mobile ? "w-full px-6 py-3" : "relative"}>
      {!mobile && (
        <button
          aria-label="검색"
          type="button"
          className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5"
          onClick={(e) => {
            e.preventDefault();
            openSearch();
          }}
        >
          <Search className="w-5 h-5" />
        </button>
      )}

      {(isOpen || mobile) && (
        <div className={mobile ? "w-full" : "absolute right-0 mt-2 w-[320px]"}>
          <div className="relative">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              aria-label="서비스 빠른검색"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-activedescendant={focused !== null && results[focused] ? `quickjump-option-${focused}` : undefined}
              className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
            />

            {isOpen && (
              <ul
                id={listId}
                role="listbox"
                className="mt-1 max-h-48 overflow-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm"
              >
                {results.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-neutral-500">검색 결과 없음</li>
                ) : (
                  results.map((r, idx) => (
                    <li
                      key={r.path}
                      id={`quickjump-option-${idx}`}
                      role="option"
                      aria-selected={focused === idx}
                      className={`px-3 py-2 cursor-pointer text-sm ${focused === idx ? "bg-primary-50 text-primary-800" : "text-neutral-900"}`}
                      onMouseDown={() => {
                        // allow click to register before blur
                      }}
                      onClick={() => handleSelect(r)}
                    >
                      {r.label}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
