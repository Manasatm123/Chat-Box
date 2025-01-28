import React, { useState } from 'react';
import axios from 'axios';
import './Verify.scss';
import url from '../assets/url';

const EmailVerify = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/verify`, { email });
            localStorage.setItem('email', email);
            setMessage('A confirmation email has been sent to your email address.');
            setIsEmailSent(true);
        } catch (error) {
            setMessage(error.response.data.msg || 'An error occurred.');
        }
    };

    return (
        <div className="email-container">
            <form className="email-form" onSubmit={handleSendEmail}>
                <h2 className="email-title">Verify Your Email</h2>
                <div className="email-field">
                    
                    <input
                        type="email"
                        id="email"
                        className="email-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isEmailSent}
                    />
                </div>
                <button type="submit" className="email-button" disabled={isEmailSent}>
                    {isEmailSent ? 'Verify Email' : 'Verify'}
                </button>
                {message && <p className="email-message">{message}</p>}
            </form>
        </div>
    );
};

export default EmailVerify;
