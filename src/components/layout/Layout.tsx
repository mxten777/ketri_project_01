import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement | null;
    if (!header) return;

    const update = () => {
      const h = header.offsetHeight;
      setHeaderHeight(h);
      try {
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      } catch (e) {
        /* ignore */
      }
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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header />
      <main className="flex-1" style={{ paddingTop: headerHeight ? `${headerHeight}px` : undefined }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
