/**
 * Pause/resume Lenis smooth-scroll. Call when an overlay (dropdown, modal,
 * sheet) opens so the wheel scrolls the overlay's own content instead of the
 * virtual page. No-op when Lenis isn't running (reduced-motion / SSR).
 */
export function setPageScroll(enabled: boolean) {
  if (typeof window === "undefined") return;
  const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
  if (!lenis) return;
  if (enabled) lenis.start();
  else lenis.stop();
}
