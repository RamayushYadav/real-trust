"use client";
import { useState } from 'react';

export default function HomeContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', city: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            alert('Thank you for contacting us!');
            setFormData({ name: '', email: '', mobile: '', city: '' });
        }
    };

    const inputStyle = {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.3)',
        fontSize: '14px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        width: '100%',
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Get a Free Consultation</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text" placeholder="Full Name"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle} required
                />
                <input
                    type="email" placeholder="Enter Email Address"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle} required
                />
                <input
                    type="tel" placeholder="Mobile Number"
                    value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    style={inputStyle} required
                />
                <input
                    type="text" placeholder="Area, City"
                    value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={inputStyle} required
                />
                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#ff6600',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Get Quick Quote</button>
            </form>
        </div>
    );
}
