import React, { useEffect, useState } from 'react';
import API from '../../api';
import AddEvent from './AddEvent';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const role = localStorage.getItem('role');

  // 🔄 Load events
  const load = async () => {
    try {
      const res = await API.get('/events' + (q ? '?q=' + encodeURIComponent(q) : ''));
      setEvents(res.data);
    } catch (err) {
      console.error('Error loading events:', err);
    }
  };

  useEffect(() => {
    load();
  }, [q]);

  // 📝 Register for event
  const register = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.post(`/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Registered successfully!');
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    }
  };

  // 🧱 UI
  return (
    <div className="home-page">
      {/* Overlay to make text readable */}
      <div className="overlay-content">
        <div className="home-header">
          <h1>Welcome to the Event Portal</h1>
          <p>Discover and register for exciting upcoming events</p>
          <br/>
        </div>

        <div className="home-controls">
          <input
            placeholder="🔍 Search events by name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {role === 'admin' && (
            <button onClick={() => setShowAdd(true)} className="add-button">
              ➕ Add Event
            </button>
          )}
        </div>

        <div className="card-grid">
          {events.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No events found.</p>
          ) : (
            events.map((ev) => (
              <div key={ev._id} className="event-card">
                <img
                  src={ev.poster || 'https://placehold.co/600x400?text=No+Poster'}
                  alt={ev.name}
                />
                <h3>{ev.name}</h3>
                <p>{ev.category} • {ev.place}</p>
                <p>{ev.date} @ {ev.time}</p>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => register(ev._id)}>Register</button>

                  {role === 'admin' && (
                    <>
                      <button
                        onClick={async () => {
                          const t = prompt('Edit event name', ev.name);
                          if (t) {
                            await API.put(`/events/${ev._id}`,
                              { ...ev, name: t },
                              { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
                            );
                            load();
                          }
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this event?')) {
                            await API.delete(`/events/${ev._id}`, {
                              headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                            });
                            load();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {showAdd && (
          <AddEvent
            onClose={() => {
              setShowAdd(false);
              load();
            }}
          />
        )}
      </div>
    </div>
  );
}
