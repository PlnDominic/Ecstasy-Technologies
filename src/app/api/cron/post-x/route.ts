import { NextResponse } from 'next/server';
import { postTweet } from '@/lib/x';
import { socialPosts } from '@/data/social-posts';

// ── Scheduled X (Twitter) posting ──
// Called by Vercel Cron (see vercel.json) on a fixed schedule. Picks the
// next post in the rotation deterministically by day-of-year, so the same
// entry is chosen no matter how many times the job happens to fire on a
// given day, and the queue wraps around once it reaches the end.
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

function pickTodaysPost() {
  if (socialPosts.length === 0) return null;
  const dayOfYear = Math.floor(Date.now() / 86_400_000); // days since epoch, stable per day
  return socialPosts[dayOfYear % socialPosts.length];
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
    const tweet = await postTweet(post.text);
    return NextResponse.json({ success: true, postId: post.id, tweetId: tweet.id });
  } catch (error) {
    console.error('X posting error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
