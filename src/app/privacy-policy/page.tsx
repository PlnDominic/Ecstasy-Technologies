import { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ecstasy Technologies',
  description: 'How Ecstasy Technologies collects, uses, and protects your personal data.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

const sectionStyle: CSSProperties = { marginBottom: '2.5rem' };
const headingStyle: CSSProperties = {
  fontFamily: "'Syne', system-ui, sans-serif",
  fontSize: '1.1rem',
  fontWeight: 800,
  marginBottom: '0.75rem',
  color: 'var(--foreground)',
};
const bodyStyle: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.7,
  color: 'var(--muted-foreground)',
};

export default function PrivacyPolicy() {
  return (
    <SharedLayout currentPath="/privacy-policy">
      <main className="relative z-10">
        <div className="ip-wrap" style={{ maxWidth: '760px' }}>
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">LEGAL</span>
            </div>
            <h1 className="ip-heading">
              PRIVACY<br />
              <span style={{ color: 'var(--accent)' }}>POLICY.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              Last updated: 16 July 2026
            </p>
          </div>

          <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Who we are</h2>
              <p style={bodyStyle}>
                Ecstasy Technologies ("we", "us", "our") is a software development company
                based in Bibiani, Ghana. This policy explains what personal data we collect
                through ecstasytechnologies.com, why we collect it, and the choices you have.
                If you have questions, contact us at{' '}
                <a href="mailto:support@ecstasytechnologies.com" style={{ color: 'var(--accent)' }}>
                  support@ecstasytechnologies.com
                </a>.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Data we collect</h2>
              <p style={bodyStyle}>
                <strong style={{ color: 'var(--foreground)' }}>Contact form.</strong> When you submit
                our contact form we receive your name, email address, company name (optional),
                the service you're interested in, and your message. We use this only to respond
                to your enquiry.
              </p>
              <p style={bodyStyle}>
                <strong style={{ color: 'var(--foreground)' }}>Analytics cookies.</strong> With your
                consent, we use Google Analytics to understand how visitors use this site
                (pages viewed, approximate location, device type). This is not loaded until you
                accept cookies via the banner shown on your first visit, and you can withdraw
                consent at any time by clearing your browser's local storage for this site.
              </p>
              <p style={bodyStyle}>
                <strong style={{ color: 'var(--foreground)' }}>Google Maps.</strong> Some pages load
                the Google Maps JavaScript API, which may set its own cookies and receive your
                IP address directly from Google when the map loads.
              </p>
              <p style={bodyStyle}>
                <strong style={{ color: 'var(--foreground)' }}>Staff / client portal login.</strong> If
                you have an account with us, we process the email address and credentials needed
                to authenticate you.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Legal basis for processing</h2>
              <p style={bodyStyle}>
                We process contact-form and account data on the basis of legitimate interest
                (responding to enquiries, providing services you've requested) and, where
                applicable, contract performance. Analytics cookies are processed only on the
                basis of your consent.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Third parties</h2>
              <p style={bodyStyle}>
                We share data with the following processors, each of which has its own privacy
                policy: Google Analytics and Google Tag Manager (site analytics), Google Maps
                (map display), and Google Fonts (typefaces, served from Google's CDN). We do not
                sell your personal data.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Data retention</h2>
              <p style={bodyStyle}>
                Contact-form messages are retained only as long as needed to handle your enquiry
                and for a reasonable follow-up period, after which they are deleted. Account data
                is retained for as long as your account is active. Analytics data is retained
                according to Google Analytics' default retention settings.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Your rights</h2>
              <p style={bodyStyle}>
                Depending on your location, you may have the right to access, correct, delete,
                or export your personal data, to object to or restrict our processing of it, and
                to withdraw consent at any time. To exercise any of these rights, email{' '}
                <a href="mailto:support@ecstasytechnologies.com" style={{ color: 'var(--accent)' }}>
                  support@ecstasytechnologies.com
                </a>. If you are in the European Economic Area or UK, you also have the right to
                lodge a complaint with your local data protection supervisory authority.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Security</h2>
              <p style={bodyStyle}>
                We take reasonable technical and organisational measures to protect the personal
                data we hold against unauthorised access, loss, or misuse.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Changes to this policy</h2>
              <p style={bodyStyle}>
                We may update this policy from time to time. Material changes will be reflected
                by updating the "Last updated" date above.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Contact us</h2>
              <p style={bodyStyle}>
                Ecstasy Technologies, Bibiani Anhwiaso Bekwai Municipal Assembly, P.O. Box 49,
                Bibiani, Ghana. Email:{' '}
                <a href="mailto:support@ecstasytechnologies.com" style={{ color: 'var(--accent)' }}>
                  support@ecstasytechnologies.com
                </a>. See also our{' '}
                <Link href="/contact" style={{ color: 'var(--accent)' }}>contact page</Link>.
              </p>
            </section>

          </div>
        </div>
      </main>
    </SharedLayout>
  );
}
