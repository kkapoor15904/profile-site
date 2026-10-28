'use client';

import { useMemo } from 'react';

function MarqueeTrack({
  items,
  className,
}: {
  items: string[];
  className: string;
}) {
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent"
        aria-hidden
      />
      <div className={`flex w-max gap-3 ${className}`}>
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeRow({ labels }: { labels: string[] }) {
  if (labels.length === 0) return null;

  return (
    <div className="space-y-3" aria-hidden>
      <MarqueeTrack items={labels} className="animate-marquee" />
      <MarqueeTrack items={[...labels].reverse()} className="animate-marquee-slow" />
    </div>
  );
}
