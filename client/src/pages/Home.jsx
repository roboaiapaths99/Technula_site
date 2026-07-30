import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { saasProductsData, portfolioData, testimonialsData } from '../data/siteData';
import { kitsData } from '../data/kitsData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../utils/schema';

function Counter({ target, suffix = '+' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const increment = target / 120;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { el.textContent = target + suffix; clearInterval(timer); }
          else el.textContent = Math.ceil(current);
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);
  return <h3 ref={ref}>0</h3>;
}

export default function Home() {
  const { addToCart } = useCart();
  const featuredKits = kitsData.filter(k => !k.isOutOfStock).slice(0, 4);

  return (
    <>
      <SEO
        title="Technula | Best Enterprise SaaS Software & STEM Robotics Education in Delhi NCR"
        description="Technula is India's leading enterprise SaaS company based in Faridabad, Delhi NCR. We build School ERP (SchoolOS), CRM, HRMS (LogDay), Hospital Management (HIMS), Sales Software, and provide STEM Robotics Education for K-12 schools across North India — Gurgaon, Noida, Greater Noida, Ghaziabad & beyond."
        keywords="best school ERP software Delhi NCR, CRM software India, HRMS software Faridabad, hospital management software North India, STEM robotics kits for schools, enterprise SaaS company Gurgaon Noida, school management software, sales CRM Delhi, attendance software, payroll software India, Technula, SchoolOS, LogDay HRMS, best software company Faridabad, digital marketing agency Delhi NCR"
        canonical="/"
        schema={[organizationSchema, localBusinessSchema, websiteSchema]}
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 980 }}>
            <span className="hero-badge" style={{ margin: '0 auto 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', animation: 'pulseGlow 4s infinite' }}>
              <i className="fas fa-sparkles" style={{ color: 'var(--primary)' }}></i> Enterprise Technology & STEM Education
            </span>

            <h1 style={{ textAlign: 'center', margin: '0 auto 1.25rem', maxWidth: 920, fontSize: '3.2rem', lineHeight: 1.2 }}>
              Automate Operations. Build Innovators.<br />
              <span className="gradient-text">Empower Your Future.</span>
            </h1>

            <p style={{ textAlign: 'center', margin: '0 auto 2.25rem', maxWidth: 760, fontSize: '1.15rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Technula powers enterprise SaaS platforms (<strong>SchoolOS ERP</strong>, <strong>LogDay HRMS</strong>, <strong>HIMS</strong>, <strong>StockMaster</strong>), <strong>360° Digital Marketing</strong>, and hands-on <strong>STEM Robotics Kits & AI Courses</strong> for schools across India.
            </p>

            <div className="hero-btns" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 25px rgba(0, 120, 172, 0.35)' }}>
                Request Software Demo <i className="fas fa-desktop"></i>
              </Link>
              <Link to="/academy/kits" className="btn btn-accent btn-lg" style={{ boxShadow: '0 8px 25px rgba(210, 17, 44, 0.35)' }}>
                Shop Robotics Kits <i className="fas fa-boxes"></i>
              </Link>
            </div>

            {/* Crystal-Clear 4 Core Pillars Visual Grid */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '1px', marginBottom: '1.25rem' }}>
                Explore Technula's 4 Core Pillars:
              </div>

              <div className="grid-4" style={{ gap: '1.25rem' }}>
                {/* Pillar 1: Enterprise SaaS */}
                <div className="card pillar-card" style={{ padding: '1.5rem', background: '#fff', borderTop: '5px solid var(--primary)', textAlign: 'left' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.9rem' }}>
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PILLAR 1</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.4rem' }}>Enterprise SaaS ERPs</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    SchoolOS ERP, LogDay HRMS (Field, Office & WFH), HIMS Hospital & StockMaster E-Commerce.
                  </p>
                  <Link to="/saas" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    View Products →
                  </Link>
                </div>

                {/* Pillar 2: 360 Digital Marketing */}
                <div className="card pillar-card" style={{ padding: '1.5rem', background: '#fff', borderTop: '5px solid #F59E0B', textAlign: 'left' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.9rem' }}>
                    <i className="fas fa-bullhorn"></i>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PILLAR 2</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.4rem' }}>360° Digital Marketing</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    School Admissions Lead Gen, Social Media Marketing (SMM), and Local SEO positioning.
                  </p>
                  <Link to="/contact" style={{ color: '#D97706', fontWeight: 700, fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Grow Your Brand →
                  </Link>
                </div>

                {/* Pillar 3: STEM Hardware Kits */}
                <div className="card pillar-card" style={{ padding: '1.5rem', background: '#fff', borderTop: '5px solid var(--accent)', textAlign: 'left' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.9rem' }}>
                    <i className="fas fa-microchip"></i>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PILLAR 3</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.4rem' }}>Robotics Kits Store</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    11 Hands-on STEM Hardware Kits (Non-Programmable, Otto Ninja, Jetty Bot, Smart IoT Home).
                  </p>
                  <Link to="/academy/kits" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Buy Kits →
                  </Link>
                </div>

                {/* Pillar 4: Robotics & AI Student Courses */}
                <div className="card pillar-card" style={{ padding: '1.5rem', background: '#fff', borderTop: '5px solid #16A34A', textAlign: 'left' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.9rem' }}>
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PILLAR 4</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0 0.4rem' }}>School STEM Labs</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    Robotics, AI, and Coding curriculum for classes Nursery to 8th with complete lab setup.
                  </p>
                  <Link to="/academy/programs" style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    View Courses →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><Counter target={150} /><p>Enterprise Deployments</p></div>
            <div className="stat-item"><Counter target={2500} suffix="+" /><p>Daily SchoolOS Users</p></div>
            <div className="stat-item"><Counter target={98} suffix="%" /><p>Client Retention</p></div>
            <div className="stat-item"><Counter target={1000} suffix="+" /><p>STEM Students Trained</p></div>
          </div>
        </div>
      </section>

      {/* Featured Enterprise SaaS Products */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Ready-to-Deploy Platforms</span>
            <h2>Our Turnkey <span className="primary-text">SaaS Ecosystem</span></h2>
            <p>Designed for immediate operational impact, zero technical friction, and measurable ROI.</p>
          </div>

          <div className="grid-3">
            {saasProductsData.map(product => (
              <div key={product.id} className="card service-card" style={{ textStyle: 'left', padding: '1.75rem' }}>
                <div className="service-icon" style={{ margin: '0 0 1rem' }}>
                  <i className={product.icon}></i>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '1px' }}>{product.category}</span>
                <h3 style={{ margin: '0.3rem 0' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.1rem' }}>{product.description}</p>
                <ul style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                      <i className="fas fa-check" style={{ color: 'var(--primary)' }}></i> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Live Demo <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured STEM Robotics Kits Marketplace Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="label">STEM Academy Hardware</span>
            <h2>Featured <span className="accent-text">Robotics Kits</span></h2>
            <p>Hands-on hardware kits designed for schools and young innovators to build real electronic inventions.</p>
          </div>

          <div className="grid-4">
            {featuredKits.map(kit => (
              <div key={kit.id} className="card kit-card" style={{ textStyle: 'left' }}>
                <div className="kit-image" style={{ height: 170, overflow: 'hidden', position: 'relative' }}>
                  <img src={kit.image} alt={kit.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--accent)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontWeight: 700 }}>
                    {kit.classFor}
                  </span>
                </div>
                <div className="kit-info" style={{ padding: '1.1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    {kit.ageGroup}
                  </div>
                  <h4 className="kit-name" style={{ fontSize: '0.95rem', margin: '0 0 0.4rem' }}>{kit.name}</h4>
                  <div className="kit-price" style={{ marginBottom: '0.85rem' }}>
                    <span className="price-current">{formatCurrency(kit.price)}</span>
                    <span className="price-mrp">{formatCurrency(kit.mrp)}</span>
                  </div>
                  <div className="kit-actions" style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => addToCart(kit)}>
                      Add to Cart
                    </button>
                    <Link to={`/academy/kits/${kit.id}`} className="btn btn-outline btn-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/academy/kits" className="btn btn-outline-accent btn-lg">
              Explore All 11 Robotics Kits <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Real Client Success Stories */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Client Success</span>
            <h2>Trusted by Leading <span className="accent-text">Hospitals & Schools</span></h2>
            <p>Real deployment case studies across India.</p>
          </div>

          <div className="grid-3">
            {portfolioData.map(client => (
              <div key={client.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 190, overflow: 'hidden' }}>
                  <img src={client.image} alt={client.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>{client.category}</span>
                  <h3 style={{ margin: '0.3rem 0 0.4rem', fontSize: '1.1rem' }}>{client.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.5 }}>{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEM Education Division Block */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '2.5rem', background: 'var(--white)', borderLeft: '6px solid var(--accent)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
               <div>
                <span className="label" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>EDUCATION DIVISION</span>
                <h2>Robotics & AI Learning for <span className="accent-text">School Students</span></h2>
                <p style={{ color: 'var(--text-dim)', margin: '0.85rem 0 1.25rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  We set up complete STEM Robotics labs and supply 11 exclusive hardware kits to premier partner schools like <strong>London Pre School (Sec 116, Noida)</strong>. Hands-on coding and robotics for Nursery to 8th class.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/academy/kits" className="btn btn-accent btn-sm">Shop Robotics Kits <i className="fas fa-boxes"></i></Link>
                  <Link to="/academy/programs" className="btn btn-outline-accent btn-sm">View School Curriculum</Link>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src="/img/new_assets/kit_showcase.png" alt="Robotics Kits" style={{ borderRadius: 'var(--radius-lg)', maxWidth: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Testimonials</span>
            <h2>What Principals & Directors <span className="primary-text">Say</span></h2>
          </div>
          <div className="grid-3">
            {testimonialsData.map(t => (
              <div key={t.id} className="card testimonial-card">
                <div className="testimonial-stars">{[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className={`testimonial-avatar${t.avatarColor === 'red' ? ' red' : ''}`}>{t.initials}</div>
                  <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner with High-Contrast Visible Buttons */}
      <div className="container">
        <section className="cta-banner">
          <h2>Ready to Automate & Scale Your Business?</h2>
          <p>Book a demo for SchoolOS, LogDay HRMS, HIMS, or discuss custom digital marketing for your school.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-accent btn-lg">Request Software Demo <i className="fas fa-desktop"></i></Link>
            <Link to="/saas" className="btn btn-white btn-lg">Explore SaaS Suite <i className="fas fa-arrow-right"></i></Link>
          </div>
        </section>
      </div>
    </>
  );
}
