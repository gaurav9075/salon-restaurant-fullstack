import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Admin.css';

// ── LOGIN ──
function Login({ onLogin }) {
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (u === 'admin' && p === 'admin123') { localStorage.setItem('adminAuth', '1'); onLogin(); }
    else toast.error('Invalid credentials');
  };
  return (
    <div className="admin-login">
      <div className="login-box">
        <div className="login-logo">✦ Glow Studio</div>
        <h2>Admin Login</h2>
        <form onSubmit={submit}>
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="admin-input" />
          <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" className="admin-input" />
          <button type="submit" className="admin-btn">Login →</button>
        </form>
        <p style={{fontSize:'12px',color:'#888',marginTop:'16px'}}>Demo: admin / admin123</p>
      </div>
    </div>
  );
}

// ── SIDEBAR ──
function Sidebar({ onLogout }) {
  const loc = useLocation();
  const links = [
    { to: '/admin', icon: '◉', label: 'Dashboard' },
    { to: '/admin/bookings', icon: '📅', label: 'Bookings' },
    { to: '/admin/services', icon: '✂', label: 'Services' },
    { to: '/admin/hours', icon: '⏱', label: 'Hours' },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">✦ Glow Admin</div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <Link key={l.to} to={l.to} className={`sidebar-link ${loc.pathname === l.to ? 'active' : ''}`}>
            <span>{l.icon}</span> {l.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link to="/" target="_blank" className="sidebar-link">↗ View Site</Link>
        <button onClick={onLogout} className="sidebar-link logout-btn">⬡ Logout</button>
      </div>
    </aside>
  );
}

// ── DASHBOARD ──
function Dashboard() {
  const [stats, setStats] = useState({ total: 0, week: 0, pending: 0, month: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    // Demo data
    setStats({ total: 48, week: 12, pending: 5, month: 31 });
    setRecent([
      { id: 1, name: 'Emily Rose', service: 'Balayage', date: '2026-04-28', time: '10:00 AM', status: 'confirmed' },
      { id: 2, name: 'Mia Johnson', service: 'Gel Manicure', date: '2026-04-28', time: '11:30 AM', status: 'pending' },
      { id: 3, name: 'Sarah Williams', service: 'Haircut', date: '2026-04-29', time: '2:00 PM', status: 'confirmed' },
      { id: 4, name: 'Jessica Brown', service: 'Facial', date: '2026-04-29', time: '4:00 PM', status: 'pending' },
    ]);
  }, []);

  return (
    <div className="admin-content">
      <div className="content-header"><h1>Dashboard</h1><p>Welcome back! Here's what's happening today.</p></div>
      <div className="stats-grid">
        {[['Total Bookings', stats.total, '📊'], ['This Week', stats.week, '📅'], ['This Month', stats.month, '📈'], ['Pending', stats.pending, '⏳']].map(([label, val, icon]) => (
          <div key={label} className="stat-card">
            <div className="stat-card-icon">{icon}</div>
            <div className="stat-card-val">{val}</div>
            <div className="stat-card-label">{label}</div>
          </div>
        ))}
      </div>
      <div className="admin-card">
        <div className="card-header"><h2>Recent Bookings</h2><Link to="/admin/bookings" className="card-link">View All →</Link></div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {recent.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td><td>{b.service}</td><td>{b.date}</td><td>{b.time}</td>
                <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                <td>
                  <button className="action-btn confirm" onClick={() => toast.success(`Confirmed ${b.name}`)}>✓</button>
                  <button className="action-btn cancel" onClick={() => toast.error(`Cancelled ${b.name}`)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── BOOKINGS ──
function Bookings() {
  const [filter, setFilter] = useState('all');
  const [bookings] = useState([
    { id: 1, name: 'Emily Rose', service: 'Balayage', date: '2026-04-28', time: '10:00 AM', phone: '+1-602-555-0101', email: 'emily@email.com', status: 'confirmed' },
    { id: 2, name: 'Mia Johnson', service: 'Gel Manicure', date: '2026-04-28', time: '11:30 AM', phone: '+1-602-555-0102', email: 'mia@email.com', status: 'pending' },
    { id: 3, name: 'Sarah Williams', service: 'Haircut', date: '2026-04-29', time: '2:00 PM', phone: '+1-602-555-0103', email: 'sarah@email.com', status: 'confirmed' },
    { id: 4, name: 'Jessica Brown', service: 'Facial', date: '2026-04-29', time: '4:00 PM', phone: '+1-602-555-0104', email: 'jessica@email.com', status: 'pending' },
    { id: 5, name: 'Amy Clark', service: 'Keratin Treatment', date: '2026-04-30', time: '1:00 PM', phone: '+1-602-555-0105', email: 'amy@email.com', status: 'cancelled' },
  ]);

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const exportCSV = () => {
    const csv = ['Name,Service,Date,Time,Phone,Email,Status', ...filtered.map(b => `${b.name},${b.service},${b.date},${b.time},${b.phone},${b.email},${b.status}`)].join('\n');
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'bookings.csv'; a.click();
  };

  return (
    <div className="admin-content">
      <div className="content-header"><h1>Bookings</h1><p>Manage all appointments</p></div>
      <div className="admin-card">
        <div className="card-header">
          <div className="filter-tabs">
            {['all','pending','confirmed','cancelled'].map(f => (
              <button key={f} className={`filter-tab ${filter===f?'active':''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
            ))}
          </div>
          <button className="admin-btn-sm" onClick={exportCSV}>↓ Export CSV</button>
        </div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Service</th><th>Date</th><th>Time</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td><strong>{b.name}</strong></td>
                <td>{b.service}</td><td>{b.date}</td><td>{b.time}</td>
                <td><div style={{fontSize:'12px'}}>{b.phone}</div><div style={{fontSize:'11px',color:'#888'}}>{b.email}</div></td>
                <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                <td>
                  <button className="action-btn confirm" onClick={() => toast.success('Confirmed!')}>✓</button>
                  <button className="action-btn cancel" onClick={() => toast.error('Cancelled!')}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── SERVICES EDITOR ──
function ServicesEditor() {
  const [services, setServices] = useState([
    { id:1, name:'Signature Haircut', price:'$65', duration:'60 min', cat:'Hair' },
    { id:2, name:'Full Balayage', price:'$185', duration:'180 min', cat:'Hair' },
    { id:3, name:'Gel Manicure', price:'$60', duration:'60 min', cat:'Nails' },
    { id:4, name:'Hydrafacial', price:'$150', duration:'75 min', cat:'Skin' },
  ]);
  const [adding, setAdding] = useState(false);
  const [newS, setNewS] = useState({ name:'', price:'', duration:'', cat:'Hair' });
  const add = () => { setServices(s => [...s, { ...newS, id: Date.now() }]); setAdding(false); setNewS({ name:'', price:'', duration:'', cat:'Hair' }); toast.success('Service added!'); };
  const remove = (id) => { setServices(s => s.filter(sv => sv.id !== id)); toast.success('Removed!'); };
  return (
    <div className="admin-content">
      <div className="content-header"><h1>Services</h1><p>Manage your service menu</p></div>
      <div className="admin-card">
        <div className="card-header"><h2>All Services</h2><button className="admin-btn-sm" onClick={() => setAdding(!adding)}>+ Add Service</button></div>
        {adding && (
          <div className="add-form">
            <input placeholder="Service name" value={newS.name} onChange={e => setNewS(s=>({...s,name:e.target.value}))} className="admin-input-sm" />
            <input placeholder="Price e.g. $65" value={newS.price} onChange={e => setNewS(s=>({...s,price:e.target.value}))} className="admin-input-sm" />
            <input placeholder="Duration e.g. 60 min" value={newS.duration} onChange={e => setNewS(s=>({...s,duration:e.target.value}))} className="admin-input-sm" />
            <select value={newS.cat} onChange={e => setNewS(s=>({...s,cat:e.target.value}))} className="admin-input-sm">
              {['Hair','Nails','Skin'].map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="admin-btn-sm" onClick={add}>Save</button>
          </div>
        )}
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>{services.map(s => (<tr key={s.id}><td>{s.name}</td><td>{s.cat}</td><td>{s.price}</td><td>{s.duration}</td><td><button className="action-btn cancel" onClick={()=>remove(s.id)}>✕</button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ── HOURS ──
function Hours() {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const [hours, setHours] = useState({
    Monday:{open:'09:00',close:'20:00',closed:false},
    Tuesday:{open:'09:00',close:'20:00',closed:false},
    Wednesday:{open:'09:00',close:'20:00',closed:false},
    Thursday:{open:'09:00',close:'20:00',closed:false},
    Friday:{open:'09:00',close:'20:00',closed:false},
    Saturday:{open:'09:00',close:'18:00',closed:false},
    Sunday:{open:'10:00',close:'16:00',closed:false},
  });
  const set = (day, k, v) => setHours(h => ({ ...h, [day]: { ...h[day], [k]: v } }));
  return (
    <div className="admin-content">
      <div className="content-header"><h1>Business Hours</h1><p>Set your opening times</p></div>
      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Day</th><th>Open</th><th>Close</th><th>Closed?</th></tr></thead>
          <tbody>{days.map(day => (
            <tr key={day} className={hours[day].closed ? 'closed-row' : ''}>
              <td><strong>{day}</strong></td>
              <td><input type="time" value={hours[day].open} onChange={e=>set(day,'open',e.target.value)} className="admin-input-sm" disabled={hours[day].closed} /></td>
              <td><input type="time" value={hours[day].close} onChange={e=>set(day,'close',e.target.value)} className="admin-input-sm" disabled={hours[day].closed} /></td>
              <td><input type="checkbox" checked={hours[day].closed} onChange={e=>set(day,'closed',e.target.checked)} /></td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{marginTop:'24px'}}>
          <button className="admin-btn-sm" onClick={() => toast.success('Hours saved!')}>Save Hours</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN ──
export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('adminAuth'));
  const logout = () => { localStorage.removeItem('adminAuth'); setAuthed(false); };
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  return (
    <div className="admin-layout">
      <Sidebar onLogout={logout} />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/services" element={<ServicesEditor />} />
          <Route path="/hours" element={<Hours />} />
        </Routes>
      </main>
    </div>
  );
}
