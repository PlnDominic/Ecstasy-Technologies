import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { looksLikeLead } from '@/lib/leadDetection';
import { replyToSender, sendPrivateCommentReply, getSenderName } from '@/lib/metaMessaging';
import { pushLeadToTagett } from '@/lib/tagett';

// ── Meta webhook receiver (Facebook + Instagram DMs and comments) ──
// Handles the two things Meta's webhook system does:
//
// 1. GET — the one-time verification handshake Meta performs when you
//    register this URL in the app's Webhooks settings. Must echo back
//    hub.challenge if hub.verify_token matches META_WEBHOOK_VERIFY_TOKEN.
// 2. POST — actual events (messages, comments) as they happen. Every
//    request's signature is verified against FB_APP_SECRET before any
//    of its content is trusted, since this endpoint is public.
//
// On a lead-shaped inbound DM or comment (see src/lib/leadDetection.ts):
// sends a friendly auto-reply (DM, or private reply for a comment), and
// pushes the lead into Tagett. Everything else is ignored.
//
// See .env.example for META_WEBHOOK_VERIFY_TOKEN, FB_APP_SECRET,
// FB_PAGE_ACCESS_TOKEN, TAGETT_API_TOKEN.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AUTO_REPLY =
  "Thanks for reaching out! Could you tell us a bit about what you're looking to build, and we'll get back to you shortly.";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN?.trim();
  if (mode === 'subscribe' && verifyToken && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 403 });
}

function isValidSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.FB_APP_SECRET?.trim();
  if (!appSecret || !signatureHeader) return false;

  const expected = 'sha256=' + createHmac('sha256', appSecret).update(rawBody).digest('hex');
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureHeader);
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}

async function handleLead(source: 'Facebook DM' | 'Instagram DM' | 'Facebook Comment' | 'Instagram Comment', senderId: string, text: string, reply: (text: string) => Promise<void>) {
  if (!looksLikeLead(text)) return;

  await reply(AUTO_REPLY);

  const name = await getSenderName(senderId);
  try {
    await pushLeadToTagett({ name, source, message: text });
  } catch (error) {
    console.error('Failed to push lead to Tagett:', error);
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256');

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const objectType: string = payload.object; // "page" or "instagram"

  try {
    for (const entry of payload.entry ?? []) {
      // Inbound DMs (Messenger and Instagram Direct share this shape).
      for (const messagingEvent of entry.messaging ?? []) {
        const senderId = messagingEvent.sender?.id;
        const text = messagingEvent.message?.text;
        if (!senderId || !text || messagingEvent.message?.is_echo) continue; // skip our own sent messages

        const source = objectType === 'instagram' ? 'Instagram DM' : 'Facebook DM';
        await handleLead(source, senderId, text, (replyText) => replyToSender(senderId, replyText));
      }

      // Comments on Page posts (field "feed") or Instagram media (field "comments").
      for (const change of entry.changes ?? []) {
        const value = change.value ?? {};
        const commentText: string | undefined = value.message ?? value.text;
        const commentId: string | undefined = value.comment_id ?? value.id;
        const commenterId: string | undefined = value.from?.id;
        if (!commentText || !commentId) continue;

        const source = objectType === 'instagram' ? 'Instagram Comment' : 'Facebook Comment';
        await handleLead(source, commenterId ?? commentId, commentText, (replyText) =>
          sendPrivateCommentReply(commentId, replyText)
        );
      }
    }
  } catch (error) {
    // Meta expects a fast 200 regardless — log the failure but don't let
    // it turn into a retry storm from Meta's webhook delivery system.
    console.error('Meta webhook processing error:', error);
  }

  return NextResponse.json({ success: true });
}
