import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const services = [
  { icon: '✂', name: 'Hair Styling', desc: 'Cuts, blowouts & signature styles', price: 'From $65', cat: 'hair' },
  { icon: '🎨', name: 'Hair Coloring', desc: 'Balayage, highlights & full color', price: 'From $120', cat: 'hair' },
  { icon: '💅', name: 'Manicure', desc: 'Gel, acrylic & nail art designs', price: 'From $45', cat: 'nails' },
  { icon: '🌸', name: 'Facial Treatment', desc: 'Deep cleanse & anti-aging facials', price: 'From $85', cat: 'skin' },
  { icon: '👑', name: 'Bridal Package', desc: 'Complete bridal beauty package', price: 'From $350', cat: 'hair' },
  { icon: '✨', name: 'Skin Glow', desc: 'Microdermabrasion & peels', price: 'From $95', cat: 'skin' },
];

const reviews = [
  { name: 'Emily R.', stars: 5, text: 'Absolutely stunning work! My hair has never looked better. The team is professional and the atmosphere is divine.', role: 'Regular Client' },
  { name: 'Jessica M.', stars: 5, text: 'Best salon in Phoenix, hands down. The balayage they did for me lasted months and looked incredible.', role: 'Verified Booking' },
  { name: 'Sophia K.', stars: 5, text: 'Came in for my wedding hair and makeup — they exceeded every expectation. 10/10 would recommend.', role: 'Bridal Client' },
];

export default function Home() {
  const heroRef = useRef();

  useEffect(() => {
    const el = heroRef.current;
    const onMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" alt="Salon" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <p className="hero-tag">Phoenix's Premier Beauty Studio</p>
          <h1 className="hero-title">
            Where Beauty<br /><em>Becomes Art</em>
          </h1>
          <p className="hero-sub">
            Experience transformative hair, nail, and skin treatments<br />by award-winning stylists in a luxurious setting.
          </p>
          <div className="hero-btns">
            <Link to="/booking" className="btn-gold">Book Appointment</Link>
            <Link to="/services" className="btn-outline">Our Services</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">2,400+</span><span className="stat-label">Happy Clients</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">12 Yrs</span><span className="stat-label">Experience</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-num">4.9 ★</span><span className="stat-label">Google Rating</span></div>
          </div>
        </div>
        <div className="hero-scroll">scroll</div>
      </section>

      {/* ABOUT */}
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-img-wrap">
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80" alt="About" className="about-img" />
            <div className="about-badge">
              <span className="badge-num">12</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
          </div>
          <div className="about-text">
            <p className="section-tag">About Glow Studio</p>
            <h2 className="section-title">Crafting Beauty with <em>Passion & Precision</em></h2>
            <p>Founded in 2012, Glow Studio has been Phoenix's destination for premium beauty services. Our team of master stylists and beauty artists bring years of training from London, Paris, and New York.</p>
            <p style={{marginTop:'16px'}}>We believe beauty is deeply personal. Every appointment is a curated experience designed around you — your style, your vision, your confidence.</p>
            <div className="about-features">
              {['Certified Master Stylists', 'Organic & Vegan Products', 'Complimentary Consultation', 'Private VIP Suite Available'].map(f => (
                <div key={f} className="about-feat">
                  <span className="feat-check">✦</span> {f}
                </div>
              ))}
            </div>
            <Link to="/services" className="btn-gold" style={{display:'inline-block',marginTop:'32px'}}>Explore Services</Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">What We Offer</p>
            <h2 className="section-title">Signature <em>Services</em></h2>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <div key={s.name} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="service-footer">
                  <span className="service-price">{s.price}</span>
                  <Link to="/booking" className="service-book">Book →</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'48px'}}>
            <Link to="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="gallery-preview-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Our Work</p>
            <h2 className="section-title">A Glimpse of Our <em>Artistry</em></h2>
          </div>
        </div>
        <div className="gallery-strip">
          {[
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75',
            'https://images.unsplash.com/photo-1519500778663-b5f5f56adde1?w=400&q=75',
            'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&q=75',
            'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400&q=75',
            'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=75',
            'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=75',
          ].map((src, i) => (
            <div key={i} className="gallery-strip-item">
              <img src={src} alt={`Gallery ${i+1}`} loading="lazy" />
              <div className="gallery-overlay"><Link to="/gallery">View →</Link></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',padding:'48px 0 0'}}>
          <Link to="/gallery" className="btn-gold">Full Gallery</Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Client Love</p>
            <h2 className="section-title">What Our Clients <em>Say</em></h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(r.stars)}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section location-section">
        <div className="container location-grid">
          <div className="location-info">
            <p className="section-tag">Find Us</p>
            <h2 className="section-title">Visit Our <em>Studio</em></h2>
            <div className="location-details">
              <div className="loc-item"><span>📍</span><span>142 Blossom Ave, Phoenix, AZ 85001</span></div>
              <div className="loc-item"><span>📞</span><span>+1 (602) 555-0198</span></div>
              <div className="loc-item"><span>✉</span><span>hello@glowstudio.com</span></div>
            </div>
            <div className="hours-table">
              {[['Monday – Friday','9:00 AM – 8:00 PM'],['Saturday','9:00 AM – 6:00 PM'],['Sunday','10:00 AM – 4:00 PM']].map(([day, time]) => (
                <div key={day} className="hours-row">
                  <span>{day}</span><span className="hours-time">{time}</span>
                </div>
              ))}
            </div>
            <Link to="/booking" className="btn-gold" style={{display:'inline-block',marginTop:'32px'}}>Reserve Your Spot</Link>
          </div>
          <div className="map-wrap">
            <iframe
              title="Glow Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211689.6059!2d-112.2695!3d33.4484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1234"
              width="100%" height="400"
              style={{border:'none', borderRadius:'16px', filter:'invert(90%) hue-rotate(180deg)'}}
              allowFullScreen="" loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2 className="cta-title">Ready for Your <em>Transformation?</em></h2>
            <p>Book today and receive a complimentary scalp massage with any hair service.</p>
          </div>
          <Link to="/booking" className="btn-gold">Book Now — It's Free</Link>
        </div>
      </section>
    </main>
  );
}
