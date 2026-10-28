'use client';

import { ExternalLink } from 'lucide-react';
import { memo } from 'react';
import {
  CardBody,
  CardMeta,
  CardTitle,
  InfoCard,
} from './InfoCard';
import type { Entry } from './types';
import { formatDateRange } from './utils';

function entryTitle(item: Entry) {
  return item.name ?? item.institution ?? 'Entry';
}

function TimelineListComponent({ items }: { items: Entry[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item, index) => {
        const title = entryTitle(item);

        return (
          <li key={`${title}-${index}`}>
            <InfoCard index={index}>
              <div className="flex items-start justify-between gap-3">
                <div className="timeline-title-column shrink-0">
                  <CardTitle>{title}</CardTitle>
                </div>
                <CardMeta>{formatDateRange(item.startDate, item.endDate)}</CardMeta>
              </div>
              {((item.position ?? item.studyType) || item.location) && (
                <p className="mt-2 font-mono text-xs text-accent/90">
                  {[item.position ?? item.studyType, item.area, item.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              {(item.summary ?? item.description) && (
                <CardBody>{item.summary ?? item.description}</CardBody>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-80"
                >
                  Visit {title}
                  <span className="sr-only"> (opens in new tab)</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </InfoCard>
          </li>
        );
      })}
    </ul>
  );
}

export const TimelineList = memo(TimelineListComponent);
