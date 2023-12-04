import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import React, { lazy, Suspense, useState } from 'react';
const CircularColor = lazy(() => import('../components/Cargando/Cargando.jsx'))
const Home = lazy(() => import('../pages/home/Home'));
const Registro = lazy(() => import('../pages/registro/Registro'));
const Login = lazy(() => import('../pages/login/Login'));
const Autenticacion = lazy(() => import('../pages/autenticacion/Autenticacion'));
import RecuperarContrasena from '../pages/recuperarC/RecuperarContrasena.jsx';
import jwtDecode from 'jwt-decode';
import Ajustes from '../pages/Administrador/Ajustes/Ajustes.jsx';
import HistorialPrestamosU from '../pages/Aprendiz/Historial_Prestamos/HistorialPrestamosU.jsx';
import UsuarioSanciones from '../pages/Aprendiz/UsuarioSanciones/UsuarioSanciones.jsx';
const Dashboard = lazy(() => import('../pages/Administrador/Dashboard/Dashboard'));
const Sanciones = lazy(() => import('../pages/Administrador/Sanciones/Sanciones'));
const Usuarios = lazy(() => import('../pages/Administrador/Usuarios/Usuarios'));
const Informes = lazy(() => import('../pages/Administrador/Informes/Informes'));
const Mensajes = lazy(() => import('../pages/Administrador/mensajes/mensajes'));
const MensajeDetalle = lazy(() => import('../pages/mensajes_detalles/mensajes_detalles'));
const PrestamoDetalle = lazy(() => import('../pages/prestamoDetalle/PrestamoDetalle'));
const Inventario = lazy(() => import('../pages/Administrador/Inventario/Inventario'));
const Solicitudes = lazy(() => import('../pages/Administrador/Solicitudes/Solicitudes'));
const Prestamos = lazy(() => import('../pages/Aprendiz/prestamos/prestamos'));
const Board = lazy(() => import('../pages/Aprendiz/Board_Aprendiz/Board_Aprendiz.jsx'));
const Implementos = lazy(() => import('../pages/Aprendiz/Implementos/Implementos.jsx'));
const Perfil = lazy(() => import('../pages/Perfil/Perfil.jsx'))




export function LasRutas() {

  const token = localStorage.getItem('token');
  const decode = token ? jwtDecode(token) : null;


  const proteccionRutas = (elemento, privilegioAdmitido1, privilegioAdmitido2) => {

    

    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" />;
    }

    if (
      (privilegioAdmitido1 && decode.privilegio === privilegioAdmitido1) ||
      (privilegioAdmitido2 && decode.privilegio === privilegioAdmitido2)
    ) {
      return elemento;
    }

    return decode.privilegio === 3 || decode.privilegio === 2 ? (
      <Navigate to="/aprendiz" />
    ) : (
      <Navigate to="/admin" />
    );

  };
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Suspense fallback={<CircularColor></CircularColor>}><Home /></Suspense>} />
        <Route path="/registro" element={<Suspense fallback={<CircularColor></CircularColor>}><Registro /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<CircularColor></CircularColor>}><Login /></Suspense>} />
        <Route path="/auth/" element={(<Suspense fallback={<CircularColor></CircularColor>}><Autenticacion /></Suspense>)} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena />} />
        <Route path="/admin" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Dashboard /></Suspense>, 1)} />
        <Route path="/usuarios" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Usuarios /></Suspense>, 1)} />
        <Route
          path="/sanciones"
          element={proteccionRutas(
            <Suspense fallback={<CircularColor></CircularColor>}>
              <Sanciones />
            </Suspense>, 1
          )}
        />
        <Route
          path="/*"
          element={<Navigate to="/home" replace />}
        />
        <Route path="/informes" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Informes /></Suspense>, 1)} />
        <Route path="/mensajes" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Mensajes /></Suspense>, 1)} />
        <Route path="/mensajes/:messageId" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><MensajeDetalle /></Suspense>, 1)} />
        <Route path='/prestamo/info/:prestamoId' element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><PrestamoDetalle /></Suspense>, 3, 2)} />
        <Route path="/inventario" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Inventario /></Suspense>, 1)} />
        <Route path="/solicitudes" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Solicitudes /></Suspense>, 1)} />
        <Route path="/Ajustes" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Ajustes /></Suspense>, 1)} />
        <Route path="/prestamos" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Prestamos /></Suspense>, 2,3)} />
        <Route path="/UsuarioSanciones" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><UsuarioSanciones/></Suspense>, 2,3)} />
        <Route path="/HistorialPrestamosU" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><HistorialPrestamosU /></Suspense>, 2,3)} />
        <Route path="/aprendiz" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Board /></Suspense>, 3, 2)} />
        <Route path="/implementos" element={proteccionRutas(<Suspense fallback={<CircularColor></CircularColor>}><Implementos /></Suspense>, 3, 2)} />
        <Route path="/perfil" element={(<Suspense fallback={<CircularColor></CircularColor>}><Perfil /></Suspense>)} />
      </Routes>
    </Router>
  );
}

