'use client';

import { motion } from 'motion/react';
import { SocialIcon } from './SocialIcon';
import type { Basics } from './types';

const heroStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroStat = { label: string; value: string };

export function HeroSection({
  basics,
  stats,
}: {
  basics: Basics;
  stats: HeroStat[];
}) {
  return (
    <motion.header
      variants={heroStagger}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 backdrop-blur-xl sm:p-10"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-teal-500/5 blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="space-y-5">
          <motion.p
            variants={heroItem}
            className="font-mono text-xs tracking-[0.35em] text-accent"
          >
            <span className="sr-only">Professional focus: </span>
            ENGINEER · BUILDER · RESEARCH
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight"
          >
            {basics.name}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Mechanical & aerospace engineering with hands-on systems work — from
            electromagnetics and materials science to full-stack software and
            simulation.
          </motion.p>

          <motion.nav
            variants={heroItem}
            aria-label="Contact information"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
          >
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="font-mono text-muted transition-colors hover:text-accent"
              >
                <span className="sr-only">Email: </span>
                {basics.email}
              </a>
            )}
            {basics.phone && (
              <a
                href={`tel:${basics.phone.replace(/\s+/g, '')}`}
                className="font-mono text-muted transition-colors hover:text-accent"
              >
                <span className="sr-only">Phone: </span>
                {basics.phone}
              </a>
            )}
            {basics.url && (
              <a
                href={basics.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-muted transition-colors hover:text-accent"
              >
                <span className="sr-only">Website: </span>
                {basics.url.replace(/^https?:\/\//, '')}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            )}
          </motion.nav>

          {basics.profiles && basics.profiles.length > 0 && (
            <motion.nav
              variants={heroItem}
              aria-label="Social profiles"
              className="flex flex-wrap gap-2 pt-1"
            >
              {basics.profiles.map((social, index) => (
                <motion.a
                  key={`${social.network}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-border-strong hover:text-accent"
                >
                  <SocialIcon network={social.network} />
                  <span>{social.network}</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </motion.a>
              ))}
            </motion.nav>
          )}
        </div>

        <motion.ul
          variants={heroItem}
          aria-label="Profile summary counts"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:min-w-60"
        >
          {stats.map((stat, index) => (
            <motion.li
              key={stat.label}
              aria-label={`${stat.value} ${stat.label}`}
              className={`rounded-xl border border-border bg-surface p-4 text-center shadow-card-inset-soft ${index % 2 === 0 ? 'animate-float' : ''}`}
              style={{ animationDelay: `${index * 0.4}s` }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <p className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.header>
  );
}
