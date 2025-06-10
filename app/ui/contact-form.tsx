'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    // Simple email regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: { email?: string } = {};
    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;
    // Here you would handle sending the form data to your backend or API
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="p-4 bg-[#e6f0fa] text-[#0054A6] rounded border border-[#0054A6]">Thank you for contacting us!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-[#e5e7eb]">
      <div>
        <label className="block mb-1 font-medium text-[#0054A6]">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-[#949494] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0054A6] focus:border-[#0054A6] dark:text-gray-800"
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-[#0054A6]">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          required
          className="w-full border border-[#949494] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0054A6] focus:border-[#0054A6] dark:text-gray-800"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-[#0054A6]">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border border-[#949494] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0054A6] focus:border-[#0054A6] dark:text-gray-800"
          rows={4}
        />
      </div>
      <button type="submit" className="bg-[#0054A6] text-white px-4 py-2 rounded hover:bg-[#003e7c] transition-colors font-semibold shadow">Send</button>
    </form>
  );
}
