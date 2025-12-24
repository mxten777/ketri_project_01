import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip scrolling on initial mount to avoid triggering an initial layout/scroll jump
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
