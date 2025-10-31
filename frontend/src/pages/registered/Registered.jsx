import React, { useEffect, useState } from 'react';
import API from '../../api';
export default function Registered(){
  const [regs, setRegs] = useState([]);
  useEffect(()=>{ const load = async ()=>{ const res = await API.get('/users/me/registrations', { headers: { Authorization: 'Bearer '+localStorage.getItem('token') } }); setRegs(res.data); }; load(); },[]);
  return (
    <div style={{padding:20}}>
      <h3>Your registered events</h3>
      <div className="card-grid">
        {regs.map(ev=>(
          <div key={ev._id} className="event-card">
            <img src={ev.poster || 'https://placehold.co/600x400?text=No+Poster'} alt="" />
            <h3>{ev.name}</h3>
            <p>{ev.category} • {ev.place}</p>
            <p>{ev.date} @ {ev.time}</p>
          </div>
        ))}
        {regs.length===0 && <p>No registrations yet.</p>}
      </div>
    </div>
  );
}
