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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

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

export default function TablaInventario() {
    const [implementos, setImplementos] = useState([]);
    const [editImplemento, setEditImplemento] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteImplementos, setDeleteImplementos] = useState(null);
    const [deleteValues, setDeleteValues] = useState({});
    const [open, setOpen] = useState(false);
    const [openEditer, setOpenEditer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [categoria, setCategoria] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [marca, setMarca] = useState([])
    const [selectedMarca, setSelectedMarca] = useState(null)
    const [estado, setEstado] = useState([])
    const [selectedEstado, setSelectedEstado] = useState(null)
    const [aptoValue, setAptoValue] = useState(false)
    const [selectedImplementoData, setSelectedImplementoData] = useState(null);
    const [crearImplemento, setCrearImplemento] = useState(false);
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

    
  const handleClickOpenDialogEditer = () => {
    if (selectedRowData) {
      setNewImplemento(selectedRowData);
      console.log(selectedRowData)
      }
      setOpenEditer(true);
  };

  const handleCloseDialogEditer = () => {
    setSelectedRowData(null); // Restablece los datos de la fila seleccionada
    setOpenEditer(false);
  };

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

  const handleCreateImplementoClick = () => {
    setCrearImplemento(true);
  };

  const handleCreateImplementoClose = () => {
    setCrearImplemento(false);
  };

//-----------------------categoria-----------------------//
  useEffect(() => {
    get("/categoria")
      .then((data) => {
        setCategoria(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const handleCategoriaFormSubmit = (selectedCategoria) => {
    const selectedCategoriaOption = selectedIdCat.find(
      (option) => option.label === selectedCategoria
    );
    if (selectedCategoriaOption){
      const selectedInfoCat = selectedCategoriaOption.value;
      const updateInfo = {...newImplemento, categoria: selectedInfoCat};
      setNewImplemento(updateInfo)
      
    }
  }

  const selectedIdCat = categoria.map((cat) => ({
    label: cat.nombre,
    value: cat['_id']
  }));

  //-----------------------fin Categoria------------------------------//

  //--------------------------------marca----------------------------------//

  useEffect(() => {
    get("/marca")
      .then((data) => {
        setMarca(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const handleMarcaFormit = (selectedMarca) => {
    const selectedMarcaOption = selectedMarcaInfor.find(
      (option) => option.label === selectedMarca
    );

    if(selectedMarcaOption){
      const selectedInfoMarca = selectedMarcaOption.value;
      const updatedInfo = {...newImplemento, marca: selectedInfoMarca }
      setNewImplemento(updatedInfo)
    }
  }

  const selectedMarcaInfor = marca.map((marca) => ({
    label: marca.nombre,
    value: marca["_id"]
  }))

  //------------------------------fin Marca---------------------------------//

  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value)
    console.log('se supone que esta es la cantidad', newCantidad)
  
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
      // Aquí puedes manejar la entrada no válida, por ejemplo, mostrando un mensaje de error
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

  //--------------------------Estado--------------------------//

  useEffect(() => {
    get("/estado-implemento")
      .then((data) => {
        setEstado(data);
        console.log('Estados: ', data)
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const handleEstadoFormit = (selectedEstado) => {
    const selectedEstadoOption = selectedEstadoInfoo.find(
      (option) => option.label === selectedEstado
    );
  
    if(selectedEstadoOption){ 
      const selectedInfoEstado = selectedEstadoOption.value;
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
    }
  }

  const selectedEstadoInfoo = estado.map((data) => ({
    label: data.estado,
    value: data['_id']
  }))

  //------------------------fin Estado--------------------------------//

//----------------------------------------------------------------------------Crear el implemento----//


const handleCreateImplementoSubmit = async () => {
    const cantidad = parseInt(newImplemento.estado[0].cantidad);
    if (isNaN(cantidad) || cantidad === '' || cantidad <= 0) {
      console.error('La cantidad no es un número válido o está vacía o es menor o igual a cero');
      return;
    }
    
  // Convierte los campos 'marca' y 'categoria' en cadenas JSON

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

    console.log('INFO DE NUEVOS IMPLEMENTOS', data)

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
    }
    window.location.reload();
    
  };

  //-------------------------- Traer los implementos-------------------------//
  useEffect(() => {
    get('/implementos')
      .then((implementosdata) => {
        // Mapear los datos y cambiar '_id' a 'id'
        console.log('Info de impplementos: ', implementosdata)
        const transformedData = implementosdata.map((item) => {
          const material = item.descripcion.material || 'No especificado';
        const tamano = item.descripcion.tamano || 'No especificado';
        const descripcion = `Material: ${material}, Tamaño: ${tamano}`;
        const estado = item.estado ? item.estado[0].estado : [];
        
        return {
          ...item, 
          id: item._id, 
          nombre: item.nombre, 
          categoria: item.categoria[0] ? item.categoria[0].nombre : '',
          marca: item.marca.nombre,
          peso: item.descripcion.peso,
          estado: estado.length > 0 ? estado[0].estado : '',
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
    handleClose(); // Cierra el diálogo al hacer clic en "Agree"
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
          Modificar
        </TableCell>

        <TableCell
          variant="head"
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          Eliminar
        </TableCell>
      </TableRow>
    );
  };

  async function actualizarImplemento(imple) {
    setSelectedImplementoData(imple)
    console.log('este es este',implementos[imple])
    handleClickOpenDialogEditer()
    setOpenEditer(true);

    console.log('probando: ', imple.escripcion.material)

    setNewImplemento({
      codigo: imple.codigo || '',
      nombre: imple.nombre || '',
      marca: imple.marca || [],
      descripcion: {
        peso: imple.peso || '',
        color: imple.color || '',
        material: imple.descripcion.material || '',
        detalles: imple.detalles || '',
        tamano: imple.descripcion.tamano || '',
      },
      categoria: imple.categoria || [],
      cantidad: imple.cantidad || 0,
      img: imple.img || null,
      estado: [
        {
          estado: imple.estado || '',
          cantidad: imple.cantidadEstado || 0,
          apto: imple.apto,
        },
      ],
    });
  };

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
        Elija la información que desea en su informe.
      </Popover>

      <Tooltip title="Filtrar Tabla">
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      
      <TableVirtuoso
        data={implementos}
        components={VirtuosoTableComponents}
        fixedHeaderContent={encabezado}
        itemContent={rowContent}
      />
       <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseDialogEditer}
        aria-labelledby="customized-dialog-title"
        open={openEditer}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modificar implemento
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogEditer}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
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
            <ComSelect 
            nombre='Estado'
            items={selectedEstadoInfoo.map((opcion) => opcion.label)}
            onChange={(value) => handleEstadoFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedEstado}
            />
             <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">¿Es apto el implemento?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={aptoValue ? true : false}
              onChange={handleChangeRadio}
            >
              <FormControlLabel value={true} control={<Radio />} label="SI" />
              <FormControlLabel value={false} control={<Radio />} label="NO" />
            </RadioGroup>
          </FormControl>

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
          <Button autoFocus onClick={handleCloseDialogEditer}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"¿DE VERDAD DESEA ELIMINAR ESTE IMPLEMENTO?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
            Recuerde que si elimina este implemento no hay forma alguna de recuperarlo... cabe recalcar que si desea puede crear un  nuevo implemento sin necesidad de eliminar uno en especifico.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAgreeClick} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={crearImplemento} onClose={handleCreateImplementoClose}>
        <DialogTitle>Crear Nuevo Implemento</DialogTitle>
        <DialogContent>
          <form>
            El implemento que va a crear a continuacion debe especificar la cantidad de implementos en dicho estado, si el implemento tiene mas de un estado, tendrá que crear otra vez el implemento pero especificando el otro estado faltante.
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
            <ComSelect 
            nombre='Estado'
            items={selectedEstadoInfoo.map((opcion) => opcion.label)}
            onChange={(value) => handleEstadoFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedEstado}
            />
             <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">¿Es apto el implemento?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={aptoValue ? true : false}
              onChange={handleChangeRadio}
            >
              <FormControlLabel value={true} control={<Radio />} label="SI" />
              <FormControlLabel value={false} control={<Radio />} label="NO" />
            </RadioGroup>
          </FormControl>

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
          <Button onClick={handleCreateImplementoSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="secondary" aria-label="add" onClick={handleCreateImplementoClick}>
        <AddIcon />
      </Fab>
      </Box>

    </Paper>
  );
};
