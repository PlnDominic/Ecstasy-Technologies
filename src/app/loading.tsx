import React from 'react';

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Page loading"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
        color: 'var(--foreground)',
        zIndex: 9999,
        gap: '1.25rem',
      }}
    >
      {/* Animated mark */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          animation: 'es-spin 700ms linear infinite',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "'Syne', system-ui, sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted-foreground)',
          animation: 'fadeIn 500ms var(--ease-out) both',
          animationDelay: '150ms',
        }}
      >
        Loading
      </span>

      {/* Skeleton pulse — subtle environment cue */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, oklch(54% 0.22 26 / 0.04) 0%, transparent 60%)',
          animation: 'pulseSlow 2.4s infinite',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
