import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import get from "../../UseFetch";
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import "./Tablacorreo.css";
export default function DataGridDemo() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]); // Estado para las filas

  useEffect(() => {
    // Hacer la petición a la API
    get("/mail")
      .then((data) => {
        // Almacenar los datos en el estado
        setData(data);

        // Crear las filas con los IDs, correo, mensaje y asunto
        const rowsData = data.map((item) => ({
          id: item._id,
          correo: item.correo,
          mensaje: item.mensaje,
          asunto: item.asunto,
        }));
        setRows(rowsData);
      })
      .catch((error) => {
        console.error("Error al encontrar el resultado", error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'correo', headerName: 'Correo', width: 150, editable: true },
    { field: 'mensaje', headerName: 'Mensaje', width: 300, editable: true },
    { field: 'asunto', headerName: 'Asunto', width: 200, editable: true },
    {
      field: 'verDetalles',
      headerName: 'Ver Detalles',
      width: 150,
      renderCell: (params) => (
        <Link to={`/detalles/${params.row.id}`}>Ver Detalles</Link>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
   <DataGrid
  rows={rows}
  columns={columns}
  onRowClick={(params) => {
    // Redirige a la página de detalles al hacer clic en cualquier parte de la fila
    window.location.href = `/detalles/${params.row.id}`;
  }}
  getRowClassName={(params) => "clickable-row"}
/>

  </Box>
  );
}
