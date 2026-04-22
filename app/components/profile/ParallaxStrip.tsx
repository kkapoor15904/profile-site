'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { StripTone } from './types';

function toneClasses(tone: StripTone, index: number) {
  const alternate = index % 2 === 0;

  if (tone === 'cyan') {
    return alternate
      ? 'bg-cyan-500/10 border-cyan-300/25'
      : 'bg-cyan-400/10 border-cyan-200/20';
  }

  if (tone === 'indigo') {
    return alternate
      ? 'bg-indigo-500/10 border-indigo-300/25'
      : 'bg-indigo-400/10 border-indigo-200/20';
  }

  return alternate
    ? 'bg-white/5 border-white/15'
    : 'bg-slate-500/10 border-white/10';
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="space-y-5 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm sm:p-8"
    >
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function ParallaxStrip({
  index,
  title,
  tone,
  scrollYProgress,
  children,
}: {
  index: number;
  title: string;
  tone: StripTone;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  children: React.ReactNode;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [index * 4, index * 24]);
  const toneClassName = toneClasses(tone, index);

  return (
    <motion.section
      style={{ y }}
      className={`relative rounded-3xl border px-5 py-8 sm:px-8 sm:py-10 ${toneClassName}`}
    >
      <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-white/5 via-transparent to-white/5" />
      <div className="relative z-10">
        <SectionCard title={title}>{children}</SectionCard>
      </div>
    </motion.section>
  );
}
