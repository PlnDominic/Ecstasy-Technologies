import { NextResponse } from 'next/server';
import { postToFacebook } from '@/lib/facebook';
import { pickTodaysPost, findPostById } from '@/data/social-posts';

// ── Scheduled Facebook Page posting ──
// Called by Vercel Cron (see vercel.json) on a fixed schedule. Posts to
// the "Ecstasy Technologies | Bibiani" Page via the Graph API, using the
// same content queue and day-of-year selection as the X posting route
// (see src/data/social-posts.ts) so both platforms stay in sync without
// duplicating the rotation logic.
//
// Optional manual override: pass ?postId=<id> to post a specific queue
// entry right now instead of the deterministic daily pick — useful for
// testing a particular post (e.g. an image one) without waiting for the
// rotation to land on it. Still gated by the same CRON_SECRET check.
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

const SITE_URL = 'https://ecstasytechnologies.com';

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const overrideId = new URL(request.url).searchParams.get('postId');
  const post = overrideId ? findPostById(overrideId) : pickTodaysPost();
  if (!post) {
    return NextResponse.json(
      { success: false, message: overrideId ? `No post with id "${overrideId}".` : 'No posts in the queue.' },
      { status: overrideId ? 404 : 200 }
    );
  }

  // Image paths (from data/projects.json) are site-root-relative and may
  // contain spaces — encodeURI turns them into a real, fetchable absolute
  // URL that Facebook's servers can retrieve the image from.
  const imageUrl = post.image ? `${SITE_URL}${encodeURI(post.image)}` : undefined;

  try {
    const result = await postToFacebook(post.text, imageUrl);
    return NextResponse.json({ success: true, postId: post.id, facebookPostId: result.id });
  } catch (error) {
    console.error('Facebook posting error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
