'use client';

import { ChevronUp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useSyncExternalStore } from 'react';

const SCROLL_THRESHOLD = 480;

function subscribe(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true });
  return () => window.removeEventListener('scroll', onStoreChange);
}

function getScrollVisible() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(
    subscribe,
    getScrollVisible,
    getServerSnapshot,
  );
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="group fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-xl border border-border bg-surface-elevated/90 px-3 py-2.5 shadow-card-inset-soft backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-card-hover sm:bottom-8 sm:right-8"
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-accent transition-colors group-hover:border-border-strong group-hover:text-foreground">
            <ChevronUp size={18} strokeWidth={2.25} aria-hidden />
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted sm:inline" aria-hidden>
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
