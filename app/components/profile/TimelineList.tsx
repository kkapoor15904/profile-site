'use client';

import { ExternalLink } from 'lucide-react';
import { memo } from 'react';
import { ExpandableCardBody } from './ExpandableCardBody';
import {
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
        const description = item.summary ?? item.description;

        return (
          <li key={`${title}-${index}`}>
            <InfoCard index={index}>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-3">
                <div className="timeline-title-column min-w-0 shrink-0">
                  <CardTitle>{title}</CardTitle>
                </div>
                <CardMeta className="w-fit shrink-0">
                  {formatDateRange(item.startDate, item.endDate)}
                </CardMeta>
              </div>
              {((item.position ?? item.studyType) || item.location) && (
                <p className="mt-2 font-mono text-xs text-accent/90">
                  {[item.position ?? item.studyType, item.area, item.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              {description && <ExpandableCardBody text={description} />}
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
