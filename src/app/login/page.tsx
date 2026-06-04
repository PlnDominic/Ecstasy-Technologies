"use client";

import React, { FormEvent, useState, ChangeEvent } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password });

      if (email === 'admin@ecstasytechnologies.com' && password === 'admin123') {
        window.location.href = '/dashboard';
      } else {
        setError('Email address or password is incorrect. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: "'Figtree', system-ui, sans-serif",
      }}
    >
      {/* Minimal header */}
      <header
        style={{
          padding: '1.25rem clamp(1.25rem, 4vw, 3rem)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            textDecoration: 'none', color: 'inherit',
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M3 6.5C3 4.01472 5.01472 2 7.5 2C9.98528 2 12 4.01472 12 6.5C12 8.98528 9.98528 11 7.5 11C5.01472 11 3 8.98528 3 6.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M14 16.5C14 14.0147 16.0147 12 18.5 12C20.9853 12 23 14.0147 23 16.5C23 18.9853 20.9853 21 18.5 21C16.0147 21 14 18.9853 14 16.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 16.5C3 14.0147 5.01472 12 7.5 12C9.98528 12 12 14.0147 12 16.5C12 18.9853 9.98528 21 7.5 21C5.01472 21 3 18.9853 3 16.5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M14 6.5C14 4.01472 16.0147 2 18.5 2C20.9853 2 23 4.01472 23 6.5C23 8.98528 20.9853 11 18.5 11C16.0147 11 14 8.98528 14 6.5Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800, fontSize: '13px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}
          >
            ECSTASY
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: '12px', color: 'var(--muted-foreground)',
            textDecoration: 'none', borderBottom: '1px solid var(--border)',
            paddingBottom: '1px',
            transition: 'color 150ms ease, border-color 150ms ease',
          }}
        >
          ← Back to site
        </Link>
      </header>

      {/* Login form — centred */}
      <main
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Eyebrow + heading */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{
                height: '1px', backgroundColor: 'var(--border)',
                marginBottom: '0.6rem',
              }} />
              <span
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--muted-foreground)',
                }}
              >
                STAFF PORTAL
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: '-0.02em', margin: '0.5rem 0 0',
              }}
            >
              SIGN<br />
              <span style={{ color: 'var(--accent)' }}>IN.</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div>
              <label
                htmlFor="email-address"
                style={{
                  display: 'block',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--muted-foreground)', marginBottom: '0.5rem',
                }}
              >
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="ip-input"
                placeholder="you@ecstasytechnologies.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--muted-foreground)', marginBottom: '0.5rem',
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="ip-input"
                placeholder="••••••••"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  style={{
                    width: 14, height: 14, accentColor: 'var(--accent)', cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Remember me</span>
              </label>
              <a
                href="#"
                style={{
                  fontSize: '12px', color: 'var(--muted-foreground)',
                  textDecoration: 'none', borderBottom: '1px solid var(--border)',
                  paddingBottom: '1px',
                  transition: 'color 150ms ease',
                }}
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <div
                role="alert"
                style={{
                  padding: '10px 14px',
                  border: '1px solid oklch(50% 0.2 26)',
                  backgroundColor: 'oklch(50% 0.2 26 / 0.08)',
                  fontSize: '13px',
                  color: 'var(--accent)',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-press es-btn-primary"
              style={{
                width: '100%', justifyContent: 'center',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

          </form>

        </div>
      </main>

    </div>
  );
}
