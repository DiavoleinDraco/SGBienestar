import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Menu from "../../../components/menu/Menu";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import get, { actualizar } from '../../../UseFetch';
import './Solicitudes.css';
// importacion de la imagen para el diseño.
import imagen from "./png.jpg";


export default function BasicTable() {
  const [tableData, setTableData] = useState([]);
  const [selectEstado, setTableDataEstado] = useState([]);
  const [idAprobado, setIdAprobado] = useState("");
  const [idRechazado, setIdRechazado] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/prestamos');
        setTableData(data);

        const datosGuardados = data;
        console.log("datos de la tabla", datosGuardados);

      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData();
  }, []);




  const idAprobadoInicial = null;
  const idRechazadoInicial = null;



  useEffect(() => {
    const fetchDataEstado = async () => {
      try {
        const data = await get('/estado-prestamo');
        const filtrados = data.filter(row => row.nombre === "Aprobado" || row.nombre === "Rechazado");
        const estadoSolicitudes = filtrados.map(row => ({ _id: row._id, nombre: row.nombre }));
        setTableDataEstado(estadoSolicitudes);

        const aprobado = filtrados.find(row => row.nombre === "Aprobado");
        const rechazado = filtrados.find(row => row.nombre === "Rechazado");

        setIdAprobado(aprobado?._id || idAprobadoInicial);
        setIdRechazado(rechazado?._id || idRechazadoInicial);

        console.log("ID Aprobado:", typeof (idAprobado));
        console.log("ID Rechazado:", idRechazado);

      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchDataEstado();
  }, [idAprobado, idRechazado]);
  console.log(idAprobado)





  //_____Actualizar_____


  const handleAceptar = async (id) => {
    try {
      console.log('perrolol' + idAprobado)
      await actualizar("/prestamos/", id, { estado: `${idAprobado}` });
    } catch (error) {
      console.error('Error al actualizar solicitud:', error);
    }
  };

  const handleRechazar = async (id) => {
    try {
      await actualizar("/prestamos/", id, { estado: `${idRechazado}` });
    } catch (error) {
      console.error('Error al actualizar solicitud:', error);
    }
  };







  return (
    <div>

      <div s className="contenedor-table-solicitudes">
        <Menu></Menu>
        <div className='contenedor-TitleSoli'>
        <h2 className='TitleSoli'>Apartado de <br /> Solicitudes</h2>
        </div>
        <div className="imagen-sanciones-container">
          <img className="imagen-sanciones" src={imagen} alt="imagen de pelota" />
        </div>
        <TableContainer className='cont-table-solicitudes' component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='right'>Usuario</TableCell>
                <TableCell align='right'>Numero de Documento</TableCell>
                <TableCell align='right'>Nombre del Implemento</TableCell>
                <TableCell align='right'>Estado de la solicitud</TableCell>
                <TableCell align='right'> Aprobar solicitud</TableCell>
                <TableCell align='right'>Rechazar solicitud</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.usuario.nombres + " " + row.usuario.apellidos}</TableCell>
                  <TableCell align="right">{row.usuario.n_doc}</TableCell>
                  <TableCell align="right">{row.usuario.apellidos}</TableCell>
                  <TableCell align="right">{row.estado.nombre}</TableCell>
                  <TableCell align="right">{<Button variant="contained" color="success" onClick={() => handleAceptar(row._id)}> Aceptar</Button>}</TableCell>
                  <TableCell align="right">{<Button variant="outlined" color="error" onClick={() => handleRechazar(row._id)}>Rechazar</Button>}</TableCell>

                </TableRow>

              ))}


            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );
}