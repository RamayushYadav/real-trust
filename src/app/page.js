import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Client from '@/models/Client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeContactForm from '@/components/HomeContactForm';
import styles from './home.module.css';
import { FaRegLightbulb, FaDraftingCompass, FaBullhorn } from 'react-icons/fa';

async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return projects.map(p => ({ ...p, _id: p._id.toString() }));
}

async function getClients() {
  await dbConnect();
  const clients = await Client.find({}).sort({ createdAt: -1 }).lean();
  return clients.map(c => ({ ...c, _id: c._id.toString() }));
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getProjects();
  const clients = await getClients();

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Consultation, <br /> Design, <br /> & Marketing</h1>
            <p className={styles.heroSubtitle}>We build your dream projects with precision and care.</p>
          </div>
          <div className={styles.heroFormContainer}>
            <HomeContactForm />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.section}>
        <span className={styles.sectionSubtitle}>Features</span>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}><FaRegLightbulb /></div>
            <h3>Potential ROI</h3>
            <p>Maximize your returns with our strategic planning.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}><FaDraftingCompass /></div>
            <h3>Design</h3>
            <p>Innovative designs that stand out in the market.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}><FaBullhorn /></div>
            <h3>Marketing</h3>
            <p>Reach your audience effectively with our campaigns.</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className={styles.section}>
        <div className={styles.aboutSection}>
          <div className={styles.aboutCollage}>
            {/* Left Image */}
            <div className={`${styles.collageItem} ${styles.collageItemSide}`}>
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className={styles.aboutImage} alt="Meeting" />
              <div className={styles.decoBorderOrange}></div>
            </div>

            {/* Center Image */}
            <div className={`${styles.collageItem} ${styles.collageItemCenter}`}>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" className={styles.aboutImage} alt="Main" />
              <div className={styles.decoSquareBlue}></div>
            </div>

            {/* Right Image */}
            <div className={`${styles.collageItem} ${styles.collageItemSide}`}>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className={styles.aboutImage} alt="Office" />
            </div>
          </div>

          <div className={styles.aboutTextWrapper}>
            <h2 className={styles.aboutTitle}>About Us</h2>
            <p className={styles.aboutDescription}>
              Fifteen years of experience in real estate, excellent customer service and a commitment to work hard, listen and follow through. We provide quality service to build relationships with clients and more importantly, maintain those relationships by communicating effectively.
            </p>
            <button className={styles.aboutLearnMore}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section} id="projects">
        <span className={styles.sectionSubtitle}>Portfolio</span>
        <h2 className={styles.sectionTitle}>Our Projects</h2>
        <div className={styles.horizontalRow}>
          {projects.length > 0 ? projects.map(project => (
            <div key={project._id} className={styles.card}>
              <img src={project.imageUrl} alt={project.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description || "Project Name, Location"}</p>
                <button className={styles.readMore} style={{ border: 'none', cursor: 'pointer' }}>Read More</button>
              </div>
            </div>
          )) : <p>No projects added yet.</p>}
        </div>
      </section>

      {/* Clients */}
      <section className={styles.section} id="testimonials">
        <span className={styles.sectionSubtitle}>Testimonials</span>
        <h2 className={styles.sectionTitle}>Happy Clients</h2>
        <div className={styles.horizontalRow}>
          {clients.length > 0 ? clients.map(client => (
            <div key={client._id} className={styles.clientCard}>
              <img src={client.imageUrl} alt={client.name} className={styles.clientImage} />
              <p style={{ fontStyle: 'italic', marginBottom: '15px', color: '#555' }}>"{client.description}"</p>
              <h4>{client.name}</h4>
              <small style={{ color: '#007bff', fontWeight: 'bold' }}>{client.designation}</small>
            </div>
          )) : <p>No clients added yet.</p>}
        </div>
      </section>

      <Footer />
    </main>
  );
}
