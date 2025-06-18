import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  // Extract fields
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  const botField = formData.get('bot-field');

  // Honeypot check
  if (botField) {
    return NextResponse.json({ success: false, message: 'Bot detected.' }, { status: 400 });
  }

  // Here you can add logic to send the form data to an email service, database, or Netlify Forms endpoint if needed
  // For now, just return a success response
  return NextResponse.json({ success: true });
}

