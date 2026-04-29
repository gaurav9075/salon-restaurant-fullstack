// Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try { await axios.post('/api/contact', form); } catch {}
    setSent(true);
    toast.success('Message sent!');
  };

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ background: 'var(--dark)', padding: '80px 0 50px' }}>
        <div className="container">
          <p className="section-tag">Get In Touch</p>
          <h1 className="section-title" style={{ color: 'var(--cream)' }}>Contact <em>Us</em></h1>
        </div>
      </div>
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, marginBottom: '24px' }}>Visit The Corner Table</h2>
            {[['📍','Address','88 Flame St, Brisbane CBD, QLD 4000'],['📞','Phone','+61 7 5555 0198'],['✉','Email','hello@thecornertable.com.au'],['⏱','Hours','Mon–Thu 11am–10pm | Fri–Sat 11am–11pm | Sun 10am–9pm']].map(([icon,label,val]) => (
              <div key={label} style={{ display:'flex', gap:'16px', marginBottom:'20px' }}>
                <span style={{ fontSize:'20px' }}>{icon}</span>
                <div>
                  <strong style={{ display:'block', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--amber)', marginBottom:'4px' }}>{label}</strong>
                  <p style={{ fontSize:'14px', color:'var(--text2)' }}>{val}</p>
                </div>
              </div>
            ))}
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113647!2d153.0251!3d-27.4698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD%2C%20Australia!5e0!3m2!1sen!2sau!4v1234" width="100%" height="240" style={{ border:'none', borderRadius:'10px', marginTop:'24px' }} allowFullScreen loading="lazy" />
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '48px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize:'48px', color:'var(--amber)', marginBottom:'16px' }}>✓</div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'28px', marginBottom:'12px' }}>Message Received!</h3>
                <p style={{ color:'var(--text2)' }}>We'll reply within 24 hours.</p>
                <button className="btn-amber" style={{ marginTop:'24px' }} onClick={() => { setSent(false); setForm({name:'',email:'',phone:'',message:''}); }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:400, marginBottom:'8px' }}>Send a Message</h2>
                <p style={{ color:'var(--text2)', fontSize:'14px', marginBottom:'28px' }}>Questions about reservations, events, or private dining? We'd love to hear from you.</p>
                {[['Full Name *','text','name','Marco Rossi'],['Email *','email','email','marco@email.com'],['Phone','tel','phone','+61 4XX XXX XXX']].map(([label,type,key,ph]) => (
                  <div key={key} style={{ marginBottom:'14px' }}>
                    <label style={{ display:'block', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text2)', marginBottom:'6px' }}>{label}</label>
                    <input required={label.includes('*')} type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={ph} style={{ width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'6px', padding:'12px 14px', color:'var(--dark)', fontSize:'14px', fontFamily:'var(--font-body)' }} />
                  </div>
                ))}
                <div style={{ marginBottom:'24px' }}>
                  <label style={{ display:'block', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text2)', marginBottom:'6px' }}>Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="How can we help?" style={{ width:'100%', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'6px', padding:'12px 14px', color:'var(--dark)', fontSize:'14px', fontFamily:'var(--font-body)', resize:'vertical' }} />
                </div>
                <button type="submit" className="btn-amber">Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
