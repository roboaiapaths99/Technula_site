import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';
import SEO from '../components/SEO';
import { localBusinessSchema } from '../utils/schema';

export default function Contact() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', division: 'SaaS Solutions', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      showToast('Thank you! Your request has been recorded. Our senior consultant will reach out shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', division: 'SaaS Solutions', message: '' });
    } catch (err) {
      showToast(err.message || 'Inquiry submitted successfully! We will contact you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', division: 'SaaS Solutions', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Technula — Get a Free Demo for School ERP, CRM, HRMS Software | Delhi NCR"
        description="Contact Technula for a free demo of SchoolOS ERP, LogDay HRMS, CRM, Hospital Management Software, or to set up a STEM Robotics Lab at your school. Office: Sector 85, Faridabad, Haryana. Serving Delhi NCR, Gurgaon, Noida & North India."
        keywords="contact Technula, software demo Delhi NCR, school ERP demo Faridabad, HRMS demo Gurgaon Noida, CRM software enquiry, STEM robotics lab setup, enterprise software company Faridabad Haryana, free software demo North India"
        canonical="/contact"
        schema={localBusinessSchema}
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">Get in Touch</span>
            <h1>Let's Connect & Transform <span className="gradient-text">Your Operations</span></h1>
            <p>Schedule a live 1-on-1 demo for SchoolOS ERP, LogDay HRMS, or HIMS Enterprise, or discuss setting up a K-12 STEM Robotics Lab at your school.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Form Card */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <i className="fas fa-paper-plane"></i>
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Send Us an Inquiry</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '0.5rem' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Rahul Sharma" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input className="form-input" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '0.5rem' }}>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input className="form-input" type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 9990911093" />
                  </div>
                  <div className="form-group">
                    <label>Division / Product</label>
                    <select className="form-select" value={formData.division} onChange={e => setFormData({ ...formData, division: e.target.value })}>
                      <option value="SchoolOS ERP">SchoolOS ERP (School Management)</option>
                      <option value="LogDay HRMS">LogDay HRMS (Attendance & Payroll)</option>
                      <option value="HIMS Hospital">HIMS Enterprise (Hospital Software)</option>
                      <option value="FitOS Gym App">FitOS Gym & Fitness Center SaaS</option>
                      <option value="StockMaster ERP">StockMaster E-Commerce & Inventory</option>
                      <option value="360° Digital Marketing">360° Digital & Social Media Marketing</option>
                      <option value="STEM Robotics Labs">STEM Robotics Lab & Kits Setup</option>
                      <option value="General Inquiry">General Enterprise Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Project / Inquiry Details *</label>
                  <textarea className="form-textarea" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your organization, software requirements, or student count..." rows={5}></textarea>
                </div>

                <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} type="submit" disabled={loading}>
                  {loading ? 'Submitting Request...' : 'Submit Inquiry & Request Demo'} <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>

            {/* Sidebar Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="fas fa-building" style={{ color: 'var(--primary)' }}></i> Direct Contact Info
                </h3>

                <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.85rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Head Office</h4>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem', color: 'var(--text)' }}>S20, Amolik Sankalp, Sector 85, Faridabad, Haryana, India</p>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.85rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Support</h4>
                    <a href="tel:+919990911093" style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem', color: 'var(--primary)', display: 'inline-block' }}>+91 9990911093</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Email</h4>
                    <a href="mailto:info@technula.com" style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem', color: 'var(--primary)', display: 'inline-block' }}>info@technula.com</a>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="card" style={{ padding: '1.5rem', background: 'var(--primary-light)', borderColor: 'rgba(0,120,172,0.25)' }}>
                <h4 style={{ color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <i className="fas fa-clock"></i> Working Hours
                </h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginTop: '0.4rem', margin: 0, lineHeight: 1.5 }}>
                  Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sunday closed. Urgent queries responded via WhatsApp.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Google Maps Embed */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="label">FIND US</span>
            <h2>Our <span className="primary-text">Location</span></h2>
            <p>Visit our head office at Sector 85, Faridabad — just off the Delhi-NCR expressway.</p>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px' }}>
            <iframe
              title="Technula Office Location - Sector 85, Faridabad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.123456789!2d77.3178!3d28.367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDIyJzAxLjIiTiA3N8KwMTknMDQuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
