import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useState, useEffect } from "react";
import get from "../../UseFetch.js";

export default function TablaUsarios() {

  const [data, setData] = useState([]);
  
  const columns = [
    {
      label: 'Ndoc',
      dataKey: 'numDoc',
    },
    {
      label: 'Programas',
      dataKey: 'nombrePrograma',
    },
    {
      label: 'Correo',
      dataKey: 'correo_inst',
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

  //mostrar datos
  useEffect(() => {
    get("/registro/usuario/651eab488811502b56d0e53e")
      .then((usuarioData) => {
        if (usuarioData.ficha && usuarioData.n_doc) {
          // Obtener el objeto de ficha
          get(`/ficha/${usuarioData.ficha}`)
            .then((fichaData) => {
              if (fichaData.programa) {
                // Obtener el objeto de programa
                get(`/programa/programa/${fichaData.programa}`)
                  .then((programaData) => {
                    const finalData = {
                      numDoc: usuarioData.n_doc,
                      nombrePrograma: programaData.nombre,
                      correo_inst: usuarioData.correo_inst,
                    };
                    setData([finalData]);
                  })
                  .catch((programaError) => {
                    console.error("Error al cargar el programa", programaError);
                  });
              } else {
                console.error("El objeto de ficha no tiene una propiedad 'programa'.");
              }
            })
            .catch((fichaError) => {
              console.error("Error al cargar la ficha", fichaError);
            });
        } else {
          console.error("El objeto de usuario no tiene una propiedad 'ficha'.");
        }
      })
      .catch((usuarioError) => {
        console.error("Error al cargar el usuario", usuarioError);
      });
  }, []);
  
  function encabezado() {
    return (
      <TableRow className=''>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };
  
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.label}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  };

  return (
    <Paper style={{ height: 400, width: '890px', position:"relative", left:"90px"}}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={encabezado}
        itemContent={rowContent}
      />
    </Paper>
  );
};