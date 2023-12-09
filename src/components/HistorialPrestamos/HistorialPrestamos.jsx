import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { getParametre } from '../../UseFetch';
import "./HistorialPrestamos.css";

const HistorialPrestamos = () => {
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParametre("/prestamos/usuario/", decode.id);
        const sortedData = data.sort((a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin));

        setTableData(sortedData);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, [decode.id]);




  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredData = tableData.filter((loan) => {
    const formattedDate = formatDate(loan.fecha_fin)?.toLowerCase() || "";

    const implementoNombreMatches = loan.implementos.some(
      (implemento) => removeAccents(implemento.nombre.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
    );

    return (
      (removeAccents(loan.estado.nombre).toLowerCase().includes(removeAccents(searchTerm.toLowerCase()))) ||
      implementoNombreMatches ||
      (loan.cantidad_implementos && loan.cantidad_implementos.toString().toLowerCase().includes(removeAccents(searchTerm.toLowerCase()))) ||
      removeAccents(formattedDate).includes(removeAccents(searchTerm.toLowerCase()))
    );
  });




  return (
    <div className="contenedor-tabla-HisPres">
      <div className="contenedor-barr-HisPres">
        <input
          className='barr-HisPres'
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Paper elevation={3} className="tabla-contenedor-prestamos">
        <Typography variant="h5" gutterBottom></Typography>
        {tableData.length > 0 ? (
          <TableContainer style={{ height: "100%" }}>
            <Table>
              <TableHead>
                <TableRow className="fila-encabezado-prestamos">
                  <TableCell className="title-encabezado-pres">
                    {" "}
                    <b>Fecha</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado-pres">
                    {" "}
                    <b>Implemento</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado-pres">
                    {" "}
                    <b>Cantidad</b>{" "}
                  </TableCell>
                  <TableCell className="title-encabezado-pres">
                    {" "}
                    <b>Estado</b>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      {new Date(loan.fecha_fin).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {loan.implementos.map((implemento) => implemento.nombre)}
                    </TableCell>
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
    </div>
  );
};

export default HistorialPrestamos;
