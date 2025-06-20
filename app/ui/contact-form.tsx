'use client';
import React, { useState, useEffect } from 'react';

export default function ContactForm({ defaultMessage }: { defaultMessage?: string }) {
  // Initialize states for form data and submission status
  console.log(`Message : ${defaultMessage}`);
  const formattedDefaultMessage = defaultMessage
      ? `Hello IntraAsia,\n\nI am interested in learning more about: ${defaultMessage.replace(/^.*about: /, '').replace(/ Thanks!?$/, '')}\n\nCould you please provide me with more information?\n\nThank you!`
      : '';

  const [form, setForm] = useState({ name: '', email: '', message: formattedDefaultMessage });

  // New states for detailed submission status and error messages
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] = useState<{ email?: string }>({});
  // Add honeypot field for spam protection
  const [botField, setBotField] = useState('');

  // Effect to update message if defaultMessage prop changes
  useEffect(() => {
    if (defaultMessage) {
      setForm((prev) => ({
        ...prev,
        message: `Hello IntraAsia,\n\nI am interested in learning more about: ${defaultMessage.replace(/^.*about: /, '').replace(/ Thanks!?$/, '')}.\n\nCould you please provide me with more information?\n\nThank you!`
      }));
    }
  }, [defaultMessage]); // Dependency array: run effect when defaultMessage changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(form.email)) {
      setValidationErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setValidationErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Main form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // --- Client-side validation before sending ---
    // Validate email
    if (!validateEmail(form.email)) {
      setValidationErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      setSubmissionStatus('idle'); // Ensure status is not pending if validation fails
      return;
    } else {
      setValidationErrors((prev) => ({ ...prev, email: undefined }));
    }

    // Validate other required fields
    if (!form.name.trim() || !form.message.trim()) {
      alert('Please fill in all required fields (Name and Message).');
      setSubmissionStatus('idle');
      return;
    }

    // --- Honeypot validation (simple client-side check) ---
    // If the botField has any value, it's likely a bot.
    if (botField) {
      console.warn('Honeypot field filled. Likely a bot submission.');
      setSubmissionStatus('success'); // Pretend it worked for the bot, but don't process
      setSubmissionError(null);
      // Optionally, clear the form here if you want to make it look successful to the bot
      setForm({ name: '', email: '', message: '' });
      return;
    }

    // Prepare form data
    const formData = new FormData(event.currentTarget);
    // You can add additional fields to formData if they're not directly in the form
    // e.g., formData.append('someHiddenValue', 'value');

    try {
      setSubmissionStatus('pending'); // Set status to pending
      setSubmissionError(null);     // Clear any previous errors

      // Fetch call to your Next.js API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        // When sending FormData directly, fetch automatically sets 'Content-Type' to 'multipart/form-data'
        body: formData,
      });

      if (response.ok) { // `response.ok` is true for 2xx status codes
        setSubmissionStatus('success');
        setSubmissionError(null); // Clear any errors if it was successful
        setForm({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setSubmissionStatus('error'); // Set status to error
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred.' }));
        setSubmissionError(`Submission failed: ${errorData.message || 'Please try again.'}`);
        console.error('Form submission failed:', response.status, errorData);
      }
    } catch (error: any) {
      setSubmissionStatus('error'); // Set status to error for network issues
      setSubmissionError(`Network error: ${error.message || 'Could not connect to the server.'}`);
      console.error('Network error during form submission:', error);
    }
  };

  // Render success message if submission was successful
  if (submissionStatus === 'success') {
    return (
        <div className="text-green-600 font-semibold text-center py-8">
          Thank you for contacting us! We will be in touch with you soon!
        </div>
    );
  }

  // Render the form
  return (
      <form
          // Ensure 'name' and 'action' attributes are correct if you're using other systems like Netlify Forms
          // For a pure Next.js API route, 'name' and 'action' on the form itself are not strictly required for functionality,
          // but can be helpful for browser auto-fill or server-side rendering forms without JS.
          name="contact"
          method="POST"
          action="/api/contact" // This is the API route that will handle the submission
          className="space-y-4 max-w-md mx-auto"
          onSubmit={handleSubmit}
      >
        {/* Hidden field for Netlify Forms (if applicable, otherwise can be removed) */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot field for spam protection (hidden visually and from screen readers) */}
        <div className="hidden" aria-hidden="true">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" value={botField} onChange={e => setBotField(e.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Form Fields */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
              type="text"
              id="name"
              name="name" // Crucial for FormData
              value={form.name}
              onChange={handleChange}
              required
              disabled={submissionStatus === 'pending'} // Disable inputs while submitting
              className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
              type="email"
              id="email"
              name="email" // Crucial for FormData
              value={form.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              required
              disabled={submissionStatus === 'pending'} // Disable inputs while submitting
              className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {validationErrors.email && <div className="text-red-600 text-sm mt-1">{validationErrors.email}</div>}
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">Message</label>
          <textarea
              id="message"
              name="message" // Crucial for FormData
              value={form.message}
              onChange={handleChange}
              required
              disabled={submissionStatus === 'pending'} // Disable inputs while submitting
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={submissionStatus === 'pending'} // Disable button during submission
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {submissionStatus === 'pending' ? 'Sending Message...' : 'Send Message'}
        </button>

        {/* Submission Feedback Messages */}
        {submissionStatus === 'error' && (
            <p className="mt-4 text-center text-red-600 text-sm">
              {submissionError}
            </p>
        )}
      </form>
  );
}