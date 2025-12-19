"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    const pathname = usePathname();

    const links = [
        { href: '/admin', label: 'Dashboard' },
        { href: '/admin/projects', label: 'Projects' },
        { href: '/admin/clients', label: 'Clients' },
        { href: '/admin/contact', label: 'Contact Submissions' },
        { href: '/admin/newsletter', label: 'Newsletter' },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>Admin Panel</div>
            <nav className={styles.nav}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;
