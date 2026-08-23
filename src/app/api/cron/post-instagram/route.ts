import { NextResponse } from 'next/server';
import { postToInstagram } from '@/lib/instagram';
import { pickTodaysPost, findPostById } from '@/data/social-posts';

// ── Scheduled Instagram posting ──
// Called by Vercel Cron (see vercel.json) on a fixed schedule. Posts to
// the Instagram Business account linked to the "Ecstasy Technologies |
// Bibiani" Facebook Page, using the same content queue and day-of-year
// selection as the other platforms (see src/data/social-posts.ts).
//
// Instagram has no text-only post type — every post needs an image. If
// today's deterministic pick has no `image`, this route skips posting
// rather than erroring (Facebook and X, if resumed, still post that same
// entry as text). Over time the queue's project-highlight posts (which
// all carry images) keep this from skipping too often.
//
// Optional manual override: pass ?postId=<id> to post a specific queue
// entry right now — it must have an image, same as the daily pick would
// need. Still gated by the same CRON_SECRET check.
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

  if (!post.image) {
    const message = `Post "${post.id}" has no image — Instagram requires one, skipping.`;
    console.log('Instagram posting skipped:', message);
    return NextResponse.json({ success: false, skipped: true, message });
  }

  // Image paths (from data/projects.json) are site-root-relative and may
  // contain spaces — encodeURI turns them into a real, fetchable absolute
  // URL that Instagram's servers can retrieve the image from.
  const imageUrl = `${SITE_URL}${encodeURI(post.image)}`;

  try {
    const result = await postToInstagram(post.text, imageUrl);
    return NextResponse.json({ success: true, postId: post.id, instagramPostId: result.id });
  } catch (error) {
    console.error('Instagram posting error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
