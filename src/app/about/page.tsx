import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SharedLayout from '@/components/SharedLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ecstasy Technologies - Software Company in Ghana',
  description: 'Learn about Ecstasy Technologies, Ghana\'s leading software development studio. Meet our team and discover our mission to deliver innovative digital solutions.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Ecstasy Technologies',
    description: 'Meet the team behind Ghana\'s leading software studio.',
    url: '/about',
    images: ['/logo.png'],
  },
};

const LEADERSHIP = [
  {
    name: 'Dominic Kudom',
    role: 'CEO & Founder',
    src: '/Dominic Kudom.jpeg',
    bio: 'Dominic drives technical vision and client strategy, bringing 3+ years of software engineering and product leadership to every project.',
  },
  {
    name: 'Parvathi Mackay',
    role: 'UI/UX Designer',
    src: '/Parvathi.jpeg',
    bio: 'Parvathi specialises in interface design and user experience, crafting intuitive digital experiences that balance beauty with function.',
  },
  {
    name: 'Design Director',
    role: 'Coming Soon',
    src: null,
    bio: "We're expanding our leadership team to bring deep creative direction to every client engagement.",
  },
  {
    name: 'Operations Director',
    role: 'Coming Soon',
    src: null,
    bio: "We're growing our operations leadership to support flawless project delivery at scale.",
  },
];

const SALES = [
  {
    name: 'Aishetu Ahmed',
    role: 'Sales Representative',
    src: '/aisha.PNG',
    bio: 'Aishetu works closely with clients to understand their needs and connect them with the right software solutions.',
  },
  {
    name: 'John Opare',
    role: 'Sales Representative',
    src: '/opare.JPG',
    bio: 'John helps businesses discover how our software can transform their operations and achieve their strategic goals.',
  },
  {
    name: 'Welbeck Kwasi Morgah',
    role: 'Sales Representative',
    src: '/welbeck.jpg',
    bio: 'Welbeck builds lasting client relationships and delivers tailored solutions for each business context.',
  },
];

const WHY_US = [
  { num: '01', title: 'Technical Depth', body: 'Our engineers bring serious expertise across modern web, mobile, and cloud technologies — not generalists, specialists.' },
  { num: '02', title: 'Client-First', body: 'We prioritise understanding your business before writing a line of code. Solutions that create real value, not impressive demos.' },
  { num: '03', title: 'Agile Process', body: 'Iterative delivery with transparency. You see progress every sprint and can shape the product throughout the build.' },
  { num: '04', title: 'End-to-End', body: 'From concept through deployment and ongoing support — one team, full accountability.' },
  { num: '05', title: 'Quality Assurance', body: 'Rigorous testing and code review at every stage. We ship software we\'re proud to put our name on.' },
  { num: '06', title: 'Long-Term Support', body: 'Dedicated support and maintenance. We don\'t disappear at launch — we stay to ensure your software thrives.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Ecstasy Technologies offer in Ghana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ecstasy Technologies offers web design & development, web applications, mobile apps, business software, GIS solutions, and UI/UX design for organisations across Ghana and Africa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Ecstasy Technologies located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are based in Bibiani, Ghana, and serve clients throughout Ghana including Accra, Kumasi, and other major cities, as well as international clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to develop software with Ecstasy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary based on project complexity and scope. Contact us for a free consultation and custom quote.',
      },
    },
  ],
};

export default function About() {
  return (
    <SharedLayout currentPath="/about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="relative z-10">
        <div className="ip-wrap">

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">THE STUDIO</span>
            </div>
            <h1 className="ip-heading">
              WHO WE<br />
              <span style={{ color: 'var(--accent)' }}>ARE.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              A software studio founded in Bibiani, Ghana in 2018. We build digital products that work —
              for hotels, logistics companies, schools, banks, and anyone who takes their software seriously.
            </p>
          </div>

          {/* ── Story + Vision/Mission ── */}
          <div
            className="ip-section"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
            }}
          >
            {/* Story */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <hr className="es-rule" />
                <span className="es-section-label">OUR STORY</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="ip-body">
                  Founded in 2018, Ecstasy Technologies began with a simple mission: create software that genuinely moves
                  the needle for African businesses.
                </p>
                <p className="ip-body">
                  What started as a small team of passionate developers has grown into a full-service software studio
                  with expertise across web, mobile, and enterprise systems.
                </p>
                <p className="ip-body">
                  Today we have helped over 32 clients transform their operations — from boutique hotels in Bibiani
                  to logistics companies operating nationally.
                </p>
              </div>
            </div>

            {/* Vision + Mission stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <hr className="es-rule" />
                  <span className="es-section-label">VISION</span>
                </div>
                <p className="ip-body">
                  To be the leading provider of transformative software that enables African businesses
                  to compete, grow, and lead in an increasingly digital world.
                </p>
              </div>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <hr className="es-rule" />
                  <span className="es-section-label">MISSION</span>
                </div>
                <p className="ip-body">
                  Deliver high-quality, purpose-built software solutions — tailored to each client's unique context —
                  that create measurable value and long-term competitive advantage.
                </p>
              </div>
            </div>
          </div>

          {/* ── Leadership team ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '2rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">LEADERSHIP</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              {LEADERSHIP.map(({ name, role, src, bio }) => (
                <div key={name} className="ip-team-card">
                  <div className="ip-photo">
                    {src ? (
                      <Image
                        src={src}
                        alt={name}
                        fill
                        className="object-cover object-top"
                        sizes="240px"
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="1" style={{ color: 'var(--border-strong)', opacity: 0.5 }}>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="ip-subheading" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>{name}</p>
                    <p style={{ margin: '0.25rem 0 0.5rem', fontSize: '11px', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                      {role}
                    </p>
                    <p className="ip-body" style={{ fontSize: '13px' }}>{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sales team ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '2rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">SALES TEAM</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              {SALES.map(({ name, role, src, bio }) => (
                <div key={name} className="ip-team-card">
                  <div className="ip-photo">
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className="object-cover object-top"
                      sizes="240px"
                    />
                  </div>
                  <div>
                    <p className="ip-subheading" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>{name}</p>
                    <p style={{ margin: '0.25rem 0 0.5rem', fontSize: '11px', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                      {role}
                    </p>
                    <p className="ip-body" style={{ fontSize: '13px' }}>{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Why choose us ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '1.5rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">WHY ECSTASY</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '0',
                borderTop: '1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              {WHY_US.map(({ num, title, body }) => (
                <div
                  key={num}
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                    borderRight: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span className="es-svc-num" style={{ display: 'block', marginBottom: '0.75rem' }}>{num}</span>
                  <h3 className="ip-subheading" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', marginBottom: '0.5rem' }}>
                    {title}
                  </h3>
                  <p className="ip-body" style={{ fontSize: '13px' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head">
              LET'S BUILD<br />
              <span className="ip-cta-accent">TOGETHER.</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Partner with us to develop software that drives real growth for your organisation.
              </p>
              <Link href="/contact" className="btn-press ip-cta-btn">
                Get in Touch
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
