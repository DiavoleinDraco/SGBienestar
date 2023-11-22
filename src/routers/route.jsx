
import { BrowserRouter as Router, Routes, Route, Navigate,  } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
const CircularColor = lazy(() => import('../components/Cargando/Cargando.jsx'))
const Home = lazy(() => import('../pages/home/Home'));
const Registro = lazy(() => import('../pages/registro/Registro'));
const Login = lazy(() => import('../pages/login/Login'));
const Autenticacion = lazy(() => import('../pages/autenticacion/Autenticacion'));
import RecuperarContrasena from '../pages/recuperarC/RecuperarContrasena.jsx';
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



export function LasRutas() {
  const token = localStorage.getItem('token');
  const renderProtectedRoute = (element) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return element;
  };
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Suspense fallback={<CircularColor></CircularColor>}><Home /></Suspense>} />
      <Route path="/registro" element={<Suspense fallback={<CircularColor></CircularColor>}><Registro /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<CircularColor></CircularColor>}><Login /></Suspense>} />
      <Route path="/auth/:" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Autenticacion /></Suspense>)} />
        <Route path="/RecuperarContrasena" element={<RecuperarContrasena/>} />
        <Route path="/admin" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Dashboard /></Suspense>)} />
        <Route path="/usuarios" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Usuarios /></Suspense>)} />
        <Route
          path="/sanciones"
          element={renderProtectedRoute(
            <Suspense fallback={<CircularColor></CircularColor>}>
              <Sanciones />
            </Suspense>
          )}
        />     
        <Route path="/informes" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Informes /></Suspense>)} />
        <Route path="/mensajes" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Mensajes /></Suspense>)} />
        <Route path="/mensajes/:messageId" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><MensajeDetalle /></Suspense>)} />
        <Route path='/prestamo/info/:prestamoId' element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><PrestamoDetalle /></Suspense>)}/>
        <Route path="/inventario" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Inventario /></Suspense>)} />
        <Route path="/solicitudes" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Solicitudes /></Suspense>)} />
        <Route path="/prestamos" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Prestamos /></Suspense>)} />
        <Route path="/aprendiz" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Board /></Suspense>)} />
        <Route path="/implementos" element={renderProtectedRoute(<Suspense fallback={<CircularColor></CircularColor>}><Implementos /></Suspense>)} />

      </Routes>
    </Router>
  );
}
