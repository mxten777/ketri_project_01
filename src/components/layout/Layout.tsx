import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  // Simplified: set token-based header height from design tokens (no measurement/locks)
  useEffect(() => {
    const TOKEN_DESKTOP = 88;
    const TOKEN_TABLET = 80;
    const TOKEN_MOBILE = 72;

    const getTokenForWidth = (w: number) => {
      if (w >= 1024) return TOKEN_DESKTOP;
      if (w >= 768) return TOKEN_TABLET;
      return TOKEN_MOBILE;
    };

    const applyToken = () => {
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : document.documentElement.clientWidth;
      const tokenHeight = getTokenForWidth(viewportWidth);
      try {
        document.documentElement.style.setProperty("--app-header-h", `${tokenHeight}px`);
      } catch (e) {
        /* ignore */
      }
    };

    applyToken();
    window.addEventListener("resize", applyToken);
    return () => window.removeEventListener("resize", applyToken);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header />
      <main className="flex-1 pt-header">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
