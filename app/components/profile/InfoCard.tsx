'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type InfoCardProps = {
  children: ReactNode;
  index?: number;
  className?: string;
  delay?: number;
};

export function InfoCard({
  children,
  index = 0,
  className = '',
  delay,
}: InfoCardProps) {
  const staggerDelay = delay ?? index * 0.06;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.25 },
      }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card-inset-soft backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-card-hover ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      {children}
    </motion.article>
  );
}

export function MetaLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent">
      {children}
    </span>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-semibold tracking-tight text-balance text-foreground sm:text-[1.05rem]">
      {children}
    </h3>
  );
}

export function CardMeta({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 whitespace-nowrap rounded-md border border-border bg-accent-dim px-2 py-0.5 font-mono text-[0.65rem] text-muted">
      {children}
    </span>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
  );
}
