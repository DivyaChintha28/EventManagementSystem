import React from "react";

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <img
        src={event.poster}
        alt={event.name}
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/250x180?text=No+Image")
        }
      />
      <h3>{event.name}</h3>
      <p><b>Category:</b> {event.category}</p>
      <p><b>Place:</b> {event.place}</p>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Time:</b> {event.time}</p>
    </div>
  );
}
