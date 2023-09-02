import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/Registro">Registro</Link>
    </div>
  );
}
