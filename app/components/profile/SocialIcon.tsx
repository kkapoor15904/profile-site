import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

function SocialIconComponent({ network }: { network?: string }) {
  const normalizedNetwork = network?.toLowerCase();

  if (normalizedNetwork === 'github') {
    return <FaGithub size={14} aria-hidden="true" />;
  }

  if (normalizedNetwork === 'linkedin') {
    return <FaLinkedin size={14} aria-hidden="true" />;
  }

  if (normalizedNetwork === 'medium') {
    return <FaMedium size={14} aria-hidden="true" />;
  }

  return <ExternalLink size={14} aria-hidden="true" />;
}

export const SocialIcon = memo(SocialIconComponent);
