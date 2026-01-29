/**
 * Scroll to element by hash with header offset consideration.
 * Relies on CSS scroll-margin-top for offset, retries if element not found.
 * 
 * @param hash - Hash string (with or without #)
 * @param maxRetries - Maximum retry attempts (default: 10)
 * @param retryDelay - Delay between retries in ms (default: 50)
 */
export function scrollToHash(
  hash: string,
  maxRetries = 10,
  retryDelay = 50
): void {
  if (!hash) return;

  const targetId = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!targetId) return;

  let attempts = 0;

  const attemptScroll = () => {
    attempts++;
    const element = document.getElementById(targetId);

    if (element) {
      // Double RAF to ensure layout is stable
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Set hash to trigger :target CSS and history
          if (window.location.hash !== `#${targetId}`) {
            window.history.replaceState(null, '', `#${targetId}`);
          }
          
          // Use scrollIntoView which respects scroll-margin-top in modern browsers
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        });
      });
      
      return;
    }

    // Retry if element not found and within retry limit
    if (attempts < maxRetries) {
      setTimeout(attemptScroll, retryDelay);
    } else {
      console.warn(`[scrollToHash] Element #${targetId} not found after ${maxRetries} attempts`);
    }
  };

  // Start attempting to scroll
  attemptScroll();
}

/**
 * Navigate to path with hash and handle scrolling
 * @param navigate - React Router navigate function
 * @param path - Full path including hash (e.g., "/services/water#introduction")
 * @param closeMega - Optional callback to close mega menu
 */
export function navigateWithHash(
  navigate: (path: string) => void,
  path: string,
  closeMega?: () => void
): void {
  const [, hash] = path.split('#');

  // Navigate to path first
  navigate(path);

  // Close mega menu AFTER navigation to prevent race conditions
  // Use RAF to defer closing until after React's render cycle
  if (closeMega) {
    requestAnimationFrame(() => {
      closeMega();
    });
  }

  // Handle scrolling based on hash presence
  if (hash) {
    // Wait for route transition and DOM render
    setTimeout(() => {
      scrollToHash(hash);
    }, 100);
  } else {
    // No hash: scroll to top
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }
}
