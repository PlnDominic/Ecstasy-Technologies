// ── Lead-detection heuristic ──
// A simple keyword match over inbound DM/comment text. Deliberately
// conservative — false negatives (missing a genuine lead) are far less
// costly than false positives (auto-replying to someone talking about
// something unrelated), so this only fires on fairly unambiguous
// service-inquiry language.

const LEAD_KEYWORDS = [
  'price',
  'pricing',
  'quote',
  'cost',
  'how much',
  'interested',
  'website',
  'web app',
  'mobile app',
  'build me',
  'build us',
  'hire you',
  'hire',
  'service',
  'services',
  'contact you',
  'reach out',
  'get in touch',
  'dm me',
  'inbox me',
];

export function looksLikeLead(text: string): boolean {
  const normalized = text.toLowerCase();
  return LEAD_KEYWORDS.some((keyword) => normalized.includes(keyword));
}
