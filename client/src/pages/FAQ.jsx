import { useState } from 'react';
import { faqData } from '../data/siteData';
import SEO from '../components/SEO';

export default function FAQ() {
  const [openSaas, setOpenSaas] = useState(null);
  const [openAcademy, setOpenAcademy] = useState(null);

  return (
    <>
      <SEO
        title="FAQ — Frequently Asked Questions about Technula Software & STEM Programs"
        description="Find answers to commonly asked questions about Technula's enterprise SaaS products (SchoolOS ERP, LogDay HRMS, CRM), STEM Robotics education programs, pricing, and implementation for schools and businesses in Delhi NCR."
        keywords="Technula FAQ, school ERP questions, HRMS software FAQ, CRM pricing India, STEM robotics program FAQ, enterprise software questions Delhi NCR"
        canonical="/faq"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 900 }}>
            <span className="hero-badge">Knowledge Base & Help Desk</span>
            <h1>Frequently Asked <span className="gradient-text">Questions</span></h1>
            <p>Everything you need to know about Technula SaaS solutions, custom ERP software, robotics courses, and STEM kits.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 900 }}>
          {/* SaaS Section */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>SaaS & Custom Engineering</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.3rem' }}>Software Division FAQs</h2>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            {faqData.saas.map((item, i) => (
              <div key={i} className={`faq-item${openSaas === i ? ' active' : ''}`}>
                <button className="faq-question" onClick={() => setOpenSaas(openSaas === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">{openSaas === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>STEM Academy & Robotics Kits</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.3rem' }}>Education Division FAQs</h2>
          </div>

          <div>
            {faqData.academy.map((item, i) => (
              <div key={i} className={`faq-item${openAcademy === i ? ' active' : ''}`}>
                <button className="faq-question" onClick={() => setOpenAcademy(openAcademy === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">{openAcademy === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
