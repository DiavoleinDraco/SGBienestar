import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { DataGrid, GridColumnMenu } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Buttons from '../Buttons/Buttons.jsx';
import * as XLSX from 'xlsx';
import get from "../../UseFetch.js";

export default function TablaInventario() {
    const [implementos, setImplementos] = useState([]);

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'categoria', headerName: 'Categoría', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
    { field: 'marca', headerName: 'Marca', flex: 1 },
    { field: 'peso', headerName: 'Peso', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'color', headerName: 'Color', flex: 1 },
    { field: 'detalles', headerName: 'Detalles', flex: 1 },
    //en la descripcion va el material y el color y el tamano
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
  ];

//   // Función para combinar los datos del encabezado con los datos principales
//   function combineDataWithHeader(data, headerData) {
// // //   // Crea una nueva matriz que contiene los datos del encabezado seguidos de los datos principales
//    const combinedData = [headerData, ...data.map(item => [item.nombre, item.categoriaNombre, item.cantidad, item.marcaNombre, item.peso, item.estado, item.color, item.detalles,item.descripcion])];
//    return combinedData;
//   }

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
  

  function CustomUserItem(props) {
    const { myCustomHandler, myCustomValue } = props;
    return (
      <MenuItem onClick={myCustomHandler}>
        <ListItemIcon>
          <SettingsApplicationsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{myCustomValue}</ListItemText>
      </MenuItem>
    );
  }

  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          // Agregar nuevo ítem
          columnMenuUserItem: CustomUserItem,
        }}
        slotProps={{
          columnMenuUserItem: {
            // Establecer el orden de visualización para el nuevo ítem
            displayOrder: 15,
            // Pasar propiedades adicionales
            myCustomValue: 'Do custom action',
            myCustomHandler: () => alert('Custom handler fired'),
          },
        }}
      />
    );
  }

  return (
    <div style={{ height: 400, width: '130%', background: 'white' }}>
      <DataGrid rows={implementos} columns={columns} slots={{ columnMenu: CustomColumnMenu }} />
      <Buttons className='btn-informes' onclick={() => generatePdf(implementos)} nombre={'Descargar PDF'}/>
        <Buttons className='btn-informes' onclick={() => generateExcel(implementos)} nombre={'Descargar EXCEL'} />
    </div>
  );
};