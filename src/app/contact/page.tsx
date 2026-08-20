import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get Software Development Quote | Ecstasy Ghana',
  description: 'Contact Ecstasy Technologies in Ghana for your software development needs. Get a free consultation for web development, mobile apps, and enterprise solutions.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Ecstasy Technologies',
    description: 'Get in touch for software development services in Ghana.',
    url: '/contact',
    images: ['/logo.png'],
  },
};

export default function Contact() {
  return (
    <SharedLayout currentPath="/contact">
      <main className="relative z-10">
        <div className="ip-wrap">

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">CONTACT</span>
            </div>
            <h1 className="ip-heading">
              LET'S TALK<br />
              <span style={{ color: 'var(--accent)' }}>SHOP.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              Ready to start your project? Have questions about our services?
              Fill in the form or reach us directly — we respond within 24 hours.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              marginBottom: 'clamp(3rem, 5vw, 5rem)',
            }}
          >
            {/* ── Contact form ── */}
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">SEND A MESSAGE</span>
              </div>

              <ContactForm />
            </div>

            {/* ── Contact information ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

              {/* Contact details */}
              <div>
                <div style={{ marginBottom: '1.75rem' }}>
                  <hr className="es-rule" />
                  <span className="es-section-label">CONTACT DETAILS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent)' }}>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '11px', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Phone</p>
                      <a href="tel:+233542855399" className="ip-contact-link">+233 54 285 5399</a>
                      <a href="tel:+233242626287" className="ip-contact-link">+233 24 262 6287</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent)' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6l-10 7L2 6"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '11px', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Email</p>
                      <a href="mailto:info@ecstasytechnologies.com" className="ip-contact-link">info@ecstasytechnologies.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent)' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '11px', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Office</p>
                      <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--foreground)' }}>
                        Bibiani Anhwiaso Bekwai Municipal Assembly<br />
                        P.O. Box 49<br />
                        Bibiani, Ghana
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Business hours */}
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <hr className="es-rule" />
                  <span className="es-section-label">HOURS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM GMT' },
                    { day: 'Saturday', hours: '10:00 AM – 2:00 PM GMT' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(({ day, hours }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '13px', color: 'var(--foreground)' }}>{day}</span>
                      <span style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <hr className="es-rule" />
                  <span className="es-section-label">CONNECT</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[
                    {
                      label: 'TikTok',
                      href: 'https://www.tiktok.com/@ecstasytechnologies',
                      icon: (
                        <path d="M16.5 2h-3v13.5a2.5 2.5 0 11-2.5-2.5c.17 0 .34.01.5.04V9.96a5.6 5.6 0 00-.5-.02A5.58 5.58 0 005.42 15.5 5.58 5.58 0 0011 21.08a5.58 5.58 0 005.5-5.58V8.36a8.34 8.34 0 004.5 1.32V6.68A5.5 5.5 0 0116.5 2z"
                          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      ),
                    },
                    {
                      label: 'X (Twitter)',
                      href: 'https://x.com/ecstasy_tech',
                      icon: (
                        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      ),
                    },
                  ].map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="btn-press"
                      style={{
                        width: 38, height: 38, border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--muted-foreground)',
                        transition: 'color 150ms ease, border-color 150ms ease',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{icon}</svg>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </SharedLayout>
  );
}
