import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registro from './pages/Registro'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    
    </div>
  );
}

export default App;
