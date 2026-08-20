import Link from 'next/link';

const linkStyle = {
  fontSize: '12px',
  color: 'var(--muted-foreground)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--border)',
  paddingBottom: '1px',
};

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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', alignItems: 'center' }}>
        <a href="mailto:support@ecstasytechnologies.com" style={linkStyle}>
          support@ecstasytechnologies.com
        </a>
        <a href="tel:+233542855399" style={linkStyle}>
          +233 54 285 5399
        </a>
        <Link href="/privacy-policy" style={linkStyle}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" style={linkStyle}>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
