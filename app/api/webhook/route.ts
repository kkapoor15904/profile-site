import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export function POST(request: NextRequest) {
  // Basic check for a GitHub webhook via User-Agent or header secret (customize as needed)
  // In production, you should use a webhook secret and validate signatures

  const userAgent = request.headers.get('user-agent') || '';
  const githubEvent = request.headers.get('x-github-event');
  // Optionally: const githubSignature = request.headers.get('x-hub-signature-256');

  // Simple safety: require 'GitHub-Hookshot' in User-Agent or 'x-github-event' in headers
  if (!userAgent.includes('GitHub-Hookshot') && !githubEvent) {
    return new Response('Forbidden: not a valid GitHub webhook', {
      status: 403,
    });
  }

  revalidateTag('profile', { expire: 0 });

  return Response.json({
    revalidated: true,
    timestamp: Date.now(),
  });
}
