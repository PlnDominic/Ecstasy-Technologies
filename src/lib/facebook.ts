// ── Facebook Page posting client ──
// Posts to the "Ecstasy Technologies | Bibiani" Page via the Graph API,
// using a long-lived Page Access Token. Reads credentials from
// environment variables only; never hardcode secrets here.

const GRAPH_API_VERSION = 'v23.0';

interface FacebookCredentials {
  pageId: string;
  pageAccessToken: string;
}

function readCredentials(): FacebookCredentials {
  const pageId = process.env.FB_PAGE_ID?.trim();
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN?.trim();

  if (!pageId || !pageAccessToken) {
    throw new Error('Facebook posting is not configured — set FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN.');
  }
  return { pageId, pageAccessToken };
}

// With imageUrl: posts a photo (the image, with the text as its caption)
// via the /photos endpoint. Without it: a plain text post via /feed.
export async function postToFacebook(message: string, imageUrl?: string): Promise<{ id: string }> {
  const { pageId, pageAccessToken } = readCredentials();
  const endpoint = imageUrl ? 'photos' : 'feed';
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/${endpoint}`;
  const payload = imageUrl
    ? { url: imageUrl, caption: message, access_token: pageAccessToken }
    : { message, access_token: pageAccessToken };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Facebook API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`
    );
  }
  return body;
}
