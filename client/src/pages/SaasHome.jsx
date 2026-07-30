import { Link } from 'react-router-dom';
import { saasProductsData, faqData } from '../data/siteData';
import { useState } from 'react';
import SEO from '../components/SEO';
import { saasPageSchema } from '../utils/schema';

export default function SaasHome() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEO
        title="Enterprise SaaS Software Solutions — School ERP, CRM, HRMS, Hospital Management | Technula Delhi NCR"
        description="Technula builds enterprise-grade SaaS platforms: SchoolOS ERP for schools, LogDay HRMS for attendance & payroll, HIMS for hospitals, StockMaster for e-commerce, FitOS for gyms, and 360° digital marketing services. Serving Delhi NCR, Faridabad, Gurgaon, Noida & all North India."
        keywords="school ERP software Delhi NCR, best CRM software India, HRMS software Faridabad Gurgaon Noida, hospital management software North India, sales CRM Delhi, e-commerce ERP, gym management software, SchoolOS, LogDay, HIMS, StockMaster, payroll software, attendance software, school management software, enterprise SaaS India"
        canonical="/saas"
        schema={saasPageSchema}
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">Enterprise SaaS & Digital Growth</span>
            <h1>High-Impact Platforms Built for <span className="gradient-text">Operational Growth</span></h1>
            <p>From SchoolOS ERP and LogDay HRMS to Hospital HIMS, StockMaster E-Commerce, and 360° Digital Marketing — Technula builds products that eliminate administrative drag and boost profitability.</p>
            <div className="hero-btns">
              <Link to="/contact" className="btn btn-primary btn-lg">Request Product Demo</Link>
              <a href="#products" className="btn btn-outline btn-lg">Explore Software Suite</a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Software Portfolio</span>
            <h2>Enterprise <span className="primary-text">SaaS Suite</span></h2>
          </div>

          <div className="grid-3">
            {saasProductsData.map(product => (
              <div key={product.id} className="card service-card" style={{ padding: '2rem' }}>
                <div className="service-icon" style={{ margin: '0 0 1.25rem' }}>
                  <i className={product.icon}></i>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>{product.category}</span>
                <h3 style={{ margin: '0.4rem 0' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{product.description}</p>
                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                      <i className="fas fa-check" style={{ color: 'var(--primary)' }}></i> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Request Live Demo</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LogDay HRMS Special Feature Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '3rem', borderLeft: '6px solid var(--primary)' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
              <div>
                <span className="label" style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>FEATURED PLATFORM</span>
                <h2>LogDay HRMS — Smart Attendance for <span className="primary-text">Field, Office & WFH</span></h2>
                <p style={{ color: 'var(--text-dim)', margin: '1rem 0 1.5rem', lineHeight: 1.8 }}>
                  Managing hybrid staff used to be complicated. LogDay HRMS unifies 3 attendance streams in a single dashboard:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', fontSize: '1.2rem' }}></i>
                    <div><strong>Field Attendance:</strong> GPS geo-fenced check-in for sales representatives and site engineers.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <i className="fas fa-fingerprint" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i>
                    <div><strong>Office Attendance:</strong> Direct Integration with Biometric hardware and QR scanners.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <i className="fas fa-laptop-house" style={{ color: '#16A34A', fontSize: '1.2rem' }}></i>
                    <div><strong>WFH Attendance:</strong> Remote clock-in with task summary and manager approval workflow.</div>
                  </div>
                </div>
                <Link to="/contact" className="btn btn-primary btn-sm">Demo LogDay HRMS</Link>
              </div>
              <div style={{ background: 'var(--bg-alt)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <i className="fas fa-user-check" style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}></i>
                <h4>Seamless Payroll Integration</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Automated payslip generation with tax deductions and PF/ESI calculations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-heading">
            <span className="label">FAQ</span>
            <h2>SaaS Platform <span className="primary-text">Questions</span></h2>
          </div>
          {faqData.saas.map((item, i) => (
            <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span><span className="faq-icon">+</span>
              </button>
              <div className="faq-answer"><div className="faq-answer-inner">{item.a}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Automate Your Business Operations?</h2>
          <p>Schedule a 1-on-1 demo for SchoolOS, LogDay HRMS, HIMS, or StockMaster with our technical consultants.</p>
          <Link to="/contact" className="btn btn-white btn-lg">Schedule Demo Now</Link>
        </div>
      </section>
    </>
  );
}
