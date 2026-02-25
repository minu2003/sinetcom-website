import { createServerSupabase } from '@/lib/supabase-server';

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketNumber =
      'ST-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();

    const supabase = createServerSupabase();
    const { error } = await supabase.from('tickets').insert([
      {
        ticket_number: ticketNumber,
        email: body.email,
        full_name: body.fullName,
        phone: body.phone ?? null,
        phone_ext: body.phoneExt ?? null,
        note: body.note ?? null,
        category: body.helpTopic,
        issue_summary: body.issueSummary,
        description: body.detailedDescription,
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ticketId: ticketNumber });
  } catch (err) {
    const message = err.message || 'Server error';
    return Response.json({ error: message }, { status: 500 });
  }
}