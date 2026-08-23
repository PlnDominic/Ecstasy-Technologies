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

export async function postToFacebook(message: string): Promise<{ id: string }> {
  const { pageId, pageAccessToken } = readCredentials();
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, access_token: pageAccessToken }),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Facebook API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`
    );
  }
  return body;
}
