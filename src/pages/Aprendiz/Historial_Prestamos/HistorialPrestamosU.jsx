import React from 'react';
import HistorialPrestamos from "../../../components/HistorialPrestamos/HistorialPrestamos";
import Menu from '../../../components/menu/Menu';
import "./HistorialPrestamosU.css";

export default function HistorialPrestamosU() {
  const mockLoanHistory = [
    { id: 1, fecha: '', implemento: '', estado: '' },
   
  ];

  return (
    <div>
      <Menu></Menu>
      <div className="contenedor-title-pres">
      <h1> Historial de Préstamos</h1>
      </div>
      <HistorialPrestamos loanHistory={mockLoanHistory} />
    </div>
  );
}
