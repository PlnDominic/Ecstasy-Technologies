import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import { BLOG_POSTS } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Blog | Software Development Insights | Ecstasy Technologies',
  description: 'Practical articles on custom software, hotel management systems, web vs mobile apps, and running software projects in Ghana, from the Ecstasy Technologies team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Ecstasy Technologies Blog',
    description: 'Practical articles on custom software and running software projects in Ghana.',
    url: '/blog',
    images: ['/logo.png'],
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Blog() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <SharedLayout currentPath="/blog">
      <main className="relative z-10">
        <div className="ip-wrap">

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">INSIGHTS</span>
            </div>
            <h1 className="ip-heading">
              FROM THE<br />
              <span style={{ color: 'var(--accent)' }}>STUDIO.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              Practical notes on custom software, hospitality systems, and running projects,
              written from what we've learned building for clients across Ghana.
            </p>
          </div>

          {/* ── Post grid ── */}
          <div className="ip-blog-grid" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="ip-blog-card">
                <div className="ip-blog-meta">
                  <span className="ip-blog-cat">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="ip-blog-title">{post.title}</h2>
                <p className="ip-blog-excerpt">{post.excerpt}</p>
                <span className="ip-blog-readmore">Read article →</span>
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head">
              HAVE A<br />
              <span className="ip-cta-accent">PROJECT?</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Tell us about it. We respond within 24 hours with an honest assessment.
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
