import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { getParametre } from '../../UseFetch';
import "./UsuarioSanciones.css";

const HistorialSancionUsuario = () => {
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParametre("/sanciones/usuario/", decode.id);
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredData = tableData.filter((loan) => {
    const formattedDate = formatDate(loan.createdAt).toLowerCase();
    const formattedEstado = loan.estado ? "activo" : "inactivo";

    return (
      loan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loan.duracion && loan.duracion.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      formattedDate.includes(searchTerm.toLowerCase()) ||
      formattedEstado.includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="contenedor-tabla-HisSan">
      <div className="contenedor-barr-HisSan">
        <input
          className='barr-HisSan'
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Paper elevation={3} className="tabla-contenedor">
        <Typography variant="h5" gutterBottom></Typography>
        {tableData.length > 0 ? (
          <TableContainer style={{ height: "100%" }}>
            <Table>
              <TableHead>
                <TableRow className="fila-encabezado">
                  <TableCell className="title-encabezado">
                    {" "}
                    <b>Fecha</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado">
                    {" "}
                    <b>Tipo de Sancion</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado">
                    {" "}
                    <b>Tiempo</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado">
                    {" "}
                    <b>Estado</b>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{formatDate(loan.createdAt)}</TableCell>
                    <TableCell>{loan.description}</TableCell>
                    <TableCell>{loan.duracion}</TableCell>
                    <TableCell>{loan.estado ? "Activo" : "Inactivo"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No hay Sanciones registradas.</Typography>
        )}
      </Paper>
    </div>
  );
};

export default HistorialSancionUsuario;
