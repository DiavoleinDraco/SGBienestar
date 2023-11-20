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
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

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

export default function HistorialSanciones() {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sancionesData, setSancionesData] = useState([]);
  const [mostrarSancionesActivas, setMostrarSancionesActivas] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  //_____________ Dialog confirmacion de eliminacion de sancion (por arreglar)

  const handleOpenDeleteDialog = (sancion) => {
    setSancionToDelete(sancion);

    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (confirmed) => {
    setOpenDeleteDialog(false);
    if (confirmed) {
      const sancion = sancionToDelete;
      if (sancion) {
        eliminar("/sanciones/", sancion.id)
          .then(() => {
            const updatedSancionesData = sancionesData.filter(
              (s) => s.id !== sancion.id
            );
            setSancionesData(updatedSancionesData);
            setSelected(selected.filter((id) => id !== sancion.id));
          })
          .catch((error) => {
            console.error("Error al eliminar", error);
          });
      }
    }
  };

  //_____________Filtro de sanciones activas/inactivas_____Depurar_______________

  const handleToggleFiltro = () => {
    setMostrarSancionesActivas((prevMostrar) => !prevMostrar);
  };

  const sancionesFiltradas = mostrarSancionesActivas
    ? sancionesData.filter((sancion) => sancion.activa)
    : sancionesData;

  function createData(
    id,
    nombre,
    programa,
    sancion,
    tiempo,
    fecha,
    n_doc,
    index
  ) {
    return { id, nombre, programa, sancion, tiempo, fecha, n_doc, index };
  }

  //______ Manejo de formatos de timpo y fecha______

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
      const meses = Math.floor(horas / 720);
      return `${meses} meses`;
    }
  }

  //______ PATH actiliazar el estado de la sancion

  async function actualizarSancion(sancion) {
    try {
      await actualizar("/sanciones/", sancion._id, { estado: false });
      console.log(`Sanción actualizada: ${sancion._id}`);
    } catch (error) {
      console.log(`Error al actualizar la sanción ${sancion._id}: ${error}`);
    }
  }

  //___ verificacion de actividad ______

  async function isSancionActiva(sancion) {
    const fechaCreacion = new Date(sancion.createdAt);
    fechaCreacion.setHours(fechaCreacion.getHours() + 5);

    const fechaActual = new Date();
    console.log("fecha creacion:", fechaCreacion);
    console.log("fecha actual:", fechaActual);

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

  //  UseEffect__________ //__________

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
              apellido: sancion.usuario ? sancion.usuario.apellidos : "null",
              programa:
                sancion.usuario && sancion.usuario.ficha
                  ? sancion.usuario.ficha.programa.nombre
                  : "null",
              sancion: sancion.description,
              tiempo: formatTiempo(sancion.duracion),
              fecha: formatFecha(sancion.createdAt),
              documento: sancion.usuario ? sancion.usuario.n_doc : "null",
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

  // Mostrar las sanciones segun su actividad

  const rows = mostrarSancionesActivas
    ? sancionesData.filter((sancion) => sancion.activa).reverse()
    : sancionesData.filter((sancion) => !sancion.activa).reverse();

  const handleRowClick = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const isSelected = (id) => selected.includes(id);

  //______  Eliminacion de la sanciion ____

  const handleDelete = async () => {
    const selectedIds = selected;

    const deletionPromises = selectedIds.map(async (id) => {
      try {
        await eliminar("/sanciones/", id);
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    });

    try {
      await Promise.all(deletionPromises);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error al eliminar sanciones", error);
    }

    //__________

    Promise.all(deletionPromises)
      .then(() => {
        const updatedSancionesData = sancionesData.filter(
          (sancion) => !selectedIds.includes(sancion.id)
        );
        setSancionesData(updatedSancionesData);
        setSelected([]);
      })
      .catch((error) => {
        console.error("Error al eliminar", error);
      });
  };

  //_____ Search de tabla, filttro de busqueda ______

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    const filteredSanciones = sancionesData.filter((sancion) => {
      const nombre = sancion.nombre.toLowerCase();
      const programa = sancion.programa.toLowerCase();
      const sancionTexto = sancion.sancion.toLowerCase();
      const sancionTiempo = sancion.tiempo.toLowerCase();
      const fechaSancion = sancion.fecha.toLowerCase();
     

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

  //__________ RETURN______________________

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={() => handleCloseDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar la sanción seleccionada?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDeleteDialog(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleCloseDeleteDialog(true)} // Confirma la eliminación
            color="primary"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <div className="contenedor-table-sanciones">
        <TableContainer component={Paper}>
          <Toolbar className="barra-sanciones">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
            <div className="cont-btn-san-act-inact">
              <button
                style={{ margin: "10px" }}
                className={`filtro-button ${
                  mostrarSancionesActivas ? "active" : "inactive"
                }`}
                onClick={handleToggleFiltro}
              >
                Sanciones
                {mostrarSancionesActivas ? " Activas" : " Inactivas"}
              </button>
            </div>
            <div className="mensaje-de-filas">
              {selected.length > 0 && (
                <div>
                  <span style={{ color: "black", margin: "0", padding: "0" }}>
                    {selected.length} Fila(s) seleccionada(s)
                  </span>
                  <IconButton
                    id="icon-sanciones"
                    style={{ color: "black" }}
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
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
                <TableCell align="right">Documento</TableCell>
                <TableCell align="right">Programa</TableCell>
                <TableCell align="right">Sancion</TableCell>
                <TableCell align="right">Tiempo</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchTerm
                ? filteredData.map((row) => (
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
                      <TableCell align="right">
                        {row.nombre + " " + row.apellido}
                      </TableCell>
                      <TableCell align="right">{row.documento}</TableCell>
                      <TableCell align="right">{row.programa}</TableCell>
                      <TableCell align="right">{row.sancion}</TableCell>
                      <TableCell align="right">{row.tiempo}</TableCell>
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">
                        {row.activa ? "Activa" : "Inactiva"}
                      </TableCell>
                    </TableRow>
                  ))
                : rows.map((row) => (
                    <TableRow
                      key={row.id}
                      selected={isSelected(row.id)}
                      onClick={() => handleRowClick(row.id)}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected(row.index)} />
                      </TableCell>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">
                        {row.nombre + " " + row.apellido}
                      </TableCell>
                      <TableCell align="right">{row.documento}</TableCell>
                      <TableCell align="right">{row.programa}</TableCell>
                      <TableCell align="right">{row.sancion}</TableCell>
                      <TableCell align="right">{row.tiempo}</TableCell>
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">
                        {row.activa ? "Activa" : "Inactiva"}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
