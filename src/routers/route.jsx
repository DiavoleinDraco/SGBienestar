import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home'
import Registro from '../pages/registro/Registro'
import Login from '../pages/login/Login';
import Autenticacion from '../pages/autenticacion/Autenticacion';
import RecuperarContrasena from '../pages/recuperarC/RecuperarContrasena.jsx';
import RecuperacionContraAviso from '../pages/recuperarC/RecuperarContraAviso';
import Dashboard from '../pages/Dashboard/Dashboard';
import NavTabs from '../pages/NavTabs/NavTabs';
import Sanciones from '../pages/Sanciones/Sanciones';

function requireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export function LasRutas() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/:userId" element={<Autenticacion />} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena/>} />
        <Route path="/RecuperacionContraAviso" element={<RecuperacionContraAviso/>} />
        <Route path="/admin" element={<Dashboard/>} />
        <Route path="/tabla" element={<NavTabs/>} />
        <Route path="/sanciones" element={<Sanciones/>} />


        <Route path="/auth/:userId" element={<Route element={requireAuth} />}
        />
      </Routes>
    </Router>
  );
}


