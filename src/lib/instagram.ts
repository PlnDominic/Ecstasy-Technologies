// ── Instagram posting client ──
// Posts to the Instagram Business account linked to the "Ecstasy
// Technologies | Bibiani" Facebook Page, via the Instagram Graph API.
// Reuses the same FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN as Facebook posting —
// no separate Instagram credentials needed, since the Page token carries
// the instagram_basic / instagram_content_publishing permissions once
// those are granted on the Meta app.

const GRAPH_API_VERSION = 'v23.0';

interface FacebookCredentials {
  pageId: string;
  pageAccessToken: string;
}

function readCredentials(): FacebookCredentials {
  const pageId = process.env.FB_PAGE_ID?.trim();
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN?.trim();

  if (!pageId || !pageAccessToken) {
    throw new Error('Instagram posting is not configured — set FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN.');
  }
  return { pageId, pageAccessToken };
}

async function graphRequest(path: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${path}`);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Instagram API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`
    );
  }
  return body;
}

/** Resolves the Instagram Business Account id linked to the configured Facebook Page. */
async function getInstagramAccountId(pageId: string, pageAccessToken: string): Promise<string> {
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}?fields=instagram_business_account&access_token=${encodeURIComponent(pageAccessToken)}`;
  const response = await fetch(url);
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Instagram API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`
    );
  }
  const igId = body?.instagram_business_account?.id;
  if (!igId) {
    throw new Error(
      'No Instagram Business account is linked to this Facebook Page — link one in Page Settings first.'
    );
  }
  return igId;
}

// Instagram requires an image — there is no text-only post type. Uses the
// standard two-step Content Publishing flow: create a media container,
// then publish it.
export async function postToInstagram(caption: string, imageUrl: string): Promise<{ id: string }> {
  const { pageId, pageAccessToken } = readCredentials();
  const igUserId = await getInstagramAccountId(pageId, pageAccessToken);

  const container = await graphRequest(`${igUserId}/media`, {
    image_url: imageUrl,
    caption,
    access_token: pageAccessToken,
  });

  const published = await graphRequest(`${igUserId}/media_publish`, {
    creation_id: container.id,
    access_token: pageAccessToken,
  });

  return published;
}
