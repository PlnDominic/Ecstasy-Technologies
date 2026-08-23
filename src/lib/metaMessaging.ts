// ── Meta messaging (Messenger + Instagram Direct) ──
// Sends DM replies and private comment replies via the Graph API, using
// the same Page Access Token as Facebook/Instagram posting (FB_PAGE_ACCESS_TOKEN).
// Facebook and Instagram share this Send API surface once the token
// carries the messaging permissions — see .env.example.

const GRAPH_API_VERSION = 'v23.0';

function readPageAccessToken(): string {
  const token = process.env.FB_PAGE_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new Error('Meta messaging is not configured — set FB_PAGE_ACCESS_TOKEN.');
  }
  return token;
}

async function sendApiRequest(recipient: Record<string, string>, text: string): Promise<void> {
  const pageAccessToken = readPageAccessToken();
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/me/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient,
      message: { text },
      messaging_type: 'RESPONSE',
      access_token: pageAccessToken,
    }),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`Meta messaging error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`);
  }
}

/** Replies to a DM sender (Messenger PSID or Instagram-scoped user id). */
export async function replyToSender(senderId: string, text: string): Promise<void> {
  await sendApiRequest({ id: senderId }, text);
}

/** Sends a private reply to a comment (Facebook or Instagram), rather than a public reply. */
export async function sendPrivateCommentReply(commentId: string, text: string): Promise<void> {
  await sendApiRequest({ comment_id: commentId }, text);
}

/** Best-effort lookup of a person's display name from their PSID/IGSID — falls back to the id itself if unavailable. */
export async function getSenderName(senderId: string): Promise<string> {
  try {
    const pageAccessToken = readPageAccessToken();
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${senderId}?fields=name&access_token=${encodeURIComponent(pageAccessToken)}`;
    const response = await fetch(url);
    const body = await response.json().catch(() => null);
    if (response.ok && body?.name) return body.name;
  } catch {
    // fall through to the id-based fallback below
  }
  return `Contact ${senderId}`;
}
