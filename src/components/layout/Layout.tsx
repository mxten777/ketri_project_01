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

    const isValid = (v: number) => Number.isFinite(v) && v > 20 && v < 500;

    const setHeaderHeight = (h: number) => {
      if (!isValid(h)) return;
      try {
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      } catch (e) {
        /* ignore */
      }
    };

    // initial synchronous measurement (before paint)
    try {
      const initialH = Math.round(header.getBoundingClientRect().height);
      setHeaderHeight(initialH);
    } catch (e) {
      /* ignore */
    }

    const update = () => {
      // measure and set only when value is reasonable
      const rect = header.getBoundingClientRect();
      const h = Math.round(rect.height);
      setHeaderHeight(h);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(header);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
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
