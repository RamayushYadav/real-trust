"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { FaHome, FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email.');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Subscription failed.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('Something went wrong.');
        }
    };

    return (
        <footer className={styles.footerWrapper}>
            {/* CTA Section (Pre-Footer) */}
            <div className={styles.ctaSection}>
                <div className={styles.ctaOverlay}></div>
                <div className={styles.ctaContent}>
                    <p className={styles.ctaText}>
                        Learn more about our listing process, as well as our <br />
                        additional staging and design work.
                    </p>
                    <Link href="#" className={styles.ctaButton}>
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Blue Bar Navbar */}
            <div className={styles.blueBar}>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="#services" className={styles.link}>Services</Link>
                    <Link href="#projects" className={styles.link}>Projects</Link>
                    <Link href="#testimonials" className={styles.link}>Testimonials</Link>
                    <Link href="#contact" className={styles.link}>Contact</Link>
                </div>
                <div className={styles.subscribe}>
                    <span>Subscribe Us</span>
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            className={styles.button}
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? 'Values...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </form>
                    {message && <span style={{ fontSize: '12px', marginLeft: '5px', color: status === 'error' ? '#ffcccc' : '#ccffcc' }}>{message}</span>}
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={styles.footerBottom}>
                <div className={styles.copyright}>
                    All Rights Reserved {new Date().getFullYear()}
                </div>

                <Link href="/" className={styles.footerLogo}>
                    <FaHome />
                    <span>Real Trust</span>
                </Link>

                <div className={styles.socialIcons}>
                    <div className={styles.socialIcon}><FaTwitter /></div>
                    <div className={styles.socialIcon}><FaInstagram /></div>
                    <div className={styles.socialIcon}><FaFacebookF /></div>
                    <div className={styles.socialIcon}><FaLinkedinIn /></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
