import { useState, useLayoutEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { MenuGroup } from "../../constants/menu";
import { HeaderContext } from "./HeaderContext";

interface Props {
  menu: MenuGroup;
  location: { pathname: string };
  onMouseEnter: (label: string) => void;
  anchorEl?: HTMLElement | null;
  isOpen: boolean;
}

// render only when open to avoid multiple stacked menus
export default function HeaderMegaMenu({ menu, isOpen, location, onMouseEnter, anchorEl }: Props) {
  // Hooks must run unconditionally
  const ctx = useContext(HeaderContext);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (!anchorEl) return setRect(null);

    const update = () => {
      try {
        const r = anchorEl.getBoundingClientRect();
        setRect(r);
      } catch (e) {
        setRect(null);
      }
    };

    update();
    // removed mount log
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    const ro = new ResizeObserver(update);
    ro.observe(anchorEl);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      ro.disconnect();
    };
  }, [anchorEl]);

  const node = (
    <div>
      <div
        // invisible hit area between anchor and menu to keep hover alive
        onMouseEnter={() => onMouseEnter(menu.label)}
        style={
          rect
            ? (() => {
                const menuWidth = Math.min(880, window.innerWidth - 32);
                const offset = 8;
                const left = Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - offset);
                // place the hit area just below the anchor (do NOT overlap the anchor)
                // so the header element still receives pointer events while the
                // bridge catches quick mouse movements between anchor and menu.
                const top = Math.max(0, rect.top + rect.height);
                const height = 40; // bridge height to avoid tiny gaps on fast mouse moves
                return {
                  position: "fixed",
                  left: left + "px",
                  top: top + "px",
                  width: menuWidth,
                  height,
                  zIndex: 89,
                  pointerEvents: "auto",
                  background: "transparent",
                } as React.CSSProperties;
              })()
            : { display: "none" }
        }
      />

      <div
        onMouseEnter={() => onMouseEnter(menu.label)}
        style={
          rect
            ? (() => {
                const menuWidth = Math.min(880, window.innerWidth - 32);
                const offset = 8;
                const left = Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - offset);
                // position menu directly below the anchor (no overlap)
                return {
                  position: "fixed",
                  left: left + "px",
                  top: Math.max(0, rect.top + rect.height) + "px",
                  width: menuWidth,
                  zIndex: 90,
                  pointerEvents: "auto",
                } as React.CSSProperties;
              })()
            : { display: "none" }
        }
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 shadow-md overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{menu.label}</div>
            {menu.description && (
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{menu.description}</div>
            )}
          </div>

          <div className="p-4">
            <div className="grid grid-cols-[220px_1fr] gap-4">
              {/* Left: Group intro / quick links placeholder */}
              <div className="pr-2">
                {menu.description && (
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">{menu.label}</div>
                )}
                {menu.description && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{menu.description}</div>
                )}
              </div>

              {/* Right: menu items as compact cards */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {menu.items.map((item) => {
                    const itemActive =
                      location.pathname === item.path || location.pathname.startsWith(item.path.split("#")[0] + "/");
                    const hasHash = item.path.includes("#");

                    const itemClasses = [
                      "relative group block p-3 rounded-lg",
                      "transition-colors duration-150",
                      itemActive
                        ? "bg-primary-50 text-primary-800"
                        : "bg-white/0 text-neutral-900 hover:bg-neutral-50",
                    ].join(" ");

                    return (
                      <div key={item.path} className={itemClasses}>
                        {/* Left indicator bar */}
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                        {hasHash ? (
                          <a href={item.path} className="block" onClick={() => ctx?.setOpenDropdown?.(null)}>
                            <div className="text-sm font-medium group-hover:translate-x-[2px] transition-transform">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-neutral-500 mt-1">{item.description}</div>
                            )}
                          </a>
                        ) : (
                          <Link to={item.path} className="block" onClick={() => ctx?.setOpenDropdown?.(null)}>
                            <div className="text-sm font-medium group-hover:translate-x-[2px] transition-transform">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-neutral-500 mt-1">{item.description}</div>
                            )}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                {menu.mainPath && (
                  <div className="mt-3">
                    <Link to={menu.mainPath} className="text-sm font-medium text-primary-800 hover:underline">
                      {menu.label} 전체보기 →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(node, document.body);
}
