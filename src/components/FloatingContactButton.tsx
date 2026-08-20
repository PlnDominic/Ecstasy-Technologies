'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when Escape is pressed
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Toggle button — fixed bottom-right */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close quick contact' : 'Open quick contact'}
        aria-expanded={open}
        className="fb-btn"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 80,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--accent)',
          color: 'var(--primary-foreground)',
          boxShadow: '0 6px 20px oklch(54% 0.22 26 / 0.35)',
          transition: 'transform 200ms var(--ease-out), box-shadow 200ms ease',
          transform: open ? 'scale(0.92) translateY(4px)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick contact"
        className="fb-panel"
        style={{
          position: 'fixed',
          bottom: '84px',
          right: '24px',
          zIndex: 79,
          width: 'clamp(280px, 22vw, 360px)',
          maxHeight: 'clamp(360px, 60vh, 520px)',
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px oklch(0% 0 0 / 0.18)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          transition: 'opacity 280ms var(--ease-out), transform 280ms var(--ease-out)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Quick Contact
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted-foreground)',
              display: 'flex', alignItems: 'center',
              padding: '4px',
              transition: 'color 150ms ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mini form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            const name = (e.currentTarget.elements.namedItem('fb-name') as HTMLInputElement).value.trim();
            const msg = (e.currentTarget.elements.namedItem('fb-message') as HTMLTextAreaElement).value.trim();
            if (!name || !msg) return;
            window.location.href = `/contact?name=${encodeURIComponent(name)}&message=${encodeURIComponent(msg)}`;
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflow: 'auto' }}
        >
          <div>
            <label htmlFor="fb-name" style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
              Your Name
            </label>
            <input
              id="fb-name"
              name="fb-name"
              type="text"
              placeholder="Your name"
              required
              autoComplete="name"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid var(--border-strong)',
                background: 'var(--input)',
                color: 'var(--foreground)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 150ms ease',
              }}
            />
          </div>
          <div>
            <label htmlFor="fb-message" style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
              Quick Message
            </label>
            <textarea
              id="fb-message"
              name="fb-message"
              rows={3}
              placeholder="Tell us about your project in a sentence…"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid var(--border-strong)',
                background: 'var(--input)',
                color: 'var(--foreground)',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 150ms ease',
                fontFamily: "'Figtree', system-ui, sans-serif",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-press"
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--primary-foreground)',
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'background-color 150ms ease, transform 160ms var(--ease-out)',
            }}
          >
            Send Quick Message
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
            </svg>
          </button>
        </form>

        {/* Direct links */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a
            href="mailto:support@ecstasytechnologies.com"
            className="btn-press"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '9px 10px',
              borderRadius: '10px',
              border: '1px solid var(--border-strong)',
              background: 'var(--secondary)',
              color: 'var(--foreground)',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Email Us
          </a>
          <a
            href="tel:+233542855399"
            className="btn-press"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '9px 10px',
              borderRadius: '10px',
              border: '1px solid var(--border-strong)',
              background: 'var(--secondary)',
              color: 'var(--foreground)',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Call Us
          </a>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
          We reply within 24 hours — no commitment required.
        </p>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fb-backdrop"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 78,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(3px)',
            Zzz: 'none',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
