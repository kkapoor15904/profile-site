import type { Metadata } from 'next';
import { ProfileHome } from './profile-home';
import {
  buildPersonJsonLd,
  buildProfileMetadata,
  getProfile,
} from './lib/profile-data';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return buildProfileMetadata(profile);
}

export default async function HomePage() {
  const profile = await getProfile();
  const jsonLd = buildPersonJsonLd(profile);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileHome profile={profile} />
    </>
  );
}
