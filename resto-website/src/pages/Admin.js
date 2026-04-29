import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Admin.css';

function Login({ onLogin }) {
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const submit = (e) => { e.preventDefault(); if (u==='admin'&&p==='admin123') { localStorage.setItem('rAdminAuth','1'); onLogin(); } else toast.error('Invalid credentials'); };
  return (
    <div className="ra-login">
      <div className="ra-login-box">
        <div className="ra-logo">The Corner Table — Admin</div>
        <form onSubmit={submit}>
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="ra-input" />
          <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" className="ra-input" />
          <button type="submit" className="btn-amber" style={{width:'100%'}}>Login</button>
        </form>
        <p style={{fontSize:'12px',color:'#888',marginTop:'12px',textAlign:'center'}}>Demo: admin / admin123</p>
      </div>
    </div>
  );
}

function Sidebar({ onLogout }) {
  const loc = useLocation();
  const links = [{ to:'/admin',icon:'◉',label:'Dashboard' },{ to:'/admin/reservations',icon:'🍽',label:'Reservations' },{ to:'/admin/menu',icon:'📋',label:'Menu' },{ to:'/admin/hours',icon:'⏱',label:'Hours' }];
  return (
    <aside className="ra-sidebar">
      <div className="ra-sidebar-logo">The Corner Table</div>
      <nav>
        {links.map(l => <Link key={l.to} to={l.to} className={`ra-link ${loc.pathname===l.to?'active':''}`}><span>{l.icon}</span>{l.label}</Link>)}
      </nav>
      <div className="ra-sidebar-footer">
        <Link to="/" target="_blank" className="ra-link">↗ View Site</Link>
        <button onClick={onLogout} className="ra-link">⬡ Logout</button>
      </div>
    </aside>
  );
}

