import type { Metadata } from 'next';
import { cache } from 'react';
import type { ProfileData } from '../components/profile/types';

export const PROFILE_DATA_URL =
  'https://raw.githubusercontent.com/kkapoor15904/profile-data/refs/heads/main/resume.json';

export const getProfile = cache(async (): Promise<ProfileData> => {
  const response = await fetch(PROFILE_DATA_URL, {
    cache: 'force-cache',
    next: { tags: ['profile'] },
  });

  if (!response.ok) {
    throw new Error('Failed to load profile data');
  }

  return response.json() as Promise<ProfileData>;
});

function collectSkillTerms(profile: ProfileData): string[] {
  return [
    ...new Set(
      profile.skills?.flatMap((skill) => [
        skill.name,
        ...(skill.keywords ?? []),
      ]) ?? [],
    ),
  ].filter(Boolean);
}

function summarizeEducation(profile: ProfileData): string {
  return (
    profile.education
      ?.map((entry) => {
        const parts = [
          entry.studyType,
          entry.area,
          entry.institution ? `at ${entry.institution}` : undefined,
        ].filter(Boolean);
        return parts.join(' ');
      })
      .filter(Boolean)
      .join('; ') ?? ''
  );
}

function summarizeWork(profile: ProfileData): string {
  return (
    profile.work
      ?.slice(0, 3)
      .map((entry) => {
        const org = entry.name ?? entry.institution;
        const role = entry.position ?? entry.studyType;
        return [role, org].filter(Boolean).join(' at ');
      })
      .filter(Boolean)
      .join('; ') ?? ''
  );
}

export function buildProfileMetadata(profile: ProfileData): Metadata {
  const { name, url } = profile.basics;
  const educationSummary = summarizeEducation(profile);
  const workSummary = summarizeWork(profile);
  const skillTerms = collectSkillTerms(profile);
  const skillsSnippet = skillTerms.slice(0, 12).join(', ');

  const descriptionParts = [
    `${name} — mechanical and aerospace engineering profile.`,
    educationSummary && `Education: ${educationSummary}.`,
    workSummary && `Experience: ${workSummary}.`,
    skillsSnippet && `Skills include ${skillsSnippet}.`,
  ].filter(Boolean);

  const description = descriptionParts.join(' ').slice(0, 320);
  const siteUrl = url ?? 'https://kkapoor.info';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${name} | Engineer Profile`,
      template: `%s | ${name}`,
    },
    description,
    keywords: skillTerms,
    authors: [{ name, url: siteUrl }],
    creator: name,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'profile',
      url: siteUrl,
      title: `${name} | Engineer Profile`,
      description,
      siteName: name,
      locale: 'en',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildPersonJsonLd(profile: ProfileData) {
  const { name, email, url, phone, profiles } = profile.basics;
  const siteUrl = url ?? 'https://kkapoor.info';
  const skillTerms = collectSkillTerms(profile);

  const alumniOf =
    profile.education?.map((entry) => ({
      '@type': 'EducationalOrganization',
      name: entry.institution,
    })) ?? [];

  const knowsAbout = skillTerms.map((term) => ({
    '@type': 'Thing',
    name: term,
  }));

  const sameAs =
    profiles?.map((profileLink) => profileLink.url).filter(Boolean) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: siteUrl,
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(alumniOf.length > 0 ? { alumniOf } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
    ...(profile.work?.[0]?.position ? { jobTitle: profile.work[0].position } : {}),
    ...(profile.work?.[0]?.name
      ? { worksFor: { '@type': 'Organization', name: profile.work[0].name } }
      : {}),
  };
}
