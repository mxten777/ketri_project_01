import { ReactNode, useEffect } from "react";
import Button from "./Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  variant?: "default" | "centered" | "split";
  className?: string;
}

/**
 * Figma Dev Mode 기준 Hero Component
 * 
 * 기준값:
 * - Min Height: 600px (Desktop)
 * - Padding: py-20 ~ py-32
 * - Title: display-md ~ display-lg
 * - Subtitle: heading-lg
 * - Description: body-lg
 */
const Hero = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  variant = "default",
  className = "",
}: HeroProps) => {
  // DEBUG: expose quick render info for dev tools
  try {
    // safe-guard in non-browser environments
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    // eslint-disable-next-line no-console
    console.debug('DEBUG: Hero render', { title, subtitle, backgroundImage: !!backgroundImage, variant, isDark });
  } catch (e) {
    /* noop */
  }

  const variants = {
    default: "text-left",
    centered: "text-center items-center",
    split: "grid lg:grid-cols-2 gap-12 items-center",
  };

  // Dev-only: inject a small on-screen hero debug panel when ?heroDebug is present
  useEffect(() => {
    try {
      if (process.env.NODE_ENV !== 'development') return;
      if (typeof window === 'undefined') return;
      if (!window.location.search.includes('heroDebug')) return;

      const findHeroTitle = () => {
        let el = document.querySelector('[data-debug="hero-title"]') as HTMLElement | null;
        if (el) return el;
        const secs = Array.from(document.querySelectorAll('section')) as HTMLElement[];
        for (const s of secs) {
          try {
            const h = s.querySelector('h1') as HTMLElement | null;
            if (h && s.getBoundingClientRect().height > 280) return h;
          } catch (e) {}
        }
        return document.querySelector('h1') as HTMLElement | null;
      };

      const el = findHeroTitle();
      if (!el) return;

      function toRgbNums(css: string) {
        const m = css.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        return m[1].split(',').map(s => parseFloat(s.trim()));
      }
      function relativeLuminance([r, g, b]: number[]) {
        const srgb = [r, g, b].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
      }
      function contrastRatio(l1: number, l2: number) { return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); }

      const cs = getComputedStyle(el);
      let fg = cs.color;
      let bg = cs.backgroundColor;
      let node: HTMLElement | null = el;
      while (node && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
        node = node.parentElement;
        if (!node) break;
        bg = getComputedStyle(node).backgroundColor;
      }
      const fgRgb = toRgbNums(fg) || [255, 255, 255];
      const bgRgb = toRgbNums(bg) || [0, 0, 0];
      const lFg = relativeLuminance(fgRgb);
      const lBg = relativeLuminance(bgRgb);
      const ratio = contrastRatio(lFg, lBg);

      el.dataset.__hero_debug_original_outline = el.style.outline || '';
      el.dataset.__hero_debug_original_boxshadow = el.style.boxShadow || '';
      el.style.outline = '3px solid rgba(255,255,255,0.04)';
      el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.02)';
      el.style.position = el.style.position || 'relative';
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const id = 'hero-debug-overlay';
      let panel = document.getElementById(id) as HTMLDivElement | null;
      if (panel) panel.remove();
      panel = document.createElement('div');
      panel.id = id;
      panel.style.position = 'fixed';
      panel.style.right = '12px';
      panel.style.top = '12px';
      panel.style.zIndex = '2147483647';
      panel.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.6))';
      panel.style.color = '#fff';
      panel.style.padding = '10px 12px';
      panel.style.borderRadius = '8px';
      panel.style.fontSize = '13px';
      panel.style.fontFamily = 'system-ui, Roboto, Arial';
      panel.style.boxShadow = '0 6px 30px rgba(0,0,0,0.6)';
      panel.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px">Hero Debug</div>
        <div><b>fg:</b> ${fg}</div>
        <div><b>bg:</b> ${bg}</div>
        <div><b>contrast:</b> ${ratio.toFixed(2)} : 1</div>
        <div style="margin-top:6px;font-size:12px;color:#ddd">Targets: large >=3:1, normal >=4.5:1, ideal >=7:1</div>
        <div style="margin-top:8px;display:flex;gap:6px">
          <button id="hero-debug-make-opaque" style="flex:1;padding:6px;border-radius:6px;border:0;background:#1f6feb;color:#fff">Opaque</button>
          <button id="hero-debug-reset" style="flex:1;padding:6px;border-radius:6px;border:0;background:#666;color:#fff">Remove</button>
        </div>
        <div style="margin-top:8px;display:flex;gap:6px">
          <button id="hero-debug-inspect" style="flex:1;padding:6px;border-radius:6px;border:0;background:#ff7b00;color:#111">Inspect Stack</button>
          <button id="hero-debug-clear" style="flex:1;padding:6px;border-radius:6px;border:0;background:#333;color:#fff">Clear Highlights</button>
        </div>
      `;
      document.body.appendChild(panel);

      const btnOpaque = document.getElementById('hero-debug-make-opaque');
      const btnReset = document.getElementById('hero-debug-reset');
      if (btnOpaque) btnOpaque.addEventListener('click', () => {
        el.style.background = 'rgba(0,0,0,0.98)';
        el.style.color = '#ffffff';
        el.style.textShadow = '0 2px 28px rgba(0,0,0,0.9)';
        const newBg = getComputedStyle(el).backgroundColor;
        const newFg = getComputedStyle(el).color;
        const newRatio = contrastRatio(relativeLuminance(toRgbNums(newFg) || [255,255,255]), relativeLuminance(toRgbNums(newBg) || [0,0,0]));
        const ratioNode = panel!.querySelector('div:nth-child(3)') as HTMLElement;
        if (ratioNode) ratioNode.innerText = `contrast: ${newRatio.toFixed(2)} : 1`;
      });
      if (btnReset) btnReset.addEventListener('click', () => {
        el.style.outline = el.dataset.__hero_debug_original_outline || '';
        el.style.boxShadow = el.dataset.__hero_debug_original_boxshadow || '';
        const p = document.getElementById(id);
        if (p) p.remove();
      });

      // Inspect stack and visually highlight overlaying elements
      const highlights: HTMLElement[] = [];
      const makeHighlight = (rect: DOMRect, info: string, idx: number) => {
        const h = document.createElement('div');
        h.className = 'hero-debug-highlight';
        h.style.position = 'fixed';
        h.style.left = rect.left + 'px';
        h.style.top = rect.top + 'px';
        h.style.width = Math.max(2, rect.width) + 'px';
        h.style.height = Math.max(2, rect.height) + 'px';
        h.style.background = 'rgba(255,165,0,0.08)';
        h.style.border = '2px solid rgba(255,165,0,0.9)';
        h.style.zIndex = '2147483647';
        h.style.pointerEvents = 'none';
        h.style.boxSizing = 'border-box';
        h.style.borderRadius = '4px';

        const label = document.createElement('div');
        label.textContent = `${idx}: ${info}`;
        label.style.position = 'absolute';
        label.style.right = '4px';
        label.style.bottom = '4px';
        label.style.fontSize = '12px';
        label.style.background = 'rgba(0,0,0,0.6)';
        label.style.color = '#fff';
        label.style.padding = '2px 6px';
        label.style.borderRadius = '4px';
        label.style.pointerEvents = 'none';
        h.appendChild(label);
        document.body.appendChild(h);
        highlights.push(h);
      };

      const btnInspect = document.getElementById('hero-debug-inspect');
      const btnClear = document.getElementById('hero-debug-clear');
      if (btnInspect) btnInspect.addEventListener('click', () => {
        try {
          const r = el.getBoundingClientRect();
          const x = Math.round(r.left + r.width / 2);
          const y = Math.round(r.top + r.height / 2);
          const elems = document.elementsFromPoint(x, y);
          const stackInfo = elems.map((e, i) => {
            const s = getComputedStyle(e as Element);
            const rect = (e as HTMLElement).getBoundingClientRect();
            const info = `${(e as Element).tagName}${(e as Element).id?('#'+(e as Element).id):''} ${((e as Element).className||'').toString()} z:${s.zIndex} pos:${s.position} op:${s.opacity} bf:${s.backdropFilter||s.webkitBackdropFilter||''}`;
            makeHighlight(rect, info, i);
            return { index: i, tag: (e as Element).tagName, id: (e as Element).id || null, classes: (e as Element).className || null, zIndex: s.zIndex, position: s.position, opacity: s.opacity, backdropFilter: s.backdropFilter || s.webkitBackdropFilter || null };
          });
          console.group('Hero stack at center');
          console.table(stackInfo);
          try { navigator.clipboard.writeText(JSON.stringify(stackInfo, null, 2)); console.log('Stack copied to clipboard'); } catch (e){}
          console.groupEnd();
        } catch (e) { console.error(e); }
      });
      if (btnClear) btnClear.addEventListener('click', () => {
        highlights.forEach(h => h.remove()); highlights.length = 0; console.log('Cleared hero highlights');
      });

      // cleanup on unmount/hot-reload
      return () => {
        try {
          const p = document.getElementById('hero-debug-overlay');
          if (p) p.remove();
        } catch (e) {}
      };
    } catch (e) {
      // ignore in dev
    }
  }, []);

  return (
    <section
      className={`relative min-h-[600px] py-20 lg:py-32 overflow-hidden ${className}`}
    >
      {/* Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70 dark:from-neutral-900/95 dark:to-neutral-900/90" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className={`flex flex-col ${variants[variant]}`}>
          <div className={variant === "split" ? "" : "max-w-3xl"}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-primary-400 dark:text-primary-300 font-semibold text-label-lg mb-4 uppercase tracking-wider">
                {subtitle}
              </p>
            )}

            {/* Title - high contrast for dark mode */}
              <h1
              className={`font-bold mb-6 ${
                backgroundImage ? "text-white" : "text-neutral-900 dark:text-neutral-100"
              } text-display-sm lg:text-display-md leading-[1.8]`} 
            >
              <span
                        data-debug="hero-title"
                        className="inline-block px-6 rounded-lg text-white"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 48%, var(--scrim-70) 48%, var(--scrim-70) 100%)',
                          position: 'relative',
                          zIndex: 10,
                          color: 'var(--color-text-primary)',
                          padding: '0.6rem 1.5rem 1rem 1.5rem',
                          borderRadius: '8px',
                          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                          lineHeight: '1.8'
                        }}
                      >
                        {title}
                      </span>
            </h1>

            {/* Description */}
            {description && (
              <p
                className={`text-body-lg mb-8 ${
                  backgroundImage ? "text-neutral-100 dark:text-neutral-200" : "text-neutral-600 dark:text-neutral-300"
                } max-w-2xl px-4 py-2 rounded-md`}
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {description}
              </p>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4">
                {primaryAction && (
                  <Button
                    size="xl"
                    onClick={primaryAction.onClick}
                    icon={primaryAction.icon}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Split variant 오른쪽 공간 (이미지 등) */}
          {variant === "split" && <div className="hidden lg:block" />}
        </div>
      </div>
    </section>
  );
};

export default Hero;
