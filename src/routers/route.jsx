import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Registro from '../pages/Registro'

export function LasRutas() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

//export default rutas;

