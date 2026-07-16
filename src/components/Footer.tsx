import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '1.25rem clamp(1.25rem, 4vw, 3rem)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem 1.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
        © {new Date().getFullYear()} Ecstasy Technologies. All rights reserved.
      </span>
      <Link
        href="/privacy-policy"
        style={{
          fontSize: '12px',
          color: 'var(--muted-foreground)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1px',
        }}
      >
        Privacy Policy
      </Link>
    </footer>
  );
}
