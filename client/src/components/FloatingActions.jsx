import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 9998 }}>
      {/* Sub-buttons with Staggered Pop Animation */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '0.75rem',
        opacity: expanded ? 1 : 0,
        transform: expanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        pointerEvents: expanded ? 'all' : 'none',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <Link 
          to="/contact" 
          onClick={() => setExpanded(false)}
          className="btn btn-sm"
          style={{ 
            background: 'var(--primary)', color: '#fff', 
            boxShadow: '0 8px 20px rgba(0, 120, 172, 0.35)', 
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.6rem' 
          }}
        >
          <i className="fas fa-desktop"></i> Get Software Demo
        </Link>
        <Link 
          to="/academy/kits" 
          onClick={() => setExpanded(false)}
          className="btn btn-sm"
          style={{ 
            background: 'var(--accent)', color: '#fff', 
            boxShadow: '0 8px 20px rgba(210, 17, 44, 0.35)', 
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.6rem' 
          }}
        >
          <i className="fas fa-boxes"></i> Buy Robotics Kits
        </Link>
        <Link 
          to="/academy/programs" 
          onClick={() => setExpanded(false)}
          className="btn btn-sm"
          style={{ 
            background: '#16A34A', color: '#fff', 
            boxShadow: '0 8px 20px rgba(22, 163, 74, 0.35)', 
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.6rem' 
          }}
        >
          <i className="fas fa-graduation-cap"></i> Explore STEM Courses
        </Link>
        <a 
          href="https://wa.me/919990911093" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => setExpanded(false)}
          className="btn btn-sm"
          style={{ 
            background: '#25D366', color: '#fff', 
            boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)', 
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.6rem' 
          }}
        >
          <i className="fab fa-whatsapp"></i> Quick WhatsApp
        </a>
      </div>

      {/* Main Animated Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--gradient-accent)',
          color: '#fff',
          border: '3px solid #fff',
          boxShadow: expanded ? '0 12px 30px rgba(210, 17, 44, 0.5)' : '0 8px 25px rgba(210, 17, 44, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          transition: 'transform 0.3s ease',
          animation: expanded ? 'none' : 'float 3s ease-in-out infinite'
        }}
        aria-label="Quick Navigation Hub"
        title="Technula Quick Actions"
      >
        <i className={`fas fa-${expanded ? 'times' : 'bolt'}`}></i>
      </button>
    </div>
  );
}
