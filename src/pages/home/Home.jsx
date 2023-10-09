import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Home</h1>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰ {/* Ícono de hamburguesa */}
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/Registro">Registro</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
