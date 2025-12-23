import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  useEffect(() => {
    const header = document.querySelector("#site-header") as HTMLElement | null;
    if (!header) return;

    // set initial value synchronously so CSS var is available immediately
    try {
      const initialH = Math.round(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${initialH}px`);
    } catch (e) {
      /* ignore */
    }

    const update = () => {
      // measure after paint for accuracy (captures transforms/scale)
      requestAnimationFrame(() => {
        const rect = header.getBoundingClientRect();
        const h = Math.round(rect.height);
        try {
          document.documentElement.style.setProperty("--header-height", `${h}px`);
        } catch (e) {
          /* ignore */
        }
      });
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
    // ensure we attempt a measurement once the page has fully loaded
    const onLoad = () => {
      const header = document.querySelector("#site-header") as HTMLElement | null;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const h = Math.round(rect.height);
      try {
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      } catch (e) {
        /* ignore */
      }
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header />
      <main className="flex-1" style={{ paddingTop: `var(--header-height, 0px)` }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
