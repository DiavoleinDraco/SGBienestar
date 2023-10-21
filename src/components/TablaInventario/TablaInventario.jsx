import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Buttons from '../Buttons/Buttons.jsx';
import { TableVirtuoso } from 'react-virtuoso';
import { Popover } from '@mui/material';
import Switch from '@mui/material/Switch';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FilterListIcon from '@mui/icons-material/FilterList';
import * as XLSX from 'xlsx';
import get from "../../UseFetch.js";

export default function TablaInventario() {
    const [implementos, setImplementos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnVisibility, setColumnVisibility] = useState({
      nombre: true,
      categoria: true,
      cantidad: true,
      marca: true,
      peso: true,
      estado: true,
      color: true,
      detalles: true,
      descripcion: true,
    });

    function handleColumnVisibilityChange(columnKey) {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnKey]: !prevVisibility[columnKey],
      }));
    }

    const ColumnVisibilityControls = () => {
      return (
        <div>
          {columns.map((column) => (
            <label key={column.dataKey}>
              <Switch
                checked={columnVisibility[column.dataKey]}
                onChange={() => handleColumnVisibilityChange(column.dataKey)}
              />
              {column.label}
            </label>
          ))}
        </div>
      );
    };

  const columns = [
    {
      label: 'Nombre',
      dataKey: 'nombre',
    },
    {
      label: 'Categoría',
      dataKey: 'categoria',
    },
    {
      label: 'Cantidad',
      dataKey: 'cantidad',
    },
    {
      label: 'Marca',
      dataKey: 'marca',
    },
    {
      label: 'Peso',
      dataKey: 'peso',
    },
    {
      label: 'Estado',
      dataKey: 'estado',
    },
    {
      label: 'Color',
      dataKey: 'color',
    },
    {
      label: 'Detalles',
      dataKey: 'detalles',
    },
    {
      label: 'Descripción',
      dataKey: 'descripcion',
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  useEffect(() => {
    get('/implementos')
      .then((implementosdata) => {
        // Mapear los datos y cambiar '_id' a 'id'
        console.log('Info de impplementos: ', implementosdata)
        const transformedData = implementosdata.map((item) => {
          const material = item.descripcion.material || 'No especificado';
        const tamano = item.descripcion.tamano || 'No especificado';
        const descripcion = `Material: ${material}, Tamaño: ${tamano}`;
        
        return {
          ...item, 
          id: item._id, 
          nombre: item.nombre, 
          categoria: item.categoria[0] ? item.categoria[0].nombre : '',
          marca: item.marca.nombre,
          peso: item.descripcion.peso,
          estado: item.estado.map((estadoItem) => estadoItem.estado[0].estado).join(' , '),
          color: item.descripcion.color,
          detalles: item.descripcion.detalles,
          descripcion: descripcion
        }
      });

        console.log(transformedData)
        setImplementos(transformedData);
      })
      .catch((error) => {
        console.error('Error al cargar los implementos', error);
      });
  }, []);

  

function generatePdf(data, headerData) {
  const doc = new jsPDF();
  doc.autoTable({
    head: [['Nombre', 'Categoría', 'Cantidad', 'Marca','Peso', 'Estado', 'Color', 'Detalles', 'Descripción']],
    body: data.map(item => [item.nombre, item.categoria, item.cantidad, item.marca, item.peso, item.estado, item.color, item.detalles,item.descripcion])
  });
  doc.save('informe.pdf')
};

function generateExcel(data){
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Informe');
  XLSX.writeFile(wb, 'informe.xlsx')
}
  
  function encabezado() {
    return (
      <TableRow className=''>
        {columns.map((column) => {
          if (columnVisibility[column.dataKey]) {
            return (
              <TableCell
                key={column.dataKey}
                variant="head"
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.label}
              </TableCell>
            );
          }
          return null;
        })}
      </TableRow>
    );
  }
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => {
          if (columnVisibility[column.dataKey]) {
            return (
              <TableCell key={column.dataKey}>
                {row[column.dataKey]}
              </TableCell>
            );
          }
          return null;
        })}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: 600, width: '1030px', position:"relative", left:"90px"}}>
      <Popover
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => setAnchorEl(null)}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
>
  <div style={{ padding: 16 }}>
    <ColumnVisibilityControls />
  </div>
  Elija la Informacion que desea en su informe.
</Popover>
      
      <Tooltip title="Filtrar Tabla">
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FilterListIcon />
      </IconButton>
        </Tooltip>
      <TableVirtuoso
        data={implementos}
        components={VirtuosoTableComponents}
        fixedHeaderContent={encabezado}
        itemContent={rowContent}
      />
      <Buttons className='btn-informes' onclick={() => generatePdf(implementos)} nombre={'Descargar PDF'}/>
        <Buttons className='btn-informes' onclick={() => generateExcel(implementos)} nombre={'Descargar EXCEL'} />
    </Paper>
  );
};