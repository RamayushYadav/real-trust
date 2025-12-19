"use client";
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaHome } from 'react-icons/fa'; // Using FaHome as an approximation of the house icon

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <FaHome className={styles.logoIcon} />
                <span>Real Trust</span>
            </Link>

            <div className={styles.navLinks}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="#services" className={styles.link}>Services</Link>
                <Link href="#projects" className={styles.link}>About Projects</Link>
                <Link href="#testimonials" className={styles.link}>Testimonials</Link>
            </div>

            <Link href="#contact" className={styles.contactButton}>
                Contact
            </Link>
        </nav>
    );
};

export default Navbar;
