import { Link } from 'react-router-dom';
import { blogData } from '../data/siteData';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog — Enterprise SaaS, STEM Education & Technology Insights | Technula"
        description="Read the latest insights from Technula on enterprise SaaS development, school management technology, STEM robotics education, CRM & HRMS best practices, and digital transformation for businesses in Delhi NCR and North India."
        keywords="Technula blog, enterprise SaaS insights, school ERP blog, STEM education articles, HRMS tips, CRM best practices, technology blog India, digital transformation Delhi NCR"
        canonical="/blog"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">Insights & Articles</span>
            <h1>Technula <span className="gradient-text">Blog & Knowledge Center</span></h1>
            <p>Articles on SchoolOS, HRMS automation, STEM robotics education, AI tools, and 360° digital growth strategies.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid-3">
            {blogData.map(post => (
              <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'inherit' }}>{post.title}</Link>
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.excerpt}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--card-border)', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  <span>{post.date}</span>
                  <Link to={`/blog/${post.slug}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>Read Article →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
