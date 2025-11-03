import React, { useEffect, useState } from 'react';
import API from '../../api';
import '../../styles.css'; // ensure your CSS file is imported

export default function Registered() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/users/me/registrations', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setRegs(res.data);
      } catch (err) {
        console.error('Error loading registrations:', err);
      }
    };
    load();
  }, []);

  return (
    <div className="registered-page">
      {/* content here */}
      <div className="registered-card">
        <h2>Your Registered Events</h2>
        <div className="card-grid">
          {regs.length > 0 ? (
            regs.map((ev) => (
              <div key={ev._id} className="event-card">
                <img
                  src={ev.poster || 'https://placehold.co/600x400?text=No+Poster'}
                  alt={ev.name}
                />
                <h3>{ev.name}</h3>
                <p>
                  {ev.category} • {ev.place}
                </p>
                <p>
                  {ev.date} @ {ev.time}
                </p>
              </div>
            ))
          ) : (
            <p>No registrations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
