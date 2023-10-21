import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete'; 
import IconButton from '@mui/material/IconButton';
import get from "../../UseFetch.js";
import { useState, useEffect } from "react";

export default function HistorialSanciones() {
  const [selected, setSelected] = useState([]); 
  const [sancionesData, setSancionesData] = useState([]);

  function createData(id, nombre, programa, sancion, tiempo, fecha) {
    return { id, nombre, programa, sancion, tiempo, fecha};
  }

  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }

  function formatTiempo(tiempo) {
    const horas = tiempo
    const dias = Math.floor(horas / 24)
    return `${dias} días`;
  }
  
  const rows = sancionesData.map((sancion, index) => createData(sancion.id, sancion.nombre, sancion.programa, sancion.sancion, sancion.tiempo, sancion.fecha, index));


  useEffect(() => {
    get('/sanciones')
      .then((data) => {
        console.log('data', data);
        const contenidoData = data.map((sancion, index) => ({
          id: index, // Asigna un ID único para cada fila
          nombre: sancion.usuario ? sancion.usuario.nombres : 'null',
          programa: sancion.usuario && sancion.usuario.ficha ? sancion.usuario.ficha.programa.nombre : 'null',
          sancion: sancion.description,
          tiempo: formatTiempo(sancion.duracion),
          fecha: formatFecha(sancion.createdAt)
        }));
        const sortedData = [...contenidoData].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setSancionesData(sortedData);
        console.log('contenido', sortedData);
      })
      .catch((usuarioError) => {
        console.error("Error al cargar el usuario", usuarioError);
      });
  }, []);

  const handleRowClick = (id) => {
    // Comprueba si la fila ya está seleccionada
    const selectedIndex = selected.indexOf(id);
    let newSelected = [...selected];

    if (selectedIndex === -1) {
      // Si no está seleccionada, agrégala
      newSelected.push(id);
    } else {
      // Si ya está seleccionada, quítala
      newSelected.splice(selectedIndex, 1);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDelete = () => {
    // Implementa la lógica para eliminar las filas seleccionadas
    console.log('Filas seleccionadas:', selected);
    // Puedes llamar a una función aquí para eliminar las filas
    // Por ejemplo: eliminarFilasSeleccionadas(selected)
  };

  return (
    <div>
      <div>
        {selected.length > 0 && (
          <div>
            <span>{selected.length} fila(s) seleccionada(s)</span>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={selected.length === rows.length}
                  onChange={() => {
                    if (selected.length === rows.length) {
                      setSelected([]);
                    } else {
                      setSelected(rows.map((row) => row.id));
                    }
                  }}
                />
              </TableCell>
              <TableCell>Seleccionar todo</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Programa</TableCell>
              <TableCell align="right">Sancion</TableCell>
              <TableCell align="right">Tiempo</TableCell>
              <TableCell align="right">Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                selected={isSelected(row.id)}
                onClick={() => handleRowClick(row.id)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(row.id)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.programa}</TableCell>
                <TableCell align="right">{row.sancion}</TableCell>
                <TableCell align="right">{row.tiempo}</TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};