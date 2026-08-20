import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import { BLOG_POSTS, getPostBySlug } from '@/data/blog-posts';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Ecstasy Technologies Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: ['/logo.png'],
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const currentIndex = BLOG_POSTS.findIndex(p => p.slug === post.slug);
  const next = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Ecstasy Technologies', logo: { '@type': 'ImageObject', url: 'https://www.ecstasytechnologies.com/logo.png' } },
    mainEntityOfPage: `https://www.ecstasytechnologies.com/blog/${post.slug}`,
  };

  return (
    <SharedLayout currentPath={`/blog/${post.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="relative z-10">
        <div className="ip-wrap" style={{ maxWidth: '800px' }}>

          {/* ── Post header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">{post.category}</span>
            </div>
            <h1 className="ip-heading" style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.25rem)' }}>
              {post.title}
            </h1>
            <p style={{ marginTop: '1.25rem', fontSize: '13px', color: 'var(--muted-foreground)' }}>
              {formatDate(post.date)} · {post.readTime} · {post.author}
            </p>
          </div>

          {/* ── Post body ── */}
          <div className="ip-post-body" style={{ marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            {post.body.map((block, i) => (
              <div key={i} className="ip-post-block">
                {block.heading && <h2>{block.heading}</h2>}
                {block.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)' }}>
              LET'S TALK<br />
              <span className="ip-cta-accent">ABOUT YOURS.</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                We respond within 24 hours with an honest assessment.
              </p>
              <Link href="/contact" className="btn-press ip-cta-btn">
                Start a Project
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Next post ── */}
          <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link href="/blog" className="btn-press es-all-link">← All Articles</Link>
            <Link href={`/blog/${next.slug}`} className="btn-press es-all-link">
              Next: {next.title} ↗
            </Link>
          </div>

        </div>
      </main>
    </SharedLayout>
  );
}
