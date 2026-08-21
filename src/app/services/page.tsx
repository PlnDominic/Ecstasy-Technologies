import React from 'react';
import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';
import Tooltip from '@/components/Tooltip';
import { SERVICES } from '@/data/services';
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

const PAYMENT_METHODS = [
  {
    name: 'Mobile Money',
    tooltip: 'MTN Mobile Money, Vodafone Cash, and AirtelTigo Money - pay directly from your phone, no bank account required.',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="5" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Bank Transfer',
    tooltip: 'Local and international wire transfer. Full account details are shared once a project is scoped.',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M3 10h18M5 10v9m4-9v9m6-9v9m4-9v9M3 19h18M12 2L3 7h18L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We listen first. Understanding your business context, goals, and constraints lets us design the right solution - not just a clever one.',
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
              End-to-end software services for ambitious organisations across Africa -
              from first prototype to long-term support.
            </p>
          </div>

          {/* ── Services list ── */}
          <div className="ip-section">
            {SERVICES.map(({ num, slug, name, description, features }, i) => (
              <div
                key={num}
                className="ip-service animate-enter"
                style={{ animationDelay: `${i * 55}ms` } as React.CSSProperties}
              >
                <span className="es-svc-num" style={{ paddingTop: '0.25rem' }}>{num}</span>
                <div className="ip-service-meta">
                  <h2 className="ip-subheading">
                    {name === 'GIS Solutions' ? (
                      <Tooltip label="GIS" content="Geographic Information Systems - software for capturing, mapping, and analysing location-based data.">
                        {name}
                      </Tooltip>
                    ) : name}
                  </h2>
                  <p className="ip-body" style={{ fontSize: '14px' }}>{description}</p>
                  <ul className="ip-service-features">
                    {features.map(f => (
                      <li key={f} className="ip-service-feature">{f}</li>
                    ))}
                  </ul>
                  <Link href={`/services/${slug}`} className="btn-press es-all-link" style={{ alignSelf: 'flex-start' }}>
                    Learn more ↗
                  </Link>
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

          {/* ── Payment & Guarantee ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '1.75rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">PAYMENT & GUARANTEE</span>
            </div>
            <div className="ip-info-grid">
              <div>
                <h3 className="ip-subheading" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', marginBottom: '1rem' }}>
                  How you pay
                </h3>
                <ul className="ip-payment-list">
                  {PAYMENT_METHODS.map(({ name, tooltip, icon }) => (
                    <li key={name} className="ip-payment-item">
                      <span className="ip-payment-icon" aria-hidden="true">{icon}</span>
                      <Tooltip content={tooltip}>{name}</Tooltip>
                    </li>
                  ))}
                </ul>
                <p className="ip-body" style={{ fontSize: '12.5px', marginTop: '0.85rem' }}>
                  Projects are billed in milestones tied to project phases - never 100% upfront.
                </p>
              </div>
              <div className="ip-guarantee-card">
                <span className="ip-guarantee-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l7 3.5v6c0 5-3 8.5-7 10.5-4-2-7-5.5-7-10.5v-6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Our guarantee
                </span>
                <h3 className="ip-subheading" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>
                  30 days of free bug fixes after launch
                </h3>
                <p className="ip-body" style={{ fontSize: '13px' }}>
                  If something we built breaks within 30 days of go-live, we fix it at no extra
                  cost. Beyond that window, ongoing support and maintenance plans are available
                  for every project we deliver.
                </p>
              </div>
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
