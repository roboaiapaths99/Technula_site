import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toasts } = useCart();
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <i className={`fas fa-${t.type === 'success' ? 'check-circle' : t.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}
            style={{ color: t.type === 'success' ? '#16A34A' : t.type === 'error' ? 'var(--accent)' : 'var(--primary)' }}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
