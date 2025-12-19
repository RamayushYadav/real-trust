"use client";
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminClients() {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: '', designation: '', description: '', imageUrl: '' });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await fetch('/api/clients');
        const data = await res.json();
        if (data.success) setClients(data.data);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            setFormData({ name: '', designation: '', description: '', imageUrl: '' });
            fetchClients();
        } else {
            alert('Error adding client');
        }
    };

    return (
        <div>
            <h1 className={styles.heading}>Client Management</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text" placeholder="Client Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input} required
                />
                <input
                    type="text" placeholder="Designation"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className={styles.input} required
                />
                <textarea
                    placeholder="Testimonial/Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={styles.textarea} required
                />
                <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.input} required={!formData.imageUrl} />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className={styles.preview} />}
                <button type="submit" className={styles.button}>Add Client</button>
            </form>
            <div className={styles.list}>
                {clients.map(c => (
                    <div key={c._id} className={styles.card}>
                        <img src={c.imageUrl} alt={c.name} className={styles.cardImage} />
                        <h3>{c.name}</h3>
                        <p className="text-sm text-gray-500">{c.designation}</p>
                        <p>{c.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
