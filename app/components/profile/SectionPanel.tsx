'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export function SectionPanel({
  sectionId,
  index,
  title,
  subtitle,
  children,
}: {
  sectionId: string;
  index: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const sectionIndex = String(index + 1).padStart(2, '0');
  const headingId = `${sectionId}-heading`;
  const sectionLabel = `${sectionIndex} // ${title.toUpperCase()}`;

  return (
    <motion.section
      id={sectionId}
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2
            id={headingId}
            className="font-mono text-xs tracking-[0.28em] text-accent"
          >
            {sectionLabel}
          </h2>
          {subtitle && (
            <p className="max-w-xl text-sm text-muted">{subtitle}</p>
          )}
        </div>
        <div
          className="hidden h-px max-w-xs flex-1 bg-linear-to-r from-border-strong to-transparent sm:block"
          aria-hidden
        />
      </div>
      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-card-inset backdrop-blur-xl sm:p-8">
        {children}
      </div>
    </motion.section>
  );
}

export function PageEndCap() {
  return (
    <div className="pt-8 pb-16 sm:pb-24" aria-hidden>
      <div className="h-px w-full bg-linear-to-r from-transparent via-border-strong/40 to-transparent" />
    </div>
  );
}
