"use client";
import { useState } from 'react';
import styles from '../app/home.module.css';

export default function HomeNewsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (res.status === 400) {
            alert('Email already subscribed or invalid.');
        } else if (res.ok) {
            alert('Subscribed successfully!');
            setEmail('');
        }
    };

    return (
        <div className={styles.newsletterSection}>
            <h2 style={{ marginRight: '20px' }}>Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <input
                    type="email" placeholder="Enter Email Address"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className={styles.newsletterInput} required
                />
                <button type="submit" className={styles.newsletterButton}>Subscribe</button>
            </form>
        </div>
    );
}
