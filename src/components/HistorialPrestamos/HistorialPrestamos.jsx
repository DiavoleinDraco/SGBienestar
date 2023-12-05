import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { getParametre } from '../../UseFetch';
import "./HistorialPrestamos.css";


const HistorialPrestamos = () => {
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    

    const fetchData = async () => {
        try {
          const data = await getParametre("/prestamos/usuario/", decode.id);
          setTableData(data);
        } catch (error) {
          console.error("Error al obtener datos de la API", error);
        }
      };
      

    fetchData();
  }, []);

  console.log(tableData);


  return (
    <div className='contenedor-tabla-HisPres'>
    <Paper elevation={3} className='tabla-contenedor-prestamos'>
      <Typography variant="h5" gutterBottom>
       
      </Typography>
      {tableData.length > 0 ? (
        <TableContainer style={{height: "100%"}}>
          <Table>
            <TableHead>
              <TableRow className='fila-encabezado-prestamos'>
                <TableCell> <b>Fecha</b> </TableCell>
                <TableCell> <b>Implemento</b> </TableCell>
                <TableCell> <b>Cantidad</b> </TableCell>
                <TableCell> <b>Estado</b> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((loan) => (
                <TableRow key={loan.id}>
                  {/* Parsear y formatear la fecha */}
                  <TableCell>{new Date(loan.fecha_fin).toLocaleString()}</TableCell>
                  <TableCell>{loan.implementos.map((implemento) => implemento.nombre)}</TableCell>
                  <TableCell>{loan.cantidad_implementos}</TableCell>
                  <TableCell>{loan.estado.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No  hay préstamos registrados.</Typography>
      )}
    </Paper>
    </div>
  );
};

export default HistorialPrestamos;
