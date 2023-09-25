import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Home</h1>
      </div>
      <ul className="nav-links">
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
