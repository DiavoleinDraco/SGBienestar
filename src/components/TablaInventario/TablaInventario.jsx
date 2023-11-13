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
import { TableVirtuoso } from 'react-virtuoso';
import { Popover } from '@mui/material';
import Switch from '@mui/material/Switch';
import 'jspdf-autotable';
import FilterListIcon from '@mui/icons-material/FilterList';
import get, { eliminar, post, actualizar } from '../../UseFetch';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ComSelect from '../ComSelect/ComSelect';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Options from '../Options/Options';
import BasicAccordion from '../BasicAccordion/BasicAccordion';
import Dialogos from '../Dialogos/Dialogos';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function TablaInventario() {
    const [implementos, setImplementos] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [errorrType, setErrorType] = useState({});
    const [errorMensaje, setErrorMensaje] = useState(null);
    const [cat, setCat] = useState('');
    const [est, setEst] = useState('');
    const [marc, setMarc] = useState('');
    const [eliminarCat, setEliminarCat] = useState(false);
    const [eliminarEstado, setEliminarEstado] = useState(false);
    const [eliminarMarca, setEliminaMarca] = useState(false);
    const [crearCat, setCrearCat] = useState(false);
    const [crearEstado, setCrearEstado] = useState(false)
    const [crearMarca, setCrearMarca] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [extraerId, setExtraerId] = useState(null);
    const [extraerCategory, setExtraerCategory] = useState(null);
    const [extraerMaterial, setExtraerMaterial] = useState(null);
    const [extraerTamano, setExtraerTamano] = useState(null);
    const [extraerMarca, setExtraerMarca] = useState(null);
    const [extraerEstado, setExtraerEstado] = useState(null);
    const [extraerCantidadEstado, setExtraerCantidadEstado] = useState(null);
    const [extraerApto, setExtraerApto] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteImplementos, setDeleteImplementos] = useState(null);
    const [deleteValues, setDeleteValues] = useState({});
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSanck] = useState(false);
    const [openEditer, setOpenEditer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [categoria, setCategoria] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [marca, setMarca] = useState([])
    const [selectedMarca, setSelectedMarca] = useState(null)
    const [estado, setEstado] = useState([])
    const [selectedEstado, setSelectedEstado] = useState(null)
    const [aptoValue, setAptoValue] = useState('')
    const [selectedImplementoData, setSelectedImplementoData] = useState(null);
    const [crearImplemento, setCrearImplemento] = useState(false);
    const [implementoEditado, setImplementoEditado] = useState(null);
    const [newImplemento, setNewImplemento] = useState({
      codigo: '',
      nombre: '',
      marca: [],
      descripcion: {
        peso: '',
        color: '',
        material: '',
        detalles: '',
        tamano: '',
      },
      categoria: [],
      cantidad: 0,
      img: null,
      estado: [
        {
          estado: '',
          cantidad: 0, 
          apto: false, 
        },
      ],
    });

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
    };
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
    {label: 'Nombre', dataKey: 'nombre'},
    {label: 'Categoría',dataKey: 'categoria'},
    {label: 'Cantidad', dataKey: 'cantidad'},
    {label: 'Marca', dataKey: 'marca'},
    {label: 'Peso', dataKey: 'peso'},
    {label: 'Estado', dataKey: 'estado'},
    {label: 'Color', dataKey: 'color'},
    {label: 'Detalles', dataKey: 'detalles'},
    {label: 'Descripción', dataKey: 'descripcion'},
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
  const createMarcaClick = () => {
    setCrearMarca(true)
  };
  const eliminarCatClick = () => {
    setEliminarCat(true)
  }
  const eliminarEstadoClick = () => {
    setEliminarEstado(true)
  }
  const eliminarMarcaClick = () => {
    setEliminaMarca(true)
  }

  const createCategoriaClick = () => {
    setCrearCat(true)
  };
  const [NewCategoria, setNewCategoria] = useState({nombre: '', img: 'null'})
  const handleCreateCategoriaSubmit = async () => {
    try {
      if (NewCategoria.nombre === '') {
        setErrorMensaje('Completa el campo para la creación');
        setOpenSanck(true);
      } else {
        const response = await post('/categoria', NewCategoria);
        console.log('Se ha creado una nueva Categoría con éxito', response);
        setNewCategoria({ nombre: '', img: 'null' });
        createClose();
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error)
      
    };
  };

  const createEstadoClick = () => {
    setCrearEstado(true)
  }
  const [newEstado, setNewEstado] = useState({estado: ''})
  const handleCreateEstadoSubmit = async () => {
    try{
      if(newEstado.estado === ''){
      setErrorMensaje('Completa el campo para la creación')
      setOpenSanck(true)
      } else {
      const response = await post('/estado-implemento', newEstado)
      console.log('se ha creado un nuevo estado: ', response)
      setNewEstado({ estado: ''})
      createClose()
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error)
      setOpenSanck(true)
    }
  };

  const [newMarca, setNewMarca] = useState({nombre: ''})
  const handleCreateMarcaSubmit = async () => {
    try {
      if(newMarca.nombre === ''){
        setErrorMensaje('Completa el campo para la creación')
        setOpenSanck(true)
      } else {
        const response = await post('/marca', newMarca)
        console.log('Se ha creado una nueva Marca: ', response)
        setNewMarca({nombre: ''})
        createClose()
      }
    } catch (error) {
      console.log('Error en la solicitud: ', error)
    }
  };

  const createClose = () => {
    setCrearMarca(false)
    setCrearCat(false)
    setCrearEstado(false)
    setEliminaMarca(false)
    setEliminarCat(false)
    setEliminarEstado(false)
  };

  const handleEliminarCat = async () => {
    try {
      if (cat) {
        await eliminar('/categoria/', cat);
        console.log('Categoría eliminada con éxito');
        createClose()
        setReloadData(!reloadData);
      } else {
        setErrorMensaje('Seleccione una categoría a eliminar')
        setOpenSanck(true)
      }
    } catch (error) {
      console.error('Error al eliminar la categoría', error);
    }
  };

  const handleEliminarMarc = async () => {
    try {
      if(marc) {
        await eliminar('/marca/', marc);
        console.log('Marca eliminada con éxito');
        createClose()
        setReloadData(!reloadData);
      } else {
        setErrorMensaje('Seleccione una marca a eliminar')
        setOpenSanck(true)
      }
    } catch (error) {
      console.error('Error al eliminar la marca', error);
    }
  }

 const handleEliminarEst = async () => {
  try {
    if(est) {
      await eliminar('/estado-implemento/', est);
      console.log('Estado eliminado con éxito');
      createClose()
      setReloadData(!reloadData);
    } else {
      setErrorMensaje('Seleccione un estado a eliminar')
      setOpenSanck(true)
    }
  } catch (error) {
    console.error('Error al eliminar el estado', error);
  }
 }

    const menuItems = [
     { label: <div>
      <BasicAccordion 
      titulo={'Crear'}
      contenido={
        <div>
          <button onClick={createCategoriaClick}>Categoría</button>
          <button onClick={createEstadoClick}>Estado</button>
          <button onClick={createMarcaClick}>Marca</button>
        </div>
      }/>
     </div>},
     { label: <div>
      <BasicAccordion 
      titulo={'Eliminar'}
      contenido={
        <div>
          <button onClick={eliminarCatClick}>Categoría</button>
          <button onClick={eliminarEstadoClick}>Estado</button>
          <button onClick={eliminarMarcaClick}>Marca</button>
        </div>
      }/>
     </div>}
    ]

  useEffect(() => {
    get("/categoria")
      .then((data) => {
        setCategoria(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, [reloadData]);

  const handleCategoriaFormSubmit = (selectedCategoria) => {
    const selectedCategoriaOption = selectedIdCat.find(
      (option) => option.label === selectedCategoria
    ); 

    if (selectedCategoriaOption){
      const selectedInfoCat = selectedCategoriaOption.value;
      const updateInfo = {...newImplemento, categoria: selectedInfoCat};
      setNewImplemento(updateInfo)
      setCat(selectedInfoCat)
    }
  }

  const selectedIdCat = categoria.map((cat) => ({
    label: cat.nombre,
    value: cat['_id']
  }));


  useEffect(() => {
    get("/marca")
      .then((data) => {
        setMarca(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, [reloadData]);

  const handleMarcaFormit = (selectedMarca) => {
    const selectedMarcaOption = selectedMarcaInfor.find(
      (option) => option.label === selectedMarca
    );

    if(selectedMarcaOption){
      const selectedInfoMarca = selectedMarcaOption.value;
      const updatedInfo = {...newImplemento, marca: selectedInfoMarca }
      setNewImplemento(updatedInfo)
      setMarc(selectedInfoMarca)
    }
  }

  const selectedMarcaInfor = marca.map((marca) => ({
    label: marca.nombre,
    value: marca["_id"]
  }))

  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value)
    // Verificar si la cadena es un número válido
    if (!isNaN(newCantidad) && newCantidad !== '') {
      setNewImplemento((prevImplemento) => ({
        ...prevImplemento,
        estado: [
          {
            ...prevImplemento.estado[0],
            cantidad: parseInt(newCantidad, 10),
          },
        ],
      }));
    } else {
      console.error('La cantidad no es un número válido o está vacía.');
    }
  };
  
  const handleGeneralCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value, 10);
  
    // Verificar si la cadena es un número válido
    if (!isNaN(newCantidad)) {
      setNewImplemento((prevImplemento) => ({
        ...prevImplemento,
        cantidad: parseInt(newCantidad, 10), // Actualiza la cantidad debajo de la categoría
      }));
    } else {
      // Aquí puedes manejar la entrada no válida, por ejemplo, mostrando un mensaje de error
      console.error('La cantidad debajo de la categoría no es un número válido.');
    }
  };

  const handleChangeRadio = (event) => {
    setAptoValue(event.target.value === 'true');
  };

  useEffect(() => {
    get("/estado-implemento")
      .then((data) => {
        setEstado(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, [reloadData]);

  const handleEstadoFormit = (selectedEstado) => {
    const selectedEstadoOption = selectedEstadoInfoo.find(
      (option) => option.label === selectedEstado
    );
  
    if (selectedEstadoOption) {
      const selectedInfoEstado = selectedEstadoOption.value;
      setEst(selectedInfoEstado)
      console.log('Valor de apto en el estado:', aptoValue);
      setNewImplemento((prevNewImplemento) => ({
        ...prevNewImplemento,
        estado: [
          {
            estado: selectedInfoEstado,
            cantidad: prevNewImplemento.estado[0].cantidad,
            apto: aptoValue,
          },
        ],
      }));
      setAptoValue(aptoValue);
    }
  };
  
  const selectedEstadoInfoo = estado.map((data) => ({
    label: data.estado,
    value: data['_id']
  }))

//----------------------------------------------------------------------------Crear el implemento----//
const handleCreateImplementoClick = () => {
  setCrearImplemento(true);
};

const handleCreateImplementoClose = () => {
  setCrearImplemento(false);
};

const handleCloseSnackBar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSanck(false);
    };
    

const handleCreateImplementoSubmit = async () => {
    const cantidad = parseInt(newImplemento.estado[0].cantidad);
    if (isNaN(cantidad) || cantidad < 0) {
      console.error('La cantidad no es un número válido o está vacía o es menor o igual a cero');
      setOpenSanck(true)
      return;
    }

  const data = {
    codigo: newImplemento.codigo,
    nombre: newImplemento.nombre,
    marca: newImplemento.marca.toString(),
    descripcion: newImplemento.descripcion,
    categoria: newImplemento.categoria,
    cantidad: newImplemento.cantidad,
    img: newImplemento.img,
    estado: newImplemento.estado,
  };
    console.log('INFO DE NUEVOS IMPLEMENTOS', data)
    const isEmptyField = Object.values(data).some(value => value === '' || value === undefined);

  if (isEmptyField) {
    setErrorMensaje('Completa todos los campos');
    setOpenSanck(true);
    return;
  }

    try {
      const response = await post('/implementos', data);
      console.log('Se ha creado un implemento con éxito', response);
      // Actualiza la lista de implementos en el estado local
      const newImplemento = response; // Reemplaza con la estructura real de la respuesta del servidor
      const updatedImplementos = [...implementos, newImplemento]; // Agrega el nuevo implemento a la lista existente
      setImplementos(updatedImplementos);
      // Cierra el diálogo de creación de implemento
      handleCreateImplementoClose();
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    };
  };

  //-------------------------- Traer los implementos-------------------------//
  useEffect(() => {
    get('/implementos')
      .then((implementosdata) => {
        // Mapear los datos y cambiar '_id' a 'id'
        console.log('Info de impplementos: ', implementosdata)
        const transformedData = implementosdata.map((item) => {
          const material = item.descripcion ? item.descripcion.material || null : null;
          const tamano = item.descripcion.tamano || null;
          const descripcion = `Material: ${material}, Tamaño: ${tamano}`;
          const estado = item.estado ? item.estado[0].estado : null;
          const cantidadEstado = item.estado && item.estado[0] ? item.estado[0].cantidad || null : null;
          const valueAP = item.estado[0].apto || false
        
          return {
            ...item, 
            id: item._id, 
            nombre: item.nombre, 
            categoria: item.categoria[0] ? item.categoria[0].nombre : null,
            marca: item.marca ? item.marca.nombre : null,
            peso: item.descripcion.peso,
            estado: estado ? estado[0].estado : null,
            cantidadEstado: cantidadEstado,
            apto: valueAP,
            color: item.descripcion.color,
            detalles: item.descripcion.detalles,
            descripcion: descripcion
          }
        });
        setImplementos(transformedData);
      })
      .catch((error) => {
        console.error('Error al cargar los implementos', error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminarSancionClick = async (_id) => {
    try {
      await eliminar('/implementos/', _id);
      const updateImplementos = implementos.filter(row => row._id !== _id)
      setImplementos(updateImplementos)
    } catch (error) {
      console.error('error al eliminar', error)
    }
  };

  const handleEliminarClick = (id) => {
    setDeleteImplementos(id);
    const implementoEliminar = implementos.find((item) => item.id === id);
    setDeleteValues(implementoEliminar);
    setOpen(true); // Abre el diálogo al hacer clic en el botón "Eliminar"
  };

  const handleAgreeClick = () => {
    handleClose();
    // Agregar aquí la lógica para eliminar el elemento después de confirmar "Agree"
    handleEliminarSancionClick(deleteImplementos);
    console.log('Eliminar implemento con ID: ', deleteImplementos);
  };

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

         <TableCell
          variant="head"
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
        </TableCell>

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
  
  const handleClickOpenDialogEditer = () => {
    setOpenEditer(true);
  };
  const handleCloseDialogEditer = () => {
    setOpenEditer(false);
  };

  async function actualizarImplemento(imple) {
    setSelectedRowData(imple);
    setSelectedImplementoData(imple);
    setExtraerId(imple._id)
    setExtraerCategory(imple.categoria);
    setExtraerEstado(imple.estado);
    setExtraerMarca(imple.marca);
    setExtraerCantidadEstado(imple.cantidadEstado)
    setExtraerApto(imple.apto)
    console.log('este es este', imple)
    
    const descri = imple.descripcion;
    const materialMatch = descri.match(/Material: (.*?),/)
    const tamanoMatch = descri.match(/Tamaño: (.*?)(?:,|$)/);

    if(materialMatch && materialMatch[1] && tamanoMatch && tamanoMatch[1]){
    const mate = materialMatch[1].trim();
    const taman = tamanoMatch[1].trim();
    setExtraerTamano(taman)
    setExtraerMaterial(mate)
    };
    handleClickOpenDialogEditer()
  };

  async function actualizarPatch(imple) {

    const data = {
      codigo: newImplemento.codigo,
      nombre: newImplemento.nombre,
      marca: newImplemento.marca.toString(),
      descripcion: newImplemento.descripcion,
      categoria: newImplemento.categoria,
      cantidad: newImplemento.cantidad,
      img: newImplemento.img,
      estado: newImplemento.estado,
    }
    console.log('data de implementos modificados: ', data)

    try {
      const response = await actualizar('/implementos/', extraerId, data);
      console.log(`Implemento actualizado con éxito:  ${response}`);
    } catch (error) {
      console.error('Error al actualizar el implemento', error);
    }
    handleCloseDialogEditer()
  };

 function rowContent(_index, row) {
  if (searchTerm.length > 0) {
    const searchRegex = new RegExp(searchTerm, 'i'); // 'i' para hacerlo insensible a mayúsculas/minúsculas
    const searchData = Object.values(row).join(' '); // Concatena todos los valores de la fila en una sola cadena
    if (!searchData.match(searchRegex)) {
      return null; // No muestra la fila si no coincide con el término de búsqueda
    };
  };

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
      <TableCell>
        <IconButton onClick={() => actualizarImplemento(row)}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleEliminarClick(row.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </React.Fragment>
  );
};

console.log('aptovalue: ', aptoValue)

  return (
    <Paper style={{ height: 600, width: '1030px', position: 'relative', left: '90px' }}>
      <Toolbar>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Buscar implemento…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
      </Toolbar>

      <Options 
      nombre='Más'
      menuItems={menuItems}
      filter={<div>
         <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{ vertical: 'top', horizontal: 'left'}}>

        <div style={{ padding: 16 }}>
          <ColumnVisibilityControls />
        </div>
        Elija la información que desea en su informe.
      </Popover>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <FilterListIcon /> Filtrar
        </IconButton>
      </div>}/>
      
      <TableVirtuoso
        data={implementos}
        components={VirtuosoTableComponents}
        fixedHeaderContent={encabezado}
        itemContent={rowContent}
      />

      <Dialogos 
      opener={open}
      closer={handleClose}
      titulo="¿DE VERDAD DESEA ELIMINAR ESTE IMPLEMENTO?"
      texto='Recuerde que si elimina este implemento no hay forma alguna de recuperarlo... cabe recalcar que si desea puede crear un  nuevo implemento sin necesidad de eliminar uno en especifico.'
        handle={handleAgreeClick}
        hacer='Eliminar'
      />
      <Dialogos 
      opener={eliminarCat}
      closer={createClose}
      contenido={ <ComSelect 
        nombre='Categoria'
        items={selectedIdCat.map((opcion) => opcion.label)}
        onChange={(value) => handleCategoriaFormSubmit(value)}
        getOptionLabel={(option) => option.label}
        value={setSelectedCategory}
        />}
        handle={handleEliminarCat}
        hacer='Eliminar'
      />
      <Dialogos 
      opener={eliminarEstado}
      closer={createClose}
      contenido={
        <ComSelect 
        nombre='Estado'
        items={selectedEstadoInfoo.map((opcion) => opcion.label)}
        onChange={(value) => handleEstadoFormit(value)}
        getOptionLabel={(option) => option.label}
        value={setSelectedEstado}
        />}
        handle={handleEliminarEst}
        hacer='Eliminar'
      />
      <Dialogos 
      opener={eliminarMarca}
      closer={createClose}
      contenido={
        <ComSelect 
          nombre='Marca'
          items={selectedMarcaInfor.map((opcion) => opcion.label)}
          onChange={(value) => handleMarcaFormit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedMarca}
          />}
        handle={handleEliminarMarc}
        hacer='Eliminar'
      />

      <Dialogos 
      opener={crearCat}
      closer={createClose}
      contenido={ <TextField 
        label='Nombre nueva categoría'
        type='text'
        value={NewCategoria.nombre}
        onChange={(e) => setNewCategoria({ ...NewCategoria, nombre: e.target.value })}
        />}
        handle={handleCreateCategoriaSubmit}
        hacer='Crear'
      />

      <Dialogos 
      opener={crearEstado}
      closer={createClose}
      contenido={ <TextField 
        label='Nombre nuevo estado'
        type='text'
        value={newEstado.estado}
        onChange={(e) => setNewEstado({ ...newEstado, estado: e.target.value })}
        />}
        handle={handleCreateEstadoSubmit}
        hacer='Crear'
      />

      <Dialogos 
      opener={crearMarca}
      closer={createClose}
      contenido={ <TextField 
        label='Nombre nueva Marca'
        type='text'
        value={newMarca.nombre}
        onChange={(e) => setNewMarca({ ...newMarca, nombre: e.target.value })}
        />}
        handle={handleCreateMarcaSubmit}
        hacer='Crear'
      /> 
      <React.Fragment>
        <BootstrapDialog onClose={handleCloseDialogEditer} aria-labelledby="customized-dialog-title" open={openEditer}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Modificar implemento</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogEditer}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form>
            <TextField
              label="Codigo"
              type="text"
              name="codigo"
              value={selectedRowData ? selectedRowData.codigo : ''}
              onChange={(e) => setSelectedRowData({...selectedRowData, codigo: e.target.value})}
            />
            <TextField
              label="Nombre"
              type="text"
              name="nombre"
              value={selectedRowData ? selectedRowData.nombre : ''}
              onChange={(e) => setSelectedRowData({...selectedRowData, nombre: e.target.value})}
            />
            <ComSelect 
            nombre='Categoria'
            items={selectedIdCat.map((opcion) => opcion.label)}
            onChange={(value) => handleCategoriaFormSubmit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedCategory}
            inicial={extraerCategory}
            />
            <TextField
            label="Cantidad"
            type="number"
            name="cantidad"
            value={selectedRowData ? selectedRowData.cantidad : ''}
            onChange={(e) => setSelectedRowData({...selectedRowData, cantidad: e.target.value})}
           />
           <TextField
            label="Cantidad Estado"
            type="number"
            name="cantidad"
            value={extraerCantidadEstado}
            onChange={handleCantidadChange}
           />
           <ComSelect 
            nombre='Marca'
            items={selectedMarcaInfor.map((opcion) => opcion.label)}
            onChange={(value) => handleMarcaFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedMarca}
            inicial={extraerMarca}
            />
            <ComSelect 
            nombre='Estado'
            items={selectedEstadoInfoo.map((opcion) => opcion.label)}
            onChange={(value) => handleEstadoFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedEstado}
            inicial={extraerEstado}
            />
          <div>
          <FormLabel id="demo-controlled-radio-buttons-group">¿Es apto el implemento?</FormLabel>
            SI
            <Radio
              checked={aptoValue === true}
              onChange={handleChangeRadio}
              value={extraerApto}
              name="radio-buttons"
            />
            NO
            <Radio
              checked={aptoValue === false}
              onChange={handleChangeRadio}
              value={extraerApto}
              name="radio-buttons"
            />
          </div>
          <TextField
            label="Peso"
            type="text"
            name="peso"
            value={selectedRowData ? selectedRowData.peso: ''}
            onChange={(e) => setSelectedRowData({...selectedRowData, peso: e.target.value})}
            />
          <TextField
            label="Color"
            type="text"
            name="color"
            value={selectedRowData ? selectedRowData.color: ''}
            onChange={(e) => setSelectedRowData({...selectedRowData, color: e.target.value})}
            />
          <TextField
            label="Material"
            type="text"
            name="material"
            value={selectedRowData ? extraerMaterial : ''}
            onChange={(e) => setSelectedRowData({...selectedRowData,material: e.target.value})}
          />
          <TextField
            label="Detalles"
            type="text"
            name="detalles"
            value={selectedRowData ? selectedRowData.detalles: ''}
            onChange={(e) => setSelectedRowData({...selectedRowData,detalles: e.target.value})}
            />
          <TextField
            label="Tamano"
            type="text"
            name="tamano"
            value={selectedRowData ? extraerTamano : ''}
            onChange={(e) => setSelectedRowData({...selectedRowData, tamano: e.target.value})}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={actualizarPatch}>Guardar Cambios</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
      <Dialog open={crearImplemento} onClose={handleCreateImplementoClose}>
        <DialogTitle>Crear Nuevo Implemento</DialogTitle>
        <DialogContent>
          <form>
            <TextField
            label="Codigo"
            type="text"
            name="codigo"
            value={newImplemento.codigo || ''}
            onChange={(e) => setNewImplemento({ ...newImplemento, codigo: e.target.value })}
          />
          <TextField
            label="Nombre"
            type="text"
            name="nombre"
            value={newImplemento.nombre || ''}
            onChange={(e) => setNewImplemento({ ...newImplemento, nombre: e.target.value })}
          />
          <ComSelect 
          nombre='Categoria'
          items={selectedIdCat.map((opcion) => opcion.label)}
          onChange={(value) => handleCategoriaFormSubmit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedCategory}
          />
          <TextField
          label="Cantidad"
          type="number"
          name="cantidad"
          value={newImplemento.cantidad}
          onChange={handleGeneralCantidadChange}
          />
          <TextField
          label="Cantidad Estado"
          type="number"
          name="cantidad"
          value={newImplemento.estado[0].cantidad}
          onChange={handleCantidadChange}
          />
          <ComSelect 
          nombre='Marca'
          items={selectedMarcaInfor.map((opcion) => opcion.label)}
          onChange={(value) => handleMarcaFormit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedMarca}
          />
          <div>
          <FormLabel id="demo-controlled-radio-buttons-group">¿Es apto el implemento?</FormLabel>
            SI
            <Radio
              checked={aptoValue === true}
              onChange={handleChangeRadio}
              value={true}
              name="radio-buttons"
            />
            NO
            <Radio
              checked={aptoValue === false}
              onChange={handleChangeRadio}
              value={false}
              name="radio-buttons"
            />
        </div>
          <ComSelect 
          nombre='Estado'
          items={selectedEstadoInfoo.map((opcion) => opcion.label)}
          onChange={(value) => handleEstadoFormit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedEstado}
          />
          <TextField
            label="Peso"
            type="text"
            name="peso"
            value={newImplemento.descripcion.peso || ''}
            onChange={(e) => setNewImplemento({
              ...newImplemento,
              descripcion: {
                ...newImplemento.descripcion,
                peso: e.target.value,
              },
            })}
          />
          <TextField
            label="Color"
            type="text"
            name="color"
            value={newImplemento.descripcion.color || ''}
            onChange={(e) => setNewImplemento({
              ...newImplemento,
              descripcion: {
                ...newImplemento.descripcion,
                color: e.target.value,
              },
            })}
          />

          <TextField
            label="Material"
            type="text"
            name="material"
            value={newImplemento.descripcion.material || ''}
            onChange={(e) => setNewImplemento({
              ...newImplemento,
              descripcion: {
                ...newImplemento.descripcion,
                material: e.target.value,
              },
            })}
          />
          <TextField
            label="Detalles"
            type="text"
            name="detalles"
            value={newImplemento.descripcion.detalles || ''}
            onChange={(e) => setNewImplemento({
              ...newImplemento,
              descripcion: {
                ...newImplemento.descripcion,
                detalles: e.target.value,
              },
            })}
          />
          <TextField
            label="Tamano"
            type="text"
            name="tamano"
            value={newImplemento.descripcion.tamano || ''}
            onChange={(e) => setNewImplemento({
              ...newImplemento,
              descripcion: {
                ...newImplemento.descripcion,
                tamano: e.target.value,
              },
            })}
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateImplementoClose}>Cancelar</Button>
          <Button onClick={handleCreateImplementoSubmit}>Enviar</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="secondary" aria-label="add" onClick={handleCreateImplementoClick}>
          <AddIcon />
        </Fab>
      </Box>
      <Stack>
      <Snackbar
        className="Snackbar-contraseña"
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMensaje || 'Cantidad inválida'}
        </Alert>
      </Snackbar>
    </Stack>
    </Paper>
  );
};
