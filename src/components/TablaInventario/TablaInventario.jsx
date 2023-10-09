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
    { field: 'categoriaNombre', headerName: 'Categoría', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
    { field: 'marcaNombre', headerName: 'Marca', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
  ];

  // Función para combinar los datos del encabezado con los datos principales
// function combineDataWithHeader(data, headerData) {
//   // Crea una nueva matriz que contiene los datos del encabezado seguidos de los datos principales
//   const combinedData = [headerData, ...data.map(item => [item.nombre, item.categoriaNombre, item.cantidad, item.marcaNombre, item.descripcion])];
//   return combinedData;
// }

function generatePdf(data){
  const doc = new jsPDF();
  doc.autoTable({
    head: [['Nombre', 'Categoría', 'Cantidad', 'Marca', 'Descripción']],
    body: data.map(item => [item.nombre, item.categoriaNombre, item.cantidad, item.marcaNombre, item.descripcion])
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
        console.log(implementosdata)
        const transformedData = implementosdata.map((item) => ({
          ...item,
          id: item._id,
          
        }));

        setImplementos(transformedData);
        
        transformedData.forEach(async (item) => {
            if (item.categoria) {
                try {
                  const categoriaData = await get('/categoria');
                  // Asignar el nombre de la categoría al objeto
                  item.categoriaNombre = categoriaData.find((cat) => cat._id === item.categoria)?.nombre || '';
                  setImplementos((prevImplementos) =>
                    prevImplementos.map((prevItem) =>
                      prevItem.id === item.id ? item : prevItem
                    )
                  );
                } catch (error) {
                  console.error('No se pudo encontrar la categoría', error);
                }
              }
              if (item.marca) {
                try {
                  const marcaData = await get('/marca');
                  // Asignar el nombre de la marca al objeto
                  item.marcaNombre = marcaData.find((marca) => marca._id === item.marca)?.nombre || '';
                  setImplementos((prevImplementos) =>
                    prevImplementos.map((prevItem) =>
                      prevItem.id === item.id ? item : prevItem
                    )
                  );
                } catch (error) {
                  console.error('Error al obtener datos de marca', error);
                };
              };
        })
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
    <div style={{ height: 400, width: '100%', background: 'white' }}>
      <DataGrid rows={implementos} columns={columns} slots={{ columnMenu: CustomColumnMenu }} />
      <Buttons className='btn-informes' onclick={() => generatePdf(implementos)} nombre={'Descargar PDF'}/>
        <Buttons className='btn-informes' onclick={() => generateExcel(implementos)} nombre={'Descargar EXCEL'}/>
    </div>
  );
};