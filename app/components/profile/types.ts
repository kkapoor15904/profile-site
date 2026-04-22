import type { ReactNode } from 'react';

export type SocialProfile = {
  network: string;
  username?: string;
  url?: string;
};

export type Basics = {
  name: string;
  email?: string;
  phone?: string;
  url?: string;
  profiles?: SocialProfile[];
};

export type Entry = {
  name?: string;
  institution?: string;
  position?: string;
  studyType?: string;
  area?: string;
  summary?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  url?: string;
};

export type Skill = {
  name: string;
  keywords?: string[];
};

export type Certificate = {
  name: string;
  issuer?: string;
};

export type Language = {
  language: string;
  fluency?: string;
};

export type ProfileData = {
  basics: Basics;
  work?: Entry[];
  education?: Entry[];
  projects?: Entry[];
  skills?: Skill[];
  certificates?: Certificate[];
  languages?: Language[];
};

export type StripTone = 'neutral' | 'cyan' | 'indigo';

export type StripItem = {
  id: string;
  title: string;
  tone: StripTone;
  content: ReactNode;
};
