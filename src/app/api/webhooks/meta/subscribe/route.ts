import { NextResponse } from 'next/server';

// ── One-time setup: subscribe the Page to this app's webhook ──
// Meta's app dashboard UI doesn't reliably surface a "subscribe this
// Page" button across its various webhook setup flows, but the
// underlying requirement is just this one Graph API call:
// POST /{page-id}/subscribed_apps. Run this once (visiting the URL is
// enough — it's a GET for convenience) after the webhook callback URL
// itself has been verified in the Meta app dashboard.
//
// Reuses META_WEBHOOK_VERIFY_TOKEN as the auth check, since it's already
// confirmed correct in both Vercel and the Meta dashboard by that point.
// Not meant to be called repeatedly — safe to leave in place, since
// re-subscribing with the same fields is a no-op on Meta's side.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GRAPH_API_VERSION = 'v23.0';
const SUBSCRIBED_FIELDS = 'messages,feed';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN?.trim();

  if (!verifyToken || secret !== verifyToken) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const pageId = process.env.FB_PAGE_ID?.trim();
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN?.trim();
  if (!pageId || !pageAccessToken) {
    return NextResponse.json(
      { success: false, message: 'FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN not configured.' },
      { status: 500 }
    );
  }

  const graphUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/subscribed_apps`;
  const response = await fetch(graphUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscribed_fields: SUBSCRIBED_FIELDS, access_token: pageAccessToken }),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: `Graph API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, subscribedFields: SUBSCRIBED_FIELDS, result: body });
}
