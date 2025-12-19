"use client";
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        const res = await fetch('/api/newsletter');
        const data = await res.json();
        if (data.success) setSubscribers(data.data);
    };

    return (
        <div>
            <h1 className={styles.heading}>Newsletter Subscriptions</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Date Subscribed</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map(s => (
                        <tr key={s._id}>
                            <td className={styles.td}>{s.email}</td>
                            <td className={styles.td}>{new Date(s.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
