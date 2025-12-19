import AdminSidebar from '@/components/AdminSidebar';
import styles from './admin.module.css';
import '../globals.css'; // Ensure globals are applied if needed, though usually root layout does it

export const metadata = {
    title: 'Admin Panel',
};

export default function AdminLayout({ children }) {
    return (
        <div className={styles.container}>
            <AdminSidebar />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
