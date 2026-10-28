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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-surface-elevated/85 text-muted shadow-card-inset-soft backdrop-blur-xl transition-[border-color,color,box-shadow] duration-300 hover:border-border-strong hover:text-accent hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 sm:bottom-8 sm:right-8"
        >
          <ChevronUp size={20} strokeWidth={2} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
