import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import SEO from '../components/SEO';

export default function Programs() {
  return (
    <>
      <SEO
        title="STEM Robotics & Coding Programs for Schools — Courses & Curriculum | Technula Academy"
        description="Explore Technula Academy's structured STEM robotics, coding, and AI programs for K-12 school students. From Scratch coding for beginners to advanced Arduino and Python projects. Available for schools in Delhi NCR, Faridabad, Gurgaon & North India."
        keywords="STEM programs for schools Delhi NCR, coding courses kids Faridabad, robotics curriculum K-12, Arduino courses students, Python programming school, best coding academy North India, Technula Academy programs"
        canonical="/academy/programs"
      />
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content centered">
            <span className="hero-badge">STEM Curriculum</span>
            <h1>Comprehensive <span className="gradient-text">Robotics & AI</span> Pathways</h1>
            <p>From beginner electronics and block coding to Python, IoT, machine learning, and web development. Age-appropriate learning for Nursery to 8th class and beyond.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid-2">
            {coursesData.map(course => (
              <div key={course.id} className="card course-card">
                <div className="course-header">
                  <span className={`level-badge ${course.badgeClass}`}>{course.level}</span>
                  <h3 style={{ marginTop: '0.5rem' }}><i className={course.icon} style={{ marginRight: '0.5rem', color: 'var(--primary)' }}></i>{course.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{course.ageGroup} • {course.classFor}</p>
                </div>
                <div className="course-body">
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{course.description}</p>
                  
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text)' }}>Curriculum Highlights:</h4>
                  <ul style={{ marginBottom: '2rem', paddingLeft: 0 }}>
                    {course.curriculum.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                        <i className="fas fa-check-circle" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    Book Free Demo Class <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
