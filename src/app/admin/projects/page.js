"use client";
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) setProjects(data.data);
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
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            setFormData({ title: '', description: '', imageUrl: '' });
            fetchProjects();
        } else {
            alert('Error adding project');
        }
    };

    return (
        <div>
            <h1 className={styles.heading}>Project Management</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text" placeholder="Project Name"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={styles.input} required
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={styles.textarea} required
                />
                <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.input} required={!formData.imageUrl} />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className={styles.preview} />}
                <button type="submit" className={styles.button}>Add Project</button>
            </form>
            <div className={styles.list}>
                {projects.map(p => (
                    <div key={p._id} className={styles.card}>
                        <img src={p.imageUrl} alt={p.title} className={styles.cardImage} />
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
