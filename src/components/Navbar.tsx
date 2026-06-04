'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── Navigation ── */}
      <header className="es-nav">
        <div className="es-nav-inner">
          <Link href="/" className="es-logo btn-press" aria-label="Ecstasy Technologies home">
            <Image
              src="/logo.png"
              alt="Ecstasy Technologies"
              width={1208}
              height={995}
              priority
              className="es-logo-img"
            />
          </Link>

          <nav className="es-nav-links" aria-label="Primary">
            {NAV_LINKS.map(({ label, href }) => (
              <Link 
                key={label} 
                href={href} 
                className={`es-nav-link nav-link ${pathname === href ? 'es-nav-link-active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="es-nav-right">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="es-burger btn-press"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`es-bl ${mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`es-bl mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`es-bl mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </button>
            <Link href="/contact" className="btn-press es-nav-cta hidden sm:inline-flex items-center gap-1.5">
              Start a Project
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.55)' }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className="es-drawer fixed top-0 right-0 h-full w-4/5 max-w-xs z-[70] md:hidden flex flex-col pt-20 px-8"
        style={{
          transition: `transform ${mobileMenuOpen ? '380ms' : '280ms'} cubic-bezier(0.32, 0.72, 0, 1)`,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <button onClick={() => setMobileMenuOpen(false)} className="btn-press absolute top-6 right-6" aria-label="Close menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        {NAV_LINKS.map(({ label, href }) => (
          <Link 
            key={label} 
            href={href} 
            onClick={() => setMobileMenuOpen(false)} 
            className={`es-drawer-link ${pathname === href ? 'es-drawer-link-active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-press es-drawer-cta mt-8">
          Start a Project →
        </Link>
      </div>
    </>
  );
};

export default Navbar;
