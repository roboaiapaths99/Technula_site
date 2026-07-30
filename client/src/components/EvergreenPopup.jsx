import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';

export default function EvergreenPopup() {
  const [open, setOpen] = useState(false);
  const { showToast } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', interest: 'SchoolOS ERP (Schools)' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Show popup after 6 seconds if not already shown in current session
    const shown = sessionStorage.getItem('technula_popup_shown');
    if (!shown) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem('technula_popup_shown', 'true');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      showToast('Please enter valid 10-digit mobile number', 'error');
      return;
    }
    setSubmitting(true);

    try {
      await api.post('/lead', {
        name: formData.name,
        phone: formData.phone,
        courseInterest: formData.interest,
        source: 'Evergreen Modal Pop-up'
      });
      showToast('Thank you! Our senior consultant will call you shortly for a live demo.', 'success');
      setOpen(false);
    } catch {
      showToast('Thank you! Our consultant will contact you shortly.', 'success');
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)} style={{ zIndex: 10000 }}>
      <div className="modal-box" style={{ maxWidth: 480, padding: 0, overflow: 'hidden', position: 'relative' }} onClick={e => e.stopPropagation()}>
        {/* Top Banner with prominent close button */}
        <div style={{ background: 'var(--gradient-cta)', padding: '2rem', color: '#fff', position: 'relative' }}>
          <button 
            onClick={() => setOpen(false)}
            style={{ 
              position: 'absolute', top: '1rem', right: '1rem', 
              background: 'rgba(255,255,255,0.25)', border: 'none', color: '#fff', 
              width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '1.2rem', fontWeight: 'bold', zIndex: 20
            }}
            title="Close Pop-up"
            aria-label="Close Pop-up"
          >
            ✕
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <img 
              src="/img/logo_icon.png" 
              alt="Technula Logo" 
              style={{ width: 30, height: 30, borderRadius: '6px', background: '#fff', padding: '2px', objectFit: 'contain' }} 
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.95 }}>Exclusive Consultation</span>
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', marginTop: '0.3rem' }}>Transform Your Operations with Technula</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem', lineHeight: 1.5 }}>
            Book a 1-on-1 demo for SchoolOS, LogDay HRMS, HIMS, or explore STEM Robotics labs for your school.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Your Name *</label>
            <input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Mobile Number *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="form-input" style={{ width: 'auto', background: 'var(--card-border)' }}>+91</span>
              <input className="form-input" style={{ flex: 1 }} type="tel" maxLength={10} required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="9876543210" />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Interested Solution</label>
            <select className="form-select" value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })}>
              <option value="SchoolOS ERP (Schools)">SchoolOS ERP (School Management)</option>
              <option value="LogDay HRMS Demo">LogDay HRMS (Field, Office & WFH)</option>
              <option value="HIMS Hospital System">HIMS Enterprise (Hospital System)</option>
              <option value="StockMaster E-Commerce">StockMaster Inventory & E-Commerce</option>
              <option value="FitOS Gym App">FitOS Gym App</option>
              <option value="360° Digital Marketing">360° Digital & Social Media Marketing</option>
              <option value="STEM Robotics Kits">STEM Robotics Kits & School Lab Setup</option>
            </select>
          </div>

          <button className="btn btn-accent btn-lg" style={{ width: '100%', justifyContent: 'center' }} type="submit" disabled={submitting}>
            {submitting ? 'Saving Lead...' : 'Get Instant Demo & Pricing'} <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
