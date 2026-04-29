import React, { useState } from 'react';
import './RGallery.css';

const photos = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', cat: 'dining', alt: 'Dining Room' },
  { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', cat: 'food', alt: 'Wagyu' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cfd087b5?w=600&q=80', cat: 'food', alt: 'Plating' },
  { src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80', cat: 'interior', alt: 'Interior' },
  { src: 'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=600&q=80', cat: 'food', alt: 'Dessert' },
  { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', cat: 'food', alt: 'Plate' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', cat: 'bar', alt: 'Bar' },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80', cat: 'food', alt: 'Scallops' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80', cat: 'food', alt: 'Tasting' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', cat: 'interior', alt: 'Tables' },
  { src: 'https://images.unsplash.com/photo-1611329532992-0b7cd36380dc?w=600&q=80', cat: 'food', alt: 'Chocolate' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', cat: 'interior', alt: 'Ambiance' },
];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lb, setLb] = useState(null);
  const cats = ['all', 'food', 'interior', 'dining', 'bar'];
  const filtered = active === 'all' ? photos : photos.filter(p => p.cat === active);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ background: 'var(--dark)', padding: '80px 0 50px' }}>
        <div className="container">
          <p className="section-tag">Our Space & Food</p>
          <h1 className="section-title" style={{ color: 'var(--cream)' }}>The <em>Gallery</em></h1>
        </div>
      </div>
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="rg-filters">
            {cats.map(c => <button key={c} className={`rg-filter ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>)}
          </div>
          <div className="rg-masonry">
            {filtered.map((p, i) => (
              <div key={i} className="rg-item" onClick={() => setLb(p)}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="rg-overlay"><span>View ↗</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {lb && <div className="rg-lightbox" onClick={() => setLb(null)}>
        <button className="rg-lb-close">✕</button>
        <img src={lb.src} alt={lb.alt} onClick={e => e.stopPropagation()} />
      </div>}
    </main>
  );
}
