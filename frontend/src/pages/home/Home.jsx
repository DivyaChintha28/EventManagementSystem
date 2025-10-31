import React, { useEffect, useState } from 'react';
import API from '../../api';
import AddEvent from './AddEvent';

export default function Home(){
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const role = localStorage.getItem('role');

  const load = async ()=>{
    const res = await API.get('/events' + (q ? '?q='+encodeURIComponent(q):''));
    setEvents(res.data);
  };
  useEffect(()=>{ load(); },[q]);

  const register = async (id)=>{
    try{
      const token = localStorage.getItem('token');
      await API.post('/events/'+id+'/register', {}, { headers: { Authorization: 'Bearer '+token }});
      alert('Registered');
    }catch(err){ alert(err?.response?.data?.error || err.message); }
  };

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <input placeholder="Search events by name" value={q} onChange={e=>setQ(e.target.value)} />
        {role==='admin' && <button onClick={()=>setShowAdd(true)}>Add Event</button>}
      </div>
      <div className="card-grid">
        {events.map(ev=>(
          <div key={ev._id} className="event-card">
            <img src={ev.poster || 'https://placehold.co/600x400?text=No+Poster'} alt="" />
            <h3>{ev.name}</h3>
            <p>{ev.category} • {ev.place}</p>
            <p>{ev.date} @ {ev.time}</p>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>register(ev._id)}>Register</button>
              {role==='admin' && <button onClick={async ()=>{ const t = prompt('Edit name', ev.name); if(t){ await API.put('/events/'+ev._id, {...ev, name:t}, { headers: { Authorization: 'Bearer '+localStorage.getItem('token') } }); load(); }}}>Edit</button>}
              {role==='admin' && <button onClick={async ()=>{ if(confirm('Delete?')){ await API.delete('/events/'+ev._id, { headers: { Authorization: 'Bearer '+localStorage.getItem('token') } }); load(); }}}>Delete</button>}
            </div>
          </div>
        ))}
      </div>
      {showAdd && <AddEvent onClose={()=>{ setShowAdd(false); load(); }} />}
    </div>
  );
}
