import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Rebrand Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #0A4D8C 0%, #0891B2 50%, #D2112C 100%)',
        color: '#ffffff',
        padding: '0.45rem 1rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        position: 'relative',
        zIndex: 1002,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <span style={{
          background: 'rgba(255, 255, 255, 0.22)',
          padding: '0.15rem 0.6rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Rebrand Note
        </span>
        <span>
          <strong>RoboAIPaths is now Technula.</strong> Same team. Same vision. A new name for a bigger future and new innovations.
        </span>
      </div>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} style={!scrolled ? { top: '34px' } : { top: 0 }}>
        <div className="container">
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/img/technula_lockup_clean.png" 
            alt="TECHNULA - Innovate. Integrate. Inspire." 
            style={{
              height: '46px',
              width: 'auto',
              maxHeight: '46px',
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        </Link>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/saas" onClick={() => setMenuOpen(false)}>SaaS Solutions</NavLink>
          <NavLink to="/academy" end onClick={() => setMenuOpen(false)}>STEM Academy</NavLink>
          <NavLink to="/academy/kits" onClick={() => setMenuOpen(false)}>Robotics Kits</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          
          <button 
            className="cart-icon" 
            onClick={() => { setIsCartOpen(true); setMenuOpen(false); }}
            style={{ background: 'none', border: 'none', padding: 0 }}
            aria-label="Open Shopping Cart Drawer"
          >
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        <Link to="/contact" className="btn btn-primary btn-sm nav-cta">Get Started</Link>

        <button className={`mobile-toggle-btn ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    </>
  );
}
