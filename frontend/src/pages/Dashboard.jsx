import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './home/Home';
import About from './About';
import Registered from './registered/Registered';

const Navbar = ()=> {
  const nav = useNavigate();
  const logout = ()=> { localStorage.clear(); nav('/login'); };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard/home">Home</Link>
        <Link to="/dashboard/about">About</Link>
        <Link to="/dashboard/home">Events</Link>
        <Link to="/dashboard/registered">Registered events</Link>
      </div>
      <div>
        <span style={{marginRight:10}}>Hi, {localStorage.getItem('name')}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default function Dashboard(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="registered" element={<Registered/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </div>
  );
}
