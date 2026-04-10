import { Resend } from 'resend';

const CONTACT_NOTIFY_TO = 'cr@sinetcomm.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildContactEmailHtml({
  firstName,
  lastName,
  email,
  company,
  country,
  contactNumber,
  message,
}) {
  const rows = [
    ['Name', `${firstName} ${lastName}`.trim()],
    ['Email', email],
    ['Company', company || '—'],
    ['Country', country || '—'],
    ['Contact number', contactNumber || '—'],
    ['Message', message],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;font-size:15px;color:#111;">
<p>New message from the Sinetcom website contact form.</p>
<table style="border-collapse:collapse;max-width:640px;">${body}</table>
</body></html>`;
}

/**
 * Sends a notification email after a contact form submission is stored.
 * Set RESEND_API_KEY. Use RESEND_FROM_EMAIL for production (your verified domain);
 * otherwise Resend test address onboarding@resend.dev is used (limited recipients).
 * Notifications are always sent to cr@sinetcomm.com.
 */
export async function sendContactFormEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'Email service is not configured.' };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || 'Sinetcom Contact <onboarding@resend.dev>';

  const to = CONTACT_NOTIFY_TO;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Contact form: ${payload.firstName} ${payload.lastName}`,
    html: buildContactEmailHtml(payload),
    replyTo: payload.email,
  });

  if (error) {
    console.error('Resend error:', error);
    return { ok: false, error: error.message || 'Failed to send email.' };
  }

  return { ok: true };
}
