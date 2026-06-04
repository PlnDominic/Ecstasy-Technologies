'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    features: string[];
    technologies: string[];
    link?: string;
  };
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              backgroundColor: 'rgba(0,0,0,0.72)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2rem)',
            }}
            onClick={onClose}
          >
            {/* ── Modal panel ── */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } }}
              transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 'min(92vw, 1060px)',
                height: '90vh',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* ── Header bar ── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 1.125rem',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}>
                  {project.category}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px', color: 'var(--muted-foreground)',
                    display: 'flex', alignItems: 'center',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>

              {/* ── Image — takes the lion's share ── */}
              <div style={{
                position: 'relative',
                flex: '1 1 0',
                minHeight: '200px',
                backgroundColor: 'var(--secondary)',
                overflow: 'hidden',
              }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority
                  quality={95}
                  sizes="min(92vw, 1060px)"
                />
              </div>

              {/* ── Info footer ── */}
              <div style={{
                flexShrink: 0,
                borderTop: '1px solid var(--border)',
                padding: '1rem 1.125rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}>
                {/* Title + description */}
                <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h2 style={{
                    fontFamily: "'Syne', system-ui, sans-serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                    fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.1,
                    color: 'var(--foreground)', margin: 0,
                  }}>
                    {project.title.toUpperCase()}
                  </h2>
                  <p style={{
                    fontSize: '12.5px', lineHeight: 1.6,
                    color: 'var(--muted-foreground)', margin: 0,
                    maxWidth: '60ch',
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Features + visit link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
                  <ul style={{
                    listStyle: 'none', margin: 0, padding: 0,
                    display: 'flex', flexDirection: 'column', gap: '0.2rem',
                    alignItems: 'flex-end',
                  }}>
                    {project.features.slice(0, 4).map(f => (
                      <li key={f} style={{
                        fontSize: '11.5px', color: 'var(--muted-foreground)',
                        display: 'flex', alignItems: 'baseline', gap: '0.45rem',
                      }}>
                        {f}
                        <span style={{ color: 'var(--accent)', fontSize: '9px' }}>—</span>
                      </li>
                    ))}
                  </ul>

                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '7px',
                        backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
                        fontFamily: "'Syne', system-ui, sans-serif",
                        fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        textDecoration: 'none', padding: '9px 16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Visit Project
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
