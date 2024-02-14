'use client'
import React from 'react';
import { Resend } from 'resend';

const IndexPage: React.FC = () => {
  const handleClick = async () => {
    const resend = new Resend('re_fVWFZ9yS_Lwz2CBjBuepnib7oaLmTxo5M');

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'arifhida1647@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
      });

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to Next.js with Email Sending!</h1>
      <button onClick={handleClick}>Send Email</button>
    </div>
  );
};

export default IndexPage;
