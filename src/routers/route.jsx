import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home'
import Registro from '../pages/registro/Registro'
import Login from '../pages/login/Login';
import Autenticacion from '../pages/autenticacion/Autenticacion';
import RecuperarContrasena from '../pages/recuperarC/RecuperarContrasena.jsx';
import Dashboard from '../pages/Administrador/Dashboard/Dashboard';
import Sanciones from '../pages/Administrador/Sanciones/Sanciones';
import Usuarios from '../pages/Administrador/Usuarios/Usuarios';
import Informes from '../pages/Administrador/Informes/Informes'
import jwtDecode from 'jwt-decode';
import Mensajes from '../pages/Administrador/mensajes/mensajes';
import MensajeDetalle from '../pages/mensajes_detalles/mensajes_detalles';
import Inventario from '../pages/Administrador/Inventario/Inventario';
import Solicitudes from '../pages/Administrador/Solicitudes/Solicitudes';


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
        <Route path="/mensajes/:messageId" element={<MensajeDetalle />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      
      </Routes>
    </Router>
  );
}


