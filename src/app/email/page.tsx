'use client'
import { useState } from 'react';

const SendEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = {
                email: "arifhida1647@gmail.com",
                userFristname: "Arif"
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch('https://api-email-teal.vercel.app/api/mail', requestOptions);

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            setLoading(false);
            alert('Email sent successfully!');
        } catch (error) {
            setLoading(false);
            setError('Failed to send email. Please try again later.');
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <h1>Send Email</h1>
            <button onClick={sendEmail} disabled={loading}>
                {loading ? 'Sending...' : 'Send Email'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SendEmail;
