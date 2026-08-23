// ── X (Twitter) posting client ──
// Signs and sends a tweet using OAuth 1.0a user-context auth, straight
// against the X API v2 endpoint — no extra SDK dependency required. Reads
// credentials from environment variables only; never hardcode secrets here.

import { createHmac, randomBytes } from 'crypto';

const TWEET_ENDPOINT = 'https://api.x.com/2/tweets';

interface XCredentials {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

function readCredentials(): XCredentials {
  const apiKey = process.env.X_API_KEY?.trim();
  const apiSecret = process.env.X_API_SECRET?.trim();
  const accessToken = process.env.X_ACCESS_TOKEN?.trim();
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET?.trim();

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error(
      'X posting is not configured — set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, and X_ACCESS_TOKEN_SECRET.'
    );
  }
  return { apiKey, apiSecret, accessToken, accessTokenSecret };
}

function percentEncode(value: string): string {
  return encodeURIComponent(value).replace(
    /[!*'()]/g,
    (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

function buildOAuthHeader(method: string, url: string, creds: XCredentials): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: creds.apiKey,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: creds.accessToken,
    oauth_version: '1.0',
  };

  // The tweet endpoint takes no query params, so the signature base only
  // ever needs the OAuth params themselves, sorted per the OAuth 1.0a spec.
  const paramString = Object.keys(oauthParams)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(oauthParams[key])}`)
    .join('&');

  const signatureBase = [method.toUpperCase(), percentEncode(url), percentEncode(paramString)].join(
    '&'
  );
  const signingKey = `${percentEncode(creds.apiSecret)}&${percentEncode(creds.accessTokenSecret)}`;
  const signature = createHmac('sha1', signingKey).update(signatureBase).digest('base64');

  const headerParams = { ...oauthParams, oauth_signature: signature };
  const header = Object.keys(headerParams)
    .sort()
    .map((key) => `${percentEncode(key)}="${percentEncode(headerParams[key])}"`)
    .join(', ');

  return `OAuth ${header}`;
}

export async function postTweet(text: string): Promise<{ id: string; text: string }> {
  const creds = readCredentials();
  const authHeader = buildOAuthHeader('POST', TWEET_ENDPOINT, creds);

  const response = await fetch(TWEET_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `X API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`
    );
  }
  return body.data;
}
