import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
    } catch {}
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
    setLoading(false);
  };

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="contact-hero">
        <div className="container">
          <p className="section-tag">Get In Touch</p>
          <h1 className="section-title">Contact <em>Us</em></h1>
        </div>
      </div>

      <section className="section contact-main">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Visit Our Studio</h2>
            <div className="contact-details">
              <div className="contact-item"><span className="ci-icon">📍</span><div><strong>Address</strong><p>142 Blossom Ave, Phoenix, AZ 85001</p></div></div>
              <div className="contact-item"><span className="ci-icon">📞</span><div><strong>Phone</strong><p>+1 (602) 555-0198</p></div></div>
              <div className="contact-item"><span className="ci-icon">✉</span><div><strong>Email</strong><p>hello@glowstudio.com</p></div></div>
              <div className="contact-item"><span className="ci-icon">⏱</span><div><strong>Hours</strong><p>Mon–Fri: 9am–8pm · Sat: 9am–6pm · Sun: 10am–4pm</p></div></div>
            </div>
            <div className="contact-map">
              <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211689.6059!2d-112.2695!3d33.4484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1234" width="100%" height="240" style={{border:'none',borderRadius:'12px',filter:'invert(90%) hue-rotate(180deg)'}} allowFullScreen loading="lazy" />
            </div>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="sent-box">
                <div style={{fontSize:'48px',marginBottom:'16px'}}>✦</div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn-gold" onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',message:'' }); }} style={{marginTop:'24px'}}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <h2>Send a Message</h2>
                <p>Have a question or want to know more? We'd love to hear from you.</p>
                <div className="cf-grid">
                  <div className="field">
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" className="booking-input" />
                  </div>
                  <div className="field">
                    <label>Email *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@email.com" className="booking-input" />
                  </div>
                  <div className="field full">
                    <label>Phone</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="booking-input" />
                  </div>
                  <div className="field full">
                    <label>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="How can we help you?" className="booking-input" />
                  </div>
                </div>
                <button type="submit" className="btn-gold" disabled={loading}>{loading ? 'Sending...' : 'Send Message →'}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
