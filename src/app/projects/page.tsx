'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SharedLayout from '@/components/SharedLayout';
import ProjectModal from '@/components/ProjectModal';
import projectsData from '../../../data/projects.json';

// Note: Metadata export not supported in client components

const PROJECTS = projectsData as Array<{
  id: number; title: string; category: string; description: string;
  image: string; features: string[]; technologies: string[]; link?: string;
}>;

const FILTERS = ['All', 'Website', 'Web Application', 'Mobile App', 'Business Software'];

export default function Projects() {
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
              <span className="es-section-label">ALL WORK</span>
            </div>
            <h1 className="ip-heading">
              32+<br />
              <span style={{ color: 'var(--accent)' }}>PROJECTS.</span>
            </h1>
            <p className="ip-body" style={{ marginTop: '1.5rem' }}>
              Every project we've built — websites, applications, and enterprise systems for clients across Africa and beyond.
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
                    quality={80}
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
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="ip-cta">
            <h2 className="ip-cta-head">
              YOUR PROJECT<br />
              <span className="ip-cta-accent">NEXT.</span>
            </h2>
            <div className="ip-cta-side">
              <p className="ip-cta-sub">
                Join 32+ organisations that trust Ecstasy to build their digital infrastructure.
              </p>
              <Link href="/contact" className="btn-press ip-cta-btn">
                Start a Project
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
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
