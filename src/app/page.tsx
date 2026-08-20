'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashCursor from '@/components/SplashCursor';

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
        <section className="relative min-h-[88vh] overflow-hidden bg-background">

          {/* Background */}
          <div className="absolute inset-0 w-full h-full" aria-hidden="true">
            <div
              className="absolute inset-0 w-full h-full opacity-[0.04]"
              style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Ik0zMCAwaDMwdjMwSDMweiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2U9IiMwMDAiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2U9IiMwMDAiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iIzAwMCIvPjwvZz48L3N2Zz4=')" }}
            />
            <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-accent rounded-full opacity-[0.08] blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-accent rounded-full opacity-[0.06] blur-3xl" />
          </div>

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col min-h-[88vh]">
            <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
              <div className="max-w-xs">

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group"
                >
                  Trusted by 32+ businesses across Ghana
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>

                <h1 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-foreground tracking-tight mb-3">
                  Simple, smart software built for businesses who keep growing.
                </h1>

                <p className="text-[13px] text-muted-foreground font-normal mb-3">
                  Let&apos;s build what&apos;s next.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
                >
                  Start a Project
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>

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

      <Footer />
    </div>
  );
}