function Dashboard() {
  return (
    <div className="ra-content">
      <div className="ra-header"><h1>Dashboard</h1><p>Today's overview</p></div>
      <div className="ra-stats">
        {[['Tonight\'s Covers','24','🍽'],['This Week','87','📅'],['This Month','312','📈'],['Pending','6','⏳']].map(([l,v,i]) => (
          <div key={l} className="ra-stat-card"><div className="ra-stat-icon">{i}</div><div className="ra-stat-val">{v}</div><div className="ra-stat-label">{l}</div></div>
        ))}
      </div>
      <div className="ra-card">
        <div className="ra-card-header"><h2>Upcoming Reservations</h2><Link to="/admin/reservations" className="ra-card-link">View All →</Link></div>
        <table className="ra-table">
          <thead><tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Occasion</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[{name:'Marco Rossi',date:'2026-04-28',time:'7:00 PM',guests:2,occasion:'Anniversary',status:'confirmed'},
              {name:'Sophie Chen',date:'2026-04-28',time:'7:30 PM',guests:4,occasion:'-',status:'pending'},
              {name:'James Wilson',date:'2026-04-29',time:'6:30 PM',guests:6,occasion:'Birthday',status:'confirmed'},
            ].map((r,i) => (
              <tr key={i}>
                <td><strong>{r.name}</strong></td><td>{r.date}</td><td>{r.time}</td><td>{r.guests}</td><td>{r.occasion}</td>
                <td><span className={`ra-badge ${r.status}`}>{r.status}</span></td>
                <td><button className="ra-action confirm" onClick={()=>toast.success('Confirmed!')}>✓</button><button className="ra-action cancel" onClick={()=>toast.error('Cancelled!')}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Reservations() {
  const [filter, setFilter] = useState('all');
  const all = [
    {id:1,name:'Marco Rossi',date:'2026-04-28',time:'7:00 PM',guests:2,phone:'+61 4XX 111',email:'marco@email.com',occasion:'Anniversary',status:'confirmed'},
    {id:2,name:'Sophie Chen',date:'2026-04-28',time:'7:30 PM',guests:4,phone:'+61 4XX 222',email:'sophie@email.com',occasion:'-',status:'pending'},
    {id:3,name:'James Wilson',date:'2026-04-29',time:'6:30 PM',guests:6,phone:'+61 4XX 333',email:'james@email.com',occasion:'Birthday',status:'confirmed'},
    {id:4,name:'Amy Park',date:'2026-04-30',time:'8:00 PM',guests:2,phone:'+61 4XX 444',email:'amy@email.com',occasion:'Date Night',status:'pending'},
  ];
  const filtered = filter==='all' ? all : all.filter(r=>r.status===filter);
  const exportCSV = () => {
    const csv = ['Name,Date,Time,Guests,Phone,Email,Occasion,Status',...filtered.map(r=>`${r.name},${r.date},${r.time},${r.guests},${r.phone},${r.email},${r.occasion},${r.status}`)].join('\n');
    const a = document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='reservations.csv'; a.click();
  };
  return (
    <div className="ra-content">
      <div className="ra-header"><h1>Reservations</h1><p>Manage all table bookings</p></div>
      <div className="ra-card">
        <div className="ra-card-header">
          <div className="ra-filter-tabs">{['all','pending','confirmed','cancelled'].map(f=><button key={f} className={`ra-filter-tab ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}</div>
          <button className="ra-btn-sm" onClick={exportCSV}>↓ Export CSV</button>
        </div>
        <table className="ra-table">
          <thead><tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Contact</th><th>Occasion</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map(r=>(
            <tr key={r.id}>
              <td><strong>{r.name}</strong></td><td>{r.date}</td><td>{r.time}</td><td>{r.guests}</td>
              <td><div style={{fontSize:'12px'}}>{r.phone}</div><div style={{fontSize:'11px',color:'#888'}}>{r.email}</div></td>
              <td>{r.occasion}</td>
              <td><span className={`ra-badge ${r.status}`}>{r.status}</span></td>
              <td><button className="ra-action confirm" onClick={()=>toast.success('Confirmed!')}>✓</button><button className="ra-action cancel" onClick={()=>toast.error('Cancelled!')}>✕</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function MenuAdmin() {
  const [items, setItems] = useState([
    {id:1,name:'Wagyu Sirloin',cat:'Mains',price:'$68',dietary:'GF'},
    {id:2,name:'Seared Scallops',cat:'Starters',price:'$24',dietary:'GF'},
    {id:3,name:'Valrhona Chocolate Tart',cat:'Desserts',price:'$18',dietary:'V,GF'},
  ]);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({name:'',cat:'Starters',price:'',dietary:''});
  const add = () => { setItems(i=>[...i,{...newItem,id:Date.now()}]); setAdding(false); toast.success('Item added!'); };
  const remove = (id) => { setItems(i=>i.filter(x=>x.id!==id)); toast.success('Removed!'); };
  return (
    <div className="ra-content">
      <div className="ra-header"><h1>Menu Manager</h1><p>Add, edit or remove menu items</p></div>
      <div className="ra-card">
        <div className="ra-card-header"><h2>All Items</h2><button className="ra-btn-sm" onClick={()=>setAdding(!adding)}>+ Add Item</button></div>
        {adding && <div className="ra-add-form">
          <input placeholder="Item name" value={newItem.name} onChange={e=>setNewItem(s=>({...s,name:e.target.value}))} className="ra-input-sm" />
          <select value={newItem.cat} onChange={e=>setNewItem(s=>({...s,cat:e.target.value}))} className="ra-input-sm">
            {['Starters','Mains','Desserts','Drinks'].map(c=><option key={c}>{c}</option>)}
          </select>
          <input placeholder="Price e.g. $24" value={newItem.price} onChange={e=>setNewItem(s=>({...s,price:e.target.value}))} className="ra-input-sm" />
          <input placeholder="Dietary e.g. GF, V" value={newItem.dietary} onChange={e=>setNewItem(s=>({...s,dietary:e.target.value}))} className="ra-input-sm" />
          <button className="ra-btn-sm" onClick={add}>Save</button>
        </div>}
        <table className="ra-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Dietary</th><th>Action</th></tr></thead>
          <tbody>{items.map(i=><tr key={i.id}><td>{i.name}</td><td>{i.cat}</td><td>{i.price}</td><td>{i.dietary}</td><td><button className="ra-action cancel" onClick={()=>remove(i.id)}>✕</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function Hours() {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const [hours, setHours] = useState({
    Monday:{open:'11:00',close:'22:00',closed:false},Tuesday:{open:'11:00',close:'22:00',closed:false},
    Wednesday:{open:'11:00',close:'22:00',closed:false},Thursday:{open:'11:00',close:'22:00',closed:false},
    Friday:{open:'11:00',close:'23:00',closed:false},Saturday:{open:'11:00',close:'23:00',closed:false},
    Sunday:{open:'10:00',close:'21:00',closed:false},
  });
  const set = (day,k,v) => setHours(h=>({...h,[day]:{...h[day],[k]:v}}));
  return (
    <div className="ra-content">
      <div className="ra-header"><h1>Business Hours</h1><p>Manage opening times</p></div>
      <div className="ra-card">
        <table className="ra-table">
          <thead><tr><th>Day</th><th>Open</th><th>Close</th><th>Closed?</th></tr></thead>
          <tbody>{days.map(day=>(
            <tr key={day} style={{opacity:hours[day].closed?0.5:1}}>
              <td><strong>{day}</strong></td>
              <td><input type="time" value={hours[day].open} onChange={e=>set(day,'open',e.target.value)} className="ra-input-sm" disabled={hours[day].closed} /></td>
              <td><input type="time" value={hours[day].close} onChange={e=>set(day,'close',e.target.value)} className="ra-input-sm" disabled={hours[day].closed} /></td>
              <td><input type="checkbox" checked={hours[day].closed} onChange={e=>set(day,'closed',e.target.checked)} /></td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{padding:'20px 24px'}}><button className="ra-btn-sm" onClick={()=>toast.success('Hours saved!')}>Save Hours</button></div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('rAdminAuth'));
  const logout = () => { localStorage.removeItem('rAdminAuth'); setAuthed(false); };
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  return (
    <div className="ra-layout">
      <Sidebar onLogout={logout} />
      <main className="ra-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/menu" element={<MenuAdmin />} />
          <Route path="/hours" element={<Hours />} />
        </Routes>
      </main>
    </div>
  );
}
