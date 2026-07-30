import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { kitsData } from '../data/kitsData';
import { testimonialsData } from '../data/siteData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { academySchema } from '../utils/schema';

export default function AcademyHome() {
  const { addToCart } = useCart();
  const featuredKits = kitsData.filter(k => !k.isOutOfStock).slice(0, 4);

  return (
    <>
      <SEO
        title="STEM Robotics Academy — Coding, AI & Robotics Courses for K-12 Schools | Technula Delhi NCR"
        description="Technula STEM Academy offers hands-on robotics, coding, and AI education for K-12 school students. DIY robotics kits, Arduino projects, Python & Scratch courses. Serving schools in Faridabad, Delhi NCR, Gurgaon, Noida & North India."
        keywords="STEM robotics courses Delhi NCR, coding classes for kids Faridabad, robotics kits for schools India, AI education K-12, Arduino projects students, best robotics academy North India, Technula STEM Academy, school robotics lab setup Gurgaon Noida"
        canonical="/academy"
        schema={academySchema}
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge" style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'rgba(210,17,44,0.15)' }}>STEM Education for Young Innovators</span>
            <h1>Robotics & AI Learning for the <span className="accent-text">Innovators</span> of Tomorrow</h1>
            <p>Hands-on STEM education for Nursery to 8th standard. Learn Robotics, AI, and Coding through real projects with expert mentorship.</p>
            <div className="hero-btns">
              <Link to="/academy/programs" className="btn btn-accent btn-lg">Explore Courses <i className="fas fa-arrow-right"></i></Link>
              <Link to="/academy/kits" className="btn btn-outline btn-lg">Shop Kits <i className="fas fa-shopping-bag"></i></Link>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Certified Trainers', 'Global Curriculum', '1:1 Support'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--primary)' }}></i>{badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kits */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Hands-On Learning</span>
            <h2>Robotics Kits <span className="primary-text">We Offer</span></h2>
            <p>Explore our exclusive range of robotics kits designed to make learning intuitive and fun.</p>
          </div>
          <div className="grid-4">
            {featuredKits.map(kit => (
              <div key={kit.id} className="card kit-card">
                <div className="kit-image"><img src={kit.image} alt={kit.name} loading="lazy" /></div>
                <div className="kit-info">
                  <h4 className="kit-name">{kit.name}</h4>
                  <div className="kit-price">
                    <span className="price-current">{formatCurrency(kit.price)}</span>
                    <span className="price-mrp">{formatCurrency(kit.mrp)}</span>
                  </div>
                  <div className="kit-actions">
                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(kit)}>Add to Cart</button>
                    <Link to={`/academy/kits/${kit.id}`} className="btn btn-outline btn-sm">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/academy/kits" className="btn btn-outline">View All 11 Kits <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="label">Explore Programs</span>
            <h2>Our <span className="primary-text">Courses</span></h2>
            <p>Age-wise robotics, AI, coding and STEM programs from beginner to advanced levels.</p>
          </div>
          <div className="grid-2">
            {coursesData.slice(0, 4).map(course => (
              <div key={course.id} className="card course-card">
                <div className="course-header">
                  <span className={`level-badge ${course.badgeClass}`}>{course.level}</span>
                  <h3 style={{ marginTop: '0.5rem' }}><i className={course.icon} style={{ marginRight: '0.5rem', color: 'var(--primary)' }}></i>{course.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{course.ageGroup} • {course.classFor}</p>
                </div>
                <div className="course-body">
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1rem' }}>{course.description}</p>
                  <Link to="/contact" className="btn btn-primary btn-sm">Book Demo <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/academy/programs" className="btn btn-outline">View All Programs <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* Why Parents Trust */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">The Advantage</span>
            <h2>Why Parents <span className="accent-text">Trust Us</span></h2>
          </div>
          <div className="grid-3">
            {[
              { icon: 'fas fa-user-tie', title: 'Expert Mentorship', desc: 'Led by Rashmi Kansal — 15+ years experience in Computer Science, STEM, and Psychology. M.Ed, M.Sc.' },
              { icon: 'fas fa-globe', title: 'Global Curriculum', desc: 'Comprehensive curriculum covering basic circuits to advanced AI, tailored for different age groups.' },
              { icon: 'fas fa-clock', title: 'Flexible Learning', desc: 'Choose between online interactive classes or in-person hands-on workshops. We adapt to your schedule.' }
            ].map((item, i) => (
              <div key={i} className="card service-card">
                <div className="service-icon"><i className={item.icon}></i></div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <span className="label" style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>OUR MISSION</span>
              <h2>Shaping Young Minds for a <span className="gradient-text">Digital Future</span></h2>
              <p style={{ color: 'var(--text-dim)', margin: '1.5rem 0', lineHeight: 1.8, fontSize: '1.05rem' }}>We believe every child is an innovator. Our mission is to provide the skills, tools, and mentorship needed to turn their curiosity into creation.</p>
              {['No-Hassle Training from Home', 'Flexible Batches & 1:1 Attention', 'Competition Preparation'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: 30, height: 30, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-check" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}></i>
                  </div>
                  <span style={{ fontWeight: 600 }}>{item}</span>
                </div>
              ))}
              <Link to="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Read Our Story</Link>
            </div>
            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <img src="/img/new_assets/hero_family_1.png" alt="Students learning robotics" style={{ borderRadius: 'var(--radius-lg)', width: '100%' }} loading="lazy" />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: '#fff', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ color: 'var(--primary)', margin: 0 }}>1000+</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)' }}>Students Trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="label">Our Leadership</span>
            <h2>Meet Our <span className="primary-text">Educators & Engineers</span></h2>
          </div>
          <div style={{ maxWidth: 300, margin: '0 auto' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: 140, height: 140, borderRadius: '50%', margin: '0 auto 1.5rem', overflow: 'hidden', border: '4px solid var(--primary)' }}>
                <img src="/img/about/rashmi.jpeg" alt="Rashmi Kansal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
              <h4>Rashmi Kansal</h4>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, margin: '0.5rem 0' }}>Founder & Lead Educator</span>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.5rem' }}>15+ years experience in Computer Science, STEM, and Psychology. M.Ed, M.Sc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="label">Reviews</span>
            <h2>What Parents <span className="accent-text">Say</span></h2>
          </div>
          <div className="grid-3">
            {testimonialsData.filter(t => t.division === 'academy').map(t => (
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

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Build the <span style={{ color: '#FFD700' }}>Future?</span></h2>
          <p>Join hundreds of young innovators transforming their ideas into reality with Technula Academy.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-white btn-lg">Enroll Now <i className="fas fa-rocket"></i></Link>
            <Link to="/academy/programs" className="btn btn-lg" style={{ border: '2px solid #fff', color: '#fff' }}>View All Courses</Link>
          </div>
        </div>
      </section>
    </>
  );
}
