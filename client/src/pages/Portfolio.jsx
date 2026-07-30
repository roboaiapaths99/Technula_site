import { portfolioData } from '../data/siteData';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Portfolio() {
  return (
    <>
      <SEO
        title="Our Portfolio — Enterprise SaaS Projects & Client Success Stories | Technula"
        description="Explore Technula's portfolio of enterprise SaaS projects — School ERP implementations, HRMS deployments, CRM solutions, and hospital management systems delivered to clients across Delhi NCR, Faridabad, Gurgaon, Noida & North India."
        keywords="Technula portfolio, enterprise software projects India, school ERP case study, HRMS implementation, CRM success story, SaaS project portfolio Delhi NCR"
        canonical="/saas/portfolio"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">Case Studies</span>
            <h1>Legacy of <span className="gradient-text">Engineering Excellence</span></h1>
            <p>Selected works from our custom software engineering portfolio across enterprise SaaS, FinTech, and multi-vendor ecosystems.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid-3">
            {portfolioData.map(item => (
              <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, textTransform: uppercaseText(item.category) }}>{item.category}</span>
                  <h3 style={{ margin: '0.5rem 0' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Have a Project in Mind?</h2>
          <p>Let's build a custom software solution tailored specifically to your business logic and operational goals.</p>
          <Link to="/contact" className="btn btn-white btn-lg">Discuss Your Project</Link>
        </div>
      </section>
    </>
  );
}

function uppercaseText(str) {
  return str ? str.toUpperCase() : '';
}
