import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, gst, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="section" style={{ paddingTop: '8rem', minHeight: '60vh' }}>
        <div className="container text-center">
          <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: 'var(--card-border)', marginBottom: '1.5rem', display: 'block' }}></i>
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-dim)', margin: '1rem 0 2rem' }}>Explore our robotics kits catalog and start building!</p>
          <Link to="/academy/kits" className="btn btn-primary btn-lg">Browse Robotics Kits</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Shopping <span className="primary-text">Cart</span></h1>

        <div className="grid-3 cart-page-grid" style={{ gap: '2rem' }}>
          <div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '1rem' }}>Product</th>
                    <th style={{ padding: '1rem' }}>Price</th>
                    <th style={{ padding: '1rem' }}>Quantity</th>
                    <th style={{ padding: '1rem' }}>Total</th>
                    <th style={{ padding: '1rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: 50, height: 50, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>{formatCurrency(item.price)}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-sm)' }}>
                          <button style={{ padding: '0.3rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span style={{ padding: '0.3rem 0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button style={{ padding: '0.3rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>{formatCurrency(item.price * item.quantity)}</td>
                      <td style={{ padding: '1rem' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }} onClick={() => removeFromCart(item.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <button className="btn btn-outline btn-sm" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-dim)' }}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-dim)' }}>
                <span>GST (18%)</span>
                <span>{formatCurrency(gst)}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.2rem' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatCurrency(total)}</span>
              </div>

              <Link to="/academy/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                Proceed to Checkout <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
