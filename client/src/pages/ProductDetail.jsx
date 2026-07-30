import { useParams, Link } from 'react-router-dom';
import { kitsData } from '../data/kitsData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const kit = kitsData.find(k => k.id === id) || kitsData[0];

  return (
    <>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <Link to="/academy/kits" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <i className="fas fa-arrow-left"></i> Back to Kits Marketplace
          </Link>

          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div className="card" style={{ padding: '1rem', overflow: 'hidden' }}>
              <img src={kit.image} alt={kit.name} style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
            </div>

            <div>
              <span className="level-badge badge-all" style={{ marginBottom: '1rem' }}>{kit.classFor} ({kit.ageGroup})</span>
              <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>{kit.name}</h1>
              
              <div className="kit-price" style={{ marginBottom: '1.5rem' }}>
                <span className="price-current" style={{ fontSize: '2rem' }}>{formatCurrency(kit.price)}</span>
                <span className="price-mrp" style={{ fontSize: '1.2rem' }}>{formatCurrency(kit.mrp)}</span>
              </div>

              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                {kit.description}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>Key Features:</h4>
                <ul style={{ paddingLeft: 0 }}>
                  {kit.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-dim)' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--primary)' }}></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {kit.components && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '0.75rem' }}>Included Components:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {kit.components.map((comp, idx) => (
                      <span key={idx} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-alt)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button 
                  className={`btn ${kit.isOutOfStock ? 'btn-outline' : 'btn-primary'} btn-lg`} 
                  onClick={() => addToCart(kit)}
                  disabled={kit.isOutOfStock}
                >
                  {kit.isOutOfStock ? 'Currently Out of Stock' : 'Add to Shopping Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
