'use client';
import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (formData: { name: string; email: string; message: string }) => {
    try {
      await emailjs.send('service_mmsjevh', 'template_hshf83f', formData, 'NMMDUVq4llGGg1ljx');
      alert('Your message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message!');
    }
  };

  useEffect(() => {
    // Parse query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const message = urlParams.get('message');

    // If all parameters are present, send the email
    if (name && email && message) {
      const formData = {
        name,
        email,
        message
      };
      sendEmail(formData);
    }
  }, []);

  return (
    <div className="container">
      <form ref={form}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea className="form-control" id="message" name="message" rows={5} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}
