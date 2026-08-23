import { NextResponse } from 'next/server';
import { postToFacebook } from '@/lib/facebook';
import { pickTodaysPost } from '@/data/social-posts';

// ── Scheduled Facebook Page posting ──
// Called by Vercel Cron (see vercel.json) on a fixed schedule. Posts to
// the "Ecstasy Technologies | Bibiani" Page via the Graph API, using the
// same content queue and day-of-year selection as the X posting route
// (see src/data/social-posts.ts) so both platforms stay in sync without
// duplicating the rotation logic.
//
// Locked down with CRON_SECRET so only Vercel's own cron invoker (or
// someone who has that secret) can trigger a real post — see
// .env.example. Vercel automatically sends this as a Bearer token when
// CRON_SECRET is set: https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false; // refuse to run unconfigured — never post unauthenticated
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const post = pickTodaysPost();
  if (!post) {
    return NextResponse.json({ success: false, message: 'No posts in the queue.' }, { status: 200 });
  }

  try {
    const result = await postToFacebook(post.text);
    return NextResponse.json({ success: true, postId: post.id, facebookPostId: result.id });
  } catch (error) {
    console.error('Facebook posting error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
