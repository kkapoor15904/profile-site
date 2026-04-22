import { revalidateTag } from 'next/cache';

export function POST() {
  revalidateTag('profile', { expire: 0 });

  return Response.json({
    revalidated: true,
    timestamp: Date.now(),
  });
}
