import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { getParametre } from '../../UseFetch';

const HistorialSancionUsuario = () => {
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParametre("/sanciones/usuario/", decode.id);
        setTableData(data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      timeZoneName: 'short' 
    };
    return new Date(dateString).toLocaleString();
  };
  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Typography variant="h5" gutterBottom></Typography>
      {tableData.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Tipo de Sancion</TableCell>
                <TableCell>Tiempo</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{formatDate(loan.createdAt)}</TableCell>
                  <TableCell>{loan.description}</TableCell>
                  <TableCell>{loan.duracion}</TableCell>
                  
                  <TableCell>{loan.estado ? 'Activo' : 'Inactivo'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No hay Sanciones registradas.</Typography>
      )}
    </Paper>
  );
};

export default HistorialSancionUsuario;
