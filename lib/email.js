import { Resend } from 'resend';

const NOTIFY_EMAIL = 'minuriviranga@gmail.com';
// Resend only allows sending from verified domains. Use onboarding@resend.dev for testing until you verify your domain.
const FROM_EMAIL = process.env.EMAIL_FROM && !process.env.EMAIL_FROM.includes('yourdomain.com')
  ? process.env.EMAIL_FROM
  : 'Support <onboarding@resend.dev>';

/**
 * Send a notification email when a new support ticket is opened.
 * @param {Object} payload - { ticketNumber, email, fullName, phone, phoneExt, note, category, issueSummary, description }
 * @returns {{ ok: boolean, error?: string }}
 */
export async function sendNewTicketNotification(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set; skipping new-ticket email.');
    return { ok: false, error: 'Email not configured' };
  }

  const resend = new Resend(apiKey);
  const {
    ticketNumber,
    email,
    fullName,
    phone,
    phoneExt,
    note,
    category,
    issueSummary,
    description,
  } = payload;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New support ticket</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #333;">
  <h2 style="margin-top: 0;">New support ticket</h2>
  <p><strong>Ticket ID:</strong> <code style="background: #f0f0f0; padding: 2px 6px;">${escapeHtml(ticketNumber)}</code></p>
  <p><strong>From:</strong> ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;</p>
  ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}${phoneExt ? ` ext. ${escapeHtml(phoneExt)}` : ''}</p>` : ''}
  ${note ? `<p><strong>Note:</strong> ${escapeHtml(note)}</p>` : ''}
  <p><strong>Category:</strong> ${escapeHtml(category)}</p>
  <p><strong>Issue summary:</strong> ${escapeHtml(issueSummary)}</p>
  <p><strong>Description:</strong></p>
  <div style="background: #f8f8f8; padding: 12px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(description || '')}</div>
  <p style="margin-top: 24px; color: #666; font-size: 14px;">This ticket was submitted via the support form.</p>
</body>
</html>
  `.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      subject: `New support ticket: ${ticketNumber}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: error.message };
    }
    console.log('[Email] New ticket notification sent to', NOTIFY_EMAIL);
    return { ok: true };
  } catch (err) {
    console.error('Failed to send ticket notification email:', err);
    return { ok: false, error: err.message };
  }
}

function escapeHtml(text) {
  if (text == null) return '';
  const s = String(text);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Send contact form message to minuriviranga@gmail.com.
 * @param {Object} payload - { firstName, lastName, email, company, country, contactNumber, message }
 * @returns {{ ok: boolean, error?: string }}
 */
export async function sendContactFormEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set; skipping contact form email.');
    return { ok: false, error: 'Email not configured' };
  }

  const resend = new Resend(apiKey);
  const { firstName, lastName, email, company, country, contactNumber, message } = payload;
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contact form message</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #333;">
  <h2 style="margin-top: 0;">New contact form message</h2>
  <p><strong>From:</strong> ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;</p>
  ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
  ${country ? `<p><strong>Country:</strong> ${escapeHtml(country)}</p>` : ''}
  ${contactNumber ? `<p><strong>Contact number:</strong> ${escapeHtml(contactNumber)}</p>` : ''}
  <p><strong>Message:</strong></p>
  <div style="background: #f8f8f8; padding: 12px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message || '')}</div>
  <p style="margin-top: 24px; color: #666; font-size: 14px;">This message was submitted via the Contact Us form.</p>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      subject: `Contact form: ${fullName} (${email})`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: error.message };
    }
    console.log('[Email] Contact form message sent to', NOTIFY_EMAIL);
    return { ok: true };
  } catch (err) {
    console.error('Failed to send contact form email:', err);
    return { ok: false, error: err.message };
  }
}
