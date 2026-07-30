import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '3px solid var(--primary)', background: '#070D1B' }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="nav-brand" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center' }}>
              <div style={{ background: '#ffffff', borderRadius: '10px', padding: '6px 14px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/img/technula_lockup_clean.png" 
                  alt="TECHNULA - Innovate. Integrate. Inspire." 
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </div>
            </Link>
            <p style={{ marginTop: '0.4rem', lineHeight: '1.6', fontSize: '0.85rem', color: '#94A3B8' }}>
              Engineering Futures. Building Innovators. Technula powers enterprise SaaS solutions, 360° digital growth, and next-generation STEM education.
            </p>

            {/* Glowing Social Media Badges */}
            <div className="footer-social" style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem' }}>
              <a 
                href="https://www.linkedin.com/company/agpk1/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#0A66C2', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://www.instagram.com/technulasolution/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(220, 39, 67, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://www.facebook.com/Technulasolution9" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#1877F2', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem', letterSpacing: '0.5px' }}>SaaS Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Technula</Link></li>
              <li><Link to="/saas">SchoolOS ERP & LogDay HRMS</Link></li>
              <li><Link to="/saas">HIMS & StockMaster Suite</Link></li>
              <li><Link to="/saas/portfolio">Client Success Case Studies</Link></li>
              <li><Link to="/faq">Knowledge Base & FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem', letterSpacing: '0.5px' }}>STEM Academy</h4>
            <ul className="footer-links">
              <li><Link to="/academy/programs">Courses & Curriculum</Link></li>
              <li><Link to="/academy/kits">Robotics Kits Marketplace</Link></li>
              <li><Link to="/contact">School AI Lab Setup</Link></li>
              <li><Link to="/contact">Book Free Demo Class</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem', letterSpacing: '0.5px' }}>Direct Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem' }}>
              <a href="tel:+919990911093" style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-phone" style={{ color: 'var(--primary)' }}></i> +91 9990911093
              </a>
              <a href="mailto:info@technula.com" style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-envelope" style={{ color: 'var(--primary)' }}></i> info@technula.com
              </a>
              <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)' }}></i> Sector 85, Faridabad, Haryana
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
          <p>&copy; {new Date().getFullYear()} Technula. All rights reserved. Engineering Futures with Passion.</p>
        </div>
      </div>
    </footer>
  );
}
