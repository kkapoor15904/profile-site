import { ProfileHome } from "./profile-home";

export default async function HomePage() {
  const response = await fetch(
    "https://raw.githubusercontent.com/kkapoor15904/profile-data/refs/heads/main/resume.json",
    {
      cache: "force-cache",
      next: { tags: ["profile"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to load profile data");
  }

  const profile = await response.json();

  return <ProfileHome profile={profile} />;
}
