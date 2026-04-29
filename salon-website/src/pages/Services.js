import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = {
  hair: [
    { name: 'Signature Haircut', desc: 'Precision cut tailored to your face shape. Includes wash, cut, and blowout.', price: '$65', duration: '60 min' },
    { name: 'Full Balayage', desc: 'Hand-painted sun-kissed highlights. Natural gradient effect from root to tip.', price: '$185', duration: '180 min' },
    { name: 'Full Color', desc: 'Single process permanent color application. Root to tip transformation.', price: '$120', duration: '120 min' },
    { name: 'Highlights / Lowlights', desc: 'Foil highlights or lowlights for dimension and depth.', price: '$140', duration: '150 min' },
    { name: 'Keratin Treatment', desc: 'Smoothing treatment for frizz-free, glossy hair. Lasts 3-5 months.', price: '$250', duration: '180 min' },
    { name: 'Blowout & Style', desc: 'Professional wash, blowdry and style. Perfect for events.', price: '$55', duration: '45 min' },
  ],
  nails: [
    { name: 'Classic Manicure', desc: 'Shaping, cuticle care, hand massage, and your choice of polish.', price: '$45', duration: '45 min' },
    { name: 'Gel Manicure', desc: 'Long-lasting gel polish. Chip-free shine for up to 3 weeks.', price: '$60', duration: '60 min' },
    { name: 'Acrylic Full Set', desc: 'Full acrylic nail set with your choice of length and shape.', price: '$80', duration: '90 min' },
    { name: 'Nail Art', desc: 'Custom nail art designs by our specialist. Price varies by design.', price: 'From $15', duration: '30+ min' },
    { name: 'Classic Pedicure', desc: 'Foot soak, exfoliation, cuticle care, massage, and polish.', price: '$60', duration: '60 min' },
    { name: 'Spa Pedicure', desc: 'Deluxe version with extended massage and luxury mask treatment.', price: '$80', duration: '80 min' },
  ],
  skin: [
    { name: 'Deep Cleanse Facial', desc: 'Thorough cleansing, extraction, and hydration treatment.', price: '$85', duration: '60 min' },
    { name: 'Anti-Aging Facial', desc: 'Advanced treatment with peptides and retinol. Reduces fine lines.', price: '$110', duration: '75 min' },
    { name: 'Microdermabrasion', desc: 'Crystal exfoliation for brighter, smoother skin texture.', price: '$95', duration: '60 min' },
    { name: 'Chemical Peel', desc: 'AHA/BHA peel for cell turnover and radiant complexion.', price: '$100', duration: '45 min' },
    { name: 'Hydrafacial', desc: 'Multi-step facial that cleanses, extracts, and hydrates in one session.', price: '$150', duration: '75 min' },
    { name: 'Eyebrow Shaping', desc: 'Professional thread or wax shaping. Includes tinting optional.', price: '$30', duration: '30 min' },
  ],
};

const cats = [
  { key: 'hair', label: '✂ Hair' },
  { key: 'nails', label: '💅 Nails' },
  { key: 'skin', label: '🌸 Skin' },
];

export default function Services() {
  const [active, setActive] = useState('hair');

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="services-hero">
        <div className="container">
          <p className="section-tag">What We Offer</p>
          <h1 className="section-title">Our <em>Services</em></h1>
          <p className="services-sub">Every treatment is a personal experience, crafted with care and expertise.</p>
        </div>
      </div>

      <section className="section services-main">
        <div className="container">
          <div className="cat-tabs">
            {cats.map(c => (
              <button key={c.key} className={`cat-tab ${active === c.key ? 'active' : ''}`} onClick={() => setActive(c.key)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="svc-grid">
            {services[active].map((s, i) => (
              <div key={i} className="svc-card">
                <div className="svc-card-top">
                  <h3>{s.name}</h3>
                  <span className="svc-price">{s.price}</span>
                </div>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-footer">
                  <span className="svc-duration">⏱ {s.duration}</span>
                  <Link to="/booking" className="svc-book-btn">Book →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDAL PACKAGE */}
      <section className="bridal-section">
        <div className="container bridal-inner">
          <div className="bridal-text">
            <p className="section-tag">Special Package</p>
            <h2 className="section-title">The Bridal <em>Experience</em></h2>
            <p>Make your special day unforgettable with our comprehensive bridal beauty package. From trial run to wedding day glamour — we've got every detail covered.</p>
            <ul className="bridal-list">
              <li>✦ Bridal hair styling + trial</li>
              <li>✦ Full makeup application + trial</li>
              <li>✦ Manicure & pedicure (bride)</li>
              <li>✦ Complimentary champagne</li>
              <li>✦ Private VIP suite</li>
            </ul>
            <div className="bridal-price">From $350 <span>/ Complete Package</span></div>
            <Link to="/booking" className="btn-gold" style={{display:'inline-block',marginTop:'24px'}}>Enquire Now</Link>
          </div>
          <div className="bridal-img-wrap">
            <img src="https://images.unsplash.com/photo-1532925696015-9ba1bdcc2e8d?w=600&q=80" alt="Bridal Package" />
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-strip-inner">
          <h2 className="section-title">Not sure what you need? <em>Let's chat.</em></h2>
          <p>Book a free 15-minute consultation and we'll create the perfect plan for you.</p>
          <Link to="/booking" className="btn-gold" style={{display:'inline-block',marginTop:'24px'}}>Free Consultation</Link>
        </div>
      </section>
    </main>
  );
}
