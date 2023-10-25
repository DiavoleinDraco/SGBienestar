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
import Buttons from '../Buttons/Buttons.jsx';
import { handleBreakpoints } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function TablaUsarios() {

  const [data, setData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const navigate = useNavigate()
  
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
    get("/registro/info")
      .then((usuarioData) => {
        console.log('Hola', usuarioData);
        const dataTabla = usuarioData.map((user) => ({
          id: user._id,
          numDoc: user.n_doc,
          nombrePrograma: user.ficha && user.ficha.programa.nombre,
          correo_inst: user.correo_inst,
        }));
        setData(dataTabla);
        console.log('datatabla',dataTabla);
        
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
        <TableCell
          variant="head"
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          sancionar
        </TableCell>
      </TableRow>
    );
  };

  //_______Botton de enviar la informacion de la sancion//

  function handleSancionarClick(userData) {
 
    setSelectedUserData(userData);
    console.log(userData)
    sessionStorage.setItem("as",JSON.stringify(data[userData]))
    console.log(sessionStorage.getItem("as"))
    console.log('user:', data[userData]);
  
    navigate('/sanciones', { state: { userData } });
  }

  //______________________________________________________
  
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
       <TableCell>
          <Buttons
            nombre='sancionar' 
            onclick={() => handleSancionarClick(_index) }
          />
        </TableCell>
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
