import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      {/* Rebrand Announcement Bar */}
      <div className="rebrand-top-bar">
        <span className="rebrand-badge">
          Rebrand Note
        </span>
        <span>
          <strong>RoboAIAPaths is now Technula.</strong> Same team. Same vision. A new name for a bigger future and new innovations.
        </span>
      </div>

      {/* Navigation Bar */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/img/technula_lockup_clean.png" 
              alt="TECHNULA - Innovate. Integrate. Inspire." 
              className="nav-logo"
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
    </header>
  );
}
