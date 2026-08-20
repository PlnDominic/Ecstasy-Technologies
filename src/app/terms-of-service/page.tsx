import { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | Ecstasy Technologies',
  description: 'The terms that govern use of the Ecstasy Technologies website and our software development services.',
  alternates: { canonical: '/terms-of-service' },
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

export default function TermsOfService() {
  return (
    <SharedLayout currentPath="/terms-of-service">
      <main className="relative z-10">
        <div className="ip-wrap" style={{ maxWidth: '760px' }}>
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">LEGAL</span>
            </div>
            <h1 className="ip-heading">
              TERMS OF<br />
              <span style={{ color: 'var(--accent)' }}>SERVICE.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              Last updated: 20 August 2026
            </p>
          </div>

          <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Who this applies to</h2>
              <p style={bodyStyle}>
                These Terms of Service ("Terms") govern your use of ecstasytechnologies.com
                (the "Site") and any software development, web, mobile, or consulting
                services ("Services") provided by Ecstasy Technologies ("we", "us", "our"), a
                software development company based in Bibiani, Ghana. By using the Site or
                engaging us for Services, you agree to these Terms.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Use of the site</h2>
              <p style={bodyStyle}>
                Content on this Site — including text, images, project screenshots, and the
                Ecstasy Technologies name and logo — is our property or used with permission,
                and may not be copied or reused without our written consent. You agree not to
                use the Site in any way that could damage, disable, or impair it.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Enquiries and quotes</h2>
              <p style={bodyStyle}>
                Submitting the contact form or emailing us is an enquiry, not a binding
                agreement. A project only begins once we've agreed on scope, price, and
                timeline in writing — typically via a proposal or contract specific to that
                engagement.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Payment terms</h2>
              <p style={bodyStyle}>
                Unless otherwise agreed in a project-specific contract, Services are billed in
                milestones tied to project phases — never 100% upfront. We accept payment via
                Mobile Money (MTN, Vodafone, AirtelTigo) and bank transfer. Specific payment
                schedules, currencies, and amounts are set out in each project's proposal or
                contract, which takes precedence over this general statement.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Our guarantee</h2>
              <p style={bodyStyle}>
                We provide 30 days of free bug-fix support after a project launches, covering
                defects in functionality we built as specified in the agreed scope. This does
                not cover new features, changes of requirements, or issues caused by
                third-party services, hosting, or changes made outside our involvement. Ongoing
                support and maintenance beyond this period are available under a separate
                agreement.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Intellectual property</h2>
              <p style={bodyStyle}>
                Unless a project contract states otherwise, ownership of the final delivered
                work transfers to the client upon full payment. We retain the right to use
                completed, non-confidential work in our portfolio, case studies, and marketing
                materials, and to reuse general-purpose code, frameworks, and know-how
                developed during the engagement in other projects.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Limitation of liability</h2>
              <p style={bodyStyle}>
                To the extent permitted by law, Ecstasy Technologies is not liable for indirect,
                incidental, or consequential damages arising from use of the Site or our
                Services. Our total liability for any claim relating to a project is limited to
                the amount paid for that specific project.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Third-party links</h2>
              <p style={bodyStyle}>
                The Site may link to third-party sites, including live client projects and our
                social profiles. We aren't responsible for the content or practices of sites we
                don't operate.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Changes to these terms</h2>
              <p style={bodyStyle}>
                We may update these Terms from time to time. Material changes will be reflected
                by updating the "Last updated" date above. Continued use of the Site after
                changes are posted constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Governing law</h2>
              <p style={bodyStyle}>
                These Terms are governed by the laws of Ghana, without regard to conflict-of-law
                principles.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Contact us</h2>
              <p style={bodyStyle}>
                Ecstasy Technologies, Bibiani Anhwiaso Bekwai Municipal Assembly, P.O. Box 49,
                Bibiani, Ghana. Email:{' '}
                <a href="mailto:info@ecstasytechnologies.com" style={{ color: 'var(--accent)' }}>
                  info@ecstasytechnologies.com
                </a>. See also our{' '}
                <Link href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>{' '}
                and{' '}
                <Link href="/contact" style={{ color: 'var(--accent)' }}>contact page</Link>.
              </p>
            </section>

          </div>
        </div>
      </main>
    </SharedLayout>
  );
}
