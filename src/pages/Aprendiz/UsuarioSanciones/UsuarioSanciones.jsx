import React from 'react';
import HistorialSancionUsuario from '../../../components/UsuarioSanciones/UsuarioSanciones';
import Menu from '../../../components/menu/Menu';
import "./UsuarioSanciones.css";


export default function UsuarioSanciones() {
  const mockLoanHistory = [
    { id: 1, fecha: '', implemento: '', estado: '' },
   
  ];

  return (
    <div>
      <Menu></Menu>
      <div className="contenedor-title">
      <h1> Historial de Sanciones</h1>
      </div>
      <HistorialSancionUsuario loanHistory={mockLoanHistory} />
    </div>
  );
}