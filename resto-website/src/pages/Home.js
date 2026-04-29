import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const menuHighlights = [
  { cat: 'Starters', name: 'Seared Scallops', desc: 'Cauliflower purée, pancetta, micro herbs, lemon butter', price: '$24', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=75' },
  { cat: 'Mains', name: 'Wagyu Beef Sirloin', desc: '250g, truffle jus, potato gratin, seasonal greens', price: '$68', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=75' },
  { cat: 'Desserts', name: 'Valrhona Chocolate', desc: 'Dark chocolate tart, salted caramel, vanilla bean ice cream', price: '$18', img: 'https://images.unsplash.com/photo-1611329532992-0b7cd36380dc?w=400&q=75' },
];

const reviews = [
  { name: 'James T.', rating: 5, text: 'Absolutely exceptional. The wagyu was the best I\'ve had in Brisbane. Service is impeccable and the atmosphere divine.' },
  { name: 'Rachel M.', rating: 5, text: 'We celebrated our anniversary here and the team made it truly special. The tasting menu was a journey.' },
  { name: 'Chris L.', rating: 5, text: 'Best restaurant in the city, no question. The seasonal menu is clever, the wine list outstanding.' },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="r-hero">
        <div className="r-hero-bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" alt="Restaurant" />
          <div className="r-hero-overlay" />
        </div>
        <div className="r-hero-content container">
          <div className="r-hero-label">Est. 2018 · Brisbane, Australia</div>
          <h1 className="r-hero-title">Where Good Food<br /><em>Tells a Story</em></h1>
          <p className="r-hero-sub">Seasonal cuisine crafted with passion. Local ingredients, global inspiration. A dining experience unlike any other.</p>
          <div className="r-hero-btns">
            <Link to="/reservation" className="btn-amber">Reserve a Table</Link>
            <Link to="/menu" className="btn-outline-cream">View Our Menu</Link>
          </div>
        </div>
        <div className="r-hero-ribbon">
          <span>Fine Dining</span><span>·</span><span>Craft Cocktails</span><span>·</span>
          <span>Private Events</span><span>·</span><span>Wine Cellar</span><span>·</span>
          <span>Seasonal Menu</span><span>·</span><span>Brisbane's Best</span><span>·</span>
          <span>Fine Dining</span><span>·</span><span>Craft Cocktails</span><span>·</span>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="r-about-strip">
        <div className="container r-about-grid">
          <div className="r-about-img">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80" alt="Chef" />
          </div>
          <div className="r-about-text">
            <p className="section-tag">Our Story</p>
            <h2 className="section-title">Passion on Every<br /><em>Plate</em></h2>
            <p>Founded in 2018 by chef Marcus Reilly, The Corner Table was born from a simple belief: great food deserves great company. Using only the finest Queensland produce, our kitchen creates dishes that honour tradition while embracing innovation.</p>
            <p style={{marginTop:'16px'}}>Every ingredient has a story. Every dish is a conversation. We invite you to sit down, slow down, and savour.</p>
            <div className="r-about-stats">
              {[['6+', 'Years serving Brisbane'],['2', 'Hats in 2025'],['100%', 'Local producers'],['28k+', 'Happy guests']].map(([num, label]) => (
                <div key={label} className="r-about-stat">
                  <span className="r-stat-num">{num}</span>
                  <span className="r-stat-label">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/menu" className="btn-amber" style={{display:'inline-block',marginTop:'32px'}}>Explore the Menu</Link>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="r-menu-section section">
        <div className="container">
          <div className="r-section-header">
            <div>
              <p className="section-tag">From Our Kitchen</p>
              <h2 className="section-title">Chef's <em>Signatures</em></h2>
            </div>
            <Link to="/menu" className="btn-outline-dark">Full Menu →</Link>
          </div>
          <div className="r-menu-grid">
            {menuHighlights.map((item, i) => (
              <div key={i} className="r-menu-card">
                <div className="r-menu-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span className="r-menu-cat">{item.cat}</span>
                </div>
                <div className="r-menu-body">
                  <div className="r-menu-top">
                    <h3>{item.name}</h3>
                    <span className="r-menu-price">{item.price}</span>
                  </div>
                  <p>{item.desc}</p>
                  <Link to="/reservation" className="r-menu-reserve">Reserve to taste →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="r-gallery-section">
        <div className="r-gallery-grid">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cfd087b5?w=500&q=75" alt="food 1" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&q=75" alt="interior" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=500&q=75" alt="food 2" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=75" alt="food 3" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=75" alt="dining" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=75" alt="bar" loading="lazy" />
        </div>
        <div style={{textAlign:'center',paddingTop:'48px'}}>
          <Link to="/gallery" className="btn-amber">View Full Gallery</Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="r-reviews section">
        <div className="container">
          <div className="r-section-header" style={{marginBottom:'48px'}}>
            <div>
              <p className="section-tag">Guest Reviews</p>
              <h2 className="section-title">What Our Guests <em>Say</em></h2>
            </div>
            <div className="r-rating-badge">
              <span className="r-big-rating">4.9</span>
              <span>★★★★★</span>
              <span>Google Rating</span>
            </div>
          </div>
          <div className="r-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="r-review-card">
                <div className="r-review-stars">{'★'.repeat(r.rating)}</div>
                <p>"{r.text}"</p>
                <div className="r-reviewer">
                  <div className="r-avatar">{r.name[0]}</div>
                  <strong>{r.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOURS & LOCATION */}
      <section className="r-location section" style={{background: 'var(--bg2)'}}>
        <div className="container r-loc-grid">
          <div>
            <p className="section-tag">Visit Us</p>
            <h2 className="section-title">Find the <em>Table</em></h2>
            <div className="r-loc-details">
              {[['📍','88 Flame Street, Brisbane CBD, QLD 4000'],['📞','+61 7 5555 0198'],['✉','hello@thecornertable.com.au']].map(([icon, text]) => (
                <div key={text} className="r-loc-item"><span>{icon}</span><span>{text}</span></div>
              ))}
            </div>
            <div className="r-hours">
              {[['Monday – Thursday','11:00 AM – 10:00 PM'],['Friday – Saturday','11:00 AM – 11:00 PM'],['Sunday','10:00 AM – 9:00 PM (Brunch from 10am)']].map(([day,time]) => (
                <div key={day} className="r-hours-row"><span>{day}</span><span className="r-hours-time">{time}</span></div>
              ))}
            </div>
          </div>
          <div>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113647!2d153.0251!3d-27.4698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD%2C%20Australia!5e0!3m2!1sen!2sau!4v1234" width="100%" height="400" style={{border:'none',borderRadius:'12px'}} allowFullScreen loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="r-cta">
        <div className="container r-cta-inner">
          <div>
            <h2 className="r-cta-title">Ready for an <em>Unforgettable</em> Evening?</h2>
            <p>Reserve your table now. Walk-ins welcome when available.</p>
          </div>
          <Link to="/reservation" className="btn-amber">Reserve Your Table</Link>
        </div>
      </section>
    </main>
  );
}
