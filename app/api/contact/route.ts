import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name')?.toString().trim() || null;
    const email = formData.get('email')?.toString().trim() || null;
    const message = formData.get('message')?.toString().trim() || null;
    const botField = formData.get('bot-field')?.toString() || null;

    // Honeypot Check
    if (botField) {
      console.warn('Honeypot field filled. Likely a bot submission.');
      return NextResponse.json({ success: true, message: 'Thank you for your submission (bot detected).' }, { status: 200 });
    }

    // Server-Side Validation
    const errors: string[] = [];
    if (!name) errors.push('Name is required.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
    if (!message) errors.push('Message is required.');

    // --- Get multiple recipient emails from environment variable ---
    const recipientEmailsStr = process.env.CONTACT_FORM_TO_EMAILS;
    let recipientEmails: string[] = [];

    if (!recipientEmailsStr) {
      console.error('CONTACT_FORM_TO_EMAILS environment variable is not set!');
      errors.push('Recipient emails are not configured on the server.');
    } else {
      // Split the comma-separated string into an array and trim whitespace from each email
      recipientEmails = recipientEmailsStr.split(',').map(e => e.trim()).filter(e => e.length > 0);
      if (recipientEmails.length === 0) {
        console.error('CONTACT_FORM_TO_EMAILS environment variable is empty or invalid after parsing!');
        errors.push('No valid recipient emails configured.');
      }
    }

    const senderFrom = process.env.CONTACT_FORM_FROM;
    if (!senderFrom) {
      console.error('CONTACT_FORM_FROM environment variable is not set!');
      errors.push('Sender "from" email/name is not configured on the server.');
    }


    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors }, { status: 400 });
    }

    // --- Core Logic: Send Email using Resend ---
    console.log('Attempting to send email for contact form submission...');
    console.log({ name, email, message, recipientEmails });

    const { data, error } = await resend.emails.send({
      from: senderFrom!, // Remember to replace with your verified sender
      to: recipientEmails, // Pass the array of emails here
      subject: `New Inquiry Submission from ${name}`,
      reply_to: email, // Use the user's email for replies
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message?.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json({ success: false, message: 'Failed to send email. Please try again later.' }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error processing contact form submission:', error);
    return NextResponse.json({ success: false, message: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}