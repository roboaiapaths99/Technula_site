import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/siteData';
import SEO from '../components/SEO';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogData.find(b => b.slug === slug) || blogData[0];
  const relatedPosts = blogData.filter(b => b.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${post.title} | Technula Blog`}
        description={post.summary || post.excerpt || `${post.title}. Read the latest tech and SaaS insights from the Technula team.`}
        keywords={`${post.category}, Technula blog, ${post.title.toLowerCase().split(' ').slice(0, 5).join(', ')}`}
        canonical={`/blog/${post.slug}`}
      />
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: 850 }}>
          <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <i className="fas fa-arrow-left"></i> Back to All Articles
          </Link>

          <article className="card" style={{ padding: '3rem' }}>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
              {post.category}
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h1>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>
              <span><i className="fas fa-user-edit" style={{ marginRight: '0.4rem', color: 'var(--primary)' }}></i>{post.author || 'Technula Editorial Team'}</span>
              <span><i className="fas fa-calendar-alt" style={{ marginRight: '0.4rem', color: 'var(--primary)' }}></i>{post.date}</span>
            </div>

            <div 
              style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text)' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Articles */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Related Insights & Articles</h3>
            <div className="grid-3">
              {relatedPosts.map(rel => (
                <div key={rel.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>{rel.category}</span>
                    <h4 style={{ fontSize: '1rem', margin: '0.5rem 0', lineHeight: 1.4 }}>{rel.title}</h4>
                  </div>
                  <Link to={`/blog/${rel.slug}`} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginTop: '1rem' }}>
                    Read Article →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
