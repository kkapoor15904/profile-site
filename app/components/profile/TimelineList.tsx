'use client';

import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { memo } from 'react';
import type { Entry } from './types';
import { formatDateRange } from './utils';

function TimelineListComponent({ items }: { items: Entry[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <motion.li
          key={`${item.name ?? item.institution ?? 'item'}-${index}`}
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-medium text-white/95">
              {item.name ?? item.institution}
            </h3>
            <span className="text-xs text-white/70">
              {formatDateRange(item.startDate, item.endDate)}
            </span>
          </div>
          {((item.position ?? item.studyType) || item.location) && (
            <p className="mt-1 text-sm text-white/80">
              {[item.position ?? item.studyType, item.area, item.location]
                .filter(Boolean)
                .join(' - ')}
            </p>
          )}
          {(item.summary ?? item.description) && (
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {item.summary ?? item.description}
            </p>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <span>Visit</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

export const TimelineList = memo(TimelineListComponent);
