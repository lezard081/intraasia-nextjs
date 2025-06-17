'use client';
import React, { useState, useEffect } from 'react';

export default function ContactForm({ defaultMessage }: { defaultMessage?: string }) {
  const formattedDefaultMessage = defaultMessage
    ? `Hello IntraAsia Team,\n\nI am interested in learning more about: ${defaultMessage.replace(/^.*about: /, '').replace(/ Thanks!?$/, '')}.\n\nCould you please provide me with more information?\n\nThank you!`
    : '';
  const [form, setForm] = useState({ name: '', email: '', message: formattedDefaultMessage });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  // Add honeypot field for spam protection
  const [botField, setBotField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Update message if defaultMessage changes (e.g., when product changes)
  useEffect(() => {
    if (defaultMessage) {
      setForm((prev) => ({
        ...prev,
        message: `Hello IntraAsia Team,\n\nI am interested in learning more about: ${defaultMessage.replace(/^.*about: /, '').replace(/ Thanks!?$/, '')}.\n\nCould you please provide me with more information?\n\nThank you!`
      }));
    }
  }, [defaultMessage]);

  if (submitted) {
    return (
      <div className="text-green-600 font-semibold text-center py-8">
        Thank you for contacting us! We will be in touch with you soon!
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-4 max-w-md mx-auto"
      onSubmit={() => setSubmitted(true)}
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot field for spam protection */}
      <div className="hidden">
        <label>
          Don’t fill this out if you're human:
          <input name="bot-field" value={botField} onChange={e => setBotField(e.target.value)} />
        </label>
      </div>
      {/* Netlify reCAPTCHA widget */}
      <div data-netlify-recaptcha="true" className="mb-4" />
      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
