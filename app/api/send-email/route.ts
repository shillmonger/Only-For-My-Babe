import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, location, notes } = body;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #C2185B; font-size: 28px; margin-bottom: 20px;">🎉 She Said YES!</h1>
        
        <div style="background: linear-gradient(135deg, #FF4D7E 0%, #FFC76B 100%); padding: 30px; border-radius: 20px; margin-bottom: 20px;">
          <p style="color: white; font-size: 18px; margin: 0;">
            <strong>Date Details:</strong>
          </p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <p style="margin: 10px 0; color: #333;">
            <strong>📅 Date:</strong> ${date}
          </p>
          <p style="margin: 10px 0; color: #333;">
            <strong>⏰ Time:</strong> ${time}
          </p>
          <p style="margin: 10px 0; color: #333;">
            <strong>📍 Activity:</strong> ${location}
          </p>
          ${notes ? `
          <p style="margin: 10px 0; color: #333;">
            <strong>💌 Special Notes:</strong><br/>
            <span style="font-style: italic;">${notes}</span>
          </p>
          ` : ''}
        </div>

        <p style="color: #666; font-size: 16px; text-align: center; margin-top: 30px;">
          ❤️ Get ready for an amazing date!
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Date Invitation <onboarding@resend.dev>',
      to: CONTACT_EMAIL || '',
      subject: '🎉 She Said YES! Date Confirmed',
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
