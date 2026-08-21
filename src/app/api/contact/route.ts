import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Contact form → email, via nodemailer ──
// Wires the "Send Message" form on /contact to a real SMTP send. Reads
// credentials from environment variables (see .env.example) so no secrets
// live in source. Server-side validation is duplicated here on purpose —
// never trust the client-side checks alone.

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  campaign?: Record<string, string> | null;
  /** Honeypot — real visitors never see or fill this field. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_LABELS: Record<string, string> = {
  'web-design': 'Web Design & Development',
  'web-app': 'Web Applications',
  mobile: 'Mobile Apps',
  'business-software': 'Business Software',
  uiux: 'UI/UX Design',
  other: 'Other',
};

function validate(payload: ContactPayload): string | null {
  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (name.length < 2) return 'Please provide your name.';
  if (!EMAIL_RE.test(email)) return 'Please provide a valid email address.';
  if (message.length < 10) return 'Please provide a message with at least 10 characters.';
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTransporter() {
  // Trim every value — env vars pasted from a dashboard UI or password
  // manager frequently carry a stray leading/trailing space or newline,
  // which silently breaks DNS lookup (host) or SMTP auth (user/pass)
  // without any obviously-wrong error message.
  const SMTP_HOST = process.env.SMTP_HOST?.trim();
  const SMTP_PORT = process.env.SMTP_PORT?.trim();
  const SMTP_USER = process.env.SMTP_USER?.trim();
  const SMTP_PASS = process.env.SMTP_PASS?.trim();
  const SMTP_SECURE = process.env.SMTP_SECURE?.trim();

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.'
    );
  }
  const port = Number(SMTP_PORT);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Fail fast rather than hanging the request until the platform's own
    // timeout if the SMTP host is slow or unreachable.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  // Bots tend to fill every field, including ones hidden from real visitors.
  // Pretend success so they don't learn to skip it.
  if (payload.website) {
    return NextResponse.json({ success: true });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ success: false, message: validationError }, { status: 400 });
  }

  const name = payload.name!.trim();
  const email = payload.email!.trim();
  const company = payload.company?.trim() || null;
  const serviceLabel = payload.service ? SERVICE_LABELS[payload.service] ?? payload.service : null;
  const message = payload.message!.trim();
  const campaign =
    payload.campaign && Object.keys(payload.campaign).length > 0 ? payload.campaign : null;

  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'support@ecstasytechnologies.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || process.env.SMTP_USER?.trim();

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company ?? '—'}`,
    `Service: ${serviceLabel ?? '—'}`,
    '',
    'Message:',
    message,
  ];
  if (campaign) {
    textLines.push('', 'Campaign:', JSON.stringify(campaign, null, 2));
  }

  const htmlRows = [
    ['Name', name],
    ['Email', email],
    ['Company', company ?? '—'],
    ['Service', serviceLabel ?? '—'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;">${label}</td><td style="padding:4px 0;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <h2 style="margin:0 0 16px;">New project enquiry</h2>
      <table cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:16px;">${htmlRows}</table>
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#999;margin:0 0 4px;">Message</p>
      <p style="font-size:14px;white-space:pre-wrap;margin:0 0 16px;">${escapeHtml(message)}</p>
      ${
        campaign
          ? `<p style="font-size:12px;color:#999;margin:0;">Campaign: ${escapeHtml(
              JSON.stringify(campaign)
            )}</p>`
          : ''
      }
    </div>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Ecstasy Technologies Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `New project enquiry from ${name}`,
      text: textLines.join('\n'),
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'We could not send your message right now. Please email us directly.',
      },
      { status: 502 }
    );
  }
}
