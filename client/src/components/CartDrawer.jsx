import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, subtotal, gst, total } = useCart();
  const { isLoggedIn, setShowOTP } = useAuth();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    if (!isLoggedIn) {
      setShowOTP(true);
    }
    navigate('/academy/checkout');
  };

  return (
    <div 
      className="cart-drawer-overlay" 
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="cart-drawer-card"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header with Technula Emblem */}
        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img 
              src="/img/logo_icon.png" 
              alt="Technula Logo" 
              style={{ width: 30, height: 30, borderRadius: '6px', background: '#fff', padding: '2px', objectFit: 'contain', border: '1px solid var(--card-border)' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'rgba(0,0,0,0.05)', border: 'none', fontSize: '1rem', cursor: 'pointer', color: 'var(--text)', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
            title="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', color: 'var(--card-border)', marginBottom: '1rem', display: 'block' }}></i>
              <h4>Your cart is empty</h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>Explore our robotics kits catalog and start building!</p>
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/academy/kits'); }}
                className="btn btn-primary btn-sm"
              >
                Browse Kits Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 60, height: 60, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>{formatCurrency(item.price)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)' }}>
                        <button style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span style={{ padding: '0.2rem 0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => removeFromCart(item.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Summary & Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', background: 'var(--bg-alt)', borderTop: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.8rem' }}>
              <span>GST (18%)</span>
              <span>{formatCurrency(gst)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.25rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{formatCurrency(total)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={handleCheckoutClick}
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Proceed to Checkout <i className="fas fa-arrow-right"></i>
              </button>
              <Link 
                to="/academy/cart" 
                onClick={() => setIsCartOpen(false)}
                style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dim)', textDecoration: 'underline' }}
              >
                View Full Cart Page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
