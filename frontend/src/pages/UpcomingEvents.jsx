import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function UpcomingEvents() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    // ✅ For now: mock 20 upcoming events (you can replace with API later)
    const mockEvents = [
      {
        _id: '1',
        name: 'Music Fest 2025',
        category: 'Concert',
        place: 'Goa Beach Arena',
        date: '2025-12-20',
        time: '7:00 PM',
        poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '2',
        name: 'Tech Innovation Summit',
        category: 'Conference',
        place: 'Bangalore Convention Center',
        date: '2025-12-05',
        time: '10:00 AM',
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '3',
        name: 'Food Carnival',
        category: 'Festival',
        place: 'Hyderabad',
        date: '2025-11-15',
        time: '5:00 PM',
        poster: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '4',
        name: 'Art Exhibition',
        category: 'Culture',
        place: 'Chennai Art Gallery',
        date: '2025-12-10',
        time: '11:00 AM',
        poster: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '5',
        name: 'Startup Expo',
        category: 'Business',
        place: 'Delhi Tech Park',
        date: '2025-12-07',
        time: '9:00 AM',
        poster: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '6',
        name: 'Dance Battle Night',
        category: 'Entertainment',
        place: 'Mumbai Club Arena',
        date: '2025-12-25',
        time: '8:00 PM',
        poster: 'https://images.unsplash.com/photo-1520975918318-3f4f54cf8b21?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '7',
        name: 'Sports Championship',
        category: 'Sports',
        place: 'Kolkata Stadium',
        date: '2025-12-18',
        time: '6:00 PM',
        poster: 'https://images.unsplash.com/photo-1505842465776-3ac4e06b7a36?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '8',
        name: 'Photography Workshop',
        category: 'Education',
        place: 'Pune Studio Hall',
        date: '2025-12-12',
        time: '10:30 AM',
        poster: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '9',
        name: 'Coding Bootcamp',
        category: 'Technology',
        place: 'Online',
        date: '2025-12-03',
        time: '9:00 AM',
        poster: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '10',
        name: 'Fashion Week 2025',
        category: 'Lifestyle',
        place: 'Delhi Fashion Hub',
        date: '2025-12-28',
        time: '6:00 PM',
        poster: 'https://images.unsplash.com/photo-1520975918318-3f4f54cf8b21?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '11',
        name: 'Gaming Expo',
        category: 'Entertainment',
        place: 'Hyderabad Convention',
        date: '2025-12-14',
        time: '12:00 PM',
        poster: 'https://images.unsplash.com/photo-1580128637428-62c9e1b1dfb5?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '12',
        name: 'Charity Run',
        category: 'Community',
        place: 'Chennai Marina',
        date: '2025-12-02',
        time: '6:00 AM',
        poster: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '13',
        name: 'Film Screening Night',
        category: 'Cinema',
        place: 'Bangalore Film City',
        date: '2025-12-08',
        time: '7:30 PM',
        poster: 'https://images.unsplash.com/photo-1581905764498-7b6e5c5c76ab?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '14',
        name: 'Book Fair',
        category: 'Literature',
        place: 'Kolkata City Hall',
        date: '2025-12-21',
        time: '11:00 AM',
        poster: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '15',
        name: 'Stand-up Comedy Night',
        category: 'Entertainment',
        place: 'Mumbai Lounge',
        date: '2025-12-16',
        time: '9:00 PM',
        poster: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '16',
        name: 'Yoga & Wellness Camp',
        category: 'Health',
        place: 'Rishikesh',
        date: '2025-12-04',
        time: '6:00 AM',
        poster: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '17',
        name: 'Science Exhibition',
        category: 'Education',
        place: 'Delhi Public School',
        date: '2025-12-22',
        time: '10:00 AM',
        poster: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '18',
        name: 'Christmas Carnival',
        category: 'Festival',
        place: 'Mumbai City Square',
        date: '2025-12-24',
        time: '5:00 PM',
        poster: 'https://images.unsplash.com/photo-1545156521-77bd85671d88?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '19',
        name: 'New Year Bash 2026',
        category: 'Celebration',
        place: 'Goa Beach Club',
        date: '2025-12-31',
        time: '9:00 PM',
        poster: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      },
      {
        _id: '20',
        name: 'Startup Meetup',
        category: 'Networking',
        place: 'Pune Innovation Hub',
        date: '2025-12-09',
        time: '2:00 PM',
        poster: 'https://images.unsplash.com/photo-1532634896-26909d0d4b6a?auto=format&fit=crop&w=800&q=80',
      },
    ];

    setUpcoming(mockEvents);
  }, []);

  return (
    <div className="upcoming-page">
      <div style={{ textAlign: 'center', color: 'white', marginTop: '30px' }}>
        <h1>🗓️ Upcoming Events</h1>
        <p>Don’t miss out! Check out the latest events happening soon.</p>
      </div>

      <div className="card-grid" style={{ padding: '30px' }}>
        {upcoming.length > 0 ? (
          upcoming.map(ev => (
            <div key={ev._id} className="event-card">
              <img src={ev.poster} alt={ev.name} />
              <h3>{ev.name}</h3>
              <p>{ev.category} • {ev.place}</p>
              <p>{ev.date} @ {ev.time}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>
            No upcoming events at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
