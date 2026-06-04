import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';
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

              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor="name" className="ip-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="ip-input"
                      placeholder="Dominic Kudom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="ip-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="ip-input"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor="company" className="ip-label">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="ip-input"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="ip-label">Service Interested In</label>
                    <select id="service" name="service" className="ip-input" style={{ cursor: 'pointer' }}>
                      <option value="">Select a service</option>
                      <option value="web-design">Web Design & Development</option>
                      <option value="web-app">Web Applications</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="business-software">Business Software</option>
                      <option value="gis">GIS Solutions</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="ip-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="ip-input"
                    placeholder="Tell us about your project — the more context, the better our response."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn-press es-btn-primary"
                    style={{ cursor: 'pointer' }}
                  >
                    Send Message
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </button>
                </div>
              </form>
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
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>+233 54 285 5399</p>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>+233 24 262 6287</p>
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
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>support@ecstasytechnologies.com</p>
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
                      label: 'Twitter',
                      href: 'https://twitter.com',
                      icon: (
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      href: 'https://linkedin.com',
                      icon: (
                        <>
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </>
                      ),
                    },
                    {
                      label: 'Instagram',
                      href: 'https://instagram.com',
                      icon: (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </>
                      ),
                    },
                    {
                      label: 'Facebook',
                      href: 'https://facebook.com',
                      icon: (
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
