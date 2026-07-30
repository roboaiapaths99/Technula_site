import { Link } from 'react-router-dom';
import { kitsData } from '../data/kitsData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function Kits() {
  const { addToCart } = useCart();

  return (
    <>
      <SEO
        title="Buy STEM Robotics Kits Online — DIY Arduino, Coding & Science Kits for Schools | Technula"
        description="Shop premium STEM robotics kits, DIY Arduino kits, coding starter packs, and science project kits for K-12 school students. Free delivery in Delhi NCR. Trusted by 50+ schools across Faridabad, Gurgaon, Noida & North India."
        keywords="buy robotics kits online India, STEM kits for schools Delhi NCR, Arduino starter kit Faridabad, DIY robotics kits students, coding kits for kids, science project kits, best robotics kits North India, school lab equipment"
        canonical="/academy/kits"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">Robotics Kits Marketplace</span>
            <h1>Hands-On STEM <span className="gradient-text">Hardware Kits</span></h1>
            <p>Explore 11 exclusive robotics, IoT, and AI learning kits designed to turn abstract concepts into practical, physical inventions.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid-3">
            {kitsData.map(kit => (
              <div key={kit.id} className="card kit-card">
                {kit.isOutOfStock && <span className="out-of-stock-badge">Out of Stock</span>}
                <div className="kit-image">
                  <img src={kit.image} alt={kit.name} loading="lazy" />
                </div>
                <div className="kit-info">
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    {kit.classFor} ({kit.ageGroup})
                  </div>
                  <h3 className="kit-name">{kit.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {kit.description}
                  </p>
                  <div className="kit-price">
                    <span className="price-current">{formatCurrency(kit.price)}</span>
                    <span className="price-mrp">{formatCurrency(kit.mrp)}</span>
                  </div>
                  <div className="kit-actions">
                    <button 
                      className={`btn ${kit.isOutOfStock ? 'btn-outline' : 'btn-primary'} btn-sm`} 
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => addToCart(kit)}
                      disabled={kit.isOutOfStock}
                    >
                      {kit.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <Link to={`/academy/kits/${kit.id}`} className="btn btn-outline btn-sm">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
