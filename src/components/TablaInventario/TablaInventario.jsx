import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { TableVirtuoso } from "react-virtuoso";
import { Popover } from "@mui/material";
import Switch from "@mui/material/Switch";
import "jspdf-autotable";
import FilterListIcon from "@mui/icons-material/FilterList";
import get, { eliminar, post, actualizar } from "../../UseFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ComSelect from "../ComSelect/ComSelect";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Options from "../Options/Options";
import BasicAccordion from "../BasicAccordion/BasicAccordion";
import Dialogos from "../Dialogos/Dialogos";
import'./TablaInventario.css';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TablaInventario() {
  const [implementos, setImplementos] = useState([]);
  const [extraerId, setExtraerId] = useState(null);
  const [extraerEstado, setExtraerEstado] = useState(null);
  const [extraerMaterial, setExtraerMaterial] = useState(null);
  const [extraerTamano, setExtraerTamano] = useState(null);
  const [implementoSeleccionado, setImplementoSeleccionado] = useState(null);
  const [additionalInfoCount, setAdditionalInfoCount] = useState(1);
  const [cantidadEst, setCantidadEst] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [cat, setCat] = useState("");
  const [est, setEst] = useState("");
  const [marc, setMarc] = useState("");
  const [eliminarCat, setEliminarCat] = useState(false);
  const [eliminarEstado, setEliminarEstado] = useState(false);
  const [eliminarMarca, setEliminaMarca] = useState(false);
  const [crearCat, setCrearCat] = useState(false);
  const [crearEstado, setCrearEstado] = useState(false);
  const [crearMarca, setCrearMarca] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteImplementos, setDeleteImplementos] = useState(null);
  const [deleteValues, setDeleteValues] = useState({});
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSanck] = useState(false);
  const [openEditer, setOpenEditer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [marca, setMarca] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [estado, setEstado] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [aptoValues, setAptoValues] = useState([]);
  const [crearImplemento, setCrearImplemento] = useState(false);
  const [newImplemento, setNewImplemento] = useState({
    codigo: "",
    nombre: "",
    marca: "",
    descripcion: {
      peso: "",
      color: "",
      material: "",
      detalles: "",
      tamano: "",
    },
    categoria: [],
    cantidad: 0,
    img: "null",
    estado: [],
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
    { label: "NOMBRE", dataKey: "nombre" },
    { label: "CATEGORÍA", dataKey: "categoria" },
    { label: "CANTIDAD TOTAL", dataKey: "cantidad" },
    { label: "MARCA", dataKey: "marca" },
    { label: "PESO", dataKey: "peso" },
    { label: "ESTADO", dataKey: "estado" },
    { label: "COLOR", dataKey: "color" },
    { label: "DETALLES", dataKey: "detalles" },
    { label: "DESCRIPCIÓN", dataKey: "descripcion" },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };
  const createMarcaClick = () => {
    setCrearMarca(true);
  };
  const eliminarCatClick = () => {
    setEliminarCat(true);
  };
  const eliminarEstadoClick = () => {
    setEliminarEstado(true);
  };
  const eliminarMarcaClick = () => {
    setEliminaMarca(true);
  };

  const createCategoriaClick = () => {
    setCrearCat(true);
  };
  const [NewCategoria, setNewCategoria] = useState({ nombre: "", img: "null" });
  const handleCreateCategoriaSubmit = async () => {
    try {
      if (NewCategoria.nombre === "") {
        setErrorMensaje("Completa el campo para la creación");
        setOpenSanck(true);
      } else {
        const response = await post("/categoria", NewCategoria);
        console.log("Se ha creado una nueva Categoría con éxito", response);
        setNewCategoria({ nombre: "", img: "null" });
        createClose();
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  };

  const createEstadoClick = () => {
    setCrearEstado(true);
  };
  const [newEstado, setNewEstado] = useState({ estado: "" });
  const handleCreateEstadoSubmit = async () => {
    try {
      if (newEstado.estado === "") {
        setErrorMensaje("Completa el campo para la creación");
        setOpenSanck(true);
      } else {
        const response = await post("/estado-implemento", newEstado);
        console.log("se ha creado un nuevo estado: ", response);
        setNewEstado({ estado: "" });
        createClose();
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      setOpenSanck(true);
    }
  };

  const [newMarca, setNewMarca] = useState({ nombre: "" });
  const handleCreateMarcaSubmit = async () => {
    try {
      if (newMarca.nombre === "") {
        setErrorMensaje("Completa el campo para la creación");
        setOpenSanck(true);
      } else {
        const response = await post("/marca", newMarca);
        console.log("Se ha creado una nueva Marca: ", response);
        setNewMarca({ nombre: "" });
        createClose();
      }
    } catch (error) {
      console.log("Error en la solicitud: ", error);
    }
  };

  const createClose = () => {
    setCrearMarca(false);
    setCrearCat(false);
    setCrearEstado(false);
    setEliminaMarca(false);
    setEliminarCat(false);
    setEliminarEstado(false);
  };

  const handleEliminarCat = async () => {
    try {
      if (cat) {
        await eliminar("/categoria/", cat);
        console.log("Categoría eliminada con éxito");
        createClose();
        setReloadData(!reloadData);
      } else {
        setErrorMensaje("Seleccione una categoría a eliminar");
        setOpenSanck(true);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría", error);
    }
  };

  const handleEliminarMarc = async () => {
    try {
      if (marc) {
        await eliminar("/marca/", marc);
        console.log("Marca eliminada con éxito");
        createClose();
        setReloadData(!reloadData);
      } else {
        setErrorMensaje("Seleccione una marca a eliminar");
        setOpenSanck(true);
      }
    } catch (error) {
      console.error("Error al eliminar la marca", error);
    }
  };

  const handleEliminarEst = async () => {
    try {
      if (est) {
        await eliminar("/estado-implemento/", est);
        console.log("Estado eliminado con éxito");
        createClose();
        setReloadData(!reloadData);
      } else {
        setErrorMensaje("Seleccione un estado a eliminar");
        setOpenSanck(true);
      }
    } catch (error) {
      console.error("Error al eliminar el estado", error);
    }
  };

  const menuItems = [
    {
      label: (
        <div>
          <BasicAccordion
            titulo={"Crear"}
            contenido={
              <div className='cont-boton' >
                <button className='boton' onClick={createCategoriaClick}>Categoría</button>
                <button className='boton' onClick={createEstadoClick}>Estado</button>
                <button className='boton' onClick={createMarcaClick}>Marca</button>
              </div>
            }
          />
        </div>
      ),
    },
    {
      label: (
        <div>
          <BasicAccordion
            titulo={"Eliminar"}
            contenido={
              <div className='cont-boton' >
                <button className='boton' onClick={eliminarCatClick}>Categoría</button>
                <button className='boton' onClick={eliminarEstadoClick}>Estado</button>
                <button className='boton' onClick={eliminarMarcaClick}>Marca</button>
              </div>
            }
          />
        </div>
      ),
    },
  ];

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

    if (selectedCategoriaOption) {
      const selectedInfoCat = selectedCategoriaOption.value;
      const updatedCategorias = [...newImplemento.categoria];
      updatedCategorias.push(selectedInfoCat);
      setNewImplemento((prevImplemento) => ({
        ...prevImplemento,
        categoria: updatedCategorias,
      }));
      setCat(selectedInfoCat);
    }
  };

  const selectedIdCat = categoria.map((cat) => ({
    label: cat.nombre,
    value: cat["_id"],
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

    if (selectedMarcaOption) {
      const selectedInfoMarca = selectedMarcaOption.value;
      const updatedInfo = { ...newImplemento, marca: selectedInfoMarca };
      setNewImplemento(updatedInfo);
      setMarc(selectedInfoMarca);
    }
  };

  const selectedMarcaInfor = marca.map((marca) => ({
    label: marca.nombre,
    value: marca["_id"],
  }));

  // Función para calcular la cantidad total
  const calcularCantidadTotal = (estado) => {
    return estado.reduce((total, estadoObj) => total + estadoObj.cantidad, 0);
  };

  useEffect(() => {
    const total = calcularCantidadTotal(newImplemento.estado);
    setNewImplemento((prevImplemento) => ({
      ...prevImplemento,
      cantidad: total,
    }));
  }, [newImplemento.estado]);

  const handleGeneralCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value, 10);

    if (!isNaN(newCantidad)) {
      setNewImplemento((prevImplemento) => ({
        ...prevImplemento,
        cantidad: parseInt(newCantidad, 10), // Actualiza la cantidad debajo de la categoría
      }));
    } else {
      console.error(
        "La cantidad debajo de la categoría no es un número válido."
      );
    }
  };

  const handleChangeRadio = (event, index) => {
    const newAptoValues = event.target.value === "true"; // Convertir el valor a un booleano
    setAptoValues((prevAptoValues) => {
      const updatedAptoValues = [...prevAptoValues];
      updatedAptoValues[index] = newAptoValues;
      return updatedAptoValues;
    });
  };

  const handleChangeRadioMod = (index, newAptoValue) => {
    setImplementoSeleccionado((prevImplemento) => {
      if (prevImplemento && prevImplemento.apto) {
        const nuevoApto = [...prevImplemento.apto];
        nuevoApto[index] = newAptoValue;
        return {
          ...prevImplemento,
          apto: nuevoApto,
        };
      } else {
        // Manejo del caso cuando prevImplemento o prevImplemento.apto es null o undefined
        return prevImplemento;
      }
    });
  };

  const handleCantidadChange = (event, index) => {
    const newCantidad = parseInt(event.target.value);

    if (!isNaN(newCantidad) && newCantidad !== "") {
      console.log("in the cant: ", aptoValues[index]);

      setNewImplemento((prevImplemento) => {
        const updatedEstado = [...prevImplemento.estado];

        if (updatedEstado[index]) {
          // Si existe, actualizamos la cantidad
          updatedEstado[index].cantidad = newCantidad;
        } else {
          updatedEstado[index] = {
            estado: selectedEstado, // Ajusta esto según tu lógica
            cantidad: newCantidad,
            apto: false, // Establecemos a false por defecto
          };
        }

        return {
          ...prevImplemento,
          estado: updatedEstado,
        };
      });
    } else {
      console.error("La cantidad no es un número válido o está vacía.");
    }
  };

  useEffect(() => {
    setNewImplemento((prevImplemento) => {
      const updatedEstado = prevImplemento.estado.map((estadoObj, objIndex) => {
        return {
          ...estadoObj,
          apto:
            aptoValues[objIndex] !== undefined ? aptoValues[objIndex] : false,
        };
      });

      return {
        ...prevImplemento,
        estado: updatedEstado,
      };
    });
  }, [aptoValues]);

  useEffect(() => {
    get("/estado-implemento")
      .then((data) => {
        setEstado(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, [reloadData]);

  const handleEstadoFormit = (selectedEstad, index) => {
    const selectedEstadoOption = selectedEstadoInfoo.find(
      (option) => option.label === selectedEstad
    );

    if (selectedEstadoOption) {
      const selectedInfoEstado = selectedEstadoOption.value;
      setSelectedEstado(selectedInfoEstado);
      setEst(selectedInfoEstado);
      setExtraerEstado(selectedEstad);

      console.log("el aptovalues que se guarda es: ", aptoValues[index]);

      setNewImplemento((prevNewImplemento) => {
        const updatedEstado = prevNewImplemento.estado.map(
          (estadoObj, objIndex) => {
            if (objIndex === index) {
              return {
                ...estadoObj,
                cantidad: cantidadEst, // Asegúrate de que cantidadEst esté definido
                apto:
                  aptoValues[index] !== undefined ? aptoValues[index] : false,
                estado: selectedInfoEstado, // Actualizamos el estado
              };
            } else {
              return estadoObj;
            }
          }
        );

        return {
          ...prevNewImplemento,
          estado: updatedEstado,
        };
      });

      // Actualizar el array de aptoValues
      setAptoValues((prevAptoValues) => {
        const updatedAptoValues = [...prevAptoValues];
        if (aptoValues[index] !== undefined) {
          updatedAptoValues[index] = aptoValues[index];
        }
        return updatedAptoValues;
      });

      setImplementoSeleccionado((prevImplemento) => {
        if (prevImplemento && prevImplemento.estado) {
          const nuevoEstImple = [...prevImplemento.estado];
          nuevoEstImple[index] = selectedEstad;
          return {
            ...prevImplemento,
            estado: nuevoEstImple,
          };
        } else {
          // Manejo del caso cuando prevImplemento o prevImplemento.estado es null o undefined
          return prevImplemento;
        }
      });
    }
  };

  const selectedEstadoInfoo = estado.map((data) => ({
    label: data.estado,
    value: data["_id"],
  }));

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

  const handleCreateImplementoSubmit = async (_id) => {
    if (
      !newImplemento.estado ||
      newImplemento.estado.length === 0 ||
      !newImplemento.estado[0] ||
      newImplemento.estado[0].estado === null
    ) {
      console.error("El campo 'estado' no puede estar vacío");
      setErrorMensaje("Completa todos los campos");
      setOpenSanck(true);
      return;
    }

    const cantidad = parseInt(newImplemento.estado[0].cantidad);
    if (isNaN(cantidad) || cantidad < 0) {
      console.error(
        "La cantidad no es un número válido o está vacía o es menor o igual a cero"
      );
      setErrorMensaje("Cantidad inválida");
      setOpenSanck(true);
      return;
    }

    const requiredFields = ['codigo', 'nombre', 'marca', 'descripcion', 'categoria', 'cantidad', 'img', 'estado'];
  for (const field of requiredFields) {
    if (field === 'descripcion') {
      const descripcionObj = newImplemento[field];
      if (!descripcionObj || Object.values(descripcionObj).some(value => value === null || value === undefined || value === '')) {
        console.error(`El campo '${field}' no puede estar vacío`);
        setErrorMensaje(`Completa todos los campos`);
        setOpenSanck(true);
        return;
      }
    } else {
      if (!newImplemento[field] || newImplemento[field].toString().trim() === '') {
        console.error(`El campo '${field}' no puede estar vacío`);
        setErrorMensaje(`Completa todos los campos`);
        setOpenSanck(true);
        return;
      }
    }
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
    console.log("INFO DE NUEVOS IMPLEMENTOS", data);
   

    try {
      const response = await post("/implementos", data);
      console.log("Se ha creado un implemento con éxito", response);
      const newImplemento = response; // Reemplaza con la estructura real de la respuesta del servidor
      const updatedImplementos = implementos.filter((row) => row._id !== _id);
      setImplementos(updatedImplementos);
      // Cierra el diálogo de creación de implemento
      handleCreateImplementoClose();
    window.location.reload()
    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  };

  //-------------------------- Traer los implementos-------------------------//
  useEffect(() => {
    get("/implementos")
      .then((implementosdata) => {
        // Mapear los datos y cambiar '_id' a 'id'
        console.log("Info de impplementos: ", implementosdata);
        const transformedData = implementosdata.map((item) => {
          const material = item.descripcion
            ? item.descripcion.material || null
            : null;
          const tamano = item.descripcion.tamano || null;
          const descripcion = `Material: ${material}, Tamaño: ${tamano}`;
          let estados = []; // Por defecto, si no hay estados
          let cantidadEstadoArray = []; // Para almacenar todas las cantidades de estado
          let aptoArray = [];
          let estadoIdArray = [];

          if (item.estado && item.estado.length > 0) {
            // Convertir la cadena 'estado' a un array
            estados =
              item.estado.map((estadoObj) =>
                estadoObj.estado[0] && estadoObj.estado[0].estado
                  ? estadoObj.estado[0].estado.trim()
                  : null
              ) || [];
            cantidadEstadoArray = item.estado.map(
              (estadoObj) => estadoObj.cantidad || null
            );
            aptoArray = item.estado.map((estadoObj) => estadoObj.apto || false);
            estadoIdArray =
              item.estado.map((estadoObj) =>
                estadoObj.estado[0] && estadoObj.estado[0]._id
                  ? estadoObj.estado[0]._id
                  : null
              ) || [];
          }
          return {
            ...item,
            id: item._id,
            nombre: item.nombre,
            categoria: item.categoria[0] ? item.categoria[0].nombre : null,
            marca: item.marca ? item.marca.nombre : null,
            marcaId: item.marca ? item.marca._id : null,
            categoriaId: item.categoria[0] ? item.categoria[0]._id : null,
            estadoId: estadoIdArray || null,
            peso: item.descripcion.peso,
            estado: estados || null,
            cantidadEstado: cantidadEstadoArray || null,
            apto: aptoArray || null,
            color: item.descripcion.color || "N/A",
            detalles: item.descripcion.detalles || "N/A",
            descripcion: descripcion,
          };
        });
        setImplementos(transformedData);
      })
      .catch((error) => {
        console.error("Error al cargar los implementos", error);
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
      await eliminar("/implementos/", _id);
      const updateImplementos = implementos.filter((row) => row._id !== _id);
      setImplementos(updateImplementos);
    } catch (error) {
      console.error("error al eliminar", error);
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
      <TableRow className='tabla-inv'>
        {columns.map((column) => {
          if (columnVisibility[column.dataKey]) {
            return (
              <TableCell
                key={column.dataKey}
                variant="head"
                sx={{
                  backgroundColor: '#e3e3e3',
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
            backgroundColor: '#e3e3e3',
          }}
        >
        </TableCell>

        <TableCell
          variant="head"
          sx={{
              backgroundColor: '#e3e3e3',
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

  const handleCampoChange = (campo, valor, index) => {
    if (campo === "material") {
      setExtraerMaterial(valor);
    } else if (campo === "tamano") {
      setExtraerTamano(valor);
    } else if (campo === "cantidadEstado") {
      // Parsea el valor a un número
      const cantidadEstadoNumerico = parseInt(valor, 10);

      // Asegúrate de que el valor sea un número válido
      if (!isNaN(cantidadEstadoNumerico)) {
        setImplementoSeleccionado((prevImplemento) => {
          const nuevaCantidadEstado = [...prevImplemento.cantidadEstado];
          nuevaCantidadEstado[index] = cantidadEstadoNumerico;
          const total = nuevaCantidadEstado.reduce(
            (acc, cantidad) => acc + cantidad,
            0
          );

          return {
            ...prevImplemento,
            cantidadEstado: nuevaCantidadEstado,
            cantidad: total,
          };
        });
      }
    } else {
      // Para otros campos, actualiza el estado general de implementoSeleccionado
      setImplementoSeleccionado((prevImplemento) => ({
        ...prevImplemento,
        [campo]: valor,
      }));
    }
  };

  async function actualizarImplemento(imple) {
    console.log("este es este", imple);
    setExtraerId(imple.id);
    setExtraerEstado(imple.estado);
    setImplementoSeleccionado(imple);
    const descri = imple.descripcion;
    const materialMatch = descri.match(/Material: (.*?),/);
    const tamanoMatch = descri.match(/Tamaño: (.*?)(?:,|$)/);

    if (materialMatch && materialMatch[1] && tamanoMatch && tamanoMatch[1]) {
      const mate = materialMatch[1].trim();
      const taman = tamanoMatch[1].trim();
      setExtraerTamano(taman);
      setExtraerMaterial(mate);
    }
    handleClickOpenDialogEditer();
  }

  async function actualizarPatch() {
    console.log("Implemento actualizado:", implementoSeleccionado);

    const estadosActualizados = implementoSeleccionado.estado.map(
      (estado, index) => ({
        estado: implementoSeleccionado.estadoId[index],
        cantidad: implementoSeleccionado.cantidadEstado[index],
        apto: implementoSeleccionado.apto[index],
      })
    );

    const datosActualizar = {
      codigo: implementoSeleccionado.codigo,
      nombre: implementoSeleccionado.nombre,
      marca: implementoSeleccionado.marcaId,
      descripcion: {
        peso: implementoSeleccionado.peso,
        color: implementoSeleccionado.color,
        material: extraerMaterial,
        detalle: implementoSeleccionado.detalles,
        tamano: extraerTamano,
      },
      categoria: implementoSeleccionado.categoriaId,
      cantidad: implementoSeleccionado.cantidad,
      cantidad_prestados: implementoSeleccionado.cantidad_prestados,
      cantidad_disponible: implementoSeleccionado.cantidad_disponible,
      estado: estadosActualizados,
    };
    console.log(datosActualizar);
    try {
      const response = await actualizar(
        "/implementos/",
        implementoSeleccionado.id,
        datosActualizar
      );
      console.log("se modificó el implemento con exito: ", response);
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
    handleCloseDialogEditer();
  }

  function encabezado() {
    return (
      <TableRow className="">
        {columns.map((column) => {
          if (columnVisibility[column.dataKey]) {
            return (
              <TableCell
                key={column.dataKey}
                variant="head"
                sx={{
                  backgroundColor: "background.paper",
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
            backgroundColor: "background.paper",
          }}
        ></TableCell>

        <TableCell
          variant="head"
          sx={{
            backgroundColor: "background.paper",
          }}
        ></TableCell>
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    if (searchTerm.length > 0) {
      const searchRegex = new RegExp(searchTerm, "i"); // 'i' para hacerlo insensible a mayúsculas/minúsculas
      const searchData = Object.values(row).join(" "); // Concatena todos los valores de la fila en una sola cadena
      if (!searchData.match(searchRegex)) {
        return null; // No muestra la fila si no coincide con el término de búsqueda
      }
    }

    return (
      <React.Fragment>
        {columns.map((column) => {
          if (columnVisibility[column.dataKey]) {
            if (column.dataKey === "estado") {
              // Mostrar la información específica para la columna de estado
              return (
                <TableCell key={column.dataKey}>
                  {row.estado.map((estado, index) => (
                    <div key={index}>
                      {`Estado: ${estado}, Cantidad: ${row.cantidadEstado[index]}`}
                    </div>
                  ))}
                </TableCell>
              );
            } else {
              // Renderizar valores normales
              return (
                <TableCell key={column.dataKey}>
                  {row[column.dataKey]}
                </TableCell>
              );
            }
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
  }

  const handleDeleteInfoEstados = (index) => {
    if (additionalInfoCount > 1) {
      setNewImplemento((prevImplemento) => {
        const updatedEstado = [...prevImplemento.estado];
        updatedEstado.splice(index, 1);

        return {
          ...prevImplemento,
          estado: updatedEstado,
        };
      });

      setAdditionalInfoCount(additionalInfoCount - 1);
    }
  };

  console.log("aptovalue: ", aptoValues);
  console.log("jajk: ", newImplemento.cantidad);

  return (
    <Paper className='tabla-inventario'>
      <Toolbar>
      <Search>
            <SearchIconWrapper>
              <SearchIcon className='icon-search' />
            </SearchIconWrapper >
            <StyledInputBase
            placeholder="Buscar implemento…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
      </Toolbar>

      <Options 
      nombre='Más'
      menuItems={menuItems}
      filter={<div className='filter'>
         <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{ vertical: 'top', horizontal: 'left'}}>

        <div style={{ padding:16, }}>
          <ColumnVisibilityControls />
        </div>
      </Popover>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <i class="bi bi-filter"></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
</svg> Filtrar
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
        texto="Recuerde que si elimina este implemento no hay forma alguna de recuperarlo... cabe recalcar que si desea puede crear un nuevo implemento sin necesidad de eliminar uno en especifico."
        handle={handleAgreeClick}
        hacer="Eliminar"
      />

      <Dialogos
        opener={eliminarCat}
        closer={createClose}
        contenido={
          <ComSelect
            nombre="Categoria"
            items={selectedIdCat.map((opcion) => opcion.label)}
            onChange={(value) => handleCategoriaFormSubmit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedCategory}
          />
        }
        handle={handleEliminarCat}
        hacer="Eliminar"
      />

      <Dialogos
        opener={eliminarEstado}
        closer={createClose}
        contenido={
          <ComSelect
            nombre="Estado"
            items={selectedEstadoInfoo.map((opcion) => opcion.label)}
            onChange={(value) => handleEstadoFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedEstado}
          />
        }
        handle={handleEliminarEst}
        hacer="Eliminar"
      />

      <Dialogos
        opener={eliminarMarca}
        closer={createClose}
        contenido={
          <ComSelect
            nombre="Marca"
            items={selectedMarcaInfor.map((opcion) => opcion.label)}
            onChange={(value) => handleMarcaFormit(value)}
            getOptionLabel={(option) => option.label}
            value={setSelectedMarca}
          />
        }
        handle={handleEliminarMarc}
        hacer="Eliminar"
      />

      <Dialogos
        opener={crearCat}
        closer={createClose}
        contenido={
          <TextField
            label="Nombre nueva categoría"
            type="text"
            value={NewCategoria.nombre}
            onChange={(e) =>
              setNewCategoria({ ...NewCategoria, nombre: e.target.value })
            }
          />
        }
        handle={handleCreateCategoriaSubmit}
        hacer="Crear"
      />

      <Dialogos
        opener={crearEstado}
        closer={createClose}
        contenido={
          <TextField
            label="Nombre nuevo estado"
            type="text"
            value={newEstado.estado}
            onChange={(e) =>
              setNewEstado({ ...newEstado, estado: e.target.value })
            }
          />
        }
        handle={handleCreateEstadoSubmit}
        hacer="Crear"
      />

      <Dialogos
        opener={crearMarca}
        closer={createClose}
        contenido={
          <TextField
            label="Nombre nueva Marca"
            type="text"
            value={newMarca.nombre}
            onChange={(e) =>
              setNewMarca({ ...newMarca, nombre: e.target.value })
            }
          />
        }
        handle={handleCreateMarcaSubmit}
        hacer="Crear"
      />

      <Dialogos
        opener={openEditer}
        closer={handleCloseDialogEditer}
        handle={actualizarPatch}
        hacer="Guardar cambios"
        titulo="MODIFICAR IMPLEMENTO"
        contenido={
          <div>
            <TextField
              label="Codigo"
              value={
                implementoSeleccionado ? implementoSeleccionado.codigo : ""
              }
              onChange={(e) => handleCampoChange("codigo", e.target.value)}
            />
            <TextField
              label="Nombre"
              value={
                implementoSeleccionado ? implementoSeleccionado.nombre : ""
              }
              onChange={(e) => handleCampoChange("nombre", e.target.value)}
            />
            {implementoSeleccionado &&
              implementoSeleccionado.estado &&
              implementoSeleccionado.estado.map((estado, index) => (
                <BasicAccordion
                  key={index}
                  titulo={`ESTADO ${index + 1}`}
                  contenido={
                    <div>
                      <ComSelect
                        nombre="Estado"
                        items={selectedEstadoInfoo.map(
                          (opcion) => opcion.label
                        )}
                        onChange={(value) => handleEstadoFormit(value, index)}
                        getOptionLabel={(option) => option.label}
                        inicial={implementoSeleccionado.estado[index]}
                      />
                      <TextField
                        label="Cantidad Estado"
                        type="number"
                        value={
                          implementoSeleccionado.cantidadEstado[index] || ""
                        }
                        onChange={(e) =>
                          handleCampoChange(
                            "cantidadEstado",
                            e.target.value,
                            index
                          )
                        }
                      />

                      <div>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          ¿Es apto el implemento?
                        </FormLabel>
                        SI
                        <Radio
                          checked={implementoSeleccionado.apto[index] === true}
                          onChange={() => handleChangeRadioMod(index, true)}
                          value={true}
                          name={`radio-buttons-${index}`}
                        />
                        NO
                        <Radio
                          checked={implementoSeleccionado.apto[index] === false}
                          onChange={() => handleChangeRadioMod(index, false)}
                          value={false}
                          name={`radio-buttons-${index}`}
                        />
                      </div>
                    </div>
                  }
                />
              ))}
            <div>
              Cantidad
              <input
                name=""
                value={
                  implementoSeleccionado ? implementoSeleccionado.cantidad : ""
                }
                readOnly
              />
            </div>
            <ComSelect
              nombre="Categoria"
              items={selectedIdCat.map((opcion) => opcion.label)}
              onChange={(value) => handleCategoriaFormSubmit(value)}
              getOptionLabel={(option) => option.label}
              inicial={
                implementoSeleccionado ? implementoSeleccionado.categoria : ""
              }
            />
            <ComSelect
              nombre="Marca"
              items={selectedMarcaInfor.map((opcion) => opcion.label)}
              onChange={(value) => handleMarcaFormit(value)}
              getOptionLabel={(option) => option.label}
              value={setSelectedMarca}
              inicial={
                implementoSeleccionado ? implementoSeleccionado.marca : ""
              }
            />
            <TextField
              label="Peso"
              type="text"
              name="peso"
              value={implementoSeleccionado ? implementoSeleccionado.peso : ""}
              onChange={(e) => handleCampoChange("peso", e.target.value)}
            />
            <TextField
              label="Color"
              type="text"
              name="color"
              value={implementoSeleccionado ? implementoSeleccionado.color : ""}
              onChange={(e) => handleCampoChange("color", e.target.value)}
            />
            <TextField
              label="Material"
              name="material"
              type="text"
              value={implementoSeleccionado ? extraerMaterial : ""}
              onChange={(e) => handleCampoChange("material", e.target.value)}
            />
            <TextField
              label="Detalles"
              type="text"
              name="detalles"
              value={
                implementoSeleccionado ? implementoSeleccionado.detalles : ""
              }
              onChange={(e) => handleCampoChange("detalles", e.target.value)}
            />
            <TextField
              label="Tamaño"
              type="text"
              name="tamano"
              value={implementoSeleccionado ? extraerTamano : ""}
              onChange={(e) => handleCampoChange("tamano", e.target.value)}
            />
          </div>
        }
      />

      <Dialog open={crearImplemento} onClose={handleCreateImplementoClose}>
        <DialogTitle className='cont-dialo'>Crear Nuevo Implemento</DialogTitle>
        <DialogContent className='dialo'>
          <form className='formulario-inv'>
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
          {Array.from({ length: additionalInfoCount }).map((_, index) => (
            <BasicAccordion 
            key={index}
            titulo={`ESTADO ${index + 1}`}
            contenido={
              <div>
                  <ComSelect 
                  nombre='Estado'
                  items={selectedEstadoInfoo.map((opcion) => opcion.label)}
                  onChange={(value) => handleEstadoFormit(value, index)}
                  getOptionLabel={(option) => option.label}
                  value={setSelectedEstado}
                  />
                 <TextField
                  label="Cantidad Estado"
                  type="number"
                  name="cantidad"
                  value={newImplemento.estado[index]?.cantidad || ''}
                  onChange={(e) => handleCantidadChange(e, index)}
                  />
                  <div>
                    <FormLabel id="demo-controlled-radio-buttons-group">¿Es apto el implemento?</FormLabel>
                      SI
                      <Radio
                        checked={aptoValues[index] === true}
                        onChange={(event) => handleChangeRadio(event, index)}
                        value={true}
                        name="radio-buttons"
                      />
                      NO
                      <Radio
                        checked={aptoValues[index] === false}
                        onChange={(event) => handleChangeRadio(event, index)}
                        value={false}
                        name="radio-buttons"
                      />
                           </div>
                    
                      {index > 0 && ( // Muestra el botón "delete" solo si el acordeón no es el primero
                    <IconButton onClick={() => handleDeleteInfoEstados(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                  </div>
            }
            />
          ))}
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={() => setAdditionalInfoCount(additionalInfoCount + 1)}
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Fab>
            <div className="contenedorsito">
              <div style={{position:'relative', top: '-40px', left : '90px'}}>
                Cantidad
                <input
                  name=""
                  value={calcularCantidadTotal(newImplemento.estado)}
                  onChange={handleGeneralCantidadChange}
                />
              </div>
            </div>
          <ComSelect 
          nombre='Categoria'
          items={selectedIdCat.map((opcion) => opcion.label)}
          onChange={(value) => handleCategoriaFormSubmit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedCategory}
          />
          <ComSelect 
          nombre='Marca'
          items={selectedMarcaInfor.map((opcion) => opcion.label)}
          onChange={(value) => handleMarcaFormit(value)}
          getOptionLabel={(option) => option.label}
          value={setSelectedMarca}
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

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="secondary"
          aria-label="add"
          onClick={handleCreateImplementoClick}
        >
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
            {errorMensaje || "Cantidad inválida"}
          </Alert>
        </Snackbar>
      </Stack>
    </Paper>
  )
}