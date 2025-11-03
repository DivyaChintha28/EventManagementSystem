import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/signup', form);
      alert('✅ Signed up successfully — please log in!');
      nav('/login');
    } catch (err) {
      alert(err?.response?.data?.error || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="overlay-content">
        <div className="center">
          <div className="card">
            <h2 style={{ textAlign: 'center', color: '#2575fc' }}>Sign Up</h2>
            <form onSubmit={submit}>
              <input
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              /><br/>
              <br/>

              <input
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              /><br/>
              <br/>

              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              /><br/>
              <br/>

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              /><br/>
              <br/>
              <label style={{ textAlign: 'left', display: 'block', marginTop: '10px' }}>
                Role:
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ marginLeft: '10px' }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <br />
              <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Already have an account?{' '}
              <span
                onClick={() => nav('/login')}
                style={{ color: '#2575fc', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
