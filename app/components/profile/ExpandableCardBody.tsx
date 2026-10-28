/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';

const MOBILE_MEDIA = '(max-width: 639px)';

export function ExpandableCardBody({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const bodyId = useId();
  const textRef = useRef<HTMLParagraphElement>(null);

  const measureTruncation = useCallback(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    if (!window.matchMedia(MOBILE_MEDIA).matches) {
      setIsTruncated(false);
      return;
    }

    setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, [expanded]);

  useLayoutEffect(() => {
    setExpanded(false);
    setIsTruncated(false);
  }, [text]);

  useLayoutEffect(() => {
    measureTruncation();

    const el = textRef.current;
    if (!el) return;

    const mq = window.matchMedia(MOBILE_MEDIA);
    mq.addEventListener('change', measureTruncation);
    window.addEventListener('resize', measureTruncation);

    const observer = new ResizeObserver(measureTruncation);
    observer.observe(el);

    return () => {
      mq.removeEventListener('change', measureTruncation);
      window.removeEventListener('resize', measureTruncation);
      observer.disconnect();
    };
  }, [text, expanded, measureTruncation]);

  const showToggle = isTruncated;

  return (
    <div className="mt-2">
      <p
        ref={textRef}
        id={bodyId}
        className={`text-sm leading-relaxed text-muted ${
          !expanded ? 'line-clamp-4 sm:line-clamp-none' : ''
        }`}
      >
        {text}
      </p>
      {showToggle && (
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-accent transition-opacity hover:opacity-80 sm:hidden"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? 'View less' : 'View more'}
          {expanded ? (
            <ChevronUp size={14} strokeWidth={2.25} aria-hidden />
          ) : (
            <ChevronDown size={14} strokeWidth={2.25} aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
