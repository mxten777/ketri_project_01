import { useEffect, useState } from "react";

/**
 * Detects presence of a Hero section in the DOM.
 * Looks for `[data-has-hero]` or `.hero` and returns a boolean.
 * Client-only detection (runs in useEffect) so SSR pages can opt-in via prop.
 */
export function useHasHero() {
  const [hasHero, setHasHero] = useState(false);

  useEffect(() => {
    const el = document.querySelector('[data-has-hero], .hero');
    setHasHero(Boolean(el));
  }, []);

  return hasHero;
}
