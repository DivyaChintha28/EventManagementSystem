import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);

      // ✅ Save user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.firstName || '');

      alert(`Welcome back, ${res.data.firstName || 'User'}!`);
      nav('/dashboard/home');
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay-content">
        <div className="center">
          <div className="card">
            <h2 style={{ textAlign: 'center', color: '#2575fc' }}>Login</h2>
            <form onSubmit={submit}>
              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <br /><br />
              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <br /><br />
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don’t have an account?{' '}
              <span
                onClick={() => nav('/signup')}
                style={{ color: '#2575fc', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
