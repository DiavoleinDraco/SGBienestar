import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import get from '../../UseFetch';

const columns = [
  { id: 'numero', label: 'Numero', minWidth: 170 },
  { id: 'fecha', label: 'Fecha', minWidth: 170 },
  { id: 'nombre', label: 'Nombre del Informe', minWidth: 100 },
  {
    id: 'descargarPDF',
    label: 'Descargar en PDF',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'descargarExcel',
    label: 'Descargar en Excel',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

export default function TablaInformes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const filterData = () => {
    return tableData.filter((row) =>
      row.numero.toString().includes(searchTerm)
    );
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/informe/informes");
  
      
        const modifiedData = data.map((item) => {
          const modifiedNombre = quitarNumeroDelNombre(item.nombre);
          console.log(`Nombre original: ${item.nombre}, Nombre modificado: ${modifiedNombre}`);
          return {
            ...item,
            nombre: modifiedNombre,
          };
        });
  
        setTableData(modifiedData);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };
  
    fetchData();
  }, []);
  
  const quitarNumeroDelNombre = (nombre) => {
    return nombre.replace(/\s\d{2}_\d{2}_\d{4}\s\d{2}_\d{2}_\d{2}_\d{3}$/, '');
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>

<input
  type="text"
  placeholder="Buscar por número de informe"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Todos los Informes
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filterData()
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

