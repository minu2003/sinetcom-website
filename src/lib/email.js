export async function sendContactFormEmail({
  firstName,
  lastName,
  email,
  company,
  country,
  contactNumber,
  message,
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return { ok: false, error: 'Email service configuration error' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: ['support@sinetcomm.com'], // Or the user's email
        subject: `Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Country:</strong> ${country || 'N/A'}</p>
          <p><strong>Contact Number:</strong> ${contactNumber || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { ok: false, error: data.message || 'Failed to send email via resend API' };
    }

    return { ok: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { ok: false, error: error.message || 'Error occurred while sending email' };
  }
}
