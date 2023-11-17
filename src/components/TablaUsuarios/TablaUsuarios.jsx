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
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import './TablaUsuarios.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '10%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
   


   
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export function enviarData(datos) {
  console.log('enviar:', data)
 
}

export default function TablaUsarios() {

  const [data, setData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
      <TableRow className='cont-table'>
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
         
        </TableCell>
      </TableRow>
    );
  };
  //_______Botton de enviar la informacion de la sancion//
  function handleSancionarClick(userData) {
    setSelectedUserData(userData);
    setSelectedUserData(userData);
    console.log(userData)
    sessionStorage.setItem("as",JSON.stringify(data[userData]))
    console.log(sessionStorage.getItem("as"))
    console.log('user:', data[userData]);
 
    navigate('/sanciones', { state: { userData } });
  }
 
  function rowContent(_index, row) {

    if (searchTerm.length > 0) {
      const searchRegex = new RegExp(searchTerm, 'i'); // 'i' para hacerlo insensible a mayúsculas/minúsculas
      const searchData = Object.values(row).join(' '); // Concatena todos los valores de la fila en una sola cadena
      if (!searchData.match(searchRegex)) {
        return null; // No muestra la fila si no coincide con el término de búsqueda
      }
    }
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

  console.log('dataaaa:' , data)

  return (
    <Paper style={{ height: 939, width: '100%', background:"TRANSPARENT",display:"flex",flexDirection:"column"}}>
      <Toolbar className='cont-busc'>
        <Search className='buscador'>
          <SearchIconWrapper className='lupaa'>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Buscar usuarios"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Search>
      </Toolbar>

      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={encabezado}
        itemContent={rowContent}
      />
    </Paper>
  );
};