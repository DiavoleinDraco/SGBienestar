import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "../../../components/menu/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import get, { actualizar, getParametre, post } from "../../../UseFetch";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./mensaje.css";
import "./Solicitudes.css";
import ComposeBar from "../../../components/componentedeprueba/Redactar_mensaje";
import { RawOff } from "@mui/icons-material";

export default function BasicTable() {
  const [tableData, setTableData] = useState([]);
  const [selectEstado, setTableDataEstado] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [idAprobado, setIdAprobado] = useState("");
  const [idRechazado, setIdRechazado] = useState("");
  const [idFallido, setIdFallido] = useState("");
  const [idCompletado, setIdCompletado] = useState("");
  const [IdPendiente, setIdPendiente] = useState("");
  const [IdPerdido, setIdPerdido] = useState("");
  const [IdRetrasado, setIdRetrasado] = useState("");
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const ESTADO_APROBADO = "Aprobado";
  const ESTADO_RECHAZADO = "Rechazado";
  const ESTADO_FALLIDO = "Fallido";
  const ESTADO_COMPLETADO = "Completado";
  const ESTADO_PENDIENTE = "Pendiente";
  const ESTADO_PERDIDO = "Perdido";
  const ESTADO_RETRASADO = "Retrasado";

  //_____Filtro de sanciones________

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterBySearchTerm = (row) => {
    const searchTermLowerCase = removeAccents(searchTerm.toLowerCase());
    const rowWithoutAccents = {
      ...row,
      fecha_inicio: removeAccents(row.fecha_inicio),
      usuario: {
        ...row.usuario,
        nombres: removeAccents(row.usuario?.nombres),
        apellidos: removeAccents(row.usuario?.apellidos),
        n_doc: removeAccents(row.usuario?.n_doc),
      },
      implementos: (row.implementos || []).map((implemento) => ({
        ...implemento,
        nombre: removeAccents(implemento.nombre),
      })),
      estado: {
        ...row.estado,
        nombre: removeAccents(row.estado.nombre),
      },
    };

    return (
      rowWithoutAccents.fecha_inicio.includes(searchTermLowerCase) ||
      (
        rowWithoutAccents.usuario?.nombres +
        " " +
        rowWithoutAccents.usuario?.apellidos
      )
        .toLowerCase()
        .includes(searchTermLowerCase) ||
      rowWithoutAccents.usuario?.n_doc
        .toLowerCase()
        .includes(searchTermLowerCase) ||
      rowWithoutAccents.implementos.some((implemento) =>
        implemento.nombre.toLowerCase().includes(searchTermLowerCase)
      ) ||
      rowWithoutAccents.estado.nombre
        .toLowerCase()
        .includes(searchTermLowerCase)
    );
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (name == "message") {
      setMessage(value);
    }
  };
  useEffect(() => {
    const savedFilter = localStorage.getItem("solicitudesFilter");
    if (savedFilter) {
      setFilter(savedFilter);
      setActiveFilter(savedFilter);
    }
  }, []);

  /*
  useEffect(() => {
  localStorage.setItem("solicitudesFilter", filter);
  }, [filter]);
  */

  //_____Peticion para traer todas los prestamos

  const updateTableData = async () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/prestamos");
        setTableData(data);
        setDatosGuardados(data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, [filter]);

  //___________

  useEffect(() => {
    const fetchDataEstado = async () => {
      try {
        const data = await get("/estado-prestamo");
        const filtrados = data.filter(
          (row) =>
            row.nombre === ESTADO_APROBADO ||
            row.nombre === ESTADO_RECHAZADO ||
            row.nombre === ESTADO_FALLIDO ||
            row.nombre === ESTADO_COMPLETADO ||
            row.nombre === ESTADO_PENDIENTE ||
            row.nombre === ESTADO_PERDIDO ||
            row.nombre === ESTADO_RETRASADO
        );
        const estadoSolicitudes = filtrados.map((row) => ({
          _id: row._id,
          nombre: row.nombre,
        }));
        setTableDataEstado(estadoSolicitudes);

        const aprobado = filtrados.find(
          (row) => row.nombre === ESTADO_APROBADO
        );
        const rechazado = filtrados.find(
          (row) => row.nombre === ESTADO_RECHAZADO
        );
        const fallido = filtrados.find((row) => row.nombre === ESTADO_FALLIDO);
        const completado = filtrados.find(
          (row) => row.nombre === ESTADO_COMPLETADO
        );
        const pendiente = filtrados.find(
          (row) => row.nombre === ESTADO_PENDIENTE
        );

        const perdido = filtrados.find((row) => row.nombre === ESTADO_PERDIDO);
        const retrasado = filtrados.find(
          (row) => row.nombre === ESTADO_RETRASADO
        );

        setIdAprobado(aprobado?._id || null);
        setIdRechazado(rechazado?._id || null);
        setIdFallido(fallido?._id || null);
        setIdCompletado(completado?._id || null);
        setIdPendiente(pendiente?._id || null);
        setIdPerdido(perdido?._id || null);
        setIdRetrasado(retrasado?._id || null);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchDataEstado();
  }, [
    idAprobado,
    idRechazado,
    idFallido,
    idCompletado,
    IdPendiente,
    IdPerdido,
    IdRetrasado,
  ]);

  console.log(
    "IDss",
    idAprobado,
    idRechazado,
    idFallido,
    idCompletado,
    IdPendiente,
    IdPerdido,
    IdRetrasado
  );

  //_____ botones

  //______________Codigo tabla____________

  //______________Codigo tabla____________

  const handleAceptar = async (id) => {
    try {
      const rowData = tableData.find((row) => row._id === id);

      if (rowData.estado.nombre === ESTADO_FALLIDO) {
        setErrorMessage("No se puede aprobar una solicitud fallida.");
        setAlertOpen(true);
        return;
      }

      const data = {
        id,
      };

      const response = await getParametre("/prestamos/aprobar/", id);

      setTableData((prevTableData) =>
        prevTableData.map((row) =>
          row._id === id ? { ...row, estado: { nombre: "Aprobado" } } : row
        )
      );

      setErrorMessage("");
      setAlertOpen(false);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  //______________Codigo tabla____________

  const handleRechazar = (id) => {
    const rowData = tableData.find((row) => row._id === id);

    if (rowData.estado.nombre === ESTADO_FALLIDO) {
      setErrorMessage("No se puede rechazar una solicitud fallida.");
      setAlertOpen(true);
      return;
    }

    setDialogOpen(true);
  };

  const handleDialogReject = async (id, correo_inst) => {
    try {
      console.log(id);
      const rowData = tableData.find((row) => row._id === id);
      console.log(rowData);
      const data = {
        id,
        estado: idRechazado,
      };

      console.log(data);

      setTableData((prevTableData) =>
        prevTableData.map((row) =>
          row._id === id ? { ...row, estado: { nombre: "Rechazado" } } : row
        )
      );
      const mail = await post("/mail", {
        correo: [rowData.usuario.correo_inst],
        asunto: "Notificacion de rechazo de prestamo",
        mensaje: message,
      });
      const response = await post("/prestamos/finalizar", data);

      setErrorMessage("");
      setAlertOpen(false);

      setDialogOpen(false);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
    //window.location.reload()
  };

  const handleRecibido = async (id) => {
    try {
      const data = {
        id: id,
        estado: idCompletado,
      };

      setTableData((prevTableData) =>
        prevTableData.map((row) =>
          row._id === id ? { ...row, estado: { nombre: "Completado" } } : row
        )
      );

      const response = await post("/prestamos/finalizar", data);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
    //window.location.reload()
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterTableData = () => {
    const dataToRender = searchTerm
      ? tableData.filter(filterBySearchTerm)
      : tableData;

    const sortedData = dataToRender.sort((a, b) => {
      const dateA = new Date(a.fecha_inicio);
      const dateB = new Date(b.fecha_inicio);

      return dateB - dateA;
    });

    const filterLowerCase = filter?.toLowerCase();

    switch (filterLowerCase) {
      case "pendientes":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_PENDIENTE
        );
      case "aprobado":
      case "perdido":
      case "retrasado":
        return sortedData.filter(
          (row) => row.estado.nombre.toLowerCase() === filterLowerCase
        );
      case "rechazadas":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_RECHAZADO
        );
      case "fallidas":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_FALLIDO);
      case "completados":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_COMPLETADO
        );
      default:
        return sortedData;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div>
      <Menu></Menu>

      <div className="contenedor-table-solicitudes">
        <TableContainer className="cont-table-solicitudes" component={Paper}>
          <div
            style={{
              background: "#eaeaea",
              borderBottom: "0.1px solid #868686",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
            className="btncont"
          >
            <input
              className="barra-busqueda-soli"
              type="text"
              placeholder="Buscar..."
              onChange={handleSearch}
              value={searchTerm}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            />

            <Button
              className={`boton-solicitudes ${
                activeFilter === "pendientes" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "pendientes");
                //window.location.reload()
                setFilter("pendientes");
                setActiveFilter("pendientes");
              }}
            >
              Pendientes
            </Button>
            <Button
              className={`boton-solicitudes ${
                activeFilter === "aprobado" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "aprobado");
                setFilter("aprobado");
                setActiveFilter("aprobado");
              }}
            >
              Aprobado
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "retrasado" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "retrasado");
                //window.location.reload()
                setFilter("retrasado");
                setActiveFilter("retrasado");
              }}
            >
              Retrasado
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "fallidas" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "fallidas");
                //window.location.reload()
                setFilter("fallidas");
                setActiveFilter("fallidas");
              }}
            >
              Fallidas
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "rechazadas" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "rechazadas");
                setFilter("rechazadas");
                setActiveFilter("rechazadas");
              }}
            >
              Rechazadas
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "completados" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "completados");
                setFilter("completados");
                setActiveFilter("completados");
              }}
            >
              Completados
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "perdido" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "perdido");
                //window.location.reload()
                setFilter("perdido");
                setActiveFilter("perdido");
              }}
            >
              Perdido
            </Button>

            <Button
              className={`boton-solicitudes ${
                activeFilter === "Todos" ? "active" : ""
              }`}
              variant="contained"
              onClick={() => {
                localStorage.setItem("solicitudesFilter", "Todos");
                setFilter(null);
                setActiveFilter("Todos");
              }}
            >
              Todos
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              style={{
                background: "#eaeaea",
                borderBottom: "0.1px solid #868686",
                position: "sticky",
                top: 65,
                zIndex: 99,
              }}
            >
              <TableRow>
                <TableCell align="right">
                  <b>FECHA</b>
                </TableCell>
                <TableCell align="right">
                  <b>USUARIO</b>
                </TableCell>
                <TableCell align="right">
                  <b>N. DOCUMENTO</b>
                </TableCell>
                <TableCell align="right">
                  <b>IMPLEMENTO</b>
                </TableCell>
                <TableCell align="right">
                  <b>ESTADO DE LA SOLICITUD</b>
                </TableCell>
                {(filter === "aprobado" ||
                  filter === "perdido" ||
                  filter === "retrasado") && (
                  <TableCell align="right">
                    <b>RECIBIR</b>
                  </TableCell>
                )}
                {filter === "pendientes" && (
                  <>
                    <TableCell align="right">
                      <b>ACEPTAR SOLICITUD</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>RECHAZAR SOLICITUD</b>
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filterTableData().map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {formatDate(row.fecha_inicio)}
                  </TableCell>
                  <TableCell align="right">
                    {row.usuario?.nombres + " " + row.usuario?.apellidos}
                  </TableCell>
                  <TableCell align="right">{row.usuario?.n_doc}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {row.implementos?.map((implemento) => (
                      <span key={implemento.id}>
                        {implemento.nombre}
                        {implemento !==
                          row.implementos[row.implementos.length - 1] && ", "}
                      </span>
                    ))}
                  </TableCell>

                  <TableCell align="right">{row.estado.nombre}</TableCell>
                  {filter === "aprobado" ||
                  filter === "perdido" ||
                  filter === "retrasado" ? (
                    <>
                      <TableCell align="right">
                        <Button
                          style={{ background: "#e3e3e3", color: "#2c0757" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleRecibido(row._id)}
                        >
                          Recibido
                        </Button>
                      </TableCell>
                    </>
                  ) : filter === "pendientes" ? (
                    <>
                      <Dialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                      >
                        <DialogTitle>Confirmar Rechazo</DialogTitle>
                        <DialogContent>
                          <p>
                            ¿Estás seguro de que quieres rechazar esta
                            solicitud?
                          </p>
                          <textarea
                            name="message"
                            placeholder="Escribe la razón..."
                            value={message}
                            onChange={handleMessageChange}
                          ></textarea>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setDialogOpen(false)}
                            color="primary"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={() =>
                              handleDialogReject(row._id) &&
                              setDialogOpen(false)
                            }
                            color="primary"
                          >
                            Rechazar
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <TableCell align="right">
                        <Button
                          style={{ background: "#e3e3e3", color: "#2c0757" }}
                          variant="contained"
                          color="success"
                          onClick={() => handleAceptar(row._id)}
                        >
                          Aceptar
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRechazar(row._id)}
                        >
                          Rechazar
                        </Button>
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
