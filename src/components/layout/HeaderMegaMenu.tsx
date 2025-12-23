import React from "react";
import { Link } from "react-router-dom";
import { MenuGroup } from "../../constants/menu";

interface Props {
  menu: MenuGroup;
  isOpen: boolean;
  location: any;
  onMouseEnter: (label: string) => void;
}

export default function HeaderMegaMenu({ menu, isOpen, location, onMouseEnter }: Props) {
  if (!isOpen) return null;

  return (
    <div style={{ zIndex: 99999, pointerEvents: "auto" }}>
      <div
        className="absolute left-0 top-[calc(100%-24px)] w-full h-8 z-[89] pointer-events-auto"
        onMouseEnter={() => onMouseEnter(menu.label)}
      />

      <div
        className="absolute left-0 top-[calc(100%-12px)] w-72 z-[90]"
        onMouseEnter={() => onMouseEnter(menu.label)}
        style={{ pointerEvents: "auto" }}
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-[0_12px_32px_rgba(0,0,0,0.14)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100">{menu.label}</div>
            <div className="text-[12px] text-neutral-600 dark:text-neutral-400">관련 메뉴</div>
          </div>

          <div className="py-2 divide-y divide-neutral-100 dark:divide-neutral-800">
            {menu.items.map((item) => {
              const itemActive =
                location.pathname === item.path || location.pathname.startsWith(item.path.split("#")[0] + "/");
              const hasHash = item.path.includes("#");

              const commonClasses = [
                "group block px-5 py-3 text-[14px]",
                "transition-colors duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60",
                itemActive
                  ? "bg-primary-50 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200"
                  : "text-neutral-900 hover:bg-neutral-50 hover:text-primary-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-primary-200",
              ].join(" ");

              const content = (
                <div className="flex items-center justify-between">
                  <span className="group-hover:translate-x-[2px] transition-transform">{item.label}</span>
                  <span className="text-[12px] text-neutral-400 dark:text-neutral-600">›</span>
                </div>
              );

              return hasHash ? (
                <a key={item.path} href={item.path} className={commonClasses}>
                  {content}
                </a>
              ) : (
                <Link key={item.path} to={item.path} className={commonClasses}>
                  {content}
                </Link>
              );
            })}

            {menu.mainPath && (
              <Link
                to={menu.mainPath}
                className="block px-5 py-3 text-[14px] font-medium text-primary-800 hover:bg-neutral-50 dark:text-primary-200 dark:hover:bg-neutral-900 transition-colors"
              >
                {menu.label} 전체보기 →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
