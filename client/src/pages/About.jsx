import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About Technula — Enterprise SaaS & STEM Education Company in Faridabad, Delhi NCR"
        description="Learn about Technula — a leading enterprise SaaS engineering lab and STEM education academy founded in Faridabad, Haryana. We build SchoolOS ERP, LogDay HRMS, CRM, and deliver robotics education for K-12 schools across Delhi NCR and North India."
        keywords="about Technula, enterprise software company Faridabad, SaaS company Delhi NCR, STEM education company India, Rashmi Kansal, Ankit Gupta, Technula founders, best tech company Haryana"
        canonical="/about"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">About Technula</span>
            <h1>Where Enterprise Tech Meets <span className="gradient-text">Future Innovators</span></h1>
            <p>Technula operates two core divisions — a full-stack SaaS engineering lab building scalable enterprise solutions, and a hands-on STEM education academy shaping the next generation of builders, coders, and inventors.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <span className="label" style={{ color: 'var(--primary)', fontWeight: 700 }}>OUR STORY & VISION</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Transforming Businesses & Inspiring Young Minds</h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Technula (formerly RoboAIAPaths) was founded on the belief that cutting-edge software engineering and early-stage technological education are two sides of the same coin. <strong>RoboAIAPaths is now Technula — same team, same vision, a new name for a bigger future and new innovations.</strong>
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
                Our SaaS Division engineers high-performance web products, field automation tools, and tax compliance portals for enterprises across India. Simultaneously, our STEM Academy Division provides school students from Nursery to 8th class with hands-on robotics, AI learning, and coding skills through physical kit building and guided mentorship.
              </p>
            </div>
            <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Core Leadership</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary)' }}>Rashmi Kansal</h4>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Lead Educator</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>15+ years experience in Computer Science, STEM, and Psychology. M.Ed, M.Sc.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent)' }}>Ankit Gupta</h4>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Director & Tech Strategist</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Driving technical excellence, enterprise SaaS scaling, and STEM hardware innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="label">Headquarters</span>
            <h2>Visit <span className="primary-text">Technula</span></h2>
            <p>Our main operations and innovation lab located in Faridabad, Haryana.</p>
          </div>
          <div className="card" style={{ padding: '3rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <i className="fas fa-map-marker-alt" style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1.5rem', display: 'block' }}></i>
            <h3>S20, Amolik Sankalp, Sector 85, Faridabad</h3>
            <p style={{ color: 'var(--text-dim)', margin: '1rem 0 1.5rem' }}>Haryana, India</p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <div><i className="fas fa-phone" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>+91 9990911093</div>
              <div><i className="fas fa-envelope" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>info@technula.com</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
