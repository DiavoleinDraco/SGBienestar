import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { getParametre } from '../../UseFetch';


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
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Typography variant="h5" gutterBottom>
       
      </Typography>
      {tableData.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Implemento</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Estado</TableCell>
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
        <Typography variant="body1">No hay préstamos registrados.</Typography>
      )}
    </Paper>
  );
};

export default HistorialPrestamos;
