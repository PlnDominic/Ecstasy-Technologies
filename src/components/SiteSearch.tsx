'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  type: 'page' | 'service' | 'project' | 'blog';
  title: string;
  description: string;
  href: string;
  category?: string;
}

const SEARCH_INDEX: SearchResult[] = [
  // Pages
  { type: 'page', title: 'Home', description: 'Ecstasy Technologies — software studio in Ghana. Websites, apps, and business systems.', href: '/', category: 'Page' },
  { type: 'page', title: 'Services', description: 'Web design, web apps, mobile apps, business software, GIS, UI/UX design.', href: '/services', category: 'Page' },
  { type: 'page', title: 'Projects / Portfolio', description: 'A focused selection of websites, applications, and enterprise systems.', href: '/portfolio', category: 'Page' },
  { type: 'page', title: 'Blog / Insights', description: 'Practical notes on custom software, hospitality systems, and running projects in Ghana.', href: '/blog', category: 'Page' },
  { type: 'page', title: 'About Us', description: 'Who we are — a software studio founded in Bibiani, Ghana in 2018.', href: '/about', category: 'Page' },
  { type: 'page', title: 'Contact', description: 'Start a project — fill in the form or reach us directly. We reply within 24 hours.', href: '/contact', category: 'Page' },
  // Services
  { type: 'service', title: 'Web Design & Development', description: 'Bespoke websites built for performance, clarity, and conversion — from marketing sites to e-commerce.', href: '/services/web-design-development', category: 'Services' },
  { type: 'service', title: 'Web Applications', description: 'Complex scalable systems — logistics dashboards, booking platforms, SaaS tools.', href: '/services/web-applications', category: 'Services' },
  { type: 'service', title: 'Mobile Apps', description: 'Native and cross-platform mobile apps — iOS & Android, React Native, offline, push notifications.', href: '/services/mobile-apps', category: 'Services' },
  { type: 'service', title: 'Business Software', description: 'Custom management systems, ERPs, and operational tools — hotel, school, inventory, finance.', href: '/services/business-software', category: 'Services' },
  { type: 'service', title: 'GIS Solutions', description: 'Geospatial software — interactive mapping, location-based services, GIS web applications.', href: '/services/gis-solutions', category: 'Services' },
  { type: 'service', title: 'UI/UX Design', description: 'User research, wireframing, and interface design — new products or redesigns of existing systems.', href: '/services/ui-ux-design', category: 'Services' },
  // Projects
  { type: 'project', title: 'Lavimac Royal Hotel', description: 'Luxury hotel website with online booking, room showcase, and integrated payment processing.', href: '/portfolio', category: 'Projects' },
  { type: 'project', title: 'Dynamic Shipping & Logistics', description: 'Logistics management platform with real-time shipment tracking, route optimisation, and inventory.', href: '/portfolio', category: 'Projects' },
  { type: 'project', title: 'Obotan Credit Union', description: 'Secure mobile banking app for credit union members — account management, transfers, bill payments.', href: '/portfolio', category: 'Projects' },
  { type: 'project', title: 'Pro Realty Properties', description: 'Real estate platform with property listings, virtual tours, appointment scheduling, and client management.', href: '/portfolio', category: 'Projects' },
  { type: 'project', title: 'Emson Hotel', description: 'Boutique hotel website with room bookings, amenities showcase, and event planning services.', href: '/portfolio', category: 'Projects' },
  { type: 'project', title: 'Hotel Management System', description: 'Comprehensive hotel management software — reservations, housekeeping, billing, reporting.', href: '/portfolio', category: 'Projects' },
  // Blog posts
  { type: 'blog', title: '7 Signs Your Business Has Outgrown Spreadsheets', description: 'How to tell when it\'s time to move from spreadsheets to purpose-built software.', href: '/blog/signs-your-business-needs-custom-software', category: 'Blog' },
  { type: 'blog', title: 'What Makes a Good Hotel Management System', description: 'Booking engines, housekeeping, billing — what actually matters when choosing or building one.', href: '/blog/what-makes-a-good-hotel-management-system', category: 'Blog' },
  { type: 'blog', title: 'Website, Web App, or Mobile App? How to Choose', description: 'A practical way to decide which direction your next product should take.', href: '/blog/web-vs-mobile-app-which-does-your-business-need', category: 'Blog' },
  { type: 'blog', title: 'The True Cost of Custom Software', description: 'What actually drives cost — and how to budget realistically for a software project in Ghana.', href: '/blog/true-cost-of-custom-software-ghana', category: 'Blog' },
  { type: 'blog', title: 'The Pre-Launch Checklist We Run on Every Website', description: 'The checklist we run through before any site goes live — findable, trustworthy, usable, compliant.', href: '/blog/launching-website-checklist', category: 'Blog' },
];

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'oklch(54% 0.22 26 / 0.25)', color: 'inherit', borderRadius: '2px', padding: '0 1px' }}>
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const search = useCallback((q: string) => {
    setLoading(true);
    // Simulate async so the UI shows "searching" briefly even when instant
    setTimeout(() => {
      if (!q.trim()) { setResults([]); setLoading(false); return; }
      const lower = q.toLowerCase();
      const matched: SearchResult[] = [];
      for (const item of SEARCH_INDEX) {
        if (
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          (item.category && item.category.toLowerCase().includes(lower))
        ) {
          matched.push(item);
        }
        if (matched.length >= 8) break;
      }
      setResults(matched);
      setSelectedIndex(0);
      setLoading(false);
    }, 120);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(v), 150);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard shortcut Ctrl/Cmd + K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) handleResultClick(results[selectedIndex].href);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const typeLabel: Record<string, string> = {
    page: 'Page',
    service: 'Service',
    project: 'Project',
    blog: 'Article',
  };

  return (
    <>
      {/* Search trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open site search"
        aria-expanded={open}
        className="btn-press ss-trigger"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 14px',
          borderRadius: '999px',
          border: '1px solid var(--border-strong)',
          background: 'var(--secondary)',
          color: 'var(--foreground)',
          fontFamily: "'Figtree', system-ui, sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        Search
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--muted-foreground)', background: 'var(--input)', padding: '2px 5px', borderRadius: '4px' }}>
          ⌘K
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="ss-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        role="search"
        aria-label="Site search"
        className="ss-panel"
        style={{
          position: 'fixed',
          top: '130px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 91,
          width: 'min(620px, calc(100vw - 2rem))',
          background: 'var(--background)',
          border: '1px solid var(--border-strong)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px oklch(0% 0 0 / 0.25)',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 200ms var(--ease-out), transform 200ms var(--ease-out)',
          transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
        }}
      >
        {/* Search input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--muted-foreground)' }} aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, services, projects, articles…"
            aria-label="Search query"
            aria-autocomplete="list"
            aria-controls="ss-results"
            aria-activedescendant={results[selectedIndex] ? `ss-result-${selectedIndex}` : undefined}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--foreground)',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: '15px',
              padding: 0,
            }}
          />
          {loading && (
            <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', flexShrink: 0, animation: 'pulseSlow 1.2s infinite' }}>
              searching
            </span>
          )}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close search"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted-foreground)',
              display: 'flex', alignItems: 'center',
              padding: '4px', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul
            id="ss-results"
            ref={listRef}
            style={{ listStyle: 'none', margin: 0, padding: '6px', maxHeight: '380px', overflowY: 'auto' }}
            role="listbox"
          >
            {results.map((item, i) => (
              <li
                key={item.href + item.title}
                id={`ss-result-${i}`}
                role="option"
                aria-selected={i === selectedIndex}
                className={`btn-press ss-result${i === selectedIndex ? ' ss-result-selected' : ''}`}
                onClick={() => handleResultClick(item.href)}
                onMouseEnter={() => setSelectedIndex(i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 120ms ease',
                  border: '1px solid transparent',
                  background: i === selectedIndex ? 'var(--accent-light)' : 'transparent',
                  color: 'var(--foreground)',
                }}
              >
                {/* Type badge */}
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    background: 'var(--accent-light)',
                    padding: '2px 6px',
                    borderRadius: '5px',
                    marginTop: '2px',
                  }}
                >
                  {typeLabel[item.type] ?? item.type}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '14px', fontWeight: 700, lineHeight: 1.35, marginBottom: '2px' }}>
                    {highlightText(item.title, query)}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--muted-foreground)', lineHeight: 1.45, marginBottom: '3px' }}>
                    {highlightText(item.description, query)}
                  </div>
                  {item.href !== '/' && (
                    <Link
                      href={item.href}
                      onClick={() => handleResultClick(item.href)}
                      style={{
                        fontSize: '11.5px',
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--accent)',
                        fontWeight: 500,
                      }}
                    >
                      {item.href}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : query.trim() && !loading ? (
          <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '14px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 0.75rem', display: 'block', color: 'var(--border-strong)' }} aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            No results for <strong>"{query}"</strong>
            <br />
            <span style={{ fontSize: '12.5px' }}>Try a different keyword, or search by service name like &ldquo;hotel&rdquo; or &ldquo;GIS&rdquo;.</span>
          </div>
        ) : (
          <div style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '13px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '6px' }}>Tips</span>
            Type to search across pages, services, projects, and articles.<br />
            Use <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>↑</kbd> <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>↓</kbd> to navigate, <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>↵</kbd> to open, <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>Esc</kbd> to close.
          </div>
        )}

        {/* Footer hint */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px', borderTop: '1px solid var(--border)', background: 'var(--secondary)' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>
            Press <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '0 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>Ctrl K</kbd> or <kbd style={{ background: 'var(--input)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '0 5px', fontSize: '11px', fontFamily: "'Figtree', system-ui, sans-serif" }}>⌘K</kbd> anytime to open search
          </span>
        </div>
      </div>
    </>
  );
}
