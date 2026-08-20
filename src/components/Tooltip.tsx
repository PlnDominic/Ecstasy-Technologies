'use client';

import React, { useId, useState } from 'react';

interface TooltipProps {
  /** The short label/trigger content the tooltip is attached to. */
  children: React.ReactNode;
  /** The richer explanatory text shown on hover/focus. */
  content: string;
  /** Optional short title shown bold above the content line. */
  label?: string;
}

/**
 * Lightweight, accessible tooltip. Shows on hover (pointer) and on
 * keyboard focus, dismisses on blur/mouse-leave and Escape. Uses
 * aria-describedby so screen readers announce the extra content.
 */
export default function Tooltip({ children, content, label }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      className="es-tooltip-wrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={e => { if (e.key === 'Escape') setVisible(false); }}
    >
      <span
        tabIndex={0}
        aria-describedby={id}
        className="es-tooltip-trigger"
      >
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className={`es-tooltip-bubble${visible ? ' es-tooltip-visible' : ''}`}
      >
        {label && <strong className="es-tooltip-label">{label}</strong>}
        {content}
      </span>
    </span>
  );
}
