import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="r-footer">
      <div className="r-footer-top">
        <div className="container">
          <div className="r-footer-grid">
            <div className="r-footer-brand">
              <div className="r-footer-logo">The Corner Table</div>
              <p>Fine dining crafted from local, seasonal ingredients. Where every meal is a memory.</p>
              <div className="r-socials">
                <a href="#ig">IG</a><a href="#fb">FB</a><a href="#yt">YT</a>
              </div>
            </div>
            <div className="r-footer-col">
              <h4>Navigate</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/reservation">Reserve</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="r-footer-col">
              <h4>Hours</h4>
              <ul>
                <li>Mon–Thu: 11am – 10pm</li>
                <li>Fri–Sat: 11am – 11pm</li>
                <li>Sunday: 10am – 9pm</li>
              </ul>
              <h4 style={{marginTop:'20px'}}>Contact</h4>
              <ul>
                <li>88 Flame St, Brisbane QLD 4000</li>
                <li>+61 7 5555 0198</li>
                <li>hello@thecornertable.com.au</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="r-footer-bottom">
        <div className="container">
          <p>© 2026 The Corner Table. All rights reserved.</p>
          <p>Fine dining in Brisbane since 2018.</p>
        </div>
      </div>
    </footer>
  );
}
