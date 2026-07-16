'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export const CONSENT_STORAGE_KEY = 'ecstasy-cookie-consent';
export const CONSENT_EVENT = 'ecstasy-cookie-consent-change';

export type ConsentValue = 'granted' | 'denied';

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: ConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem clamp(1.25rem, 4vw, 3rem)',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
      }}
    >
      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--foreground)', maxWidth: '640px' }}>
        We use cookies for analytics to understand how visitors use this site. Non-essential
        cookies are only set if you accept. Read our{' '}
        <Link href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => choose('denied')}
          className="btn-press es-btn-ghost"
          style={{ cursor: 'pointer' }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="btn-press es-btn-primary"
          style={{ cursor: 'pointer' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
