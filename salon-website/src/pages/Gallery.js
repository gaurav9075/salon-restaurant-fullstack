import React, { useState } from 'react';
import './Gallery.css';

const photos = [
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', cat: 'hair', alt: 'Hair styling' },
  { src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80', cat: 'nails', alt: 'Nail art' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', cat: 'skin', alt: 'Facial' },
  { src: 'https://images.unsplash.com/photo-1519500778663-b5f5f56adde1?w=600&q=80', cat: 'hair', alt: 'Color' },
  { src: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=600&q=80', cat: 'hair', alt: 'Balayage' },
  { src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80', cat: 'skin', alt: 'Skin care' },
  { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80', cat: 'nails', alt: 'Pedicure' },
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80', cat: 'studio', alt: 'Studio' },
  { src: 'https://images.unsplash.com/photo-1532925696015-9ba1bdcc2e8d?w=600&q=80', cat: 'hair', alt: 'Bridal' },
  { src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80', cat: 'skin', alt: 'Treatment' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', cat: 'nails', alt: 'Manicure' },
  { src: 'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=600&q=80', cat: 'studio', alt: 'Interior' },
];

const cats = ['all','hair','nails','skin','studio'];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? photos : photos.filter(p => p.cat === active);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="gallery-hero">
        <div className="container">
          <p className="section-tag">Portfolio</p>
          <h1 className="section-title">Our <em>Gallery</em></h1>
        </div>
      </div>

      <section className="section gallery-main">
        <div className="container">
          <div className="gallery-filters">
            {cats.map(c => (
              <button key={c} className={`gallery-filter ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="masonry">
            {filtered.map((p, i) => (
              <div key={i} className="masonry-item" onClick={() => setLightbox(p)}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="masonry-overlay">
                  <span>View ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close">✕</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
