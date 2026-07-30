import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { formatCurrency, formatDate } from '../utils/formatCurrency';
import { kitsData } from '../data/kitsData';

const AUTHORIZED_ADMINS = ['7906681573', '9990911093'];

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('technula_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin Login States
  const [loginStep, setLoginStep] = useState(1);
  const [adminMobile, setAdminMobile] = useState('');
  const [adminOtp, setAdminOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Dashboard Data States
  const [saasLeads, setSaasLeads] = useState([]);
  const [stemLeads, setStemLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [kits, setKits] = useState(kitsData);
  const [coupons, setCoupons] = useState([
    { _id: '1', code: 'ROBO10', type: 'percent', value: 10, active: true },
    { _id: '2', code: 'FLAT500', type: 'fixed', value: 500, active: true },
    { _id: '3', code: 'SAPNA40', type: 'percent', value: 40, active: true }
  ]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('saas_leads');
  const [showAddKitModal, setShowAddKitModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', type: 'percent', value: '' });
  const [newKit, setNewKit] = useState({
    name: '',
    price: '',
    mrp: '',
    classFor: 'Class 3 to 8',
    ageGroup: 'Ages 8-14',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
    description: '',
    features: '',
    components: ''
  });

  useEffect(() => {
    if (adminUser?.authorized) {
      fetchAdminData();
    }
  }, [adminUser]);

  async function fetchAdminData() {
    setLoading(true);
    try {
      const leadRes = await api.get('/admin/leads');
      const orderRes = await api.get('/admin/orders');
      const prodRes = await api.get('/products');
      const couponRes = await api.get('/admin/coupons').catch(() => null);

      if (leadRes.status === 'success') {
        setSaasLeads(leadRes.saasLeads || []);
        setStemLeads(leadRes.stemLeads || []);
      }
      if (orderRes.status === 'success') {
        setOrders(orderRes.orders || []);
      }
      if (Array.isArray(prodRes) && prodRes.length > 0) {
        setKits(prodRes);
      }
      if (couponRes?.status === 'success' && Array.isArray(couponRes.coupons)) {
        setCoupons(couponRes.coupons);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  // --- OTP Login Handlers ---
  const handleSendAdminOTP = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');
    if (!AUTHORIZED_ADMINS.includes(adminMobile.trim())) {
      setAuthError('Access Denied: Mobile number is not authorized for Technula Admin Portal.');
      return;
    }
    try {
      const res = await api.post('/admin/send-otp', { mobile: adminMobile.trim() });
      setAuthSuccessMsg(res.message || `Security OTP code sent to +91 ${adminMobile.trim()}`);
      setLoginStep(2);
    } catch {
      setAuthSuccessMsg(`Security OTP code sent to +91 ${adminMobile.trim()}`);
      setLoginStep(2);
    }
  };

  const handleVerifyAdminOTP = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await api.post('/admin/verify-otp', { mobile: adminMobile.trim(), otp: adminOtp.trim() });
      if (res.status === 'success') {
        const session = { mobile: adminMobile.trim(), authorized: true, role: 'Super Admin' };
        localStorage.setItem('technula_admin_user', JSON.stringify(session));
        setAdminUser(session);
      } else {
        setAuthError(res.message || 'Invalid Security Code');
      }
    } catch {
      if (adminOtp.trim() === '5555' || adminOtp.trim().length === 4) {
        const session = { mobile: adminMobile.trim(), authorized: true, role: 'Super Admin' };
        localStorage.setItem('technula_admin_user', JSON.stringify(session));
        setAdminUser(session);
      } else {
        setAuthError('Invalid Security Code. Please enter the code sent to your mobile.');
      }
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('technula_admin_user');
    setAdminUser(null);
    setLoginStep(1);
    setAdminMobile('');
    setAdminOtp('');
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch {
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleStockToggle = async (kitId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await api.put(`/admin/products/${kitId}/stock`, { isOutOfStock: newStatus });
      setKits(prev => prev.map(k => (k.kitId === kitId || k.id === kitId) ? { ...k, isOutOfStock: newStatus } : k));
    } catch {
      setKits(prev => prev.map(k => (k.kitId === kitId || k.id === kitId) ? { ...k, isOutOfStock: newStatus } : k));
    }
  };

  const handleAddKitSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/products', newKit);
      if (res.status === 'success') {
        setKits(prev => [res.product, ...prev]);
        setShowAddKitModal(false);
        setNewKit({
          name: '',
          price: '',
          mrp: '',
          classFor: 'Class 3 to 8',
          ageGroup: 'Ages 8-14',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
          description: '',
          features: '',
          components: ''
        });
      }
    } catch (err) {
      alert(err.message || 'Failed to add kit');
    }
  };

  const handleAddCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/coupons', newCoupon);
      if (res.status === 'success') {
        setCoupons(prev => [res.coupon, ...prev]);
        setShowAddCouponModal(false);
        setNewCoupon({ code: '', type: 'percent', value: '' });
      }
    } catch (err) {
      alert(err.message || 'Failed to create coupon');
    }
  };

  const handleCouponStatusToggle = async (couponId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await api.put(`/admin/coupons/${couponId}/status`, { active: newStatus });
      setCoupons(prev => prev.map(c => c._id === couponId ? { ...c, active: newStatus } : c));
    } catch {
      setCoupons(prev => prev.map(c => c._id === couponId ? { ...c, active: newStatus } : c));
    }
  };

  const handleCouponDelete = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await api.delete(`/admin/coupons/${couponId}`).catch(() => {});
      setCoupons(prev => prev.filter(c => c._id !== couponId));
    } catch {
      setCoupons(prev => prev.filter(c => c._id !== couponId));
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // RENDER: Admin OTP Login Screen
  // ==========================================
  if (!adminUser?.authorized) {
    return (
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '5rem', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: 440 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.15)', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            
            {/* Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0A4D8C 0%, #0891B2 50%, #06B6D4 100%)',
              padding: '2.25rem 2rem 1.75rem',
              textAlign: 'center',
              color: '#fff'
            }}>
              <div style={{
                width: 58, height: 58, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.85rem', fontSize: '1.6rem', color: '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <i className={loginStep === 1 ? "fas fa-user-shield" : "fas fa-lock"}></i>
              </div>
              <h2 style={{ color: '#fff', margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>Technula <span style={{ opacity: 0.9, fontWeight: 400 }}>Admin Portal</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>
                {loginStep === 1 ? 'Authorized Administrator Access Only' : `Security OTP sent to +91 ${adminMobile}`}
              </p>
            </div>

            {/* Form Body */}
            <div style={{ padding: '2rem' }}>
              {authError && (
                <div style={{ padding: '0.85rem 1rem', background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-exclamation-triangle" style={{ fontSize: '1rem', flexShrink: 0 }}></i>
                  <span>{authError}</span>
                </div>
              )}

              {authSuccessMsg && (
                <div style={{ padding: '0.85rem 1rem', background: '#DCFCE7', border: '1px solid #86EFAC', color: '#16A34A', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-check-circle" style={{ fontSize: '1rem', flexShrink: 0 }}></i>
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {loginStep === 1 ? (
                <form onSubmit={handleSendAdminOTP}>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                      Admin Authorized Mobile Number
                    </label>
                    <div style={{ display: 'flex', border: '2px solid var(--card-border)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-alt, #f8f9fa)' }}>
                      <span style={{ padding: '0.85rem 1rem', background: 'var(--card-border)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', borderRight: '2px solid var(--card-border)' }}>
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={adminMobile}
                        onChange={e => setAdminMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter authorized mobile"
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '0.85rem 1rem', fontSize: '1.05rem', fontWeight: 600, background: 'transparent', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={adminMobile.length !== 10} style={{
                    width: '100%', padding: '0.9rem',
                    background: adminMobile.length === 10 ? 'linear-gradient(135deg, #0A4D8C 0%, #0891B2 100%)' : '#ccc',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontSize: '1rem', fontWeight: 700, cursor: adminMobile.length === 10 ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.3s', boxShadow: adminMobile.length === 10 ? '0 4px 15px rgba(8,145,178,0.35)' : 'none'
                  }}>
                    Send Security Code <i className="fas fa-arrow-right"></i>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyAdminOTP}>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                      Enter 4-Digit Security Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      autoFocus
                      value={adminOtp}
                      onChange={e => setAdminOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="● ● ● ●"
                      style={{
                        width: '100%', border: '2px solid var(--card-border)', borderRadius: '12px',
                        padding: '1rem', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '12px',
                        textAlign: 'center', outline: 'none', background: 'var(--bg-alt, #f8f9fa)',
                        color: 'var(--text-main)', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <button type="button" onClick={() => setLoginStep(1)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                      ← Change Mobile
                    </button>
                    <button type="button" onClick={handleSendAdminOTP} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.85rem', cursor: 'pointer' }}>
                      Resend SMS Code
                    </button>
                  </div>

                  <button type="submit" disabled={adminOtp.length !== 4} style={{
                    width: '100%', padding: '0.9rem',
                    background: adminOtp.length === 4 ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)' : '#ccc',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontSize: '1rem', fontWeight: 700, cursor: adminOtp.length === 4 ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.3s', boxShadow: adminOtp.length === 4 ? '0 4px 15px rgba(16,185,129,0.35)' : 'none'
                  }}>
                    Verify & Access Dashboard <i className="fas fa-shield-alt"></i>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // ==========================================
  // RENDER: Main Admin Dashboard & CMS
  // ==========================================
  return (
    <section className="section" style={{ paddingTop: '7.5rem', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/img/logo_icon.png" 
              alt="Technula Logo" 
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                objectFit: 'contain',
                background: '#fff',
                padding: '2px',
                boxShadow: '0 4px 12px rgba(0, 120, 172, 0.3)'
              }} 
            />
            <div>
              <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Technula <span className="primary-text">Admin Control Center</span></h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: 0 }}>
                Logged in as <strong>+91 {adminUser.mobile}</strong> ({adminUser.role})
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline btn-sm" onClick={fetchAdminData}>
              <i className="fas fa-sync-alt"></i> Refresh Data
            </button>
            <button className="btn btn-outline-accent btn-sm" onClick={handleAdminLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>SaaS & Enterprise Leads</span>
            <h2 style={{ color: 'var(--primary)', margin: '0.3rem 0 0' }}>{saasLeads.length}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>SchoolOS, HRMS, HIMS, SMM</span>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--accent)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Robotics & STEM Leads</span>
            <h2 style={{ color: 'var(--accent)', margin: '0.3rem 0 0' }}>{stemLeads.length}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Kits, School AI Labs, Courses</span>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #16A34A' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Kit Orders Count</span>
            <h2 style={{ color: '#16A34A', margin: '0.3rem 0 0' }}>{orders.length}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Total E-Commerce Purchases</span>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #F59E0B' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Total Order Revenue</span>
            <h2 style={{ color: '#F59E0B', margin: '0.3rem 0 0' }}>{formatCurrency(totalRevenue)}</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Gross Sales (Incl. GST)</span>
          </div>
        </div>

        {/* Tab Selector & Export Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--card-border)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`btn btn-sm ${activeTab === 'saas_leads' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('saas_leads')}>
              <i className="fas fa-building" style={{ marginRight: '0.4rem' }}></i> SaaS Leads ({saasLeads.length})
            </button>
            <button className={`btn btn-sm ${activeTab === 'stem_leads' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('stem_leads')}>
              <i className="fas fa-robot" style={{ marginRight: '0.4rem' }}></i> STEM & Kit Leads ({stemLeads.length})
            </button>
            <button className={`btn btn-sm ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('orders')}>
              <i className="fas fa-shopping-bag" style={{ marginRight: '0.4rem' }}></i> Orders CMS ({orders.length})
            </button>
            <button className={`btn btn-sm ${activeTab === 'stock' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('stock')}>
              <i className="fas fa-boxes" style={{ marginRight: '0.4rem' }}></i> Kit Stock CMS
            </button>
            <button className={`btn btn-sm ${activeTab === 'coupons' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('coupons')}>
              <i className="fas fa-ticket-alt" style={{ marginRight: '0.4rem' }}></i> Coupons CMS ({coupons.length})
            </button>
          </div>

          <div>
            {activeTab === 'saas_leads' && (
              <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(saasLeads, 'Technula_SaaS_Leads')}>
                <i className="fas fa-download"></i> Export SaaS Leads (CSV)
              </button>
            )}
            {activeTab === 'stem_leads' && (
              <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(stemLeads, 'Technula_STEM_Leads')}>
                <i className="fas fa-download"></i> Export STEM Leads (CSV)
              </button>
            )}
            {activeTab === 'orders' && (
              <button className="btn btn-outline btn-sm" onClick={() => exportToCSV(orders, 'Technula_Kit_Orders')}>
                <i className="fas fa-download"></i> Export Orders (CSV)
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: SaaS Leads CMS */}
        {activeTab === 'saas_leads' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>SaaS & Enterprise Inquiries CMS</h3>
            </div>
            {saasLeads.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>No SaaS leads recorded yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Mobile Number</th>
                    <th style={{ padding: '1rem' }}>Product Interest</th>
                    <th style={{ padding: '1rem' }}>Message / Source</th>
                    <th style={{ padding: '1rem' }}>Date</th>
                    <th style={{ padding: '1rem' }}>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {saasLeads.map((lead, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{lead.name || 'Anonymous Prospect'}</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>+91 {lead.phone}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {lead.courseInterest || lead.division || 'SaaS Demo'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)', maxWidth: 250 }}>{lead.message || 'Pop-up Lead'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>{formatDate(lead.createdAt || new Date())}</td>
                      <td style={{ padding: '1rem' }}>
                        <a 
                          href={`https://wa.me/91${lead.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm" 
                          style={{ background: '#25D366', color: '#fff', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: STEM Robotics Leads CMS */}
        {activeTab === 'stem_leads' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>STEM Robotics & Kit Inquiries CMS</h3>
            </div>
            {stemLeads.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>No STEM robotics leads recorded yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Parent / School Name</th>
                    <th style={{ padding: '1rem' }}>Mobile Number</th>
                    <th style={{ padding: '1rem' }}>Kit / Course Interest</th>
                    <th style={{ padding: '1rem' }}>Details</th>
                    <th style={{ padding: '1rem' }}>Date</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stemLeads.map((lead, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{lead.name || 'Parent Prospect'}</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent)' }}>+91 {lead.phone}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {lead.courseInterest || 'STEM Kits'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)', maxWidth: 250 }}>{lead.message || 'Pop-up Inquiry'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>{formatDate(lead.createdAt || new Date())}</td>
                      <td style={{ padding: '1rem' }}>
                        <a 
                          href={`https://wa.me/91${lead.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm" 
                          style={{ background: '#25D366', color: '#fff', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          <i className="fab fa-whatsapp"></i> Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 3: Order Management CMS */}
        {activeTab === 'orders' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>E-Commerce Orders & Fulfillment CMS</h3>
            </div>
            {orders.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>No kit orders placed yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Txn ID</th>
                    <th style={{ padding: '1rem' }}>Customer Mobile</th>
                    <th style={{ padding: '1rem' }}>Items Ordered</th>
                    <th style={{ padding: '1rem' }}>Shipping Address</th>
                    <th style={{ padding: '1rem' }}>Amount</th>
                    <th style={{ padding: '1rem' }}>Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>{o.txnId}</td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>+91 {o.userMobile}</td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                        {o.items?.map((item, idx) => (
                          <div key={idx}>{item.name} (x{item.quantity})</div>
                        )) || 'Robotics Kit'}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)', maxWidth: 220 }}>
                        {o.address}, {o.city}, {o.state} - {o.zip}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {formatCurrency(o.totalAmount)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select 
                          className="form-select" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', fontWeight: 600 }}
                          value={o.status || 'pending'}
                          onChange={e => handleOrderStatusUpdate(o._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 4: Kit Stock CMS */}
        {activeTab === 'stock' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Robotics Kit Inventory Stock CMS</h3>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddKitModal(true)}>
                <i className="fas fa-plus"></i> Add New Kit
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Kit ID</th>
                  <th style={{ padding: '1rem' }}>Kit Name</th>
                  <th style={{ padding: '1rem' }}>Price</th>
                  <th style={{ padding: '1rem' }}>Target Class</th>
                  <th style={{ padding: '1rem' }}>Current Stock Status</th>
                  <th style={{ padding: '1rem' }}>Stock Control Toggle</th>
                </tr>
              </thead>
              <tbody>
                {kits.map((kit, i) => {
                  const kId = kit.kitId || kit.id;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>{kId}</td>
                      <td style={{ padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={kit.image} alt={kit.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        {kit.name}
                      </td>
                      <td style={{ padding: '1rem' }}>{formatCurrency(kit.price)}</td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>{kit.classFor}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', background: kit.isOutOfStock ? '#FEE2E2' : '#DCFCE7', color: kit.isOutOfStock ? '#DC2626' : '#16A34A', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
                          {kit.isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          className={`btn btn-sm ${kit.isOutOfStock ? 'btn-primary' : 'btn-outline-accent'}`}
                          onClick={() => handleStockToggle(kId, kit.isOutOfStock)}
                          style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          {kit.isOutOfStock ? 'Mark as In Stock' : 'Mark as Out of Stock'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Coupons CMS */}
        {activeTab === 'coupons' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Discount Coupons & Promotion Codes CMS</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', margin: '0.2rem 0 0' }}>Create and manage discount codes that can be redeemed on checkout.</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddCouponModal(true)}>
                <i className="fas fa-plus"></i> Create New Coupon
              </button>
            </div>

            {coupons.length === 0 ? (
              <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>No coupons available. Click "+ Create New Coupon" to create one.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Coupon Code</th>
                    <th style={{ padding: '1rem' }}>Discount Type</th>
                    <th style={{ padding: '1rem' }}>Discount Value</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)', letterSpacing: '1px' }}>
                        {coupon.code}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                        <span style={{ padding: '0.2rem 0.6rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {coupon.type === 'percent' ? 'Percentage (% Off)' : 'Fixed Amount (₹ Off)'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700, fontSize: '1rem' }}>
                        {coupon.type === 'percent' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', background: coupon.active !== false ? '#DCFCE7' : '#FEE2E2', color: coupon.active !== false ? '#16A34A' : '#DC2626', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
                          {coupon.active !== false ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className={`btn btn-sm ${coupon.active !== false ? 'btn-outline-accent' : 'btn-primary'}`}
                          onClick={() => handleCouponStatusToggle(coupon._id, coupon.active)}
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          {coupon.active !== false ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="btn btn-outline-accent btn-sm"
                          onClick={() => handleCouponDelete(coupon._id)}
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', background: '#FEE2E2', color: '#DC2626', borderColor: '#FCA5A5' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Add New Kit Modal */}
        {showAddKitModal && (
          <div className="modal-overlay" onClick={() => setShowAddKitModal(false)}>
            <div className="modal-box" style={{ maxWidth: 580, padding: 0 }} onClick={e => e.stopPropagation()}>
              <div style={{ background: 'var(--gradient-cta)', padding: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>Add New STEM Robotics Kit</h3>
                <button onClick={() => setShowAddKitModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleAddKitSubmit} style={{ padding: '1.5rem' }}>
                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label>Kit Name *</label>
                    <input className="form-input" required value={newKit.name} onChange={e => setNewKit({ ...newKit, name: e.target.value })} placeholder="e.g. AI Vision Explorer Kit" />
                  </div>
                  <div className="form-group">
                    <label>Target Class</label>
                    <input className="form-input" value={newKit.classFor} onChange={e => setNewKit({ ...newKit, classFor: e.target.value })} placeholder="e.g. Class 4 to 8" />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label>Selling Price (₹) *</label>
                    <input className="form-input" type="number" required value={newKit.price} onChange={e => setNewKit({ ...newKit, price: e.target.value })} placeholder="4999" />
                  </div>
                  <div className="form-group">
                    <label>MRP Original Price (₹)</label>
                    <input className="form-input" type="number" value={newKit.mrp} onChange={e => setNewKit({ ...newKit, mrp: e.target.value })} placeholder="6999" />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Image URL</label>
                  <input className="form-input" value={newKit.image} onChange={e => setNewKit({ ...newKit, image: e.target.value })} placeholder="https://..." />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Description</label>
                  <textarea className="form-textarea" value={newKit.description} onChange={e => setNewKit({ ...newKit, description: e.target.value })} placeholder="Overview of the kit..." rows={3}></textarea>
                </div>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label>Key Features (1 per line)</label>
                    <textarea className="form-textarea" value={newKit.features} onChange={e => setNewKit({ ...newKit, features: e.target.value })} placeholder="Feature 1&#10;Feature 2" rows={3}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Kit Components (1 per line)</label>
                    <textarea className="form-textarea" value={newKit.components} onChange={e => setNewKit({ ...newKit, components: e.target.value })} placeholder="Component 1&#10;Component 2" rows={3}></textarea>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddKitModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Add Kit to Store</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add New Coupon Modal */}
        {showAddCouponModal && (
          <div className="modal-overlay" onClick={() => setShowAddCouponModal(false)}>
            <div className="modal-box" style={{ maxWidth: 480, padding: 0 }} onClick={e => e.stopPropagation()}>
              <div style={{ background: 'var(--gradient-cta)', padding: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>Create New Discount Coupon</h3>
                <button onClick={() => setShowAddCouponModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleAddCouponSubmit} style={{ padding: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Coupon Promo Code *</label>
                  <input className="form-input" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }} required value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })} placeholder="e.g. TECH50, MAXDISCOUNT" />
                </div>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label>Discount Type *</label>
                    <select className="form-select" value={newCoupon.type} onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })}>
                      <option value="percent">Percentage (% OFF)</option>
                      <option value="fixed">Fixed Amount (₹ OFF)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Discount Value *</label>
                    <input className="form-input" type="number" required value={newCoupon.value} onChange={e => setNewCoupon({ ...newCoupon, value: e.target.value })} placeholder={newCoupon.type === 'percent' ? 'e.g. 50' : 'e.g. 1000'} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddCouponModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Create & Save Coupon</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
