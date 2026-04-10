import { sendContactFormEmail } from '@/lib/email';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

function trimStr(v) {
  return typeof v === 'string' ? v.trim() : '';
}

export async function POST(req) {
  try {
    const body = await req.json();
    const firstName = trimStr(body?.firstName);
    const lastName = trimStr(body?.lastName);
    const email = trimStr(body?.email);
    const company = trimStr(body?.company);
    const country = trimStr(body?.country);
    const contactNumber = trimStr(body?.contactNumber);
    const message = trimStr(body?.message);

    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { error: 'First name, last name, email, and message are required.' },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient();
    if (!supabase) {
      console.error('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is not set');
      return Response.json({ error: 'Database configuration error.' }, { status: 500 });
    }

    const { error: dbError } = await supabase.from('contact_submissions').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      company: company || null,
      country: country || null,
      contact_number: contactNumber || null,
      message,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return Response.json(
        { error: 'Could not save your message. Please try again later.' },
        { status: 500 },
      );
    }

    const result = await sendContactFormEmail({
      firstName,
      lastName,
      email,
      company,
      country,
      contactNumber,
      message,
    });

    if (!result.ok) {
      return Response.json(
        { error: result.error || 'Your message was saved but we could not send the notification email.' },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
