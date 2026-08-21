'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashCursor from '@/components/SplashCursor';

const SERVICES = [
  { num: '01', name: 'Web Design & Development', slug: 'web-design-development' },
  { num: '02', name: 'Web Applications', slug: 'web-applications' },
  { num: '03', name: 'Mobile Apps', slug: 'mobile-apps' },
  { num: '04', name: 'Business Software', slug: 'business-software' },
  { num: '05', name: 'GIS Solutions', slug: 'gis-solutions' },
];

const TRUST_AVATARS = [
  { src: '/Dominic Kudom.jpeg', alt: 'Dominic Kudom', position: 'center 20%' },
  { src: '/opare.JPG', alt: 'John Opare', position: 'center top' },
  { src: '/Parvathi.jpeg', alt: 'Parvathi Mackay', position: 'center 38%' },
  { src: '/welbeck.jpg', alt: 'Welbeck Kwasi Morgah', position: 'center 15%' },
];

const FRONTIER_TAGS = ['Web', 'Mobile', 'Enterprise'];

const FEATURED_POST = {
  href: '/blog/web-vs-mobile-app-which-does-your-business-need',
  image: '/Pro Realty Properties Web App.png',
  title: 'Website, Web App, or Mobile App? How to Choose',
  excerpt:
    'Not every business idea needs a mobile app, and not every mobile app idea should skip the website. Here’s a practical way to decide.',
};

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

      <Navbar transparent />

      <main>

        {/* ── HERO (full-bleed video, text overlaid) ──
            Negative top margin pulls the video up behind the transparent
            navbar (56px, matching .es-nav-inner's height), so the nav merges
            with the hero instead of revealing the page's own (dark-themed)
            backdrop through it. pt-14 on the content keeps it clear of the
            nav. */}
        <section className="relative overflow-hidden -mt-14" style={{ fontFamily: "'Figtree', system-ui, sans-serif" }}>

          {/* Background video — fills the entire hero */}
          <div className="absolute inset-0 w-full h-full" aria-hidden="true">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Scrim — keeps the overlaid copy legible against the light footage */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </div>

          {/* Copy — overlaid directly on the video */}
          <div className="relative z-10 flex items-center min-h-[92vh] pt-14 px-6 sm:px-12 lg:px-16">
            <div className="max-w-md">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50">
                  Ecstasy Technologies
                </span>
              </div>

              <h1
                className="text-[2.6rem] sm:text-[3.4rem] lg:text-[3.8rem] leading-[0.98] font-extrabold tracking-tight text-white mb-6"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                SOFTWARE<br />AFRICA<br />TRUSTS.
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-10">
                <Link
                  href="/contact"
                  className="btn-press inline-flex items-center justify-center rounded-md bg-white text-neutral-900 text-[13px] font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors"
                >
                  Start a Project
                </Link>
                <Link
                  href="/portfolio"
                  className="text-[13px] font-semibold text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
                >
                  View Our Work
                </Link>
              </div>

              <div className="flex items-start gap-4 pt-8 border-t border-white/20">
                <div className="flex items-center shrink-0">
                  <div className="flex -space-x-2.5">
                    {TRUST_AVATARS.map((a) => (
                      <div key={a.src} className="relative w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-neutral-200">
                        <Image src={a.src} alt={a.alt} fill className="object-cover" style={{ objectPosition: a.position }} sizes="32px" />
                      </div>
                    ))}
                  </div>
                  <span
                    className="ml-2 text-[13px] font-bold text-white"
                    style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
                  >
                    32+
                  </span>
                </div>
                <p className="text-[12.5px] leading-relaxed text-white/70">
                  <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">
                    Trusted by Clients
                  </span>
                  We&apos;ve helped 32+ businesses across Ghana build websites, apps, and
                  systems that work as hard as they do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT / FRONTIER (dark, diagonal cut into the hero) ── */}
        <section className="relative bg-neutral-950 lg:-mt-[6vw] lg:[clip-path:polygon(0_6vw,100%_0,100%_100%,0_100%)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 pt-[10vw] lg:pt-32 pb-20">

            <div className="relative min-h-[380px] lg:min-h-[520px] mx-6 sm:mx-12 lg:mx-0 lg:ml-16 lg:mr-8 overflow-hidden rounded-sm">
              <Image
                src="/dominic-about.jpg"
                alt="Dominic Kudom, CEO & Founder of Ecstasy Technologies"
                fill
                className="object-cover grayscale contrast-125"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
            </div>

            <div className="px-6 sm:px-12 lg:px-16 pt-12 lg:pt-0 flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">
                About Us
              </span>
              <h2
                className="text-[2.2rem] sm:text-[2.75rem] leading-[0.98] font-extrabold tracking-tight text-white mb-6"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                OUR APPROACH<br />TO SOFTWARE.
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {FRONTIER_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-neutral-300 border border-neutral-700 rounded-full px-3.5 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[14px] leading-relaxed text-neutral-400 max-w-md mb-8">
                We partner with hotels, logistics companies, schools, and banks to build
                software that solves real problems, not just software that looks good in a
                pitch deck.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="btn-press inline-flex items-center justify-center rounded-md bg-white text-neutral-900 text-[13px] font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-600 group-hover:border-white transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                    </svg>
                  </span>
                  View Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* ── POSSIBILITIES + featured article ── */}
          <div className="px-6 sm:px-12 lg:px-16 pb-24 lg:pb-32">
            <h2
              className="italic text-[2.1rem] sm:text-[2.9rem] leading-[1.05] font-bold text-white mb-14 lg:mb-20 max-w-2xl"
              style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
            >
              ENDLESS POSSIBILITIES<br />WITH ECSTASY.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

              {/* Capabilities */}
              <div>
                <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">
                  Capabilities
                </span>
                <ol aria-label="Our capabilities">
                  {SERVICES.map(({ num, name, slug }) => (
                    <li key={num} className="border-b border-neutral-800 first:border-t">
                      <Link
                        href={`/services/${slug}`}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-[11px] font-semibold text-neutral-500">{num}</span>
                          <span className="text-[15px] font-semibold text-white group-hover:text-neutral-300 transition-colors">
                            {name}
                          </span>
                        </span>
                        <span className="text-[13px] text-neutral-600 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Featured article */}
              <Link href={FEATURED_POST.href} className="group grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 items-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden rounded-sm bg-neutral-900">
                  <Image
                    src={FEATURED_POST.image}
                    alt={FEATURED_POST.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="220px"
                  />
                </div>
                <div>
                  <h3 className="text-[1.25rem] sm:text-[1.4rem] leading-tight font-bold text-white mb-3">
                    {FEATURED_POST.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-neutral-400 max-w-md mb-4">
                    {FEATURED_POST.excerpt}
                  </p>
                  <span className="text-[12.5px] font-semibold text-white border-b border-neutral-500 pb-0.5 group-hover:border-white transition-colors">
                    Learn More
                  </span>
                </div>
              </Link>
            </div>
          </div>
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
                  <span className="es-proj-num" aria-hidden="true" style={{ color: 'var(--foreground)' }}>{num}</span>
                  <h3 className="es-proj-title">{title.toUpperCase()}</h3>
                  <span className="es-proj-fill" aria-hidden="true" />
                  <span className="es-proj-cat" style={{ color: 'var(--foreground)' }}>{category}</span>
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
              <span className="block es-cta-accent es-reveal" style={{ '--d': '70ms', color: 'var(--foreground)' } as React.CSSProperties}>BUILD</span>
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
