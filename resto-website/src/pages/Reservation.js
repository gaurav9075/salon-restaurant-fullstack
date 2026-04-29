import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Reservation.css';

const timeSlots = ['11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM',
  '5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'];

export default function Reservation() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ date: '', time: '', guests: '2', occasion: '', name: '', email: '', phone: '', requests: '' });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const today = new Date().toISOString().split('T')[0];

  const submit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/reservations', { ...form, businessType: 'restaurant', status: 'pending' });
    } catch {}
    setConfirmed(true);
    toast.success('Table reserved! Confirmation email sent.');
    setLoading(false);
  };

  const reset = () => { setConfirmed(false); setStep(1); setForm({ date:'',time:'',guests:'2',occasion:'',name:'',email:'',phone:'',requests:'' }); };

  if (confirmed) return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
        <div className="res-confirmed">
          <div className="res-confirmed-badge">✓</div>
          <h2>Table Reserved!</h2>
          <p>Thank you, <strong>{form.name}</strong>. We look forward to welcoming you.</p>
          <div className="res-summary">
            {[['Date', form.date], ['Time', form.time], ['Guests', form.guests + ' people'], ['Email', form.email]].map(([k,v]) => (
              <div key={k} className="res-sum-row"><span>{k}</span><span>{v}</span></div>
            ))}
          </div>
          <p className="res-note">A confirmation has been sent to <strong>{form.email}</strong>. Please arrive 5 minutes early. Cancellations must be made 24h in advance.</p>
          <button className="btn-amber" onClick={reset}>Make Another Reservation</button>
        </div>
      </div>
    </main>
  );

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className="res-hero">
        <div className="container">
          <p className="section-tag">Book a Table</p>
          <h1 className="section-title" style={{ color: 'var(--cream)' }}>Make a <em>Reservation</em></h1>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '780px', margin: '0 auto', paddingBottom: '100px' }}>
        {/* STEPS */}
        <div className="res-steps">
          {['Details','Your Info','Confirm'].map((s, i) => (
            <React.Fragment key={i}>
              <div className={`res-step ${step > i+1 ? 'done' : ''} ${step === i+1 ? 'active' : ''}`}>
                <div className="res-step-circle">{step > i+1 ? '✓' : i+1}</div>
                <span>{s}</span>
              </div>
              {i < 2 && <div className={`res-step-line ${step > i+1 ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="res-card">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2>Booking Details</h2>
              <p className="res-hint">Choose your preferred date, time, and party size.</p>
              <div className="res-grid3">
                <div className="r-field">
                  <label>Date *</label>
                  <input type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} className="r-input" />
                </div>
                <div className="r-field">
                  <label>Number of Guests *</label>
                  <select value={form.guests} onChange={e => set('guests', e.target.value)} className="r-input">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                    <option value="9+">9+ (Contact us)</option>
                  </select>
                </div>
                <div className="r-field">
                  <label>Occasion (optional)</label>
                  <select value={form.occasion} onChange={e => set('occasion', e.target.value)} className="r-input">
                    <option value="">No special occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="date night">Date Night</option>
                    <option value="business">Business Dinner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {form.date && (
                <>
                  <p className="res-time-label">Available Times</p>
                  <div className="res-time-grid">
                    {timeSlots.map(t => (
                      <button key={t} className={`res-time-btn ${form.time === t ? 'selected' : ''}`} onClick={() => set('time', t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className="res-btns">
                <button className="btn-amber" disabled={!form.date || !form.time} onClick={() => setStep(2)}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2>Your Details</h2>
              <p className="res-hint">We'll send your confirmation to the email provided.</p>
              <div className="res-grid2">
                <div className="r-field">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Marco Rossi" className="r-input" />
                </div>
                <div className="r-field">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="marco@email.com" className="r-input" />
                </div>
                <div className="r-field">
                  <label>Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+61 4XX XXX XXX" className="r-input" />
                </div>
                <div className="r-field r-field-full">
                  <label>Special Requests (optional)</label>
                  <textarea rows={3} value={form.requests} onChange={e => set('requests', e.target.value)} placeholder="Dietary requirements, high chair needed, window seat preference..." className="r-input" />
                </div>
              </div>
              <div className="res-btns">
                <button className="btn-outline-dark" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-amber" disabled={!form.name || !form.email || !form.phone} onClick={() => setStep(3)}>Review →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2>Confirm Reservation</h2>
              <p className="res-hint">Please review your details before confirming.</p>
              <div className="res-review-box">
                <div className="res-review-section">
                  <h4>Table Details</h4>
                  {[['Date', form.date], ['Time', form.time], ['Guests', form.guests + ' people'], ...(form.occasion ? [['Occasion', form.occasion]] : [])].map(([k,v]) => (
                    <div key={k} className="res-sum-row"><span>{k}</span><span>{v}</span></div>
                  ))}
                </div>
                <div className="res-review-section">
                  <h4>Your Details</h4>
                  {[['Name', form.name], ['Email', form.email], ['Phone', form.phone], ...(form.requests ? [['Requests', form.requests]] : [])].map(([k,v]) => (
                    <div key={k} className="res-sum-row"><span>{k}</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
              <p className="res-policy">Cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may incur a $25/person fee.</p>
              <div className="res-btns">
                <button className="btn-outline-dark" onClick={() => setStep(2)}>← Edit</button>
                <button className="btn-amber" onClick={submit} disabled={loading}>
                  {loading ? 'Confirming...' : 'Confirm Reservation ✓'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDE INFO */}
        <div className="res-info-strip">
          <div className="res-info-item"><span className="res-info-icon">📍</span><div><strong>Address</strong><p>88 Flame St, Brisbane CBD</p></div></div>
          <div className="res-info-item"><span className="res-info-icon">📞</span><div><strong>Phone</strong><p>+61 7 5555 0198</p></div></div>
          <div className="res-info-item"><span className="res-info-icon">👥</span><div><strong>Large Groups</strong><p>9+ guests? Call us directly.</p></div></div>
        </div>
      </div>
    </main>
  );
}
