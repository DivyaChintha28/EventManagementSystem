import React, { useState } from 'react';
import API from '../../api';

export default function AddEvent({ onClose }){
  const [form, setForm] = useState({ name:'', poster:'', category:'', place:'', date:'', time:'' });
  const submit = async e=>{
    e.preventDefault();
    try{
      await API.post('/events', form, { headers: { Authorization: 'Bearer '+localStorage.getItem('token') }});
      alert('Event added');
      onClose();
    }catch(err){ alert(err?.response?.data?.error || err.message); }
  };
  return (
    <div className="overlay">
      <form className="add-form card" onSubmit={submit}>
        <h3>Add Event</h3>
        <input placeholder="Event name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <input placeholder="Poster URL" value={form.poster} onChange={e=>setForm({...form, poster:e.target.value})} />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input placeholder="Place" value={form.place} onChange={e=>setForm({...form, place:e.target.value})} />
        <label>Date: <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></label>
        <label>Time: <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} required/></label>
        <div style={{display:'flex',justifyContent:'flex-end',gap:10}}>
          <button type="button" onClick={onClose}>Close</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
