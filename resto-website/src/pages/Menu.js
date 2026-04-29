import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const menu = {
  starters: [
    { name: 'Seared Scallops', desc: 'Cauliflower purée, pancetta crisp, micro herbs, lemon beurre blanc', price: '$24', dietary: ['GF'] },
    { name: 'Beef Tartare', desc: 'Hand-cut eye fillet, quail egg, capers, Dijon, toasted sourdough', price: '$22', dietary: [] },
    { name: 'Burrata', desc: 'Heirloom tomatoes, basil oil, aged balsamic, sea salt, focaccia', price: '$18', dietary: ['V', 'GF'] },
    { name: 'Duck Liver Parfait', desc: 'Brioche toast, cornichons, red onion marmalade', price: '$20', dietary: [] },
    { name: 'Tempura King Prawns', desc: 'Wasabi mayo, pickled daikon, togarashi, sesame', price: '$26', dietary: ['DF'] },
    { name: 'Soup of the Day', desc: 'Chef\'s daily seasonal soup, artisan bread, cultured butter', price: '$14', dietary: ['V'] },
  ],
  mains: [
    { name: 'Wagyu Sirloin 250g', desc: 'MBS 6+, truffle jus, potato gratin, seasonal greens', price: '$68', dietary: ['GF'] },
    { name: 'Pan-Roasted Salmon', desc: 'Miso glaze, edamame purée, pickled cucumber, dashi broth', price: '$44', dietary: ['GF', 'DF'] },
    { name: 'Duck Breast', desc: 'Orange jus, cherry compote, potato fondant, broccolini', price: '$52', dietary: ['GF'] },
    { name: 'Mushroom Risotto', desc: 'Arborio, porcini, truffle oil, parmesan, chives', price: '$36', dietary: ['V', 'GF'] },
    { name: 'Lamb Rack', desc: 'Herb crust, rosemary jus, roasted carrot, whipped feta', price: '$58', dietary: ['GF'] },
    { name: 'Fish of the Day', desc: 'Chef\'s seasonal fish selection, ask your waiter for today\'s offering', price: 'MP', dietary: ['GF'] },
  ],
  desserts: [
    { name: 'Valrhona Chocolate Tart', desc: '70% dark chocolate, salted caramel, vanilla bean ice cream', price: '$18', dietary: ['V', 'GF'] },
    { name: 'Lemon Posset', desc: 'Shortbread crumble, raspberry coulis, candied zest', price: '$16', dietary: ['V'] },
    { name: 'Cheese Selection', desc: 'Three Australian artisan cheeses, quince paste, lavosh', price: '$24', dietary: ['V', 'GF'] },
    { name: 'Sticky Date Pudding', desc: 'Butterscotch sauce, candied walnut, double cream', price: '$16', dietary: ['V'] },
  ],
  drinks: [
    { name: 'The Corner Negroni', desc: 'Hendricks, Campari, Martini Rosso, orange, hand-crafted ice', price: '$22', dietary: [] },
    { name: 'Seasonal Spritz', desc: 'Aperol, prosecco, soda, seasonal fruit, fresh herbs', price: '$18', dietary: [] },
    { name: 'Sommelier Wine Selection', desc: 'Ask our sommelier for today\'s curated glass pours', price: 'From $14', dietary: [] },
    { name: 'Non-Alcoholic Pairing', desc: 'House-made shrubs, kombucha, botanical sodas', price: '$12', dietary: [] },
  ],
};

const cats = [
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'drinks', label: 'Drinks' },
];

const tagColors = { V: '#2d7a3a', GF: '#c8762a', DF: '#2a6ec8' };

export default function Menu() {
  const [active, setActive] = useState('starters');

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="menu-hero">
        <div className="container">
          <p className="section-tag">Seasonal Menu</p>
          <h1 className="section-title">Our <em>Menu</em></h1>
          <p className="menu-sub">All dishes are prepared fresh daily using Queensland's finest produce. Menu changes seasonally.</p>
        </div>
      </div>

      <section className="section menu-main">
        <div className="container">
          <div className="menu-dietary-key">
            {Object.entries({ V: 'Vegetarian', GF: 'Gluten Free', DF: 'Dairy Free' }).map(([k, v]) => (
              <span key={k} className="dietary-key-item">
                <span className="dietary-tag" style={{ background: tagColors[k] }}>{k}</span> {v}
              </span>
            ))}
          </div>

          <div className="menu-cat-tabs">
            {cats.map(c => (
              <button key={c.key} className={`menu-cat-tab ${active === c.key ? 'active' : ''}`} onClick={() => setActive(c.key)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="menu-items">
            {menu[active].map((item, i) => (
              <div key={i} className="menu-item">
                <div className="menu-item-left">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <div className="menu-item-tags">
                      {item.dietary.map(d => (
                        <span key={d} className="dietary-tag" style={{ background: tagColors[d] }}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </div>
                <div className="menu-item-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TASTING MENU CTA */}
      <section className="tasting-cta">
        <div className="container tasting-inner">
          <div className="tasting-text">
            <p className="section-tag">Special Experience</p>
            <h2 className="section-title">Chef's Tasting <em>Menu</em></h2>
            <p>Seven courses paired with our sommelier's wine selection. Available Friday & Saturday evenings for the full table only. Reservation required at least 48 hours in advance.</p>
            <div className="tasting-price">$145 per person <span>+ $85 wine pairing</span></div>
            <Link to="/reservation" className="btn-amber" style={{ display: 'inline-block', marginTop: '28px' }}>Reserve for Tasting Menu</Link>
          </div>
          <div className="tasting-img">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" alt="Tasting Menu" />
          </div>
        </div>
      </section>
    </main>
  );
}
