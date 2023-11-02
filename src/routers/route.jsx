import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home'
import Registro from '../pages/registro/Registro'
import Login from '../pages/login/Login';
import Autenticacion from '../pages/autenticacion/Autenticacion';
import RecuperarContrasena from '../pages/recuperarC/RecuperarContrasena.jsx';
import Dashboard from '../pages/Dashboard/Dashboard';
import Sanciones from '../pages/Sanciones/Sanciones';
import Usuarios from '../pages/Usuarios/Usuarios';
import Informes from '../pages/Informes/Informes';
import jwtDecode from 'jwt-decode';
import Mensajes from '../pages/mensajes/mensajes';
import MensajeDetalle from '../pages/mensajes_detalles/mensajes_detalles';
import Inventario from '../pages/Inventario/Inventario';



export function LasRutas() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Autenticacion />} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena/>} />
        <Route path="/admin" element={<Dashboard/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/sanciones" element={<Sanciones/>} />
        <Route path="/informes" element={<Informes/>} />
        <Route path="/mensajes" element={<Mensajes />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/mensajes/:messageId" element={<MensajeDetalle />} 
        />
      </Routes>
    </Router>
  );
}


