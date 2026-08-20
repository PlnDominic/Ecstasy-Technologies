/**
 * UTM Tracking
 *
 * Preserves UTM campaign parameters across the visitor's session and
 * attaches them to outbound link clicks + contact form submissions so
 * marketing channels can be attributed end-to-end.
 *
 * Behaviour:
 *  - On first client-side mount, capture ?utm_* params from the current URL.
 *  - Store them in localStorage under `ecstasy_utm`.
 *  - Provide `useUtm()` to read the current campaign in any component.
 *  - Provide `utmString()` to build a query-string fragment from the stored
 *    campaign (empty string when there is no campaign).
 *  - `OutboundLink` wraps <a> and appends stored UTM params on click.
 */

/// <reference lib="dom" />

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTOM_KEY = 'ecstasy_utm';

function readFromUrl(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  const out: UtmParams = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = params.get(key);
    if (v) out[key as keyof UtmParams] = v;
  }
  return out;
}

function readFromStorage(): UtmParams {
  try {
    const raw = localStorage.getItem(UTOM_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

function writeToStorage(utm: UtmParams) {
  if (Object.keys(utm).length === 0) {
    try { localStorage.removeItem(UTOM_KEY); } catch {}
    return;
  }
  try { localStorage.setItem(UTOM_KEY, JSON.stringify(utm)); } catch {}
}

function buildQuery(utm: UtmParams): string {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
  const parts: string[] = [];
  for (const k of keys) {
    const v = utm[k];
    if (v) parts.push(`${k}=${encodeURIComponent(v)}`);
  }
  return parts.length ? `?${parts.join('&')}` : '';
}

function mergeIntoUrl(url: string, utm: UtmParams): string {
  if (!utm || Object.keys(utm).length === 0) return url;
  const parsed = new URL(url, window.location.origin);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
    const v = utm[key];
    if (v) parsed.searchParams.set(key, v);
  }
  return parsed.toString();
}

export function utmString(): string {
  const stored = readFromStorage();
  return buildQuery(stored);
}

export function currentUtm(): UtmParams {
  return readFromStorage();
}

export function useUtm(): UtmParams {
  // React hook — reads the persisted campaign. Stable enough for analytics
  // and form/link use; does not cause re-renders when storage changes.
  if (typeof window === 'undefined') return {};
  try {
    return readFromStorage();
  } catch {
    return {};
  }
}

export function initUtmTracking() {
  if (typeof window === 'undefined') return;
  const fromUrl = readFromUrl();
  const stored = readFromStorage();
  // URL params win over previously stored (fresh campaign visit).
  const merged = Object.keys(fromUrl).length ? fromUrl : stored;
  writeToStorage(merged);
}

/**
 * Wraps an external / outbound link and appends stored UTM params so clicks
 * out of the site remain attributable. Use instead of a bare <a> for links
 * that go to third-party domains (social profiles, client live sites, etc.).
 */
export function OutboundLink({
  href,
  children,
  target,
  rel,
  style,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const utm = useUtm();
  const hasCampaign = Object.keys(utm).length > 0;
  const resolvedHref = hasCampaign ? mergeIntoUrl(href, utm) : href;

  return (
    <a
      href={resolvedHref}
      target={target}
      rel={rel}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Appends stored UTM params to a base URL (e.g. for the contact form action
 * or a mailto: link) without rendering an <a>. Returns a string.
 */
export function withUtm(baseUrl: string): string {
  const utm = useUtm();
  return Object.keys(utm).length ? mergeIntoUrl(baseUrl, utm) : baseUrl;
}
