'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

export function ParallaxBackground({
  target,
}: {
  target: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end'],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const glowPrimaryY = useTransform(scrollYProgress, [0, 1], ['-5%', '25%']);
  const glowSecondaryY = useTransform(scrollYProgress, [0, 1], ['10%', '-12%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.35, 0.22]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden
    >
      <motion.div
        style={{ y: gridY }}
        className="parallax-grid absolute inset-0 -top-[10%] h-[120%] w-full"
      />
      <motion.div
        style={{ y: glowPrimaryY, opacity: glowOpacity }}
        className="absolute left-[10%] top-[8%] size-112 rounded-full bg-accent/14 blur-3xl"
      />
      <motion.div
        style={{ y: glowSecondaryY, opacity: glowOpacity }}
        className="absolute right-[5%] top-[45%] size-88 rounded-full bg-teal-500/10 blur-3xl"
      />
      <div className="parallax-vignette absolute inset-0" />
    </div>
  );
}
