import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CircularColor from './components/Cargando/Cargando.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
   <Suspense fallback={<CircularColor> </CircularColor>}><App /></Suspense>
         
  </React.StrictMode>
);
