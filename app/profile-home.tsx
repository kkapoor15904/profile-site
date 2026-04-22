'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useMemo, useRef } from 'react';
import { ParallaxStrip } from './components/profile/ParallaxStrip';
import { SocialIcon } from './components/profile/SocialIcon';
import { TimelineList } from './components/profile/TimelineList';
import type { ProfileData, StripItem } from './components/profile/types';
import { getDateValue } from './components/profile/utils';

export function ProfileHome({ profile }: { profile: ProfileData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const orbOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.15]);

  const strips: StripItem[] = useMemo(() => {
    const nextStrips: StripItem[] = [];

    if (profile.work && profile.work.length > 0) {
      nextStrips.push({
        id: 'work',
        title: 'Work Experience',
        tone: 'cyan',
        content: <TimelineList items={profile.work} />,
      });
    }

    if (profile.education && profile.education.length > 0) {
      nextStrips.push({
        id: 'education',
        title: 'Education',
        tone: 'neutral',
        content: <TimelineList items={profile.education} />,
      });
    }

    if (profile.projects && profile.projects.length > 0) {
      const sortedProjects = [...profile.projects].sort((a, b) => {
        const endDifference = getDateValue(b.endDate) - getDateValue(a.endDate);
        if (endDifference !== 0) return endDifference;
        return getDateValue(b.startDate) - getDateValue(a.startDate);
      });

      nextStrips.push({
        id: 'projects',
        title: 'Projects',
        tone: 'indigo',
        content: <TimelineList items={sortedProjects} />,
      });
    }

    if (profile.skills && profile.skills.length > 0) {
      nextStrips.push({
        id: 'skills',
        title: 'Skills',
        tone: 'neutral',
        content: (
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.skills.map((skill, index) => (
              <motion.li
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="text-base font-medium">{skill.name}</h3>
                {skill.keywords && skill.keywords.length > 0 && (
                  <p className="mt-1 text-sm text-white/75">
                    {skill.keywords.join(', ')}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        ),
      });
    }

    if (
      (profile.certificates && profile.certificates.length > 0) ||
      (profile.languages && profile.languages.length > 0)
    ) {
      nextStrips.push({
        id: 'credentials',
        title: 'Certificates and Languages',
        tone: 'cyan',
        content: (
          <div className="grid gap-8 md:grid-cols-2">
            {profile.certificates && profile.certificates.length > 0 && (
              <ul className="space-y-3">
                {profile.certificates.map((certificate, index) => (
                  <motion.li
                    key={`${certificate.name}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.32, delay: index * 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
                  >
                    <p className="font-medium">{certificate.name}</p>
                    {certificate.issuer && (
                      <p className="text-white/70">{certificate.issuer}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
            )}

            {profile.languages && profile.languages.length > 0 && (
              <ul className="space-y-3">
                {profile.languages.map((language, index) => (
                  <motion.li
                    key={`${language.language}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.32, delay: index * 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
                  >
                    <p className="font-medium">{language.language}</p>
                    {language.fluency && (
                      <p className="text-white/70">{language.fluency}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        ),
      });
    }

    return nextStrips;
  }, [profile]);

  return (
    <main ref={containerRef} className="relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.2),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.18),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_40%,#020617_100%)]"
      />
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/35 blur-3xl"
      />

      <div className="mx-auto max-w-5xl space-y-10 px-5 pt-20 pb-40 text-white sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4 rounded-2xl border border-white/10 bg-black/35 p-8 backdrop-blur-sm"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200/90">
            Profile
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.basics.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            {profile.basics.email && (
              <a
                href={`mailto:${profile.basics.email}`}
                className="transition-colors hover:text-cyan-200"
              >
                {profile.basics.email}
              </a>
            )}
            {profile.basics.phone && (
              <a
                href={`tel:${profile.basics.phone.replace(/\s+/g, '')}`}
                className="transition-colors hover:text-cyan-200"
              >
                {profile.basics.phone}
              </a>
            )}
          </div>
          {profile.basics.profiles && profile.basics.profiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.basics.profiles.map((social, index) => (
                <motion.a
                  key={`${social.network}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/90 transition-colors hover:border-cyan-200/50 hover:text-cyan-100"
                >
                  <SocialIcon network={social.network} />
                  <span>{social.network}</span>
                </motion.a>
              ))}
            </div>
          )}
        </motion.header>

        <div className="space-y-10">
          {strips.map((strip, index) => (
            <ParallaxStrip
              key={strip.id}
              index={index}
              title={strip.title}
              tone={strip.tone}
              scrollYProgress={scrollYProgress}
            >
              {strip.content}
            </ParallaxStrip>
          ))}
        </div>
      </div>
    </main>
  );
}
