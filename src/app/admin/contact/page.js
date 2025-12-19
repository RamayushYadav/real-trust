"use client";
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminContact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const res = await fetch('/api/contact');
        const data = await res.json();
        if (data.success) setContacts(data.data);
    };

    return (
        <div>
            <h1 className={styles.heading}>Contact Form Submissions</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Mobile</th>
                        <th className={styles.th}>City</th>
                        <th className={styles.th}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(c => (
                        <tr key={c._id}>
                            <td className={styles.td}>{c.name}</td>
                            <td className={styles.td}>{c.email}</td>
                            <td className={styles.td}>{c.mobile}</td>
                            <td className={styles.td}>{c.city}</td>
                            <td className={styles.td}>{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
