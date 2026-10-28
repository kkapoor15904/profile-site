import { Analytics } from '@vercel/analytics/next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SkipLink } from './components/profile/SkipLink';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: {
    default: 'Engineer Profile',
    template: '%s',
  },
  description: 'Professional engineering profile.',
  icons: {
    icon: '/page-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SkipLink />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
