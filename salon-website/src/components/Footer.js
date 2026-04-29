import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">✦</span> Glow Studio
              </div>
              <p>Where beauty meets artistry. Premium hair, nail, and skin services crafted for you.</p>
              <div className="socials">
                <a href="#ig" aria-label="Instagram">IG</a>
                <a href="#fb" aria-label="Facebook">FB</a>
                <a href="#yt" aria-label="YouTube">YT</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/booking">Book Now</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li>Hair Styling</li>
                <li>Hair Color</li>
                <li>Manicure & Pedicure</li>
                <li>Facial Treatments</li>
                <li>Bridal Packages</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Hours</h4>
              <ul>
                <li>Mon–Fri: 9am – 8pm</li>
                <li>Saturday: 9am – 6pm</li>
                <li>Sunday: 10am – 4pm</li>
              </ul>
              <h4 style={{marginTop:'20px'}}>Location</h4>
              <ul>
                <li>142 Blossom Ave, Phoenix, AZ 85001</li>
                <li>+1 (602) 555-0198</li>
                <li>hello@glowstudio.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Glow Studio. All rights reserved.</p>
          <p>Designed with ♥ for beauty professionals worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
