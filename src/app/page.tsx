'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import SplashCursor from '@/components/SplashCursor';

const REEL_IMAGES = [
  { src: '/Lavimac royal hotel website.png', alt: 'Lavimac Royal Hotel' },
  { src: '/Dynamic Shipping and Logistics.png', alt: 'Dynamic Shipping & Logistics' },
  { src: '/Pro Realty Properties Web App.png', alt: 'Pro Realty Properties' },
  { src: '/Emson hotel website.png', alt: 'Emson Hotel' },
  { src: '/Hotel Management System Software Web App.png', alt: 'Hotel Management System' },
  { src: '/Bubbly kids academy.png', alt: 'Bubbly Kids Academy' },
  { src: '/Nhyiraba Hotel.png', alt: 'Nhyiraba Hotel' },
  { src: '/Solani Construction.png', alt: 'Solani Construction' },
];

const SERVICES = [
  { num: '01', name: 'Web Design & Development' },
  { num: '02', name: 'Web Applications' },
  { num: '03', name: 'Mobile Apps' },
  { num: '04', name: 'Business Software' },
  { num: '05', name: 'GIS Solutions' },
];

const PROJECTS = [
  {
    num: '01',
    src: '/Lavimac royal hotel website.png',
    alt: 'Lavimac Royal Hotel Website',
    title: 'Lavimac Royal Hotel',
    category: 'Website',
    year: '2024',
  },
  {
    num: '02',
    src: '/Dynamic Shipping and Logistics.png',
    alt: 'Dynamic Shipping and Logistics Platform',
    title: 'Dynamic Shipping & Logistics',
    category: 'Web Application',
    year: '2024',
  },
  {
    num: '03',
    src: '/Obotan Coorperative Credit  Union Banking App.jpg',
    alt: 'Obotan Credit Union Banking App',
    title: 'Obotan Credit Union',
    category: 'Mobile App',
    year: '2023',
  },
];

export default function Home() {
  return (
    <div className="es-root with-splash-cursor">
      <SplashCursor />

      <Navbar />

      <main>

        {/* ── HERO ── */}
        <section className="es-hero">
          <div className="es-hero-inner">

            {/* Identity strip */}
            <div className="es-hero-meta">
              <span>Ecstasy</span>
              <span className="es-meta-dot" aria-hidden="true">·</span>
              <span>Software Studio</span>
              <span className="es-meta-dot" aria-hidden="true">·</span>
              <span>Ghana</span>
              <span className="es-meta-dot" aria-hidden="true">·</span>
              <span>Est. 2018</span>
            </div>

            {/* Headline */}
            <h1 className="es-headline">
              <span className="es-hl es-reveal" style={{ '--d': '0ms' } as React.CSSProperties}>BUILDING</span>
              <span className="es-hl es-reveal" style={{ '--d': '70ms' } as React.CSSProperties}>SOFTWARE</span>
              <span className="es-hl es-hl-accent es-reveal" style={{ '--d': '140ms' } as React.CSSProperties}>AFRICA</span>
              <span className="es-hl es-hl-outline es-reveal" style={{ '--d': '210ms' } as React.CSSProperties}>TRUSTS.</span>
            </h1>

            {/* Project reel */}
            <div className="es-hero-reel es-reveal" style={{ '--d': '280ms' } as React.CSSProperties} aria-hidden="true">
              <div className="es-hero-reel-track">
                {[...REEL_IMAGES, ...REEL_IMAGES].map((img, i) => (
                  <div key={i} className="es-reel-item">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-top"
                      sizes="300px"
                      quality={70}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer: description + CTAs | stats */}
            <div className="es-hero-foot es-reveal" style={{ '--d': '350ms' } as React.CSSProperties}>
              <div className="es-hero-copy">
                <p className="es-hero-sub">
                  Websites, apps, and business systems — engineered for ambitious organisations across the continent.
                </p>
                <div className="es-hero-actions">
                  <Link href="/portfolio" className="btn-press es-btn-primary">
                    View Our Work
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </Link>
                  <Link href="/contact" className="btn-press es-btn-ghost">
                    Get in Touch
                  </Link>
                </div>
              </div>

              <div className="es-hero-stats-col" aria-label="Studio highlights">
                {[
                  { num: '32+', label: 'Projects' },
                  { num: '6',   label: 'Years' },
                  { num: '98%', label: 'Satisfied' },
                ].map(({ num, label }) => (
                  <div key={label} className="es-stat">
                    <span className="es-stat-num">{num}</span>
                    <span className="es-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── CAPABILITIES ── */}
        <section className="es-section">
          <div className="es-section-head">
            <hr className="es-rule" />
            <span className="es-section-label">CAPABILITIES</span>
          </div>
          <ol className="es-services" aria-label="Our capabilities">
            {SERVICES.map(({ num, name }, i) => (
              <li key={num} className="es-service es-reveal" style={{ '--d': `${i * 55}ms` } as React.CSSProperties}>
                <span className="es-svc-num" aria-hidden="true">{num}</span>
                <span className="es-svc-name">{name}</span>
                <span className="es-svc-arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── SELECTED WORK ── */}
        <section className="es-section">
          <div className="es-section-head es-section-head-row">
            <div>
              <hr className="es-rule" />
              <span className="es-section-label">SELECTED WORK</span>
            </div>
            <Link href="/portfolio" className="btn-press es-all-link">All Projects ↗</Link>
          </div>

          <div className="es-work-list">
            {PROJECTS.map(({ num, src, alt, title, category, year }) => (
              <article key={num} className="es-project group">
                <div className="es-proj-img-wrap">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-top es-proj-img"
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="es-proj-meta">
                  <span className="es-proj-num" aria-hidden="true">{num}</span>
                  <h3 className="es-proj-title">{title.toUpperCase()}</h3>
                  <span className="es-proj-fill" aria-hidden="true" />
                  <span className="es-proj-cat">{category}</span>
                  <span className="es-proj-sep" aria-hidden="true">·</span>
                  <span className="es-proj-year">{year}</span>
                  <Link href="/portfolio" className="btn-press es-proj-cta" aria-label={`View ${title} case study`}>
                    View →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="es-section es-cta-section">
          <hr className="es-rule" />
          <div className="es-cta-inner">
            <h2 className="es-cta-head">
              <span className="block es-reveal" style={{ '--d': '0ms' } as React.CSSProperties}>LET'S</span>
              <span className="block es-cta-accent es-reveal" style={{ '--d': '70ms' } as React.CSSProperties}>BUILD</span>
              <span className="block es-reveal" style={{ '--d': '140ms' } as React.CSSProperties}>SOMETHING.</span>
            </h2>
            <div className="es-cta-right es-reveal" style={{ '--d': '210ms' } as React.CSSProperties}>
              <Link href="/contact" className="btn-press es-cta-btn">
                Start a Project
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                </svg>
              </Link>
              <p className="es-cta-sub">No commitment required. We reply within 24 hours.</p>
            </div>
          </div>
          <hr className="es-rule" />
        </section>

      </main>
    </div>
  );
}
