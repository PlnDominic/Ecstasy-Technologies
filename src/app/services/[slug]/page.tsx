import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import { SERVICES, getServiceBySlug } from '@/data/services';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: `${service.name} | Ecstasy Technologies Ghana`,
    description: `${service.tagline} ${service.description}`.slice(0, 155),
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Ecstasy Technologies`,
      description: service.tagline,
      url: `/services/${service.slug}`,
      images: ['/logo.png'],
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const currentIndex = SERVICES.findIndex(s => s.slug === service.slug);
  const next = SERVICES[(currentIndex + 1) % SERVICES.length];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Ecstasy Technologies',
      url: 'https://www.ecstasytechnologies.com',
    },
    areaServed: { '@type': 'Country', name: 'Ghana' },
  };

  const faqSchema = service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <SharedLayout currentPath={`/services/${service.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <main className="relative z-10">
        <div className="ip-wrap" style={{ maxWidth: '880px' }}>

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">SERVICE {service.num}</span>
            </div>
            <h1 className="ip-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}>
              {service.name.toUpperCase()}
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem', maxWidth: '60ch' }}>
              {service.description}
            </p>
          </div>

          {/* ── Features + Use cases ── */}
          <div
            className="ip-section"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(2rem, 4vw, 3rem)' }}
          >
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">WHAT'S INCLUDED</span>
              </div>
              <ul className="ip-service-features" style={{ flexDirection: 'column', gap: '0.6rem' }}>
                {service.features.map(f => (
                  <li key={f} className="ip-service-feature" style={{ fontSize: '13.5px' }}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">TYPICAL USE CASES</span>
              </div>
              <ul className="ip-service-features" style={{ flexDirection: 'column', gap: '0.6rem' }}>
                {service.useCases.map(u => (
                  <li key={u} className="ip-service-feature" style={{ fontSize: '13.5px' }}>{u}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Tech stack ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '1.25rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">TECHNOLOGIES</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {service.technologies.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: '12px', padding: '6px 12px', border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Related work ── */}
          {service.relatedProjects.length > 0 && (
            <div className="ip-section">
              <div style={{ marginBottom: '1.25rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">RELATED WORK</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {service.relatedProjects.map(p => (
                  <Link
                    key={p.title}
                    href="/portfolio"
                    className="btn-press"
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.85rem 0', borderBottom: '1px solid var(--border)',
                      textDecoration: 'none', color: 'var(--foreground)', fontSize: '14px',
                    }}
                  >
                    <span>{p.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{p.category} ↗</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQ ── */}
          {service.faqs.length > 0 && (
            <div className="ip-section">
              <div style={{ marginBottom: '1.5rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">FAQ</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {service.faqs.map(({ q, a }) => (
                  <div key={q} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <h3 className="ip-subheading" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', marginBottom: '0.5rem' }}>
                      {q}
                    </h3>
                    <p className="ip-body" style={{ fontSize: '13px' }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)' }}>
              LET'S BUILD YOUR<br />
              <span className="ip-cta-accent">{service.name.split(' ')[0].toUpperCase()}.</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Tell us about your project. We respond within 24 hours.
              </p>
              <Link href="/contact" className="btn-press ip-cta-btn">
                Start a Project
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Next service ── */}
          <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/services" className="btn-press es-all-link">← All Services</Link>
            <Link href={`/services/${next.slug}`} className="btn-press es-all-link">
              Next: {next.name} ↗
            </Link>
          </div>

        </div>
      </main>
    </SharedLayout>
  );
}
