'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SharedLayout from '@/components/SharedLayout';
import ProjectModal from '@/components/ProjectModal';

const PROJECTS = [
  {
    id: 1,
    title: 'Lavimac Royal Hotel Website',
    category: 'Website',
    description: 'A luxury hotel website with online booking system, room showcasing, and integrated payment processing for an enhanced guest experience.',
    image: '/Lavimac royal hotel website.png',
    features: ['Responsive design for all devices', 'Online booking and reservation system', 'High-resolution room gallery', 'Integrated payment processing', 'Customer reviews and testimonials'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://lavimacroyalhotel.com',
  },
  {
    id: 2,
    title: 'Dynamic Shipping & Logistics',
    category: 'Web Application',
    description: 'A comprehensive logistics management system that handles shipment tracking, inventory management, and delivery optimisation.',
    image: '/Dynamic Shipping and Logistics.png',
    features: ['Real-time shipment tracking', 'Route optimisation algorithms', 'Inventory management', 'Delivery scheduling', 'Customer notification system', 'Analytics and reporting'],
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'Google Maps API', 'Docker'],
    link: 'https://dynamicshippingandlogistics.com',
  },
  {
    id: 3,
    title: 'Obotan Credit Union Banking App',
    category: 'Mobile App',
    description: 'A secure mobile banking application for credit union members to manage accounts, make transactions, and access financial services.',
    image: '/Obotan Coorperative Credit  Union Banking App.jpg',
    features: ['Secure user authentication', 'Account management', 'Fund transfers', 'Bill payments', 'Mobile check deposit', 'Transaction history', 'Financial calculators'],
    technologies: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication', 'Stripe API'],
  },
  {
    id: 4,
    title: 'Building Development Manager',
    category: 'Web Application',
    description: 'A web application for managing construction projects, tracking progress, resource allocation, and stakeholder communication.',
    image: '/Building Development Web App.jpg',
    features: ['Project timeline visualisation', 'Resource management', 'Budget tracking', 'Document management', 'Communication portal', 'Progress reporting', 'Stakeholder access control'],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'Socket.io'],
  },
  {
    id: 5,
    title: 'Pro Realty Properties Web App',
    category: 'Web Application',
    description: 'A real estate platform for property listings, virtual tours, and client management designed for real estate agencies.',
    image: '/Pro Realty Properties Web App.png',
    features: ['Property listing management', 'Advanced search filters', 'Virtual property tours', 'Appointment scheduling', 'Client management system', 'Analytics dashboard', 'Email notifications'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Twilio API'],
    link: 'https://prorealtyconsult.com',
  },
  {
    id: 6,
    title: 'Emson Hotel Website',
    category: 'Website',
    description: 'An elegant website for a boutique hotel, featuring room bookings, amenities showcase, and event planning services.',
    image: '/Emson hotel website.png',
    features: ['Mobile-first responsive design', 'Room availability checker', 'Online booking system', 'Event planning services', 'Photo gallery', 'Local attractions guide', 'Customer feedback system'],
    technologies: ['React', 'Gatsby', 'Styled Components', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    link: 'https://emsonhotel.com',
  },
  {
    id: 7,
    title: 'Dominic Kudom Portfolio',
    category: 'Website',
    description: 'A professional portfolio website showcasing skills, projects, and services with a modern and interactive design.',
    image: '/Dominic Kudom Portfolio.png',
    features: ['Interactive UI elements', 'Project showcase', 'Skill visualisation', 'Contact form', 'Performance optimisation', 'SEO best practices', 'Dark/Light mode'],
    technologies: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Next.js', 'Vercel'],
    link: 'https://plndominic.github.io/dominickudom/',
  },
  {
    id: 8,
    title: 'Hotel Management System',
    category: 'Web Application',
    description: 'A comprehensive hotel management software solution that streamlines reservations, housekeeping, and financial management.',
    image: '/Hotel Management System Software Web App.png',
    features: ['Reservation and booking management', 'Room allocation and availability tracking', 'Guest check-in/check-out automation', 'Housekeeping management', 'Billing and invoicing', 'Reporting and analytics', 'Staff management'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    link: 'https://mikjane-hotel-system-management-software.vercel.app/landing',
  },
];

const FILTERS = ['All', 'Website', 'Web Application', 'Mobile App', 'Business Software'];

// Case studies for the Impact Showcase — built from the same real project
// data above (features, links) framed as problem → build → result, rather
// than fabricated "before" screenshots we don't have.
const CASE_STUDIES = [
  {
    title: 'Lavimac Royal Hotel',
    image: '/Lavimac royal hotel website.png',
    link: 'https://lavimacroyalhotel.com',
    problem: 'Boutique hotels lose bookings whenever guests can\'t check room availability and reserve directly online, and instead have to call and wait for a reply.',
    build: 'A luxury hotel website with a live room showcase, an online booking and reservation system, and integrated payment processing — built with React, Next.js, and Node.js.',
    result: 'Live in production today, handling guest bookings directly through lavimacroyalhotel.com.',
  },
  {
    title: 'Dynamic Shipping & Logistics',
    image: '/Dynamic Shipping and Logistics.png',
    link: 'https://dynamicshippingandlogistics.com',
    problem: 'Logistics operators lose time and money when shipment tracking, inventory, and delivery scheduling live in disconnected spreadsheets instead of one system.',
    build: 'A logistics management platform with real-time shipment tracking, route optimisation, inventory management, and delivery scheduling — built with React, Node.js, and Google Maps API.',
    result: 'Live in production today, running shipment tracking and delivery operations at dynamicshippingandlogistics.com.',
  },
  {
    title: 'Pro Realty Properties',
    image: '/Pro Realty Properties Web App.png',
    link: 'https://prorealtyconsult.com',
    problem: 'Real estate agencies struggle to convert browsers into leads when property listings, tours, and enquiries are scattered across PDFs, WhatsApp, and phone calls.',
    build: 'A real estate platform with property listing management, virtual tours, appointment scheduling, and a client management system — built with React, Next.js, and PostgreSQL.',
    result: 'Live in production today, powering property listings and enquiries at prorealtyconsult.com.',
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <SharedLayout>
      <main className="relative z-10">
        <div className="ip-wrap">

          {/* ── Page header ── */}
          <div className="ip-page-head">
            <div style={{ marginBottom: '1rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">SELECTED WORK</span>
            </div>
            <h1 className="ip-heading">
              OUR<br />
              <span style={{ color: 'var(--accent)' }}>PROJECTS.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              A focused selection of our work — websites, applications, and enterprise systems built for clients across Africa.
            </p>
          </div>

          {/* ── Filters ── */}
          <div className="ip-filters">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`btn-press ip-filter-btn${activeFilter === filter ? ' active' : ''}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* ── Project grid ── */}
          <div className="ip-proj-grid" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="ip-proj-card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="ip-proj-img-wrap">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover ip-proj-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
                <div className="ip-proj-info">
                  <span className="ip-cat-badge">{project.category}</span>
                  <h3 className="ip-proj-name">{project.title}</h3>
                  <p className="ip-proj-desc">{project.description}</p>
                </div>
                <div className="ip-proj-foot">
                  <button className="btn-press ip-proj-details-btn">
                    View Details →
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ip-proj-visit"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Impact Showcase ── */}
          <div className="ip-section">
            <div style={{ marginBottom: '0.5rem' }}>
              <hr className="es-rule" />
              <span className="es-section-label">IMPACT SHOWCASE</span>
            </div>
            <p className="ip-body" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              A closer look at the problem, what we built, and the result — for three projects
              still live in production today.
            </p>
            <div className="ip-case-list">
              {CASE_STUDIES.map(cs => (
                <article key={cs.title} className="ip-case">
                  <div className="ip-case-img-wrap">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 760px) 100vw, 45vw"
                    />
                  </div>
                  <div>
                    <h3 className="ip-subheading" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '1rem' }}>
                      {cs.title}
                    </h3>
                    <div className="ip-case-steps">
                      <div className="ip-case-step ip-case-step-problem">
                        <span className="ip-case-step-label">The Problem</span>
                        <p className="ip-case-step-body">{cs.problem}</p>
                      </div>
                      <div className="ip-case-step ip-case-step-build">
                        <span className="ip-case-step-label">What We Built</span>
                        <p className="ip-case-step-body">{cs.build}</p>
                      </div>
                      <div className="ip-case-step ip-case-step-result">
                        <span className="ip-case-step-label">The Result</span>
                        <p className="ip-case-step-body">
                          {cs.result}{' '}
                          <a
                            href={cs.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent)' }}
                          >
                            Visit site ↗
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head">
              START YOUR<br />
              <span className="ip-cta-accent">PROJECT.</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Let's turn your vision into reality. Our team is ready to build your next digital product.
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

      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </SharedLayout>
  );
}
