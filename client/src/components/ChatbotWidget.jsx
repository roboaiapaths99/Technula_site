import { useState, useRef, useEffect } from 'react';
import { api } from '../utils/api';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to Technula Support Desk! How can we assist you today with SchoolOS, LogDay HRMS, HIMS, or our STEM Robotics kits?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: userMsg });
      setMessages(prev => [...prev, { sender: 'bot', text: res.reply || 'Thank you for reaching out! A Technula consultant can also guide you directly at +91 9990911093.' }]);
    } catch {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Technula provides enterprise solutions (SchoolOS, LogDay HRMS, HIMS, StockMaster), 360° Digital Marketing, and STEM Robotics courses for schools. Call us at +91 9990911093!' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      {!open ? (
        <button 
          onClick={() => setOpen(true)}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--primary)', color: '#fff', border: '3px solid #fff',
            boxShadow: '0 10px 25px rgba(0, 120, 172, 0.4)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
            transition: 'transform 0.3s ease'
          }}
          aria-label="Open Technula Support"
          title="Technula Live Helpdesk"
        >
          <i className="fas fa-headset"></i>
        </button>
      ) : (
        <div style={{
          width: 360, maxHeight: '82vh', height: 480, background: '#fff',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-2xl)',
          border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column',
          overflow: 'hidden', animation: 'fadeInUp 0.3s ease'
        }}>
          {/* Header with explicit close button */}
          <div style={{ background: 'var(--primary)', color: '#fff', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="/img/logo_icon.png" 
                alt="Technula Logo" 
                style={{ width: 32, height: 32, borderRadius: '6px', background: '#fff', padding: '2px', objectFit: 'contain' }} 
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Technula Client Support</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Online • Live Helpdesk</div>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              style={{ 
                background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', 
                width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '1rem', fontWeight: 'bold' 
              }}
              title="Close Support Desk"
              aria-label="Close Support Desk"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-alt)' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', padding: '0.75rem 1rem', borderRadius: '1rem',
                fontSize: '0.85rem', lineHeight: 1.5,
                background: m.sender === 'user' ? 'var(--primary)' : '#fff',
                color: m.sender === 'user' ? '#fff' : 'var(--text)',
                boxShadow: m.sender === 'bot' ? 'var(--shadow-sm)' : 'none'
              }}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem', background: '#fff', borderRadius: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Consultant responding...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--card-border)', display: 'flex', gap: '0.5rem', background: '#fff', flexShrink: 0 }}>
            <input 
              value={input} onChange={e => setInput(e.target.value)} 
              placeholder="Ask about SchoolOS, HRMS, Kits..." 
              style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--card-border)', outline: 'none', fontSize: '0.85rem' }} 
            />
            <button type="submit" style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-paper-plane" style={{ fontSize: '0.85rem' }}></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
