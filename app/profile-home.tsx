'use client';

import { useMemo, useRef } from 'react';
import { HeroSection } from './components/profile/HeroSection';
import {
  CardBody,
  CardTitle,
  InfoCard,
} from './components/profile/InfoCard';
import { MarqueeRow } from './components/profile/MarqueeRow';
import { ParallaxBackground } from './components/profile/ParallaxBackground';
import { PageEndCap, SectionPanel } from './components/profile/SectionPanel';
import { ScrollToTop } from './components/profile/ScrollToTop';
import { TimelineList } from './components/profile/TimelineList';
import type { ProfileData } from './components/profile/types';
import { getDateValue } from './components/profile/utils';

function collectMarqueeLabels(profile: ProfileData): string[] {
  const fromSkills =
    profile.skills?.flatMap((skill) => [
      skill.name,
      ...(skill.keywords ?? []),
    ]) ?? [];

  const domains = [
    'FEM / FEA',
    'Python',
    'Next.js',
    'Systems Integration',
    'Orbital Mechanics',
    'Materials Science',
    'TypeScript',
    'Simulation',
  ];

  return [...new Set([...fromSkills, ...domains])].filter(Boolean).slice(0, 24);
}

export function ProfileHome({ profile }: { profile: ProfileData }) {
  const mainRef = useRef<HTMLElement>(null);
  const marqueeLabels = useMemo(() => collectMarqueeLabels(profile), [profile]);

  const heroStats = useMemo(
    () => [
      {
        label: 'Roles',
        value: String(profile.work?.length ?? 0).padStart(2, '0'),
      },
      {
        label: 'Projects',
        value: String(profile.projects?.length ?? 0).padStart(2, '0'),
      },
      {
        label: 'Skills',
        value: String(profile.skills?.length ?? 0).padStart(2, '0'),
      },
      {
        label: 'Education',
        value: String(profile.education?.length ?? 0).padStart(2, '0'),
      },
    ],
    [profile],
  );

  const sortedProjects = useMemo(() => {
    if (!profile.projects?.length) return [];
    return [...profile.projects].sort((a, b) => {
      const endDifference = getDateValue(b.endDate) - getDateValue(a.endDate);
      if (endDifference !== 0) return endDifference;
      return getDateValue(b.startDate) - getDateValue(a.startDate);
    });
  }, [profile.projects]);

  let sectionIndex = 0;

  return (
    <main
      id="main-content"
      ref={mainRef}
      tabIndex={-1}
      aria-label={`${profile.basics.name} professional profile`}
      className="engineering-canvas scanline relative min-h-screen overflow-x-hidden text-foreground outline-none"
    >
      <ParallaxBackground target={mainRef} />
      <div className="relative z-10 mx-auto max-w-5xl space-y-14 px-5 py-16 pb-8 sm:px-8 sm:py-20 sm:pb-10">
        <HeroSection basics={profile.basics} stats={heroStats} />

        {marqueeLabels.length > 0 && (
          <section aria-labelledby="stack-domains-heading">
            <h2
              id="stack-domains-heading"
              className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent"
            >
              Stack & domains
            </h2>
            <p className="sr-only">{marqueeLabels.join(', ')}</p>
            <div className="mt-4 rounded-2xl border border-border bg-surface/80 py-4 backdrop-blur-sm">
              <MarqueeRow labels={marqueeLabels} />
            </div>
          </section>
        )}

        {profile.work && profile.work.length > 0 && (
          <SectionPanel
            sectionId="work-experience"
            index={sectionIndex++}
            title="Work Experience"
            subtitle="Software, leadership, and engineering systems in research and industry contexts."
          >
            <TimelineList items={profile.work} />
          </SectionPanel>
        )}

        {profile.education && profile.education.length > 0 && (
          <SectionPanel
            sectionId="education"
            index={sectionIndex++}
            title="Education"
            subtitle="Formal training in mechanical and aerospace engineering."
          >
            <TimelineList items={profile.education} />
          </SectionPanel>
        )}

        {sortedProjects.length > 0 && (
          <SectionPanel
            sectionId="projects"
            index={sectionIndex++}
            title="Projects"
            subtitle="Research, simulation, and applied engineering builds."
          >
            <TimelineList items={sortedProjects} />
          </SectionPanel>
        )}

        {profile.skills && profile.skills.length > 0 && (
          <SectionPanel
            sectionId="skills"
            index={sectionIndex++}
            title="Skills"
            subtitle="Tooling and competencies grouped by domain."
          >
            <ul className="grid gap-4 sm:grid-cols-2">
              {profile.skills.map((skill, index) => (
                <li key={`${skill.name}-${index}`}>
                  <InfoCard index={index}>
                    <CardTitle>{skill.name}</CardTitle>
                    {skill.keywords && skill.keywords.length > 0 && (
                      <CardBody>{skill.keywords.join(' · ')}</CardBody>
                    )}
                  </InfoCard>
                </li>
              ))}
            </ul>
          </SectionPanel>
        )}

        {((profile.certificates && profile.certificates.length > 0) ||
          (profile.languages && profile.languages.length > 0)) && (
          <SectionPanel
            sectionId="credentials"
            index={sectionIndex++}
            title="Credentials"
            subtitle="Certifications and working languages."
          >
            <div className="grid gap-8 md:grid-cols-2">
              {profile.certificates && profile.certificates.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent">
                    Certificates
                  </h3>
                  <ul className="grid gap-3">
                    {profile.certificates.map((certificate, index) => (
                      <li key={`${certificate.name}-${index}`}>
                        <InfoCard index={index}>
                          <CardTitle>{certificate.name}</CardTitle>
                          {certificate.issuer && (
                            <CardBody>{certificate.issuer}</CardBody>
                          )}
                        </InfoCard>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.languages && profile.languages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent">
                    Languages
                  </h3>
                  <ul className="grid gap-3">
                    {profile.languages.map((language, index) => (
                      <li key={`${language.language}-${index}`}>
                        <InfoCard index={index}>
                          <CardTitle>{language.language}</CardTitle>
                          {language.fluency && (
                            <CardBody>{language.fluency}</CardBody>
                          )}
                        </InfoCard>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SectionPanel>
        )}

        <PageEndCap />
      </div>
      <ScrollToTop />
    </main>
  );
}
