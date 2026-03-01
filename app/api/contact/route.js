import { sendContactFormEmail } from '@/lib/email';

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, country, contactNumber, message } = body;

    if (!email || !message) {
      return Response.json({ error: 'Email and message are required.' }, { status: 400 });
    }

    const result = await sendContactFormEmail({
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      email,
      company: company ?? '',
      country: country ?? '',
      contactNumber: contactNumber ?? '',
      message: message ?? '',
    });

    if (!result.ok) {
      return Response.json({ error: result.error || 'Failed to send message.' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
