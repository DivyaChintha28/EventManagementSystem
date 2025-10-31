import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup(){
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'', role:'user' });
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      await API.post('/auth/signup', form);
      alert('Signed up — proceed to login');
      nav('/login');
    }catch(err){
      alert(err?.response?.data?.error || err.message);
    }
  };
  return (
    <div className="center">
      <h2>Sign up</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} required/>
        <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} required/>
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <label>Role:
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
