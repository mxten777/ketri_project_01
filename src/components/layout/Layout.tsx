import { useEffect, useLayoutEffect } from "react";
import { useHasHero } from "../../hooks/useHasHero";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  // Use layout effect to measure header before paint. Guard against invalid measurements.
  useLayoutEffect(() => {
    const header = document.querySelector("#site-header") as HTMLElement | null;
    if (!header) return;

    // Figma design tokens (px)
    const TOKEN_DESKTOP = 88;
    const TOKEN_TABLET = 80;
    const TOKEN_MOBILE = 72;

    const getTokenForWidth = (w: number) => {
      if (w >= 1024) return TOKEN_DESKTOP;
      if (w >= 768) return TOKEN_TABLET;
      return TOKEN_MOBILE;
    };

    // Determine token-based height based on current viewport width
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : document.documentElement.clientWidth;
    const tokenHeight = getTokenForWidth(viewportWidth);

    // Reference measurement only: use it only if it exactly matches the token (within 1px).
    let chosenHeight = tokenHeight;
    try {
      const measured = Math.round(header.getBoundingClientRect().height);
      if (Math.abs(measured - tokenHeight) <= 1) {
        chosenHeight = measured;
      }
    } catch (e) {
      /* ignore measurement errors and fall back to token */
    }

    // Apply token-based CSS var and inline height lock once to prevent initial CLS.
    try {
      document.documentElement.style.setProperty("--header-height", `${tokenHeight}px`);
    } catch (e) {
      /* ignore */
    }
    try {
      header.style.height = `${chosenHeight}px`;
    } catch (e) {
      /* ignore */
    }

    // Release the inline height after fonts are ready or on load, restoring natural layout.
    const releaseLock = () => {
      try {
        // set to auto explicitly to restore natural flow
        header.style.height = "auto";
        // ensure CSS var remains token-based
        document.documentElement.style.setProperty("--header-height", `${tokenHeight}px`);
      } catch (e) {
        /* ignore */
      }
    };

    if (typeof document !== "undefined" && (document as Document).fonts && (document as Document).fonts.ready) {
      (document as Document).fonts.ready.then(releaseLock).catch(() => {
        window.addEventListener("load", releaseLock, { once: true });
      });
    } else {
      window.addEventListener("load", releaseLock, { once: true });
    }

    // Keep a ResizeObserver to update the CSS var if header actually changes later (non-initial).
    const updateVar = () => {
      try {
        const rect = header.getBoundingClientRect();
        const h = Math.round(rect.height);
        if (h > 20 && h < 500) {
          document.documentElement.style.setProperty("--header-height", `${h}px`);
        }
      } catch (e) {
        /* ignore */
      }
    };

    const ro = new ResizeObserver(updateVar);
    ro.observe(header);
    window.addEventListener("resize", updateVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateVar);
    };
  }, []);

  useEffect(() => {
    // ensure we attempt a measurement once the page has fully loaded (guarded)
    const onLoad = () => {
      const header = document.querySelector("#site-header") as HTMLElement | null;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const h = Math.round(rect.height);
      if (Number.isFinite(h) && h > 20 && h < 500) {
        try {
          document.documentElement.style.setProperty("--header-height", `${h}px`);
        } catch (e) {
          /* ignore */
        }
      }
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const hasHero = useHasHero();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header />
      <main
        className="flex-1"
        style={hasHero ? undefined : { paddingTop: `var(--header-height, 0px)` }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
