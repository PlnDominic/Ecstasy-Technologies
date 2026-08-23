// ── Tagett lead push ──
// Pushes leads captured from Facebook/Instagram DMs and comments into
// the existing Tagett client-management tool, so they land alongside
// leads found by other channels instead of a separate, disconnected
// store. Reuses the same bearer-token auth Tagett's other integrations
// already use.

const TAGETT_BASE_URL = process.env.TAGETT_BASE_URL?.trim() || 'https://tagett.vercel.app';

function readToken(): string {
  const token = process.env.TAGETT_API_TOKEN?.trim();
  if (!token) {
    throw new Error('Tagett lead push is not configured — set TAGETT_API_TOKEN.');
  }
  return token;
}

interface NewLead {
  name: string;
  source: 'Facebook DM' | 'Instagram DM' | 'Facebook Comment' | 'Instagram Comment';
  message: string;
}

async function tagettRequest(path: string, init: RequestInit): Promise<any> {
  const token = readToken();
  const response = await fetch(`${TAGETT_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`Tagett API error (${response.status}): ${body ? JSON.stringify(body) : response.statusText}`);
  }
  return body;
}

// Skips creating a duplicate if a deal with the same name already exists
// (case-insensitive), same convention as the other lead-search routine.
export async function pushLeadToTagett(lead: NewLead): Promise<{ created: boolean }> {
  const existing = await tagettRequest('/api/deals', { method: 'GET' });
  const deals: Array<{ name?: string }> = Array.isArray(existing) ? existing : existing?.deals ?? [];
  const alreadyExists = deals.some((deal) => deal.name?.toLowerCase() === lead.name.toLowerCase());
  if (alreadyExists) {
    return { created: false };
  }

  await tagettRequest('/api/deals', {
    method: 'POST',
    body: JSON.stringify({
      id: `${Date.now()}-social-${Math.random().toString(36).slice(2, 8)}`,
      name: lead.name,
      industry: lead.source,
      valueGHS: 3500,
      stage: 'found',
      notes: lead.message,
      createdAt: Date.now(),
    }),
  });
  return { created: true };
}
