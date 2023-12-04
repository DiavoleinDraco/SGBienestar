import React from 'react';
import HistorialPrestamos from "../../../components/HistorialPrestamos/HistorialPrestamos";

export default function HistorialPrestamosU() {
  const mockLoanHistory = [
    { id: 1, fecha: '', implemento: '', estado: '' },
   
  ];

  return (
    <div>
      <h1> Historial de Préstamos</h1>
      <HistorialPrestamos loanHistory={mockLoanHistory} />
    </div>
  );
}
