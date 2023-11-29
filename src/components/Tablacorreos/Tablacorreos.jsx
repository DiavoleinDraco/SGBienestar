import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import get, { eliminar } from '../../UseFetch';
import './Tablacorreo.css'

export default function DataGridProDemo({ Delete, Consulta }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null);

  const navigate = useNavigate();

  const tableCellStyle = {
    fontSize: '14px',
  };

  const tableContainerStyle = {
    width: '100%',
  };

  const tableRowStyle = {
    height: '2vh',
  };

  const handleDeleteClick = async (_id) => {
    try {
      await eliminar(Delete, _id);

      const updatedRows = rows.filter(row => row._id !== _id);
      setRows(updatedRows);
      alert("Se ha eliminado el correo exitosamente")
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  useEffect(() => {
    get(Consulta)
      .then((fetchedData) => {
        setData(fetchedData);
        const rowsData = fetchedData.map((item) => {
          let correosmostrar;
          if (item && Array.isArray(item.correo) && item.correo.length > 2) {
            correosmostrar = item.correo.slice(0, 2).join(", ") + " ...";
          } else if (item && Array.isArray(item.correo)) {
            correosmostrar = item.correo.join(", ");
          } else {
            correosmostrar = "Correo no válido";
          }
          console.log(item.correo)
  
          return {
            _id: item._id,
            correo: item.correo,
            correoCortado: correosmostrar,
            asunto: item.asunto,
            mensaje: item.mensaje,
            fechaEnvio: item.createdAt
          };
        }).sort((a, b) => new Date(b.fechaEnvio) - new Date(a.fechaEnvio));
  
        setRows(rowsData);
      })
      .catch((error) => {
        console.error("Error al encontrar el resultado", error);
      });
  }, [Consulta]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCellClick = (_id) => {
    navigate(`/mensajes/${_id}`);
  };

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow
              key={index}
              style={{ cursor: 'pointer', ...tableRowStyle }}
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={handleRowMouseLeave}
            >
              <TableCell component="th" scope="row" style={tableCellStyle} onClick={() => handleCellClick(row._id)}>
                {row.correoCortado}
              </TableCell>
              <TableCell align="right" onClick={() => handleCellClick(row._id)}>
                {row.asunto}
              </TableCell>
              <TableCell align="right" onClick={() => handleCellClick(row._id)}>
                {row.mensaje}
              </TableCell>
              <TableCell>
                <DeleteIcon
                  className="delete-icon"
                  onClick={() => handleDeleteClick(row._id)}
                  style={{
                    cursor: 'pointer',
                    display: highlightedRow === index ? 'block' : 'none'
                  }}
                />
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 2 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={ { label: 'All', value: -1 }}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

