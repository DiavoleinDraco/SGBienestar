import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import get, { actualizar, eliminar } from "../../UseFetch.js";
import { useState, useEffect } from "react";
import "./HistorialSanciones.css";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';

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

export default function HistorialSanciones() {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sancionesData, setSancionesData] = useState([]);
  const [mostrarSancionesActivas, setMostrarSancionesActivas] = useState(true);

  const handleToggleFiltro = () => {
    setMostrarSancionesActivas((prevMostrar) => !prevMostrar);
  };

  // Filtra las sanciones según el estado actual del filtro
  const sancionesFiltradas = mostrarSancionesActivas
    ? sancionesData.filter((sancion) => sancion.activa)
    : sancionesData;

  function createData(id, nombre, programa, sancion, tiempo, fecha, index) {
    return { id, nombre, programa, sancion, tiempo, fecha, index };
  }

  function formatFecha(fecha) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }

  function formatTiempo(tiempo) {
    const horas = tiempo;
    if (horas < 24) {
      return `${horas} horas`;
    } else if (horas < 720) {
      const dias = Math.floor(horas / 24);
      return `${dias} días`;
    } else {
      const meses = Math.floor(horas / 720); // 30 días * 24 horas
      return `${meses} meses`;
    }
  }
  async function actualizarSancion(sancion) {
    try {
      await actualizar("/sanciones/", sancion._id, { estado: false });
      console.log(`Sanción actualizada: ${sancion._id}`);
    } catch (error) {
      console.log(`Error al actualizar la sanción ${sancion._id}: ${error}`);
    }
  }
  async function isSancionActiva(sancion) {
    const fechaCreacion = new Date(sancion.createdAt);
    fechaCreacion.setHours(fechaCreacion.getHours() + 5);

    const fechaActual = new Date();
    console.log("fecha creacion:", fechaCreacion);
    console.log("fecha actual:", fechaActual);

    // Convierte la duración de horas a milisegundos
    const tiempoEnMilisegundos = sancion.duracion * 3600000;

    const fechaFinalizacion = new Date(
      fechaCreacion.getTime() + tiempoEnMilisegundos
    );
    console.log("fecha final:", fechaFinalizacion);

    if (fechaFinalizacion <= fechaActual) {
      return false;
    } else {
      console.log("Sanción activa");
      return true;
    }
  }

  useEffect(() => {
    get("/sanciones")
      .then(async (data) => {
        const contenidoData = await Promise.all(
          data.map(async (sancion, index) => {
            const activa = await isSancionActiva(sancion);
            if (!activa) {
              await actualizarSancion(sancion);
            }

            return {
              id: sancion._id,
              nombre: sancion.usuario ? sancion.usuario.nombres : "null",
              programa:
                sancion.usuario && sancion.usuario.ficha
                  ? sancion.usuario.ficha.programa.nombre
                  : "null",
              sancion: sancion.description,
              tiempo: formatTiempo(sancion.duracion),
              fecha: formatFecha(sancion.createdAt),
              activa,
              index,
            };
          })
        );
        setSancionesData(contenidoData);
      })
      .catch((usuarioError) => {
        console.error("Error al cargar el usuario", usuarioError);
      });
  }, []);

  // Filtra las sanciones según el estado actual del filtro
  const rows = mostrarSancionesActivas
    ? sancionesData.filter((sancion) => sancion.activa).reverse()
    : sancionesData.filter((sancion) => !sancion.activa).reverse();

  const handleRowClick = (id) => {
    if (selected.includes(id)) {
      // If the sancion is already selected, remove it
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      // If it's not selected, add it
      setSelected([...selected, id]);
    }
  };

  const isSelected = (id) => selected.includes(id);

  const handleDelete = async () => {
    // Obtén los IDs de las sanciones seleccionadas
    const selectedIds = selected;

    // Realiza una petición para eliminar las sanciones seleccionadas
    const deletionPromises = selectedIds.map(async (id) => {
      try {
        await eliminar("/sanciones/", id);
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    });

    // After successful deletion, update the UI
    Promise.all(deletionPromises)
      .then(() => {
        // Filter out the deleted sanciones from the data
        const updatedSancionesData = sancionesData.filter(
          (sancion) => !selectedIds.includes(sancion.id)
        );
        setSancionesData(updatedSancionesData);
        setSelected([]); // Clear the selected items after deletion
      })
      .catch((error) => {
        console.error("Error al eliminar", error);
      });
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  
    const filteredSanciones = sancionesData.filter((sancion) => {
      const nombre = sancion.nombre.toLowerCase();
      const programa = sancion.programa.toLowerCase();
      const sancionTexto = sancion.sancion.toLowerCase();
      const sancionTiempo = sancion.tiempo.toLowerCase();
      const fechaSancion = sancion.fecha.toLowerCase()
  
      return (
        nombre.includes(searchValue.toLowerCase()) ||
        programa.includes(searchValue.toLowerCase()) ||
        sancionTexto.includes(searchValue.toLowerCase()) ||
        sancionTiempo.includes(searchValue.toLowerCase()) ||
        fechaSancion.includes(searchValue.toLowerCase())
      );
    });
  
    setFilteredData(filteredSanciones);
  };

  return (
    <div>
      <div className="mensaje-de-filas">
        {selected.length > 0 && (
          <div>
            <span style={{ color: "white", margin:"0", padding:"0" }}>
              {selected.length} Fila(s) seleccionada(s)
            </span>
            <IconButton style={{ color: "white" }} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div className="contenedor-table-sanciones">
        <button
          style={{ margin: "10px" }}
          className={`filtro-button ${
            mostrarSancionesActivas ? "active" : "inactive"
          }`}
          onClick={handleToggleFiltro}
        >
          Sanciones 
          {mostrarSancionesActivas ? "Activas" : "Inactivas"}
        </button>

        <TableContainer component={Paper}>
        <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </Search>
      </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={selected.length === rows.length}
                    onChange={() => {
                      if (selected.length === rows.length) {
                        setSelected([]);
                      } else {
                        setSelected(rows.map((row) => row.index));
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Seleccionar todo</TableCell>
                <TableCell align="right">Usuario</TableCell>
                <TableCell align="right">Programa</TableCell>
                <TableCell align="right">Sancion</TableCell>
                <TableCell align="right">Tiempo</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {searchTerm ? (
    filteredData.map((row) => (
      <TableRow
        key={row.id}
        selected={isSelected(row.id)}
        onClick={() => handleRowClick(row.id)}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected(row.index)} />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.index}
        </TableCell>
        <TableCell align="right">{row.nombre}</TableCell>
        <TableCell align="right">{row.programa}</TableCell>
        <TableCell align="right">{row.sancion}</TableCell>
        <TableCell align="right">{row.tiempo}</TableCell>
        <TableCell align="right">{row.fecha}</TableCell>
        <TableCell align="right">
          {row.activa ? "Activa" : "Inactiva"}
        </TableCell>
      </TableRow>
    ))
  ) : (
    rows.map((row) => (
      <TableRow
        key={row.id}
        selected={isSelected(row.id)}
        onClick={() => handleRowClick(row.id)}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected(row.index)} />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.index}
        </TableCell>
        <TableCell align="right">{row.nombre}</TableCell>
        <TableCell align="right">{row.programa}</TableCell>
        <TableCell align="right">{row.sancion}</TableCell>
        <TableCell align="right">{row.tiempo}</TableCell>
        <TableCell align="right">{row.fecha}</TableCell>
        <TableCell align="right">
          {row.activa ? "Activa" : "Inactiva"}
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
