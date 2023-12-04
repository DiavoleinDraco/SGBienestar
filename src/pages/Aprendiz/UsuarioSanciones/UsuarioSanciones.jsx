import React from 'react';
import HistorialSancionUsuario from '../../../components/UsuarioSanciones/UsuarioSanciones';



export default function UsuarioSanciones() {
  const mockLoanHistory = [
    { id: 1, fecha: '', implemento: '', estado: '' },
   
  ];

  return (
    <div>
      <h1> Historial de Sanciones</h1>
      <HistorialSancionUsuario loanHistory={mockLoanHistory} />
    </div>
  );
}