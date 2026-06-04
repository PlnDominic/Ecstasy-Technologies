import React from 'react';
import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Software Development Solutions in Ghana | Ecstasy Technologies',
  description: 'Professional software development services in Ghana including custom web applications, mobile apps, hotel management systems, e-commerce solutions, and enterprise software development.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Software Development Services in Ghana',
    description: 'Custom software development, web & mobile apps, and enterprise solutions.',
    url: '/services',
    images: ['/logo.png'],
  },
};

const SERVICES = [
  {
    num: '01',
    name: 'Web Design & Development',
    description: 'Bespoke websites built for performance, clarity, and conversion — from marketing sites to full e-commerce platforms.',
    features: ['Responsive across all devices', 'E-commerce & payment systems', 'Content management systems', 'SEO-first architecture'],
  },
  {
    num: '02',
    name: 'Web Applications',
    description: 'Complex, scalable systems that power real business operations — logistics dashboards to booking platforms to SaaS tools.',
    features: ['Progressive web apps', 'Real-time data & notifications', 'Workflow automation', 'Third-party API integrations'],
  },
  {
    num: '03',
    name: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that users actually enjoy — built for speed, reliability, and retention.',
    features: ['iOS & Android development', 'Cross-platform (React Native)', 'Offline capability', 'Push notifications'],
  },
  {
    num: '04',
    name: 'Business Software',
    description: 'Custom management systems, ERPs, and operational tools engineered to fit your workflows — not the other way around.',
    features: ['Hotel & property management', 'School management systems', 'Inventory & order systems', 'Financial reporting tools'],
  },
  {
    num: '05',
    name: 'GIS Solutions',
    description: 'Geospatial software for organisations that need to visualise, analyse, and act on location data at scale.',
    features: ['Interactive mapping', 'Location-based services', 'Geospatial data analysis', 'GIS web applications'],
  },
  {
    num: '06',
    name: 'UI/UX Design',
    description: 'User research, wireframing, and interface design that turns complex systems into intuitive, memorable experiences.',
    features: ['User research & personas', 'Wireframing & prototyping', 'Design systems', 'Usability testing'],
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We listen first. Understanding your business context, goals, and constraints lets us design the right solution — not just a clever one.',
  },
  {
    num: '02',
    title: 'Build',
    body: 'Agile sprints with continuous feedback. You see working software early and can shape it throughout. No surprises at the end.',
  },
  {
    num: '03',
    title: 'Launch & Support',
    body: 'Deployment, training, and ongoing maintenance. Your software is our responsibility from day one to long after go-live.',
  },
];

export default function Services() {
  return (
    <SharedLayout currentPath="/services">
      <main className="relative z-10">
        <div className="ip-wrap">

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">CAPABILITIES</span>
            </div>
            <h1 className="ip-heading">
              WHAT WE<br />
              <span style={{ color: 'var(--accent)' }}>BUILD.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              End-to-end software services for ambitious organisations across Africa —
              from first prototype to long-term support.
            </p>
          </div>

          {/* ── Services list ── */}
          <div className="ip-section">
            {SERVICES.map(({ num, name, description, features }, i) => (
              <div
                key={num}
                className="ip-service animate-enter"
                style={{ animationDelay: `${i * 55}ms` } as React.CSSProperties}
              >
                <span className="es-svc-num" style={{ paddingTop: '0.25rem' }}>{num}</span>
                <div className="ip-service-meta">
                  <h2 className="ip-subheading">{name}</h2>
                  <p className="ip-body" style={{ fontSize: '14px' }}>{description}</p>
                  <ul className="ip-service-features">
                    {features.map(f => (
                      <li key={f} className="ip-service-feature">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ── Process ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '0' }}>
              <hr className="es-rule" />
              <span className="es-section-label">HOW WE WORK</span>
            </div>
            <div className="ip-process-grid" style={{ marginTop: '1.5rem' }}>
              {PROCESS.map(({ num, title, body }) => (
                <div key={num} className="ip-process-item">
                  <span className="es-svc-num" style={{ display: 'block', marginBottom: '1rem' }}>{num}</span>
                  <h3 className="ip-subheading" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', marginBottom: '0.75rem' }}>
                    {title}
                  </h3>
                  <p className="ip-body" style={{ fontSize: '13.5px' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head">
              READY TO<br />
              <span className="ip-cta-accent">START?</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Tell us about your project. We respond within 24 hours with an honest assessment and a path forward.
              </p>
              <Link href="/contact" className="btn-press ip-cta-btn">
                Start a Project
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </SharedLayout>
  );
}
