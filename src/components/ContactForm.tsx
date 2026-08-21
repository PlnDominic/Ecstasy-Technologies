'use client';

import React, { useState, useEffect } from 'react';
import { initUtmTracking, useUtm, withUtm } from '@/utils/utm';

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  /** Honeypot — left blank by real visitors, invisible to them. */
  website: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  website: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address doesn\'t look valid.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please add a short message so we know how to help.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please give us a bit more detail (at least 10 characters).';
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  // Capture UTM campaign params from the URL on first mount so the
  // submission can be attributed to the marketing channel that brought
  // the visitor here.
  useEffect(() => {
    initUtmTracking();
  }, []);

  const handleChange = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setValues(v => ({ ...v, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }));
    }
  };

  const handleBlur = (field: keyof FormValues) => () => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, service: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      // UTM campaign params (utm_source, utm_medium, utm_campaign, …) are
      // captured on mount via initUtmTracking() and persisted to localStorage.
      // Forward them so the email lands with attribution attached.
      const campaign = useUtm();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          campaign: Object.keys(campaign).length ? campaign : null,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setServerError(data?.message || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setValues(INITIAL_VALUES);
      setTouched({});
    } catch {
      setServerError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const errorId = (field: keyof FormValues) => `${field}-error`;

  const fieldError = (field: keyof FormValues) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Honeypot — hidden from real visitors via CSS, not just `display: none`,
          since some spam bots skip fields that are display:none. Real users
          never focus or fill it; bots that autofill every field do. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange('website')}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label htmlFor="name" className="ip-label">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="ip-input"
            placeholder="Dominic Kudom"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            aria-invalid={!!fieldError('name')}
            aria-describedby={fieldError('name') ? errorId('name') : undefined}
            style={fieldError('name') ? { borderColor: 'var(--accent)' } : undefined}
          />
          {fieldError('name') && (
            <p id={errorId('name')} className="ip-field-error" role="alert">{fieldError('name')}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="ip-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="ip-input"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            aria-invalid={!!fieldError('email')}
            aria-describedby={fieldError('email') ? errorId('email') : undefined}
            style={fieldError('email') ? { borderColor: 'var(--accent)' } : undefined}
          />
          {fieldError('email') && (
            <p id={errorId('email')} className="ip-field-error" role="alert">{fieldError('email')}</p>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label htmlFor="company" className="ip-label">Company (Optional)</label>
          <input
            type="text"
            id="company"
            name="company"
            className="ip-input"
            placeholder="Your Company"
            value={values.company}
            onChange={handleChange('company')}
          />
        </div>
        <div>
          <label htmlFor="service" className="ip-label">Service Interested In</label>
          <select
            id="service"
            name="service"
            className="ip-input"
            style={{ cursor: 'pointer' }}
            value={values.service}
            onChange={handleChange('service')}
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design & Development</option>
            <option value="web-app">Web Applications</option>
            <option value="mobile">Mobile Apps</option>
            <option value="business-software">Business Software</option>
            <option value="uiux">UI/UX Design</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="ip-label">Your Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="ip-input"
          placeholder="Tell us about your project — the more context, the better our response."
          style={{ resize: 'vertical', ...(fieldError('message') ? { borderColor: 'var(--accent)' } : {}) }}
          value={values.message}
          onChange={handleChange('message')}
          onBlur={handleBlur('message')}
          aria-invalid={!!fieldError('message')}
          aria-describedby={fieldError('message') ? errorId('message') : undefined}
        />
        {fieldError('message') && (
          <p id={errorId('message')} className="ip-field-error" role="alert">{fieldError('message')}</p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="submit"
          className="btn-press es-btn-primary"
          style={{ cursor: 'pointer' }}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </button>

        {status === 'success' && (
          <p role="status" style={{ margin: 0, fontSize: '13px', color: 'var(--accent)' }}>
            Message sent — we'll reply within 24 hours.
          </p>
        )}
        {status === 'error' && Object.keys(errors).length > 0 && (
          <p role="alert" style={{ margin: 0, fontSize: '13px', color: 'var(--accent)' }}>
            Please fix the highlighted field{Object.keys(errors).length > 1 ? 's' : ''} above.
          </p>
        )}
        {status === 'error' && Object.keys(errors).length === 0 && serverError && (
          <p role="alert" style={{ margin: 0, fontSize: '13px', color: 'var(--accent)' }}>
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
